package com.topsec.ti.zxg.domain.alert.security;

import com.topsec.ti.zxg.domain.alert.Alert;

import javax.persistence.Column;
import javax.persistence.MappedSuperclass;

@MappedSuperclass
public class Security extends Alert {
    private String alert_type;
    @Column
    private String sm_inpath;//实际告警文件内嵌路径
    @Column
    private String sm_summary;//SM数据摘要
    @Column
    private String sm_desc;//SM数据描述，即为命中的关键词或正则表达式描述
    @Column
    private int xm_dir;//源IP地址
    @Column
    private String sender;//发件人邮箱
    @Column
    private String receiver;//收件人邮箱
    @Column
    private String protocol;//最上层协议类型

    public String getSm_inpath() {
        return sm_inpath;
    }

    public void setSm_inpath(String sm_inpath) {
        this.sm_inpath = sm_inpath;
    }

    public String getSm_summary() {
        return sm_summary;
    }

    public void setSm_summary(String sm_summary) {
        this.sm_summary = sm_summary;
    }

    public String getSm_desc() {
        return sm_desc;
    }

    public void setSm_desc(String sm_desc) {
        this.sm_desc = sm_desc;
    }

    public int getXm_dir() {
        return xm_dir;
    }

    public void setXm_dir(int xm_dir) {
        this.xm_dir = xm_dir;
    }

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getReceiver() {
        return receiver;
    }

    public void setReceiver(String receiver) {
        this.receiver = receiver;
    }

    public String getProtocol() {
        return protocol;
    }

    public void setProtocol(String protocol) {
        this.protocol = protocol;
    }

    public String getAlert_type() {
        return alert_type;
    }

    public void setAlert_type(String alert_type) {
        this.alert_type = alert_type;
    }
}
