package com.topsec.ti.zxg.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Created by hx on 17-2-14.
 */
@ConfigurationProperties(prefix = "application.zxg.config.web")
public class WebInitConfigure {

  private boolean initAuth = false;
  private boolean initPolicyType = false;
  private String initAdminPassword = "admin";

  private String centerId;

  public boolean isInitAuth() {
    return initAuth;
  }

  public void setInitAuth(boolean initAuth) {
    this.initAuth = initAuth;
  }

  public boolean isInitPolicyType() {
    return initPolicyType;
  }

  public void setInitPolicyType(boolean initPolicyType) {
    this.initPolicyType = initPolicyType;
  }

  public String getCenterId() {
    return centerId;
  }

  public void setCenterId(String centerId) {
    this.centerId = centerId;
  }

  public String getInitAdminPassword() {
    return initAdminPassword;
  }

  public void setInitAdminPassword(String initAdminPassword) {
    this.initAdminPassword = initAdminPassword;
  }
}
