package com.topsec.ti.zxg.domain.policy.transfer;

import com.topsec.ti.zxg.domain.policy.PolicyContent;

/**
 * Created by hx on 17-2-16.
 * 加密文件检测
 */
public class EncryptionFile  extends PolicyContent {
  private int id;
  private FileSize filesize;
  private Config config;
  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public FileSize getFileSize() {
    return filesize;
  }

  public void setFileSize(FileSize fileSize) {
    this.filesize = fileSize;
  }

  public Config getConfig() {
    return config;
  }

  public void setConfig(Config config) {
    this.config = config;
  }

  private class FileSize {
    private int minsize;
    private int maxsize;

    public int getMinsize() {
      return minsize;
    }

    public void setMinsize(int minsize) {
      this.minsize = minsize;
    }

    public int getMaxsize() {
      return maxsize;
    }

    public void setMaxsize(int maxsize) {
      this.maxsize = maxsize;
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
