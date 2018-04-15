package com.topsec.ti.zxg.utils;

import com.topsec.ti.zxg.domain.device.Device;
import net.sf.json.JSONObject;
import java.util.ArrayList;
import java.util.List;


public class DeviceTreeUtils {
    private final static JSONObject treeDevice = new JSONObject();

    public static Device buildDevice(List<Device> devices,String device_id){
        Device parentDevice = new Device();
        List<Device> devicesLevel1 = new ArrayList<>();
        List<Device> devicesLevel2 = new ArrayList<>();
        List<Device> devicesLevel3 = new ArrayList<>();
        List<Device> devicesLevel4 = new ArrayList<>();
        combineGlzxWithJcq(devices);
        injectLevelLower(devices,devicesLevel1,devicesLevel2,devicesLevel3,devicesLevel4);
        buildLevel(devicesLevel3,devicesLevel4);
        buildLevel(devicesLevel2,devicesLevel3);
        buildLevel(devicesLevel1,devicesLevel2);
        for(Device device : devices){
            if(device.getDevice_id().equals(device_id)){
                parentDevice = device;
                break;
            }
        }
        injectNUll(parentDevice);
        return parentDevice;
    }
    private static void injectLevelLower(List<Device> devices,List<Device> devicesLevel1,
                                         List<Device> devicesLevel2,List<Device> devicesLevel3,List<Device> devicesLevel4
    ){
        for(Device device:devices){
            switch (device.getLevel_class()){
                case 1:devicesLevel1.add(device);break;
                case 2:devicesLevel2.add(device);break;
                case 3:devicesLevel3.add(device);break;
                case 4:devicesLevel4.add(device);break;
                default:break;
            }
        }
    }
    private static void combineGlzxWithJcq(List<Device> devices){
        for(Device glzx:devices){
            if(glzx.getLevel_class()==255)
                continue;
            List<Device> glzxWithjcqs = new ArrayList<>();
            int activeDetectors = 0;
            int inactiveDetectors = 0;
            for (Device jcq:devices){
                if(jcq.getLevel_class()!=255)
                    continue;
                if(jcq.getParent_id().equals(glzx.getDevice_id())){
                    if(jcq.getStatus().equals("on"))
                        activeDetectors++;
                    else
                        inactiveDetectors++;
                    glzxWithjcqs.add(jcq);
                }
            }
            if(glzxWithjcqs.size()!=0)
                glzx.setJcqs(glzxWithjcqs);
                glzx.setActiveDetectors(activeDetectors);
                glzx.setInactiveDetectors(inactiveDetectors);
        }
    }
    private static void injectNUll(Device device){
        Device deviceP = device.getParentDevice();
        if (deviceP!=null){
            deviceP.setJcqs(null);
            deviceP.setChirGlzxs(null);
            injectNUll(deviceP);
        }
    }
    private static void buildLevel(List<Device> parentDevices,List<Device> childrens){
        for(Device device:parentDevices){
            List<Device> chirdensDevice = new ArrayList<>();
            for(Device chirden:childrens){
                if(device.getDevice_id().equals(chirden.getParent_id())){
                    chirdensDevice.add(chirden);
                }
            }
            device.setChirGlzxs(chirdensDevice);
        }
    }
}