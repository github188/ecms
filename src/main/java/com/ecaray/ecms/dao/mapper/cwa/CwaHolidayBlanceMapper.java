package com.ecaray.ecms.dao.mapper.cwa;

import org.apache.ibatis.annotations.Param;

import com.ecaray.ecms.entity.cwa.CwaHolidayBlance;

public interface CwaHolidayBlanceMapper {
    int deleteByPrimaryKey(String userId);

    int insert(CwaHolidayBlance record);

    int insertSelective(CwaHolidayBlance record);

    CwaHolidayBlance selectByPrimaryKey(String userId);

    int updateByPrimaryKeySelective(CwaHolidayBlance record);

    int updateByPrimaryKey(CwaHolidayBlance record);

	CwaHolidayBlance selectBlanceByUserIdAndMonth(@Param("userId")String userId, @Param("month")String preMonth);
}