package com.topsec.ti.zxg.config;

import org.springframework.boot.autoconfigure.orm.jpa.JpaProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.transaction.PlatformTransactionManager;

import javax.sql.DataSource;
import java.util.Map;

/**
 * Created by hx on 17-2-9.
 */
//@Configuration
//@EnableTransactionManagement
//@EntityScan(basePackages= "com.topsec.ti.zxg.domain")
//@EnableJpaRepositories(basePackages = "com.topsec.ti.zxg.repository")

//@EnableJpaRepositories(entityManagerFactoryRef="entityManagerFactoryPrimary",
//        transactionManagerRef="transactionManager",
//        basePackages= {"com.topsec.ti.zxg.repository"})
public class JpaDataConfig {

    //@Autowired
    private DataSource dataSource;

    //  @Autowired
    private JpaProperties jpaProperties;

    //  @Bean(name="entityManagerFactoryPrimary")
//  @Primary
    public LocalContainerEntityManagerFactoryBean customerEntityManagerFactory(EntityManagerFactoryBuilder builder) {
        return builder.dataSource(dataSource)
                .properties(getVendorProperties(dataSource))
                .packages("com.topsec.ti.zxg.domain", "com.topsec.ti.zxg.repository")
                .persistenceUnit("system")
                .build();
    }

//  @Bean(name = "transactionManager")
//  @Override
//  public PlatformTransactionManager annotationDrivenTransactionManager() {
//    return new DataSourceTransactionManager(dataSource);
//  }

    //  @Bean(name = "transactionManager")
    PlatformTransactionManager transactionManagerSecondary(EntityManagerFactoryBuilder builder) {
        return new JpaTransactionManager(customerEntityManagerFactory(builder).getObject());
    }

    private Map<String, String> getVendorProperties(DataSource dataSource) {
        return jpaProperties.getHibernateProperties(dataSource);
    }

}
