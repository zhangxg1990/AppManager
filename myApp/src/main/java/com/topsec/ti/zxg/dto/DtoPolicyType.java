package com.topsec.ti.zxg.dto;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.topsec.ti.zxg.support.MultiLevelWare;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

import java.util.Collection;
import java.util.Set;
import java.util.TreeSet;

/**
 * Created by hx on 17-2-16.
 */
@ApiModel
@JsonIgnoreProperties(ignoreUnknown = true)
public class DtoPolicyType implements Comparable<DtoPolicyType>,MultiLevelWare<DtoPolicyType> {
  @ApiModelProperty(
          value = "实体Id",
          example = "12345"
  )
  private String id;

  @ApiModelProperty(
          value = "名称",
          example = "名称"
  )
  private String name;
  @ApiModelProperty(
          value = "别名",
          example = "别名"
  )
  private String alias;

  @ApiModelProperty(
          value = "子策略",
          example = "子策略"
  )
  private Set<DtoPolicyType> dtoPolicyTypes=new TreeSet<>();


  @ApiModelProperty(
          value = "排序字段",
          example = "排序字段"
  )
  private int ordinal;


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

  public Set<DtoPolicyType> getDtoPolicyTypes() {
    return dtoPolicyTypes;
  }

  public void setDtoPolicyTypes(Set<DtoPolicyType> dtoPolicyTypes) {
    this.dtoPolicyTypes = dtoPolicyTypes;
  }

  public int getOrdinal() {
    return ordinal;
  }

  public void setOrdinal(int ordinal) {
    this.ordinal = ordinal;
  }

  @Override
  public int compareTo(DtoPolicyType o) {
    return this.ordinal-o.ordinal;
  }

  @Override
  @JsonIgnore
  public Collection<DtoPolicyType> getNextLevel() {
    return dtoPolicyTypes;
  }
}
