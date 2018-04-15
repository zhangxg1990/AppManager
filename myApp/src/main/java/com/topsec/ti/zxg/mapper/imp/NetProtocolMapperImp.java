package com.topsec.ti.zxg.mapper.imp;

import com.google.gson.reflect.TypeToken;
import com.topsec.ti.zxg.dc.DataCenterRequester;
import com.topsec.ti.zxg.dc.DataWrapperBean;
import com.topsec.ti.zxg.domain.device.Device;
import com.topsec.ti.zxg.mapper.NetProtocolMapper;
import com.topsec.ti.zxg.domain.netaudit.*;
import org.apache.commons.lang.StringUtils;
import org.apache.ibatis.annotations.Param;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Repository;

import java.lang.reflect.Type;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Repository
public class NetProtocolMapperImp implements NetProtocolMapper {
    @Autowired
    @Qualifier(value = "sqlExecRestRequester")
    private DataCenterRequester dataCenterRequester;
    private Type deviceType= new TypeToken<DataWrapperBean<? extends NetProtocol>>() {}.getType();
    @Override
    public DataWrapperBean queryNetProtocolPage(NetType netType, String centerId, List<Device> detectors, String scrollId) {
        Map map = new HashMap<>();
        String testSql = "select * from  bmj."+netType.getTableName();
        StringBuilder baseSql = new StringBuilder(testSql);
        baseSql.append(" where device_id in (" + "'" +centerId +"',");
        for(Device device : detectors){
            baseSql.append("'"+device.getDevice_id()+"',");
        }
        baseSql.deleteCharAt(baseSql.length()-1).append(")");
        Type netProtocol = null;
        switch (netType){
            case CONN:
                netProtocol = new TypeToken<DataWrapperBean<ConnAudit>>() {}.getType();
                break;
            case WEB:
                netProtocol = new TypeToken<DataWrapperBean<Web>>() {}.getType();
                baseSql.append("order by time desc");break;
            case SSL:
                netProtocol = new TypeToken<DataWrapperBean<SSL>>() {}.getType();
                baseSql.append("order by time desc");break;
            case MAIL:
                netProtocol = new TypeToken<DataWrapperBean<Mail>>() {}.getType();
                baseSql.append("order by time desc");break;
            case FILE:
                netProtocol = new TypeToken<DataWrapperBean<FileTransfer>>() {}.getType();
                baseSql.append("order by time desc");break;
            case DNS:
                netProtocol = new TypeToken<DataWrapperBean<DNS>>() {}.getType();
                baseSql.append("order by time desc");break;
        }
        DataWrapperBean dataWrapperBean = null;
        if(!StringUtils.isEmpty(scrollId)){
            dataWrapperBean = dataCenterRequester.fetchNextObject(scrollId,netProtocol);
        }
        else
            dataWrapperBean = dataCenterRequester.queryObject(baseSql.toString(),netProtocol);
        return dataWrapperBean;
    }

    @Override
    public List<NetProtocol> queryNetProtocolPage(@Param("netType") NetType netType, @Param("type") String type, @Param("netProtocol") NetProtocol netProtocol, @Param("device_id") String device_id) {
        return null;
    }

    public List<NetProtocol> queryNetProtocolPage(NetType netType, NetProtocol netProtocol,String deviceId) {
        return null;
    }
    /*@Override
    public List<NetProtocol> queryNetProtocolPage(NetType netType, String centerId,List<Device> detectors) {
        String testSql = "select * from bmj."+netType.getTableName();
        StringBuilder baseSql = new StringBuilder(testSql);
        *//*baseSql.append(" where device_id in (" + "'" +centerId +"',");
        for(Device device : detectors){
            baseSql.append("'"+device.getDevice_id()+"',");
        }
        baseSql.deleteCharAt(baseSql.length()-1).append(")");*//*
        Type netProtocol = null;
        switch (netType){
            case CONN:
                netProtocol = new TypeToken<DataWrapperBean<ConnAudit>>() {}.getType();break;
            case WEB:
                netProtocol = new TypeToken<DataWrapperBean<Web>>() {}.getType();break;
            case SSL:
                netProtocol = new TypeToken<DataWrapperBean<SSL>>() {}.getType();break;
            case MAIL:
                netProtocol = new TypeToken<DataWrapperBean<Mail>>() {}.getType();break;
            case FILE:
                netProtocol = new TypeToken<DataWrapperBean<FileTransfer>>() {}.getType();break;
            case DNS:
                netProtocol = new TypeToken<DataWrapperBean<DNS>>() {}.getType();break;
        }
        DataWrapperBean dataWrapperBean = dataCenterRequester.queryObject(baseSql.toString(),netProtocol);
        return dataWrapperBean.getData();
    }*/
}
