package com.ecaray.ecms.dao.mapper.ctm;

import java.util.List;

import com.ecaray.ecms.entity.ctm.CtmFiles;

public interface CtmFilesMapper {
    int deleteByPrimaryKey(String id);

    int insert(CtmFiles record);

    int insertSelective(CtmFiles record);

    CtmFiles selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(CtmFiles record);

    int updateByPrimaryKey(CtmFiles record);

	int deleteFilesListByRefId(List<String> ids);

	List<CtmFiles> selectFileListByRefId(List<String> ids);

}