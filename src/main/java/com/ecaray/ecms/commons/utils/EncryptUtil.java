package com.ecaray.ecms.commons.utils;


import com.ecaray.ecms.commons.constant.Constants;
import com.ecaray.ecms.commons.constant.EncryMD5;
import com.ecaray.ecms.commons.constant.EncrySHA1;
import sun.misc.BASE64Encoder;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Arrays;

import org.springframework.stereotype.Service;

@Service
public class EncryptUtil {
	
	
	/**
	 * 获取MD5加密后的字符，算法不可以逆
	 * 
	 * @param str
	 * @return
	 */
	public static String md5(String str) {
		return new EncryMD5().getMD5ofStr(str);
	}

	  //静态方法，便于作为工具类  
   public static String getMd5(String plainText) {  
       try {  
           MessageDigest md = MessageDigest.getInstance("MD5");  
           md.update(plainText.getBytes());  
           byte b[] = md.digest();  
           int i;  
           StringBuffer buf = new StringBuffer("");  
           for (int offset = 0; offset < b.length; offset++) {  
               i = b[offset];  
               if (i < 0)  
                   i += 256;  
               if (i < 16)  
                   buf.append("0");  
               buf.append(Integer.toHexString(i));  
           }  
           //32位加密  
           return buf.toString();  
           // 16位的加密  
           //return buf.toString().substring(8, 24);  
       } catch (NoSuchAlgorithmException e) {  
           e.printStackTrace();  
           return null;  
       }  
   }  
	
	
	/**
	 * 获取SHA1加密后的字符，算法不可以逆
	 * 
	 * @param str
	 * @return
	 */
	public static String sha1(String str) {
		return new EncrySHA1().getDigestOfString(str.getBytes());
	}


	/**
	 * Author ：zhxy
	 * 说明：MD5加密
	 */
	public static String EncoderByMd564(String str) throws NoSuchAlgorithmException, UnsupportedEncodingException {
		//确定计算方法
		str+= Constants.SECRET_KEY;
		MessageDigest md5=MessageDigest.getInstance("MD5");
		BASE64Encoder base64en = new BASE64Encoder();
		//加密后的字符串
		String newstr=base64en.encode(md5.digest(str.getBytes("utf-8")));
		return newstr;
	}


	public static String EncoderByMd532(String str) throws NoSuchAlgorithmException, UnsupportedEncodingException {
		MessageDigest md5 = MessageDigest.getInstance("MD5");
		md5.update((str).getBytes("UTF-8"));
		byte b[] = md5.digest();

		int i;
		StringBuffer buf = new StringBuffer("");

		for(int offset=0; offset<b.length; offset++){
			i = b[offset];
			if(i<0){
				i+=256;
			}
			if(i<16){
				buf.append("0");
			}
			buf.append(Integer.toHexString(i));
		}

		return buf.toString();
	}
	/**
	 * 对传入token做验证加密
	 *
	 * @param token
	 * @param timestamp
	 * @param nonce
	 * @return
	 */
	public static String md5Token( String token,String timestamp,String nonce) {
		String[] str = { token, timestamp, nonce };
		Arrays.sort(str); // 字典序排序
		String bigStr = str[0] + str[1] + str[2];
		return md5(bigStr);
	}
}
