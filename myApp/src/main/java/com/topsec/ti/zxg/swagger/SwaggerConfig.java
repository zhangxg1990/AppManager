package com.topsec.ti.zxg.swagger;

import com.google.common.base.Predicate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.context.request.async.DeferredResult;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import static com.google.common.base.Predicates.or;
import static springfox.documentation.builders.PathSelectors.regex;

/**
 * Created by hadoop on 16-4-13.
 */
@Configuration
@EnableSwagger2
@ComponentScan(basePackages = {"com.topsec.ti.zxg"})
public class SwaggerConfig extends WebMvcConfigurerAdapter {

  @Bean
  public Docket magicLampApi() {
    return new Docket(DocumentationType.SWAGGER_2)
            .groupName("api")
            .genericModelSubstitutes(DeferredResult.class)
            .useDefaultResponseMessages(false)
            .forCodeGeneration(true)
            .pathMapping("/")// base，最终调用接口后会和paths拼接在一起
            .select()
//            .paths(or(regex("/api/.*")))//过滤的接口
            .paths(paths())
            .build()
            .apiInfo(magicjcApiInfo());
  }

  //
  private Predicate<String> paths() {
    return or(
            regex("/user.*"),
            regex("/role.*"),
            regex("/device.*"),
            regex("/netprotocol.*"),
            regex("/alert.*"),
            regex("/policy.*"),
            regex("/detector.*"),
            regex("/app.*")
            /*regex("/swagger.*")*/
    );
  }

  private ApiInfo magicjcApiInfo() {
    ApiInfo apiInfo = new ApiInfo(
            "Magicjc API",//大标题
            "Magicjc API doc.",//小标题
            "0.1",//版本
            "NO terms of service",
            new Contact("TopInsight TGroup", "", ""),//作者
            "The Apache License, Version 2.0",//链接显示文字
            "http://www.apache.org/licenses/LICENSE-2.0.html"//网站链接
    );
    return apiInfo;
  }
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("**/**").addResourceLocations("classpath:/META-INF/resources/");
        registry.addResourceHandler("swagger-ui.html").addResourceLocations("classpath:/META-INF/resources/");
        registry.addResourceHandler("/webjars/**").addResourceLocations("classpath:/META-INF/resources/webjars/");
    }
}
