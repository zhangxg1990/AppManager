package com.topsec.ti.zxg.mapper;

import com.github.pagehelper.Page;
import com.topsec.ti.zxg.domain.ca.User;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by hx on 17-2-9.
 */
public interface UserMapper extends MyMapper<User>{
  User getById(String id);
  Page<User> getByName(String name);

  @Transactional
  List<User> getAllUser();
}
