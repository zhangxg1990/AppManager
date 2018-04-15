package com.topsec.ti.zxg.xml;

import com.topsec.ti.zxg.domain.policy.PolicyContent;
import com.topsec.ti.zxg.domain.policy.PolicyType;
import com.topsec.ti.zxg.exception.MagicjcRuntimeException;
import com.topsec.tsm.base.xml.AbstractElementFormater;
import com.topsec.tsm.base.xml.XmlAccessException;
import com.topsec.tsm.base.xml.XmlSerializable;
import com.topsec.tsm.util.StringFormater;
import org.apache.log4j.Logger;
import org.dom4j.Element;

import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * Created by hx on 17-2-16.
 */
public class PolicyTypeFormatter extends AbstractElementFormater implements XmlSerializable {
  public static Logger logger = Logger.getLogger(PolicyTypeFormatter.class);
  public static final String ELEMENT_POLICY_TYPE = "policytype";
  public static final String ATTRIBUTE_NAME = "name";
  public static final String ATTRIBUTE_ALIAS = "alias";
  public static final String ATTRIBUTE_ORDINAL = "ordinal";
  public static final String ATTRIBUTE_CLASS = "class";

  private PolicyType policyType;

  private Map<String,Class<? extends PolicyContent>> policyTypeClasses=new LinkedHashMap<>();

  {
    supportElementNames = new String[]{
            ELEMENT_POLICY_TYPE
    };
  }

  @Override
  public void importObjectFromElement(Element element) throws XmlAccessException {
    if (!canImport(element)) {
      throw new XmlAccessException(StringFormater.format(
              "Can't import object from '{}' element!", element.getName()));
    }
    readPolicyType(null, element);

  }

  private void readPolicyType(PolicyType parent, Element element) throws XmlAccessException {
    PolicyType policyType = new PolicyType();
    if (this.policyType==null){
      this.policyType=policyType;
    }
    policyType.setParent(parent);
    if (parent == null) {
      policyType.setName("root");
      policyType.setAlias("root");
    } else {
      readAttributes(policyType, element);
      if (policyType.getClassName()!=null){
        try {
          policyTypeClasses.put(policyType.getName(), (Class<? extends PolicyContent>) Class.forName(policyType.getClassName()));
        } catch (ClassNotFoundException e) {
          e.printStackTrace();
          throw new MagicjcRuntimeException(e);
        }
      }
    }
    if (parent != null) {
      parent.getPolicyTypes().add(policyType);
    }
    for (Iterator<Element> it = element.elementIterator(); it.hasNext(); ) {
      Element el = it.next();
      if (el.getName().equals(ELEMENT_POLICY_TYPE)) {
        readPolicyType(policyType, el);
      } else {
        logger.warn(StringFormater.format(
                "The {} encounted an invalid element '{}'!", element.getName(), el.getName()));
      }
    }

  }


  private void readAttributes(PolicyType type, Element element) throws XmlAccessException {
    String name = getAttribute(element, ATTRIBUTE_NAME, false);
    String alias = getAttribute(element, ATTRIBUTE_ALIAS, false);
    String className = getAttribute(element, ATTRIBUTE_CLASS, true);
    int ordinal = Integer.valueOf(getAttribute(element, ATTRIBUTE_ORDINAL, false));
    type.setName(name);
    type.setAlias(alias);
    type.setOrdinal(ordinal);
    type.setClassName(className);
  }


  @Override
  public Element exportObjectToElement(Element element) throws XmlAccessException {
    return null;
  }

  public PolicyType getPolicyType() {
    return policyType;
  }

  public Map<String, Class<? extends PolicyContent>> getPolicyTypeClasses() {
    return policyTypeClasses;
  }
}
