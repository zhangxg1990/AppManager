package com.topsec.ti.zxg.domain.policy.audit.net;

import com.topsec.ti.zxg.domain.policy.PolicyContent;

/**
 * Created by hx on 17-2-16.
 */
public class AppAuditUploadPolicy  extends PolicyContent{
  private int interval;
  private int num;

  public int getInterval() {
    return interval;
  }

  public void setInterval(int interval) {
    this.interval = interval;
  }

  public int getNum() {
    return num;
  }

  public void setNum(int num) {
    this.num = num;
  }
}
