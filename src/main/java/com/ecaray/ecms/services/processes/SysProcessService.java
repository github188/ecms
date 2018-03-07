package com.ecaray.ecms.services.processes;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecaray.ecms.commons.constant.Constants;
import com.ecaray.ecms.commons.utils.ParaMap;
import com.ecaray.ecms.commons.utils.StrUtils;
import com.ecaray.ecms.dao.mapper.process.SysProcessMapper;
import com.ecaray.ecms.dao.process.SysProcessDao;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.process.SysNodes;
import com.ecaray.ecms.entity.process.SysProDoing;
import com.ecaray.ecms.entity.process.SysProDone;
import com.ecaray.ecms.entity.process.SysProcess;
import com.ecaray.ecms.entity.process.Vo.ProDoFilter;
import com.ecaray.ecms.services.processes.base.SysNodesService;
import com.ecaray.ecms.services.processes.base.SysProDoingService;
import com.ecaray.ecms.services.processes.base.SysProDoneService;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Service
public class SysProcessService implements Constants {

	@Autowired
	private SysProcessMapper sysProcessMapper;
	@Autowired
	private SysNodesService sysNodesService;
	@Autowired
	private SysProDoingService doingService;
	@Autowired
	private SysProDoneService doneService;
	@Autowired
	private SysProcessDao dao;

	/**
	 *  通过流程id获取流程
	 */
	public SysProcess getProcessById(String processId) {
		return dao.getProcessById(processId);
	}

	/**
	 * 通过业务数据id获取流程
	 * @param id
	 * @return
	 */
	public SysProcess getProcessByRefId(String id) {
		return dao.getProcessByRefId(id);
	}

	/**
	 * 查询当前流程节点标志
	 */
	public int getProcessIsHead(SysProcess process) {
		SysNodes node = sysNodesService.getNodeById(process.getNodeId());
		return node.getIsHead();
	}
	
	/**
	 * 查询待办列表
	 */

	public ParaMap getProDoingList(User user, ProDoFilter filter) {
		ParaMap map = doingService.getDoingList(filter, user);
		return putProcessNodesInfo(map);
	}

	/**
	 * 查询已办流程列表
	 */
	public ParaMap getProDoneList(User user, ProDoFilter filter) {
		ParaMap map = doneService.getDoingList(filter, user);
		return putProcessNodesInfo(map);
	}

	/**
	 * 查询我发起的流程
	 */
	public ParaMap getMyApplyList(User user, ProDoFilter filter) {
		ParaMap map = getApplyList(filter, user);
		return putProcessNodesInfo(map);
	}

	/**
	 * 获取我发起的流程列表
	 */
	private ParaMap getApplyList(ProDoFilter filter, User user) {
		filter.setProcessId(user.getId());
		String title = filter.getTitle();
		String sponsorsName = filter.getSponsorsName();
		if (StrUtils.isNotNull(title)) {
			filter.setTitle("%" + title + "%");
		}
		if (StrUtils.isNotNull(sponsorsName)) {
			filter.setSponsorsName("%" + sponsorsName + "%");
		}
		Page<?> page = PageHelper.startPage(filter.getPageNum(), filter.getPageSize());
		List<ProDoFilter> list = sysProcessMapper.selectMyApplyList(filter);
		return ParaMap.getPageHelperMap(list, page);
	}

	/**
	 * 填装流程的已处理人和待处理的人
	 */
	@SuppressWarnings("unchecked")
	private ParaMap putProcessNodesInfo(ParaMap map) {
		List<ProDoFilter> list = (List<ProDoFilter>) map.get("object");
		for (ProDoFilter doing : list) {
			String processId = doing.getProcessId();
			List<SysProDoing> doingPerson = doingService.selectDoingPerson(processId);
			List<SysProDone> donePerson = doneService.selectDonePerson(processId, null);
			doing.setDoingPerson(doingPerson);
			doing.setDonePerson(donePerson);
		}
		map.put("object", list);
		return map;
	}

	public List<SysProcess> getList() {
		return sysProcessMapper.selectAllList();
	}
}
