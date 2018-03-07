package com.ecaray.ecms.commons.constant;

import java.util.Random;
import java.util.UUID;

/**
 * com.ecaray.owms.commons.utils
 * Author ：zhxy
 * 2016/11/23 15:31
 * 说明：数字转化工具类
 */
public class DataUtil {

    /**
     * Author ：zhxy
     * 说明：随机数转化工具类
     */
    public static String uuidData(){
        String uuid = UUID.randomUUID().toString().replaceAll("-","");
        return uuid;
    }

    public static  String randomId(){
        String id = System.currentTimeMillis()+""+ (new Random().nextInt(1000));
        return id;
    }
    /**
     * Author ：zhxy
     * 说明：判断是否为空
     */
    public static boolean isNullOrEmpty(String o){
        if(o==null || "".equals(o)){
            return true;
        }else{
            return false;
        }
    }

    public static void main(String[] args) {
       String id = randomId();
        System.out.println(id);
        System.out.println("aaa:"+new Random().nextInt(1000));
    }

}
