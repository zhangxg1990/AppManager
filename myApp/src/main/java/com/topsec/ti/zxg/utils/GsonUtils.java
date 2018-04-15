package com.topsec.ti.zxg.utils;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;

/**
 * Created by hx on 17-2-14.
 */
public class GsonUtils {

  public static Gson gson =  new GsonBuilder().setPrettyPrinting().setDateFormat("yyyy-MM-dd HH:mm:ss").create();

  public static  Gson getGson(){
    return gson;
  }

}
