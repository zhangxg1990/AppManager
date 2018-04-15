package com.topsec.ti.zxg.utils;

import com.topsec.ti.zxg.support.MultiLevelWare;
import com.topsec.ti.zxg.exception.MagicjcRuntimeException;
import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.collections.CollectionUtils;
import org.springframework.data.domain.Page;

import java.util.*;

/**
 * Created by hx on 16-8-30.
 */

public abstract class DtoUtils {
  public static <T> T copyObject(Class<T> cls, Object src) {
    if (src == null) return null;
    try {
      Object dst = cls.newInstance();
      BeanUtils.copyProperties(dst, src);
      return (T) dst;
    } catch (Exception e) {
      e.printStackTrace();
      throw new MagicjcRuntimeException(e);
    }
  }

  public static <T> T copyObject(T dst, Object src) {
    if (src == null) return null;
    try {
      BeanUtils.copyProperties(dst, src);
      return dst;
    } catch (Exception e) {
      e.printStackTrace();
      throw new MagicjcRuntimeException(e);
    }
  }

  public static <E, T> T copyObject(Class<T> cls, E src, DtoCopyCallBack<E, T> copyCallBack) {
    if (src == null) return null;
    try {
      T dst = cls.newInstance();
      BeanUtils.copyProperties(dst, src);
      copyCallBack.addProperty(src, dst);
      return dst;
    } catch (Exception e) {
      e.printStackTrace();
      throw new MagicjcRuntimeException(e);
    }
  }

  public static <T, E> List<T> copyArray(Class<T> cls, Collection<E> srcArray) {
    List<T> deslist = new ArrayList<>();
    copyCollection(cls, srcArray, deslist);
    return deslist;
  }


  public static <T, E> List<T> copyArray(Class<T> cls, Collection<E> srcArray, DtoCopyCallBack<E, T> copyCallBack) {
    List<T> deslist = new ArrayList<>(srcArray.size());
    copyCollection(cls, srcArray, deslist, copyCallBack);
    return deslist;
  }

  public static <T, E> Set<T> copySet(Class<T> cls, Collection<E> srcArray) {
    Set<T> desSet = new HashSet<>();
    copyCollection(cls, srcArray, desSet);
    return desSet;
  }

  public static <T, E> Set<T> copySet(Class<T> cls, Collection<E> srcArray, DtoCopyCallBack copyCallBack) {
    Set<T> desSet = new HashSet<>();
    copyCollection(cls, srcArray, desSet, copyCallBack);
    return desSet;
  }

  public static <T, E> Page<T> copyPage(Class<T> cls, Page<E> srcArray, DtoCopyCallBack copyCallBack) {
    Page<T> desArray = srcArray.map(new PageConverter<E, T>(cls, copyCallBack));
    return desArray;
  }

  public static <T, E> Page<T> copyPage(Class<T> cls, Page<E> srcArray) {
    Page<T> desArray = srcArray.map(new PageConverter<E, T>(cls, null));
    return desArray;
  }

  public static <T, E> void copyCollection(Class<T> cls, Collection<E> srcArray, Collection<T> desCollection) {
    try {
      if (srcArray == null) return;
      for (E src : srcArray) {
        Object dst = cls.newInstance();
        BeanUtils.copyProperties(dst, src);
        desCollection.add((T) dst);
      }
    } catch (Exception e) {
      e.printStackTrace();
      throw new MagicjcRuntimeException(e);
    }
  }

  public static <T, E> void copyCollection(Class<T> cls, Collection<E> srcArray, Collection<T> deslist, DtoCopyCallBack<E, T> copyCallBack) {
    try {
      if (srcArray == null) return;
      for (E src : srcArray) {
        T dst = cls.newInstance();
        BeanUtils.copyProperties(dst, src);
        copyCallBack.addProperty(src, dst);
        deslist.add(dst);
      }
    } catch (Exception e) {
      e.printStackTrace();
      throw new MagicjcRuntimeException(e);
    }
  }


  public static <T extends MultiLevelWare<T>, E extends MultiLevelWare<E>> T copyObjectRecursion(Class<T> cls, E src, DtoFilter<T, E> dtoFilter) {
    T dto = DtoUtils.copyObject(cls, src);
    if (dto == null || dtoFilter.isFiltered(dto, src)) return null;
    if (CollectionUtils.isNotEmpty(src.getNextLevel())) {
      for (E obj : src.getNextLevel()) {
        T d = copyObjectRecursion(cls, obj,dtoFilter);
        if (d != null) dto.getNextLevel().add(d);
      }
    }
    return dto;
  }

  public static <T extends MultiLevelWare<T>, E extends MultiLevelWare<E>> T copyObjectRecursion(Class<T> cls, E src) {
    T dto = DtoUtils.copyObject(cls, src);
    if (dto == null) return null;
    if (CollectionUtils.isNotEmpty(src.getNextLevel())) {
      for (E obj : src.getNextLevel()) {
        T d = copyObjectRecursion(cls, obj);
        if (d != null) dto.getNextLevel().add(d);
      }
    }
    return dto;
  }



  public interface DtoCopyCallBack<E, T> {
    void addProperty(E src, T des);
  }

  public interface DtoFilter<T, E> {
    boolean isFiltered(T dst, E src);
  }
}
