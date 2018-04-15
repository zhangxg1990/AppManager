package com.topsec.ti.zxg.domain.alert.attack;

import com.topsec.ti.zxg.domain.alert.Alert;

import javax.persistence.*;

//其他攻击窃密检测告警日志
/*@Entity
@Table(name = "other_attack_alert_log")
@Inheritance(strategy= InheritanceType.JOINED)*/
public class OtherAttack extends Alert {
      //other_attack_alert_log
    @Column
    private String descr;//攻击窃密告警描述

    public String getDescr() {
        return descr;
    }

    public void setDescr(String descr) {
        this.descr = descr;
    }
}
