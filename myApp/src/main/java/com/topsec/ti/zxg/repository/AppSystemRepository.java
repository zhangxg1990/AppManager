package com.topsec.ti.zxg.repository;

import com.topsec.ti.zxg.domain.AppSystem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * Created by hx on 17-2-20.
 */
public interface AppSystemRepository extends JpaRepository<AppSystem,String> {
  @Query("select j from AppSystem j where j.name=?1")
  AppSystem findByName(String name);
}
