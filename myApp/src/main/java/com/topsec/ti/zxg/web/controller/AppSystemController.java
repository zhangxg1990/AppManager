package com.topsec.ti.zxg.web.controller;

import com.topsec.ti.zxg.domain.AppSystem;
import com.topsec.ti.zxg.exception.MagicjcExpcetion;
import com.topsec.ti.zxg.service.AppSystemService;
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

/**
 * Created by hx on 17-2-16.
 */

@RestController
@Api(value = "appSystemController", tags = "扩展应用系统管理",
        consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,
        produces = MediaType.APPLICATION_JSON_UTF8_VALUE)

@RequestMapping(ResourceTypeDefinition.APP)
public class AppSystemController extends BaseController {

  @Autowired
  private AppSystemService appSystemService;

  @ApiOperation(value = "创建应用系统",response = AppSystem.class)
  @RequestMapping(method = RequestMethod.POST)
  @PreAuthorize("hasAnyAuthority('801','1')")
  public ResponseEntity<AppSystem> create(@RequestBody AppSystem appSystem)
          throws Exception {
    return ok(appSystemService.createAppSystem(appSystem));
  }

  @PreAuthorize("hasAnyAuthority('802','1')")
  @ApiOperation(value = "更新应用系统",response = AppSystem.class)
  @RequestMapping(value = "/{id}", method = RequestMethod.POST)
  public ResponseEntity<AppSystem> updateUser(@RequestBody AppSystem appSystem, @PathVariable("id") String id)
          throws Exception {
    return ok(appSystemService.updateAppSystem(appSystem,id));
  }


  @PreAuthorize("hasAnyAuthority('803','1')")
  @ApiOperation(value = "查询所有应用系统", response = Page.class)
  @RequestMapping(value = "/apps", method = RequestMethod.GET)
  @ResponseStatus
  public ResponseEntity<Page<AppSystem>> listUsers(
          @ApiParam(value = "页号") @RequestParam(required = false) Integer pageNo,
          @ApiParam(value = "页大小") @RequestParam(required = false) Integer pageSize
  )
          throws MagicjcExpcetion {
    Page<AppSystem> dtoUsers = appSystemService.getAllAppSystem(pageNo,pageSize);
    return ok(dtoUsers);
  }


  @PreAuthorize("hasAnyAuthority('804','1')")
  @ApiOperation(value = "删除应用系统",response = AppSystem.class)
  @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
  public ResponseEntity<AppSystem> deleteUser(@PathVariable("id") String id)
          throws Exception {
    return ok(appSystemService.deleteAppSystem(id));
  }


}
