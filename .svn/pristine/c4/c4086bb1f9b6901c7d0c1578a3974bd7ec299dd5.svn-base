package com.ecaray.ecms.services.processes.base;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ecaray.ecms.commons.utils.DateUtil;
import com.ecaray.ecms.commons.utils.ParaMap;
import com.ecaray.ecms.commons.utils.StrUtils;
import com.ecaray.ecms.dao.mapper.process.SysProDoingMapper;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.process.SysProDoing;
import com.ecaray.ecms.entity.process.SysProDone;
import com.ecaray.ecms.entity.process.SysProcess;
import com.ecaray.ecms.entity.process.Vo.ProDoFilter;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

/**
 * 待办相关服务
 */
@Service
public class SysProDoingService {

	@Autowired
	SysProDoingMapper sysProDoingMapper;
	
	/**
	 * 添加待办
	 */
	public void add(SysProDoing doing) {
		long time = DateUtil.nowTime();
		doing.setAddTime(time);
		doing.setUpdateTime(time);
		sysProDoingMapper.insertSelective(doing);
	}
	
	/**
	 * 获取某人在该流程该节点的待办记录
	 */
	public SysProDoing getUserDoingByProcess(String handlerId, String processId, String nodeId) {
		return sysProDoingMapper.selectDoingByProcess(handlerId,processId,nodeId);
	}

	/**
	 * 获取用户的待办列表
	 */
	public ParaMap getDoingList(ProDoFilter filter,User user) {
		if (filter == null) {
			filter = new ProDoFilter();
		}
		filter.setHandlerId(user.getId());
		
		String sponsorsName = filter.getSponsorsName();
		if (StrUtils.isNotNull(sponsorsName)) {
			filter.setSponsorsName("%" + sponsorsName + "%");
		}
		String title = filter.getTitle();
		if (StrUtils.isNotNull(title)) {
			filter.setTitle("%" + title + "%");
		}
		Page<?> page = PageHelper.startPage(filter.getPageNum(), filter.getPageSize());
		List<ProDoFilter> list = sysProDoingMapper.selectDoingList(filter);		
		return ParaMap.getPageHelperMap(list, page);
	}

	/**
	 * 查询流程处理中的人
	 */
	public List<SysProDoing> selectDoingPerson(String processId) {
		return sysProDoingMapper.selectDoingPerson(processId);
	}

	/**
	 * 获取待办
	 */
	public SysProDoing getDoingByid(String id) {
		return sysProDoingMapper.selectByPrimaryKey(id);
	}

	/**
	 * 删除待办
	 */
	public void deleteById(String id) {
		sysProDoingMapper.deleteByPrimaryKey(id);
	}

	/**
	 * 删除流程某节点全部待办
	 */
	public void deleteByProcess(SysProcess process) {
		sysProDoingMapper.deleteByProcess(process);

	}

	/**
	 * 获取当前节点的待办总数
	 */
	public int getDoingCount(SysProcess process) {
		return sysProDoingMapper.selectDoingCount(process);
	}

	public void deleteCtmSetting(String id, String nodeId, String userId) {
		sysProDoingMapper.deleteCtmSetting(id, nodeId, userId);
	}
	
	public SysProDoing getUserDoingByProcess(String userId, SysProcess process) {
		return getUserDoingByProcess(userId,process.getId(),process.getNodeId());
	}
}
