package com.topsec.ti.zxg.domain.netaudit;

/**
 * Created by hx on 17-2-10.
 */
public class Web extends NetProtocol {
  //Web
  private String domain;
  private String url;
  private String method;
  private int ret_code;
  private String user_agent;
  private String cookie;
  private String server;
  private String refer;

  public String getDomain() {
    return domain;
  }

  public void setDomain(String domain) {
    this.domain = domain;
  }

  public String getUrl() {
    return url;
  }

  public void setUrl(String url) {
    this.url = url;
  }

  public String getMethod() {
    return method;
  }

  public void setMethod(String method) {
    this.method = method;
  }

  public int getRet_code() {
    return ret_code;
  }

  public void setRet_code(int ret_code) {
    this.ret_code = ret_code;
  }

  public String getUser_agent() {
    return user_agent;
  }

  public void setUser_agent(String user_agent) {
    this.user_agent = user_agent;
  }

  public String getCookie() {
    return cookie;
  }

  public void setCookie(String cookie) {
    this.cookie = cookie;
  }

  public String getServer() {
    return server;
  }

  public void setServer(String server) {
    this.server = server;
  }

  public String getRefer() {
    return refer;
  }

  public void setRefer(String refer) {
    this.refer = refer;
  }
}