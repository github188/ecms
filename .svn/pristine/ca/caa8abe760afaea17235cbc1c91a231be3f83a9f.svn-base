package com.ecaray.ecms.services.cwa.process;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecaray.ecms.commons.utils.DataUtil;
import com.ecaray.ecms.commons.utils.DateUtil;
import com.ecaray.ecms.commons.utils.StrUtils;
import com.ecaray.ecms.dao.mapper.cwa.CwaHolidayBlanceMapper;
import com.ecaray.ecms.dao.mapper.cwa.CwaUserConfirmMapper;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.cwa.CwaAttReport;
import com.ecaray.ecms.entity.cwa.CwaUserConfirm;
import com.ecaray.ecms.entity.process.ProcessBase;
import com.ecaray.ecms.entity.process.SysProDone;
import com.ecaray.ecms.entity.process.SysProcess;
import com.ecaray.ecms.services.cwa.CwaReportService;
import com.ecaray.ecms.services.processes.BaseProcessService;

@Service
public class CwaConfirmProcess extends BaseProcessService{

	@Autowired
	CwaUserConfirmMapper cwaUserConfirmMapper;
	@Autowired
	CwaReportService cwaReportService;
	@Autowired
	CwaHolidayBlanceMapper cwaHolidayBlanceMapper;
	
	private boolean isSendTodoMail = true;
	
	@Override
	public ProcessBase setTitle(ProcessBase process) {
		CwaUserConfirm cwaUserConfirm = (CwaUserConfirm) process;
		User user = userService.getUserById(cwaUserConfirm.getUserId());
		String userName = user.getRealname();
		String month = cwaUserConfirm.getMonth();
		cwaUserConfirm.setTitle(userName + month + "月考勤确认");
		cwaUserConfirm.setId(DataUtil.uuidData());
		return cwaUserConfirm;
	}

	@Override
	public void startProcessCallBack(ProcessBase pro) throws Exception {
		CwaUserConfirm cwaUserConfirm = (CwaUserConfirm) pro;
		cwaUserConfirm.setStatus(1);
		saveProcessObject(pro);
	}

	@Override
	public Map<String, Object> getProcessRotaParam(SysProDone done, SysProcess process) throws Exception {
		return new HashMap<>();
	}

	@Override
	public ProcessBase getObjectByProcess(SysProcess process) throws Exception {
		String id = process.getRelId();
		return cwaUserConfirmMapper.selectByPrimaryKey(id);
	}

	@Override
	public SysProcess setTodoMailInfo(ProcessBase pro, SysProcess process) throws Exception {
		process.setSendMail(isSendTodoMail);
		if (isSendTodoMail) {
			return sendTodoMailInfo(pro, process);
		}
		return process;
	}

	@Override
	public void rejectProcessCallBack(SysProDone done, ProcessBase pro, SysProcess process) throws Exception {
		
	}

	@Override
	public void cancelProcessCallBack(ProcessBase pro, SysProcess process) throws Exception {
		
	}

	@Override
	public void agreeProcessCallBack(SysProDone done, ProcessBase pro, SysProcess process) throws Exception {
		CwaUserConfirm cwaUserConfirm = (CwaUserConfirm) pro;
		cwaUserConfirm.setStatus(2);
		cwaUserConfirmMapper.updateByPrimaryKeySelective(cwaUserConfirm);
		CwaAttReport report = new CwaAttReport();
		report.setUserId(cwaUserConfirm.getUserId());
		report.setDate(cwaUserConfirm.getMonth());
		report = cwaReportService.getUserReport(cwaUserConfirm.getUserId(), cwaUserConfirm.getMonth());
		report.setStatus(2);
		cwaReportService.update(report);
	}

	@Override
	public void rotaingProcessCallBack(ProcessBase pro, SysProcess process) throws Exception {
		
	}

	@Override
	public String saveProcessObject(ProcessBase pro) {
		CwaUserConfirm c = (CwaUserConfirm) pro;
		long time = DateUtil.nowTime();
		c.setUpdateTime(time);
		String id = c.getId();
		if (StrUtils.isNull(id)){
			id = DataUtil.uuidData();
			c.setId(id);
		}
		cwaUserConfirmMapper.insertSelective(c);
		return id;
	}
	
	
}
