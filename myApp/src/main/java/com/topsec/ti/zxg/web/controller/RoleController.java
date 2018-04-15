package com.topsec.ti.zxg.web.controller;

import com.topsec.ti.zxg.dto.DtoAuthority;
import com.topsec.ti.zxg.dto.DtoRole;
import com.topsec.ti.zxg.service.CaService;
import com.topsec.ti.zxg.web.ResourceTypeDefinition;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;


@Controller
@Api(value = "RoleController", tags = "角色管理")
@RequestMapping(ResourceTypeDefinition.ROLE)

public class RoleController extends BaseController {
  @Autowired
  private CaService caService;

  @PreAuthorize("hasAnyAuthority('101','1')")
  @ApiOperation(value = "创建角色",response = DtoRole.class)
  @RequestMapping(method = RequestMethod.POST)
  public ResponseEntity<DtoRole> createRole( @ApiParam(value = "角色实体") @RequestBody DtoRole role)
          throws Exception {

    return ok(caService.createRole(role));
  }

  @PreAuthorize("hasAnyAuthority('102','1')")
  @ApiOperation(value = "更新角色",response = DtoRole.class)
  @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
  public ResponseEntity<DtoRole> updateRole(@ApiParam(value = "角色ID") @PathVariable("id") String id,
                           @RequestBody DtoRole dtoRole)
          throws Exception {
    return ok(caService.updateRole(dtoRole,id));
  }


  @PreAuthorize("hasAnyAuthority('103','1')")
  @ApiOperation(value = "查询所有角色",response = List.class)
  @RequestMapping(value = "/roles", method = RequestMethod.GET)
  public  ResponseEntity<List<DtoRole>> getAllRoles()
          throws Exception {
    return ok(caService.listAllRole());
  }


  @PreAuthorize("hasAnyAuthority('104','1')")
  @ApiOperation(value = "删除角色",response = DtoRole.class)
  @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
  public ResponseEntity<DtoRole> deleteRole(@PathVariable("id") String id)
          throws Exception {
    return ok(caService.deleteRole(id));
  }
//  @PreAuthorize("hasAnyAuthority('105','1')")
  @ApiOperation(value = "返回所有权限",response = DtoAuthority.class)
  @RequestMapping(value = "/authorities", method = RequestMethod.GET)
  public ResponseEntity<DtoAuthority> getAllAuthority()
          throws Exception {
    return ok(caService.getAllAuthority());
  }
  @PreAuthorize("hasAnyAuthority('1')")
  @ApiOperation(value = "加载权限配置")
  @RequestMapping(value = "/initAuthorities", method = RequestMethod.GET)
  public  ResponseEntity<Void>  initAuthorities( Authentication authentication) {
    caService.initializeAuthorities();
    return v();
  }


}
