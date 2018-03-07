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
import com.ecaray.ecms.commons.utils.StrUtils;
import com.ecaray.ecms.dao.mapper.cwa.CwaDeptAdminMapper;
import com.ecaray.ecms.dao.mapper.cwa.CwaOutSideDelMapper;
import com.ecaray.ecms.dao.mapper.news.PortalFilesMapper;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.cwa.CwaDeptAdmin;
import com.ecaray.ecms.entity.cwa.CwaOutSideDel;
import com.ecaray.ecms.entity.news.PortalFiles;
import com.ecaray.ecms.entity.process.ProcessBase;
import com.ecaray.ecms.entity.process.SysProDone;
import com.ecaray.ecms.entity.process.SysProcess;
import com.ecaray.ecms.services.authority.UserService;
import com.ecaray.ecms.services.cwa.CwaAttendanceService;
import com.ecaray.ecms.services.cwa.CwaProcessService;
import com.ecaray.ecms.services.cwa.CwaProcessVoService;
import com.ecaray.ecms.services.processes.BaseProcessService;

@Service
public class OutsideDelProcess extends BaseProcessService {

	@Autowired
	private UserService userService;
	@Autowired
	private CwaOutSideDelMapper cwaOutSideDelMapper;
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

	private static boolean isSendTodoMail = true;
	
	private static String title = "外出报备单";

	@Override
	public ProcessBase setTitle(ProcessBase pro) {
		CwaOutSideDel outsidedel = (CwaOutSideDel) pro;
		long starttime = outsidedel.getStartTime();
		long endtime = outsidedel.getEndTime();
		String titlestart = DateUtil.format(starttime, timeFormat);
		String titleend = DateUtil.format(endtime, timeFormat);
		outsidedel.setTitle(title + "（" + titlestart + "至" + titleend + "）");
		if (StrUtils.isNull(outsidedel.getId())) {
			outsidedel.setId(DataUtil.uuidData());
		}
		return outsidedel;
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
		CwaOutSideDel cwaOutSideDel = (CwaOutSideDel) pro;
		saveProcessObject(cwaOutSideDel);
		cwaAttendanceService.translateCwaToAttendance(cwaOutSideDel);
	}

	@Override
	public Map<String, Object> getProcessRotaParam(SysProDone done, SysProcess process) throws Exception {
		Map<String,Object> map = new HashMap<>();
		int result = done.getResult();
		String leaveId = process.getRelId();
		CwaOutSideDel leave = getOutSideDelById(leaveId);
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
		CwaOutSideDel cwaOutSideDel = getOutSideDelById(process.getRelId());
		List<PortalFiles> files = portalFilesMapper.selectListByPortalId(cwaOutSideDel.getId());
		cwaOutSideDel.setFiles(files);
		return cwaOutSideDel;
	}

	@Override
	public void rejectProcessCallBack(SysProDone done,ProcessBase pro, SysProcess process) throws Exception {
		CwaOutSideDel outsidedel = (CwaOutSideDel) pro;
		updateOutSideDel(outsidedel);
		sendResultMail(done, process, "被驳回");
	}

	@Override
	public void cancelProcessCallBack(ProcessBase pro, SysProcess process) throws Exception {
		CwaOutSideDel outsidedel = (CwaOutSideDel) pro;
        updateOutSideDel(outsidedel);
	}

	@Override
	public void agreeProcessCallBack(SysProDone done,ProcessBase pro, SysProcess process) throws Exception {
		CwaOutSideDel outsidedel = (CwaOutSideDel) pro;
		outsidedel.setStatus(2);
		updateOutSideDel(outsidedel);
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
		CwaOutSideDel outsidedel = (CwaOutSideDel) pro;
        updateOutSideDel(outsidedel);
	}
	
	@Override
	public ProcessBase bindingParamByMap(Map<String, Object> paramap) throws Exception {
		CwaOutSideDel leave = new CwaOutSideDel();
		map2O(paramap, leave);
		return leave;
	}
	
	
	public String saveProcessObject(ProcessBase pro) {
		CwaOutSideDel cwaOutSideDel = (CwaOutSideDel)pro;
		String delId = cwaOutSideDel.getId();
		if (StrUtils.isNull(delId)) {
			delId = DataUtil.uuidData();
			cwaOutSideDel.setId(delId);
		}
		saveCwaOutSideDel(cwaOutSideDel);
		return cwaOutSideDel.getId();
	}
	
	public String updateOutSideDel(CwaOutSideDel outsidedel) throws Exception {
		long time = DateUtil.nowTime();
		outsidedel.setUpdateTime(time);
		cwaOutSideDelMapper.updateByPrimaryKeySelective(outsidedel);
		updateCwaAttendance(outsidedel);
		return outsidedel.getId();
	}
	
	
	private CwaOutSideDel getOutSideDelById(String relId) {
		CwaOutSideDel cwaOutSideDel = cwaOutSideDelMapper.selectByPrimaryKey(relId);
		cwaOutSideDel.setUserName(userService.getUserById(cwaOutSideDel.getUserId()).getRealname());
		return cwaOutSideDel;
	}
	
	/**
	 * 持久化
	 */
	public void saveCwaOutSideDel(CwaOutSideDel del) {
		String id = del.getId();
		if (StrUtils.isNull(id)) {
			id = DataUtil.uuidData();
			del.setId(id);
		}
		long time = DateUtil.nowTime();
		del.setAddTime(time);
		del.setUpdateTime(time);
		cwaOutSideDelMapper.insertSelective(del);
		List<PortalFiles> files = del.getFiles();
		if (files != null) {
			for (PortalFiles file : files) {
				PortalFiles portalFile = new PortalFiles();
				portalFile.setPortalId(id);
				portalFile.setFileId(file.getFileId());
				portalFile.setFileName(file.getFileName());
				portalFilesMapper.insertSelective(portalFile);
			}
		}
	}
	
	/**
	 * 更新
	 */
	public void updateCwaOutSideDel(CwaOutSideDel del) {
		String id = del.getId();
		if (StrUtils.isNull(id)) {
			id = DataUtil.uuidData();
			del.setId(id);
		}
		long time = DateUtil.nowTime();
		del.setAddTime(time);
		del.setUpdateTime(time);
		cwaOutSideDelMapper.updateByPrimaryKeySelective(del);
		portalFilesMapper.deleteByPoralId(id);
		List<PortalFiles> files = del.getFiles();
		for (PortalFiles file : files) {
			PortalFiles portalFile = new PortalFiles();
			portalFile.setPortalId(id);
			portalFile.setFileId(file.getFileId());
			portalFile.setFileName(file.getFileName());
			portalFilesMapper.insertSelective(portalFile);
		}
	}
	
	public List<CwaOutSideDel> getOutSideDelListByUserId(String userId) {
		return cwaOutSideDelMapper.selectListByUserId(userId);
	}
	public List<CwaOutSideDel> getOutSideDelListByOutId(String OutId) {
		return cwaOutSideDelMapper.selectListByOutId(OutId);
	}
}
