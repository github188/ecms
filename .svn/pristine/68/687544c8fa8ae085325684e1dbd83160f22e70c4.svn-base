package com.ecaray.ecms.services.cwa;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.ecaray.ecms.commons.utils.HttpUtil;
import com.ecaray.ecms.commons.utils.LeaveCalender;
import com.ecaray.ecms.commons.utils.ParaMap;
import com.ecaray.ecms.commons.utils.StrUtils;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.cwa.CwaAttReport;
import com.ecaray.ecms.entity.cwa.CwaPunchCard;
import com.ecaray.ecms.entity.cwa.PunchCard;
import com.ecaray.ecms.entity.cwa.vo.CwaAttendanceVo;
import com.ecaray.ecms.services.authority.DeptService;
import com.ecaray.ecms.services.authority.UserService;

@Service
public class CwaPunchCardService {

	@Value("${cwa.url}")
	private String url;

	@Value("${cwa.md5}")
	private String md5key;

	@Autowired
	CwaUserHolidayService cwaUserHolidayService;
	@Autowired
	CwaReportService cwaReportService;
	@Autowired
	UserService userService;
	@Autowired
	DeptService deptService;
	@Autowired
	CwaAttendanceService cwaAttendanceService;
	@Autowired
	LeaveCalender leaveCalender;

	/**
	 * 人事平台-月汇总信息
	 */
	public JSONObject getUserMonthTotal(CwaAttendanceVo vo, User user) throws Exception {
		String userId = vo.getUserId();
		String month = vo.getMonth();
		String name = user.getRealname();
		ParaMap param = new ParaMap();
		param.put("name", name);
		param.put("month", month);
		JSONObject o = getPunchCardMonthTotal(param);
		double annual = cwaUserHolidayService.getUserHolidayByType(4, userId);
		double takeoff = cwaUserHolidayService.getUserHolidayByType(5, userId);
		o.put("annual", annual);
		o.put("takeoff", takeoff);
		CwaAttReport report = cwaReportService.getUserReport(userId, month);
		o.put("report", report);
		User u = userService.getUserById(userId);
		o.put("workday", leaveCalender.getHasWorkday(month, u.getCreateTime()));
		return o;
	}
	
	/**
	 * 查询某人月打卡记录列表
	 */
	@SuppressWarnings("unchecked")
	public ParaMap listPunchCardRecordByMonth(String userName, String month) throws Exception {
		ParaMap param = new ParaMap();
		param.put("name", userName);
		param.put("month", month);
		JSONObject o = getPunchCardData("getUserRecordByMonth", param);
		List<JSONObject> dataList = (List<JSONObject>) o.get("list");
		if (dataList == null) {
			return null;
		}
		ParaMap dateMap = new ParaMap();
		for (JSONObject jsonO : dataList) {
			String date = jsonO.getString("date");
			dateMap.put(date, jsonO);
		}
		return dateMap;
	}

