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
import com.ecaray.ecms.dao.mapper.cwa.CwaLeaveMapper;
import com.ecaray.ecms.dao.mapper.news.PortalFilesMapper;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.cwa.CwaDeptAdmin;
import com.ecaray.ecms.entity.cwa.CwaLeave;
import com.ecaray.ecms.entity.news.PortalFiles;
import com.ecaray.ecms.entity.process.ProcessBase;
import com.ecaray.ecms.entity.process.SysNodes;
import com.ecaray.ecms.entity.process.SysProDone;
import com.ecaray.ecms.entity.process.SysProcess;
import com.ecaray.ecms.services.authority.UserService;
import com.ecaray.ecms.services.cwa.CwaAttendanceService;
import com.ecaray.ecms.services.cwa.CwaProcessService;
import com.ecaray.ecms.services.cwa.CwaProcessVoService;
import com.ecaray.ecms.services.cwa.CwaUserHolidayService;
import com.ecaray.ecms.services.processes.BaseProcessService;
import com.ecaray.ecms.services.processes.ProcessSettingService;

@Service
public class LeaveProcess extends BaseProcessService {

	@Autowired
	private UserService userService;
	@Autowired
	private CwaLeaveMapper cwaLeaveMapper;
	@Autowired
	private CwaUserHolidayService cwaUserHolidayService;
	@Autowired
	private CwaAttendanceService cwaAttendanceService;
	@Autowired
	private CwaProcessVoService cwaProcessVoService;
	@Autowired
	private CwaDeptAdminMapper cwaDeptAdminMapper;
	@Autowired
	private ProcessSettingService processSettingService;
	@Autowired
	private PortalFilesMapper portalFilesMapper;
	@Autowired
	private CwaProcessService cwaProcessService;
	@Autowired
	private LeaveCalender leaveCalender;

	private static boolean isSendTodoMail = true;

	private static String title = "请假申请";

	/**
	 * 设置流程标题
	 */
	public ProcessBase setTitle(ProcessBase process) {
		CwaLeave leave = (CwaLeave) process;
		long starttime = leave.getStartTime();
		long endtime = leave.getEndTime();
		String titlestart = DateUtil.format(starttime, timeFormat);
		String titleend = DateUtil.format(endtime, timeFormat);
		leave.setTitle(title + "（" + titlestart + "至" + titleend + "）");
		if (StrUtils.isNull(leave.getId())) {
			leave.setId(DataUtil.uuidData());
		}
		return leave;
	}

	/**
	 * 设置待办邮件相关参数
	 */
	@Override
	public SysProcess setTodoMailInfo(ProcessBase pro, SysProcess process) {
		process.setSendMail(isSendTodoMail);
		if (isSendTodoMail) {
			return sendTodoMailInfo(pro, process);
		}
		return process;
	}

	/**
	 * 启动流程成功回调
	 */
	@Override
	@Transactional
	public void startProcessCallBack(ProcessBase pro) throws Exception {
		CwaLeave leave = (CwaLeave) pro;
		cwaUserHolidayService.updateUserHoliday(leave);
		cwaAttendanceService.translateCwaToAttendance(leave);
		leave.setStatus(1);
		saveProcessObject(leave);
	}

	/**
	 * 获取流程流转参数
	 * @throws Exception 
	 */
	@Override
	public Map<String, Object> getProcessRotaParam(SysProDone done, SysProcess process) throws Exception {
		int result = done.getResult();
		String leaveId = process.getRelId();
		String userId = process.getUserId();
		CwaLeave leave = getCwaLeaveById(leaveId);
		if (result == 2) {
			ValiResult voliResult = cwaProcessService.validateTimeForCwa(leave);
			if (!voliResult.getCode()) {
				throw new ProcessSubmitException(voliResult.getMsg());
			}
			cwaUserHolidayService.updateUserHoliday(leave);
			cwaAttendanceService.translateCwaToAttendance(leave);
		}
		Integer isleader = cwaProcessVoService.getUserOneManager(userId);
		Map<String, Object> map = new HashMap<>();
		map.put("date", leave.getTimeLength());
		map.put("isleader", isleader);
		return map;
	}

