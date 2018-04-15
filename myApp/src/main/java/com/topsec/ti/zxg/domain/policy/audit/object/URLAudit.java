package com.topsec.ti.zxg.domain.policy.audit.object;

import com.topsec.ti.zxg.domain.policy.PolicyContent;

/**
 * Created by hx on 17-2-16.
 */
public class URLAudit  extends PolicyContent {
  private String  url;
  private int rule_type;
  private int match_type;

  public String getUrl() {
    return url;
  }

  public void setUrl(String url) {
    this.url = url;
  }

  public int getRule_type() {
    return rule_type;
  }

  public void setRule_type(int rule_type) {
    this.rule_type = rule_type;
  }

  public int getMatch_type() {
    return match_type;
  }

  public void setMatch_type(int match_type) {
    this.match_type = match_type;
  }
}
