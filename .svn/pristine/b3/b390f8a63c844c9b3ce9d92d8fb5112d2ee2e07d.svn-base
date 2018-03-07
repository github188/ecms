package com.ecaray.ecms.services.ctm;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecaray.ecms.commons.authorization.annotation.CurrentUser;
import com.ecaray.ecms.commons.utils.ChineseCharToEn;
import com.ecaray.ecms.commons.utils.DataUtil;
import com.ecaray.ecms.commons.utils.DateUtil;
import com.ecaray.ecms.commons.utils.ParaMap;
import com.ecaray.ecms.commons.utils.StrUtils;
import com.ecaray.ecms.dao.mapper.ctm.CtmContractMapper;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.ctm.CtmContract;
import com.ecaray.ecms.entity.ctm.CtmFiles;
import com.ecaray.ecms.entity.ctm.Vo.CtmDetails;
import com.ecaray.ecms.entity.ctm.Vo.CtmFilter;
import com.ecaray.ecms.entity.pmo.Vo.MailVo;
import com.ecaray.ecms.entity.process.ProcessBase;
import com.ecaray.ecms.entity.process.SysProDone;
import com.ecaray.ecms.entity.process.SysProcess;
import com.ecaray.ecms.services.authority.DeptService;
import com.ecaray.ecms.services.authority.RoleService;
import com.ecaray.ecms.services.authority.UserRoleService;
import com.ecaray.ecms.services.authority.UserService;
import com.ecaray.ecms.services.common.ExcelExportService;
import com.ecaray.ecms.services.common.FileService;
import com.ecaray.ecms.services.common.ParameterService;
import com.ecaray.ecms.services.email.MailSendThread;
import com.ecaray.ecms.services.pmo.PmoProjectService;
import com.ecaray.ecms.services.processes.BaseProcessService;
import com.ecaray.ecms.services.processes.SysProcessService;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Service
public class CtmContractService extends BaseProcessService {

	Logger logger = LoggerFactory.getLogger(CtmContractService.class);

	@Autowired
	private CtmContractMapper ctmContractMapper;
	@Autowired
	private SysProcessService processService;
	@Autowired
	private UserService userService;
	@Autowired
	private FileService fileService;
	@Autowired
	private CtmFilesService ctmFilesService;
	@Autowired
	private ExcelExportService excelExportService;
	@Autowired
	private UserRoleService userRoleService;
	@Autowired
	private DeptService depService;
	@Autowired
	private ParameterService parameterService;
	@Autowired
	private PmoProjectService pmoProjectService;
	
	@Autowired
	private RoleService roleService;
	
	private static boolean isSendTodoMail = true;

	private static String title = "合同审批";
	
	public static  int ctm_role_saler = 100901;
	
	public static  int ctm_role_examiner = 100902;
	
