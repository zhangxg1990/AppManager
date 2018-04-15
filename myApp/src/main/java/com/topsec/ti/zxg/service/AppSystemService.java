package com.topsec.ti.zxg.service;

import com.topsec.ti.zxg.domain.AppSystem;
import org.springframework.data.domain.Page;

import java.util.List;

/**
 * Created by hx on 17-2-10.
 */
public interface AppSystemService {

  AppSystem createAppSystem(AppSystem appSystem);

  AppSystem getAppSystem(String id);

  AppSystem updateAppSystem(AppSystem appSystem, String id);

  AppSystem deleteAppSystem(String id);

  List<AppSystem> getAllAppSystem();

  Page<AppSystem> getAllAppSystem(Integer pageNo, Integer pageSize);
}
