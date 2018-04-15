package com.topsec.ti.zxg.dc;

import com.topsec.tsm.ui.rest.RestClient;
import org.apache.commons.collections.map.HashedMap;
import org.apache.commons.lang.Validate;

import java.io.IOException;
import java.util.Map;
import java.util.Properties;

/**
 * Created by hx on 17-2-28.
 */
public class RestRequester {
  private Properties headers = new Properties();
  private Map<String, Object> parameters = new HashedMap();
  private RestConfigure restConfigure;
  private RestClient restClient;
  private String body;
  private String method;


  public RestRequester(RestConfigure restConfigure, RestClient restClient) {
    Validate.notNull(restConfigure);
    Validate.notNull(restClient);
    this.restConfigure = restConfigure;
    this.restClient = restClient;
  }

  public String getBody() {
    return body;
  }

  public void setBody(String body) {
    this.body = body;
  }

  public String request() {
    StringBuilder url = new StringBuilder(restConfigure.getUrl());
    for (String key : parameters.keySet()) {
      url.append("?").append(key).append("=").append(parameters.get(key));
    }
    try {
      String result = restClient.request(method, url.toString(), body, headers);
      return result;
    } catch (IOException e) {
      e.printStackTrace();
      return null;
    }
  }


  public void setMethod(String method) {
    this.method = method;
  }

  public void addParameter(String key, String value) {
    parameters.put(key, value);
  }

  public void removeParameter(String key) {
    parameters.remove(key);
  }

  public void clearParameter() {
    parameters.clear();
  }

  public void addHeader(String key, String value) {
    headers.put(key, value);
  }

  public void removeHeader(String key) {
    headers.remove(key);
  }

  public void clearHeader() {
    headers.clear();
  }


  public void setHeaders(Properties headers) {
    if (headers != null)
      this.headers = headers;
    else {
      this.headers = new Properties();
    }
  }
}
