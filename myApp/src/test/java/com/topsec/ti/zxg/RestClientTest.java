package com.topsec.ti.zxg;

import com.topsec.tsm.ui.rest.RestClient;
import org.junit.Test;

import java.io.IOException;
import java.util.Properties;

/**
 * Created by hx on 17-2-27.
 */
public class RestClientTest {

  @Test
  public void test() throws IOException {


    byte[] bytes = org.apache.commons.codec.binary.Base64.decodeBase64("c2VsZWN0ICogZnJvbSBibWouZGV2aWNlX3RvcG9sb2d5X2luZm8K");
    //System.out.println(new String(bytes));

    RestClient restClient = new RestClient();
    restClient.setContentType("application/json");
    Properties properties = new Properties();
    properties.put("Authorization","HMAC admin:1:kN10H7hqdyRhjl8zYzm8-CXcSur8VnxcblImpMUBJow=");
    String sql = "c2hvdyB0YWJsZXMK";
    //String sql = "select * from mcjc_user";
    String requestUrl = "http://localhost:8080/v1/tss/query?sql=" + sql;
    String result=restClient.get(requestUrl,null,properties);
    System.out.println(result);

    //String requestUrl2="http://172.21.2.17:8085/v1/tss/query?scrollId=4c1719a3-b778-4a66-bc9e-7d2680b9199a";


  }
}
