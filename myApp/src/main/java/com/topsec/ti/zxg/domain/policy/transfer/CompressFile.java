package com.topsec.ti.zxg.domain.policy.transfer;

import com.topsec.ti.zxg.domain.policy.PolicyContent;

/**
 * Created by hx on 17-2-16.
 * 多层压缩文件检测
 */
public class CompressFile extends PolicyContent {
  private Config config;
  private int id;
  private int depth;
  private FileSize filesize;
  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public int getDepth() {

    return depth;
  }

  public void setDepth(int depth) {
    this.depth = depth;
  }

  public FileSize getFilesize() {
    return filesize;
  }

  public void setFilesize(FileSize filesize) {
    this.filesize = filesize;
  }

  public Config getConfig() {

    return config;
  }

  public void setConfig(Config config) {
    this.config = config;

  }

  private class FileSize{
    private int backsize;
    private int dropsize;

    public int getBacksize() {
      return backsize;
    }

    public void setBacksize(int backsize) {
      this.backsize = backsize;
    }

    public int getDropsize() {
      return dropsize;
    }

    public void setDropsize(int dropsize) {
      this.dropsize = dropsize;
    }
  }
  public class Config{
    private String rule_id;
    private FileSize filesize;

    public String getRule_id() {
      return rule_id;
    }

    public void setRule_id(String rule_id) {
      this.rule_id = rule_id;
    }

    public FileSize getFilesize() {
      return filesize;
    }

    public void setFilesize(FileSize filesize) {
      this.filesize = filesize;
    }
  }

}
