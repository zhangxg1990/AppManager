package com.topsec.ti.zxg.domain.netaudit;


public class NetProtocol {
    //common
    private String id;
    private String device_id;
    private String sip;
    private int  sport;
    private String smac;
    private String dip;
    private int  dport;
    private String dmac;

    private String protocol;
    private String app;
    private String time;
    private String cap_date;
    private String cap_time;
    private String start_time;
    private String end_time;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDevice_id() {
        return device_id;
    }

    public void setDevice_id(String device_id) {
        this.device_id = device_id;
    }

    public String getSip() {
        return sip;
    }

    public void setSip(String sip) {
        this.sip = sip;
    }

    public int getSport() {
        return sport;
    }

    public void setSport(int sport) {
        this.sport = sport;
    }

    public String getSmac() {
        return smac;
    }

    public void setSmac(String smac) {
        this.smac = smac;
    }

    public String getDip() {
        return dip;
    }

    public void setDip(String dip) {
        this.dip = dip;
    }

    public int getDport() {
        return dport;
    }

    public void setDport(int dport) {
        this.dport = dport;
    }

    public String getDmac() {
        return dmac;
    }

    public void setDmac(String dmac) {
        this.dmac = dmac;
    }

    public String getProtocol() {
        return protocol;
    }

    public void setProtocol(String protocol) {
        this.protocol = protocol;
    }

    public String getApp() {
        return app;
    }

    public void setApp(String app) {
        this.app = app;
    }




    public String getCap_date() {
        return cap_date;
    }

    public void setCap_date(String cap_date) {
        this.cap_date = cap_date;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getStart_time() {
        return start_time;
    }

    public void setStart_time(String start_time) {
        this.start_time = start_time;
    }

    public String getEnd_time() {
        return end_time;
    }

    public void setEnd_time(String end_time) {
        this.end_time = end_time;
    }

    public String getCap_time() {
        return cap_time;
    }

    public void setCap_time(String cap_time) {
        this.cap_time = cap_time;
    }
}