package com.topsec.ti.zxg;

import com.topsec.ti.zxg.config.DataCenterConfigure;
import com.topsec.ti.zxg.config.WebInitConfigure;
import com.topsec.ti.zxg.mapper.UserMapper;
import com.topsec.ti.zxg.service.AlertService;
import com.topsec.ti.zxg.service.CaService;
import com.topsec.ti.zxg.utils.IPExt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.embedded.MultipartConfigFactory;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.format.FormatterRegistry;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.filter.CharacterEncodingFilter;
import org.springframework.web.servlet.LocaleResolver;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

import javax.annotation.PostConstruct;
import javax.servlet.Filter;
import javax.servlet.MultipartConfigElement;
import java.nio.charset.Charset;
import java.util.List;
import java.util.Locale;

@RestController
@EnableWebMvc
@EnableTransactionManagement
@SpringBootApplication(scanBasePackages = "com.topsec.ti.zxg")
@EnableConfigurationProperties({WebInitConfigure.class,DataCenterConfigure.class})
public class MagicjcWebApplication extends WebMvcConfigurerAdapter implements CommandLineRunner {

	@Autowired
	private CaService caService;
	@Autowired
	private UserMapper userMapper;
	@Autowired
	private AlertService alertService;
	@Autowired
	private WebInitConfigure webConfigure;
	// 用于处理编码问题
	@Bean
	public Filter characterEncodingFilter() {
		CharacterEncodingFilter characterEncodingFilter = new CharacterEncodingFilter();
		characterEncodingFilter.setEncoding("UTF-8");
		characterEncodingFilter.setForceEncoding(true);
		return characterEncodingFilter;
	}
	@Override
	public void addResourceHandlers(ResourceHandlerRegistry registry) {
		registry.addResourceHandler("swagger-ui.html")
				.addResourceLocations("classpath:/META-INF/resources/");
		registry.addResourceHandler("/webjars/**")
				.addResourceLocations("classpath:/META-INF/resources/webjars/");
	}

	@PostConstruct
	public void initIpDatas(){
		IPExt.load("");
	}

	@Override
	public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
		converters.add(new StringHttpMessageConverter(Charset.forName("UTF-8")));
	}
	@Override
	public void addFormatters (FormatterRegistry registry) {
//		registry.addConverter(new StringToComputorFramWork());
//		registry.addConverter(new StringToComputeType());
//		registry.addConverter(new StringToModeType());
//		registry.addConverter(new StringToVersionType());
//		registry.addConverter(new StringToProcessPriority());
//
//		registry.addConverter(new StringToConfigRole());
//		registry.addConverter(new StringToConfigSpaceUnit());
//		registry.addConverter(new StringToConfigTimeUnit());
	}

	@Bean
	public LocaleResolver localeResolver() {
		SessionLocaleResolver slr = new SessionLocaleResolver();
		//设置默认区域,
		slr.setDefaultLocale(Locale.CHINA);
		return slr;
	}
	@Bean(initMethod = "init")
	MagicjcInitializer magicjcInitializer(){
		return new MagicjcInitializer();
	}

	@RequestMapping("/init")
	void init() {
		if (webConfigure.isInitAuth()) {
			caService.initializeAuthorities();
			alertService.initializeAlertType();
		}
	}

	@Bean
	public MultipartConfigElement multipartConfigElement(){
		MultipartConfigFactory factory = new MultipartConfigFactory();
		factory.setMaxFileSize("40MB");
		return factory.createMultipartConfig();
	}



	public static void main(String[] args) {
		SpringApplication.run(MagicjcWebApplication.class, args);
	}

	@RequestMapping("/hello")
	String home() {
		return "Hello World!";
	}


	@Override
	public void run(String... args) throws Exception {
		/*System.out.println(this.userMapper.getById("1"));
		User u  = new User();
		u.setId("1");
		System.out.println(this.userMapper.selectOne(u));
		PageHelper.startPage(1,1);
		Page<User> list = this.userMapper.getByName("1");
		PageInfo<User> p=new PageInfo<>(list);
		System.out.println(p);
		for (User user:list) {
			System.out.println(user);
		}
		System.out.println(userMapper.getAllUser());*/
	}
}
