package com.topsec.ti.zxg.service;

import com.topsec.ti.zxg.domain.ca.Authority;
import com.topsec.ti.zxg.domain.ca.Role;
import com.topsec.ti.zxg.domain.ca.User;
import com.topsec.ti.zxg.dto.DtoAuthority;
import com.topsec.ti.zxg.dto.DtoRole;
import com.topsec.ti.zxg.dto.DtoUser;

import java.util.List;

/**
 * Created by hx on 17-2-9.
 */
public interface CaService {

  User getUserById(String id);

  User getUserByName(String name);

  DtoUser updateUser(DtoUser dtoUser, String id);

  DtoUser createUser(DtoUser newUser);

  List<DtoUser> getAllUser();

  User getUser(String name, String password);

  DtoUser  deleteUser(String id);


  Role getRoleByName(String name);

  DtoRole createRole(DtoRole role);

  Role getRoleById(String id);

  DtoRole updateRole(DtoRole role1, String id);

  DtoRole deleteRole(String id);

  List<DtoRole> listAllRole();


  List<Role> getRoleByUserId(String userId);

  List<Authority> getAuthoritiesByRoleId(String id);

  List<Authority> getAuthoritiesByUserName(String username);
  DtoUser getDtoUserWithAuthorities(User user);

  void initializeAdmin();

  void initializeAuthorities();

  DtoAuthority  getAllAuthority();
}
