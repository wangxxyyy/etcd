package org.yfcloud.etcd.business.aliDns.controller;

import org.apache.commons.codec.binary.Base64;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.util.EntityUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.yfcloud.etcd.common.CommonUtil;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.InetAddress;
import java.net.URLEncoder;
import java.net.UnknownHostException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Created by Administrator on 2017/12/22 0022.
 */
@Controller
@RequestMapping("/dnsRecord")
public class DnsSrv {
    
    final String HTTP_METHOD = "GET";

    //生成规范化的字符串
    private static final String ENCODING = "UTF-8";
    private static String percentEncode(String value) throws UnsupportedEncodingException {
        return value != null ? URLEncoder.encode(value, ENCODING).replace("+", "%20")
        .replace("*", "%2A").replace("%7E", "~") : null;
    }

    private static final String host = "http://alidns.aliyuncs.com/?";

    @RequestMapping("/add")
    public ModelAndView view(HttpServletRequest request) throws UnsupportedEncodingException,
            NoSuchAlgorithmException {

        ModelAndView view = new ModelAndView();

        //客户端请求网卡IP
        String ClientIp = this.getIpAddr(request);

        //允许访问的IP段192.168.0.0/16
        String accessIp = "192.168";
        String ip = ClientIp.substring(0, 7);
        if (ip.equals(accessIp)) {

            //接口传入参数
            String rr = request.getParameter( "RR" );
            String type = request.getParameter( "Type" );
            String value = request.getParameter( "Value" );
            String results = null;

            //加入请求参数
            Map<String, String> parameters = new HashMap<String, String>();
            parameters.put( "Format", "json" );
            parameters.put( "Action", "AddDomainRecord" );
            parameters.put( "AccessKeyId", "LTAI0n5rna0Iysk7" );
            parameters.put( "SignatureMethod", "HMAC-SHA1" );
            parameters.put( "SignatureVersion", "1.0" );
            parameters.put( "DomainName", "yfcloud.io" );
            parameters.put( "SignatureNonce", CommonUtil.getUUID() );
            parameters.put( "Version", "2015-01-09" );
            parameters.put( "RR", rr );
            parameters.put( "Type", type );
            parameters.put( "Value", value );
            parameters.put( "TTL", "1" );
            parameters.put( "Line", "default" );
            //生成时间必须是ISO8601规范
            parameters.put( "Timestamp", CommonTime.formatIso8601Date( new Date() ) );

            //拼接传入url
            StringBuilder params = new StringBuilder();
            for (String key : parameters.keySet().toArray( new String[]{} )) {
                params.append( key );
                params.append( "=" );
                params.append(percentEncode( parameters.get( key ) ) );
                params.append( "&" );
            }
            String url = host + params.toString();

            // 对参数进行排序，注意严格区分大小写
            String[] sortedKeys = parameters.keySet().toArray(new String[]{});
            Arrays.sort( sortedKeys );


            final String SEPARATOR = "&";
            // 生成stringToSign字符串
            StringBuilder stringToSign = new StringBuilder();
            stringToSign.append( HTTP_METHOD ).append( SEPARATOR );
            stringToSign.append(percentEncode( "/" ) ).append( SEPARATOR );

            StringBuilder canonicalizedQueryString = new StringBuilder();
            for (String key : sortedKeys) {
                // 对key和value进行编码
                canonicalizedQueryString.append( "&" )
                        .append( percentEncode( key ) ).append( "=" )
                        .append( percentEncode( parameters.get( key ) ) );
            }
            // canonicalizedQueryString进行编码
            stringToSign.append( percentEncode( canonicalizedQueryString.toString().substring( 1 ) ) );
            String signs = this.createSign( stringToSign.toString() );
            url += "Signature=" + percentEncode( signs );
            results = this.getRequest( url );
            view.addObject( "results", results );
            view.setViewName( "data" );
            return view;
        } else {
            view.setViewName( "error" );
            return view;
        }
    }

    /**
     * 计算编码
     * @param sign
     * @return
     */
    public String createSign(String sign) {
        final String ALGORITHM = "HmacSHA1";
        final String ENCODING = "UTF-8";
        String key = "LXufmHj9kLzZYjyVOxaaMgs1GZzJPi&";
        String signature = "";
        try {
            Mac mac = Mac.getInstance( ALGORITHM );
            mac.init( new SecretKeySpec( key.getBytes( ENCODING ), ALGORITHM ) );
            byte[] signData = mac.doFinal( sign.getBytes( ENCODING ) );
            signature = new String( Base64.encodeBase64( signData ) );
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        } catch (InvalidKeyException e) {
            e.printStackTrace();
        }
        return signature;
    }


    /**
     * 发送get请求
     * @return
     */
    public String  getRequest(String url){
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

    /**
     * 获取客户端请求IP
     * @param request
     * @return
     */
    public String getIpAddr(HttpServletRequest request){
        String ipAddress = request.getHeader("x-forwarded-for");
        if(ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getHeader("Proxy-Client-IP");
        }
        if(ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getHeader("WL-Proxy-Client-IP");
        }
        if(ipAddress == null || ipAddress.length() == 0 || "unknown".equalsIgnoreCase(ipAddress)) {
            ipAddress = request.getRemoteAddr();
            if(ipAddress.equals("127.0.0.1") || ipAddress.equals("0:0:0:0:0:0:0:1")){
                //根据网卡取本机配置的IP
                InetAddress inet=null;
                try {
                    inet = InetAddress.getLocalHost();
                } catch (UnknownHostException e) {
                    e.printStackTrace();
                }
                ipAddress= inet.getHostAddress();
            }
        }
        //对于通过多个代理的情况，第一个IP为客户端真实IP,多个IP按照','分割
        if(ipAddress!=null && ipAddress.length()>15){ //"***.***.***.***".length() = 15
            if(ipAddress.indexOf(",")>0){
                ipAddress = ipAddress.substring(0,ipAddress.indexOf(","));
            }
        }
        return ipAddress;
    }
}


