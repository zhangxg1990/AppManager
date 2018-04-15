package com.topsec.ti.zxg.web.controller;

import com.topsec.ti.zxg.domain.ca.CurrentUser;
import com.topsec.ti.zxg.domain.ca.User;
import com.topsec.ti.zxg.dto.DtoUser;
import com.topsec.ti.zxg.exception.MagicjcExpcetion;
import com.topsec.ti.zxg.service.CaService;
import com.topsec.ti.zxg.session.UserSession;
import com.topsec.ti.zxg.web.ResourceTypeDefinition;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@Api(value = "UserController", tags = "用户管理",
        consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,
        produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
@RequestMapping(ResourceTypeDefinition.USER)
public class UserController extends BaseController {

  private Logger logger = LoggerFactory.getLogger(this.getClass());
  @Autowired
  private CaService caService;

  @ApiOperation(value = "创建用户",response = DtoUser.class)
  @RequestMapping(method = RequestMethod.POST)
  @PreAuthorize("hasAnyAuthority('201','1')")
  public ResponseEntity<DtoUser> createUser(@RequestBody DtoUser dtoUser)
          throws Exception {
    return ok(caService.createUser(dtoUser));
  }

  @PreAuthorize("hasAnyAuthority('202','1')")
  @ApiOperation(value = "更新用户",response = DtoUser.class)
  @RequestMapping(value = "/{id}", method = RequestMethod.POST)
  public ResponseEntity<DtoUser> updateUser(@RequestBody DtoUser dtoUser, @PathVariable("id") String id)
          throws Exception {
    return ok(caService.updateUser(dtoUser,id));
  }


  @PreAuthorize("hasAnyAuthority('203','1')")
  @ApiOperation(value = "查询所有用户", response = List.class)
  @RequestMapping(value = "/users", method = RequestMethod.GET)
  @ResponseStatus
  public ResponseEntity<List<DtoUser>> listUsers()
          throws MagicjcExpcetion {
    List<DtoUser> dtoUsers = caService.getAllUser();
    return ok(dtoUsers);
  }

  private Cookie getCurrentCookie(HttpServletRequest request, UserSession userSession) {
    Cookie[] cookies = request.getCookies();
    if (cookies != null && cookies.length > 1 && userSession != null) {
      for (Cookie cookie : cookies) {
        if (cookie.getName().equals(userSession.getId())) {
          logger.info("当前Session对应的cookie:{},{}", cookie.getName(), cookie.getValue());
          return cookie;
        }
      }
    }
    return null;
  }

  @PreAuthorize("hasAnyAuthority('204','1')")
  @ApiOperation(value = "删除用户",response = String.class)
  @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
  public ResponseEntity<DtoUser> deleteUser(@PathVariable("id") String id)
          throws Exception {
    return ok(caService.deleteUser(id));
  }

  @ApiOperation(value = "初始测试是否登录")
  @RequestMapping(value = "/init", method = RequestMethod.GET)
  public  ResponseEntity<DtoUser>  init(HttpServletRequest request, Authentication authentication) {
    if (authentication==null){
      DtoUser dtoUser = new DtoUser();
      return ok(dtoUser);
    }

    CurrentUser currentUser = (CurrentUser) authentication.getPrincipal();
    User user = currentUser.getUser();
    DtoUser dtoUser = caService.getDtoUserWithAuthorities(user);
    return ok(dtoUser);
  }


}
