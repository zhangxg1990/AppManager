package com.topsec.ti.zxg.domain.alert.security;

import javax.persistence.Column;

//电子邮件涉密信息告警日志
/*@Entity
@Table(name = "email_sm_alert_log")*/
public class Email extends Security {
    //email_sm_alert_log
    @Column
    private String cc;//抄送
    @Column
    private String bcc;//密送
    @Column
    private String subject;//邮件主题
    @Column
    private String domain;//邮件提供商名
    @Column
    private String rcpt_to;//认证过程中RCPT TO命令提交的邮件接收者
    @Column
    private String mail_from;//认证过程中MAIL FROM命令提交的邮件发送者
    @Column
    private String ip;

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

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    public String getRcpt_to() {
        return rcpt_to;
    }

    public void setRcpt_to(String rcpt_to) {
        this.rcpt_to = rcpt_to;
    }

    public String getIp() {
        return ip;
    }

    public void setIp(String ip) {
        this.ip = ip;
    }

    public String getMail_from() {
        return mail_from;
    }

    public void setMail_from(String mail_from) {
        this.mail_from = mail_from;
    }
}
