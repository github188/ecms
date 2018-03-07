package com.ecaray.ecms.commons.utils;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.net.URLConnection;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Map.Entry;

import com.alibaba.fastjson.JSONObject;

/**
 * Http工具类
 * 
 * @author OL
 *
 */
public class HttpUtil {

	public final static String GET = "GET";
	public final static String POST = "POST";
	public final static String charset = "UTF-8";
	public final static String encoding = "compress";
	public final static String contentType = "application/x-www-form-urlencoded";

	public static String get(String url, ParaMap params) throws Exception {
		if (!url.contains("?")) {
			url += "?";
		} else {
			url += "&";
		}
		return get(url + mapToUrlParam(params));
	}

	public static String get(String url) throws Exception {
		System.out.println(url);
		HttpURLConnection conn = openConnection(url);
		conn.setRequestProperty("Content-Type", contentType);
		conn.connect();
		try {
			int state = conn.getResponseCode();
			if (state >= 300) { // 响应失败
				throw new Exception("HTTP Request is not success, Response code is " + state);
			}
			InputStream is = conn.getInputStream();
			return InputStreamToString(is);
		} catch (Exception e) {
			throw e;
		} finally {
			close(conn, null);
		}
	}

	public static String post(String url, ParaMap params) throws Exception {
		String paramContent = mapToUrlParam(params);

		HttpURLConnection conn = openConnection(url);
		conn.setDoInput(true);
		conn.setDoOutput(true);
		conn.setRequestMethod(POST);
		conn.setRequestProperty("Content-Type", contentType);
		conn.setRequestProperty("Content-Length", String.valueOf(paramContent.length()));
		conn.connect();

		OutputStream out = null;
		try {
			out = conn.getOutputStream();
			out.write(paramContent.getBytes(charset));

			int state = conn.getResponseCode();
			if (state >= 300) { // 响应失败
				throw new Exception("HTTP Request is not success, Response code is " + state);
			}

			InputStream is = conn.getInputStream();
			return InputStreamToString(is);
		} catch (Exception e) {
			throw e;
		} finally {
			close(conn, out);
		}
	}

	public static String sendJson(String url, JSONObject obj) throws Exception {
		String content = obj.toString();

		HttpURLConnection conn = openConnection(url);
		conn.setDoInput(true);
		conn.setDoOutput(true);
		conn.setRequestMethod(POST);
		conn.setRequestProperty("Content-Type", "application/json");
		conn.setRequestProperty("Content-Length", String.valueOf(content.length()));
		conn.connect();

		OutputStream out = null;
		try {
			out = conn.getOutputStream();
			out.write(content.getBytes(charset));

			int state = conn.getResponseCode();
			if (state >= 300) { // 响应失败
				throw new Exception("HTTP Request is not success, Response code is " + state);
			}

			InputStream is = conn.getInputStream();
			return InputStreamToString(is);
		} catch (Exception e) {
			throw e;
		} finally {
			close(conn, out);
		}
	}

	/**
	 * 将Map转化为URL后的参数字符串
	 * 
	 * @param map
	 * @return
	 * @throws Exception
	 * @author OL
	 * @throws UnsupportedEncodingException
	 */
	public static String mapToUrlParam(ParaMap params) throws UnsupportedEncodingException {
		StringBuffer sb = new StringBuffer();
		if (params != null) {
			// 组织请求参数
			@SuppressWarnings("unchecked")
			Iterator<Entry<String, Object>> it = params.entrySet().iterator();
			while (it.hasNext()) {
				Entry<String, Object> element = it.next();
				sb.append(element.getKey());
				sb.append("=");
				sb.append((element.getValue() == null || element.getValue().equals("null")) ? ""
						: URLEncoder.encode(element.getValue().toString(), "UTF-8"));
				sb.append("&");
			}
			if (sb.length() > 0) {
				sb.deleteCharAt(sb.length() - 1);
			}
		}
		return sb.toString();
	}

	public static void close(HttpURLConnection conn, OutputStream out) throws IOException {
		if (out != null)
			out.close();
		if (conn != null)
			conn.disconnect();
	}

	private static HttpURLConnection openConnection(String url) {
		HttpURLConnection conn;
		try {
			URL localURL = new URL(url);
			URLConnection connection = localURL.openConnection();
			conn = (HttpURLConnection) connection;
			conn.setUseCaches(false);
			conn.setReadTimeout(300000);
			conn.setRequestProperty("Accept-Encoding", encoding);
			conn.setRequestProperty("Accept-Charset", charset);

			return conn;
		} catch (MalformedURLException e) {
		} catch (ProtocolException e) {
		} catch (IOException e) {
		}

		return null;
	}
	public static String InputStreamToString(InputStream paramInputStream) throws Exception {
		ByteArrayOutputStream localByteArrayOutputStream = new ByteArrayOutputStream();
		byte[] arrayOfByte = new byte[4096];
		int i = -1;
		while ((i = paramInputStream.read(arrayOfByte, 0, 4096)) != -1)
			localByteArrayOutputStream.write(arrayOfByte, 0, i);
		arrayOfByte = null;
		return new String(localByteArrayOutputStream.toByteArray(), "UTF-8");
	}
	
	
	public static String sign(ParaMap params, String secret) {
		List<String> keys = new ArrayList<String>(params.keySet());
		StringBuffer localStringBuffer = new StringBuffer();
		try {
			Iterator localIterator = keys.iterator();
			while (localIterator.hasNext()) {
				String str1 = String.valueOf(localIterator.next());
				if ("sign".equals(str1))
					continue;
				if ("requestKey".equals(str1))
					continue;
				String str2 = params.getString(str1);
				str2 = URLEncoder.encode(str2);
				if (localStringBuffer.toString().length() == 0)
					localStringBuffer.append(str1 + "=" + str2);
				else
					localStringBuffer.append("&" + str1 + "=" + str2);
			}
			localStringBuffer.append("&requestKey=" + secret);
		} catch (Exception localException) {
			localException.printStackTrace();
		}
		System.out.println(localStringBuffer.toString());
		String sign = EncryptUtil.md5(localStringBuffer.toString()).toLowerCase();
		params.put("sign", sign);
		return sign;
	}

	public static void main(String[] args) throws Exception {
		String url = "http://192.168.9.200:5060/user/data?module=sys&service=Role&method=getRoleList";
		ParaMap params = new ParaMap();
		params.put("keyword", "edel");
		System.out.println(get(url, params));
	}
}
