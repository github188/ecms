package com.ecaray.ecms.dao.mapper.process;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.ecaray.ecms.entity.process.SysParameter;

public interface SysParameterMapper {
    int deleteByPrimaryKey(String id);

    int insert(SysParameter record);

    int insertSelective(SysParameter record);

    SysParameter selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(SysParameter record);

    int updateByPrimaryKey(SysParameter record);

	List<SysParameter> selectParameterList(SysParameter param);

	String getMaxValueByCode(String code);

	String selectParameterNameByValue(@Param("code")String code,@Param("value")String value);

	int hasTheName(@Param("id")String id,@Param("code")String code, @Param("name")String name);
}