package com.ecaray.ecms.dao.mapper.pmo;

import com.ecaray.ecms.entity.pmo.PmoRequire;
import com.ecaray.ecms.entity.pmo.Vo.PmoRequireDetailVo;
import com.ecaray.ecms.entity.pmo.Vo.PmoRequireQueryVo;
import com.ecaray.ecms.entity.pmo.Vo.RequireQueryFilter;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface PmoRequireMapper {
    int deleteByPrimaryKey(String id);

    int insert(PmoRequire record);

    int insertSelective(PmoRequire record);

    PmoRequire selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(PmoRequire record);

    int updateByPrimaryKey(PmoRequire record);

    List<PmoRequireQueryVo> selectRequireList(RequireQueryFilter requireQueryFilter);

    PmoRequireDetailVo selectByRequireId(String requireId);


    List<PmoRequireQueryVo> selectPmoRequireListByUser(RequireQueryFilter requireQueryFilter);

    int selectRequireCount();

    int selectRequirePartCount(@Param("addUserId")String addUserId);

    int selectRequireTodoCount(@Param("userId") String userId);

    String selectMaxMonthReqCode(String reqCode);
}