package com.topsec.ti.zxg.support;

import org.junit.Test;

/**
 * Created by hx on 17-2-20.
 */
public class BitFieldHelperTest {
  BitFieldHelper bitFieldHelper = new BitFieldHelper(64,16);

  @Test
  public void test(){
    Long a = 0x0001000000000000l;//一级下发
    Long b = 0x0000000100000000l;//二级下发
    Long c = 0x0000000000010000l;//三级下发
    Long d = 0x0001000100000000l;//一,二级下发

    System.out.println(a);
    System.out.println(b);
    System.out.println(c);
    System.out.println(d);
  }

}
