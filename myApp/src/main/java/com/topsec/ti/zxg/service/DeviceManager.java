package com.topsec.ti.zxg.service;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.google.gson.reflect.TypeToken;
import com.topsec.ti.zxg.config.WebInitConfigure;
import com.topsec.ti.zxg.dc.DataCenterRequester;
import com.topsec.ti.zxg.dc.DataWrapperBean;
import com.topsec.ti.zxg.domain.device.Detector;
import com.topsec.ti.zxg.domain.device.Device;
import com.topsec.ti.zxg.domain.device.DeviceTopologyCoordinate;
import com.topsec.ti.zxg.dto.DtoDeviceTopologyCoordinate;
import com.topsec.ti.zxg.mapper.DeviceMapper;
import com.topsec.ti.zxg.repository.DetectorRepository;
import com.topsec.ti.zxg.repository.DeviceTopologyCoordinateRepository;
import com.topsec.ti.zxg.utils.DeviceTreeUtils;
import com.topsec.ti.zxg.utils.DtoUtils;
import com.topsec.ti.zxg.web.ResourceTypeDefinition;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Service
@Transactional
public class DeviceManager implements DeviceService {
    @Autowired
    //@Qualifier("deviceMapperImp")
    private DeviceMapper deviceMapper;
    @Value(value ="${application.magicjc.configuration.device.parent}")
    String parentStrings;
    @Value(value ="${application.magicjc.configuration.centerId}")
    String centerId;
    @Autowired
    private WebInitConfigure webConfigure;

    @Autowired
    private DetectorRepository detectorRepository;

    @Autowired
    @Qualifier(value = "sqlExecRestRequester")
    private DataCenterRequester dataCenterRequester;

    private Device parent;
    private Device root;

    @Autowired
    private PolicyService policyService;
    @Autowired
    private AlertService alertService;
    @Autowired
    private DeviceTopologyCoordinateRepository dtcRepository;



    private Type deviceType= new TypeToken<DataWrapperBean<Device>>() {}.getType();


    @Override
    public Device getDevicesByTopologyAndAll(String centerId) {
        List<Device> devices = deviceMapper.getDevicesByTp();
        Device device = DeviceTreeUtils.buildDevice(devices,centerId);
        device.setCorrespondCenter(true);
        initializeParentDevice();
        parent.getChirGlzxs().add(device);
        List<Device> devices1 = new ArrayList<>();
        devices1.add(parent);
        root.setChirGlzxs(devices1);
        return root;
    }

    @Override
    public Device getDevicesByTopology(String centerId) {
        //暂定一台检测器
        //List<Device> devices = new ArrayList<>();
        Device deviceP = new Device();
        deviceP.setDevice_id(centerId);
        deviceP.setOrgans("管理中心");
        deviceP.setDevice_type("2");
        deviceP.setLevel_class(3);
        List<Device> devices = DtoUtils.copyArray(Device.class, detectorRepository.findAll(), new DtoUtils.DtoCopyCallBack<Detector, Device>() {
            @Override
            public void addProperty(Detector src, Device des) {
                des.setDevice_id(src.getDeviceId());
                des.setDevice_type("1");
            }
        });
        deviceP.setJcqs(devices);
        //Device device = DeviceTreeUtils.buildDevice(devices,centerId);
        return deviceP;
    }

    @Override
    public PageInfo<Device> getDevices(Integer page, Integer size,String centerId) {
        PageHelper.startPage(page,size);
        List<Device> devices = deviceMapper.getDevices(centerId);
        PageInfo<Device> pageInfo = new PageInfo<>(devices);
        return pageInfo;
    }

    @Override
    public Device getDeviceById(String device_id) {
        return deviceMapper.getDeviceById(device_id);
    }

    @Override
    public List<Map<String,Object>> deviceTotal(String centerId) {
        List<Map<String,Object>> maps= deviceMapper.deviceTotal(centerId);
        return maps;
    }

    @Override
    public List<Map<String,Object>> deviceActiveTotal(String centerId) {
        List<Map<String,Object>> maps = deviceMapper.deviceActiveTotal(centerId);
        return maps;
    }

    @Override
    public List<Map<String,Object>> glzxGroupTotal(String centerId) {
        List<Map<String,Object>> maps = deviceMapper.glzxGroupTotal(centerId);
        return maps;
    }
    @Override
    public void initializeParentDevice() {
        if (parentStrings==null)return;
        String[] strings = parentStrings.split(",");
        Device p=null;
        for (String str:strings) {
            String[] device=str.split(":");
            Device d = new Device();
            d.setDevice_id(device[0]);
            d.setDevice_type("2");
            d.setOrgans(device[1]);

            if(p!=null) {
                p.getChirGlzxs().add(d);
            }
            p=d;
            if (this.root==null){
                this.root=p;
            }else
                p.setParent_id(this.root.getDevice_id());
        }
        this.parent=p;
    }

    @Override
    public List<Device> getDevicesByCenterId(String centerId, int...devicetype) {
        List<Device> devices=deviceMapper.getDevicesByCenterId(centerId,devicetype);
        return devices;
    }

  @Override
  public Map<String, Object> getPolicyAndAlertCnt(String centerId) {
    int policyCnt= policyService.getPolicyCntByDeviceId(centerId);
    int alertCnt=alertService.getAlertCntByDeviceId(centerId);
    Map<String,Object> map = new LinkedHashMap();
    map.put(ResourceTypeDefinition.POLICY,policyCnt);
    map.put(ResourceTypeDefinition.ALERT,alertCnt);
    return map;
  }

    @Override
    public String saveDtc(DeviceTopologyCoordinate deviceTopologyCoordinate) {
        if(deviceTopologyCoordinate==null)
            deviceTopologyCoordinate = new DeviceTopologyCoordinate();
        deviceTopologyCoordinate.setDeviceId(centerId);
        DeviceTopologyCoordinate dtcRepositoryOne= dtcRepository.findOne(deviceTopologyCoordinate.getDeviceId());
        if(dtcRepositoryOne==null) {
            dtcRepositoryOne = new DeviceTopologyCoordinate();
            dtcRepositoryOne.setDeviceId(deviceTopologyCoordinate.getDeviceId());
            dtcRepositoryOne.setContent(deviceTopologyCoordinate.getContent());
            dtcRepository.saveAndFlush(dtcRepositoryOne);
        }else {
            dtcRepositoryOne.setContent(deviceTopologyCoordinate.getContent());
            dtcRepository.saveAndFlush(dtcRepositoryOne);
        }
        return dtcRepositoryOne.getDeviceId();
    }
    private DtoDeviceTopologyCoordinate prepareDtoDtcByDtc(DeviceTopologyCoordinate deviceTopologyCoordinate) {
        DtoDeviceTopologyCoordinate dtoDeviceTopologyCoordinate = DtoUtils.copyObject(DtoDeviceTopologyCoordinate.class, deviceTopologyCoordinate);
        return dtoDeviceTopologyCoordinate;
    }
    @Override
    public DtoDeviceTopologyCoordinate getDtc(String deviceId) {
        DeviceTopologyCoordinate deviceTopologyCoordinate = dtcRepository.getOne(deviceId);
        return prepareDtoDtcByDtc(deviceTopologyCoordinate);
    }

  @Override
  public DataWrapperBean<Device> getDevicesByRest(String centerId) {
        String sql = "select * from bmj.device_topology_info";
      DataWrapperBean<Device> dataWrapperBean=dataCenterRequester.queryObject(sql,deviceType);
    return dataWrapperBean;
  }
}
