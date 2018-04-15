package com.topsec.ti.zxg.web.controller;

import com.topsec.ti.zxg.domain.device.Detector;
import com.topsec.ti.zxg.exception.MagicjcExpcetion;
import com.topsec.ti.zxg.service.DetectorService;
import com.topsec.ti.zxg.web.ResourceTypeDefinition;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;



@RestController
@Api(value = "detectorController", tags = "检测器管理",
        consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,
        produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

@RequestMapping(ResourceTypeDefinition.DETECTOR)
public class DetectorController extends BaseController {

    @Autowired
    private DetectorService detectorService;

    @ApiOperation(value = "创建检测器",response = Detector.class)
    @RequestMapping(method = RequestMethod.POST)
    @PreAuthorize("hasAnyAuthority('1001','1')")
    public ResponseEntity<Detector> create(@RequestBody Detector detector)
            throws Exception {
        return ok(detectorService.createDetector(detector));
    }

    @PreAuthorize("hasAnyAuthority('1002','1')")
    @ApiOperation(value = "更新检测器",response = Detector.class)
    @RequestMapping(value = "/{id}", method = RequestMethod.POST)
    public ResponseEntity<Detector> updateUser(@RequestBody Detector detector, @PathVariable("id") String id)
            throws Exception {
        return ok(detectorService.updateDetector(detector,id));
    }


    @PreAuthorize("hasAnyAuthority('1003','1')")
    @ApiOperation(value = "查询所有检测器", response = Detector.class)
    @RequestMapping(value = "/detectors", method = RequestMethod.GET)
    @ResponseStatus
    public ResponseEntity<Page<Detector>> listUsers(
            @ApiParam(value = "页号") @RequestParam(required = false) Integer pageNo,
            @ApiParam(value = "页大小") @RequestParam(required = false) Integer pageSize
    )
            throws MagicjcExpcetion {
        Page<Detector> detectors = detectorService.getAllDetector(pageNo,pageSize);
        return ok(detectors);
    }


    @PreAuthorize("hasAnyAuthority('1004','1')")
    @ApiOperation(value = "",response = Detector.class)
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Detector> deleteUser(@PathVariable("id") String id)
            throws Exception {
        return ok(detectorService.deleteDetector(id));
    }
}
