package com.topsec.ti.zxg.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.topsec.ti.zxg.support.MultiLevelWare;
import com.topsec.ti.zxg.enums.HttpMethod;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.util.Collection;
import java.util.Set;
import java.util.TreeSet;

/**
 * Created by hx on 17-2-13.
 */
@ApiModel
@JsonIgnoreProperties(ignoreUnknown = true)
public class DtoAuthority implements Comparable<DtoAuthority>,MultiLevelWare<DtoAuthority> {
  @ApiModelProperty(
          value = "角色id",
          example = "12345"
  )
  private String id;

  @ApiModelProperty(
          value = "权限名称",
          example = "权限名称"
  )
//  @JsonIgnore
  private String name;
  @ApiModelProperty(
          value = "权限别名",
          example = "权限别名"
  )
  private String alias;

  @ApiModelProperty(
          value = "请求方法",
          example = "请求方法"
  )
  private HttpMethod httpMethod;

  @ApiModelProperty(
          value = "请求路径",
          example = "请求路径"
  )
  private String url;

  @ApiModelProperty(
          value = "子权限",
          example = "[{'id':'123'},{'id':'456'}]"
  )
  private Set<DtoAuthority> dtoAuthorities = new TreeSet<>();

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

  public HttpMethod getHttpMethod() {
    return httpMethod;
  }

  public void setHttpMethod(HttpMethod httpMethod) {
    this.httpMethod = httpMethod;
  }

  public String getUrl() {
    return url;
  }

  public void setUrl(String url) {
    this.url = url;
  }

  public Set<DtoAuthority> getDtoAuthorities() {
    return dtoAuthorities;
  }

  public void setDtoAuthorities(Set<DtoAuthority> dtoAuthorities) {
    this.dtoAuthorities = dtoAuthorities;
  }

  @Override
  public int compareTo(DtoAuthority o) {
    return Integer.valueOf(this.getId()) - Integer.valueOf(o.getId());
  }

  @Override
  @JsonIgnore
  public Collection<DtoAuthority> getNextLevel() {
    return dtoAuthorities;
  }
}
