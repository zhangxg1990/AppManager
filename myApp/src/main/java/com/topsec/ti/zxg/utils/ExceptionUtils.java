package com.topsec.ti.zxg.utils;

/**
 * Created by hx on 17-1-8.
 */
public class ExceptionUtils {

  private static final String LINE_SEPARATOR = System.getProperty("line.separator", "\n");

  public static String formatMessage(Throwable throwable) {
    StringBuilder description = new StringBuilder();
    if (throwable != null) {
      if (throwable.getMessage() != null) {
        description.append("错误信息: ");
        description.append(throwable.getMessage());
      }
      Throwable cause = throwable.getCause();
      if (cause != null && cause.getMessage() != null) {
        description.append(LINE_SEPARATOR);
        description.append("原因: ");
        description.append(cause.getMessage());
      }
    }
    return description.toString();
  }
}
