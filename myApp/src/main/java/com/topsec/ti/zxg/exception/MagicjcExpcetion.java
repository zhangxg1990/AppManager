package com.topsec.ti.zxg.exception;

import com.topsec.tsm.base.exception.TsmException;

/**
 * Created by hx on 17-2-9.
 */
public class MagicjcExpcetion extends TsmException {
  public MagicjcExpcetion(String message, Throwable cause) {
    super(message, cause);
  }

  public MagicjcExpcetion(String message) {
    super(message);
  }

  public MagicjcExpcetion(Throwable cause) {
    super(cause);
  }
}
