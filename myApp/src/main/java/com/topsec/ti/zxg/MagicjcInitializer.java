package com.topsec.ti.zxg;

import com.topsec.ti.zxg.config.WebInitConfigure;
import com.topsec.ti.zxg.service.AlertService;
import com.topsec.ti.zxg.service.CaService;
import com.topsec.ti.zxg.service.DeviceService;
import com.topsec.ti.zxg.service.PolicyService;
import com.topsec.ti.zxg.service.datapull.DataPullService;
import com.topsec.ti.zxg.timer.TimerManager;
import com.topsec.ti.zxg.utils.DivisionCodeUtils;
import org.springframework.beans.factory.annotation.Autowired;


/**
 * Created by jessica on 16-8-31.
 */
public class MagicjcInitializer implements Runnable {


  @Autowired
  private CaService caService;

  @Autowired
  private WebInitConfigure webConfigure;

  @Autowired
  private PolicyService policyService;

  @Autowired
  private DataPullService iplocateService;

  @Autowired
  private DeviceService deviceService;

  @Autowired
  private AlertService alertService;
  //
  public void init() throws Exception {
    Thread thread = new Thread(this);
    thread.start();
  }

  @Override
  public void run() {
    new TimerManager(iplocateService);//定时ip数据汇入
    //iplocateService.pullIpData();
    if (webConfigure.isInitAuth()) {
      caService.initializeAuthorities();
      alertService.initializeAlertType();
    }
    DivisionCodeUtils.loadDivisionCode();
    if (webConfigure.isInitPolicyType()){
      policyService.initializePolicyType();
    }
    deviceService.initializeParentDevice();
  }


}
