package com.ecaray.ecms.dao.mapper.sys;

import java.util.List;

import com.ecaray.ecms.entity.sys.SysDateHoliday;

public interface SysDateHolidayMapper {
    int deleteByPrimaryKey(String date);

    int insert(SysDateHoliday record);

    int insertSelective(SysDateHoliday record);

    SysDateHoliday selectByPrimaryKey(String date);

    int updateByPrimaryKeySelective(SysDateHoliday record);

    int updateByPrimaryKey(SysDateHoliday record);

	List<SysDateHoliday> listHolidayByMonth(String monthKey);

	void deleteListByMonth(String monthKey);
}