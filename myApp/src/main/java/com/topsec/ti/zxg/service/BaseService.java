package com.topsec.ti.zxg.service;

import com.topsec.tsm.base.persistence.Resource;
import org.springframework.data.jpa.repository.JpaRepository;

import java.io.Serializable;

/**
 * Created by hx on 17-2-16.
 */
public interface BaseService {
  <T,ID extends Serializable> T getAndCheckObj(JpaRepository<T, ID> jpaRepository, ID id, String name);
   void validateFieldUnique(String id, Resource resource, String field);
}
