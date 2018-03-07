package com.ecaray.ecms.dao.mapper.cwa;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.ecaray.ecms.entity.cwa.CwaAttReport;
import com.ecaray.ecms.entity.cwa.vo.CwaAttendanceFilter;

public interface CwaAttendanceReportMapper {
    int deleteByPrimaryKey(String id);

    int insert(CwaAttReport record);

    int insertSelective(CwaAttReport record);

    CwaAttReport selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(CwaAttReport record);

    int updateByPrimaryKey(CwaAttReport record);

	List<CwaAttReport> selectSubmitList(CwaAttendanceFilter filter);

	List<CwaAttReport> selectAdminAttList(CwaAttendanceFilter filter);

	CwaAttReport selectByUserAndDate(CwaAttReport sub);

	CwaAttReport selectByUserAndDateNoSb(CwaAttReport sub);

	List<CwaAttReport> selectReportListByRole(CwaAttendanceFilter filter);

	List<CwaAttReport> selectReportListByMonth(String month);

	void updateAttendanceStatus(@Param("list")List<String> userlist, @Param("month")String month,@Param("status")int status);

	List<Integer> listReportStatus(@Param("list")List<String> userlist, @Param("month")String month);
}