	/**
	 * 获取请假单详情
	 */
	@Override
	public ProcessBase getObjectByProcess(SysProcess process) {
		return getCwaLeaveById(process.getRelId());
	}
	
	/**
	 * 已驳回
	 */
	@Override
	public void rejectProcessCallBack(SysProDone done, ProcessBase pro, SysProcess process) throws Exception {
		CwaLeave leave = (CwaLeave) pro;
		updateCwaLeave(leave);
		sendResultMail(done, process, "被驳回");
		leave.setTimeLength(-1 * leave.getTimeLength());
		cwaUserHolidayService.updateUserHoliday(leave);
	}
	
	/**
	 * 已通过
	 */
	@Override
	public void agreeProcessCallBack(SysProDone done,ProcessBase pro,SysProcess process) throws Exception {
		CwaLeave leave = (CwaLeave) pro;
		pro.setStatus(2);
		updateCwaLeave(leave);
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
	
	/**
	 * 已取消
	 * @throws Exception 
	 */
	@Transactional
	@Override
	public void cancelProcessCallBack(ProcessBase pro,SysProcess process) throws Exception {
		CwaLeave leave = (CwaLeave) pro;
		updateCwaLeave(leave);
	}
	
	/**
	 * 审批中
	 * @throws Exception 
	 */
	@Override
	public void rotaingProcessCallBack(ProcessBase pro,SysProcess process) throws Exception {
		CwaLeave leave = (CwaLeave) pro;
		updateCwaLeave(leave);
	}

	
	/**
	 * 获取请假对象
	 */
	public CwaLeave getCwaLeaveById(String id) {
		CwaLeave l = new CwaLeave();
		l = cwaLeaveMapper.selectByPrimaryKey(id);
		l.setUserName(userService.getUserById(l.getUserId()).getRealname());
		if (StrUtils.isNotNull(l.getAgentId())) {
			l.setAgentName(userService.getUserById(l.getAgentId()).getRealname());
		}
		List<PortalFiles> files = portalFilesMapper.selectListByPortalId(l.getId());
		l.setFiles(files);
		return l;
	}

	
	@Override
	public ProcessBase bindingParamByMap(Map<String, Object> paramap) throws Exception {
		CwaLeave leave = new CwaLeave();
		return map2O(paramap,leave);
	}
	
	/**
	 * 保存请假审批内容
	 */
	public String saveProcessObject(ProcessBase pro) {
		CwaLeave cwaLeave = (CwaLeave) pro;
		Long now = DateUtil.nowTime();
		cwaLeave.setAddTime(now);
		cwaLeave.setUpdateTime(now);
		String id = cwaLeave.getId();
		if (StrUtils.isNull(id)) {
			id = DataUtil.uuidData();
			cwaLeave.setId(id);
		}
		cwaLeaveMapper.insertSelective(cwaLeave);
		List<PortalFiles> files = cwaLeave.getFiles();
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
	
	/**
	 * 查询请假时长
	 */
	public double getLeaveTimeLong(long starttime, long endtime) throws Exception {
		return leaveCalender.getOverTimeLong(starttime, endtime, 1);
	}

	public List<SysNodes> getSettingNodes() {
		return processSettingService.getSettingNodes(1);
	}

	public void updateCwaLeave(CwaLeave leave) throws Exception {
		if (StrUtils.isNull(leave.getId())) {
			return;
		}
		leave.setUpdateTime(DateUtil.nowTime());
		cwaLeaveMapper.updateByPrimaryKeySelective(leave);
		updateCwaAttendance(leave);
		String id = leave.getId();
		portalFilesMapper.deleteByPoralId(id);
		List<PortalFiles> files = leave.getFiles();
		for (PortalFiles file : files) {
			PortalFiles portalFile = new PortalFiles();
			portalFile.setPortalId(id);
			portalFile.setFileId(file.getFileId());
			portalFile.setFileName(file.getFileName());
			portalFilesMapper.insertSelective(portalFile);
		}
	}

	public double getUserLeavelength(String userid) {
		return cwaLeaveMapper.selectUserLeavelength(userid);
	}

	public List<CwaLeave> getLeaveListByUserId(String userId) {
		return cwaLeaveMapper.selectListByUserId(userId);
	}
}
