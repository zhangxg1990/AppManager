package com.topsec.ti.zxg.config;

import com.github.pagehelper.PageHelper;
import com.topsec.ti.zxg.support.StatementLoggerPlugin;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.SqlSessionTemplate;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.transaction.annotation.TransactionManagementConfigurer;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.util.Properties;

/**
 * Created by hx on 17-2-9.
 */
@Configuration
@EnableTransactionManagement
@MapperScan({"com.topsec.ti.zxg.mapper"})
public class MyBatisConfig
        implements TransactionManagementConfigurer
{

  @Autowired
  private DataSource dataSource;

//  @Autowired
//  private PlatformTransactionManager   transactionManager;

  @Bean(name = "sqlSessionFactory")
  public SqlSessionFactory sqlSessionFactoryBean() {
    SqlSessionFactoryBean bean = new SqlSessionFactoryBean();
    bean.setDataSource(dataSource);
    bean.setTypeAliasesPackage("com.topsec.ti.zxg.domain");

    //分页插件
    PageHelper pageHelper = new PageHelper();
    Properties properties = new Properties();
    properties.setProperty("reasonable", "true");
    properties.setProperty("supportMethodsArguments", "true");
    properties.setProperty("returnPageInfo", "check");
//    properties.setProperty("params", "count=countSql");
    pageHelper.setProperties(properties);

    StatementLoggerPlugin statementLoggerPlugin = new StatementLoggerPlugin();
    //添加插件
    bean.setPlugins(new Interceptor[]{pageHelper,statementLoggerPlugin});

    //添加XML目录
//    ResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
    try {
//      bean.setMapperLocations(resolver.getResources("classpath:/com/topsec/ti/zxg/mapper/*.xml"));
      return bean.getObject();
    } catch (Exception e) {
      e.printStackTrace();
      throw new RuntimeException(e);
    }
  }

  @Bean
  public SqlSessionTemplate sqlSessionTemplate(SqlSessionFactory sqlSessionFactory) {
    return new SqlSessionTemplate(sqlSessionFactory);
  }
//
  @Bean(name = "transactionManager")
  //@Bean
  @Override
  public PlatformTransactionManager annotationDrivenTransactionManager() {
     return new DataSourceTransactionManager(dataSource);
  }


  @Bean(name = "txManager2")
  public PlatformTransactionManager txManager2(EntityManagerFactory factory) {
    return new JpaTransactionManager(factory);
  }

//  @Bean(name = "mybatisTransactionManager")
//  public DataSourceTransactionManager testTransactionManager() {
//    return new DataSourceTransactionManager(dataSource);
//  }


}
