package com.topsec.ti.zxg.domain.device;

import com.topsec.ti.zxg.utils.DivisionCodeUtils;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Created by hx on 17-2-10.
 * 设备
 */
public class Device {
  private Device parentDevice;
  private List<Device> chirGlzxs= new ArrayList<>();
  private List<Device> jcqs= new ArrayList<>();
  private String device_id;
  private String parent_id;
  private String device_type;
  private int level_info;
  private String levelInfoArea;
  private int level_class;
  private int activeDetectors;
  private int inactiveDetectors;
  private int mem_total;
  private String cpu_info;
  private String disk_info;
  private String soft_version;
  private String interface_info;
  private boolean isCorrespondCenter;
  private String organs;
  private String address;
  private String id;
  private String cpu;
  private String mem;
  private String disk;
  private Date time;
  private String reColumns;

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getCpu() {
    return cpu;
  }

  public void setCpu(String cpu) {
    this.cpu = cpu;
  }

  public String getMem() {
    return mem;
  }

  public void setMem(String mem) {
    this.mem = mem;
  }

  public String getDisk() {
    return disk;
  }

  public void setDisk(String disk) {
    this.disk = disk;
  }



  public String getCap_date() {
    return cap_date;
  }

  public void setCap_date(String cap_date) {
    this.cap_date = cap_date;
  }

  public String getStatus() {
    return status;
  }

  public void setStatus(String status) {
    this.status = status;
  }

  private String cap_date;
  private String status = "on";
  public String getDevice_id() {
    return device_id;
  }

  public void setDevice_id(String device_id) {
    this.device_id = device_id;
  }

  public String getParent_id() {
    return parent_id;
  }

  public void setParent_id(String parent_id) {
    this.parent_id = parent_id;
  }

  public String getDevice_type() {
    return device_type;
  }

  public void setDevice_type(String device_type) {
    this.device_type = device_type;
  }

  public int getLevel_info() {
    return level_info;
  }

  public void setLevel_info(int level_info) {
    this.level_info = level_info;
    levelInfoArea = DivisionCodeUtils.findAreaByCode(level_info);
  }

  public int getLevel_class() {
    return level_class;
  }

  public void setLevel_class(int level_class) {
    this.level_class = level_class;
  }

  public int getMem_total() {
    return mem_total;
  }

  public void setMem_total(int mem_total) {
    this.mem_total = mem_total;
  }

  public String getCpu_info() {
    return cpu_info;
  }

  public void setCpu_info(String cpu_info) {
    this.cpu_info = cpu_info;
  }

  public String getDisk_info() {
    return disk_info;
  }

  public void setDisk_info(String disk_info) {
    this.disk_info = disk_info;
  }

  public String getSoft_version() {
    return soft_version;
  }

  public void setSoft_version(String soft_version) {
    this.soft_version = soft_version;
  }

  public String getInterface_info() {
    return interface_info;
  }

  public void setInterface_info(String interface_info) {
    this.interface_info = interface_info;
  }

  public String getOrgans() {
    return organs;
  }

  public void setOrgans(String organs) {
    this.organs = organs;
  }

  public String getAddress() {
    return address;
  }

  public void setAddress(String address) {
    this.address = address;
  }

  public String getReColumns() {
    return reColumns;
  }

  public void setReColumns(String reColumns) {
    this.reColumns = reColumns;
  }

  public Date getTime() {
    return time;
  }

  public void setTime(Date time) {
    this.time = time;
  }

  public Device getParentDevice() {
    return parentDevice;
  }

  public void setParentDevice(Device parentDevice) {
    this.parentDevice = parentDevice;
  }

  public List<Device> getJcqs() {
    return jcqs;
  }

  public void setJcqs(List<Device> jcqs) {
    this.jcqs = jcqs;
  }

  public List<Device> getChirGlzxs() {
    return chirGlzxs;
  }

  public void setChirGlzxs(List<Device> chirGlzxs) {
    this.chirGlzxs = chirGlzxs;
  }

  public int getActiveDetectors() {
    return activeDetectors;
  }

  public void setActiveDetectors(int activeDetectors) {
    this.activeDetectors = activeDetectors;
  }

  public int getInactiveDetectors() {
    return inactiveDetectors;
  }

  public void setInactiveDetectors(int inactiveDetectors) {
    this.inactiveDetectors = inactiveDetectors;
  }

  public String getLevelInfoArea() {
    return levelInfoArea;
  }

  public boolean isCorrespondCenter() {
    return isCorrespondCenter;
  }

  public void setCorrespondCenter(boolean correspondCenter) {
    isCorrespondCenter = correspondCenter;
  }
}