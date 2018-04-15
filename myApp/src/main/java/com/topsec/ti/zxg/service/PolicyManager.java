package com.topsec.ti.zxg.service;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.topsec.ti.zxg.MagicjcConstants;
import com.topsec.ti.zxg.config.WebInitConfigure;
import com.topsec.ti.zxg.domain.device.Device;
import com.topsec.ti.zxg.domain.policy.PolicyContent;
import com.topsec.ti.zxg.domain.policy.PolicyInfo;
import com.topsec.ti.zxg.domain.policy.PolicyInfoVo;
import com.topsec.ti.zxg.domain.policy.PolicyType;
import com.topsec.ti.zxg.dto.DtoPolicyType;
import com.topsec.ti.zxg.exception.MagicjcRuntimeException;
import com.topsec.ti.zxg.mapper.PolicyMapper;
import com.topsec.ti.zxg.repository.PolicyRepository;
import com.topsec.ti.zxg.support.MyPageInfo;
import com.topsec.ti.zxg.support.policy.PolicyHelper;
import com.topsec.ti.zxg.utils.DtoUtils;
import com.topsec.ti.zxg.utils.WebPathUtils;
import com.topsec.ti.zxg.xml.PolicyTypeFormatter;
import com.topsec.tsm.base.xml.XmlAccessException;
import com.topsec.tsm.ui.page.PageBean;
import com.topsec.tsm.util.xml.DefaultDocumentFormater;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.io.File;
import java.util.*;

/**
 * Created by hx on 17-2-16.
 */
@Service
@Transactional(value = "txManager2")
public class PolicyManager implements PolicyService {
  @Autowired
  private PolicyRepository policyRepository;

  @Autowired
  private PolicyMapper policyMapper;

  @Autowired
  private BaseService baseService;


  @Autowired
  private DeviceService deviceService;

  @Autowired
  private WebInitConfigure webConfigure;

  private String centerId;

  private Map<String, Class<? extends PolicyContent>> policyTypeClasses = new LinkedHashMap<>();

  @PostConstruct
  public void initializePolicyTypeClasses() {
    List<PolicyType> all = policyRepository.findAll();
    for (PolicyType p : all) {
      try {
        if (p.getName() != null && p.getClassName() != null)
          policyTypeClasses.put(p.getName(), (Class<? extends PolicyContent>) Class.forName(p.getClassName()));
      } catch (ClassNotFoundException e) {
        e.printStackTrace();
      }

    }
  }

  @PostConstruct
  public void initializeCenterId() {
    centerId = webConfigure.getCenterId();

  }


  @Override
  public DtoPolicyType getAllDtoPolicyType() {
    PolicyType policyType = policyRepository.getRoot();
    return DtoUtils.copyObjectRecursion(DtoPolicyType.class, policyType);
  }


  @Override
  public MyPageInfo<PolicyInfoVo> getMyLevelPolicies(String type, Integer pageNo, Integer pageSize, String centerId) {
    /*centerId = (centerId == null ? webConfigure.getCenterId() : centerId);
    //查询本级的所有检测器
    List<Device> detectors = deviceService.getDevicesByCenterId(centerId, 1);
    if (CollectionUtils.isNotEmpty(detectors)) {*/
      //查询本级检测器的策略
      judgePageUsed(pageNo, pageSize);
      List<PolicyInfo> policyInfos = policyMapper.getPolicyInfos(type, null);
      return getPolicyInfoVoMyPageInfo(policyInfos);
  }

  @Override
  public MyPageInfo<PolicyInfoVo> getDetectorPolicies(String type, Integer pageNo, Integer pageSize, String detectorId) {
    Device device = new Device();
    device.setDevice_id(detectorId);
    judgePageUsed(pageNo, pageSize);
    List<PolicyInfo> policyInfos = policyMapper.getPolicyInfos(type, device);
    return getPolicyInfoVoMyPageInfo(policyInfos);
  }

  private void judgePageUsed(Integer pageNo, Integer pageSize) {
    if (pageNo != null && pageSize != null) {
      PageHelper.startPage(pageNo, pageSize);
    }
  }

