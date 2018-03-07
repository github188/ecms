package com.ecaray.ecms.services.cwa.process;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecaray.ecms.commons.constant.ValiResult;
import com.ecaray.ecms.commons.exception.ProcessSubmitException;
import com.ecaray.ecms.commons.utils.DataUtil;
import com.ecaray.ecms.commons.utils.DateUtil;
import com.ecaray.ecms.commons.utils.LeaveCalender;
import com.ecaray.ecms.commons.utils.StrUtils;
import com.ecaray.ecms.dao.mapper.cwa.CwaDeptAdminMapper;
import com.ecaray.ecms.dao.mapper.cwa.CwaOverTimeMapper;
import com.ecaray.ecms.dao.mapper.news.PortalFilesMapper;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.cwa.CwaDeptAdmin;
import com.ecaray.ecms.entity.cwa.CwaOverTime;
import com.ecaray.ecms.entity.news.PortalFiles;
import com.ecaray.ecms.entity.process.ProcessBase;
import com.ecaray.ecms.entity.process.SysProDone;
import com.ecaray.ecms.entity.process.SysProcess;
import com.ecaray.ecms.services.authority.UserService;
import com.ecaray.ecms.services.cwa.CwaAttendanceService;
import com.ecaray.ecms.services.cwa.CwaProcessService;
import com.ecaray.ecms.services.cwa.CwaProcessVoService;
import com.ecaray.ecms.services.cwa.CwaUserHolidayService;
import com.ecaray.ecms.services.processes.BaseProcessService;

@Service
public class OverTimeProcess extends BaseProcessService {

	@Autowired
	private UserService userService;
	@Autowired
	private CwaOverTimeMapper cwaOverTimeMapper;
	@Autowired
	private CwaUserHolidayService cwaUserHolidayService;
	@Autowired
	private CwaAttendanceService cwaAttendanceService;
	@Autowired
	private CwaProcessVoService cwaProcessVoService;
	@Autowired
	private CwaDeptAdminMapper cwaDeptAdminMapper;
	@Autowired
	private PortalFilesMapper portalFilesMapper;
	@Autowired
	private CwaProcessService cwaProcessService;
	
	@Autowired
	private LeaveCalender leaveCalender;


	private static boolean isSendTodoMail = true;

	private static String title = "加班申请";

	@Override
	public ProcessBase setTitle(ProcessBase pro) {
		CwaOverTime overtime = (CwaOverTime) pro;
		long starttime = overtime.getStartTime();
		long endtime = overtime.getEndTime();
		String titlestart = DateUtil.format(starttime, timeFormat);
		String titleend = DateUtil.format(endtime, timeFormat);
		overtime.setTitle(title + "（" + titlestart + "至" + titleend + "）");
		if (StrUtils.isNull(overtime.getId())) {
			overtime.setId(DataUtil.uuidData());
		}
		return overtime;
	}

	@Override
	public SysProcess setTodoMailInfo(ProcessBase pro, SysProcess process) {
		process.setSendMail(isSendTodoMail);
		if (isSendTodoMail) {
			return sendTodoMailInfo(pro, process);
		}
		return process;
	}

	@Override
	public void startProcessCallBack(ProcessBase pro) throws Exception {
		CwaOverTime overtime = (CwaOverTime) pro;
		cwaAttendanceService.translateCwaToAttendance(overtime);
		overtime.setStatus(1);
		saveProcessObject(overtime);
	}

	@Override
	public Map<String, Object> getProcessRotaParam(SysProDone done, SysProcess process) throws Exception {
		Map<String,Object> map = new HashMap<>();
		int isLeader = cwaProcessVoService.getUserOneManager(process.getUserId());
		map.put("isleader", isLeader);
		int result = done.getResult();
		CwaOverTime leave = (CwaOverTime) getObjectByProcess(process);
		if (result == 2) {
			ValiResult voliResult = cwaProcessService.validateTimeForCwa(leave);
			if (!voliResult.getCode()) {
				throw new ProcessSubmitException(voliResult.getMsg());
			}
			cwaAttendanceService.translateCwaToAttendance(leave);
		}
		return map;
	}

	@Override
	public ProcessBase getObjectByProcess(SysProcess process) {
		CwaOverTime cwaOvertime = cwaOverTimeMapper.selectByPrimaryKey(process.getRelId());
		cwaOvertime.setUserName(userService.getUserById(cwaOvertime.getUserId()).getRealname());
		List<PortalFiles> files = portalFilesMapper.selectListByPortalId(cwaOvertime.getId());
		cwaOvertime.setFiles(files);
		return cwaOvertime;
	}

