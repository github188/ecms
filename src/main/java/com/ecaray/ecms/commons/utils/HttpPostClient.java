package com.ecaray.ecms.commons.utils;


import com.alibaba.fastjson.JSONObject;
import org.apache.http.HttpResponse;
import org.apache.http.HttpStatus;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClientBuilder;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * com.ecaray.imspmo.commons.utils
 * Author ：zhxy
 * 2017/4/5 1:27
 * 说明：这个性能略低啊 TODO
 */
public class HttpPostClient {
    public static Logger log  = LoggerFactory.getLogger(HttpPostClient.class);
    public static JSONObject doPost(String url,String token ,JSONObject json){

        CloseableHttpClient httpclient = HttpClientBuilder.create().build();
        HttpPost post = new HttpPost(url);
        JSONObject response = null;
        try {
            post.setHeader("authorization",token);
            StringEntity s = new StringEntity(json.toString());
            s.setContentEncoding("UTF-8");
            s.setContentType("application/json");//发送json数据需要设置contentType
            post.setEntity(s);
            HttpResponse res = httpclient.execute(post);
            if(res.getStatusLine().getStatusCode() == HttpStatus.SC_OK){
                String result = EntityUtils.toString(res.getEntity());// 返回json格式：
                response = JSONObject.parseObject(result);
            }
        } catch (Exception e) {
            log.info("url:"+url);
            throw new RuntimeException(e);
        }
        return response;
    }
}
