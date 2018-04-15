package com.topsec.ti.zxg.domain.netaudit;

/**
 * Created by hx on 17-2-10.
 */
public class FileTransfer extends NetProtocol {
    //file
    private String filename;
    private String filesize;

    public String getFilename() {
        return filename;
    }

    public void setFilename(String filename) {
        this.filename = filename;
    }

    public String getFilesize() {
        return filesize;
    }

    public void setFilesize(String filesize) {
        this.filesize = filesize;
    }
}