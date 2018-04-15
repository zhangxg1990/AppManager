package com.topsec.ti.zxg.domain.alert;

import javax.persistence.Column;

//未知攻击窃密告警日志
/*@Entity
@Table(name = "abnormal_attack_alert_log")*/
public class AbnormalAttack extends Alert{
    /*@Column
    private String alert_type;//未知攻击窃密类型：可疑心跳保活行为（1）、远程控制行为（2）、异常私有协议（3）、异常通用代理行为（4）*/
    @Column
    private String alert_policy;//未知攻击窃密判断主要依据，触发未知攻击窃密原因
    @Column
    private String alert_desc;//未知攻击窃密判断描述及上下文
    private String alert_type;
    /*public String getAlert_type() {
        return alert_type;
    }

    public void setAlert_type(String alert_type) {
        this.alert_type = alert_type;
    }*/

    public String getAlert_policy() {
        return alert_policy;
    }

    public void setAlert_policy(String alert_policy) {
        this.alert_policy = alert_policy;
    }

    public String getAlert_desc() {
        return alert_desc;
    }

    public void setAlert_desc(String alert_desc) {
        this.alert_desc = alert_desc;
    }

    public String getAlert_type() {
        return alert_type;
    }

    public void setAlert_type(String alert_type) {
        this.alert_type = alert_type;
    }
}
