package com.topsec.ti.zxg.support;

/**
 * Created by hx on 16-10-5.
 */
public class BitFieldHelper {
  private int length = Long.SIZE;
  private long mask = 0xFFFFFFFFFFFFFFFFl;
  private long sectionMask = 0x1l;
  private int sectionBitCount = 1;

  public BitFieldHelper(int length, int sectionBitCount) {
    if (length <= 0 || sectionBitCount <= 0) throw new IllegalArgumentException("参数不正确");
    if ((length % sectionBitCount) != 0) throw new IllegalArgumentException("数值长度与区间长度不匹配");
    this.length = length;
    this.sectionBitCount = sectionBitCount;
    this.sectionMask = calcMask(sectionBitCount);
    this.mask = calcMask(length);
  }

  public long calcMask(int sectionBitNum) {
    long l = 1;
    for (int i = 1; i < sectionBitNum; i++) {
      l = l | (1 << i);
    }
    return l;
  }

  public BitFieldHelper() {
  }

  public long getSectionValue(long sign, int section) {
    if (section < 0 || section * sectionBitCount > length - sectionBitCount) {
      throw new IllegalArgumentException("bit is invalid!");
    }
    long data = sign >> (section * sectionBitCount);
    return data & sectionMask;
  }


  public long setSectionValue(long sign, int section, long value) {
    if (section < 0 || section * sectionBitCount > length - sectionBitCount) {
      throw new IllegalArgumentException("bit is invalid!");
    }
    if (value>sectionMask)throw new IllegalArgumentException("数值过大!");
    long data = (value & sectionMask) << (section * sectionBitCount);      //0001000
    long medium = mask ^ (sectionMask << (section * sectionBitCount));    //1110111
    sign = sign & medium;   //XXX0XXX
    return sign | data;
  }


}
