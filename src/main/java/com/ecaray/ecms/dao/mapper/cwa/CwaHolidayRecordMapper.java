package com.ecaray.ecms.dao.mapper.cwa;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.ecaray.ecms.entity.cwa.CwaHolidayRecord;

public interface CwaHolidayRecordMapper {
    int deleteByPrimaryKey(String id);

    int insert(CwaHolidayRecord record);

    int insertSelective(CwaHolidayRecord record);

    CwaHolidayRecord selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(CwaHolidayRecord record);

    int updateByPrimaryKey(CwaHolidayRecord record);

	List<CwaHolidayRecord> listUseRecordByUserIdAndMonth(@Param("userId")String userId, @Param("monthkey")String monthkey);
}