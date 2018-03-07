package com.ecaray.ecms.services.processes;

import java.io.IOException;
import java.io.StringWriter;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecaray.ecms.commons.constant.DataUtil;
import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.commons.constant.ValiResult;
import com.ecaray.ecms.commons.exception.ProcessSubmitException;
import com.ecaray.ecms.commons.utils.DateUtil;
import com.ecaray.ecms.commons.utils.StrUtils;
import com.ecaray.ecms.dao.mapper.process.ProcessPathMapper;
import com.ecaray.ecms.dao.mapper.process.SysProcessMapper;
import com.ecaray.ecms.dao.process.SysProcessDao;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.ctm.CtmContract;
import com.ecaray.ecms.entity.cwa.CwaCorrect;
import com.ecaray.ecms.entity.cwa.CwaException;
import com.ecaray.ecms.entity.cwa.CwaLeave;
import com.ecaray.ecms.entity.cwa.CwaProcess;
import com.ecaray.ecms.entity.news.PortalProcess;
import com.ecaray.ecms.entity.pmo.Vo.MailVo;
import com.ecaray.ecms.entity.process.ProcessBase;
import com.ecaray.ecms.entity.process.SysNodes;
import com.ecaray.ecms.entity.process.SysProDoing;
import com.ecaray.ecms.entity.process.SysProDone;
import com.ecaray.ecms.entity.process.SysProFilter;
import com.ecaray.ecms.entity.process.SysProcess;
import com.ecaray.ecms.entity.process.Vo.DoneResultVo;
import com.ecaray.ecms.entity.process.Vo.ProcessDetails;
import com.ecaray.ecms.services.authority.UserService;
import com.ecaray.ecms.services.ctm.CtmContractService;
import com.ecaray.ecms.services.cwa.CwaProcessService;
import com.ecaray.ecms.services.cwa.CwaUserHolidayService;
import com.ecaray.ecms.services.cwa.process.CwaExceptionProcess;
import com.ecaray.ecms.services.email.MailSendThread;
import com.ecaray.ecms.services.news.PortalProcessService;
import com.ecaray.ecms.services.processes.base.FindNodesPersonService;
import com.ecaray.ecms.services.processes.base.SysNodeAttrService;
import com.ecaray.ecms.services.processes.base.SysNodesService;
import com.ecaray.ecms.services.processes.base.SysProDoingService;
import com.ecaray.ecms.services.processes.base.SysProDoneService;

import freemarker.cache.StringTemplateLoader;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;

@Service
public class ProcessService {

	@Autowired
	private SysProcessMapper sysProcessMapper;
	
	@Autowired
	private SysProcessService processService;
	
	@Autowired
	private SysNodesService sysNodesService;
	
	@Autowired
	private SysProDoingService sysProDoingService;
	
	@Autowired
	private SysProDoneService sysProDoneService;
	
	@Autowired
	private FindNodesPersonService findNodesPersonService;
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private ProcessPathMapper processPathMapper;

	@Autowired
	private SysProcessDao dao;
	
	private String process_result = "true";
	
	/**************/
	
	
	@Autowired
	private PortalProcessService portalProcessService;
	@Autowired
	private CwaProcessService cwaProcessService;
	
	@Autowired
	private CtmContractService ctmContractService;
	
	@Autowired
	private SysNodeAttrService sysNodeAttrService;
	
	@Autowired
	private CwaExceptionProcess cwaExceptionProcess;
	@Autowired
	private CwaUserHolidayService cwaUserHolidayService;
	
	private Integer portal_type = 6;
	
	
	/**
	 * 发起流程
	 * 
	 */
	@Transactional
	public Result createProcess(ProcessBase pro) throws Exception {
		int type = pro.getProcessType();
		if (type <= 3 || type == 10) {
			ValiResult voliResult = cwaProcessService.validateTimeForCwa((CwaProcess)pro);
			if (!voliResult.getCode()) {
				return Result.failed(voliResult.getMsg());
			}
		}
		if (type == 9){
			CwaCorrect correct = (CwaCorrect) pro;
			CwaLeave leave = new CwaLeave();
			leave.setUserId(correct.getUserId());
			leave.setType(correct.getResultType());
			leave.setTimeLength(correct.getTimeLength());
			if (!cwaUserHolidayService.validateLeaveHoliday(leave)) {
				return Result.failed("剩余假期不足");
			}
		}
		String str1 = getProcessPath(type);
		BaseProcessService service = SpringFactory.getBean(str1);
		pro = service.setTitle(pro);
		SysProcess process = getPorcessInstance(pro);
		process = service.setTodoMailInfo(pro, process);
		process = service.initProcess(pro,process);
		startProcess(process);
		pro.setStatus(1);
		service.startProcessCallBack(pro);
		return Result.success();
	}

