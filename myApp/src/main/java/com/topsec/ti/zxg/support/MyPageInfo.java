package com.topsec.ti.zxg.support;

import com.topsec.tsm.ui.page.PageBean;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by hx on 17-2-18.
 * 分页信息包装类
 */

public class MyPageInfo<E> {
  private PageBean page=new PageBean();
  private List<E> result=new ArrayList<>();

  public MyPageInfo() {
  }

  public MyPageInfo(PageBean page, List<E> result) {
    this.page = page;
    this.result = result;
  }

  public List<E> getResult() {
    return result;
  }

  public void setResult(List<E> result) {
    this.result = result;
  }

  public PageBean getPage() {
    return page;
  }

  public void setPage(PageBean page) {
    this.page = page;
  }
}
