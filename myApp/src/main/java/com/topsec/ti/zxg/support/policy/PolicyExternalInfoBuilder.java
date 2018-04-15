package com.topsec.ti.zxg.support.policy;

import com.topsec.ti.zxg.support.BitFieldHelper;

/**
 * Created by hx on 17-2-17.
 */
public class PolicyExternalInfoBuilder {
  public static BitFieldHelper bitFieldHelper = new BitFieldHelper(64, 16);
  public static int idCount = 4;
  private int[] ruleIds = new int[idCount];
  private int[] versions = new int[idCount];

  public PolicyExternalInfoBuilder buildIds(Long id) {
    for (int i = idCount - 1; i >= 0; i--) {
      ruleIds[idCount - 1 - i] = (int) bitFieldHelper.getSectionValue(id, i);
    }
    return this;
  }

  public PolicyExternalInfoBuilder buildVersions(Long id) {
    for (int i = idCount - 1; i >= 0; i--) {
      versions[idCount - 1 - i] = (int) bitFieldHelper.getSectionValue(id, i);
    }
    return this;
  }

  public PolicyExternalInfo build() {
    return new PolicyExternalInfo(ruleIds, versions);
  }

}
