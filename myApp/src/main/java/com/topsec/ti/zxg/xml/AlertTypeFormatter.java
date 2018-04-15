package com.topsec.ti.zxg.xml;


import com.topsec.ti.zxg.domain.alert.Alert;
import com.topsec.ti.zxg.domain.alert.AlertType;
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
public class AlertTypeFormatter extends AbstractElementFormater implements XmlSerializable {
    public static Logger logger = Logger.getLogger(AlertTypeFormatter.class);
    public static final String ELEMENT_Alert_TYPE = "alerttype";
    public static final String ATTRIBUTE_NAME = "name";
    public static final String ATTRIBUTE_ALIAS = "alias";
    public static final String ATTRIBUTE_ORDINAL = "ordinal";
    public static final String ATTRIBUTE_CLASS = "class";

    private AlertType alertType;

    private Map<String,Class<? extends Alert>> alertTypeClasses=new LinkedHashMap<>();

    {
        supportElementNames = new String[]{
                ELEMENT_Alert_TYPE
        };
    }

    @Override
    public void importObjectFromElement(Element element) throws XmlAccessException {
        if (!canImport(element)) {
            throw new XmlAccessException(StringFormater.format(
                    "Can't import object from '{}' element!", element.getName()));
        }
        readAlertType(null, element);

    }

    private void readAlertType(AlertType parent, Element element) throws XmlAccessException {
        AlertType alertType = new AlertType();
        if (this.alertType==null){
            this.alertType=alertType;
        }
        alertType.setParent(parent);
        if (parent == null) {
            alertType.setName("root");
            alertType.setAlias("root");
        } else {
            readAttributes(alertType, element);
            if (alertType.getClassName()!=null){
                try {
                    alertTypeClasses.put(alertType.getName(), (Class<? extends Alert>) Class.forName(alertType.getClassName()));
                } catch (ClassNotFoundException e) {
                    e.printStackTrace();
                    throw new MagicjcRuntimeException(e);
                }
            }
        }
        if (parent != null) {
            parent.getAlertTypes().add(alertType);
        }
        for (Iterator<Element> it = element.elementIterator(); it.hasNext(); ) {
            Element el = it.next();
            if (el.getName().equals(ELEMENT_Alert_TYPE)) {
                readAlertType(alertType, el);
            } else {
                logger.warn(StringFormater.format(
                        "The {} encounted an invalid element '{}'!", element.getName(), el.getName()));
            }
        }

    }


    private void readAttributes(AlertType type, Element element) throws XmlAccessException {
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

    public AlertType getAlertType() {
        return alertType;
    }

    public Map<String, Class<? extends Alert>> getAlertTypeClasses() {
        return alertTypeClasses;
    }
}
