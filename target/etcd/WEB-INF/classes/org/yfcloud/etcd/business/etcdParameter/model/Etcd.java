package org.yfcloud.etcd.business.etcdParameter.model;

/**
 * Created by Administrator on 2017/12/16 0016.
 */
public class Etcd {
    private String nodeName;

    private Integer statusCode;

    private Double responseTime;

    private String result;

    public String getNodeName() {
        return nodeName;
    }

    public void setNodeName(String nodeName) {
        this.nodeName = nodeName;
    }

    public Integer getStatusCode() {
        return statusCode;
    }

    public void setStatusCode(Integer statusCode) {
        this.statusCode = statusCode;
    }

    public Double getResponseTime() {
        return responseTime;
    }

    public void setResponseTime(Double responseTime) {
        this.responseTime = responseTime;
    }

    public String getResult() {
        return result;
    }

    public void setResult(String result) {
        this.result = result;
    }
}
