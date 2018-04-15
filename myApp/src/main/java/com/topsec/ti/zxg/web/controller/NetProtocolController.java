package com.topsec.ti.zxg.web.controller;

import com.github.pagehelper.PageInfo;
import com.topsec.ti.zxg.domain.netaudit.NetProtocol;
import com.topsec.ti.zxg.service.NetAuditService;
import com.topsec.ti.zxg.web.ResourceTypeDefinition;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@Api(value = "NetProtocolController", tags = "网络协议审计",
        consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,
        produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
@RequestMapping(ResourceTypeDefinition.NETPROTOCOL)
public class NetProtocolController extends BaseController {
    @Autowired
    private NetAuditService netAuditService;
    @Value(value ="${application.zxg.configuration.centerId}")
    String centerId;
    /*@PreAuthorize("hasAnyAuthority('701','1')")
    @ApiOperation(value = "审计列表,审计类型值--{CONN:通联关系审计日志;WEB:WEB应用行为审计日志;SSL:SSL访问行为审计日志;MAIL:电子邮件行为审计日志;FILE:文件传输行为审计日志;DNS:DNS域名请求行为审计日志}")
    @RequestMapping(value = "/list", method = RequestMethod.GET)
    public ResponseEntity<DataWrapperBean> getAllPolicyTypes(
            @RequestParam(required = false) String netType , @RequestParam(required = false)String centerDeviceId, @RequestParam(required = false)String scrollId){
        if(centerDeviceId==null)
            centerDeviceId = centerId;
        DataWrapperBean dataWrapperBean = netAuditService.listNetProtocolPage(NetType.valueOf(netType.toUpperCase()),centerDeviceId,scrollId);
        return ok(dataWrapperBean);
    }*/
    @PreAuthorize("hasAnyAuthority('701','1')")
    @ApiOperation(value = "审计列表,审计类型值--{CONN:通联关系审计日志;WEB:WEB应用行为审计日志;SSL:SSL访问行为审计日志;MAIL:电子邮件行为审计日志;FILE:文件传输行为审计日志;DNS:DNS域名请求行为审计日志}")
    @RequestMapping(value = "/listByNetProtocol", method = RequestMethod.POST)
    public ResponseEntity<PageInfo<NetProtocol>> list(
            @RequestParam String netType , @RequestParam(required = false)String centerDeviceId, @RequestParam Integer page, @RequestParam Integer pageSize
    , @RequestBody(required = false) NetProtocol netProtocol){
        if(centerDeviceId!=null&&centerId.equals(centerDeviceId))
            centerDeviceId = null;
        PageInfo<NetProtocol> netProtocolPageInfo = netAuditService.queryNetProtocolPage(netType.toUpperCase(),netProtocol,centerDeviceId,page,pageSize);
        return ok(netProtocolPageInfo);
    }
}
