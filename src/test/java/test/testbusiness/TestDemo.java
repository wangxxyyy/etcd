package test.testbusiness;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;

/**
 * Created by Administrator on 2018/4/20 0020.
 */
public class TestDemo {

    public static void main(String[] args) {
        try{
            FileReader fr=new FileReader("F:\\gc\\gc.log");
            BufferedReader br=new BufferedReader(fr) ;
            FileWriter fw = null;
            String string=null;
            BufferedWriter bw = null;
            StringBuilder result =new StringBuilder();
            while((string=br.readLine())!=null){
                result.append(string + System.getProperty("line.separator"));
                fw = new FileWriter("C:\\Users\\Administrator\\Desktop\\testDe\\c.txt");
                bw=new BufferedWriter(fw);
                bw.write( String.valueOf( result ));
                bw.newLine();
            }
            bw.close();
            fw.close();
            br.close();
            fr.close();
        }catch (Exception e){
            e.printStackTrace();
        }
    }
}
