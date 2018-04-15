package com.topsec.ti.zxg.domain.netaudit;

/**
 * Created by hx on 17-2-10.
 */
public class Mail extends NetProtocol {
    //email
    private String sender;
    private String recver;
    private String cc;
    private String bcc;
    private String subject;
    private String attachment;
    private String domain;
    private String mail_from;
    private String rcpt_to;
    private String ehlo;

    public String getSender() {
        return sender;
    }

    public void setSender(String sender) {
        this.sender = sender;
    }

    public String getRecver() {
        return recver;
    }

    public void setRecver(String recver) {
        this.recver = recver;
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

    public String getAttachment() {
        return attachment;
    }

    public void setAttachment(String attachment) {
        this.attachment = attachment;
    }

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    public String getMail_from() {
        return mail_from;
    }

    public void setMail_from(String mail_from) {
        this.mail_from = mail_from;
    }

    public String getRcpt_to() {
        return rcpt_to;
    }

    public void setRcpt_to(String rcpt_to) {
        this.rcpt_to = rcpt_to;
    }

    public String getEhlo() {
        return ehlo;
    }

    public void setEhlo(String ehlo) {
        this.ehlo = ehlo;
    }
}