package com.topsec.ti.zxg.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;

@ApiModel
@JsonIgnoreProperties(ignoreUnknown = true)
public class DtoDeviceTopologyCoordinate {
    @ApiModelProperty(
            value = "设备Id",
            example = "12345"
    )
    private String deviceId;

    @ApiModelProperty(
            value = "拓扑坐标内容",
            example = "<xml>sda</xml>"
    )
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
