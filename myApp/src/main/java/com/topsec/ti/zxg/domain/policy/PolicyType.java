package com.topsec.ti.zxg.domain.policy;

import com.topsec.ti.zxg.domain.MagicjcResource;
import com.topsec.ti.zxg.support.MultiLevelWare;

import javax.persistence.*;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

/**
 * Created by hx on 17-2-16.
 */
@Entity
@Table(name = "MCJC_POLICY_TYPE")
@Inheritance(strategy = InheritanceType.JOINED)
public class PolicyType extends MagicjcResource implements MultiLevelWare<PolicyType> {
  private static final long serialVersionUID = 3176972128965536016L;
  @OneToMany(cascade=CascadeType.ALL,mappedBy = "parent")
  private Set<PolicyType> policyTypes=new HashSet<>();
  @ManyToOne()
  @JoinColumn(name="parent_id")
  private PolicyType parent;
  @Column(name="class_name")
  private String className;

  public Set<PolicyType> getPolicyTypes() {
    return policyTypes;
  }

  public void setPolicyTypes(Set<PolicyType> policyTypes) {
    this.policyTypes = policyTypes;
  }

  public PolicyType getParent() {
    return parent;
  }

  public void setParent(PolicyType parent) {
    this.parent = parent;
  }

  @Override
  public Collection<PolicyType> getNextLevel() {
    return policyTypes;
  }

  public String getClassName() {
    return className;
  }

  public void setClassName(String className) {
    this.className = className;
  }
}
