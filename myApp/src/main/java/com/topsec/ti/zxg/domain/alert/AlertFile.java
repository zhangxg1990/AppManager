package com.topsec.ti.zxg.domain.alert;

public class AlertFile {
    private String file_name;
    private byte[] data;

    public String getFile_name() {
        return file_name;
    }

    public void setFile_name(String file_name) {
        this.file_name = file_name;
    }

    public byte[] getData() {
        return data;
    }

    public void setData(byte[] data) {
        this.data = data;
    }
}
