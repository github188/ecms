package com.ecaray.ecms.commons.utils;

import java.util.Calendar;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecaray.ecms.services.cwa.CwaDateHolidayService;

import freemarker.core.ParseException;

@Service
public class LeaveCalender {

	@Autowired
	private CwaDateHolidayService cwaDateHolidayService;
	
	
	/**
	 * 获取当年中国的法定节假日和工作日等信息。 如下是当前包含的功能： 01-给定日期，判断是否是法定节假日。
	 * 02-给定日期，判断是否是周末（周末不一定是休息日，可能需要补班）。 03-给定日期，判断是否是需要额外补班的周末。
	 * 04-给定日期，判断是否是休息日（包含法定节假日和不需要补班的周末）。 05-给定日期，判断是否是工作日(非休息日)。
	 * 06-获取一年中总共的天数。 07-获取一年中法定节假日的天数。 08-获取一年中需要补班的周末天数。 09-获取一年中周末的天数（周六+周日）。
	 * 10-获取一年中休息日的天数（法定节假日+不需要补班的周末）。
	 * 
	 */

	// 法律规定的放假日期
//	private static List<String> lawHolidays = new ArrayList<String>(
//			Arrays.asList("2017-01-01", "2017-01-02", "2017-01-27", "2017-01-28", "2017-01-29", "2017-01-30",
//					"2017-01-31", "2017-02-01", "2017-02-02", "2017-04-02", "2017-04-03", "2017-04-04", "2017-04-29",
//					"2017-04-30", "2017-05-01", "2017-05-28", "2017-05-29", "2017-05-30", "2017-10-01", "2017-10-02",
//					"2017-10-03", "2017-10-04", "2017-10-05", "2017-10-06", "2017-10-07", "2017-10-08"));
//	// 由于放假需要额外工作的周末
//	private static List<String> extraWorkdays = new ArrayList<String>(
//			Arrays.asList("2017-01-22", "2017-02-04", "2017-04-01", "2017-05-27", "2017-09-30"));

//	/**
//	 * 判断是否是法定假日
//	 * 
//	 * @param calendar
//	 * @return
//	 * @throws Exception
//	 */
//	public static boolean isLawHoliday(String calendar) throws Exception {
//		isMatchDateFormat(calendar);
//		if (lawHolidays.contains(calendar)) {
//			return true;
//		}
//		return false;
//	}
//	
//
//	/**
//	 * 判断是否是周末
//	 * 
//	 * @param calendar
//	 * @return
//	 * @throws ParseException
//	 */
//	public static boolean isWeekends(String calendar) throws Exception {
//		isMatchDateFormat(calendar);
//		// 先将字符串类型的日期转换为Calendar类型
//		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
//		Date date = sdf.parse(calendar);
//		Calendar ca = Calendar.getInstance();
//		ca.setTime(date);
//		if (ca.get(Calendar.DAY_OF_WEEK) == 1 || ca.get(Calendar.DAY_OF_WEEK) == 7) {
//			return true;
//		}
//		return false;
//	}
//
//	/**
//	 * 判断是否是需要额外补班的周末
//	 * 
//	 * @param calendar
//	 * @return
//	 * @throws Exception
//	 */
//	public static boolean isExtraWorkday(String calendar) throws Exception {
//		isMatchDateFormat(calendar);
//		if (extraWorkdays.contains(calendar)) {
//			return true;
//		}
//		return false;
//	}
//
//	/**
//	 * 判断是否是休息日（包含法定节假日和不需要补班的周末）
//	 * 
//	 * @param calendar
//	 * @return
//	 * @throws Exception
//	 */
//	public static boolean isHoliday(String calendar) throws Exception {
//		isMatchDateFormat(calendar);
//		// 首先法定节假日必定是休息日
//		if (isLawHoliday(calendar)) {
//			return true;
//		}
//		// 排除法定节假日外的非周末必定是工作日
//		if (!isWeekends(calendar)) {
//			return false;
//		}
//		// 所有周末中只有非补班的才是休息日
//		if (isExtraWorkday(calendar)) {
//			return false;
//		}
//		return true;
//	}
//
//	/**
//	 * 判断是否是工作日
//	 * 
//	 * @param calendar
//	 * @return
//	 * @throws Exception
//	 */
//	public static boolean isWorkday(String calendar) throws Exception {
//		isMatchDateFormat(calendar);
//		return !(isHoliday(calendar));
//	}

	/**
	 * 使用正则表达式匹配日期格式
	 * 
	 * @throws Exception
	 */
	private static void isMatchDateFormat(String calendar) throws Exception {
		Pattern pattern = Pattern.compile("\\d{4}-\\d{2}-\\d{2}");
		Matcher matcher = pattern.matcher(calendar);
		boolean flag = matcher.matches();
		if (!flag) {
			throw new Exception("输入日期格式不正确，应该为2017-02-03");
		}
	}

