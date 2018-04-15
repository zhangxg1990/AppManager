package com.topsec.ti.zxg.domain.alert.security;

import javax.persistence.Column;

//文件传输涉密信息告警日志
/*@Entity
@Table(name = "file_transfer_sm_alert_log")*/
public class FileTranfer extends Security{
    //file_transfer_sm_alert_log
    @Column
    private String account;//FTP账号
    @Column
    private String pwd;//FTP密码
    @Column
    private int trans_dir;//文件传输方向; 发送:1接收:2未知:3

    public String getAccount() {
        return account;
    }

    public void setAccount(String account) {
        this.account = account;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }

    public int getTrans_dir() {
        return trans_dir;
    }

    public void setTrans_dir(int trans_dir) {
        this.trans_dir = trans_dir;
    }
}
