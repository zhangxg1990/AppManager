package com.topsec.ti.zxg.domain;

import com.topsec.tsm.base.persistence.Resource;

import javax.persistence.*;

/**
 * Created by hx on 17-2-20.
 */
@Entity
@Table(name = "MCLP_APP_SYSTEM")
@Inheritance(strategy = InheritanceType.JOINED)
public class AppSystem extends Resource {
  @Column(name="URL")
  private String url;
  @Column(name="PHONE")
  private  String phone;

  public String getUrl() {
    return url;
  }

  public void setUrl(String url) {
    this.url = url;
  }

  public String getPhone() {
    return phone;
  }

  public void setPhone(String phone) {
    this.phone = phone;
  }
}
