package com.topsec.ti.zxg.repository;

import com.topsec.ti.zxg.domain.ca.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * Created by hx on 17-2-9.
 */
public interface UserRepository extends JpaRepository<User,String> {
  @Query("select j from User j where j.name=?1")
  User findByName(String name);
}
