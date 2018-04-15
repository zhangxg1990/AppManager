
package com.topsec.ti.zxg.support;

import com.topsec.tsm.util.StringFormater;
import org.apache.ibatis.executor.statement.StatementHandler;
import org.apache.ibatis.logging.Log;
import org.apache.ibatis.logging.LogFactory;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.ParameterMapping;
import org.apache.ibatis.mapping.ParameterMode;
import org.apache.ibatis.plugin.*;
import org.apache.ibatis.session.ResultHandler;

import java.sql.Statement;
import java.util.List;
import java.util.Properties;
import java.util.StringTokenizer;

@Intercepts(
        {
                @Signature(type = StatementHandler.class, method = "update", args = {Statement.class}),
                @Signature(type = StatementHandler.class, method = "batch", args = {Statement.class}),
                @Signature(type = StatementHandler.class, method = "query", args = {Statement.class, ResultHandler.class}),
        }
)
public class StatementLoggerPlugin implements Interceptor {


  private Properties properties;
  private Log statementLog = LogFactory.getLog(this.getClass());


  protected String removeBreakingWhitespace(String original) {
    StringTokenizer whitespaceStripper = new StringTokenizer(original);
    StringBuilder builder = new StringBuilder();
    while (whitespaceStripper.hasMoreTokens()) {
      builder.append(whitespaceStripper.nextToken());
      builder.append(" ");
    }
    return builder.toString();
  }

  @Override
  public Object intercept(Invocation invocation) throws Throwable {
    StatementHandler statementHandler = (StatementHandler) invocation.getTarget();
    BoundSql boundSql = statementHandler.getBoundSql();
    statementLog.warn(StringFormater.format("==> SQL:{}",removeBreakingWhitespace(statementHandler.getBoundSql().getSql())));
    List<ParameterMapping> parameterMappings = boundSql.getParameterMappings();
    Object parameterObject = boundSql.getParameterObject();
//    if (parameterMappings != null) {
//      StringBuilder parameterAndValues = new StringBuilder();
//      for (int i = 0; i < parameterMappings.size(); i++) {
//        ParameterMapping parameterMapping = parameterMappings.get(i);
//        if (parameterMapping.getMode() == ParameterMode.OUT) continue;
//        Object value;
//        String propertyName = parameterMapping.getProperty();
//        if (boundSql.hasAdditionalParameter(propertyName)) { // issue #448 ask first for additional params
//          value = boundSql.getAdditionalParameter(propertyName);
//        } else if (parameterObject == null) {
//          value = null;
//          TypeHandlerRegistry typeHandlerRegistry=null;
//        } else if (typeHandlerRegistry.hasTypeHandler(parameterObject.getClass())) {
//          value = parameterObject;
//        } else {
//          MetaObject metaObject = configuration.newMetaObject(parameterObject);
//          value = metaObject.getValue(propertyName);
//        }
//        parameterAndValues.append(value);
//
//        if (i < parameterMappings.size() - 1) parameterAndValues.append(",");
//      }
//      statementLog.warn(parameterAndValues.toString());
//    }

    StringBuilder sb = new StringBuilder();
    for (int i = 0; i < parameterMappings.size(); i++) {
      ParameterMapping p = parameterMappings.get(i);
      if (p.getMode() == ParameterMode.OUT) continue;
      if (i > 0) sb.append(",");
      sb.append(p.getProperty());
    }
    statementLog.warn(sb.toString());
    if (boundSql.getParameterObject() != null) statementLog.warn(boundSql.getParameterObject().toString());

    return invocation.proceed();
  }

  @Override
  public Object plugin(Object target) {
    return Plugin.wrap(target, this);
  }

  @Override
  public void setProperties(Properties properties) {
    this.properties = properties;
  }

  public Properties getProperties() {
    return properties;
  }
}
