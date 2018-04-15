package com.topsec.ti.zxg.config;

import com.topsec.ti.zxg.MagicjcConstants;
import com.topsec.ti.zxg.domain.ca.CurrentUser;
import com.topsec.ti.zxg.domain.ca.User;
import com.topsec.ti.zxg.dto.DtoUser;
import com.topsec.ti.zxg.service.CaService;
import com.topsec.ti.zxg.service.CurrentUserDetailsService;
import com.topsec.ti.zxg.utils.GsonUtils;
import com.topsec.ti.zxg.web.controller.BaseController;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.SimpleUrlLogoutSuccessHandler;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Date;

@EnableWebSecurity
//用于@PreAuthorize的生效,基于方法的权限控制
@EnableGlobalMethodSecurity(prePostEnabled = false)
//覆盖默认的spring security提供的配置
//@Order(SecurityProperties.ACCESS_OVERRIDE_ORDER)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {//1

  @Bean
  UserDetailsService customUserService() {
    return new CurrentUserDetailsService();
  }

  @Autowired
  private  CaService caService;

  @Bean
  public PasswordEncoder passwordEncoder() {
    //密码加密
    return new BCryptPasswordEncoder();
  }
  //,"/resources/datapull/**","/resources/alert/**"
  @Override
  protected void configure(HttpSecurity http) throws Exception {
    http
            .csrf().disable()
            .authorizeRequests()//配置认证
            .antMatchers("/resources/user/init","/resources/init","/resources/datapull/**")
            .permitAll()//不需要认证的
            // #4
            .antMatchers("/resources/swagger-ui.html")
            .hasAuthority(MagicjcConstants.ADMIN_AUTHORITY)//管理用户,需要admin权限
            //任何访问都必须授权// #6
//            .anyRequest().fullyAuthenticated()
            //配置那些路径需要授权
            .antMatchers("/resources/**")
            .authenticated()
            // #7
            .and()
            .formLogin().loginPage("/resources/user/login")
            //登陆成功后的处理，因为是API的形式所以不用跳转页面
            .successHandler(new RestAuthenticationSuccessHandler(caService))
            //登陆失败后的处理
            .failureHandler(new RestAuthenticationFailureHandler())
            .permitAll()
            .and()
            //登出后的处理
            .logout()
            .logoutUrl("/resources/user/logout")
            .logoutSuccessHandler(new RestLogoutSuccessHandler())
            .permitAll()
            .and()
            //认证不通过后的处理
            .exceptionHandling()
            .authenticationEntryPoint(new RestAuthenticationEntryPoint())
    ;
  }

  @Override
  protected void configure(AuthenticationManagerBuilder auth) throws Exception {
    auth.userDetailsService(customUserService())
            .passwordEncoder(passwordEncoder());
  }

  @Override
  @Bean
  public AuthenticationManager authenticationManagerBean() throws Exception {
    return super.authenticationManagerBean();
  }

  public static class RestAuthenticationFailureHandler implements AuthenticationFailureHandler{

    @Override
    public void onAuthenticationFailure(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, AuthenticationException e) throws IOException, ServletException {

      BaseController.ErrorInfo errorInfo = new BaseController.ErrorInfo(HttpServletResponse.SC_UNAUTHORIZED,e.getMessage(),"登录失败!",new Date());

      httpServletResponse.getWriter().println(GsonUtils.getGson().toJson(errorInfo));
    }
  }

  /**
   * 登陆成功后的处理
   */
  public static class RestAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private CaService caService;


    public RestAuthenticationSuccessHandler(CaService caService){
      super();
      this.caService=caService;
    }
    public RestAuthenticationSuccessHandler(){
      super();
    }
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response, Authentication authentication)
            throws ServletException, IOException {
      CurrentUser currentUser = (CurrentUser) authentication.getPrincipal();
      User user = currentUser.getUser();
      DtoUser dtoUser = caService.getDtoUserWithAuthorities(user);

      response.setCharacterEncoding("UTF-8");
      response.setContentType("application/json");

      dtoUser.setPassword(null);
      response.getWriter().println(GsonUtils.getGson().toJson(dtoUser));

      clearAuthenticationAttributes(request);
    }
  }

  /**
   * 登出成功后的处理
   */
  public static class RestLogoutSuccessHandler extends SimpleUrlLogoutSuccessHandler {

    @Override
    public void onLogoutSuccess(HttpServletRequest request,
                                HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {
      response.setCharacterEncoding("UTF-8");
      response.setContentType("application/json");

      BaseController.ErrorInfo errorInfo = new BaseController.ErrorInfo(HttpServletResponse.SC_OK,null,"注销成功!",new Date());

      response.getWriter().println(GsonUtils.getGson().toJson(errorInfo));

    }
  }

  /**
   * 权限不通过的处理
   */
  public static class RestAuthenticationEntryPoint implements AuthenticationEntryPoint {

    @Override
    public void commence(HttpServletRequest request,
                         HttpServletResponse response,
                         AuthenticationException authException) throws IOException {
      BaseController.ErrorInfo errorInfo = new BaseController.ErrorInfo(HttpServletResponse.SC_UNAUTHORIZED,authException.getMessage(),"无权限访问该资源!",new Date());

      response.setCharacterEncoding("UTF-8");
      response.setContentType("application/json");
      response.getWriter().println(GsonUtils.getGson().toJson(errorInfo));
//      response.sendError(HttpServletResponse.SC_UNAUTHORIZED,
//              "Authentication Failed: " + authException.getMessage());
    }
  }


}