	/**
	 * 获取结点相关操作按钮
	 * @throws Exception 
	 */
	public List<String> getNodesBtnId(String processId, User user) throws Exception {
		List<SysProDoing> doingPerson = sysProDoingService.selectDoingPerson(processId);
		List<String> list = new ArrayList<String>();
		String userId = user.getId();
		SysProcess process = dao.getProcessById(processId);
		if (process == null) {
			throw new ProcessSubmitException("流程数据错误!");
		}
		for (SysProDoing doing : doingPerson) {
			if (doing.getHandlerId().equals(userId)) {
				list = sysNodesService.getNodeBtnId(doing.getNodeId());
				if (doing.getNodeId().equals("5")) {
					CtmContract ctm = ctmContractService.getCtmById(process.getRelId());
					List<String> ceo = sysNodeAttrService.getAttrNodeUserList("6", ctm.getCtmAttr());
					if (ceo == null || ceo.isEmpty()) {
						list.remove("ceoApprove");
					}
				}
				
				if (doing.getNodeId().equals("cwaExp_2")) {
					CwaException e = cwaExceptionProcess.getCwaExceptionById(process.getRelId());
					if (e.getExpType() == 3) {
						list.remove("reAttendance");
					}
				}
			}
		}
		
		if (userId.equals(process.getUserId())) {
			if (process.getType() == portal_type) {
				String nodeId = process.getNodeId();
				SysNodes node = sysNodesService.getNodeById(nodeId);
				if (node.getIsHead() == 2) {
					list.add("revoke");
				}
			}
		}
		return list;
	}
	
	/**
	 * 审批流程
	 */
	@Transactional
	public Result rotatingProcess(User user, SysProDone done) throws RuntimeException, Exception {
		String handlerId = user.getId();
		String processId = done.getProcessId();
		SysProcess process = processService.getProcessById(processId);
		SysProDoing doing = sysProDoingService.getUserDoingByProcess(handlerId, process);
		updateProDoingToDone(user, doing, done);
		String str1 = getProcessPath(process.getType());
		BaseProcessService service = SpringFactory.getBean(str1);
		Map<String, Object> map = service.getProcessRotaParam(done, process);
		ProcessBase pro = service.getObjectByProcess(process);
		process = service.setTodoMailInfo(pro, process);
		int beforeNode = sysProDoneService.getDoneNodeIsHead(done);
		process = processRotating(process, putProcessParam(map,process));
		Integer afterNode = process.getNextIsHead();
		if (afterNode == null) {
			pro.setStatus(1);
			process.setStatus(1);
			sysProcessMapper.updateByPrimaryKey(process);
			service.rotaingProcessCallBack(pro,process);
		} else if (1 == afterNode) {
			pro.setStatus(3);
			process.setStatus(3);
			sysProcessMapper.updateByPrimaryKey(process);
			service.rejectProcessCallBack(done,pro,process);
		} else if (3 == afterNode) {
			if (1 == beforeNode) {
				pro.setStatus(4);
				process.setStatus(4);
				sysProcessMapper.updateByPrimaryKey(process);
				service.cancelProcessCallBack(pro,process);
			} else {
				pro.setStatus(2);
				process.setStatus(2);
				sysProcessMapper.updateByPrimaryKey(process);
				service.agreeProcessCallBack(done,pro,process);
			}
		} else {
			pro.setStatus(1);
			process.setStatus(1);
			sysProcessMapper.updateByPrimaryKey(process);
			service.rotaingProcessCallBack(pro,process);
		}
		return Result.success();
	}
	
	/**
	 * 获取流程详情
	 * @throws ClassNotFoundException 
	 * @throws IllegalAccessException 
	 * @throws Exception 
	 */
	public ProcessDetails getProcessDetails(int type, String processId) throws Exception{
		SysProcess process = dao.getProcessById(processId);
		String str1 = getProcessPath(type);
		BaseProcessService service = SpringFactory.getBean(str1);
		ProcessDetails proDetails = new ProcessDetails();
		proDetails.setDetailsObject(service.getObjectByProcess(process));
		User user = userService.getUserByIdNoPassWord(process.getUserId());
		List<SysProDoing> doinglist = sysProDoingService.selectDoingPerson(processId);
		List<SysProDone> donelist = sysProDoneService.selectDonePerson(processId, null);
		proDetails.setUser(user);
		proDetails.setDoingList(doinglist);
		proDetails.setDoneList(donelist);
		proDetails.setTitle(process.getTitle());
		return proDetails;
	}
	
