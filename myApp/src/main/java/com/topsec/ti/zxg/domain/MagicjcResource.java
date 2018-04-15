package com.topsec.ti.zxg.domain;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.MappedSuperclass;

/**
 * Created by hx on 17-2-16.
 */
@MappedSuperclass
public class MagicjcResource {
  @Id
  @GenericGenerator(
          name = "UUID",
          strategy = "com.topsec.tsm.base.persistence.support.ResourceUUIDGenerator")
  @GeneratedValue(generator = "UUID")
  @Column(name = "RES_ID", length = 24)
  private String id;

  @Column(name = "RES_NAME", nullable = false, length = 128)
  private String name;

  @Column(name = "ALIAS", length = 128)
  private String alias;
  // 资源序号
  @Column(name = "ORDINAL")
  private int ordinal = 0;

  public String getId() {
    return id;
  }

  public void setId(String id) {
    this.id = id;
  }

  public String getName() {
    return name;
  }

  public void setName(String name) {
    this.name = name;
  }

  public String getAlias() {
    return alias;
  }

  public void setAlias(String alias) {
    this.alias = alias;
  }

  public int getOrdinal() {
    return ordinal;
  }

  public void setOrdinal(int ordinal) {
    this.ordinal = ordinal;
  }

  @Override
  public boolean equals(Object obj) {
    // TODO Auto-generated method stub
    if (null == obj)
      return false;
    if (!(obj instanceof MagicjcResource))
      return false;
    else {
      MagicjcResource dst = (MagicjcResource) obj;
      return dst.getId().equals(id);
    }
  }

  /*
   * (non-Javadoc)
   *
   * @see java.lang.Object#hashCode()
   */
  @Override
  public int hashCode() {
    // TODO Auto-generated method stub
    if (id != null)
      return id.hashCode();
    return super.hashCode();
  }

}
