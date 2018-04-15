package com.topsec.ti.zxg.domain.ca;

import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

/**
 * Created by hx on 17-2-10.
 */
public class CurrentUser extends org.springframework.security.core.userdetails.User {

  private User user;
  

//  public CurrentUser(User user,String password) {
//    Set<Role> roles = user.getRoles();
//    
//    super(user.getName(), password, AuthorityUtils.createAuthorityList(user.getRole().getPermissionconfig().toString()));
//    this.user = user;
//
//  }
  public CurrentUser(User user, String password, Collection<? extends  GrantedAuthority> grantedAuthorities) {
    super(user.getName(), password, grantedAuthorities);
    this.user = user;

  }

  public User getUser() {
    return user;
  }

  public String getId() {
    return user.getId();
  }


  @Override
  public String getUsername() {
    return user.getName();
  }

  @Override
  public boolean isAccountNonExpired() {
    return true;
  }

  @Override
  public boolean isAccountNonLocked() {
    return true;
  }

  @Override
  public boolean isCredentialsNonExpired() {
    return true;
  }

  @Override
  public boolean isEnabled() {
    return true;
  }
}
