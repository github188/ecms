package com.ecaray.ecms.dao.mapper.ctm;

import java.util.List;

import com.ecaray.ecms.entity.ctm.CtmTemplate;
import com.ecaray.ecms.entity.ctm.Vo.CtmTemplateTree;

public interface CtmTemplateMapper {
    int deleteByPrimaryKey(String id);

    int insert(CtmTemplate record);

    int insertSelective(CtmTemplate record);

    CtmTemplate selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(CtmTemplate record);

    int updateByPrimaryKey(CtmTemplate record);

	CtmTemplateTree selectCtmTemplateTree(String id);
	
	List<CtmTemplate> selectCtmTemplateList();
	
	int deleteCtmTemplate(List<String> id);

//	CtmTemplateFoo selectCtmTemplatefoo(String id);
}