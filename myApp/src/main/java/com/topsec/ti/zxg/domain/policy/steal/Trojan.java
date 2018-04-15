package com.topsec.ti.zxg.domain.policy.steal;

import com.topsec.ti.zxg.domain.policy.PolicyContent;

/**
 *
 * Created by hx on 17-2-15.
 * 木马攻击窃密
 *
 */

public class Trojan extends PolicyContent {
  private String trojan_id;//木马分类编号
  private int store_pcap;//是否进行流的报文留存
  private String os;//适用的操作系统
  private String trojan_name;//木马名称
  private int trojan_type;//木马类型
  private String descr;//描述
  private String rule;//内容

  public String getTrojan_id() {
    return trojan_id;
  }

  public void setTrojan_id(String trojan_id) {
    this.trojan_id = trojan_id;
  }

  public int getStore_pcap() {
    return store_pcap;
  }

  public void setStore_pcap(int store_pcap) {
    this.store_pcap = store_pcap;
  }

  public String getOs() {
    return os;
  }

  public void setOs(String os) {
    this.os = os;
  }

  public String getTrojan_name() {
    return trojan_name;
  }

  public void setTrojan_name(String trojan_name) {
    this.trojan_name = trojan_name;
  }

  public int getTrojan_type() {
    return trojan_type;
  }

  public void setTrojan_type(int trojan_type) {
    this.trojan_type = trojan_type;
  }

  public String getDescr() {
    return descr;
  }

  public void setDescr(String descr) {
    this.descr = descr;
  }

  public String getRule() {
    return rule;
  }

  public void setRule(String rule) {
    this.rule = rule;
  }
}
