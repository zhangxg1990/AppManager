package com.topsec.ti.zxg.domain.policy.audit.net;

import com.topsec.ti.zxg.domain.policy.PolicyContent;

/**
 * Created by hx on 17-2-16.
 * 通连关系
 */
public class ConnAuditPolicy  extends PolicyContent{
  private int interval;
  private long num;

  public int getInterval() {
    return interval;
  }

  public void setInterval(int interval) {
    this.interval = interval;
  }


  public long getNum() {
    return num;
  }

  public void setNum(long num) {
    this.num = num;
  }
}
