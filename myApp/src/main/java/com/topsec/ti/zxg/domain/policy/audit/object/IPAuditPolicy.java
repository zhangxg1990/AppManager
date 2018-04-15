package com.topsec.ti.zxg.domain.policy.audit.object;

import com.topsec.ti.zxg.domain.policy.PolicyContent;

/**
 * Created by hx on 17-2-16.
 * ip审计
 */
public class IPAuditPolicy extends PolicyContent {
  private String sip;
  private String sport;
  private String dip;
  private String dport;
  private int protocol;

  public String getSip() {
    return sip;
  }

  public void setSip(String sip) {
    this.sip = sip;
  }

  public String getSport() {
    return sport;
  }

  public void setSport(String sport) {
    this.sport = sport;
  }

  public String getDip() {
    return dip;
  }

  public void setDip(String dip) {
    this.dip = dip;
  }

  public String getDport() {
    return dport;
  }

  public void setDport(String dport) {
    this.dport = dport;
  }

  public int getProtocol() {
    return protocol;
  }

  public void setProtocol(int protocol) {
    this.protocol = protocol;
  }
}
