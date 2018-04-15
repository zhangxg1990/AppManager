package com.topsec.ti.zxg.repository;

import com.topsec.ti.zxg.domain.ca.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * Created by hx on 17-2-9.
 */
public interface RoleRepository extends JpaRepository<Role,String> {
  @Query("select j from Role j where j.name=?1")
  Role  findByName(String name);
//
//  @Query("select j from Role j where j.users in ")
//  List<Role> getRoleByUserId(String userId);
}
