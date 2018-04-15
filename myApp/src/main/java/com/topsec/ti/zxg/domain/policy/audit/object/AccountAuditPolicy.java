package com.topsec.ti.zxg.domain.policy.audit.object;

import com.topsec.ti.zxg.domain.policy.PolicyContent;

/**
 * Created by hx on 17-2-16.
 */
public class AccountAuditPolicy  extends PolicyContent{
  private String account_type;
  private String account;
  private int rule_type;
  private int match_type;

  public String getAccount_type() {
    return account_type;
  }

  public void setAccount_type(String account_type) {
    this.account_type = account_type;
  }

  public String getAccount() {
    return account;
  }

  public void setAccount(String account) {
    this.account = account;
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
