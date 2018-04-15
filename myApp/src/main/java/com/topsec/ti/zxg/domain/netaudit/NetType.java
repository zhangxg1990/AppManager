package com.topsec.ti.zxg.domain.netaudit;

/**
 * Created by hx on 17-2-10.
 */
public enum NetType {
  CONN("net_conn_audit_log"),
  WEB("web_behavior_audit_log"),
  SSL("ssl_behavior_audit_log"),
  MAIL("mail_behavior_audit_log"),
  FILE("file_behavior_audit_log"),
  DNS("dns_behavior_audit_log");

  NetType(String tableName) {
    this.tableName = tableName;
  }

  private String tableName;

  public String getTableName() {
    return tableName;
  }

  public void setTableName(String tableName) {
    this.tableName = tableName;
  }
}