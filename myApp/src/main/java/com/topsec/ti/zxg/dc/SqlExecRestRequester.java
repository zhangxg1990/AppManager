package com.topsec.ti.zxg.dc;

import com.topsec.ti.zxg.config.DataCenterConfigure;
import com.topsec.ti.zxg.utils.GsonUtils;
import com.topsec.tsm.ui.rest.RestClient;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.codec.Base64;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.Properties;


/**
 * Created by hx on 17-2-22.
 */

@Component(value = "sqlExecRestRequester")
public class SqlExecRestRequester implements DataCenterRequester {

  @Autowired
  private DataCenterConfigure dataCenterConfigure;

  private RestClient restClient;

  private ByteRestClient byteRestClient;
  //sql requester
  private RestConfigure sqlExecConfigure;
  //downfile requester
  private RestConfigure downFileExecConfigure;

  private String path = "/v1/tss/query";

  private String downPath = "buckets/12/objects/{device_alert}";

  private String sqlKey = "sql";

  private String scrollIdKey = "scrollId";

  private String sizeKey = "size";

  private Properties headers;


  @PostConstruct
  private void initialize() {
    buildRestClient();
    buildRestConfigure();
    buildDownFileConfigure();
    buildHeaders();
  }

  private void buildDownFileConfigure() {
    if (downFileExecConfigure == null) {
      downFileExecConfigure = new RestConfigure();
    }
    downFileExecConfigure.setDomain(dataCenterConfigure.getBaseUrl());
    downFileExecConfigure.setPath(downPath);
  }

  private void buildHeaders() {
    headers = new Properties();
    StringBuilder value = new StringBuilder();
    value.append("HMAC ").append(dataCenterConfigure.getUsername()).append(":").append("1").append(":").append(dataCenterConfigure.getPassword());
    headers.put("Authorization", value.toString());
  }

  private void buildRestConfigure() {
    if (sqlExecConfigure == null) {
      sqlExecConfigure = new RestConfigure();
    }
    sqlExecConfigure.setDomain(dataCenterConfigure.getBaseUrl());
    sqlExecConfigure.setPath(path);
  }


  private void buildRestClient() {
    restClient = new ByteRestClient();
    byteRestClient = new ByteRestClient();
    restClient.setCharset("UTF-8");
    restClient.setContentType("application/json");
  }

  private String request(String sql) throws IOException {
    RestRequester restRequester = new RestRequester(sqlExecConfigure, restClient);
    restRequester.setHeaders(headers);
    restRequester.addParameter(sqlKey, new String(Base64.encode(sql.getBytes())));
    restRequester.setMethod(RestClient.REQUEST_METHOD_GET);

    //执行sql
    String result = restRequester.request();
    DataWrapperBean dataWrapperBean = GsonUtils.getGson().fromJson(result, DataWrapperBean.class);

    //获取数据
    restRequester.clearParameter();
    restRequester.addParameter(scrollIdKey, dataWrapperBean.getScrollId());

    result = restRequester.request();
    return result;
  }

  @Override
  public DataWrapperBean queryObject(String sql, Type type) {
    String string;
    try {
      string = request(sql);
      return GsonUtils.getGson().fromJson(string, type);
    } catch (IOException e) {
      e.printStackTrace();
      return null;
    }
  }

  @Override
  public DataWrapperBean fetchNextObject(String scrollId, Type type) {
    RestRequester restRequester = new RestRequester(sqlExecConfigure, restClient);
    restRequester.setHeaders(headers);
    restRequester.addParameter(scrollIdKey, scrollId);
    restRequester.setMethod(RestClient.REQUEST_METHOD_GET);
    String result = restRequester.request();
    return GsonUtils.getGson().fromJson(result, type);
  }

  @Override
  public DataWrapperBean queryObject(String datebaseName, String tableName, Type type) {
    return null;
  }

  @Override
  public DataWrapperBean fetchNextObject(String scrollId, String datebaseName, String tableName, Type type) {
    return null;
  }

  @Override
  public byte[] downFile(String id) throws IOException {
    String url = downFileExecConfigure.getUrl();
    url = url.replaceAll("\\{device_alert\\}",id);
    return byteRestClient.get(url,headers);
  }


}
