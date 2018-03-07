package com.ecaray.ecms.commons.utils;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import com.alibaba.druid.util.StringUtils;

/**
 * 日期时间工具类
 * 
 * @author ouli
 *
 */
public class DateUtil {

	private DateUtil() {
	}

	public final static String TO_MONTH = "yyyyMM";
	public final static String TO_DAY = "yyyyMMdd";
	public final static String TO_HOUR = "yyyyMMddHH";
	public final static String TO_MINUTE = "yyyyMMddHHmm";
	public final static String TO_SECOND = "yyyyMMddHHmmss";
	public final static String TO_MILLISECOND = "yyyyMMddHHmmssSSS";

	public final static String ONLY_YEAR = "yyyy";
	public final static String ONLY_MONTH = "MM";
	public final static String ONLY_TIME = "HHmmss";
	public final static String ONLY_TIME_COLON = "HH:mm:ss";

	public final static String TO_MONTH_LINE = "yyyy-MM";
	public final static String TO_DAY_LINE = "yyyy-MM-dd";
	public final static String TO_HOUR_LINE = "yyyy-MM-dd HH";
	public final static String TO_MINUTE_LINE = "yyyy-MM-dd HH:mm";
	public final static String TO_SECOND_LINE = "yyyy-MM-dd HH:mm:ss";
	public final static String TO_MILLISECOND_LINE = "yyyy-MM-dd HH:mm:ss.SSS";

	public final static String TO_MONTH_SLASH = "yyyy/MM";
	public final static String TO_DAY_SLASH = "yyyy/MM/dd";
	public final static String TO_HOUR_SLASH = "yyyy/MM/dd HH";
	public final static String TO_MINUTE_SLASH = "yyyy/MM/dd HH:mm";
	public final static String TO_SECOND_SLASH = "yyyy/MM/dd HH:mm:ss";
	public final static String TO_MILLISECOND_SLASH = "yyyy/MM/dd HH:mm:ss.SSS";

	public final static String TO_MONTH_DOT = "yyyy.MM";
	public final static String TO_DAY_DOT = "yyyy.MM.dd";
	public final static String TO_MINUTE_DOT = "yyyy.MM.dd HH:mm";
	public final static String TO_SECOND_DOT = "yyyy.MM.dd HH:mm:ss";
	public final static String TO_MILLISECOND_DOT = "yyyy.MM.dd HH:mm:ss.SSS";

	public final static String MONTH_AND_DAY = "MMdd";
	public final static String MONTH_AND_DAY_LINE = "MM-dd";
	public final static String MONTH_AND_DAY_SLASH = "MM/dd";
	public final static String MONTH_AND_DAY_DOT = "MM.dd";

	/** field */
	public final static int DAY_OF_WEEK = Calendar.DAY_OF_WEEK;
	public final static int DAY_OF_MONTH = Calendar.DAY_OF_MONTH;
	public final static int DAY_OF_YEAR = Calendar.DAY_OF_YEAR;
	public final static int MONTH_OF_YEAR = Calendar.MONTH;

	/**
	 * 将Date转换成指定格式的字符串
	 * 
	 * @param timestamp
	 * @param format
	 * @return
	 * @author OL
	 */
	public static String format(Date date, String format) {
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		return sdf.format(date);
	}

	public static String format(long timestamp) {
		SimpleDateFormat sdf = new SimpleDateFormat(TO_DAY_LINE);
		return sdf.format(timestamp);
	}

	/**
	 * 将时间戳转换成指定格式的字符串
	 * 
	 * @param timestamp
	 * @param format
	 * @return
	 * @author OL
	 */
	public static String format(long timestamp, String format) {
		return format(new Date(timestamp), format);
	}

	/**
	 * 将时间戳转换成指定格式的字符串
	 * 
	 * @param timestamp
	 * @param format
	 * @return
	 * @author OL
	 */
	public static String format(String timestamp, String format) {
		if (StringUtils.isEmpty(timestamp)) {
			return "";
		}
		return format(Long.valueOf(timestamp), format);
	}

