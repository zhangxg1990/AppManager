package com.topsec.ti.zxg.utils;

import org.junit.Test;

/**
 * Created by hx on 17-2-22.
 */
public class MD5UtilTest {
  @Test
  public void getMD5() throws Exception {
    System.out.println(MD5Util.getMD5("admin"));
    Thread t = new Thread(new Runnable() {
      @Override
      public void run() {
        MD5Util.getMD5("admin");
        MD5Util.getMD5("admin");
      }
    });
        t.start();

  }

}
