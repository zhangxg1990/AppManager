package com.topsec.ti.zxg.domain.policy.transfer;

import com.topsec.ti.zxg.domain.policy.PolicyContent;

/**
 * Created by hx on 17-2-16.
 * 图文文件
 */
public class PictureFile extends PolicyContent {
  private int id;
  private FileSize fileSize;
  private Resolution resolution;

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public FileSize getFileSize() {
    return fileSize;
  }

  public void setFileSize(FileSize fileSize) {
    this.fileSize = fileSize;
  }

  public Resolution getResolution() {
    return resolution;
  }

  public void setResolution(Resolution resolution) {
    this.resolution = resolution;
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

  private class Resolution {
    private FileSize x;
    private FileSize y;

    public FileSize getX() {
      return x;
    }

    public void setX(FileSize x) {
      this.x = x;
    }

    public FileSize getY() {
      return y;
    }

    public void setY(FileSize y) {
      this.y = y;
    }
  }

}
