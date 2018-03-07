package com.ecaray.ecms.commons.constant;

import com.ecaray.ecms.commons.utils.EncryptUtil;

import java.util.HashMap;
import java.util.Map;
import java.util.Random;

/**
 * com.ecaray.owms.commons
 * Author ：zhxy
 * 2016/11/21 19:12
 * 说明：添加Token 头信息
 */
public class TokenInfo {
    public static Map addTokenInfo(){
        Map<String,String> map = new HashMap();
        String timestamp = System.currentTimeMillis()+"";
        String nonce =new Random().nextInt(10000)+"";
        map.put(Constants.TOKEN_TIMESTAMP,timestamp);
        map.put(Constants.TOKEN_NONCE,nonce);
        map.put(Constants.TOKEN_SIGNATURE, EncryptUtil.md5Token(Constants.TOKEN_VALUE,timestamp,nonce));
        return map;
    }
}
