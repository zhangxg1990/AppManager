package com.topsec.ti.zxg.service;

import com.github.pagehelper.PageInfo;
import com.topsec.ti.zxg.dc.DataWrapperBean;
import com.topsec.ti.zxg.domain.netaudit.NetProtocol;
import com.topsec.ti.zxg.domain.netaudit.NetType;

/**
 * Created by hx on 17-2-10.
 */
public interface NetAuditService {
  //查询网络协议
  DataWrapperBean listNetProtocolPage(NetType netTyp, String device_id, String scrollId);

  //检索
  PageInfo<NetProtocol> queryNetProtocolPage(String netType, NetProtocol netProtocol, String deviceId, Integer pageNo, Integer PageSize);
}