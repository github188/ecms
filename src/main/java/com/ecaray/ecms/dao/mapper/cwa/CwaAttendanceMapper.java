package com.ecaray.ecms.dao.mapper.cwa;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.ecaray.ecms.entity.cwa.CwaAttReport;
import com.ecaray.ecms.entity.cwa.CwaAttendance;
import com.ecaray.ecms.entity.cwa.vo.CwaAttenUserVo;
import com.ecaray.ecms.entity.cwa.vo.CwaAttendanceVo;
import com.ecaray.ecms.entity.cwa.vo.CwaFilter;

public interface CwaAttendanceMapper {
	
    int deleteByPrimaryKey(String id);

    int insert(CwaAttendance record);

    int insertSelective(CwaAttendance record);

    CwaAttendance selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(CwaAttendance record);

    int updateByPrimaryKey(CwaAttendance record);

    /*****************************************************/

	List<CwaAttReport> selectAttendanceReport(CwaAttenUserVo vo);
	
	List<CwaAttendance> selectByUserDate(@Param("userId")String userId, @Param("date")String date);

	List<CwaAttendance> selectAttendanceList(CwaAttendance cwaAttendance);

	List<CwaAttendance> selectAttendanceListLikeMonth(CwaAttendanceVo vo);

	void updateCwaAttendanceByRefId(CwaAttendance cwaAttendance);
	
	void deleteByRefId(String refId);

	void updateCwaAttendanceCover(CwaFilter filter);

	List<CwaAttendance> listAttendanceByTime(@Param("userId")String userId, @Param("starttime")long starttime, @Param("endtime")long endtime);


	List<CwaAttendance> listOldUserAttendance();

	void deleteCwaExceptionAtt(@Param("userId")String userId,@Param("date") String date);

	List<CwaAttendance> selectListByRefId(String id);

	List<CwaAttendance> listAttendanceByTimeNotOvertime(@Param("userId")String userId, @Param("starttime")long starttime, @Param("endtime")long endtime);

	List<CwaAttendance> selectDayAllList(@Param("userId")String userId, @Param("date")String startDay);

	List<CwaAttendance> listAttendanceByTimeNoIng(@Param("userId")String userId, @Param("starttime")long starttime, @Param("endtime")long endtime);
	List<CwaAttendance> listAttendanceByTimeIng(@Param("userId")String userId, @Param("starttime")long starttime, @Param("endtime")long endtime);

	CwaAttendance getAttendanceByResultId(@Param("userId")String userId,@Param("date") String startday, @Param("refId")String resultId);

	void updateCwaAttendanceByUserDateType(CwaAttendance att);

	List<CwaAttendance> getExcepetionList();
}