	/**
	 * @throws Exception
	 *****************************************************************/
	/**
	 * 判断是否是法定假日
	 */
	public  boolean isLawHoliday(String calendar) throws Exception {
		isMatchDateFormat(calendar);
		int type = cwaDateHolidayService.getDateType(calendar);
		if (type == 3) {
			return true;
		}
		return false;
	}
	
	/**
	 * 判断是否是周末
	 * 
	 * @param calendar
	 * @return
	 * @throws ParseException
	 */
	public  boolean isWeekends(String calendar) throws Exception {
		isMatchDateFormat(calendar);
		int type = cwaDateHolidayService.getDateType(calendar);
		if (type == 2) {
			return true;
		}
		return false;
	}
	
	/**
	 * 判断是否是休息日（包含法定节假日和不需要补班的周末）
	 */
	public  boolean isHoliday(String calendar) throws Exception {
		isMatchDateFormat(calendar);
		if (isLawHoliday(calendar)) {
			return true;
		}
		if (isWeekends(calendar)) {
			return true;
		}
		return false;
	}
	
	/**
	 * 判断是否是工作日
	 */
	public  boolean isWorkday(String calendar) throws Exception {
		isMatchDateFormat(calendar);
		return !(isHoliday(calendar));
	}
	
	public  int getOneDayIsHoliday(long time) throws Exception {
		String date = DateUtil.format(time, "yyyy-MM-dd");
		if (isWorkday(date)) {
			return 0;
		}
		if (isLawHoliday(date)) {
			return 2;
		}
		return 1;
	}

	/**
	 * 查询一段时间内除法定节假日（不含周末）外有多少天
	 * 
	 * isholiday:1 除法定节假日，2:仅除开法定节假日（不含周末），3或其他不除开
	 * 
	 * @throws Exception
	 */
	public  double getOverTimeLong(long starttime, long endtime, int isholiday) throws Exception {
		double timeLong = 0.0d;
		if (isholiday == 3) {
			timeLong = getOverTimeLong1(starttime,endtime);
		} else {
			timeLong = getOverTimeLong2(starttime, endtime, isholiday);
		}
		return timeLong;
	}
	public  double getOverTimeLong1(long starttime, long endtime) throws Exception {
		double leavelength = 0.0d;
		if (endtime < starttime) {
			return 0.0d;
		}
		while (starttime <= endtime) {
			double daylength = 0.0;
			String endDay = DateUtil.format(endtime);
			String beginDay = DateUtil.format(starttime);
			if (isWorkday(beginDay)) {
				long nextDay = DateUtil.getTime(beginDay, "yyyy-MM-dd") + 32 * 3600 * 1000;
				starttime = nextDay;
				continue;
			}
			long beginDayEnd = beginDay.equals(endDay) ? endtime : DateUtil.getTime(beginDay + " 18:30", "yyyy-MM-dd HH:mm");
			long h14 = DateUtil.getTime(beginDay + " 14:00", "yyyy-MM-dd HH:mm");
			long h12 = DateUtil.getTime(beginDay + " 12:00", "yyyy-MM-dd HH:mm");
			long daytime = 0l;
			if (beginDayEnd > h12 && beginDayEnd <=h14) {
				beginDayEnd = h12;
			}
			if (starttime > h12 && starttime <=h14) {
				starttime = h14;
			}
			daytime = beginDayEnd - starttime;
			daytime = daytime <=0 ? 0 :daytime; 
			if (starttime <= h12 && beginDayEnd >= h14) {
				daytime = daytime - 2 * 3600 * 1000;
			} 
			if (daytime < 4 * 3600*1000) {
				daylength = 0.0d;
			} else if (daytime < 8*3600*1000) {
				daylength = 0.5d;
			}else {
				daylength = 1.0d;
			}
			leavelength += daylength;
			long nextDay = DateUtil.getTime(beginDay, "yyyy-MM-dd") + 32 * 3600 * 1000;
			starttime = nextDay;
		}
		return leavelength;
	}
	
	
	public  double getOverTimeLong2(long starttime, long endtime, int type) throws Exception {
		double leavelength = 0.0d;
		if (endtime < starttime) {
			return 0.0d;
		}
		while (starttime <= endtime ) {
			double daylength = 0.0;
			String endDay = DateUtil.format(endtime);
			String beginDay = DateUtil.format(starttime);
			if (isHoliday(beginDay)&& type == 1) {
				long nextDay = DateUtil.getTime(beginDay, "yyyy-MM-dd") + 32 * 3600 * 1000;
				starttime = nextDay;
				continue;
			}
			long beginDayEnd = beginDay.equals(endDay) ? endtime : DateUtil.getTime(beginDay + " 18:30", "yyyy-MM-dd HH:mm");
			long h14 = DateUtil.getTime(beginDay + " 14:00", "yyyy-MM-dd HH:mm");
			long h12 = DateUtil.getTime(beginDay + " 12:00", "yyyy-MM-dd HH:mm");
			long daytime = 0l;
			if (beginDayEnd > h12 && beginDayEnd <=h14) {
				beginDayEnd = h12;
			}
			if (starttime > h12 && starttime <=h14) {
				starttime = h14;
			}
			daytime = beginDayEnd - starttime;
			daytime = daytime <=0 ? 0 :daytime; 
			if (starttime <= h12 && beginDayEnd >= h14) {
				daytime = daytime - 2 * 3600 * 1000;
			} 
			if (daytime > 4 * 3600*1000) {
				daylength = 1.0d;
			} else if (daytime > 0) {
				daylength = 0.5d;
			} else {
				daylength = 0.0d;
			}
			leavelength += daylength;
			long nextDay = DateUtil.getTime(beginDay, "yyyy-MM-dd") + 32 * 3600 * 1000;
			starttime = nextDay;
		}
		return leavelength;
	}
	
