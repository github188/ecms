package com.ecaray.ecms.services.processes;

import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecaray.ecms.commons.utils.DateUtil;
import com.ecaray.ecms.commons.utils.StrUtils;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.cwa.CwaAttendance;
import com.ecaray.ecms.entity.cwa.CwaDeptAdmin;
import com.ecaray.ecms.entity.cwa.CwaProcess;
import com.ecaray.ecms.entity.pmo.Vo.MailVo;
import com.ecaray.ecms.entity.process.ProcessBase;
import com.ecaray.ecms.entity.process.SysProDone;
import com.ecaray.ecms.entity.process.SysProcess;
import com.ecaray.ecms.services.authority.UserService;
import com.ecaray.ecms.services.common.ParameterService;
import com.ecaray.ecms.services.cwa.CwaAttendanceService;
import com.ecaray.ecms.services.email.MailSendThread;

@Service
public abstract class BaseProcessService {

	protected String timeFormat = "yyyy-MM-dd HH:mm";
	
	@Autowired
	protected CwaAttendanceService cwaAttendanceService;
	@Autowired
	protected UserService userService;
	@Autowired
	protected ParameterService parameterService;

	public abstract ProcessBase setTitle(ProcessBase process);
	public abstract void startProcessCallBack(ProcessBase pro) throws Exception;
	public abstract Map<String, Object> getProcessRotaParam(SysProDone done, SysProcess process) throws Exception;
	public abstract ProcessBase getObjectByProcess(SysProcess process) throws Exception;
	public abstract SysProcess setTodoMailInfo(ProcessBase pro, SysProcess process) throws Exception;
	public abstract void rejectProcessCallBack(SysProDone done,ProcessBase pro, SysProcess process) throws Exception;
	public abstract void cancelProcessCallBack(ProcessBase pro, SysProcess process) throws Exception;
	public abstract void agreeProcessCallBack(SysProDone done,ProcessBase pro, SysProcess process) throws Exception;
	public abstract void rotaingProcessCallBack(ProcessBase pro, SysProcess process) throws Exception;
	public abstract String saveProcessObject(ProcessBase pro);
	
	public void updateCwaAttendance(CwaProcess process) throws Exception{
		String id = process.getId();
		Integer status = process.getStatus();
		CwaAttendance cwaAttendance = new CwaAttendance();
		cwaAttendance.setRefId(id);
		if (status != null){
			if (status == 2) { // 通过
				cwaAttendance.setStatus(2);
				cwaAttendanceService.updateCwaAttendanceByRefId(cwaAttendance);
			}
			if (status == 3 || status == 4) { //驳回或取消申请
				cwaAttendanceService.deleteCwaAttendanceByRefId(id);
			}
			long starttime = process.getStartTime();
			long endtime = process.getEndTime();
			while (starttime <= endtime) {
				long now = DateUtil.nowTime();
				String today = DateUtil.format(now);
				long tod = DateUtil.parse(today,"yyyy-MM-dd").getTime();
				String startday = DateUtil.format(starttime);
				long sd = DateUtil.parse(startday,"yyyy-MM-dd").getTime();
				if (sd < tod) {
					cwaAttendanceService.valiAttendanceAndPunchCard(process.getUserId(), startday);
				}
				starttime += 24 * 3600 *1000;
			}
		}
	}
	
	public ProcessBase bindingParamByMap(Map<String, Object> paramap) throws Exception {
		return null;
	}
	
