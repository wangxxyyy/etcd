package test;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;

import java.util.LinkedList;
import java.util.List;

/**
 * Created by Administrator on 2017/12/15 0015.
 */
public class GetData {
    public static void main(String [] args){
        GetData getData = new GetData();
        try {
            getData.get();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    public List<HeadNews> get() throws Exception{

        //调用吕琢给的接口数据
            List<HeadNews> list = new LinkedList<HeadNews>();
            String path="http://183.131.7.140:8700/etcdParameter/stat";
          /*
            注释的这段代码，如果请求需要带参数请按照这格式编写
            get方法设置参数要？号
            StringBuilder sb=new StringBuilder(path);
            sb.append("?");
            sb.append("username=").append(URLEncoder.encode("HttpClientGET","utf-8"));*/

            //得到浏览器
            HttpClient httpClient=new DefaultHttpClient();
            //指定请求方式
            HttpGet httpGet=new HttpGet(path.toString());
            //执行请求
            HttpResponse httpResponse=httpClient.execute(httpGet);
            //判断请求是否成功
            int status=httpResponse.getStatusLine().getStatusCode();

            if(status==200){
                //读取响应内容
                String result= EntityUtils.toString(httpResponse.getEntity(), "UTF-8");
                //json处理
                JSONArray jsonArray = JSONArray.fromObject(result);
                for(int i=0;i<jsonArray.size();i++){
                    HeadNews headnews=new HeadNews();
                    JSONObject jsonObject = jsonArray.getJSONObject(i);
                    headnews.setNodeName(jsonObject.getString("node"));
                    headnews.setStatusCode(Integer.valueOf(jsonObject.getString("statusCode")));
                    headnews.setResponseTime( Double.valueOf( jsonObject.getString("responseTime")));
                    headnews.setResult(jsonObject.getString("result"));
                    list.add(headnews);
                }
            }
            return list;
    }
}


