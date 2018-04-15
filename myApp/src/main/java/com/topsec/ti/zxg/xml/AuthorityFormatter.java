package com.topsec.ti.zxg.xml;


import com.topsec.ti.zxg.domain.ca.Authority;
import com.topsec.ti.zxg.enums.HttpMethod;
import com.topsec.tsm.base.xml.AbstractElementFormater;
import com.topsec.tsm.base.xml.XmlAccessException;
import com.topsec.tsm.base.xml.XmlSerializable;
import com.topsec.tsm.util.StringFormater;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.dom4j.Element;

import java.util.Iterator;
import java.util.LinkedHashSet;

/**
 * Created by hx on 16-11-8.
 */
public class AuthorityFormatter extends AbstractElementFormater implements XmlSerializable {
  public static Logger logger = Logger.getLogger(AuthorityFormatter.class);
  public static final String ELEMENT_AUTHORITIES = "authorities";
  public static final String ELEMENT_AUTHORITY = "authority";
  public static final String ATTRIBUTE_ID = "id";
  public static final String ATTRIBUTE_NAME = "name";
  public static final String ATTRIBUTE_URL = "url";
  public static final String ATTRIBUTE_METHOD = "method";

  private Authority authority;

  {
    supportElementNames = new String[]{
            ELEMENT_AUTHORITIES
    };
  }

  @Override
  public void importObjectFromElement(Element element) throws XmlAccessException {
    if (!canImport(element)) {
      throw new XmlAccessException(StringFormater.format(
              "Can't import object from '{}' element!", element.getName()));
    }
    readAuthorities(element);

  }

  private void readAuthorities(Element element) throws XmlAccessException {
    authority=new Authority();
    authority.setId("0");
    authority.setName("root");
    authority.setParent(null);
    authority.setUrl("/");
    authority.setAuthorities(new LinkedHashSet<Authority>());
    readAuthority(authority,element);


  }

  private void  readAuthority(Authority parent, Element element) throws XmlAccessException {

    //继续读取
    for (Iterator<Element> it = element.elementIterator(); it.hasNext(); ) {
      Element el = it.next();
      if (el.getName().equals(ELEMENT_AUTHORITY)) {
        Authority type = new Authority();
        type.setAuthorities(new LinkedHashSet<Authority>());
        type.setParent(parent);
        readAttributes(type, el);
        if (parent != null) {
          parent.getAuthorities().add(type);
        }
        readAuthority(type, el);
      } else {
        logger.warn(StringFormater.format(
                "The {} encounted an invalid element '{}'!", element.getName(), el.getName()));
      }
    }

  }

  private void readAttributes(Authority type, Element element) throws XmlAccessException {
    String id = getAttribute(element, ATTRIBUTE_ID, false);
    String name = getAttribute(element, ATTRIBUTE_NAME, false);
    String url = getAttribute(element, ATTRIBUTE_URL, false);
    String method = getAttribute(element, ATTRIBUTE_METHOD, true);
    type.setId(id);
    type.setName(name);
    if (type.getParent()!=null && StringUtils.isNotBlank(type.getParent().getUrl()) && !type.getParent().getUrl().equals("/")){
      type.setUrl(StringFormater.format("{}{}",type.getParent().getUrl(),url));
    }else{
      type.setUrl(url);
    }
    if (StringUtils.isNotBlank(method))
      type.setHttpMethod(HttpMethod.valueOf(method));

  }

  @Override
  public Element exportObjectToElement(Element element) throws XmlAccessException {
    return null;
  }

  public Authority getAuthority() {
    return authority;
  }



}
