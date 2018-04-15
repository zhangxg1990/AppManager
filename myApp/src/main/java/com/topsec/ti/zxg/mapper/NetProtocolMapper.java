package com.topsec.ti.zxg.mapper;

import com.topsec.ti.zxg.dc.DataWrapperBean;
import com.topsec.ti.zxg.domain.device.Device;
import com.topsec.ti.zxg.domain.netaudit.NetProtocol;
import com.topsec.ti.zxg.domain.netaudit.NetType;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by hx on 17-2-10.
 */
public interface NetProtocolMapper {

  //查询网络协议
  DataWrapperBean queryNetProtocolPage(NetType netType, String deviceId, List<Device> detectors, String scrollId);

  //查询网络协议
  List<NetProtocol> queryNetProtocolPage(@Param("netType") NetType netType, @Param("type") String type, @Param("netProtocol") NetProtocol netProtocol, @Param("device_id") String device_id);
}