	@Transactional
	public Result revokeProcess(String processId, User user) {
		SysProcess process = dao.getProcessById(processId);
		String nodeId = process.getNodeId();
		SysNodes node = sysNodesService.getNodeById(nodeId);
		if (!process.getUserId().equals(user.getId())) {
			return Result.failed("无权限进行此操作！");
		}
		if (process.getType() != portal_type) {
			return Result.failed("该流程目前不支持撤回！");
		} else if (node.getIsHead() != 2) {
			return Result.failed("文章已经被审批过了!");
		}
		sysProDoingService.deleteByProcess(process);
		PortalProcess portalPorcess = portalProcessService.getPortalById(process.getRelId());
		portalPorcess.setStatus(-1);
		portalProcessService.update(portalPorcess);
		SysNodes headNode = dao.getProcessHeadNode(process.getType());
		process.setNodeId(headNode.getId());
		sysProcessMapper.updateByPrimaryKeySelective(process);
		return Result.success();
	}
	
	
	/**
	 * 获取流程处理类
	 */
	public String getProcessPath(Integer processType) {
		return processPathMapper.selectPathByType(processType);
	}

	/**
	 * 按类型获取流程实例
	 */
	@Transactional
	private SysProcess getPorcessInstance(ProcessBase pro) throws Exception {
		int processType = pro.getProcessType();
		SysNodes headNode = dao.getProcessHeadNode(processType);
		if (headNode != null) {
			String headNodeId = headNode.getId();
			SysProcess process = new SysProcess();
			process.setRelId(pro.getId());
			process.setTitle(pro.getTitle());
			process.setUserId(pro.getUserId());
			process.setType(pro.getProcessType());
			process.setNodeId(headNodeId);
			process.setStatus(1);
			dao.saveSysProcess(process);
			return process;
		}
		return null;
	}
	
	/**
	 * 开启流程
	 */
	private SysProcess startProcess(SysProcess process) throws Exception {
		Map<String,Object> map = process.getStartMap();
		if (map == null || map.isEmpty()) {
			map = new HashMap<>();
			map.put("begin", 1);
		}
		return processRotating(process, map);
	}
	