	public ProcessBase map2O(Map<String, Object> paramap , ProcessBase leave) throws Exception {
		for (String key :paramap.keySet()) {
			String key2;
			key2 = key.replaceFirst(key.substring(0, 1), key.substring(0, 1).toUpperCase());
			Method[] ms = leave.getClass().getDeclaredMethods();
			Method[] supms = leave.getClass().getSuperclass().getDeclaredMethods();
			int strLen1 = ms.length;// 保存第一个数组长度
	        int strLen2 = supms.length;
			ms = Arrays.copyOf(ms, strLen1 + strLen2);
			System.arraycopy(supms, 0, ms, strLen1, strLen2);
			for (Method m : ms) {
				if (m.getName().contains("set" + key2)) {
					Class paramType = m.getParameterTypes()[0];
					if (paramType.getName().contains("String")) {
						m.invoke(leave,paramap.get(key) + "");
						break;
					}
					if (paramType.getName().contains("Integer")) {
						m.invoke(leave,Integer.parseInt(paramap.get(key).toString()));
						break;
					}
					if (paramType.getName().contains("Double")) {
						m.invoke(leave,Double.parseDouble(paramap.get(key).toString()));
						break;
					}
					if (paramType.getName().contains("Long")) {
						m.invoke(leave,Long.parseLong(paramap.get(key).toString()));
						break;
					}
				}
			}
		}
		return leave;
	}
	
	public SysProcess initProcess(ProcessBase pro, SysProcess process) throws Exception {
		return process;
	}
	
	public ProcessBase getObjectById(String id) throws Exception {
		SysProcess process = new SysProcess();
		process.setRelId(id);
		return getObjectByProcess(process);
	}
	
	public SysProcess sendTodoMailInfo(ProcessBase pro, SysProcess process) {
		Map<String,String> mailParam = new HashMap<>();
		String userId = process.getUserId();
		User user = userService.getUserByIdNoPassWord(userId);
		String typeName = parameterService.getName("processtype", process.getType() + "");
		String userName = user.getRealname();
		mailParam.put("type",typeName );
		mailParam.put("title",process.getTitle());
		mailParam.put("realname",userName + "  " + user.getDepName());
		mailParam.put("processId", process.getId());
		mailParam.put("processType", process.getType()+"");
		process.setMailParam(mailParam);
		process.setMailKey("processTodo");
		process.setSubject("您有一条新的"+typeName+"需要处理");
		return process;
	}
	
	public void sendResultMail(SysProDone done, SysProcess process,String status) {
		Map<String,String> mailParam = new HashMap<>();
		String typeName =  parameterService.getName("processtype", process.getType() + "");
		String handlerId = done.getHandlerId();
		String handlerName = (userService.getUserById(handlerId)).getRealname();
		String opinion = done.getOpinion();
		mailParam.put("type",typeName);
		mailParam.put("title",process.getTitle());
		mailParam.put("handler",handlerName);
		mailParam.put("time",DateUtil.format(done.getAddTime(), "yyyy-MM-dd HH:mm:ss"));
		mailParam.put("opinion",StrUtils.isNull(opinion) ? "无" :opinion);
		mailParam.put("processId", process.getId());
		mailParam.put("processType", process.getType()+"");
		mailParam.put("status", status);
		List<String> userlist = new ArrayList<>();
		userlist.add(process.getUserId());
		MailVo mailVo = new MailVo("您的"+typeName+"申请已" + status, "resultMail",userlist);
		mailVo.setParams(mailParam);
		MailSendThread.queue.offer(mailVo);
	}
	
	public void sendNoticeMail(SysProcess process,List<String> userlist) {
		String userId = process.getUserId();
		User user = userService.getUserByIdNoPassWord(userId);
		String userName = user.getRealname();
		Map<String,String> mailParam = new HashMap<>();
		String typeName =  parameterService.getName("processtype", process.getType() + "");
		mailParam.put("type",typeName);
		mailParam.put("title",process.getTitle());
		mailParam.put("realname",userName);
		mailParam.put("processId", process.getId());
		mailParam.put("processType", process.getType()+"");
		MailVo mailVo = new MailVo(userName + "的" + typeName+"申请已通过", "noticeMail",userlist);
		mailVo.setParams(mailParam);
		MailSendThread.queue.offer(mailVo);
	}
}
