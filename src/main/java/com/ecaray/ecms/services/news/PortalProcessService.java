package com.ecaray.ecms.services.news;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecaray.ecms.commons.constant.DataUtil;
import com.ecaray.ecms.commons.utils.DateUtil;
import com.ecaray.ecms.commons.utils.StrUtils;
import com.ecaray.ecms.dao.mapper.news.PortalFilesMapper;
import com.ecaray.ecms.dao.mapper.news.PortalProcessMapper;
import com.ecaray.ecms.dao.mapper.process.SysNodesMapper;
import com.ecaray.ecms.dao.mapper.process.SysNodesUserMapper;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.news.News;
import com.ecaray.ecms.entity.news.PortalFiles;
import com.ecaray.ecms.entity.news.PortalProcess;
import com.ecaray.ecms.entity.pmo.Vo.MailVo;
import com.ecaray.ecms.entity.process.ProcessBase;
import com.ecaray.ecms.entity.process.SysNodes;
import com.ecaray.ecms.entity.process.SysNodesUser;
import com.ecaray.ecms.entity.process.SysProDone;
import com.ecaray.ecms.entity.process.SysProcess;
import com.ecaray.ecms.entity.process.Vo.ProNodeHandler;
import com.ecaray.ecms.services.authority.UserService;
import com.ecaray.ecms.services.common.ParameterService;
import com.ecaray.ecms.services.email.MailSendThread;
import com.ecaray.ecms.services.processes.BaseProcessService;
import com.ecaray.ecms.services.processes.ProcessSettingService;
import com.ecaray.ecms.services.processes.SysProcessService;
import com.ecaray.ecms.services.processes.base.SysNodesService;
import com.ecaray.ecms.services.processes.base.SysProDoingService;

@Service
public class PortalProcessService extends BaseProcessService {

	@Autowired
	PortalProcessMapper mapper;
	@Autowired
	SysProcessService processService;
	@Autowired
	SysNodesService sysNodesService;
	@Autowired
	SysProDoingService doingService;
	@Autowired
	PortalFilesMapper portalFilesMapper;
	@Autowired
	UserService userService;
	@Autowired
	NewsService newsService;
	@Autowired
	ProcessSettingService setService;
	@Autowired
	SysNodesUserMapper sysNodesUserMapper;
	@Autowired
	SysNodesMapper sysNodesMapper;
	@Autowired
	ParameterService parameterService;
	
	
	private static boolean isSendTodoMail = true;

	private static String title = "文章审核";

	/**
	 * 设置流程标题
	 */
	public ProcessBase setTitle(ProcessBase pro) {
		PortalProcess portal = (PortalProcess) pro;
		portal.setTitle(title);
		portal.setId(DataUtil.uuidData());
		return portal;
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
		PortalProcess portal = (PortalProcess) pro;
		saveProcessObject(portal);
	}

	/**
	 * 获取流程流转参数
	 */
	@Override
	public Map<String, Object> getProcessRotaParam(SysProDone done, SysProcess process) {
		Map<String, Object> map = new HashMap<>();
		return map;
	}

	/**
	 * 获取请假单详情
	 */
	@Override
	public ProcessBase getObjectByProcess(SysProcess process) {
		return getPortalById(process.getRelId());
	}
	
	/**
	 * 已驳回
	 */
	@Override
	public void rejectProcessCallBack(SysProDone done,ProcessBase pro,SysProcess process) {
		PortalProcess portal = (PortalProcess) pro;
		mapper.updateByPrimaryKey(portal);
		sendResultMail(done, process, "被驳回");
	}
	
