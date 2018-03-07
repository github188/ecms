package com.ecaray.ecms.services.cwa.process;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecaray.ecms.commons.constant.ValiResult;
import com.ecaray.ecms.commons.exception.ProcessSubmitException;
import com.ecaray.ecms.commons.utils.DataUtil;
import com.ecaray.ecms.commons.utils.DateUtil;
import com.ecaray.ecms.commons.utils.LeaveCalender;
import com.ecaray.ecms.commons.utils.StrUtils;
import com.ecaray.ecms.dao.mapper.cwa.CwaDeptAdminMapper;
import com.ecaray.ecms.dao.mapper.cwa.CwaTravelMapper;
import com.ecaray.ecms.dao.mapper.news.PortalFilesMapper;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.cwa.CwaDeptAdmin;
import com.ecaray.ecms.entity.cwa.CwaTravel;
import com.ecaray.ecms.entity.news.PortalFiles;
import com.ecaray.ecms.entity.process.ProcessBase;
import com.ecaray.ecms.entity.process.SysNodes;
import com.ecaray.ecms.entity.process.SysProDone;
import com.ecaray.ecms.entity.process.SysProcess;
import com.ecaray.ecms.services.authority.UserService;
import com.ecaray.ecms.services.cwa.CwaAttendanceService;
import com.ecaray.ecms.services.cwa.CwaProcessService;
import com.ecaray.ecms.services.cwa.CwaProcessVoService;
import com.ecaray.ecms.services.processes.BaseProcessService;
import com.ecaray.ecms.services.processes.ProcessSettingService;

@Service
public class TravelProcess extends BaseProcessService {

	@Autowired
	private UserService userService;
	@Autowired
	private CwaTravelMapper cwaTravelMapper;
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
	private LeaveCalender leaveCalender;
	@Autowired
	private CwaProcessService cwaProcessService;

	private static boolean isSendTodoMail = true;

	private static String title = "出差申请";

	@Override
	public ProcessBase setTitle(ProcessBase pro) {
		CwaTravel travel = (CwaTravel) pro;
		long starttime = travel.getStartTime();
		long endtime = travel.getEndTime();
		String titlestart = DateUtil.format(starttime, timeFormat);
		String titleend = DateUtil.format(endtime, timeFormat);
		travel.setTitle(title + "（" + titlestart + "至" + titleend + "）");
		if (StrUtils.isNull(travel.getId())) {
			travel.setId(DataUtil.uuidData());
		}
		return travel;
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
		CwaTravel travel = (CwaTravel) pro;
		cwaAttendanceService.translateCwaToAttendance(travel);
		travel.setStatus(1);
		saveProcessObject(travel);
	}

	@Override
	public Map<String, Object> getProcessRotaParam(SysProDone done, SysProcess process) throws Exception {
		Map<String, Object> map = new HashMap<>();
		String leaveId = process.getRelId();
		CwaTravel travel = cwaTravelMapper.selectByPrimaryKey(leaveId);
		int isLeader = cwaProcessVoService.getUserOneManager(process.getUserId());
		map.put("isneed", travel.getIsNeedplane());
		map.put("isleader", isLeader);
		int result = done.getResult();
		CwaTravel leave = (CwaTravel) getObjectByProcess(process);
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
		CwaTravel travel = cwaTravelMapper.selectByPrimaryKey(process.getRelId());
		travel.setUserName(userService.getUserById(travel.getUserId()).getRealname());
		List<PortalFiles> files = portalFilesMapper.selectListByPortalId(travel.getId());
		travel.setFiles(files);
		return travel;
	}

	@Override
	public void rejectProcessCallBack(SysProDone done,ProcessBase pro, SysProcess process) throws Exception {
		CwaTravel travel = (CwaTravel) pro;
		updataCwaTravel(travel);
		sendResultMail(done, process, "被驳回");
	}

	@Override
	public void cancelProcessCallBack(ProcessBase pro, SysProcess process) throws Exception {
		CwaTravel travel = (CwaTravel) pro;
		updataCwaTravel(travel);
	}

	@Override
	public void agreeProcessCallBack(SysProDone done,ProcessBase pro, SysProcess process) throws Exception {
		CwaTravel travel = (CwaTravel) pro;
		travel.setStatus(2);
		updataCwaTravel(travel);
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
		CwaTravel travel = (CwaTravel) pro;
		updataCwaTravel(travel);
	}

	@Override
	public ProcessBase bindingParamByMap(Map<String, Object> paramap) throws Exception {
		CwaTravel leave = new CwaTravel();
		return map2O(paramap, leave);
	}

	public String saveProcessObject(ProcessBase pro) {
		CwaTravel cwaTravel = (CwaTravel) pro;
		Long now = DateUtil.nowTime();
		cwaTravel.setAddTime(now);
		cwaTravel.setUpdateTime(now);
		String id = cwaTravel.getId();
		if (StrUtils.isNull(id)) {
			id = DataUtil.uuidData();
			cwaTravel.setId(id);
		}
		cwaTravelMapper.insertSelective(cwaTravel);
		List<PortalFiles> files = cwaTravel.getFiles();
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
	 * 查询出差时长
	 * 
	 * @throws Exception
	 */
	public double getLeaveTimeLong(long starttime, long endtime) throws Exception {
		return leaveCalender.getOverTimeLong(starttime, endtime, 3);
	}

	public CwaTravel selectTravelById(String id) {
		CwaTravel l = cwaTravelMapper.selectByPrimaryKey(id);
		l.setUserName(userService.getUserById(l.getUserId()).getRealname());
		return l;
	}

	/**
	 * 查询加班时长
	 * 
	 * @throws Exception
	 */
	public double getTravelTimeLong(long starttime, long endtime) throws Exception {
		return leaveCalender.getOverTimeLong(starttime, endtime, 2);
	}

	/**
	 * 查询加班增加调休时长
	 * @throws Exception 
	 */
	public String updataCwaTravel(CwaTravel travel) throws Exception {
		long time = DateUtil.nowTime();
		travel.setUpdateTime(time);
		cwaTravelMapper.updateByPrimaryKeySelective(travel);
		updateCwaAttendance(travel);
		String id = travel.getId();
		portalFilesMapper.deleteByPoralId(id);
		List<PortalFiles> files = travel.getFiles();
		for (PortalFiles file : files) {
			PortalFiles portalFile = new PortalFiles();
			portalFile.setPortalId(id);
			portalFile.setFileId(file.getFileId());
			portalFile.setFileName(file.getFileName());
			portalFilesMapper.insertSelective(portalFile);
		}
		return travel.getId();
	}

	/**
	 * 获取合同审批可设置处理人的节点
	 */
	public List<SysNodes> getSettingNodes() {
		return processSettingService.getSettingNodes(3);
	}

	public List<CwaTravel> getListByUserId(String userId) {
		return cwaTravelMapper.selectListByUserId(userId);
	}

}
