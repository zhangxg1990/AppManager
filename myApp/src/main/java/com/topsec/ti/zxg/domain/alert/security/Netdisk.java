package com.topsec.ti.zxg.domain.alert.security;

import javax.persistence.Column;

//网盘涉密信息告警日志
/*@Entity
@Table(name = "netdisk_sm_alert_log")*/
public class Netdisk extends Security {
    //netdisk_sm_alert_log
    @Column
    private String account;//网盘账户
    @Column
    private String domain;//网盘类型

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }
}
