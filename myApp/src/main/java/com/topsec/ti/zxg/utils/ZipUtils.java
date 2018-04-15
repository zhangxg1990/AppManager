package com.topsec.ti.zxg.utils;

import com.topsec.ti.zxg.domain.alert.AlertFile;

import java.io.IOException;
import java.util.List;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;

public class ZipUtils {
    public static void zipFile(List<AlertFile> alertFiles, ZipOutputStream zipOutputStream) throws IOException {
       for(AlertFile alertFile : alertFiles){
           zipFile(alertFile.getFile_name(),alertFile.getData(),zipOutputStream);
       }
       //zipOutputStream.finish();
       zipOutputStream.close();
    }
    private static void zipFile(String fileName,byte[] bytes,ZipOutputStream zipOutputStream) {
        try {
            zipOutputStream.putNextEntry(new ZipEntry(fileName));
            zipOutputStream.write(bytes);
            zipOutputStream.closeEntry();
        }catch (IOException e){
            e.printStackTrace();
        }
    }
}
