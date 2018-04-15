package com.topsec.ti.zxg.service;

import com.topsec.ti.zxg.domain.AppSystem;
import com.topsec.ti.zxg.repository.AppSystemRepository;
import org.apache.commons.lang.Validate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

/**
 * Created by hx on 17-2-20.
 */
@Service
@Transactional
public class AppSystemManager implements AppSystemService {

  @Autowired
  private AppSystemRepository appSystemRepository;

  @Autowired
  private BaseService baseService;
  @Override
  public AppSystem createAppSystem(AppSystem appSystem) {
    Validate.notEmpty(appSystem.getName(),"名称不能为空");

    baseService.validateFieldUnique(null,appSystemRepository.findByName(appSystem.getName()),appSystem.getName());
    return appSystemRepository.saveAndFlush(appSystem);
  }

  @Override
  public AppSystem getAppSystem(String id) {
    return appSystemRepository.findOne(id);
  }

  @Override
  public AppSystem updateAppSystem(AppSystem appSystem, String id) {
    Validate.notEmpty(appSystem.getName(),"名称不能为空");
    AppSystem system=baseService.getAndCheckObj(appSystemRepository,id,"应用系统");
    baseService.validateFieldUnique(id,appSystemRepository.findByName(appSystem.getName()),appSystem.getName());
    system.setName(appSystem.getName());
    system.setNote(appSystem.getNote());
    system.setUrl(appSystem.getUrl());
    system.setOriginal(appSystem.getOriginal());
    system.setPhone(appSystem.getPhone());
    system.setLastModifiedTime(new Date());
    appSystemRepository.saveAndFlush(system);
    return system;
  }

  @Override
  public AppSystem deleteAppSystem(String id) {
    AppSystem appSystem=baseService.getAndCheckObj(appSystemRepository,id,"应用系统");
    appSystemRepository.delete(appSystem);
    return appSystem;
  }

  @Override
  public List<AppSystem> getAllAppSystem() {
    return appSystemRepository.findAll();
  }

  @Override
  public Page<AppSystem> getAllAppSystem(Integer pageNo, Integer pageSize) {
    Sort sort = new Sort(Sort.Direction.DESC,"createdTime");
    if (pageNo==null || pageSize==null){
      List<AppSystem> page = appSystemRepository.findAll(sort);
      return new PageImpl<>(page);

    }else {
      Pageable pageable = new PageRequest(pageNo - 1, pageSize, sort);
      Page<AppSystem> page = appSystemRepository.findAll(pageable);
      return page;
    }
  }
}
