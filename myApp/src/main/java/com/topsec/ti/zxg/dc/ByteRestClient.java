package com.topsec.ti.zxg.dc;

import com.topsec.tsm.ui.rest.RestClient;
import com.topsec.tsm.util.StringFormater;

import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Properties;

public class ByteRestClient extends RestClient {
    public byte[] get(String uri,  Properties requestProperties) throws IOException {
        uri = uri.replaceAll(" ","%20");
        URL url = new URL(uri);
        HttpURLConnection connection = (HttpURLConnection)url.openConnection();
        byte[] bytes;
        try {
            connection.setDoOutput(true);
            connection.setRequestMethod(REQUEST_METHOD_POST);
            //connection.setRequestProperty("accept", super.getContentType());
            connection.setRequestProperty("Content-Type", StringFormater.format("{}; charset={}", new Object[]{super.getContentType(), super.getCharset()}));
            this.fillRequestProperties(connection, requestProperties);
            connection.connect();
            InputStream inputStream = connection.getInputStream();
            bytes = new byte[inputStream.available()];
            inputStream.read(bytes);
            //System.out.println(new String(bytes));
            return bytes;
        } finally {
            connection.disconnect();
        }
    }
}
