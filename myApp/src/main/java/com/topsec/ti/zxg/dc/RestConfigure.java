package com.topsec.ti.zxg.dc;

import com.topsec.tsm.util.StringFormater;

/**
 * Created by hx on 17-2-28.
 */
public class RestConfigure {
  private String url;
  private String domain;
  private String path;

  public String getDomain() {
    return domain;
  }

  public void setDomain(String domain) {
    this.domain = domain;
  }

  public String getPath() {
    return path;
  }

  public void setPath(String path) {
    this.path = path;
  }

  public String getUrl(){
    if (url==null) {
      url = StringFormater.format("{}/{}", domain, path);
    }
    return url;
  }
}
