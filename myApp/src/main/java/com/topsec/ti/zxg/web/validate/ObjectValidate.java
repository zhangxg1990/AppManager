package com.topsec.ti.zxg.web.validate;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.ui.Model;

/**
 * Created by hx on 16-4-24.
 */
public final class ObjectValidate {
  public static final String ISNULL = "400";


  private static Logger logger = LoggerFactory.getLogger(ObjectValidate.class);

  public static boolean checkNull(Model model, Object... obj) {
    if (obj == null || obj.length == 0) {
      model.addAttribute("code", ISNULL);
      model.addAttribute("message", "无效对象!");
      return true;
    }
    for (Object obj1 : obj) {
      if (obj1 == null) {
        model.addAttribute("code", ISNULL);
        model.addAttribute("message", "无效对象!");
        return true;
      }
    }
    return false;
  }

  public static boolean checkNull(String name, Model model, Object... obj) {
    if (obj == null || obj.length == 0) {
      addmodelInfo(name, model);
      return true;
    }
    for (Object obj1 : obj) {
      if (obj1 == null) {
        addmodelInfo(name, model);
        return true;
      }
    }
    return false;
  }


  public static void addmodelInfo(String name, Model model) {
    model.addAttribute("code", ISNULL);
    model.addAttribute("message", "无效" + name);
  }
}
