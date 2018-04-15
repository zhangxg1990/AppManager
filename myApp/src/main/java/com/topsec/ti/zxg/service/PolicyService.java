package com.topsec.ti.zxg.service;

import com.topsec.ti.zxg.domain.policy.PolicyInfoVo;
import com.topsec.ti.zxg.domain.policy.PolicyType;
import com.topsec.ti.zxg.dto.DtoPolicyType;
import com.topsec.ti.zxg.support.MyPageInfo;

import java.util.List;
import java.util.Map;

/**
 * Created by hx on 17-2-10.
 */
public interface PolicyService  {

  //列出所有的策略类型
  DtoPolicyType getAllDtoPolicyType();

  //初始化所有的策略类型
  void initializePolicyType();

  //删除所有策略类型
  void deleteAllPolicyType();

  //查询某种类型的策略
  MyPageInfo<PolicyInfoVo> getPolicyInfoByType(String type, Integer pageNo, Integer pageSize);

  //获取检查策略的分类
  PolicyType checkTypeOfPolicy(String name);

  //查看本级策略
  MyPageInfo<PolicyInfoVo> getMyLevelPolicies(String type, Integer pageNo, Integer pageSize, String centerId);

  MyPageInfo<PolicyInfoVo> getDetectorPolicies(String type, Integer pageNo, Integer pageSize, String centerId);

  //查看所有检查策略数量
  List<Map<String, Object>> allPolicyCount();


  //查询某种类型某个管理中心的策略
  List<PolicyInfoVo> getPolicyInfoByTypeAndCenter(String type, String center);


  int getPolicyCntByDeviceId(String deviceId);
}
