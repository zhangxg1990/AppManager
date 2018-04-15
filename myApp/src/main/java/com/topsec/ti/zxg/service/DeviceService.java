package com.topsec.ti.zxg.service;

import com.github.pagehelper.PageInfo;
import com.topsec.ti.zxg.dc.DataWrapperBean;
import com.topsec.ti.zxg.domain.device.Device;
import com.topsec.ti.zxg.domain.device.DeviceTopologyCoordinate;
import com.topsec.ti.zxg.dto.DtoDeviceTopologyCoordinate;

import java.util.List;
import java.util.Map;

/**
 * Created by hx on 17-2-10.
 * //设备检测管理
 */
public interface DeviceService {
    //获取拓扑图及上级设备
    Device getDevicesByTopologyAndAll(String centerId);
    //获取本级及下级拓扑图
    Device getDevicesByTopology(String centerId);
    PageInfo<Device> getDevices(Integer page, Integer size, String centerId);
    Device getDeviceById(String device_id);
    List<Map<String,Object>> deviceTotal(String centerId);
    List<Map<String,Object>> deviceActiveTotal(String centerId);
    List<Map<String,Object>> glzxGroupTotal(String centerId);
    void initializeParentDevice();

    //查询本级下的设备(根据类型查询)
    List<Device> getDevicesByCenterId(String centerId, int... devicetype);

    //统计策略和告警数量
    Map<String,Object> getPolicyAndAlertCnt(String centerId);
    //存储设备拓扑的xml信息
    String saveDtc(DeviceTopologyCoordinate deviceTopologyCoordinate);
    //获取设备拓扑的xml信息
    DtoDeviceTopologyCoordinate getDtc(String deviceId);

  DataWrapperBean<Device> getDevicesByRest(String centerId);

}