	public  double getTimeByLeave(String beginDay,String startDay,String endDay,int endH,int beginH) {
		if (startDay.equals(endDay)) {
			if (endH >= 14) {
				endH = endH - 2;
			}
			if (beginH >= 14) {
				beginH = beginH - 2;
			}
			if (endH - beginH > 4) {
				return 1.0d;
			} else if (endH - beginH > 0) {
				return 0.5d;
			} else {
				return 0.0d;
			}
		} else if (beginDay.equals(startDay)) {
			if (beginH < 12) {
				return 1.0d;
			} else if (beginH < 18){
				return 0.5d;
			} else {
				return 0.0d;
			}
		} else if (beginDay.equals(endDay)) {
			if (endH > 15) {
				return 1.0d;
			} else if (endH > 9) {
				return 0.5d;
			} else {
				return 0.0d;
			}
		} else {
			return 1.0d;
		}
	}
	public  int getMonthHasWorkday(String month) throws Exception {
		long time = DateUtil.nowTime();
		String thismonth = DateUtil.format(time, "yyyy-MM");
		int day = 0;
		if (thismonth.equals(month)) {
			day = Integer.parseInt(DateUtil.format(time, "dd")) - 1;
		} else {
			day = getMaxDayByYearMonth(month);
		}
		int sum = 0;
		for (int i = 1; i <= day; i++) {
			String date = month + "-" + String.format("%02d", i);
			if (isWorkday(date)) {
				sum++;
			}
		}
		return sum;
	}
	
	public int getHasWorkday(String month,long starttime) throws Exception {
		String m = DateUtil.format(starttime, "yyyy-MM");
		long mstart = DateUtil.parse(m, "yyyy-MM").getTime();
		long monthstart = DateUtil.parse(month, "yyyy-MM").getTime();
		if (mstart > monthstart) {
			return 0;
		}
		if (mstart < monthstart) {
			return getMonthHasWorkday(month);
		}
		int startday = Integer.parseInt(DateUtil.format(starttime, "dd"));
		int endday = DateUtil.getMaxDayNum(month);
		int sum = 0;
		for (int i = startday; i <= endday; i++) {
			String date = month + "-" + String.format("%02d", i);
			if (isWorkday(date)) {
				sum++;
			}
		}
		return sum;
	}
	

	public static int getMaxDayByYearMonth(int year, int month) {
		Calendar calendar = Calendar.getInstance();
		calendar.set(Calendar.YEAR, year);
		calendar.set(Calendar.MONTH, month - 1);
		return calendar.getActualMaximum(Calendar.DATE);
	}

	public static int getMaxDayByYearMonth(String month) {
		String[] m = month.split("-");
		int year = Integer.parseInt(m[0]);
		int mon = Integer.parseInt(m[1]);
		return getMaxDayByYearMonth(year, mon);
	}
	
	/**
	 * 
	 * 获取month月第n个工作日
	 */
	public String getMonthThWorkDay(String month,int n) throws Exception{
		for (int i = 1; i <= DateUtil.lastDayOfMonth(month, "yyyy-MM"); i++){
			String date = month + "-" + String.format("%02d", i);
			if (isWorkday(date)){
				n--;
				if (n == 0) {
					return date;
				}
			}
		}
		return null;
	}
	
	public static void main(String[] args) throws Exception {
	}
}
