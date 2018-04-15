package com.topsec.ti.zxg.domain.alert.audit;

import com.topsec.ti.zxg.domain.alert.Alert;

import javax.persistence.*;

//域名审计告警日志
/*@Entity
@Table(name = "domain_alert_log")
@Inheritance(strategy= InheritanceType.JOINED)*/
public class Domain extends Alert {
    //domain_alert_log
    @Column
    private String dns;
    @Column
    private String domain_ip;//域名对应ip表

    public String getDns() {
        return dns;
    }

    public void setDns(String dns) {
        this.dns = dns;
    }

    public String getDomain_ip() {
        return domain_ip;
    }

    public void setDomain_ip(String domain_ip) {
        this.domain_ip = domain_ip;
    }
}
