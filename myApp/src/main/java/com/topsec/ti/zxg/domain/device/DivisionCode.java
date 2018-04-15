package com.topsec.ti.zxg.domain.device;

import java.util.List;

public class DivisionCode {
    private int code;
    private String area;
    public int getCode() {
        return code;
    }

    public void setCode(int code) {
        this.code = code;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }
    static class DivisionCodePage {
        DivisionCodePage[] pages;
        List<DivisionCode>[] ipLocations;
    }
}
