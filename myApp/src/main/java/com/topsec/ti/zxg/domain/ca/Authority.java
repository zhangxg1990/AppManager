package com.topsec.ti.zxg.domain.ca;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.topsec.ti.zxg.support.MultiLevelWare;
import com.topsec.ti.zxg.enums.HttpMethod;
import com.topsec.tsm.base.persistence.Resource;

import javax.persistence.*;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by hx on 17-2-12.
 */
@Entity
@Table(name = "MCJC_AUTHORITY")
@Inheritance(strategy = InheritanceType.JOINED)
public class Authority extends Resource implements MultiLevelWare<Authority> {

  @ManyToMany(
//          cascade = CascadeType.ALL,
          mappedBy = "authorities",
          targetEntity = Role.class)
  @JsonIgnore
  private Set<Role> roles = new HashSet<>();//多对多

  @Column(name = "HTTP_METHOD")
  private HttpMethod httpMethod;

  public Set<Role> getRoles() {
    return roles;
  }


  @OneToMany(mappedBy = "parent")
  private Set<Authority> authorities = new HashSet<>();

  @ManyToOne
  @JoinColumn(name="PARENT_ID")
  private Authority parent;

  @Column(name="URL")
  private String url;

  public void setRoles(Set<Role> roles) {
    this.roles = roles;
  }

  public Set<Authority> getAuthorities() {
    return authorities;
  }

  public void setAuthorities(Set<Authority> authorities) {
    this.authorities = authorities;
  }

  public Authority getParent() {
    return parent;
  }

  public void setParent(Authority parent) {
    this.parent = parent;
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

  @Override
  public Collection<Authority> getNextLevel() {
    return authorities;
  }

//  @Override
//  public boolean equals(Object o) {
//    if (this == o) return true;
//    if (o == null || getClass() != o.getClass()) return false;
//    if (!super.equals(o)) return false;
//    Authority that = (Authority) o;
//    if (that.getName()==null)return false;
//    return getName().equals(that.getName());
//  }
//
//  @Override
//  public int hashCode() {
//    return  31 * super.hashCode() + (getName() == null ? 0 : getName().hashCode());
//  }
}
