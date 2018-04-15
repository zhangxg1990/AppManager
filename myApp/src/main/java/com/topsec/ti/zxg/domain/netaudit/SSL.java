package com.topsec.ti.zxg.domain.netaudit;

/**
 * Created by hx on 17-2-10.
 */
public class SSL extends NetProtocol {
  //ssl
  private String finger;
  private String country;
  private String organize;
  private String cname;
  private String sni;
  private String uorganize;
  private String ucname;
  public String getFinger() {
    return finger;
  }

  public void setFinger(String finger) {
    this.finger = finger;
  }

  public String getCountry() {
    return country;
  }

  public void setCountry(String country) {
    this.country = country;
  }

  public String getOrganize() {
    return organize;
  }

  public void setOrganize(String organize) {
    this.organize = organize;
  }

  public String getCname() {
    return cname;
  }

  public void setCname(String cname) {
    this.cname = cname;
  }

  public String getSni() {
    return sni;
  }

  public void setSni(String sni) {
    this.sni = sni;
  }

  public String getUorganize() {
    return uorganize;
  }

  public void setUorganize(String uorganize) {
    this.uorganize = uorganize;
  }

  public String getUcname() {
    return ucname;
  }

  public void setUcname(String ucname) {
    this.ucname = ucname;
  }

}