  private MyPageInfo<PolicyInfoVo> getPolicyInfoVoMyPageInfo(List<PolicyInfo> policyInfos) {
    if (CollectionUtils.isEmpty(policyInfos)) {
      return new MyPageInfo<>();
    }
    List<PolicyInfoVo> policyInfoVos = new ArrayList<>(policyInfos.size());
    for (PolicyInfo policyInfo : policyInfos) {
      PolicyInfoVo policyInfoVo = new PolicyInfoVo();
      policyInfoVo.setPolicyInfo(policyInfo);
      policyInfoVo.setPolicyContent(PolicyHelper.buildContent(policyInfo, policyTypeClasses.get(policyInfo.getPolicy_type())));
      //policyInfoVo.setPolicyExternalInfo(PolicyHelper.buildExternalInfo(policyInfo));
      policyInfo.setPolicy_content(null);
      policyInfoVos.add(policyInfoVo);
    }
    PageBean pageBean = new PageBean();
    if (policyInfos instanceof Page) {
      Page page = (Page) policyInfos;
      pageBean.setPageNo(page.getPageNum());
      pageBean.setPageSize(page.getPageSize());
      pageBean.setTotal((int) page.getTotal());
    }

    MyPageInfo<PolicyInfoVo> policyInfoPageInfo = new MyPageInfo<>(pageBean, policyInfoVos);
    return policyInfoPageInfo;
  }

  @Override
  public List<Map<String, Object>> allPolicyCount() {
    return null;
  }

  @Override
  public MyPageInfo<PolicyInfoVo> getPolicyInfoByType(String type, Integer pageNo, Integer pageSize) {
    judgePageUsed(pageNo, pageSize);
    List<PolicyInfo> policyInfos = policyMapper.getPolicyInfos(type, null);
    return getPolicyInfoVoMyPageInfo(policyInfos);

  }

  @Override
  public List<PolicyInfoVo> getPolicyInfoByTypeAndCenter(String type, String center) {
    return null;
  }

  @Override
  public int getPolicyCntByDeviceId(String deviceId) {
    return policyMapper.getPolicyCntByDeviceId(deviceId);
  }

  @Override
  public void initializePolicyType() {
    DefaultDocumentFormater defaultDocumentFormater = new DefaultDocumentFormater();
    PolicyTypeFormatter formatter = new PolicyTypeFormatter();
    defaultDocumentFormater.setFormater(formatter);
    PolicyType policyType;
    try {
      File file = new File(WebPathUtils.getWebAppRootPath(), MagicjcConstants.POLICY_TYPE_CONFIG_FILE);
      defaultDocumentFormater.importObjectFromFile(file.getAbsolutePath());
      policyTypeClasses = formatter.getPolicyTypeClasses();
    } catch (XmlAccessException e) {
      e.printStackTrace();
      throw new MagicjcRuntimeException(e);
    }
    policyType = formatter.getPolicyType();
    if (policyType != null) {
      deleteAllPolicyType();
      initializePolicyType(policyType);
    }
  }

  private void initializePolicyType(PolicyType policyType) {
    Set<PolicyType> authorities = policyType.getPolicyTypes();
    policyType.setPolicyTypes(null);
    policyRepository.saveAndFlush(policyType);
    initializePolicyType(policyType, authorities);
  }

  private void initializePolicyType(PolicyType persist, Collection<PolicyType> types) {
    if (CollectionUtils.isNotEmpty(types)) {
      for (PolicyType type : types) {
        Collection<PolicyType> children = type.getPolicyTypes();
        type.setParent(persist);
        type.setPolicyTypes(null);
        policyRepository.saveAndFlush(type);
        initializePolicyType(type, children);
      }
    }
  }

  @Override
  public void deleteAllPolicyType() {
    PolicyType policyType = policyRepository.getRoot();
    if (policyType != null) policyRepository.delete(policyType);
  }

  @Override
  public PolicyType checkTypeOfPolicy(String name) {
    return null;
  }
}
