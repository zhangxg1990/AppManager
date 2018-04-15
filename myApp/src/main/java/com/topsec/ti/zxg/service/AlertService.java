package com.topsec.ti.zxg.service;

import com.github.pagehelper.PageInfo;
import com.topsec.ti.zxg.domain.alert.Alert;
import com.topsec.ti.zxg.domain.alert.AlertDisposalInfo;
import com.topsec.ti.zxg.domain.alert.AlertFile;
import com.topsec.ti.zxg.dto.DtoAlertType;

import java.util.List;

public interface AlertService {

    //初始化所有的告警类型
    void initializeAlertType();
    //删除所有告警
    void deleteAllAlertType();
    DtoAlertType getAllDtoAlertType();
    AlertDisposalInfo saveAlertDisposalInfo(AlertDisposalInfo alertDisposalInfo);
    List<AlertDisposalInfo> quertAlertDisposalInfos(String alertId, int level);
    int getAlertCntByDeviceId(String deviceId);
    PageInfo<Alert> queryCenterAlerts(Integer page, Integer pageSize, String alertType, Alert alert);
    PageInfo<Alert> queryDetectorAlerts(Integer page, Integer pageSize, String alertType, Alert alert);

    /**
     * 根据告警id下载文件
     * @param alertId
     * @return
     */
    List<AlertFile> queryAlertFiles(String alertId);
}
