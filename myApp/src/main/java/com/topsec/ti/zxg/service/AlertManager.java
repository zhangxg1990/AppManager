package com.topsec.ti.zxg.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.topsec.ti.zxg.MagicjcConstants;
import com.topsec.ti.zxg.domain.device.Device;
import com.topsec.ti.zxg.dto.DtoAlertType;
import com.topsec.ti.zxg.exception.MagicjcRuntimeException;
import com.topsec.ti.zxg.mapper.AlertMapper;
import com.topsec.ti.zxg.mapper.DeviceMapper;
import com.topsec.ti.zxg.repository.AlertDisposalInfoRepository;
import com.topsec.ti.zxg.repository.AlertTypeRepository;
import com.topsec.ti.zxg.utils.DtoUtils;
import com.topsec.ti.zxg.utils.WebPathUtils;
import com.topsec.ti.zxg.xml.AlertTypeFormatter;
import com.topsec.ti.zxg.domain.alert.*;
import com.topsec.tsm.base.xml.XmlAccessException;
import com.topsec.tsm.util.xml.DefaultDocumentFormater;
import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.lang.Validate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.util.*;

@Transactional(value = "txManager2")
@Service
public class AlertManager implements AlertService {
    @Autowired
    private AlertMapper alertMapper;
    @Autowired
    private DeviceMapper deviceMapper;
    @Autowired
    private AlertDisposalInfoRepository alertDisposalInfoRepository;
    @Autowired
    private AlertTypeRepository alertTypeRepository;
    @Value(value ="${application.zxg.configuration.device.parent}")
    String parentStrings;
    @Value(value ="${application.zxg.configuration.centerId}")
    String centerId;
    private Map<String, Class<? extends Alert>> alertTypeClasses = new LinkedHashMap<>();
    @Override
    public void initializeAlertType() {
        DefaultDocumentFormater defaultDocumentFormater = new DefaultDocumentFormater();
        AlertTypeFormatter formatter = new AlertTypeFormatter();
        defaultDocumentFormater.setFormater(formatter);
        AlertType alertType;
        try {
            File file = new File(WebPathUtils.getWebAppRootPath(), MagicjcConstants.ALERT_TYPE_CONFIG_FILE);
            defaultDocumentFormater.importObjectFromFile(file.getAbsolutePath());
            alertTypeClasses = formatter.getAlertTypeClasses();
        } catch (XmlAccessException e) {
            e.printStackTrace();
            throw new MagicjcRuntimeException(e);
        }
        alertType = formatter.getAlertType();
        if (alertType != null) {
            deleteAllAlertType();
            initializeAlertType(alertType);
        }
    }
    @Override
    public void deleteAllAlertType() {
        AlertType alertType = alertTypeRepository.getRoot();
        if (alertType != null) alertTypeRepository.delete(alertType);
    }
    private void initializeAlertType(AlertType alertType) {
        Set<AlertType> alertTypes = alertType.getAlertTypes();
        alertType.setAlertTypes(null);
        alertTypeRepository.saveAndFlush(alertType);
        initializeAlertType(alertType, alertTypes);
    }
    private void initializeAlertType(AlertType persist, Collection<AlertType> types) {
        if (CollectionUtils.isNotEmpty(types)) {
            for (AlertType type : types) {
                Collection<AlertType> children = type.getAlertTypes();
                type.setParent(persist);
                type.setAlertTypes(null);
                alertTypeRepository.saveAndFlush(type);
                initializeAlertType(type, children);
            }
        }
    }

    @Override
    public AlertDisposalInfo saveAlertDisposalInfo(AlertDisposalInfo alertDisposalInfo) {
        alertDisposalInfoRepository.save(alertDisposalInfo);
        return alertDisposalInfo;
    }
    @Override
    public DtoAlertType getAllDtoAlertType() {
        AlertType alertType = alertTypeRepository.getRoot();
        return DtoUtils.copyObjectRecursion(DtoAlertType.class, alertType);
    }
    @Override
    public List<AlertDisposalInfo> quertAlertDisposalInfos(String alertId, int level) {
        return alertDisposalInfoRepository.findByAlertIdAndLevelGreaterThan(alertId,level-1);
    }

    @Override
    public int getAlertCntByDeviceId(String deviceId) {
    return alertMapper.getAlertCntByDeviceId(deviceId);
    }

    @Override
    public PageInfo<Alert> queryCenterAlerts(Integer page, Integer pageSize, String alertType, Alert alert) {
        PageHelper.startPage(page,pageSize);
        if(alert==null)
            alert = new Alert();
        List<Alert> alerts = null;
        if(!StringUtils.isEmpty(alertType)) {
            AlertEnumType alertType1 = AlertEnumType.valueOf(alertType.toUpperCase());
            alerts = alertMapper.queryAlertPage(alertType1, alert, null);
        }
        else{
            AlertEnumType alertType1 = AlertEnumType.valueOf("EXPLOITATTACK".toUpperCase());
            alerts = alertMapper.queryAlertPage(alertType1, alert, null);
        }
        PageInfo<Alert> pageInfo = new PageInfo<>(alerts);
        return pageInfo;
    }

    @Override
    public PageInfo<Alert> queryDetectorAlerts(Integer page, Integer pageSize, String alertType, Alert alert) {
        Device detector = new Device();
        detector.setDevice_id(alert.getDevice_id());
        List<Alert> alerts = null;
        PageHelper.startPage(page,pageSize);
        if(!StringUtils.isEmpty(alertType)) {
            AlertEnumType alertType1 = AlertEnumType.valueOf(alertType.toUpperCase());
            alerts = alertMapper.queryAlertPage(alertType1, alert,detector);
        }
        else{
            AlertEnumType alertType1 = AlertEnumType.valueOf("EXPLOITATTACK".toUpperCase());
            alerts = alertMapper.queryAlertPage(alertType1, alert, detector);
        }
        if(alert==null)
            alert = new Alert();
        PageInfo<Alert> pageInfo = new PageInfo<>(alerts);
        return pageInfo;
    }

    @Override
    public List<AlertFile> queryAlertFiles(String alertId)  {
        Validate.notEmpty(alertId,"告警id不能为空");
        List<AlertFile> alertFiles = alertMapper.queryAlertFiles(alertId);
        return alertFiles;
    }

}
