package com.ecaray.ecms.dao.mapper.cwa;

import java.util.List;

import com.ecaray.ecms.entity.cwa.CwaLeave;
import com.ecaray.ecms.entity.cwa.CwaTravel;

public interface CwaTravelMapper {
    int deleteByPrimaryKey(String id);

    int insert(CwaTravel record);

    int insertSelective(CwaTravel record);

    CwaTravel selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(CwaTravel record);

    int updateByPrimaryKey(CwaTravel record);

	List<CwaTravel> selectListByUserId(String userId);

	List<CwaTravel> selectList();
}