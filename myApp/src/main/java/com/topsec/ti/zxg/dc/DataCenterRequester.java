package com.topsec.ti.zxg.dc;

import java.io.IOException;
import java.lang.reflect.Type;

/**
 * Created by hx on 17-2-27.
 */
public interface DataCenterRequester {

  DataWrapperBean queryObject(String sql, Type type);

  DataWrapperBean fetchNextObject(String scrollId, Type type);

  DataWrapperBean queryObject(String datebaseName, String tableName, Type type);

  DataWrapperBean fetchNextObject(String scrollId, String datebaseName, String tableName, Type type);

  byte[] downFile(String id) throws IOException;
}
