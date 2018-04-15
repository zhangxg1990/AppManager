package com.topsec.ti.zxg.domain.alert.audit;

import com.topsec.ti.zxg.domain.alert.Alert;

import javax.persistence.Column;

//URL审计告警日志
/*@Entity
@Table(name = "url_alert_log")*/
public class URL extends Alert {
    //url_alert_log
    @Column
    private String url;//请求URL
    @Column
    private String method;//请求方法
    @Column
    private String user_agent;//请求User Agent信息
    @Column
    private String cookie;//请求Cookie信息
    @Column
    private String ret_code;//返回状态码
    @Column
    private String server;//服务器信息

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public String getUser_agent() {
        return user_agent;
    }

    public void setUser_agent(String user_agent) {
        this.user_agent = user_agent;
    }

    public String getCookie() {
        return cookie;
    }

    public void setCookie(String cookie) {
        this.cookie = cookie;
    }

    public String getRet_code() {
        return ret_code;
    }

    public void setRet_code(String ret_code) {
        this.ret_code = ret_code;
    }

    public String getServer() {
        return server;
    }

    public void setServer(String server) {
        this.server = server;
    }
}
