package com.topsec.ti.zxg.domain;

import javax.persistence.*;

@Entity
@Table(name = "mcjc_ip_locate")

public class Iplocate {
    @Id
    @Column
    private String id;
    @Column(name = "src_ip")
    private String sip;
    @Column(name = "des_ip")
    private String dip;
    @Column(name = "src_longtitude")
    private String srcLongtitude;
    @Column(name = "src_latitude")
    private String srcLatitude;
    @Column(name = "des_longtitude")
    private String desLongtitude;
    @Column(name = "des_latitude")
    private String desLatitude;
    @Column(name = "src_total")
    private String srcTotal;
    @Column(name = "des_total")
    private String desTotal;



    public String getSip() {
        return sip;
    }

    public void setSip(String sip) {
        this.sip = sip;
    }

    public String getDip() {
        return dip;
    }

    public void setDip(String dip) {
        this.dip = dip;
    }

    public String getDesTotal() {
        return desTotal;
    }

    public void setDesTotal(String desTotal) {
        this.desTotal = desTotal;
    }

    public String getSrcLongtitude() {
        return srcLongtitude;
    }

    public void setSrcLongtitude(String srcLongtitude) {
        this.srcLongtitude = srcLongtitude;
    }

    public String getSrcLatitude() {
        return srcLatitude;
    }

    public void setSrcLatitude(String srcLatitude) {
        this.srcLatitude = srcLatitude;
    }

    public String getDesLongtitude() {
        return desLongtitude;
    }

    public void setDesLongtitude(String desLongtitude) {
        this.desLongtitude = desLongtitude;
    }

    public String getDesLatitude() {
        return desLatitude;
    }

    public void setDesLatitude(String desLatitude) {
        this.desLatitude = desLatitude;
    }

    public String getSrcTotal() {
        return srcTotal;
    }

    public void setSrcTotal(String srcTotal) {
        this.srcTotal = srcTotal;
    }


    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
