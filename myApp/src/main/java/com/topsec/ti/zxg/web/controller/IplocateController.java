package com.topsec.ti.zxg.web.controller;

import com.topsec.ti.zxg.service.datapull.DataPullService;
import com.topsec.ti.zxg.web.ResourceTypeDefinition;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Date;

@RestController
@Api(value = "IplocateController", tags = "ip定位管理",
        consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,
        produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
@RequestMapping(ResourceTypeDefinition.DATAPULL)
public class IplocateController extends BaseController{
    @Autowired
    private DataPullService iplocateService;

    @PreAuthorize("hasAnyAuthority('1001','1')")
    @ApiOperation(value = "ip定位数据汇入")
    @RequestMapping(value = "/pullIpdata", method = RequestMethod.GET)
    public ResponseEntity<String> pullIpdata() {
        long startTime = new Date().getTime();
        iplocateService.pullIpData();
        long endTime = new Date().getTime();
        return ok("总共花费时间:" + (endTime-startTime)/1000/60 + "分钟");
    }

    @PreAuthorize("hasAnyAuthority('1002','1')")
    @ApiOperation(value = "ip定位数据汇入全部")
    @RequestMapping(value = "/pullIpdataAll", method = RequestMethod.GET)
    public ResponseEntity<String> pullIpdataAll() {
        long startTime = new Date().getTime();
        iplocateService.pullIpDataAll();
        long endTime = new Date().getTime();
        return ok("总共花费时间:" + (endTime-startTime)/1000/60 + "分钟");
    }
    @PreAuthorize("hasAnyAuthority('1003','1')")
    @ApiOperation(value = "执行分析结果,全量分析")
    @RequestMapping(value = "/executeUpdate", method = RequestMethod.GET)
    public ResponseEntity<String> executeUpdate() {
        long startTime = new Date().getTime();
        iplocateService.executeUpdate();
        iplocateService.pullIpDataAll();
        long endTime = new Date().getTime();
        return ok("总共花费时间:" + (endTime-startTime)/1000 + "秒");
    }
    @PreAuthorize("hasAnyAuthority('1004','1')")
    @ApiOperation(value = "执行分析结果,没全量分析")
    @RequestMapping(value = "/executeDayUpdate", method = RequestMethod.GET)
    public ResponseEntity<String> executeDayUpdate() {
        long startTime = new Date().getTime();
        iplocateService.executeDayUpdate();
        long endTime = new Date().getTime();
        return ok("总共花费时间:" + (endTime-startTime)/1000 + "秒");
    }
}
