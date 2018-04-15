package com.topsec.ti.zxg.domain.device;

import com.topsec.tsm.base.persistence.Resource;
import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "detector_info")
@Inheritance(strategy = InheritanceType.JOINED)
public class Detector extends Resource implements Serializable {
    private static final long serialVersionUID = 1L;

    @Column(name="device_id")
    private String deviceId;//检测器编号

    @Column(name="mem_total")
    private String memTotal;//内存

    @Column(name="cpu_info")
    private String cpuInfo;//cpu信息

    @Column(name="disk_info")
    private String diskInfo;//磁盘信息

    @Column(name="soft_version")
    private String softVersion;//产品软件版本号

    @Column(name="interface")
    private String interfaceInfo;//接口信息

    @Column(name="organs")
    private String organs;//管理中心部署单位名称

    @Column(name="ADDRESS")
    private String address;//管理中心部署位置信息


    public String getMemTotal() {
        return memTotal;
    }

    public void setMemTotal(String memTotal) {
        this.memTotal = memTotal;
    }

    public String getCpuInfo() {
        return cpuInfo;
    }

    public void setCpuInfo(String cpuInfo) {
        this.cpuInfo = cpuInfo;
    }

    public String getDiskInfo() {
        return diskInfo;
    }

    public void setDiskInfo(String diskInfo) {
        this.diskInfo = diskInfo;
    }

    public String getSoftVersion() {
        return softVersion;
    }

    public void setSoftVersion(String softVersion) {
        this.softVersion = softVersion;
    }

    public String getInterfaceInfo() {
        return interfaceInfo;
    }

    public void setInterfaceInfo(String interfaceInfo) {
        this.interfaceInfo = interfaceInfo;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public String getOrgans() {
        return organs;
    }

    public void setOrgans(String organs) {
        this.organs = organs;
    }
}
