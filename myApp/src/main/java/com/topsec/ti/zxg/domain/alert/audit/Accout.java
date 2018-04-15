package com.topsec.ti.zxg.domain.alert.audit;

import com.topsec.ti.zxg.domain.alert.Alert;

import javax.persistence.*;

//帐号审计告警日志
/*@Entity
@Table(name = "account_alert_log")
@Inheritance(strategy= InheritanceType.JOINED)*/
public class Accout extends Alert {
    //account_alert_log
    @Column
    private String sender;//发送人帐号
    @Column
    private String receiver;//接受人帐号列表
    @Column
    private String cc;//抄送人帐号列表
    @Column
    private String bcc;//密抄人帐号列表
    @Column
    private String subject;//邮件主题
    @Column
    private String mail_conent;//邮件内容
    @Column
    private String attachment_names;//附件名列表

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

    public String getCc() {
        return cc;
    }

    public void setCc(String cc) {
        this.cc = cc;
    }

    public String getBcc() {
        return bcc;
    }

    public void setBcc(String bcc) {
        this.bcc = bcc;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMail_conent() {
        return mail_conent;
    }

    public void setMail_conent(String mail_conent) {
        this.mail_conent = mail_conent;
    }

    public String getAttachment_names() {
        return attachment_names;
    }

    public void setAttachment_names(String attachment_names) {
        this.attachment_names = attachment_names;
    }
}