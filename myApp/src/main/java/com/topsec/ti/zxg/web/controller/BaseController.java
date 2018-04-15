package com.topsec.ti.zxg.web.controller;

import com.topsec.ti.zxg.utils.ExceptionUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;


public class BaseController {

  @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
  @ExceptionHandler(Throwable.class)
  public final
  @ResponseBody
  ErrorInfo baseExceptionHander(HttpServletRequest req, Throwable throwable) {
    throwable.printStackTrace();
    return new ErrorInfo(HttpStatus.INTERNAL_SERVER_ERROR.value(), throwable.getClass().getName(), ExceptionUtils.formatMessage(throwable), new Date());
  }

  protected final <T> ResponseEntity<T> ok(T object) {
    return new ResponseEntity<>(object, HttpStatus.MULTI_STATUS.OK);
  }

  protected final ResponseEntity<Void> v() {
    return new ResponseEntity<>(new HttpHeaders(), HttpStatus.MULTI_STATUS.OK);
  }

  public  static class ErrorInfo {
    public int code;
    public String message;
    public String exception;
    public Date date;

    public ErrorInfo(int code, String exception, String message, Date date) {
      this.code = code;
      this.exception = exception;
      this.message = message;
      this.date = date;
    }
  }
}