	@Override
	public void rejectProcessCallBack(SysProDone done,ProcessBase pro, SysProcess process) throws Exception {
		CwaOverTime overtime = (CwaOverTime) pro;
		updataCwaOvertime(overtime);
		sendResultMail(done, process, "被驳回");
	}

	@Override
	public void cancelProcessCallBack(ProcessBase pro, SysProcess process) throws Exception {
		CwaOverTime overtime = (CwaOverTime) pro;
		updataCwaOvertime(overtime);
	}

	@Override
	@Transactional
	public void agreeProcessCallBack(SysProDone done,ProcessBase pro, SysProcess process) throws Exception {
		CwaOverTime overtime = (CwaOverTime) pro;
		overtime.setStatus(2);
		updataCwaOvertime(overtime);
		sendResultMail(done, process, "通过");
		List<String> userlist = new ArrayList<>();
		User user = userService.getUserByIdNoPassWord(process.getUserId());
		String deptId = cwaProcessVoService.getUserOneManager(user, 0);
		CwaDeptAdmin depAdmin = cwaDeptAdminMapper.selectByPrimaryDepId(deptId);
		if (depAdmin != null) {
			userlist.add(depAdmin.getUserId());
			sendNoticeMail(process,userlist);
		}
	}

	@Override
	public void rotaingProcessCallBack(ProcessBase pro, SysProcess process) throws Exception {
		CwaOverTime overtime = (CwaOverTime) pro;
		updataCwaOvertime(overtime);
	}
	
	@Override
	public ProcessBase bindingParamByMap(Map<String, Object> paramap) throws Exception {
		CwaOverTime leave = new CwaOverTime();
		return map2O(paramap,leave);
	}
	public String saveProcessObject(ProcessBase pro) {
		CwaOverTime cwaOverTime = (CwaOverTime)pro;
		Long now = DateUtil.nowTime();
		cwaOverTime.setAddTime(now);
		cwaOverTime.setUpdateTime(now);
		String id = cwaOverTime.getId();
		if (StrUtils.isNull(id)) {
			id = DataUtil.uuidData();
			cwaOverTime.setId(id);
		}
		cwaOverTimeMapper.insertSelective(cwaOverTime);
		List<PortalFiles> files = cwaOverTime.getFiles();
		if (files != null) {
			for (PortalFiles file : files) {
				PortalFiles portalFile = new PortalFiles();
				portalFile.setPortalId(id);
				portalFile.setFileId(file.getFileId());
				portalFile.setFileName(file.getFileName());
				portalFilesMapper.insertSelective(portalFile);
			}
		}
		return id;
	}
	
	public double getUserOvertimelength(String userId) {
		return cwaOverTimeMapper.selectUserOvertimelength(userId);
	}
	
	/**
	 * 查询加班时长
	 * @throws Exception 
	 */
	public double getLeaveTimeLong(long starttime,long endtime) throws Exception {
		return leaveCalender.getOverTimeLong(starttime, endtime, 3);
	}
	
	public CwaOverTime selectOvertimeById(String id) {
		CwaOverTime l =  cwaOverTimeMapper.selectByPrimaryKey(id);
		l.setSalesmanName(userService.getUserById(l.getUserId()).getRealname());
		return l;
	}
	
	/**
	 * 查询加班增加调休时长
	 */
	public double getLeaveTimeLongHoliday(long starttime,long endtime) throws Exception {
		return leaveCalender.getOverTimeLong(starttime, endtime, 2);
	}
	
	public String updataCwaOvertime(CwaOverTime overtime) throws Exception {
		long time = DateUtil.nowTime();
		overtime.setUpdateTime(time);
		cwaOverTimeMapper.updateByPrimaryKeySelective(overtime);
		updateCwaAttendance(overtime);
		String id = overtime.getId();
		portalFilesMapper.deleteByPoralId(id);
		List<PortalFiles> files = overtime.getFiles();
		for (PortalFiles file : files) {
			PortalFiles portalFile = new PortalFiles();
			portalFile.setPortalId(id);
			portalFile.setFileId(file.getFileId());
			portalFile.setFileName(file.getFileName());
			portalFilesMapper.insertSelective(portalFile);
		}
		return overtime.getId();
	}

	public List<CwaOverTime> selectListByUserId(String userId) {
		return cwaOverTimeMapper.selectListByUserId(userId);
	}
}