	/**
	 * 解释流程流转条件，得到结果。
	 */
	private static String freemarkerProcess(Map<String, Object> input, String templateStr) {
		StringTemplateLoader stringLoader = new StringTemplateLoader();
		String template = "content";
		stringLoader.putTemplate(template, templateStr);
		Configuration cfg = new Configuration();
		cfg.setTemplateLoader(stringLoader);
		try {
			Template templateCon = cfg.getTemplate(template);
			StringWriter writer = new StringWriter();
			templateCon.process(input, writer);
			return writer.toString();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (TemplateException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * 添加公共参数
	 */
	public Map<String, Object> putProcessParam(Map<String, Object> map, SysProcess process) {
		List<DoneResultVo> resultList = sysProDoneService.getNodesReultGroup(process);
		int passNum = 0, rejectNum = 0;
		for (DoneResultVo vo : resultList) {
			int result = vo.getResult();
			int count = vo.getCount();
			switch (result) {
			case 0:
				rejectNum = count;
				break;
			case 1:
				passNum = count;
				map.put("leave", 1);
				break;
			case 2:
				map.put("begin", count);
				map.put("end", 0);
				map.put("overtime", 1);
				break;
			case 3:
				map.put("end", count);
				map.put("begin", 0);
				map.put("travel", 1);
				break;
			case 10:
				map.put("outside", 1);
				break;
			case 8:
				map.put("retor", 1);
				break;
			}
		}
		int doingNum = sysProDoingService.getDoingCount(process);
		int count = passNum + rejectNum + doingNum;
		map.put("passNum", passNum); // 同意数
		map.put("rejectNum", rejectNum); // 驳回数
		map.put("count", count); // 总人数
		return map;
	}
	
	/**
	 * 流程流转至下个节点
	 */
	@SuppressWarnings("unchecked")
	public SysProcess processRotating(SysProcess process, Map<String, Object> map) throws RuntimeException, Exception {
		String processId = process.getId();
		String nodeId = process.getNodeId();
		SysNodes thisNode = sysNodesService.getNodeById(nodeId);
		List<SysProFilter> list = dao.getNodeFilters(nodeId);
		for (int i = 0; i < list.size(); i++) {
			SysProFilter filter = list.get(i);
			String result = freemarkerProcess(map, filter.getFilter());
			if (process_result.equals(result)) {
				sysProDoingService.deleteByProcess(process);
				if (thisNode.getIsHead() == 1) {
					sysProDoneService.setProcessResultIsvalid(process);
				}
				String nextNodeId = filter.getNextNodeId();
				SysNodes nextNode = sysNodesService.getNodeById(nextNodeId);
				if (nextNode.getIsHead() == 1) {
					int processType = process.getType();
					int nodeProcessType = nextNode.getProcessType();
					if (processType != nodeProcessType) {
						SysNodes fooNode = sysNodesService.getNodeByTypeAndIsHead(processType,2);
						if (fooNode == null) {
							fooNode = sysNodesService.getNodeByTypeAndIsHead(processType,1);
						}
						fooNode.setIsHead(1);
						nextNode = fooNode;
						sysProDoneService.setProcessResultIsvalid(process);
					}
				}
				if (nextNode.getIsHead() == 3) {
					int processType = process.getType();
					int nodeProcessType = nextNode.getProcessType();
					if (processType != nodeProcessType) {
						SysNodes fooNode = sysNodesService.getNodeByTypeAndIsHead(processType,3);
						nextNode = fooNode;
					}
				}
				process.setNodeId(nextNode.getId());
				if (nextNode.getIsHead() != 3) {
					String path = nextNode.getPersonPath();
					List<String> handler = new ArrayList<String>();
					if (StrUtils.isNotNull(path)) {
						Method m = findNodesPersonService.getClass().getMethod(path, SysProcess.class);
						handler = (List<String>) m.invoke(findNodesPersonService, process);
					}
					if (handler.isEmpty()) {
						if (nextNode.getIsSetting() == 2) {
							process.setNodeId(nextNodeId);
							processRotating(process, map);
						} else {
							throw new ProcessSubmitException("请先设置" + nextNode.getNodeName() + "审批人");
						}
					} else {
						for (String handlerId : handler) {
							String doingId = DataUtil.uuidData();
							SysProDoing sysProDoing = new SysProDoing();
							sysProDoing.setId(doingId);
							sysProDoing.setNodeId(nextNode.getId());
							sysProDoing.setHandlerId(handlerId);
							sysProDoing.setProcessId(processId);
							sysProDoingService.add(sysProDoing);
						}
						int ishead = nextNode.getIsHead();
						if (process.getIsSendMail() && ishead != 1 && ishead != 3) {
							MailVo mailVo = new MailVo(process.getSubject(), process.getMailKey(), handler);
							mailVo.setParams(process.getMailParam());
							MailSendThread.queue.offer(mailVo);
						}
					}
				}
				process.setNextIsHead(nextNode.getIsHead());
				// 更新流程至下个节点
				sysProcessMapper.updateByPrimaryKeySelective(process);
				break;
			}
			
		}
		return process;
	}
	
	/**
	 * 去掉待办，添加已办，更新流程更新时间
	 * 
	 */
	@Transactional
	public void updateProDoingToDone(User user,SysProDoing doing, SysProDone done) {
		String userId = user.getId(); // 登录人
		if (doing == null) {
			throw new ProcessSubmitException("流程错误！");
		}
		String handlerId = doing.getHandlerId(); // 待办处理人
		if (!userId.equals(handlerId)) {
			throw new ProcessSubmitException("没有权限");
		}
		// 添加已办记录
		String doneId = DataUtil.uuidData(); // 生成已办id
		done.setId(doneId);
		done.setHandlerId(doing.getHandlerId());
		done.setNodeId(doing.getNodeId());
		done.setProcessId(doing.getProcessId());
		done.setStartTime(doing.getAddTime());
		done.setAddTime(DateUtil.nowTime());
		done.setUpdateTime(DateUtil.nowTime());
		sysProDoneService.add(done);

		// 删除待办
		sysProDoingService.deleteById(doing.getId());

		// 更新流程更新时间
		SysProcess process = new SysProcess();
		process.setId(doing.getProcessId());
		process.setUpdateTime(DateUtil.nowTime());
		sysProcessMapper.updateByPrimaryKeySelective(process);
	}

	public static void main(String[] args) throws Exception {
	
	}

	public SysProcess getProcessIdByRefId(String id) {
		return dao.getProcessByRefId(id);
	}
}
