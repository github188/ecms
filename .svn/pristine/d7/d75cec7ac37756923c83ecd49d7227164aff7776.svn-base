package com.ecaray.ecms.services.cwa.process;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecaray.ecms.commons.utils.DataUtil;
import com.ecaray.ecms.commons.utils.DateUtil;
import com.ecaray.ecms.commons.utils.ParaMap;
import com.ecaray.ecms.commons.utils.StrUtils;
import com.ecaray.ecms.dao.mapper.cwa.CwaRetroactiveMapper;
import com.ecaray.ecms.dao.mapper.news.PortalFilesMapper;
import com.ecaray.ecms.entity.cwa.CwaPunchCard;
import com.ecaray.ecms.entity.cwa.CwaRetroactive;
import com.ecaray.ecms.entity.news.PortalFiles;
import com.ecaray.ecms.entity.process.ProcessBase;
import com.ecaray.ecms.entity.process.SysProDone;
import com.ecaray.ecms.entity.process.SysProcess;
import com.ecaray.ecms.services.authority.UserService;
import com.ecaray.ecms.services.cwa.CwaPunchCardService;
import com.ecaray.ecms.services.processes.BaseProcessService;

@Service
public class CwaPunchCardProcess extends BaseProcessService {

	@Autowired
	CwaRetroactiveMapper cwaRetroactiveMapper;
	
	@Autowired
	UserService userService;
	
	@Autowired
	CwaPunchCardService cwaPunchCardService;
	
	@Autowired
	PortalFilesMapper portalFilesMapper;

	@Override
	public ProcessBase setTitle(ProcessBase process) {
		
		
		return null;
	}

	@Override
	public SysProcess setTodoMailInfo(ProcessBase pro, SysProcess process) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void startProcessCallBack(ProcessBase pro) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Map<String, Object> getProcessRotaParam(SysProDone done, SysProcess process) throws Exception {
		String refId = process.getRelId();
		CwaRetroactive retroactive = cwaRetroactiveMapper.selectByPrimaryKey(refId);
		Map<String,Object> map = new HashMap<>();
		map.put("status", retroactive.getStatus());
		return map;
	}

	@Override
	public ProcessBase getObjectByProcess(SysProcess process) {
		String refId = process.getRelId();
		CwaRetroactive re =  cwaRetroactiveMapper.selectByPrimaryKey(refId);
		List<PortalFiles> files = portalFilesMapper.selectListByPortalId(re.getId());
		re.setFiles(files);
		return re;
	}

	@Override
	public void rejectProcessCallBack(SysProDone done,ProcessBase pro, SysProcess process) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void cancelProcessCallBack(ProcessBase pro, SysProcess process) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void agreeProcessCallBack(SysProDone done,ProcessBase pro, SysProcess process) throws Exception {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void rotaingProcessCallBack(ProcessBase pro, SysProcess process) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String saveProcessObject(ProcessBase pro) {
		CwaRetroactive cwaRetroactive = (CwaRetroactive) pro;
		Long now = DateUtil.nowTime();
		cwaRetroactive.setAddTime(now);
		cwaRetroactive.setUpdateTime(now);
		String id = cwaRetroactive.getId();
		if (StrUtils.isNull(id)) {
			id = DataUtil.uuidData();
			cwaRetroactive.setId(id);
		}
		cwaRetroactiveMapper.insertSelective(cwaRetroactive);
		List<PortalFiles> files = cwaRetroactive.getFiles();
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
	
	@Override
	public ProcessBase bindingParamByMap(Map<String, Object> paramap) throws Exception {
		CwaRetroactive cwaRetroactive = new CwaRetroactive();
		return map2O(paramap,cwaRetroactive);
	}
	
	public void addUserPunchCardRecord(CwaRetroactive cwaRetroactive) throws Exception{
		Long fristtime = cwaRetroactive.getFristTime();
		Long lasttime = cwaRetroactive.getLastTime();
		String userId = cwaRetroactive.getUserId();
		String name = userService.getUserById(userId).getRealname();
		ParaMap paramMap = new ParaMap();
		paramMap.put("fristtime", fristtime);
		paramMap.put("lasttime", lasttime);
		paramMap.put("name", name);
		cwaPunchCardService.getPunchCardData("addUserPunchCardRecord",paramMap);
	}
	
}
