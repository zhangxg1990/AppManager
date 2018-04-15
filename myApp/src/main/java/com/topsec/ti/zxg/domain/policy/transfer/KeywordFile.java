package com.topsec.ti.zxg.domain.policy.transfer;

import com.topsec.ti.zxg.domain.policy.PolicyContent;

/**
 * Created by hx on 17-2-16.
 * 关键词文件
 */
public class KeywordFile  extends PolicyContent {
  private String rule_type;
  private int min_match_count;
  private String rule_context;

  public String getRule_type() {
    return rule_type;
  }

  public void setRule_type(String rule_type) {
    this.rule_type = rule_type;
  }

  public int getMin_match_count() {
    return min_match_count;
  }

  public void setMin_match_count(int min_match_count) {
    this.min_match_count = min_match_count;
  }

  public String getRule_context() {
    return rule_context;
  }

  public void setRule_context(String rule_context) {
    this.rule_context = rule_context;
  }
}
