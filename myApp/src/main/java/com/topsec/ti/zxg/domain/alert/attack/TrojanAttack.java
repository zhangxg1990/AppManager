package com.topsec.ti.zxg.domain.alert.attack;

import com.topsec.ti.zxg.domain.alert.Alert;

import javax.persistence.*;

//木马攻击窃密告警日志
/*@Entity
@Table(name = "trojan_attack_alert_log")
@Inheritance(strategy=InheritanceType.JOINED)*/
public class TrojanAttack extends Alert {
    //trojan_attack_alert_log
    @Column
    private String trojan_id;//木马分类编号
    @Column
    private String prevalence;//攻击行为的流行程度。1（高）、2（中）、3（低）
    @Column
    private String attack_range;//攻击的适用范围
    @Column
    private String application;//攻击适用的应用程序
    @Column
    private String os;//攻击适用的操作系统
    @Column
    private String trojan_name;//木马名称
    @Column
    private String trojan_type;//1（特种木马）、2（普通木马）、3（远控）、4（其他）
    @Column
    private String descr;//木马类型。1（特种木马）、2（普通木马）、3（远控）、4（其他）

    public String getTrojan_id() {
        return trojan_id;
    }

    public void setTrojan_id(String trojan_id) {
        this.trojan_id = trojan_id;
    }

    public String getPrevalence() {
        return prevalence;
    }

    public void setPrevalence(String prevalence) {
        this.prevalence = prevalence;
    }

    public String getAttack_range() {
        return attack_range;
    }

    public void setAttack_range(String attack_range) {
        this.attack_range = attack_range;
    }

    public String getApplication() {
        return application;
    }

    public void setApplication(String application) {
        this.application = application;
    }

    public String getOs() {
        return os;
    }

    public void setOs(String os) {
        this.os = os;
    }

    public String getTrojan_name() {
        return trojan_name;
    }

    public void setTrojan_name(String trojan_name) {
        this.trojan_name = trojan_name;
    }

    public String getDescr() {
        return descr;
    }

    public void setDescr(String descr) {
        this.descr = descr;
    }

    public String getTrojan_type() {
        return trojan_type;
    }

    public void setTrojan_type(String trojan_type) {
        this.trojan_type = trojan_type;
    }
}
