package com.ecaray.ecms.commons.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 字符串工具类
 * 
 * @author OL
 */
public final class StringUtil {

	private StringUtil() {
	}

	/**
	 * 判断字符串是否为空，包括“null”
	 * 
	 * @param value
	 * @return
	 * @author OL
	 */
	public static boolean isNull(String value) {
		return StrUtils.isNull(value);
	}

	public static boolean isNotNull(String value) {
		return !StrUtils.isNull(value);
	}

	/**
	 * 判断字符串是否为空
	 * 
	 * @param value
	 * @return
	 * @author OL
	 */
	public static boolean isEmpty(String value) {
		return value == null || value.equals("") ? true : false;
	}

	public static boolean isNotEmpty(String value) {
		return !isEmpty(value);
	}

	/**
	 * 检查多个字符串之中是否有空值，若有则返回true，否则返回false
	 * 
	 * @param values
	 * @return
	 * @author OL
	 */
	public static boolean hasEmpty(String... values) {
		for (int i = 0; i < values.length; i++) {
			if (isEmpty(values[i])) {
				return true;
			}
		}
		return false;
	}

	/**
	 * 检查多个字符串之中是否有非空的值，若有则返回true，否则返回false
	 * 
	 * @param values
	 * @return
	 * @author OL
	 */
	public static boolean hasNotEmpty(String... values) {
		for (int i = 0; i < values.length; i++) {
			if (isNotEmpty(values[i])) {
				return true;
			}
		}
		return false;
	}

	/**
	 * 将驼峰形式的字符串转换成下划线连接形式
	 * 
	 * @param value
	 * @return
	 * @author OL
	 */
	public static String trans(String value) {
		List<Integer> record = new ArrayList<Integer>();
		for (int i = 0; i < value.length(); i++) {
			char tmp = value.charAt(i);
			if ((tmp >= 'A') && (tmp <= 'Z')) {
				record.add(i);// 记录每个大写字母的位置
			}
		}
		value = value.toLowerCase();
		char[] charofstr = value.toCharArray();
		String[] arry = new String[record.size()];
		for (int i = 0; i < record.size(); i++) {
			int index = record.get(i);
			if (index == 0) {
				arry[i] = "" + charofstr[index];
			} else {
				arry[i] = "_" + charofstr[index]; // 加"_"
			}
		}
		int flag = 0;
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < value.length(); i++) {
			if ((flag < record.size()) && (i == record.get(flag))) {
				sb.append(arry[flag]);
				flag++;
			} else {
				sb.append(charofstr[i]);
			}
		}
		return sb.toString();
	}

	/**
	 * 判断数组是否包含某个值
	 * 
	 * @param array
	 * @param value
	 * @return
	 * @author OL
	 */
	public static int contains(String[] array, String value) {
		for (int i = 0; i < array.length; i++) {
			if (array[i].equals(value)) {
				return i;
			}
		}
		return -1;
	}

	/**
	 * 将字符串首字母转成大写
	 * 
	 * @param value
	 * @return
	 * @author OL
	 */
	public static String toUpperCaseFirst(String value) {
		if (StringUtil.isEmpty(value)) {
			return value;
		}
		StringBuffer sb = new StringBuffer(value);
		Character c = sb.charAt(0);

		return c.toString().toUpperCase() + sb.deleteCharAt(0);
	}

	/**
	 * 将银行卡号以每四位一个空格隔开
	 * 
	 * @param bankCard
	 * @return
	 * @author OL
	 */
	public static String formatBankCard(String bankCard) {
		if (StrUtils.isNotNull(bankCard)) {
			StringBuffer sb = new StringBuffer();
			for (int i = 0; i < bankCard.length(); i++) {
				sb.append(bankCard.charAt(i));
				if (i % 4 == 3) {
					sb.append(" ");
				}
			}
			return sb.toString();
		} else {
			return "";
		}
	}

	/**
	 * 生成UUID
	 * 
	 * @return
	 * @author OL
	 */
	public static String getUUID() {
		return UUID.randomUUID().toString().replace("-", "");
	}

	public static boolean isNumeric(String value) {
		/*for (int i = 0; i < value.length(); i++) {
			if (!Character.isDigit(value.charAt(i))) {
				return false;
			}
		}*/

		Pattern pattern = Pattern.compile("^[-+]?[0-9]+(.[0-9]+)?$");
		Matcher isNum = pattern.matcher(value);
		if (isNum.matches()) {
			return true;
		}
		return false;
	}
	
	public static boolean isInteger(String value) {
		Pattern pattern = Pattern.compile("^[-+]?[0-9]+$");
		Matcher isNum = pattern.matcher(value);
		if (isNum.matches()) {
			return true;
		}
		return false;
	}

	public static void main(String[] args) {
		System.out.println(hasEmpty("a", "b", "c", "d", null, "e"));
		System.out.println(isEmpty("  "));

		System.out.println(trans("testAaaBbbCcc"));

		System.out.println(toUpperCaseFirst("value"));

		System.out.println(hasEmpty());
		
		System.out.println(isNumeric("2.102"));
		System.out.println(isInteger("2.10"));
	}
}
