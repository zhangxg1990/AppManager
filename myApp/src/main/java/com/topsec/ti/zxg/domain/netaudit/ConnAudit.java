package com.topsec.ti.zxg.domain.netaudit;

/**
 * Created by hx on 17-2-10.
 */
public class ConnAudit extends NetProtocol {

  //connaudit
  private String tcp_flag;
  private int in_bytes;
  private int out_bytes;
  private int in_pkts;
  private int out_pkts;
  private String start_time;
  private String end_time;
  private String start_date;

  public String getTcp_flag() {
    return tcp_flag;
  }

  public void setTcp_flag(String tcp_flag) {
    this.tcp_flag = tcp_flag;
  }

  public int getIn_bytes() {
    return in_bytes;
  }

  public void setIn_bytes(int in_bytes) {
    this.in_bytes = in_bytes;
  }

  public int getOut_bytes() {
    return out_bytes;
  }

  public void setOut_bytes(int out_bytes) {
    this.out_bytes = out_bytes;
  }

  public int getIn_pkts() {
    return in_pkts;
  }

  public void setIn_pkts(int in_pkts) {
    this.in_pkts = in_pkts;
  }

  public int getOut_pkts() {
    return out_pkts;
  }

  public void setOut_pkts(int out_pkts) {
    this.out_pkts = out_pkts;
  }



  public String getStart_date() {
    return start_date;
  }

  public void setStart_date(String start_date) {
    this.start_date = start_date;
  }


  public String getStart_time() {
    return start_time;
  }

  public void setStart_time(String start_time) {
    this.start_time = start_time;
  }

  public String getEnd_time() {
    return end_time;
  }

  public void setEnd_time(String end_time) {
    this.end_time = end_time;
  }
}