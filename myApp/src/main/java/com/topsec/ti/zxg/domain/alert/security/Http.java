package com.topsec.ti.zxg.domain.alert.security;

import javax.persistence.Column;

//HTTP发布涉密信息告警日志
/*@Entity
@Table(name = "http_sm_alert_log")*/
public class Http extends Security{
    //http_sm_alert_log
    @Column
    private String domain;//访问域
    @Column
    private String url;//访问url
    @Column
    private String method;//HTTP请求方法
    @Column
    private int ret_code;//HTTP返回码
    @Column
    private String user_agent;//请求user-agent
    @Column
    private String cookie;//请求的cookie信息
    @Column
    private String server;//服务端的server信息
    @Column
    private String refer;//引用页

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

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

    public int getRet_code() {
        return ret_code;
    }

    public void setRet_code(int ret_code) {
        this.ret_code = ret_code;
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

    public String getServer() {
        return server;
    }

    public void setServer(String server) {
        this.server = server;
    }

    public String getRefer() {
        return refer;
    }

    public void setRefer(String refer) {
        this.refer = refer;
    }
}
