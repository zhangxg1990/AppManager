package com.topsec.ti.zxg.utils;

import java.io.InputStream;

public class DownFileUtils {
    private static final String fileLocation = "/file/";
    public static synchronized InputStream getFileStream(String alert_id){
        //InputStream inputStream = DownFileUtils.class.getResourceAsStream(fileLocation+alert_id);
        InputStream inputStream = DownFileUtils.class.getResourceAsStream(fileLocation+alert_id);
        return inputStream;
    }
}
