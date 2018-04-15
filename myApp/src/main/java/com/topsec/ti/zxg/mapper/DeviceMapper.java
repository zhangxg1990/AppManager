package com.topsec.ti.zxg.mapper;

import com.topsec.ti.zxg.domain.device.Device;
import org.apache.ibatis.annotations.Param;
import java.util.List;
import java.util.Map;

public interface DeviceMapper{
  List<Device> getDevicesByTp();

  List<Device> getDevices(String device_id);

  Device getDeviceById(String device_id);

  List<Map<String, Object>> deviceTotal(String centerId);

  List<Map<String, Object>> deviceActiveTotal(String centerId);

  List<Map<String, Object>> glzxGroupTotal(String centerId);

  int addDevice(@Param("device") Device device);

  //根据管理中心id查询下级管理中心或者检测器
  List<Device> getDevicesByCenterId(@Param("parent_id") String centerId, @Param("device_types") int... device_types);
}
