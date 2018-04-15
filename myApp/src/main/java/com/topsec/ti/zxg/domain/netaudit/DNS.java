package com.topsec.ti.zxg.domain.netaudit;

/**
 * Created by hx on 17-2-10.
 */
public class DNS extends NetProtocol {
    //dns
    private String request;
    private String reponse;
    public String getRequest() {
        return request;
    }

    public void setRequest(String request) {
        this.request = request;
    }

    public String getReponse() {
        return reponse;
    }

    public void setReponse(String reponse) {
        this.reponse = reponse;
    }


}