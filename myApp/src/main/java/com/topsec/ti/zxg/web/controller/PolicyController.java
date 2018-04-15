package com.topsec.ti.zxg.web.controller;

import com.topsec.ti.zxg.domain.policy.PolicyInfoVo;
import com.topsec.ti.zxg.dto.DtoPolicyType;
import com.topsec.ti.zxg.service.PolicyService;
import com.topsec.ti.zxg.support.MyPageInfo;
import com.topsec.ti.zxg.web.ResourceTypeDefinition;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Created by hx on 17-2-16.
 */

@RestController
@Api(value = "policyController", tags = "策略管理",
        consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,
        produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

@RequestMapping(ResourceTypeDefinition.POLICY)
public class PolicyController extends BaseController {

  @Autowired
  private PolicyService policyService;

  @PreAuthorize("hasAnyAuthority('601','1')")
  @ApiOperation(value = "获取所有策略类型")
  @RequestMapping(value = "/types", method = RequestMethod.GET)
  public ResponseEntity<DtoPolicyType> getAllPolicyTypes(){
    return ok(policyService.getAllDtoPolicyType());

  }
  @PreAuthorize("hasAnyAuthority('608','1')")
  @ApiOperation(value = "重新初始化策略类型")
  @RequestMapping(value = "/init", method = RequestMethod.POST)
  public ResponseEntity<Void> initializePolicyTypes(){
     policyService.initializePolicyType();
     return v();
  }

  @PreAuthorize("hasAnyAuthority('609','1')")
  @ApiOperation(value = "查询本级下某类型策略(递归查询)",response = MyPageInfo.class)
  @RequestMapping(value = "/list", method = RequestMethod.GET)
  public ResponseEntity<MyPageInfo<PolicyInfoVo>> getPoliciesByTypes(@RequestParam("type") String type,
                                                                     @RequestParam(required = false) Integer pageNo,
                                                                     @RequestParam(required = false) Integer pageSize){
    return  ok(policyService.getPolicyInfoByType(type,pageNo,pageSize));
  }
  @PreAuthorize("hasAnyAuthority('610','1')")
  @ApiOperation(value = "查询某级策略(默认查询本级管理中心)",response = List.class)
  @RequestMapping(value = "/levelList", method = RequestMethod.GET)
  public ResponseEntity<MyPageInfo<PolicyInfoVo>> getLevelPolicies(@ApiParam(value = "策略类型(二级类)") @RequestParam(required = false) String type,
                                                                   @ApiParam(value = "页号") @RequestParam(required = false) Integer pageNo,
                                                                   @ApiParam(value = "页大小") @RequestParam(required = false) Integer pageSize,
                                                                   @ApiParam(value = "管理中心id") @RequestParam(required = false) String centerId){
    return  ok(policyService.getMyLevelPolicies(type,pageNo,pageSize,centerId));
  }

  @PreAuthorize("hasAnyAuthority('611','1')")
  @ApiOperation(value = "查询检测器的策略",response = List.class)
  @RequestMapping(value = "/list/detector/{detectorId}", method = RequestMethod.GET)
  public ResponseEntity<MyPageInfo<PolicyInfoVo>> getPoliciesByDetector(@ApiParam(value = "策略类型(二级类)") @RequestParam(required = false) String type,
                                                                   @ApiParam(value = "页号") @RequestParam(required = false) Integer pageNo,
                                                                   @ApiParam(value = "页大小") @RequestParam(required = false) Integer pageSize,
                                                                   @ApiParam(value = "检测器id") @PathVariable("detectorId") String detectorId){
    return  ok(policyService.getDetectorPolicies(type,pageNo,pageSize,detectorId));
  }
}
