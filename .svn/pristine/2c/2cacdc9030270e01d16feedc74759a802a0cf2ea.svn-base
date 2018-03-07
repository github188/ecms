package com.ecaray.ecms.services.ctm;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecaray.ecms.commons.utils.DateUtil;
import com.ecaray.ecms.dao.mapper.ctm.CtmFilesMapper;
import com.ecaray.ecms.entity.ctm.CtmFiles;

@Service
public class CtmFilesService {
	
	@Autowired
	private CtmFilesMapper mapper;
	
	/**
	 * 新增
	 */
	public void add(CtmFiles f) {
		long now = DateUtil.nowTime();
		f.setAddTime(now);
		f.setUpdateTime(now);
		mapper.insertSelective(f);
	}
	
	/**
	 * 查询附件列表
	 */
	public List<CtmFiles> getFileListByRefId(String id) {
		List<String> ids = new ArrayList<String>();
		ids.add(id);
		return mapper.selectFileListByRefId(ids);
	}
	
	/**
	 * 删除所有附件
	 * @param id
	 */
	public void deleteFilesListByRefId(String id) {
		List<String> ids = new ArrayList<String>();
		ids.add(id);
		mapper.deleteFilesListByRefId(ids);
	}

	public void update(CtmFiles f) {
		
	}
	
}
