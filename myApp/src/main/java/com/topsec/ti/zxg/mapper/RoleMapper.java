package com.topsec.ti.zxg.mapper;

import com.topsec.ti.zxg.domain.ca.Role;

import java.util.List;

/**
 * Created by hx on 17-2-11.
 */
public interface RoleMapper {
  List<Role> getUserRole(Integer userId);
}
