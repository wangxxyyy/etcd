package org.yfcloud.etcd.business.redis;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Administrator on 2018/1/11 0011.
 */
public class RedisExample {
 /*   private static final String url  = "192.168.4.173";
    private static final int port = 6379;

    public static void main(String[] args) {
     hash();
    }

    private static void hash(){
        Jedis jedis = new Jedis(url,port);
        if (jedis != null) {
            jedis.auth("123456");
        }
        jedis.flushDB(); // 清空数据库
        Map<String,String> map = new HashMap<String,String>();
        map.put("name","lijunjie");
        map.put("age","27");
        map.put("height","175");
        map.put("weight","66");
        jedis.select(3);
        jedis.hmset("Person",map);
        jedis.close();
    }*/
    private static JedisPool jedisPool = null;

    public static void main(String [] args){
        RedisExample.init();
        RedisExample.hash();
    }
    /**
     * 初始化数据库连接池
     */
    private static void init() {
        JedisPoolConfig config = new JedisPoolConfig(); // Jedis连接池
        config.setMaxIdle(8); // 最大空闲连接数
        config.setMaxTotal(8);// 最大连接数
        config.setMaxWaitMillis(1000); // 获取连接是的最大等待时间，如果超时就抛出异常
        config.setTestOnBorrow(false);// 在borrow一个jedis实例时，是否提前进行validate操作；如果为true，则得到的jedis实例均是可用的；
        config.setTestOnReturn(true);
        jedisPool = new JedisPool(config, "192.168.4.173", 6379, 5000, "123456", 0); // 配置、ip、端口、连接超时时间、密码、数据库编号（0~15）
    }

    private static void hash() {
        Jedis jedis = jedisPool.getResource();
        jedis.flushDB(); // 清空数据库
        Map<String, String> map = new HashMap<String, String>();
        map.put("yunfancdn", "0");
        map.put("yunfan_nginx", "1");
        map.put("yunfan_oct", "1");
        map.put("aliacc_cdn", "1");
        jedis.select(3);
        jedis.hmset("live_access_domain", map); // 存放一个散列

      /*  Map<String, String> getMap = jedis.hgetAll("live_access_domain"); // 从redis中取回来
        System.out.println("从redis中取回的live_access_domain散列：" + getMap.toString());

        List<String> hmget = jedis.hmget("live_access_domain", "yunfancdn", "yunfan_nginx"); // 从散列中取回一个或多个字段信息
        System.out.println("从live_access_domain散列中两个字段来看看：" + hmget);

        jedis.hdel("live_access_domain", "yunfancdn"); // 删除散列中的一个或者多个字段
        getMap = jedis.hgetAll("live_access_domain");
        System.out.println("从redis中取回的被删除后的live_access_domain散列：" + getMap);
        System.out.println();

        long length = jedis.hlen("live_access_domain"); // 求出集合的长度
        System.out.println("散列live_access_domain的长度为：" + length);
        System.out.println();

        boolean exists = jedis.hexists("live_access_domain", "aliacc_cdn"); // 判断某个字段是否存在于散列中
        System.out.println("k5字段是否存在于散列中：" + exists);
        System.out.println();

        Set<String> keys = jedis.hkeys("live_access_domain"); // 获取散列的所有字段名
        System.out.println("live_access_domain的所有字段名：" + keys);
        System.out.println();

        List<String> values = jedis.hvals("live_access_domain"); // 获取散列的所有字段值，实质的方法实现，是用上面的hkeys后再用hmget
        System.out.println("live_access_domain的所有字段值：" + values);
        System.out.println();

        jedis.hincrBy("live_access_domain", "k4", 10); // 给散列的某个字段进行加法运算
        System.out.println("执行加法运行后的live_access_domain散列：" + jedis.hgetAll("live_access_domain"));
        System.out.println();

        jedis.del("live_access_domain"); // 删除散列
        System.out.println("删除live_access_domain后，live_access_domain是否还存在redis中：" + jedis.exists("live_access_domain"));
        System.out.println();
        System.out.println();*/
        jedis.close();
    }
}
