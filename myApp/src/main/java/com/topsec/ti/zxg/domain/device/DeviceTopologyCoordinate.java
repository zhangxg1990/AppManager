package com.topsec.ti.zxg.domain.device;

import org.hibernate.annotations.Type;

import javax.persistence.*;

@Entity
@Table(name = "MCLP_DEVICE_TOPOLOGY_COORDINATE")
@Inheritance(strategy = InheritanceType.JOINED)
public class DeviceTopologyCoordinate {
    @Id
    @Column(name="device_id")
    private String deviceId;
    @Column
    @Lob
    @Type(type="org.hibernate.type.StringClobType")
    private String content;

    public String getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(String deviceId) {
        this.deviceId = deviceId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
