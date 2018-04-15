package com.topsec.ti.zxg.web.controller;

import com.github.pagehelper.PageInfo;
import com.topsec.ti.zxg.dc.DataWrapperBean;
import com.topsec.ti.zxg.domain.device.Device;
import com.topsec.ti.zxg.domain.device.DeviceTopologyCoordinate;
import com.topsec.ti.zxg.dto.DtoDeviceTopologyCoordinate;
import com.topsec.ti.zxg.service.DeviceService;
import com.topsec.ti.zxg.web.ResourceTypeDefinition;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.collections.map.HashedMap;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@Api(value = "DeviceController", tags = "设备管理",
        consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,
        produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
@RequestMapping(ResourceTypeDefinition.DEVICE)
public class DeviceController extends BaseController{
    @Autowired
    private DeviceService deviceService;
    @Value(value ="${application.zxg.configuration.centerId}")
    String centerId;
    //    @Inject
//    public DeviceController(DeviceService deviceService) {
//        this.deviceService = deviceService;
//    }
//    public DeviceController( ) {
//    }
    @PreAuthorize("hasAnyAuthority('501','1')")
    @ApiOperation(value = "查看设备拓扑图")
    @RequestMapping(value = "/getDevicesByTp", method = RequestMethod.GET)
    public ResponseEntity<Device> getDevicesByTp() {
        Device device = deviceService.getDevicesByTopologyAndAll(centerId);
        return ok(device);
    }
    @PreAuthorize("hasAnyAuthority('502','1')")
    @ApiOperation(value = "查看当前管理中心设备列表")
    @RequestMapping(value = "/listDevices", method = RequestMethod.GET)
    public ResponseEntity<Map<String,Object>> getDevices(@RequestParam String page,@RequestParam String pageSize,@RequestParam(required = false) String centerDeviceId) {
        Map<String,Object> map = new HashMap();
        if(centerDeviceId==null)
            centerDeviceId = centerId;
        PageInfo<Device> pageInfo = deviceService.getDevices(Integer.parseInt(page),Integer.parseInt(pageSize),centerDeviceId);
        map.put("total",pageInfo.getTotal());
        map.put("rows",pageInfo.getList());
        return ok(map);
    }
    @PreAuthorize("hasAnyAuthority('503','1')")
    @ApiOperation(value = "设备详情")
    @RequestMapping(value = "/getDeviceById/{device_id}", method = RequestMethod.GET)
    public ResponseEntity<Device> getDevices(@PathVariable String device_id) {
        Device device = deviceService.getDeviceById(device_id);
        return ok(device);
    }
    @PreAuthorize("hasAnyAuthority('504','1')")
    @ApiOperation(value = "检测器和管理中心分布")
    @RequestMapping(value = "/deviceTotal", method = RequestMethod.GET)
    public ResponseEntity<Map<String,Object>> deviceTotal() {
        Map<String,Object> map = new HashedMap();
        List<Map<String,Object>> devices = deviceService.deviceTotal(centerId);
        //List<Map<String,Object>> devicesActive = deviceService.deviceActiveTotal(centerId);
        map.put("total",devices);
        //map.put("active",devicesActive);
        return ok(map);
    }
    /*@PreAuthorize("hasAnyAuthority('505','1')")
    @ApiOperation(value = "检测器和管理中心活跃总量")
    @RequestMapping(value = "/deviceActiveTotal", method = RequestMethod.GET)
    public ResponseEntity<List<Map<String,Object>>> deviceActiveTotal() {
        List<Map<String,Object>> devices = deviceService.deviceActiveTotal(centerId);
        return ok(devices);
    }*/
    @PreAuthorize("hasAnyAuthority('506','1')")
    @ApiOperation(value = "管理中心分组统计")
    @RequestMapping(value = "/glzxGroupTotal", method = RequestMethod.GET)
    public ResponseEntity<List<Map<String,Object>>> glzxGroupTotal() {
        List<Map<String,Object>> devices = deviceService.glzxGroupTotal(centerId);
        return ok(devices);
    }
    @PreAuthorize("hasAnyAuthority('507','1')")
    @ApiOperation(value = "管理中心下级树结构")
    @RequestMapping(value = "/centerTree", method = RequestMethod.GET)
    public ResponseEntity<Device> centerTree() {
        Device device = deviceService.getDevicesByTopology(centerId);
        return ok(device);
    }


    @PreAuthorize("hasAnyAuthority('508','1')")
    @ApiOperation(value = "检测器策略和告警数量")
    @RequestMapping(value = "/{device_id}/policyAndAlertCnt", method = RequestMethod.GET)
    public ResponseEntity<Map<String,Object>> policyAndAlertCnt(@PathVariable("device_id") String device_id) {
        Map<String,Object> device = deviceService.getPolicyAndAlertCnt(device_id);
        return ok(device);
    }
    @PreAuthorize("hasAnyAuthority('509','1')")
    @ApiOperation(value = "存储或者更新设备坐标")
    @RequestMapping(value = "/saveDtc", method = RequestMethod.POST)
    public ResponseEntity<String> saveDtc(@RequestBody DeviceTopologyCoordinate deviceTopologyCoordinate ) {
        String id  = deviceService.saveDtc(deviceTopologyCoordinate);
        return ok(id);
    }
    @PreAuthorize("hasAnyAuthority('510','1')")
    @ApiOperation(value = "获取设备坐标xml")
    @RequestMapping(value = "/getDtc", method = RequestMethod.GET)
    public ResponseEntity<DtoDeviceTopologyCoordinate> getDtc() {
        DtoDeviceTopologyCoordinate deviceTopologyCoordinate = deviceService.getDtc(centerId);
        return ok(deviceTopologyCoordinate);
    }


    @PreAuthorize("hasAnyAuthority('511','1')")
    @ApiOperation(value = "根")
    @RequestMapping(value = "/get/rest/", method = RequestMethod.GET)
    public ResponseEntity<DataWrapperBean<Device>> getDevicesByRest() {
        DataWrapperBean<Device> dataWrapperBean = deviceService.getDevicesByRest(centerId);
        return ok(dataWrapperBean);
    }
}
