package com.topsec.ti.zxg.domain.alert;

public enum AlertEnumType {
    TROJANATTACK("trojan_attack_alert_log"),//1.4.1 木马攻击窃密告警日志
    EXPLOITATTACK("exploit_attack_alert_log"),//1.4.2 漏洞利用窃密攻击告警日志
    MALWAREATTACK("malware_attack_alert_log"),//1.4.3 恶意程序窃密攻击告警日志
    OTHERATTACK("other_attack_alert_log"),//1.4.4 其他攻击窃密检测告警日志
    ABNORMALATTACK("abnormal_attack_alert_log"),//1.5 未知攻击窃密告警日志
    IP("ip_alert_log"),//1.6.1 IP审计告警日志
    DOMAIN("domain_alert_log"),//1.6.2 域名审计告警日志
    URL("url_alert_log"),//1.6.3 URL审计告警日志
    ACCOUT("account_alert_log"),//1.6.4 帐号审计告警日志
    EMAIL("email_sm_alert_log"),//1.3.1 电子邮件涉密信息告警日志
    IM("im_sm_alert_log"),//1.3.2 即时通信涉密信息告警日志
    FILETRANFER("file_transfer_sm_alert_log"),//1.3.3 文件传输涉密信息告警日志
    HTTP("http_sm_alert_log"),//1.3.4 HTTP发布涉密信息告警日志
    NETDISK("netdisk_sm_alert_log"),//1.3.5 网盘涉密信息告警日志
    OTHERSECURITY("other_sm_alert_log");//1.3.6 其它涉密信息告警日志
    AlertEnumType(String tableName) {
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
