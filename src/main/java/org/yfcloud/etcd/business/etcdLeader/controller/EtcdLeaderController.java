package org.yfcloud.etcd.business.etcdLeader.controller;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.io.IOException;

/**
 * Created by Administrator on 2017/12/16 0016.
 */
@Controller
@RequestMapping("/etcd")
public class EtcdLeaderController {

    private static final String url = "http://183.131.7.140:8700/etcd/leader";

    @RequestMapping("/playLeaderIndex")
    public String view() {
        return "etcd/leader";
    }

    @RequestMapping("/getLeader")
    @ResponseBody
    public String getHealthy() {
        //调用健康状态接口
        //List<Etcd> etcdList = new ArrayList<Etcd>();

        HttpClient httpClient = new DefaultHttpClient();
        //指定请求方式
        HttpGet httpGet = new HttpGet( url.toString() );
        //执行请求
        HttpResponse httpResponse = null;
        try {
            httpResponse = httpClient.execute( httpGet );
        } catch (IOException e) {
            e.printStackTrace();
        }
        String result = null;
        //判断请求是否成功
        int status = httpResponse.getStatusLine().getStatusCode();
        if (status == 200) {
            //读取响应内容
            try {
                result = EntityUtils.toString( httpResponse.getEntity(), "UTF-8" );
            } catch (IOException e) {
                e.printStackTrace();
            }
            //json处理
            /*JSONArray jsonArray = JSONArray.fromObject( result );
            for (int i = 0; i < jsonArray.size(); i++) {
                Etcd etcd = new Etcd();
                JSONObject jsonObject = jsonArray.getJSONObject( i );
                etcd.setNodeName( jsonObject.getString( "node" ) );
                etcd.setStatusCode( Integer.valueOf( jsonObject.getString( "statusCode" ) ) );
                etcd.setResponseTime( Double.valueOf( jsonObject.getString( "responseTime" ) ) );
                etcd.setResult( jsonObject.getString( "result" ) );
                etcdList.add( etcd );
            }*/
        }
        return result;
    }
}
