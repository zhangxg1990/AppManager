package com.topsec.ti.zxg.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.topsec.ti.zxg.web.ResourceTypeDefinition;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by hx on 17-2-12.
 */
@ApiModel
@JsonIgnoreProperties(ignoreUnknown = true)
public class DtoUser {

  @ApiModelProperty(
          value = "实体Id",
          example = "12345"
  )
  private String id;

  @ApiModelProperty(
          value = "名称()",
          example = "名称"
  )
  private String name;
  @ApiModelProperty(
          value = "组名",
          example = "别名"
  )
  private String alias;

//  @JsonIgnore
@ApiModelProperty(
        value = "密码",
        example = "xxx(创建必须)"
)
  private String password;


  @ApiModelProperty(
          value = "资源类型",
          example = ResourceTypeDefinition.USER
  )
  private String resourceType= ResourceTypeDefinition.USER;

  @ApiModelProperty(
          value = "描述信息",
          example = "xxx"
  )
  private String note;


  @ApiModelProperty(
          value = "最后修改时间",
          example = "13534567866"
  )
  private Date lastModifiedTime;

  @ApiModelProperty(
          value = "创建时间",
          example = "13534567866"
  )
  private Date createdTime;

  @ApiModelProperty(
          value = "权限",
          example = "权限"
  )
  private Set<DtoAuthority> authorities= new HashSet<>();
  @ApiModelProperty(
          value = "角色(创建必须)",
          example = "[{\"id\":\"123\"},{\"id\":\"456\"}](创建更新必须))"
  )
  private Set<DtoRole> dtoRoles= new HashSet<>();

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getAlias() {
    return alias;
  }

  public void setAlias(String alias) {
    this.alias = alias;
  }

  public String getResourceType() {
    return resourceType;
  }

  public void setResourceType(String resourceType) {
    this.resourceType = resourceType;
  }

  public String getNote() {
    return note;
  }

  public void setNote(String note) {
    this.note = note;
  }

  public Date getLastModifiedTime() {
    return lastModifiedTime;
  }

  public void setLastModifiedTime(Date lastModifiedTime) {
    this.lastModifiedTime = lastModifiedTime;
  }

  public Date getCreatedTime() {
    return createdTime;
  }

  public void setCreatedTime(Date createdTime) {
    this.createdTime = createdTime;
  }

  public Set<DtoAuthority> getAuthorities() {
    return authorities;
  }

  public void setAuthorities(Set<DtoAuthority> authorities) {
    this.authorities = authorities;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  public Set<DtoRole> getDtoRoles() {
    return dtoRoles;
  }

  public void setDtoRoles(Set<DtoRole> dtoRoles) {
    this.dtoRoles = dtoRoles;
  }
}
