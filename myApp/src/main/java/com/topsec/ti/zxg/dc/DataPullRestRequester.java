package com.topsec.ti.zxg.dc;

import com.topsec.ti.zxg.config.DataCenterConfigure;
import com.topsec.ti.zxg.utils.GsonUtils;
import com.topsec.tsm.ui.rest.RestClient;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.lang.reflect.Type;
import java.util.Properties;

@Component(value = "dataPullRestRequester")
public class DataPullRestRequester implements DataCenterRequester {
    @Autowired
    private DataCenterConfigure dataCenterConfigure;

    private RestClient restClient;

    //sql requester
    private RestConfigure dataPullConfigure;

    private String path = "/v1/tss/databases/?1/tables/?2";

    private String scrollIdKey = "scrollId";

    private Properties headers;


    @PostConstruct
    private void initialize() {
        buildRestClient();
        buildRestConfigure();
        buildHeaders();
    }

    private void buildHeaders() {
        headers = new Properties();
        StringBuilder value = new StringBuilder();
        value.append("HMAC ").append(dataCenterConfigure.getUsername()).append(":").append("1").append(":").append(dataCenterConfigure.getPassword());
        headers.put("Authorization", value.toString());
    }

    private void buildRestConfigure() {
        if (dataPullConfigure == null) {
            dataPullConfigure = new RestConfigure();
        }
        dataPullConfigure.setDomain(dataCenterConfigure.getDatapullUrl());
    }


    private void buildRestClient() {
        restClient = new RestClient();
        restClient.setCharset("UTF-8");
        restClient.setContentType("application/json");
    }



    @Override
    public DataWrapperBean queryObject(String sql, Type type) {
        return null;
    }

    @Override
    public DataWrapperBean fetchNextObject(String scrollId, Type type) {
        return null;
    }

    @Override
    public DataWrapperBean queryObject(String datebaseName, String tableName, Type type) {
        path = path.replaceAll("$",datebaseName).replaceAll("$",tableName);
        dataPullConfigure.setPath(path);
        RestRequester restRequester = new RestRequester(dataPullConfigure, restClient);
        restRequester.setHeaders(headers);
        restRequester.setMethod(RestClient.REQUEST_METHOD_GET);
        String result = restRequester.request();
        return GsonUtils.getGson().fromJson(result, type);
    }

    @Override
    public DataWrapperBean fetchNextObject(String scrollId,String datebaseName,String tableName, Type type) {
        path = path.replaceAll("\\?1",datebaseName).replaceAll("\\?2",tableName);
        dataPullConfigure.setPath(path);
        RestRequester restRequester = new RestRequester(dataPullConfigure, restClient);
        restRequester.setHeaders(headers);
        restRequester.addParameter(scrollIdKey,scrollId);
        restRequester.setMethod(RestClient.REQUEST_METHOD_GET);
        String result = restRequester.request();
        if(result==null)
            return null;
        return GsonUtils.getGson().fromJson(result, type);
    }

    @Override
    public byte[] downFile(String id) throws IOException {
        return new byte[0];
    }
}
