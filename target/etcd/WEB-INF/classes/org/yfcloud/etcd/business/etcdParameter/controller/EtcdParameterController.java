package org.yfcloud.etcd.business.etcdParameter.controller;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;

/**
 * Created by Administrator on 2017/12/16 0016.
 */
@Controller
@RequestMapping("/etcd")
public class EtcdParameterController {

    private static final String url="http://183.131.7.140:8700/etcd/stat";

    @RequestMapping("/playParameterIndex")
   public ModelAndView parameterIndex(HttpServletRequest request){
       ModelAndView view = new ModelAndView();
       view.setViewName("etcd/parameter");
       return view;
    }

    @RequestMapping("/getParameter")
    @ResponseBody
    public String getParameter(){
        HttpClient httpClient=new DefaultHttpClient();
        //指定请求方式
        HttpGet httpGet=new HttpGet(url.toString());
        //执行请求
        HttpResponse httpResponse = null;
        try {
            httpResponse = httpClient.execute(httpGet);
        } catch (IOException e) {
            e.printStackTrace();
        }
        //判断请求是否成功
        int status = httpResponse.getStatusLine().getStatusCode();
        String result= null;
        if(status==200){
            //读取响应内容

            try {
                result = EntityUtils.toString(httpResponse.getEntity(), "UTF-8");
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return result;
    }
}
