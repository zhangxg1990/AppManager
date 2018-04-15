package com.topsec.ti.zxg.domain.device;

public enum DeviceType {
    DETECTOR(1),CENTER(2);
    DeviceType(int val){this.val = val;}
    private int val;

    public int getVal() {
        return val;
    }

    public void setVal(int val) {
        this.val = val;
    }
}
