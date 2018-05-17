package test;

import java.util.HashMap;
import java.util.Map;

/**
 * Created by Administrator on 2017/12/26 0026.
 */
public class TestJava {

    public static void main(String [] args){
     /*   int srcArray [] = {3,5,11,17,21,23,28,30,32,50,64,78,81,95,101};
        int state = binSearch( srcArray, 0, srcArray.length - 1, 81);
        System.out.println(state);

    }

    public static int binSearch(int srcArray[], int start, int end, int key) {
        int mid = (end - start) / 2 + start;
        if (srcArray[mid] == key) {
            return mid;
        }
        if (start >= end) {
            return -1;
        } else if (key > srcArray[mid]) {
            return binSearch(srcArray, mid + 1, end, key);
        } else if (key < srcArray[mid]) {
            return binSearch(srcArray, start, mid - 1, key);
        }
        return -1;*/

        Map<Integer,Integer> hashMap = new HashMap<Integer,Integer>();
        hashMap.put( 2,9 );
        hashMap.put( 2,20);
        System.out.println(hashMap.get(2));
    }
}
