package com.ecaray.ecms.dao.mapper.sys;

import java.util.List;

import com.ecaray.ecms.entity.authority.SysUserFine;
import com.ecaray.ecms.entity.ctm.CtmContract;
import com.ecaray.ecms.entity.cwa.CwaAttReport;
import com.ecaray.ecms.entity.news.News;

public interface SysTestMapper {
	
	List<CtmContract> selectAllCtmContract();

	List<CwaAttReport> selectAllCwaReport();
	
	List<SysUserFine> selectAllUserFine();

	List<News> selectAllNews();
}