	/**
	 * 将时间字符串转换成Date
	 * 
	 * @param date
	 * @param format
	 * @return
	 * @author OL
	 */
	public static Date parse(String date, String format) {
		if (StringUtils.isEmpty(date)) {
			return new Date();
		}
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		try {
			return sdf.parse(date);
		} catch (ParseException e) {
			return null;
		}
	}

	/**
	 * 获取当前时间
	 * 
	 * @return
	 * @author OL
	 */
	public static Date now() {
		return new Date();
	}

	/**
	 * 获取当前时间,返回指定格式的字符串
	 * 
	 * @param format
	 * @return
	 * @author OL
	 */
	public static String now(String format) {
		return format(now(), format);
	}

	/**
	 * 获取当前毫秒数
	 * 
	 * @return
	 * @author OL
	 */
	public static long nowTime() {
		return now().getTime();
	}

	/**
	 * 获取
	 * 
	 * @param date
	 * @return
	 * @author OL
	 */
	public static int get(int field) {
		return get(now(), field);
	}

	/**
	 * 获取
	 * 
	 * @param date
	 * @return
	 * @author OL
	 */
	public static int get(Date date, int field) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		return calendar.get(field);
	}

	/**
	 * 获取目标时间的毫秒数
	 * 
	 * @param date
	 * @return
	 * @author OL
	 */
	public static long getTime(Date date) {
		return date.getTime();
	}

	/**
	 * 获取目标时间的毫秒数
	 * 
	 * @param date
	 * @param format
	 * @return
	 * @author OL
	 */
	public static long getTime(String date, String format) {
		return parse(date, format).getTime();
	}

	/**
	 * 获取某月的最后一天
	 * 
	 * @param date
	 * @return
	 * @author OL
	 */
	public static int lastDayOfMonth(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		return calendar.getActualMaximum(Calendar.DAY_OF_MONTH);
	}

	/**
	 * 获取某月的最后一天
	 * 
	 * @param date
	 * @return
	 * @author OL
	 */
	public static int lastDayOfMonth(String date, String format) {
		return lastDayOfMonth(parse(date, format));
	}

	/**
	 * 获取下一天
	 * 
	 * @return
	 * @author OL
	 */
	public static Date nextDay() {
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.DAY_OF_MONTH, 1);
		return calendar.getTime();
	}

	/**
	 * 获取指定日期的下一天
	 * 
	 * @param date
	 * @return
	 * @author OL
	 */
	public static Date nextDay(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.DAY_OF_MONTH, 1);
		return calendar.getTime();
	}

	/**
	 * 获取指定日期的下一天<br>
	 * 输出格式与输入格式一致
	 * 
	 * @param day
	 * @param format
	 *            默认格式：yyyy-MM-dd
	 * @return
	 * @author OL
	 */
	public static String nextDay(String day, String format) {
		format = StringUtils.isEmpty(format) ? TO_DAY_LINE : format;
		Date date = nextDay(StringUtils.isEmpty(day) ? now() : parse(day, format));
		return format(date, format);
	}

	/**
	 * 当前时间往上推 i天
	 * 
	 * @param i
	 * @return
	 * @author OL
	 */
	public static long prevDay(int i) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(parse(now(TO_DAY), TO_DAY));
		calendar.add(Calendar.DAY_OF_MONTH, -i);
		return calendar.getTimeInMillis();
	}

	/**
	 * 获取当前月份
	 * 
	 * @return
	 * @author OL
	 */
	public static Integer getMonth() {
		return Calendar.getInstance().get(Calendar.MONTH);
	}

	/**
	 * 获取当前月份<br>
	 * 
	 * @param format
	 *            默认格式：yyyy-MM
	 * @return
	 * @author OL
	 */
	public static String getMonth(String format) {
		format = StringUtils.isEmpty(format) ? TO_MONTH_LINE : format;
		return format(now(), format);
	}

	/**
	 * 获取下一月份
	 * 
	 * @return
	 * @author OL
	 */
	public static Date nextMonth() {
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.MONTH, 1);
		return calendar.getTime();
	}

	/**
	 * 获取下一月份
	 * 
	 * @return
	 * @author OL
	 */
	public static String nextMonth(String format) {
		return format(nextMonth(), format);
	}

	/**
	 * 获取指定月分的下一月份
	 * 
	 * @param date
	 * @return
	 * @author OL
	 */
	public static Date nextMonth(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.MONTH, 1);
		return calendar.getTime();
	}

	/**
	 * 获取指定月分的下一月份<br>
	 * 输入格式与输出格式一致
	 * 
	 * @param month
	 * @param format
	 *            默认格式：yyyy-MM
	 * @return
	 * @author OL
	 */
	public static String nextMonth(String month, String format) {
		format = StringUtils.isEmpty(format) ? TO_MONTH_LINE : format;
		Date date = nextMonth(StringUtils.isEmpty(month) ? now() : parse(month, format));
		return format(date, format);
	}

	/**
	 * 获取上一月份
	 * 
	 * @return
	 * @author OL
	 */
	public static Date prevMonth() {
		Calendar calendar = Calendar.getInstance();
		calendar.add(Calendar.MONTH, -1);
		return calendar.getTime();
	}

	/**
	 * 获取上一月份
	 * 
	 * @return
	 * @author OL
	 */
	public static String prevMonth(String format) {
		return format(prevMonth(), format);
	}

	/**
	 * 获取指定月分的上一月份
	 * 
	 * @param date
	 * @return
	 * @author OL
	 */
	public static Date prevMonth(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.add(Calendar.MONTH, -1);
		return calendar.getTime();
	}

	/**
	 * 获取指定月分的上一月份<br>
	 * 输入格式与输出格式一致
	 * 
	 * @param month
	 * @param format
	 *            默认格式：yyyy-MM
	 * @return
	 * @author OL
	 */
	public static String prevMonth(String month, String format) {
		format = StringUtils.isEmpty(format) ? TO_MONTH_LINE : format;
		Date date = prevMonth(StringUtils.isEmpty(month) ? now() : parse(month, format));
		return format(date, format);
	}

	/**
	 * 获取当前年份
	 * 
	 * @return
	 * @author OL
	 */
	public static Integer getYear() {
		return Calendar.getInstance().get(Calendar.YEAR);
	}

	/**
	 * 将一种格式的时间字符串转换成另一种格式
	 * 
	 * @param date
	 * @param oleFormat
	 * @param newFormat
	 * @return
	 * @author OL
	 */
	public static String convert(String date, String oleFormat, String newFormat) {
		SimpleDateFormat oldSdf = new SimpleDateFormat(oleFormat);
		SimpleDateFormat newSdf = new SimpleDateFormat(newFormat);
		try {
			return newSdf.format(oldSdf.parse(date));
		} catch (ParseException e) {
			return null;
		}
	}

	/**
	 * 将毫秒数转换成xx时xx分xx秒
	 * 
	 * @param milliseconds
	 * @return
	 * @author OL
	 */
	public static String timeLong(String milliseconds) {
		return timeLong(Long.valueOf(milliseconds));
	}

	/**
	 * 获取最近N天日期列表(包括今天)
	 * 
	 * @param n
	 *            (n <= 31)
	 * @return
	 * @author OL
	 */
	public static int[] getPreDays(int n) {
		int[] days = new int[n];
		int today = get(DAY_OF_MONTH);
		int preMax = lastDayOfMonth(prevMonth());
		for (int i = 0; i < n; i++) {
			int day = today - n + 1 + i;
			if (day > 0) {
				days[i] = day;
			} else {
				days[i] = preMax + day;
			}
		}
		return days;
	}

	/**
	 * 获取最近N天日期列表(包括今天)
	 * 
	 * @param n
	 *            (n <= 31)
	 * @param format
	 *            日期格式.取该类常量
	 * @return
	 * @author OL
	 */
	public static String[] getPreDays(int n, String format) {
		String[] days = new String[n];
		int today = get(DAY_OF_MONTH);
		int preMax = lastDayOfMonth(prevMonth()); // 上一月的最后一天
		String month = getMonth(ONLY_MONTH);
		String preMonth = prevMonth(ONLY_MONTH);
		for (int i = 0; i < n; i++) {
			int day = today - n + 1 + i;
			if (day > 0) {
				days[i] = convert(month + day, MONTH_AND_DAY, format);
			} else {
				days[i] = convert(preMonth + (preMax + day), MONTH_AND_DAY, format);
			}
		}
		return days;
	}

	public static long dateDiffer(long date1, long date2) {
		long differ = Math.abs(date2 - date1);
		return differ / 86400000;
	}

	public static long dateDiffer(String date1, String date2, String format) {
		long l1 = getTime(date1, format);
		long l2 = getTime(date2, format);
		return dateDiffer(l1, l2);
	}

	/**
	 * 将毫秒数转换成xx时xx分xx秒
	 * 
	 * @param milliseconds
	 * @return
	 * @author OL
	 */
	public static Double gettimeLong(long milliseconds) {
		long s = Math.abs(milliseconds) / 1000;
		long h = s / 3600; // 时
		long m = s % 3600; // 分
		String hh = h + ".0";
		String mm = m + ".0";
		Double hhh = Double.parseDouble(hh);
		Double mmm = Double.parseDouble(mm);
		String ss = String.format("%.1f", hhh + mmm / 3600.0d);
		return Double.parseDouble(ss);
	}

	/**
	 * 将毫秒数转换成xx时xx分xx秒
	 * 
	 * @param milliseconds
	 * @return
	 * @author OL
	 */
	public static String timeLong(long milliseconds) {
		long s = Math.abs(milliseconds) / 1000;
		long d = (long) Math.floor(s / 86400); // 天
		long h = (long) Math.floor(s % 86400 / 3600); // 时
		long m = (long) Math.floor(s % 86400 % 3600 / 60); // 分
		s = s % 86400 % 3600 % 60; // 秒

		StringBuilder sb = new StringBuilder("");
		if (d > 0) {
			sb.append(d + "天");
		}
		if (h > 0) {
			sb.append(h + "时");
		}
		if (m > 0) {
			sb.append(m + "分");
		}
		sb.append(s + "秒");
		return sb.toString();
	}

	public static final String getSubYearMonthDay(long starttime) {
		long day = 24 * 3600 * 1000;
		long now = DateUtil.nowTime();
		int dayNums = (int) ((now - starttime) / day);
		String year = dayNums / 365 == 0 ? "" : dayNums / 365 + "年";
		String month = (dayNums % 365) / 30 == 0 ? "" : (dayNums % 365) / 30 + "月";
		String dayNum = ((dayNums % 365) % 30 == 0 ? 1 :(dayNums % 365) % 30) + "天";
		return year + month + dayNum;
	}

	public static final List<String> getMonthDateList(String month) {
		if (!month.contains("-")) {
			return null;
		}
		List<String> list = new ArrayList<String>();
		String nowM = DateUtil.format(now(), "yyyy-MM");
		int maxDay = 0;
		if (month.equals(nowM)) {
			maxDay = Integer.parseInt(DateUtil.format(now(), "dd"));
		} else {
			maxDay = lastDayOfMonth(month, "yyyy-MM");
		}
		for (int i = 1; i <= maxDay; i++) {
			list.add(month + String.format("%02d", i));
		}
		return list;
	}

	public static int dayForWeek(String pTime) throws Exception {
		Calendar c = Calendar.getInstance();
		c.setTime(parse(pTime, "yyyy-MM-dd"));
		int dayForWeek = 0;
		if (c.get(Calendar.DAY_OF_WEEK) == 1) {
			dayForWeek = 7;
		} else {
			dayForWeek = c.get(Calendar.DAY_OF_WEEK) - 1;
		}
		return dayForWeek;
	}

	
	public static int getMaxDayNum(String month) {
		String m = format(now(), "yyyy-MM");
		if (m.equals(month)) {
			return Integer.parseInt(format(now(), "d")) - 1;
		}
		return lastDayOfMonth(month, "yyyy-MM");
	}

	public static String getPreMonth(String month) {
		long m = parse(month, "yyyy-MM").getTime();
		return format(m - 24 * 3600 * 1000, "yyyy-MM");
	}

	public static void main(String[] args) throws Exception {
		System.out.println(dayForWeek("2017-11-28"));
	}

}
