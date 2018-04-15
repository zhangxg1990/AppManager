package com.topsec.ti.zxg.repository;

import com.topsec.ti.zxg.domain.ca.Authority;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

/**
 * Created by hx on 17-2-12.
 */
@Transactional
public interface AuthorityRepository extends JpaRepository<Authority,String> {
  @Query("select j from Authority j join j.roles s join s.users t where t.name=?1")
  List<Authority> getAuthoritiesByUserName(String username);

  @Query("select j from Authority j where j.parent is null")
  Authority getRoot();
}
