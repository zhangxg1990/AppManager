package com.topsec.ti.zxg.exception;

import com.topsec.tsm.base.exception.TsmRuntimeException;

/**
 * Created by hx on 17-2-9.
 */
public class MagicjcRuntimeException extends TsmRuntimeException {
  public MagicjcRuntimeException(String message, Throwable cause) {
    super(message, cause);
  }

  public MagicjcRuntimeException(String message) {
    super(message);
  }

  public MagicjcRuntimeException(Throwable cause) {
    super(cause);
  }
}
