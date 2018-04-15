package com.topsec.ti.zxg.domain.policy;

import com.topsec.ti.zxg.domain.policy.transfer.CompressFile;
import com.topsec.ti.zxg.domain.policy.transfer.EncryptionFile;

/**
 * Created by hx on 17-2-17.
 * 告警详细内容,从json解析
 */
public class PolicyContent {

  private String rule_id;//规则id
  private int risk;//告警级别


  public int getRisk() {
    return risk;
  }

  public void setRisk(int risk) {
    this.risk = risk;
  }

  public String getRule_id() {
    if(this instanceof EncryptionFile){
      EncryptionFile encryptionFile = (EncryptionFile) this;
      if(encryptionFile.getConfig()!=null){
        encryptionFile.setFileSize(encryptionFile.getConfig().getFilesize());
        encryptionFile.setRule_id(encryptionFile.getConfig().getRule_id());
      }
    }
    if(this instanceof CompressFile){
      CompressFile compressFile = (CompressFile) this;
      if(compressFile.getConfig()!=null){
        compressFile.setFilesize(compressFile.getConfig().getFilesize());
        compressFile.setRule_id(compressFile.getConfig().getRule_id());
      }
    }
    return rule_id;
  }

  public void setRule_id(String rule_id) {
    this.rule_id = rule_id;
  }
}
