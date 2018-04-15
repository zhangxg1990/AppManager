package com.topsec.ti.zxg.domain.alert.security;

import javax.persistence.Column;

//即时通信涉密信息告警日志
/*@Entity
@Table(name = "im_sm_alert_log")*/
public class IM extends Security {
    //im_sm_alert_log
    @Column
    private String account;//Im账户
    @Column
    private String msg_content;//聊天内容

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getMsg_content() {
        return msg_content;
    }

    public void setMsg_content(String msg_content) {
        this.msg_content = msg_content;
    }
}
