package com.topsec.ti.zxg.mapper;

import com.topsec.ti.zxg.domain.alert.Alert;
import com.topsec.ti.zxg.domain.alert.AlertEnumType;
import com.topsec.ti.zxg.domain.alert.AlertFile;
import com.topsec.ti.zxg.domain.device.Device;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * Created by hx on 17-2-10.
 */
public interface AlertMapper {

  //查询告警
  List<Alert> queryAlertPage(@Param("alertType") AlertEnumType alertType, @Param("alert") Alert alert, @Param("detector") Device detector);

  //查询告警基本表无类型
  List<Alert> queryAlertWithoutTypePage(@Param("alert") Alert alert, @Param("detectors") Device... detectors);

  //查询告警文件列表
  List<AlertFile> queryAlertFiles(@Param("alertId") String alertId);

  /*//查询告警文件列表
  List<AlertFile> queryAlertFiles(@Param("alertId") String alertId);*/

  int getAlertCntByDeviceId(String deviceId);
}
