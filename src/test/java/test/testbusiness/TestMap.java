package test.testbusiness;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Administrator on 2018/4/2 0002.
 */
public class TestMap {
    public static void main(String[] args) {
        Map<String, Integer> map = new HashMap<String, Integer>();
        map.put( "wang", 1 );
        map.put( "xian", 2 );
        map.put( "yue", 3 );
      /*  for (Map.Entry<String, Integer> entry : map.entrySet()) {
            System.out.println( "Key = " + entry.getKey() + ", Value = " + entry.getValue() );
        }*/
       /* Iterator<Map.Entry<String, Integer>> entries = map.entrySet().iterator();
        while (entries.hasNext()) {
            Map.Entry<String, Integer> entry = entries.next();
            System.out.println("Key = " + entry.getKey() + ", Value = " + entry.getValue());
        }*/

        for (String key : map.keySet()) {
            Integer value = map.get( key );
            System.out.println( "Key = " + key + ", Value = " + value );
        }
    }
}
