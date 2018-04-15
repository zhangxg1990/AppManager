package com.topsec.ti.zxg.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.topsec.ti.zxg.web.ResourceTypeDefinition;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by hx on 17-2-13.
 */
@ApiModel
@JsonIgnoreProperties(ignoreUnknown = true)
public class DtoRole {
  @ApiModelProperty(
          value = "实体Id",
          example = "12345"
  )
  private String id;

  @ApiModelProperty(
          value = "角色名(创建更新-必须)",
          example = "test(角色名(创建更新-必须))"
  )
//  @JsonIgnore
  private String name;
  @ApiModelProperty(
          value = "角色别名",
          example = "test"
  )
  private String alias;


  @ApiModelProperty(
          value = "资源类型",
          example = ResourceTypeDefinition.ROLE
  )
  private String resourceType= ResourceTypeDefinition.ROLE;

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
          value = "权限(创建更新-必须)",
          example = "[{'id':'123'},{'id':'456'}](权限(创建更新-必须))"
  )
  private Set<DtoAuthority> dtoAuthorities = new HashSet<>();
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

  public Set<DtoAuthority> getDtoAuthorities() {
    return dtoAuthorities;
  }

  public void setDtoAuthorities(Set<DtoAuthority> dtoAuthorities) {
    this.dtoAuthorities = dtoAuthorities;
  }
}
