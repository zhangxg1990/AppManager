package com.topsec.ti.zxg.mapper;

import com.topsec.ti.zxg.domain.device.Device;
import com.topsec.ti.zxg.domain.policy.PolicyInfo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by hx on 17-2-17.
 */
public interface PolicyMapper {

  //多条件查询策略
  List<PolicyInfo> getPolicyInfos(@Param("type") String type, @Param("detectors") Device... detectors);

  int getPolicyCntByDeviceId(String deviceId);
}
