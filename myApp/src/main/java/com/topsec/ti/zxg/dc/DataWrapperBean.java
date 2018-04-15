package com.topsec.ti.zxg.dc;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by hx on 17-2-27.
 */
public class DataWrapperBean<T> {
  //{"scroll":"1m","scrollId":"67874332-fca0-4e86-84ae-e559406657bc","hasMore":true,"data":null}
  private String scroll;
  private String scrollId;
  private boolean hasMore;
  private List<T> data=new ArrayList<>();

  public String getScroll() {
    return scroll;
  }

  public void setScroll(String scroll) {
    this.scroll = scroll;
  }

  public String getScrollId() {
    return scrollId;
  }

  public void setScrollId(String scrollId) {
    this.scrollId = scrollId;
  }


  public boolean isHasMore() {
    return hasMore;
  }

  public void setHasMore(boolean hasMore) {
    this.hasMore = hasMore;
  }

  public List<T> getData() {
    return data;
  }

  public void setData(List<T> data) {
    this.data = data;
  }
}