	/**
	 * 查询打卡记录列表
	 */
	@SuppressWarnings("unchecked")
	public JSONObject getPunchCardList(CwaPunchCard pc, User user) throws Exception {
		String userId = user.getId();
		String depId = pc.getDepId();
		List<String> depList = cwaReportService.listDepIdByUserRole(userId, depId);
		if (depList != null && depList.size() > 0) {
			pc.setDepList(depList);
		}
		List<User> list = userService.getUserList(pc);
		for (User u :list) {
			u.setDepName(deptService.getAllDept(new StringBuffer(""), Long.parseLong(u.getDepId())));
		}
		ParaMap nameMap = new ParaMap();
		StringBuffer sbf = new StringBuffer("");
		for (int i = 0; i < list.size(); i++) {
			String name = list.get(i).getRealname();
			sbf.append(name);
			if (i < list.size() - 1) {
				sbf.append("-");
			}
			String depName = list.get(i).getDepName();
			String address = list.get(i).getAddress();
			String cwaName = list.get(i).getCwaName();
			nameMap.put(name, name + ":" + depName + ":" + address + ":" + cwaName);
		}
		ParaMap param = new ParaMap();
		if (StrUtils.isNotNull(sbf.toString())) {
			param.put("namelist", sbf.toString());
		}
		if (StrUtils.isNotNull(pc.getDate())) {
			param.put("date", pc.getDate());
		}
		if (StrUtils.isNotNull(pc.getFbegin())) {
			param.put("fbegin", pc.getFbegin());
		}
		if (StrUtils.isNotNull(pc.getFend())) {
			param.put("fend", pc.getFend());
		}
		if (StrUtils.isNotNull(pc.getLbegin())) {
			param.put("lbegin", pc.getLbegin());
		}
		if (StrUtils.isNotNull(pc.getLend())) {
			param.put("lend", pc.getLend());
		}
		param.put("ispage", 1);
		param.put("pageSize", pc.getPageSize());
		param.put("pageIndex", pc.getPageNum());
		JSONObject o = getDayPunshCardRecord(param);
		List<JSONObject> objlist = (List<JSONObject>) o.get("list");
		if (objlist != null) {
			for (JSONObject obj : objlist) {
				String n = obj.getString("name");
				if (nameMap.getString(n) != null) {
					String[] userstr = nameMap.getString(n).split(":");
					obj.put("depName", userstr[1]);
					obj.put("address", userstr[2]);
					obj.put("cwaName", userstr[3]);
				}
			}
		}
		o.put("pages", (o.getInteger("totals") == 0 ? 1 : (o.getInteger("totals") / pc.getPageSize()) + 1));
		o.put("pageIndex", pc.getPageNum());
		return o;
	}
	
	/**
	 * 查询某天打卡记录
	 */
	public ParaMap getUserPunchDataByDate(List<User> list,String date) throws Exception{
		ParaMap paramMap = new ParaMap();
		ParaMap userMap = new ParaMap();
		StringBuffer sbf = new StringBuffer();
		for (int i = 0; i < list.size(); i++) {
			String name = list.get(i).getRealname();
			String id = list.get(i).getId();
			userMap.put(name, id);
			sbf.append(name);
			if (i < list.size() - 1) {
				sbf.append("-");
			}
		}
		paramMap.put("namelist", sbf);
		paramMap.put("date",date);
		JSONObject o = getDayPunshCardRecord(paramMap);
		ParaMap resultMap = new ParaMap();
		List<JSONObject> objlist = (List<JSONObject>) o.get("list");
		if (objlist != null) {
			for (JSONObject obj : objlist) {
				String name = obj.getString("name");
				String id = userMap.getString(name);
				String fristtime = obj.getString("fristTime");
				String lasttime = obj.getString("lastTime");
				PunchCard punchCard = new PunchCard();
				punchCard.setDate(date);
				punchCard.setUserId(id);
				punchCard.setFristtime(fristtime);
				punchCard.setLasttime(lasttime);
				resultMap.put(id, punchCard);
			}
		}
		return resultMap;
	}
	
	/**
	 * 获取个人某月打卡记录汇总
	 */
	private JSONObject getPunchCardMonthTotal(ParaMap param) throws Exception {
		return getPunchCardData("getUserMonthRecordCount", param);
	}

	/**
	 * 获取个人某月打卡记录
	 */
	private JSONObject getDayPunshCardRecord(ParaMap param) throws Exception {
		return getPunchCardData("getDayPunshCardRecord", param);
	}

	/**
	 * 打卡记录接口
	 */
	public JSONObject getPunchCardData(String method, ParaMap map) throws Exception {
		map.put("module", "sys");
		map.put("service", "PunchCard");
		map.put("method", method);
		HttpUtil.sign(map, md5key);
		String str = HttpUtil.get(url, map);
		JSONObject o = JSON.parseObject(str);
		return o;
	}
}
