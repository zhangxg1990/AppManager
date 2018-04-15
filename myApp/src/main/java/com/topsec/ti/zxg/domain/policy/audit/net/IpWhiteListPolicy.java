package com.topsec.ti.zxg.domain.policy.audit.net;

import com.topsec.ti.zxg.domain.policy.PolicyContent;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by hx on 17-2-16.
 */
public class IpWhiteListPolicy extends PolicyContent {
  private String ip;
  private List<Integer> port = new ArrayList<>();

  public String getIp() {
    return ip;
  }

  public void setIp(String ip) {
    this.ip = ip;
  }

  public List<Integer> getPort() {
    return port;
  }

  public void setPort(List<Integer> port) {
    this.port = port;
  }
}
