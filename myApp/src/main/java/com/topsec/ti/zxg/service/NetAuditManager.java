package com.topsec.ti.zxg.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.topsec.ti.zxg.dc.DataWrapperBean;
import com.topsec.ti.zxg.domain.device.Device;
import com.topsec.ti.zxg.domain.netaudit.NetProtocol;
import com.topsec.ti.zxg.domain.netaudit.NetType;
import com.topsec.ti.zxg.mapper.NetProtocolMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by hx on 17-2-10.
 */
@Transactional
@Service
public class NetAuditManager implements NetAuditService {
  @Autowired
  //@Qualifier("netProtocolMapperImp")
  private NetProtocolMapper netProtocolMapper;
  @Autowired
  private DeviceService deviceService;
  @Override
  public DataWrapperBean listNetProtocolPage(NetType netType, String centerId,
                                             String scrollId) {
    List<Device> detectors = deviceService.getDevicesByCenterId(centerId, 1);
    DataWrapperBean list = netProtocolMapper.queryNetProtocolPage(netType,centerId,detectors,scrollId);
    return list;
  }



  @Override
  public PageInfo<NetProtocol> queryNetProtocolPage(String netType, NetProtocol netProtocol, String deviceId, Integer pageNo, Integer PageSize) {
    PageHelper.startPage(pageNo,PageSize);
    if(netProtocol==null)
      netProtocol = new NetProtocol();
    List<NetProtocol> netProtocols = netProtocolMapper.queryNetProtocolPage(NetType.valueOf(netType),netType.toUpperCase(),netProtocol,deviceId);
    PageInfo<NetProtocol> pageInfo = new PageInfo<>(netProtocols);
    return pageInfo;
  }
  private NetType buildNetType(String netType){
    return null;
  }
  public static void main(String args[]){
    String s = "conn";
    NetType netType = NetType.valueOf(s);
    int i =1;
  }
}