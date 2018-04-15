package com.topsec.ti.zxg.mapper;

import com.topsec.ti.zxg.domain.Iplocate;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface DataPullMapper {
    //查询昨日攻击源ip(group by)
    List<Iplocate> queryIplocates();

    //查询所有数据源,用作数据展示用
    List<Iplocate> queryIplocatesAll();

    //truncate mcjc_ip_locate
    void truncateIp();
    void executeUpdate();
    void executeDayUpdate();
    //批量插入
    void insertIplocates(@Param("iplocates") List<Iplocate> iplocates);
}
