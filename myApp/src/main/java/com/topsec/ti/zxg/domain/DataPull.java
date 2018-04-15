package com.topsec.ti.zxg.domain;

import javax.persistence.*;

/*
数据拉取,持久化到数据库中.
每次拉取数据根据scrollId来拉取数据
 */
@Entity
@Table(name = "mcjc_DATA_PULL")
public class DataPull {
    @Column(name="scroll_id")
    private String scrollId;
    @Id
    @Column(name="table_name")
    private  String tableName;

    public String getScrollId() {
        return scrollId;
    }

    public void setScrollId(String scrollId) {
        this.scrollId = scrollId;
    }

    public String getTableName() {
        return tableName;
    }

    public void setTableName(String tableName) {
        this.tableName = tableName;
    }
}
