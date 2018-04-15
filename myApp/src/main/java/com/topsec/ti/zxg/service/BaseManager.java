package com.topsec.ti.zxg.service;

import com.topsec.ti.zxg.exception.MagicjcRuntimeException;
import com.topsec.tsm.base.persistence.Resource;
import com.topsec.tsm.util.StringFormater;
import org.apache.commons.lang.Validate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;

/**
 * Created by hx on 17-2-16.
 *
 */
@Service
@Transactional
public class BaseManager implements BaseService {
  @Override
  public <T, ID extends Serializable> T getAndCheckObj(JpaRepository<T, ID> jpaRepository, ID id, String name) {
    T obj = jpaRepository.findOne(id);
    Validate.notNull(obj, StringFormater.format("{}不存在:{}", name, id));
    return obj;
  }

  @Override
  public void validateFieldUnique(String id, Resource resource, String name) {
    if (resource != null) {
      if (id == null || (id != null && !id.equals(resource.getId())))
        throw new MagicjcRuntimeException(StringFormater.format("名称'{}'重复!", name));
    }
  }
}