	/**
	 * 设置流程标题
	 */
	public ProcessBase setTitle(ProcessBase pro) {
		CtmContract ctmContract = (CtmContract) pro;
		ctmContract.setTitle(title + "（"+ctmContract.getCusName()+"）");
		ctmContract.setId(DataUtil.uuidData());
		return ctmContract;
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
	public void startProcessCallBack(ProcessBase pro) throws Exception {
		CtmContract ctmContract = (CtmContract) pro;
		saveProcessObject(ctmContract);
	}

	/**
	 * 获取流程流转参数
	 */
	@Override
	public Map<String, Object> getProcessRotaParam(SysProDone done, SysProcess process) {
		Map<String, Object> map = new HashMap<>();
		map.put("flag", done.getFlag()); 
		return map;
	}

	/**
	 * 获取请假单详情
	 */
	@Override
	public ProcessBase getObjectByProcess(SysProcess process) {
		return getCtmById(process.getRelId());
	}
	
	/**
	 * 已驳回
	 */
	@Override
	public void rejectProcessCallBack(SysProDone done,ProcessBase pro,SysProcess process) {
		CtmContract ctmContract = (CtmContract) pro;
		List<String> authorId = new ArrayList<String>();
		authorId.add(process.getUserId());
		MailVo mailVo = new MailVo("您的合同审批已被驳回","ctmToAuthorFail",authorId);
        mailVo.setParams(process.getMailParam());
        MailSendThread.queue.offer(mailVo);
		ctmContractMapper.updateByPrimaryKey(ctmContract);
	}
	
	/**
	 * 已通过
	 * @throws Exception 
	 */
	@Override
	public void agreeProcessCallBack(SysProDone done,ProcessBase pro,SysProcess process) throws Exception {
		CtmContract ctmContract = (CtmContract) pro;
		ctmContractMapper.updateByPrimaryKey(ctmContract);
		sendResultMail(done, process, "通过");
	}
	
	/**
	 * 已取消
	 */
	@Override
	public void cancelProcessCallBack(ProcessBase pro,SysProcess process) {
		CtmContract ctmContract = (CtmContract) pro;
		ctmContractMapper.updateByPrimaryKey(ctmContract);
	}
	
	/**
	 * 审批中
	 */
	@Override
	public void rotaingProcessCallBack(ProcessBase pro,SysProcess process) {
		CtmContract ctmContract = (CtmContract) pro;
		ctmContractMapper.updateByPrimaryKey(ctmContract);
	}


	/**
	 * 查询合同列表
	 */
	public ParaMap getCtmContractList(CtmFilter filter,User user) {
		String key = filter.getKey();
		String userName = filter.getUserName();
		if (StrUtils.isNotNull(key)) {
			filter.setKey("%" + key + "%");
		}
		if (StrUtils.isNotNull(userName)) {
			filter.setUserName("%" + userName + "%");
		}
		String salerId = roleService.getRoleIdByCode(ctm_role_saler);
		String examinerId = roleService.getRoleIdByCode(ctm_role_examiner);
		String userId = user.getId();
		List<String> roles = userRoleService.getRoleIdListByUserId(userId);
		if(roles.contains(salerId)) {
			List<String> ids = userService.getUserChildList(userId);
			ids.add(userId);
			filter.setUserIds(ids);
		} else if(!roles.contains(examinerId)){
			List<CtmContract> list = new ArrayList<CtmContract>();
			Page<?> page = new Page<>();
			page.setPageNum(filter.getPageNum());
			page.setPageSize(filter.getPageSize());
			page.setTotal(0);
			return ParaMap.getPageHelperMap(list,page);
		}
		String depId = filter.getDepId();
		if(StrUtils.isNotNull(depId)) {
			List<String> depIds = depService.getDepChildIdList(depId);
			filter.setDepIds(depIds);
		}
		List<CtmContract> list;
		Page<?> page = null;
		if (filter.getIsPage() == 1) {
			page = PageHelper.startPage(filter.getPageNum(), filter.getPageSize());
			list = ctmContractMapper.selectCtmList(filter);
		} else {
			page = new Page<>();
			list = ctmContractMapper.selectCtmList(filter);
		}
		for(CtmContract ctm:list){
			ctm.setCtmAttr(parameterService.getName("ctm_attr", ctm.getCtmAttr()));
			ctm.setDepName(depService.getAllDept(new StringBuffer(),Long.parseLong(ctm.getDepId())));
			String id = ctm.getId();
			SysProcess p = processService.getProcessByRefId(id);
			ctm.setProcessId(p.getId());
		}
		return ParaMap.getPageHelperMap(list,page);
	}

	/**
	 * 查询合同详情
	 */
	public CtmDetails getContractDetails(String id) {
		if (StrUtils.isNull(id)) {
			return null;
		}
		CtmDetails ctmDetails = (CtmDetails)getCtmById(id);
		List<CtmFiles> list = ctmFilesService.getFileListByRefId(id);
		ctmDetails.setCtmFiles(list);
		return ctmDetails;
	}

	/**
	 * 上传合同审批附件
	 */
	public String ctmFilesUpload(HttpServletRequest request) throws IllegalStateException, IOException {
		String url = "ctm/contractFiles";
		String id = fileService.newSpringUpload(url, request);
		return id;
	}

	/**
	 * 上传合同原件
	 */
	public String ctmTempPicUpload(HttpServletRequest request) throws IllegalStateException, IOException {
		String url = "ctm/contractPic";
		String ids = fileService.newSpringUpload(url, request);
		CtmFiles file = new CtmFiles();
		file.setId(ids.substring(0, ids.lastIndexOf(".")));
		file.setAddTime(System.currentTimeMillis());
		ctmFilesService.add(file);
		return ids;
	}


	/**
	 * 导出合同列表
	 */
	@SuppressWarnings("unchecked")
	public byte[] ctmContractExportExcel(CtmFilter filter, HttpServletRequest request,
			HttpServletResponse response, @CurrentUser User user) throws Exception {
		filter.setIsPage(0);
		ParaMap map = getCtmContractList(filter, user);
		List<CtmContract> list = (List<CtmContract>) map.get("object");
		ParaMap paramap = new ParaMap();
		List<ParaMap> maplist = new ArrayList<ParaMap>();
		for (CtmContract f : list) {
			ParaMap objmap = ParaMap.ObjToParaMap(f);
			objmap.put("starttime", DateUtil.format(f.getStartTime(), "yyyy-MM-dd"));
			objmap.put("endtime", DateUtil.format(f.getEndTime(), "yyyy-MM-dd"));
			if (objmap.getInt("status") == 1) {
				objmap.put("status", "审批中");
			} 
			if (objmap.getInt("status") == 2) {
				objmap.put("status", "审批通过");
			}
			if (objmap.getInt("status") == 3) {
				objmap.put("status", "被驳回");
			}
			maplist.add(objmap);
		}
		paramap.put("data", maplist);
		return excelExportService.exportRefundRecord(paramap, request, response);
	}

	/**
	 * 修改发起审批的内容
	 */
	public void updateCtmContract(CtmContract ctmContract, User user) {
		update(ctmContract);
		String id = ctmContract.getId();
		ctmFilesService.deleteFilesListByRefId(id);
		for (CtmFiles f : ctmContract.getList()) {
			f.setRefId(id);
			ctmFilesService.add(f);
		}
	}
	
	/**
	 * 添加合同 
	 */
	public String saveProcessObject(ProcessBase pro){
		CtmContract ctm = (CtmContract)pro;
		String ctmId = ctm.getId();
		if (StrUtils.isNull(ctmId)) {
			ctmId = DataUtil.uuidData();
			ctm.setId(ctmId);
		}
		String userId = ctm.getUserId();
		User user = userService.getUserById(userId);
		ctm.setUserName(user.getRealname());
		ctm.setDepId(user.getDepId());
		ctm.setDepName(user.getDepName());
		ctm.setAddUser(userId);
		ctm.setCtmCode(getCtmCode(ctm));
		long time = DateUtil.nowTime();
		ctm.setAddTime(time);
		ctm.setUpdateTime(time);
		ctmContractMapper.insertSelective(ctm);
		List<CtmFiles> list = ctm.getList();
		if (list.size() > 0) {
			for (CtmFiles f : list) {
				f.setRefId(ctm.getId());
				f.setAddUser(ctm.getUserId());
				ctmFilesService.add(f);
			}
		}
		return ctm.getId();
	}
	
	/**
	 * 更新合同 
	 */
	public void update(CtmContract ctm){
		long time = DateUtil.nowTime();
		ctm.setUpdateTime(time);
		ctmContractMapper.updateByPrimaryKeySelective(ctm);
	}

	/**
	 * 通过id获取合同
	 */
	public CtmContract getCtmById(String id) {
		CtmContract ctmContract =  ctmContractMapper.selectByPrimaryKey(id);
		List<CtmFiles> list = ctmFilesService.getFileListByRefId(id);
		ctmContract.setList(list);
		ctmContract.setCtmAttrName(parameterService.getName("ctm_attr", ctmContract.getCtmAttr()));
		if (StrUtils.isNotNull(ctmContract.getProjectId())) {
			ctmContract.setProjectName(pmoProjectService.getProjectName(ctmContract.getProjectId()));
		}
		ctmContract.setDepName(depService.getAllDept(new StringBuffer(), Long.parseLong(ctmContract.getDepId())));
		return ctmContract;
	}
	
	
	/**
	 * 生成合同编号
	 */
	public String getCtmCode(CtmContract ctm) {
		StringBuffer code = new StringBuffer("HT-YC");
		String depId = ctm.getDepId();
		String oneDepName = depService.getOneLevalDep(depId).getName();
		oneDepName = ChineseCharToEn.getAllFirstLetter(oneDepName).substring(0, 2);
		String ctmAttr = ctm.getCtmAttr();
		String date = DateUtil.format(DateUtil.nowTime(), "yyyyMMdd");
		long time = DateUtil.parse(date, "yyyyMMdd").getTime();
		int index = ctmContractMapper.selectCtmCountByDay(time) + 1;
		String idx = String.format("%02d", index);
		code.append(oneDepName).append("-");
		code.append(ctmAttr).append("-");
		code.append(date).append("-");
		code.append(idx);
		return code.toString();
	}
}
