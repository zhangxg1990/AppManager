package com.topsec.ti.zxg.repository;

import com.topsec.ti.zxg.domain.policy.PolicyType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * Created by hx on 17-2-16.
 */
public interface PolicyRepository  extends JpaRepository<PolicyType,String>{
  @Query("select j from PolicyType j where j.parent is null")
  PolicyType getRoot();

}
