package com.topsec.ti.zxg.support;

import java.util.Collection;

/**
 * Created by hx on 17-2-17.
 */
public interface MultiLevelWare<T> {
  Collection<T> getNextLevel();

}
