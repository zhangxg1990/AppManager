package com.topsec.ti.zxg.mapper;

import com.topsec.ti.zxg.domain.Iplocate;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface IplocateMapper {
    //查询昨日攻击源ip(group by)
    List<Iplocate> queryIplocates();

    //truncate mcjc_ip_locate
    void truncateTable();

    //批量插入
    void insertIplocates(@Param("iplocates") List<Iplocate> iplocates);
}
