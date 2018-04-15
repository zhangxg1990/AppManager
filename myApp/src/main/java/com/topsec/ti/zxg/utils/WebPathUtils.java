package com.topsec.ti.zxg.utils;

/**
 * Created by hx on 17-2-18.
 */
public class WebPathUtils {
  public static String webAppRootPath = null;

  public static synchronized String getWebAppRootPath() {
    if (webAppRootPath != null) return webAppRootPath;
    webAppRootPath = WebPathUtils.class.getClassLoader().getResource("/").getPath();
    int index = webAppRootPath.indexOf("WEB-INF");
    if (index < 0) return null;
    webAppRootPath = webAppRootPath.substring(0, index);
    return webAppRootPath;
  }
}
