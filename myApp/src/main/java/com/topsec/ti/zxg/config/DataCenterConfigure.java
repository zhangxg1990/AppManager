package com.topsec.ti.zxg.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/**
 * Created by hx on 17-2-22.
 */
@ConfigurationProperties(prefix = "application.zxg.config.dc")
public class DataCenterConfigure {
  private String username;
  private String password;
  private String baseUrl;
  private String datapullUrl;
  private String apiPrefix;

  public String getApiPrefix() {
    return apiPrefix;
  }

  public void setApiPrefix(String apiPrefix) {
    this.apiPrefix = apiPrefix;
  }

  public String getUsername() {
    return username;
  }

  public void setUsername(String username) {
    this.username = username;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public String getBaseUrl() {
    return baseUrl;
  }

  public void setBaseUrl(String baseUrl) {
    this.baseUrl = baseUrl;
  }

  public String getDatapullUrl() {
    return datapullUrl;
  }

  public void setDatapullUrl(String datapullUrl) {
    this.datapullUrl = datapullUrl;
  }
}
