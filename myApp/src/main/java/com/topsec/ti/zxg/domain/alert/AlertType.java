package com.topsec.ti.zxg.domain.alert;

import com.topsec.ti.zxg.domain.MagicjcResource;
import com.topsec.ti.zxg.support.MultiLevelWare;

import javax.persistence.*;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;


@Entity
@Table(name = "MCJC_ALERT_TYPE")
@Inheritance(strategy = InheritanceType.JOINED)
public class AlertType extends MagicjcResource implements MultiLevelWare<AlertType> {
    private static final long serialVersionUID = 3176972128965536016L;
    @OneToMany(cascade=CascadeType.ALL,mappedBy = "parent")
    private Set<AlertType> alertTypes=new HashSet<>();
    @ManyToOne()
    @JoinColumn(name="parent_id")
    private AlertType parent;
    @Column(name = "class_name")
    private String className;



    public AlertType getParent() {
        return parent;
    }

    public void setParent(AlertType parent) {
        this.parent = parent;
    }

    @Override
    public Collection<AlertType> getNextLevel() {
        return alertTypes;
    }

    public String getClassName() {
        return className;
    }

    public void setClassName(String className) {
        this.className = className;
    }

    public Set<AlertType> getAlertTypes() {
        return alertTypes;
    }

    public void setAlertTypes(Set<AlertType> alertTypes) {
        this.alertTypes = alertTypes;
    }
}
