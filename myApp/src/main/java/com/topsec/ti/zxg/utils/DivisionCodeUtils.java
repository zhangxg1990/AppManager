package com.topsec.ti.zxg.utils;

import com.topsec.ti.zxg.MagicjcConstants;
import com.topsec.ti.zxg.domain.device.DivisionCode;
import org.apache.commons.collections.map.HashedMap;
import java.io.*;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

public class DivisionCodeUtils {
    public static Map<Integer,List<DivisionCode>> divisionCodeMap = new HashedMap();
    public static void loadDivisionCode(){
        //File file = new File("/home/spark/文档/divisionCode");
        File file = new File(WebPathUtils.getWebAppRootPath(), MagicjcConstants.DIVISION_CODE_TYPE_CONFIG_FILE);
        BufferedReader bufferedReader = null;
        try {
            bufferedReader = new BufferedReader(new FileReader(file));
            String line = null;
            while ((line=bufferedReader.readLine())!=null){
                //line=line.replaceAll("　|\\u00A0", " ");
                String[] arr = line.split("=");
                int code = Integer.parseInt(arr[0]);
                int profixCode = code / 10000;
                DivisionCode divisionCode = new DivisionCode();
                divisionCode.setCode(code);
                divisionCode.setArea(arr[1]);
                List<DivisionCode> divisionCodeList = null;
                if((divisionCodeList=divisionCodeMap.get(profixCode))==null){
                    divisionCodeList = new ArrayList<>();
                    divisionCodeList.add(divisionCode);
                    divisionCodeMap.put(profixCode,divisionCodeList);
                }
                else {
                    divisionCodeList.add(divisionCode);
                }
            }
        } catch (IOException e) {
            e.printStackTrace();
        }finally {
            if(null!=bufferedReader)
                try {
                    bufferedReader.close();
                } catch (IOException e) {
                    e.printStackTrace();
                }
        }
    }
    public static String findAreaByCode(int code){
        int profixCode = code/10000;
        List<DivisionCode> divisionCodes = divisionCodeMap.get(profixCode);
        if(divisionCodes!=null){
            for(DivisionCode divisionCode:divisionCodes){
                if(code==divisionCode.getCode())
                    return divisionCode.getArea();
            }
        }
        return null;
    }
    public static void main(String args[]){
        loadDivisionCode();
        long startTime = new Date().getTime();
        for(int i =0;i<10000;i++) {
            String ccc = findAreaByCode(620103);
        }
        long end = new Date().getTime();
        System.out.println(end-startTime);
    }
}
