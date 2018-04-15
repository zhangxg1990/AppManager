package com.topsec.ti.zxg.support.policy;

import com.google.gson.Gson;
import com.topsec.ti.zxg.domain.policy.PolicyContent;
import com.topsec.ti.zxg.domain.policy.PolicyInfo;
import com.topsec.ti.zxg.support.BitFieldHelper;

/**
 * Created by hx on 17-2-18.
 */
public class PolicyHelper {
  private static BitFieldHelper bitFieldHelper = new BitFieldHelper(64,16);
  private static Gson gson = new Gson();
  public static PolicyContent buildContent(PolicyInfo policyInfo, Class<? extends PolicyContent> cls) {
    if (cls == null) return null;
    String content = policyInfo.getPolicy_content();
    if (content != null)
      try {
        content = content.substring(1,content.length()-1);
        return gson.fromJson(content, cls);
      } catch (Exception e) {
        e.printStackTrace();
        return null;
      }
    else return null;
  }


  public static PolicyExternalInfo buildExternalInfo(PolicyInfo policyInfo) {
    return new PolicyExternalInfoBuilder().buildIds(policyInfo.getPolicy_id()).buildVersions(policyInfo.getPolicy_version()).build();
  }
}
