package com.topsec.ti.zxg.domain.policy;



import org.hibernate.annotations.Type;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * Created by hx on 17-2-15.
 * //策略信息
 */
@MappedSuperclass
/*@Entity
@Table(name = "POLICY_INFO")
@Inheritance(strategy = InheritanceType.JOINED)
@IdClass(PolicyInfo.ComposeIdPK.class)*/
public class PolicyInfo {

  private static final long serialVersionUID = 317697212896553601L;

  @Id
  @Column
  private String device_id;

  @Id
  @Column
  private Long policy_id;
//  @Id
//  private ComposeIdPK composeIdPK;
  @Column
  private int level_class;
  @Column
  private String policy_type;
  @Column
  private long policy_version;

  @Column
  @Lob
  @Type(type="org.hibernate.type.StringClobType")
  private String policy_content;
//
//  public ComposeIdPK getComposeIdPK() {
//    return composeIdPK;
//  }

//  public void setComposeIdPK(ComposeIdPK composeIdPK) {
//    this.composeIdPK = composeIdPK;
//  }


  public String getDevice_id() {
    return device_id;
  }

  public void setDevice_id(String device_id) {
    this.device_id = device_id;
  }

  public Long getPolicy_id() {
    return policy_id;
  }

  public void setPolicy_id(Long policy_id) {
    this.policy_id = policy_id;
  }

  public int getLevel_class() {
    return level_class;
  }

  public void setLevel_class(int level_class) {
    this.level_class = level_class;
  }

  public String getPolicy_type() {
    return policy_type;
  }

  public void setPolicy_type(String policy_type) {
    this.policy_type = policy_type;
  }

  public long getPolicy_version() {
    return policy_version;
  }

  public void setPolicy_version(long policy_version) {
    this.policy_version = policy_version;
  }

  public String getPolicy_content() {
    return policy_content;
  }

  public void setPolicy_content(String policy_content) {
    this.policy_content = policy_content;
  }

  @Embeddable
  public  static class ComposeIdPK implements Serializable {
    private static final long serialVersionUID = 3176972128965536016L;

    @Column
    private String device_id;

    @Column
    private Long policy_id;

    public ComposeIdPK() {
    }

    public ComposeIdPK(String device_id,Long policy_id) {
      this.device_id = device_id;
      this.policy_id = policy_id;
    }

    public String getDevice_id() {
      return device_id;
    }

    public void setDevice_id(String device_id) {
      this.device_id = device_id;
    }

    public Long getPolicy_id() {
      return policy_id;
    }

    public void setPolicy_id(Long policy_id) {
      this.policy_id = policy_id;
    }

    @Override
    public boolean equals(Object o) {
      if (this == o) return true;
      if (o == null || getClass() != o.getClass()) return false;
      ComposeIdPK that = (ComposeIdPK) o;
      return  Objects.equals(device_id, that.device_id) &&
              Objects.equals(policy_id, that.policy_id);
    }

    @Override
    public int hashCode() {
      int result = 1;
      result = 31 * result + (device_id == null ? 0 : device_id.hashCode());
      result = 31 * result + (policy_id == null ? 0 : policy_id.hashCode());
      return result;
    }
  }

  @Override
  public boolean equals(Object o) {
    if (this == o) return true;
    if (o == null || getClass() != o.getClass()) return false;
    PolicyInfo that = (PolicyInfo) o;
    return Objects.equals(device_id, that.device_id) &&
            Objects.equals(policy_id, that.policy_id);
  }

  @Override
  public int hashCode() {
    return Objects.hash(device_id, policy_id);
  }
}
