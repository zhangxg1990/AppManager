package com.topsec.ti.zxg.domain.alert;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.util.Date;
/*@Entity
@Table(name = "mcjc_alert_info")

@Inheritance(strategy = InheritanceType.JOINED)*/
@MappedSuperclass
public class Alert {
    @Transient
    private int disposalBehavior =-1;
    @Transient
    private String searchTime;
    @Transient
    private boolean disposalStatus =false;
    @Transient
    private String organs;//检测器名称
    @Transient
    private String alert_person;//处理人
    @Id
    @Column
    @GenericGenerator(
            name = "UUID",
            strategy = "com.topsec.tsm.base.persistence.support.ResourceUUIDGenerator"
    )
    @GeneratedValue(
            generator = "UUID"
    )
    private String res_id;
    @Column
    private String id;
    @Column
    private String alert_id;//告警日志ID

    @Column
    private String device_id;//检测器ID
    @Column
    private String rule_id;//关键词告警时，匹配的规则ID
    @Column
    private String sip;//源ip地址
    @Column
    private String sport;//源端口
    @Column
    private String smac;//源mac地址
    @Column
    private String dip;//目的ip地址
    @Column
    private String dport;//目的端口
    @Column
    private String dmac;//目标mac地址
    @Column
    private Date time;//告警数据采集时间

    @Column
    private int risk;//告警级别
    @Column
    private String cap_date;//告警数据采集日期，分区字段；格式为“yyyy-MM-dd”
    /*@Column
    private String trojan_type;//木马类型。1（特种木马）、2（普通木马）、3（远控）、4（其他）
    @Column(
            name = "alert_type",
            length = 256
    )
    private String alert_type;*/
    @Transient
    private String res_type;
    @Transient
    private String start_time;//主要用于时间段查询,开始时间
    @Transient
    private String end_time;//主要用于时间段查询,结束时间

    public String getAlert_id() {
        return alert_id;
    }

    public void setAlert_id(String alert_id) {
        this.alert_id = alert_id;
    }

    public String getDevice_id() {
        return device_id;
    }

    public void setDevice_id(String device_id) {
        this.device_id = device_id;
    }

    public String getRule_id() {
        return rule_id;
    }

    public void setRule_id(String rule_id) {
        this.rule_id = rule_id;
    }

    public String getSip() {
        return sip;
    }

    public void setSip(String sip) {
        this.sip = sip;
    }

    public String getSport() {
        return sport;
    }

    public void setSport(String sport) {
        this.sport = sport;
    }

    public String getSmac() {
        return smac;
    }

    public void setSmac(String smac) {
        this.smac = smac;
    }

    public String getDip() {
        return dip;
    }

    public void setDip(String dip) {
        this.dip = dip;
    }

    public String getDport() {
        return dport;
    }

    public void setDport(String dport) {
        this.dport = dport;
    }

    public String getDmac() {
        return dmac;
    }

    public void setDmac(String dmac) {
        this.dmac = dmac;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public int getRisk() {
        return risk;
    }

    public void setRisk(int risk) {
        this.risk = risk;
    }

    public String getCap_date() {
        return cap_date;
    }

    public void setCap_date(String cap_date) {
        this.cap_date = cap_date;
    }

    public String getOrgans() {
        return organs;
    }

    public void setOrgans(String organs) {
        this.organs = organs;
    }



    public String getRes_type() {
        return res_type;
    }

    public void setRes_type(String res_type) {
        this.res_type = res_type;
    }

    public boolean getDisposalStatus() {
        return disposalStatus;
    }

    public void setDisposalStatus(String disposalStatus) {
        this.disposalStatus = true;
    }

    public int getDisposalBehavior() {
        return disposalBehavior;
    }

    public void setDisposalBehavior(int disposalBehavior) {
        this.disposalBehavior = disposalBehavior;
    }

    public String getSearchTime() {
        return searchTime;
    }

    public void setSearchTime(String searchTime) {
        this.searchTime = searchTime;
    }


    public String getAlert_person() {
        return alert_person;
    }

    public void setAlert_person(String alert_person) {
        this.alert_person = alert_person;
    }

    public String getRes_id() {
        return res_id;
    }

    public void setRes_id(String res_id) {
        this.res_id = res_id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getStart_time() {
        return start_time;
    }

    public void setStart_time(String start_time) {
        this.start_time = start_time;
    }

    public String getEnd_time() {
        return end_time;
    }

    public void setEnd_time(String end_time) {
        this.end_time = end_time;
    }
}
