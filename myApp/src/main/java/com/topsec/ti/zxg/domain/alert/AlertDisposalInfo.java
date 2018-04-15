package com.topsec.ti.zxg.domain.alert;

import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.Type;

import javax.persistence.*;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.Date;

@Entity
@Table(name = "ALERT_DISPOSAL_INFO",indexes = {@Index(name = "idx_alert_alert_id",columnList="alert_id")})

public class AlertDisposalInfo implements Serializable{
    private static final long serialVersionUID = 1L;
    @Lob
    @Type(type="org.hibernate.type.StringClobType")
    @Column(name = "alert_decision")
    private String alertDecision;
    @Lob
    @Type(type="org.hibernate.type.StringClobType")
    @Column(name = "disposal_opinion")
    private String disposalOpinion;

    @Column(name = "level")
    private int level = 1;
    @Column(name = "disposal_time")
    private Date disposalTime = new Date();
    @Id
    @Column
    @GenericGenerator(
            name = "UUID",
            strategy = "com.topsec.tsm.base.persistence.support.ResourceUUIDGenerator"
    )
    @GeneratedValue(
            generator = "UUID"
    )
    private String res_id;
    @Column(name = "disposal_person")
    private String disposalPerson;

    @Column(name = "alert_id")
    private String alertId;
    @Column(name = "policy_id")
    private String policyId;

    public String getPolicyId() {
        return policyId;
    }

    public void setPolicyId(String policyId) {
        this.policyId = policyId;
    }

    @Column(nullable = false)
    private AlertEnumType alertType;
    public String getAlertDecision() {
        return alertDecision;
    }

    public void setAlertDecision(String alertDecision) {
        this.alertDecision = alertDecision;
    }

    public String getDisposalOpinion() {
        return disposalOpinion;
    }

    public void setDisposalOpinion(String disposalOpinion) {
        this.disposalOpinion = disposalOpinion;
    }

    public int getLevel() {
        return level;
    }

    public void setLevel(int level) {
        this.level = level;
    }


    public String getDisposalPerson() {
        return disposalPerson;
    }

    public void setDisposalPerson(String disposalPerson) {
        this.disposalPerson = disposalPerson;
    }


    public AlertEnumType getAlertType() {
        return alertType;
    }

    public void setAlertType(String alertType) {
        this.alertType = AlertEnumType.valueOf(alertType);
    }

    public String getAlertId() {
        return alertId;
    }

    public void setAlertId(String alertId) {
        this.alertId = alertId;
    }

    public Date getDisposalTime() {
        return disposalTime;
    }

    public void setDisposalTime(Date disposalTime) {
        this.disposalTime = disposalTime;
    }

    public String getRes_id() {
        return res_id;
    }

    public void setRes_id(String res_id) {
        this.res_id = res_id;
    }
}
