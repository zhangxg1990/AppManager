package com.topsec.ti.zxg.support.policy;

/**
 * Created by hx on 17-2-17.
 */
public class PolicyExternalInfo {

  private int[] ruleIds;
  private int[] versions;

  public PolicyExternalInfo(int[] ruleIds, int[] versions) {
    this.ruleIds = ruleIds;
    this.versions = versions;
  }

  public int[] getRuleIds() {
    return ruleIds;
  }

  public void setRuleIds(int[] ruleIds) {
    this.ruleIds = ruleIds;
  }

  public int[] getVersions() {
    return versions;
  }

  public void setVersions(int[] versions) {
    this.versions = versions;
  }
}
