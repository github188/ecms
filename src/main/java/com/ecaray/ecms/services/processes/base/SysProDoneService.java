package com.ecaray.ecms.services.processes.base;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecaray.ecms.commons.utils.DateUtil;
import com.ecaray.ecms.commons.utils.ParaMap;
import com.ecaray.ecms.commons.utils.StrUtils;
import com.ecaray.ecms.dao.mapper.process.SysNodesMapper;
import com.ecaray.ecms.dao.mapper.process.SysProDoneMapper;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.process.SysNodes;
import com.ecaray.ecms.entity.process.SysProDone;
import com.ecaray.ecms.entity.process.SysProcess;
import com.ecaray.ecms.entity.process.Vo.DoneResultVo;
import com.ecaray.ecms.entity.process.Vo.ProDoFilter;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

/**
 * 已办
 */
@Service
public class SysProDoneService {
	
	@Autowired
	private SysProDoneMapper sysProDoneMapper;
	
	@Autowired
	private SysNodesMapper sysNodesMapper;

	
	/**
	 * 查询当前节点已处理过的人
	 */
	public List<SysProDone> selectDonePerson(String processId, String nodeId) {
		return sysProDoneMapper.selectDonePerson(processId, nodeId);
	}
	
	/**
	 * 获取用户的已办列表
	 */
	public ParaMap getDoingList(ProDoFilter filter,User user) {
		filter.setHandlerId(user.getId());
		String title = filter.getTitle();
		String sponsorsName = filter.getSponsorsName();
		if (StrUtils.isNotNull(title)) {
			filter.setTitle("%" + title + "%");
		}
		if (StrUtils.isNotNull(sponsorsName)) {
			filter.setSponsorsName("%" + sponsorsName + "%");
		}
		Page<?> page = PageHelper.startPage(filter.getPageNum(), filter.getPageSize());
		List<ProDoFilter> list = sysProDoneMapper.selectDoneList(filter);
		return ParaMap.getPageHelperMap(list, page);
	}

	public void add(SysProDone done) {
		long time = DateUtil.nowTime();
		done.setAddTime(time);
		done.setUpdateTime(time);
		sysProDoneMapper.insertSelective(done);
	}
	
	public void setProcessResultIsvalid(SysProcess process) {
		sysProDoneMapper.setProcessResultIsvalid(process);
	}

	public List<DoneResultVo> getNodesReultGroup(SysProcess process) {
		return sysProDoneMapper.selectNodesReultGroup(process);
	}

	public void deleteCtmSetting(String id, String nodeId, String userId) {
		sysProDoneMapper.deleteCtmSetting(id, nodeId, userId);
	}

	/**
	 * 查询当前处理的待办处于哪个节点
	 */
	public int getDoneNodeIsHead(SysProDone done) {
		String nodeId = done.getNodeId();
		SysNodes node = sysNodesMapper.selectByPrimaryKey(nodeId);
		int ishead = node.getIsHead();
		return ishead;
	}
}