	/**
	 * 已通过
	 * @throws Exception 
	 */
	@Override
	public void agreeProcessCallBack(SysProDone done,ProcessBase pro,SysProcess process) throws Exception {
		PortalProcess portal = (PortalProcess) pro;
		News news = new News();
		news.setContent(portal.getContent());
		news.setIsTop(1);
		User author = userService.getUserByIdNoPassWord(portal.getUserId() + "");
		news.setNewsAuthor(author.getDepName() +" " + author.getRealname());
		news.setNewsTitle(portal.getNewsTitle());
		news.setPictureId(portal.getHeadPic());
		news.setPublishDate(DateUtil.nowTime());
		news.setIsPublish(0);
		news.setNewsType(portal.getType());
		news.setAddPersonId(author.getId());
		String fileids = "";
		String fileNames = "";
		List<PortalFiles> files = portal.getFiles();
		for (int i = 0;i < files.size();i++ ) {
			fileids += files.get(i).getFileId();
			fileNames += files.get(i).getFileName();
			fileids += "#";
			fileNames += "#";
		}
		news.setAttachmentId(fileids);
		news.setAttachmentName(fileNames);
		newsService.addNews(news, author);
		mapper.updateByPrimaryKey(portal);
		sendResultMail(done, process, "通过");
	}
	
	/**
	 * 已取消
	 */
	@Override
	public void cancelProcessCallBack(ProcessBase pro,SysProcess process) {
		PortalProcess portal = (PortalProcess) pro;
		mapper.updateByPrimaryKey(portal);
	}
	
	/**
	 * 审批中
	 */
	@Override
	public void rotaingProcessCallBack(ProcessBase pro,SysProcess process) {
		PortalProcess portal = (PortalProcess) pro;
		mapper.updateByPrimaryKey(portal);
	}

	/**
	 * 查询详情
	 */
	public PortalProcess getPortalById(String refId) {
		PortalProcess portal = mapper.selectByPrimaryKey(refId);
		String id = portal.getId();
		List<PortalFiles> files = portalFilesMapper.selectListByPortalId(id);
		portal.setFiles(files);
		portal.setUserName(portal.getName());
		portal.setTypeName(parameterService.getName("portal_type", portal.getType() +""));
		return portal;
	}
	
	/**
	 * 获取合同审批可设置处理人的节点
	 */
	public List<SysNodesUser> getSettingNodes(){
		List<SysNodes> list = setService.getSettingNodes(6);
		List<SysNodesUser> userList = new ArrayList<SysNodesUser>();
		for (SysNodes nodes : list) {
			String nodeId = nodes.getId();
			SysNodesUser sysNodeuser = new SysNodesUser();
			userList.add(sysNodeuser);
			sysNodeuser.setNodeId(nodeId);
			sysNodeuser.setNodeName(nodes.getNodeName());
			List<ProNodeHandler> sysNodesUserList = sysNodesUserMapper.selectNodesHandler(nodeId);
			for (ProNodeHandler handler : sysNodesUserList) {
				String handlerId = handler.getUserId();
				sysNodeuser.setUserId(handlerId);
				User user = userService.getUserByIdNoPassWord(handlerId);
				sysNodeuser.setUserName(user.getRealname());
			}
		}
		return userList;
	}
	

	/**
	 * 新增
	 */
	public String saveProcessObject(ProcessBase pro){
		PortalProcess portal = (PortalProcess) pro;
		String id = portal.getId();
		if (StrUtils.isNull(id)) {
			id = DataUtil.uuidData();
			portal.setId(id);
		}
		String userId = portal.getUserId();
		User user = userService.getUserById(userId);
		portal.setName(user.getRealname());
		long time = DateUtil.nowTime();
		portal.setAddTime(time);
		portal.setUpdateTime(time);
		mapper.insertSelective(portal);
		List<PortalFiles> files = portal.getFiles();
		for (PortalFiles file : files) {
			PortalFiles portalFile = new PortalFiles();
			portalFile.setPortalId(id);
			portalFile.setFileId(file.getFileId());
			portalFile.setFileName(file.getFileName());
			portalFilesMapper.insertSelective(portalFile);
		}
		return portal.getId();
	}
	
	/**
	 * 修改
	 */
	public void update(PortalProcess portal){
		long time = DateUtil.nowTime();
		portal.setUpdateTime(time);
		mapper.updateByPrimaryKeySelective(portal);
		String id = portal.getId();
		portalFilesMapper.deleteByPoralId(id);
		List<PortalFiles> files = portal.getFiles();
		for (PortalFiles file : files) {
			PortalFiles portalFile = new PortalFiles();
			portalFile.setPortalId(id);
			portalFile.setFileId(file.getFileId());
			portalFile.setFileName(file.getFileName());
			portalFilesMapper.insertSelective(portalFile);
		}
	}
}
