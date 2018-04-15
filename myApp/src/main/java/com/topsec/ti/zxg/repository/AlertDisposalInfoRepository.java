package com.topsec.ti.zxg.repository;

import com.topsec.ti.zxg.domain.alert.AlertDisposalInfo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AlertDisposalInfoRepository  extends JpaRepository<AlertDisposalInfo,String> {
    //查询告警id级本级以下处置意见
       List<AlertDisposalInfo> findByAlertIdAndLevelGreaterThan(String alertId, int level);
}
