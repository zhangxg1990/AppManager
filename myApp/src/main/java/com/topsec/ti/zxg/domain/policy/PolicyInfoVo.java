package com.topsec.ti.zxg.domain.policy;

import com.topsec.ti.zxg.support.policy.PolicyExternalInfo;

/**
 * Created by hx on 17-2-17.
 * 告警展示包装类
 */
public class PolicyInfoVo {
  private PolicyInfo policyInfo;//策略基本信息
  private PolicyContent policyContent;//策略详细信息
  private PolicyExternalInfo policyExternalInfo;//策略版本和id信息

  public PolicyInfo getPolicyInfo() {
    return policyInfo;
  }

  public void setPolicyInfo(PolicyInfo policyInfo) {
    this.policyInfo = policyInfo;
  }

  public PolicyContent getPolicyContent() {
    return policyContent;
  }

  public void setPolicyContent(PolicyContent policyContent) {
    this.policyContent = policyContent;
  }

  public PolicyExternalInfo getPolicyExternalInfo() {
    return policyExternalInfo;
  }

  public void setPolicyExternalInfo(PolicyExternalInfo policyExternalInfo) {
    this.policyExternalInfo = policyExternalInfo;
  }
}
