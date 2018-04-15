package com.topsec.ti.zxg.web.controller;

import com.github.pagehelper.PageInfo;
import com.topsec.ti.zxg.dc.DataCenterRequester;
import com.topsec.ti.zxg.domain.alert.Alert;
import com.topsec.ti.zxg.domain.alert.AlertDisposalInfo;
import com.topsec.ti.zxg.domain.alert.AlertFile;
import com.topsec.ti.zxg.dto.DtoAlertType;
import com.topsec.ti.zxg.service.AlertService;
import com.topsec.ti.zxg.utils.ZipUtils;
import com.topsec.ti.zxg.web.ResourceTypeDefinition;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.*;
import java.util.List;
import java.util.UUID;
import java.util.zip.ZipOutputStream;

@RestController
@Api(value = "AlertController", tags = "告警管理",
        consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,
        produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
@RequestMapping(ResourceTypeDefinition.ALERT)
public class AlertController extends BaseController {
    @Autowired
    private AlertService alertService;
    @Qualifier(value = "sqlExecRestRequester")
    @Autowired
    private DataCenterRequester dataCenterRequester;

    @PreAuthorize("hasAnyAuthority('901','1')")
    @ApiOperation(value = "查看所有告警信息")
    @RequestMapping(value = "/listCenterAlert", method = RequestMethod.POST)
    public ResponseEntity<PageInfo<Alert>> listCenterAlert(@ApiParam(value = "页号") @RequestParam(required = false) Integer page,
                                                           @ApiParam(value = "页大小") @RequestParam(required = false) Integer pageSize, @RequestParam(required = false) String alertType, @RequestBody(required = false) Alert alert) {
        PageInfo<Alert> pageInfo = alertService.queryCenterAlerts(page,pageSize,alertType,alert);
        return ok(pageInfo);
    }
    @PreAuthorize("hasAnyAuthority('902','1')")
    @ApiOperation(value = "查看检测器告警列表")
    @RequestMapping(value = "/listDetectorAlert", method = RequestMethod.POST)
    public ResponseEntity<PageInfo<Alert>> listDetectorAlert(@ApiParam(value = "页号") @RequestParam(required = false) Integer page,
                                                     @ApiParam(value = "页大小") @RequestParam(required = false) Integer pageSize, @RequestParam(required = false) String alertType,@RequestBody(required = false) Alert alert) {
        PageInfo<Alert> pageInfo = alertService.queryDetectorAlerts(page,pageSize,alertType,alert);
        return ok(pageInfo);
    }
    @PreAuthorize("hasAnyAuthority('903','1')")
    @ApiOperation(value = "查看各级告警处置")
    @RequestMapping(value = "/disposalInfo/{alert_id}", method = RequestMethod.GET)
    public ResponseEntity<List<AlertDisposalInfo>> disposalInfo(@PathVariable String alert_id) {
        List<AlertDisposalInfo> alertDisposalInfos = alertService.quertAlertDisposalInfos(alert_id,0);
        return ok(alertDisposalInfos);
    }

    @PreAuthorize("hasAnyAuthority('904','1')")
    @ApiOperation(value = "新增告警处置信息")
    @RequestMapping(value = "/addAlertDisposalInfo", method = RequestMethod.POST)
    public ResponseEntity<AlertDisposalInfo> addAlertDisposalInfo(@RequestBody AlertDisposalInfo alertDisposalInfo,Authentication authentication) {
        UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication() .getPrincipal();
        alertDisposalInfo.setDisposalPerson(userDetails.getUsername());
        AlertDisposalInfo alertDisposalInfo1 = alertService.saveAlertDisposalInfo(alertDisposalInfo);
        return ok(alertDisposalInfo1);
    }
    @PreAuthorize("hasAnyAuthority('905','1')")
    @ApiOperation(value = "获取所有告警类型")
    @RequestMapping(value = "/types", method = RequestMethod.GET)
    public ResponseEntity<DtoAlertType> getAllPolicyTypes(){
        return ok(alertService.getAllDtoAlertType());

    }
    /*@PreAuthorize("hasAnyAuthority('906','1')")
    @ApiOperation(value = "初始化告警类型")
    @RequestMapping(value = "/init", method = RequestMethod.GET)
    public ResponseEntity<Void> initializePolicyTypes(){
        alertService.initializeAlertType();
        return v();
    }*/
    @PreAuthorize("hasAnyAuthority('906','1')")
    @ApiOperation(value = "根据告警id下载告警文件")
    @RequestMapping(value = "/downFile/{alert_id}", method = RequestMethod.GET)
    public ResponseEntity<Void> downFile(@PathVariable String alert_id, HttpServletResponse response, HttpServletRequest request) throws IOException {
        List<AlertFile> alertFiles = alertService.queryAlertFiles(alert_id);
        response.reset();
        if(alertFiles==null||alertFiles.size()==0) {
            response.setContentType("text/html;charset=UTF-8");
            response.getWriter().print("没有告警文件与之关联");
            response.flushBuffer();
            response.getWriter().close();
            return v();
        }
        OutputStream outputStream = response.getOutputStream();
        String fileName = UUID.randomUUID().toString();
        File file = new File(fileName);
        ZipOutputStream zipOutputStream = new ZipOutputStream(new FileOutputStream(file));
        ZipUtils.zipFile(alertFiles,zipOutputStream);
        BufferedInputStream bins = new BufferedInputStream(new FileInputStream(file));
        response.setHeader("Content-Disposition", "attachment; filename="
                +  new String(fileName.getBytes("gb2312"), "ISO8859-1" ));
        response.setContentType("application/octet-stream; charset=utf-8");
        int bytesRead = 0;
        byte[] buffer = new byte[8192];
        while ((bytesRead = bins.read(buffer, 0, 8192)) != -1) {
            outputStream.write(buffer, 0, bytesRead);
        }
        try{}finally {
            bins.close();
            bins.close();
            zipOutputStream.close();
            if(outputStream!=null) {
                outputStream.flush();
                outputStream.close();
            }
            file.delete();
        }
        return v();
    }
    /*@PreAuthorize("hasAnyAuthority('907','1')")
    @ApiOperation(value = "开始告警审核流程")
    @RequestMapping(value = "/process/{alertType}/{alertId}/{userId}", method = RequestMethod.GET)
    public void getAllPolicyTypes(@PathVariable String alertId,@PathVariable String userId,@PathVariable String alertType,@RequestBody(required = false)AlertDisposalInfo alertDisposalInfo){
        activitiService.startProcess(alertId,alertDisposalInfo);

    }

    @PreAuthorize("hasAnyAuthority('908','1')")
    @ApiOperation(value = "查看审核列表,先只有admin用户")
    @RequestMapping(value = "/tasks", method = RequestMethod.GET)
    public ResponseEntity<List<Task>> tasks(){
        List<Task> tasks = activitiService.getTasks("admin");
        return ok(tasks);
    }

    @PreAuthorize("hasAnyAuthority('909','1')")
    @ApiOperation(value = "admin用户完成审核")
    @RequestMapping(value = "/complete/{taskId}", method = RequestMethod.GET)
    public ResponseEntity<String> complete(@PathVariable String taskId){
        activitiService.completeTasks(true,taskId);
        return ok("success");
    }*/

}
