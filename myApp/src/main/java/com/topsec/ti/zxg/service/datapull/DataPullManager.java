package com.topsec.ti.zxg.service.datapull;

import com.topsec.ti.zxg.domain.Iplocate;
import com.topsec.ti.zxg.mapper.DataPullMapper;
import com.topsec.ti.zxg.repository.IpLocateRepository;
import com.topsec.ti.zxg.utils.IPExt;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class DataPullManager extends DataPullService{


    @Autowired
    private DataPullMapper ipMapper;
    @Autowired
    private IpLocateRepository ipLocateRepository;
    private final int defaultValue = 5000;
    @Override
    public void pullIpData(){
        ipMapper.truncateIp();
        List<Iplocate> iplocateList = ipMapper.queryIplocates();
        List<Iplocate> newIplocates = new ArrayList<>();
        int ipOffset = 1;
        //每5000条提交一次
        for(Iplocate iplocate : iplocateList){
            if(ipOffset%defaultValue==0){
                ipMapper.insertIplocates(newIplocates);
                newIplocates.clear();
            }
            boolean isInsert = IPExt.buildIplocate(iplocate);
            if(!isInsert)
                continue;
            newIplocates.add(iplocate);
            ipOffset ++ ;
        }
        if(newIplocates.size()!=0)
            ipMapper.insertIplocates(newIplocates);
    }

    @Override
    public void pullIpDataAll() {
        ipMapper.truncateIp();
        List<Iplocate> iplocateList = ipMapper.queryIplocatesAll();
        List<Iplocate> newIplocates = new ArrayList<>();
        int ipOffset = 1;
        //每5000条提交一次
        for(Iplocate iplocate : iplocateList){
            if(ipOffset%defaultValue==0){
                ipMapper.insertIplocates(newIplocates);
                newIplocates.clear();
            }
            boolean isInsert = IPExt.buildIplocate(iplocate);
            if(!isInsert)
                continue;
            newIplocates.add(iplocate);
            ipOffset ++ ;
        }
        if(newIplocates.size()!=0)
            ipMapper.insertIplocates(newIplocates);
    }

    @Override
    public void executeUpdate() {
        ipMapper.executeUpdate();
    }

    @Override
    public void executeDayUpdate() {
        ipMapper.executeDayUpdate();
    }

    /*
    造数据,随机生成ip
     */


    /*@Override
    public void pullIpData(){
        ipMapper.truncateTable();
        List<Iplocate> iplocateList = new ArrayList<>();
        for(int i = 0;i<=10000;i++){
            Iplocate datapull = new Iplocate();
            datapull.setSip(getRandomIp());
        }
        List<Iplocate> newIplocates = new ArrayList<>();
        int ipOffset = 1;
        //每5000条提交一次
        for(Iplocate datapull : iplocateList){
            if(ipOffset%defaultValue==0){
                ipMapper.insertIplocates(newIplocates);
                newIplocates.clear();
            }
            IPExt.buildIplocate(datapull);
            newIplocates.add(datapull);
            ipOffset ++ ;
        }
        if(newIplocates.size()!=0)
            ipMapper.insertIplocates(newIplocates);
    }*/

    @Override
    public void run() {
        SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");//设置日期格式
        System.out.println("执行啦========"+ df.format(new Date()));
        pullIpData();
        executeDayUpdate();
    }
}
