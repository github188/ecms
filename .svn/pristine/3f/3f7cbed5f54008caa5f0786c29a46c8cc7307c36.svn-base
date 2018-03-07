/*** Eclipse Class Decompiler plugin, copyright (c) 2012 Chao Chen (cnfree2000@hotmail.com) ***/
package com.ecaray.ecms.commons.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class StrUtils {
	public static boolean isNull(String paramString) {
		return ((paramString == null) || (paramString.equals(""))
				|| (paramString.equalsIgnoreCase("null")) || (paramString
					.equalsIgnoreCase("undefined")));
	}

	public static boolean isNotNull(String paramString) {
		return (!(isNull(paramString)));
	}

	public static String trim(String paramString) {
		if (paramString == null)
			return paramString;
		return paramString.trim();
	}

	public static boolean isNumber(String paramString) {
		if (isNull(paramString))
			return false;
		return (paramString.matches("^(-?\\d+)(\\.\\d+)?$"));
	}

	public static boolean isInteger(String paramString) {
		if (isNotNull(paramString))
			return paramString.matches("^-?\\d+$");
		return false;
	}

	public static boolean isDate(String paramString) {
		if (isNotNull(paramString))
			return paramString
					.matches("^((((1[6-9]|[2-9]\\d)\\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\\d|3[01]))|(((1[6-9]|[2-9]\\d)\\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\\d|30))|(((1[6-9]|[2-9]\\d)\\d{2})-0?2-(0?[1-9]|1\\d|2[0-8]))|(((1[6-9]|[2-9]\\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-))$");
		return false;
	}

	public static boolean isDateTime(String paramString) {
		if (isNotNull(paramString))
			return paramString
					.matches("^((((1[6-9]|[2-9]\\d)\\d{2})-(0?[13578]|1[02])-(0?[1-9]|[12]\\d|3[01]))|(((1[6-9]|[2-9]\\d)\\d{2})-(0?[13456789]|1[012])-(0?[1-9]|[12]\\d|30))|(((1[6-9]|[2-9]\\d)\\d{2})-0?2-(0?[1-9]|1\\d|2[0-8]))|(((1[6-9]|[2-9]\\d)(0[48]|[2468][048]|[13579][26])|((16|[2468][048]|[3579][26])00))-0?2-29-)) (20|21|22|23|[0-1]?\\d):[0-5]?\\d:[0-5]?\\d$");
		return false;
	}

	public static boolean isPhoneNo(String paramString) {
		if (isNotNull(paramString))
			return paramString
					.matches("((\\d{11})|^((\\d{7,8})|(\\d{4}|\\d{3})-(\\d{7,8})|(\\d{4}|\\d{3})-(\\d{7,8})-(\\d{4}|\\d{3}|\\d{2}|\\d{1})|(\\d{7,8})-(\\d{4}|\\d{3}|\\d{2}|\\d{1}))$)");
		return false;
	}

	public static boolean isMobilePhoneNo(String paramString) {
		if (isNotNull(paramString))
			return paramString.matches("^13\\d{9}$");
		return false;
	}

	public static boolean isEMail(String paramString) {
		if (isNotNull(paramString))
			return paramString
					.matches("^[\\w-]+(\\.[\\w-]+)*@[\\w-]+(\\.[\\w-]+)+$");
		return false;
	}

	public static boolean isURL(String paramString) {
		if (isNotNull(paramString))
			return paramString
					.matches("^[a-zA-z]+://(\\w+(-\\w+)*)(\\.(\\w+(-\\w+)*))*(\\?\\S*)?$");
		return false;
	}

	public static boolean isIP(String paramString) {
		if (isNotNull(paramString))
			return paramString
					.matches("^(d{1,2}|1dd|2[0-4]d|25[0-5]).(d{1,2}|1dd|2[0-4]d|25[0-5]).(d{1,2}|1dd|2[0-4]d|25[0-5]).(d{1,2}|1dd|2[0-4]d|25[0-5])$");
		return false;
	}

	public static boolean isVariableName(String paramString) {
		if (isNotNull(paramString))
			return paramString
					.matches("^([a-zA-Z_\\x7f-\\xff][a-zA-Z0-9_\\x7f-\\xff]*)");
		return false;
	}

	private static boolean isEqualsIgnoreCase(char paramChar1, char paramChar2) {
		if ((('a' <= paramChar1) && (paramChar1 <= 'z'))
				|| (('A' <= paramChar1) && (paramChar1 <= 'Z') && (((('a' <= paramChar2) && (paramChar2 <= 'z')) || (('A' <= paramChar2)
						&& (paramChar2 <= 'Z') && (((paramChar1 - paramChar2 == 32) || (paramChar2
						- paramChar1 == 32))))))))
			return true;
		return (paramChar1 == paramChar2);
	}



	public static Map<String, String> getParams(String paramString1,
			boolean paramBoolean, String paramString2, String paramString3) {
		if (isNull(paramString1))
			return null;
		String str1 = (isNull(paramString2)) ? "=" : paramString2;
		String str2 = (isNull(paramString3)) ? ";" : paramString3;
		HashMap localHashMap = new HashMap();
		String str3 = new StringBuilder().append(paramString1).append(str2)
				.toString();
		int j = 0;
		int i;
		do {
			i = str3.indexOf(str2, j);
			if (i >= 0) {
				String str4 = str3.substring(j, i);
				if (!(isNull(str4))) {
					int k = str4.indexOf(str1);
					String str5 = (k >= 0) ? str4.substring(0, k) : str4;
					String str6 = (k >= 0) ? str4.substring(k + str1.length(),
							str4.length()) : "";
					localHashMap.put(
							(paramBoolean) ? str5.toLowerCase() : str5, str6);
				}
			}
			j = i + str2.length();
		} while (i >= 0);
		return localHashMap;
	}

	public static Map<String, String> getParams(String paramString1,
			boolean paramBoolean, String paramString2) {
		return getParams(paramString1, paramBoolean, paramString2, ";");
	}

	public static Map<String, String> getParams(String paramString,
			boolean paramBoolean) {
		return getParams(paramString, paramBoolean, "=");
	}

	public static Map<String, String> getParams(String paramString) {
		return getParams(paramString, false);
	}

	public static boolean paramExists(String paramString1, String paramString2,
			boolean paramBoolean, String paramString3, String paramString4) {
		if ((isNull(paramString1)) || (isNull(paramString2)))
			return false;
		Map localMap = getParams(paramString1, paramBoolean, paramString3,
				paramString4);
		return ((paramBoolean) ? localMap.containsKey(paramString2
				.toLowerCase()) : localMap.containsKey(paramString2));
	}

	public static boolean paramExists(String paramString1, String paramString2,
			boolean paramBoolean, String paramString3) {
		return paramExists(paramString1, paramString2, paramBoolean,
				paramString3, ";");
	}

	public static boolean paramExists(String paramString1, String paramString2,
			boolean paramBoolean) {
		return paramExists(paramString1, paramString2, paramBoolean, "=");
	}

	public static boolean paramExists(String paramString1, String paramString2) {
		return paramExists(paramString1, paramString2, false);
	}

	public static String getParamValue(String paramString1,
			String paramString2, boolean paramBoolean, String paramString3,
			String paramString4) {
		if ((isNull(paramString1)) || (isNull(paramString2)))
			return "";
		Map localMap = getParams(paramString1, paramBoolean, paramString3,
				paramString4);
		String str = "";
		if (paramBoolean)
			if (localMap.containsKey(paramString2.toLowerCase()))
				str = String.valueOf(localMap.get(paramString2.toLowerCase()));
			else if (localMap.containsKey(paramString2))
				str = String.valueOf(localMap.get(paramString2));
		return str;
	}

	public static String getParamValue(String paramString1,
			String paramString2, boolean paramBoolean, String paramString3) {
		return getParamValue(paramString1, paramString2, paramBoolean,
				paramString3, ";");
	}

	public static String getParamValue(String paramString1,
			String paramString2, boolean paramBoolean) {
		return getParamValue(paramString1, paramString2, paramBoolean, "=");
	}

	public static String getParamValue(String paramString1, String paramString2) {
		return getParamValue(paramString1, paramString2, false);
	}


	public static String getLeftString(String paramString, int paramInt) {
		if (isNull(paramString))
			return "";
		if (paramString.length() <= paramInt)
			return paramString;
		return paramString.substring(0, paramInt);
	}

	public static String getRightString(String paramString, int paramInt) {
		if (isNull(paramString))
			return "";
		if (paramString.length() <= paramInt)
			return paramString;
		return paramString.substring(paramString.length() - paramInt,
				paramString.length());
	}

	public static int strToInt(String paramString, int paramInt) {
		if (isNull(paramString))
			return paramInt;
		try {
			if (isInteger(paramString))
				return Integer.parseInt(paramString);
			return paramInt;
		} catch (Exception localException) {
		}
		return paramInt;
	}

	public static int strToInt(String paramString) {
		return strToInt(paramString, 0);
	}

	public static float strToFloat(String paramString, float paramFloat) {
		if (isNumber(paramString))
			return Float.parseFloat(paramString);
		return paramFloat;
	}

	public static float strToFloat(String paramString) {
		return strToFloat(paramString, 0.0F);
	}

	public static Date strToDate(String paramString, Date paramDate) {
		if (isDate(paramString))
			return new Date(paramString);
		return paramDate;
	}

	public static Date strToDate(String paramString) {
		return strToDate(paramString, null);
	}



	public static String getSubStr(String paramString1, String paramString2,
			String paramString3) {
		int i = paramString1.indexOf(paramString2);
		int j = paramString1.indexOf(paramString3, i);
		if ((i >= 0) && (j >= 0) && (j > i))
			return paramString1.substring(i + paramString2.length(), j);
		return null;
	}

	public static String getSubStr(String paramString1, String paramString2) {
		int i = paramString1.indexOf(paramString2);
		int j = paramString1.length();
		if ((i >= 0) && (j >= 0) && (j > i))
			return paramString1.substring(i + paramString2.length(), j);
		return null;
	}

	public static String concatStr(List<String> paramList, String paramString) {
		if ((paramList == null) || (paramList.size() == 0))
			return null;
		StringBuffer localStringBuffer = new StringBuffer();
		for (int i = 0; i < paramList.size(); ++i)
			localStringBuffer.append(new StringBuilder()
					.append((i == 0) ? "" : paramString)
					.append((String) paramList.get(i)).toString());
		return localStringBuffer.toString();
	}

	public static String dateToString(Date paramDate, String paramString) {
		if (paramDate == null)
			return null;
		SimpleDateFormat localSimpleDateFormat = new SimpleDateFormat(
				paramString);
		return localSimpleDateFormat.format(paramDate);
	}

	public static String dateToString(Date paramDate) {
		return dateToString(paramDate, "yyyy-MM-dd HH:mm:ss");
	}

	public static Date stringToDate(String paramString1, String paramString2) {
		if (isNull(paramString1))
			return null;
		SimpleDateFormat localSimpleDateFormat = new SimpleDateFormat(
				paramString2);
		Date localDate = null;
		try {
			localDate = localSimpleDateFormat.parse(paramString1);
		} catch (ParseException localParseException) {
			localDate = null;
		}
		return localDate;
	}

	public static Date stringToDate(String paramString) {
		return stringToDate(paramString, "yyyy-MM-dd HH:mm:ss");
	}

	public static boolean isDateFormat(String paramString1, String paramString2) {
		return (stringToDate(paramString1, paramString2) != null);
	}

	public static boolean isDateFormat(String paramString) {
		return isDateFormat(paramString, "yyyy-MM-dd HH:mm:ss");
	}

	public static boolean equals(String paramString1, String paramString2,
			boolean paramBoolean1, boolean paramBoolean2, boolean paramBoolean3) {
		if ((paramString1 == null) && (paramString2 == null))
			return paramBoolean3;
		if ((paramString1 == null) || (paramString2 == null))
			return false;
		if (paramBoolean1)
			return paramString1.equalsIgnoreCase(paramString2);
		return paramString1.equals(paramString2);
	}

	public static boolean equals(String paramString1, String paramString2,
			boolean paramBoolean1, boolean paramBoolean2) {
		return equals(paramString1, paramString2, paramBoolean1, paramBoolean2,
				false);
	}

	public static boolean equals(String paramString1, String paramString2,
			boolean paramBoolean) {
		return equals(paramString1, paramString2, paramBoolean, false);
	}

	public static boolean equals(String paramString1, String paramString2) {
		return equals(paramString1, paramString2, false);
	}

	public static boolean equalsIgnoreCase(String paramString1,
			String paramString2, boolean paramBoolean1, boolean paramBoolean2) {
		return equals(paramString1, paramString2, true, paramBoolean1,
				paramBoolean2);
	}

	public static boolean equalsIgnoreCase(String paramString1,
			String paramString2, boolean paramBoolean) {
		return equalsIgnoreCase(paramString1, paramString2, paramBoolean, false);
	}

	public static boolean equalsIgnoreCase(String paramString1,
			String paramString2) {
		return equalsIgnoreCase(paramString1, paramString2, false);
	}

	public static String format(String paramString, List paramList) {
		if ((isNull(paramString)) || (paramList == null)
				|| (paramList.size() == 0))
			return paramString;
		for (int i = 0; i < paramList.size(); ++i)
			paramString = paramString.replaceAll(
					new StringBuilder().append("\\{").append(i).append("\\}")
							.toString(), String.valueOf(paramList.get(i)));
		return paramString;
	}

	public static String format(String paramString, Object[] paramArrayOfObject) {
		if ((isNull(paramString)) || (paramArrayOfObject == null)
				|| (paramArrayOfObject.length <= 0))
			return format(paramString, (List) null);
		ArrayList localArrayList = new ArrayList();
		for (int i = 0; i < paramArrayOfObject.length; ++i)
			localArrayList.add(paramArrayOfObject[i]);
		return format(paramString, localArrayList);
	}


	public static void main(String[] paramArrayOfString) {
		String str = "111{0}222{1}333{0}444{2}555{1}666{3}";
		System.out.println(str);
		System.out.println(format(str, new Object[] { "aaa", "bbb", "ccc",
				"ddd", "eee" }));
	}
}