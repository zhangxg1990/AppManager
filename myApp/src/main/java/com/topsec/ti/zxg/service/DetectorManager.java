package com.topsec.ti.zxg.service;

import com.topsec.ti.zxg.domain.device.Detector;
import com.topsec.ti.zxg.repository.DetectorRepository;
import org.apache.commons.lang.Validate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;

@Transactional
@Service
public class DetectorManager implements DetectorService {

    @Autowired
    private DetectorRepository detectorRepository;

    @Autowired
    private BaseService baseService;

    @Override
    public Detector createDetector(Detector detector) {
        Validate.notEmpty(detector.getDeviceId(),"检测器编号不能为空");
        detector.setName("::");
        //baseService.validateFieldUnique(null, detectorRepository.findByDeviceId(detector.getDeviceId()), detector.getDeviceId());
        if(detectorRepository.findByDeviceId(detector.getDeviceId())!=null) {
            detector.setNote("error,检测器编号重复,编号为" + detector.getDeviceId());
            return detector;
        }
        return detectorRepository.saveAndFlush(detector);
    }

    @Override
    public Detector getDetector(String id) {
        return detectorRepository.findOne(id);
    }

    @Override
    public Detector updateDetector(Detector detector, String id) {
        Validate.notEmpty(detector.getDeviceId(),"检测器编号不能为空");
        Detector detectorO=baseService.getAndCheckObj(detectorRepository,id,"检测器信息");
        //baseService.validateFieldUnique(null, detectorRepository.findByDeviceId(detector.getDeviceId()), detector.getDeviceId());
        if(!detector.getDeviceId().equals(detectorO.getDeviceId())){
            if(detectorRepository.findByDeviceId(detector.getDeviceId())!=null) {
                detector.setNote("error,检测器编号重复,编号为" + detector.getDeviceId());
                return detector;
            }
        }
        detectorO.setDeviceId(detector.getDeviceId());
        detectorO.setMemTotal(detector.getMemTotal());
        detectorO.setCpuInfo(detector.getCpuInfo());
        detectorO.setDiskInfo(detector.getDiskInfo());
        detectorO.setSoftVersion(detector.getSoftVersion());
        detectorO.setInterfaceInfo(detector.getInterfaceInfo());
        detectorO.setAddress(detector.getAddress());
        detectorO.setOrgans(detector.getOrgans());
        detectorO.setLastModifiedTime(new Date());
        detectorRepository.saveAndFlush(detectorO);
        return detectorO;
    }

    @Override
    public Detector deleteDetector(String id) {
        Detector detector=baseService.getAndCheckObj(detectorRepository,id,"检测器信息");
        detectorRepository.delete(detector);
        return detector;
    }

    @Override
    public List<Detector> getAllDetector() {
        return detectorRepository.findAll();
    }

    @Override
    public Page<Detector> getAllDetector(Integer pageNo, Integer pageSize) {
        Sort sort = new Sort(Sort.Direction.DESC,"createdTime");
        if (pageNo==null || pageSize==null){
            List<Detector> page = detectorRepository.findAll(sort);
            return new PageImpl<>(page);

        }else {
            Pageable pageable = new PageRequest(pageNo - 1, pageSize, sort);
            Page<Detector> page = detectorRepository.findAll(pageable);
            return page;
        }
    }
}
