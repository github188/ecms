package com.ecaray.ecms.dao.mapper.pmo;


import com.ecaray.ecms.entity.pmo.PmoPerson;
import org.apache.ibatis.annotations.Param;

import java.util.List;


public interface PmoPersonMapper {
    int deleteByPrimaryKey(String id);

    int insert(PmoPerson record);

    int insertSelective(PmoPerson record);

    PmoPerson selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(PmoPerson record);

    int updateByPrimaryKey(PmoPerson record);

    List<PmoPerson> selectByProjectId(@Param("projectId") String projectId,@Param("userType") String userType);

    List<PmoPerson> selectByProectIdAndCategory(String projectId,String personCategory);

    void addPersonBatch(List<PmoPerson> pmoPersonList);

    void deleteByProId(String proId);

    PmoPerson selectByPersonId(@Param("personId")String personId,@Param("proId")String proId);
}