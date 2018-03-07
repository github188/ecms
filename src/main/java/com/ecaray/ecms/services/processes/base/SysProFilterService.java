package com.ecaray.ecms.services.processes.base;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecaray.ecms.dao.mapper.process.SysProFilterMapper;
import com.ecaray.ecms.entity.process.SysProFilter;

@Service
public class SysProFilterService {

	@Autowired
	private SysProFilterMapper mapper;
	
	public List<SysProFilter> selectNodeFilters(String nodeId) {
		return mapper.selectNodeFilters(nodeId);
	}

	
}
