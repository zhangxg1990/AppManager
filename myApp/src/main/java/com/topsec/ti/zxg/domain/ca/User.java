package com.topsec.ti.zxg.domain.ca;

import com.topsec.tsm.base.persistence.Resource;

import javax.persistence.*;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by Administrator on 2016/5/16.
 */
@Entity
@Table(name = "MCJC_USER")
@Inheritance(strategy = InheritanceType.JOINED)
public class User extends Resource {

  private static final long serialVersionUID = 1L;

//  @ManyToMany
//  @JoinColumn(name = "ROLE_ID")


  @ManyToMany(fetch = FetchType.LAZY,
//          cascade = CascadeType.ALL,
          targetEntity = Role.class)
  @JoinTable(name = "MCJC_USER_ROLE",
          joinColumns = {@JoinColumn(name = "USER_ID")},
          inverseJoinColumns = {@JoinColumn(name = "ROLE_ID")})
  private Set<Role> roles = new HashSet<>();//多对多

  @Column(name = "POSITION")
  private String position;

  //地址
  @Column(name = "ADDRESS")
  private String address;

  //邮编
  @Column(name = "POST_CODE")
  private String postCode;

  //密码
  @Column(name = "PASSWORD")
  private String password;

//  public Role getRole() {
//    return role;
//  }
//
//  public void setRole(Role role) {
//    this.role = role;
//  }


  public Set<Role> getRoles() {
    return roles;
  }

  public void setRoles(Set<Role> roles) {
    this.roles = roles;
  }

  public String getPosition() {
    return position;
  }

  public void setPosition(String position) {
    this.position = position;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getPostCode() {
    return postCode;
  }

  public void setPostCode(String postCode) {
    this.postCode = postCode;
  }

  public String getPassword() {
    return password;
  }

  public void setPassword(String password) {
    this.password = password;
  }

  @Override
  public String toString() {
    return "User{" +
            "password='" + password + '\'' +
            "} " + super.toString();
  }
}
