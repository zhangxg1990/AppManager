package com.topsec.ti.zxg.domain.ca;

import com.topsec.tsm.base.persistence.Resource;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by Administrator on 2016/5/17.
 */
@Entity
@Table(name = "MCJC_ROLE")
public class Role extends Resource {

  private static final long serialVersionUID = 1L;

  @Column(name = "PERMISSION_CONF", length = 1024)
  private String permissionconfig;


//    @OneToMany(fetch = FetchType.EAGER, cascade = {CascadeType.MERGE,CascadeType.REMOVE},mappedBy = "role")

  @ManyToMany(
          fetch = FetchType.LAZY,
//          cascade = CascadeType.ALL,
          mappedBy = "roles",
          targetEntity = User.class)
  private Set<User> users = new HashSet<User>();

  @ManyToMany(fetch = FetchType.LAZY,
//          cascade = CascadeType.ALL,
          targetEntity = Authority.class)
  @JoinTable(name = "MCJC_ROLE_AUTHORITY",
          joinColumns = {@JoinColumn(name = "ROLE_ID")},
          inverseJoinColumns = {@JoinColumn(name = "AUTHORITY_ID")})
  private Set<Authority> authorities=new HashSet<>();

  public String getPermissionconfig() {
    return permissionconfig;
  }

  public void setPermissionconfig(String permissionconfig) {
    this.permissionconfig = permissionconfig;
  }

  public Set<User> getUsers() {
    return users;
  }

  public void setUsers(Set<User> users) {
    this.users = users;
  }



  public Set<Authority> getAuthorities() {
    return authorities;
  }

  public void setAuthorities(Set<Authority> authorities) {
    this.authorities = authorities;
  }
}
