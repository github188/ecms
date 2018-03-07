package com.ecaray.ecms.dao.mapper.pmo;

import com.ecaray.ecms.entity.pmo.PmoProject;
import com.ecaray.ecms.entity.pmo.Vo.PmoProjectQueryVo;
import com.ecaray.ecms.entity.pmo.Vo.ProjectQueryFilter;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * com.ecaray.imspmo.dao.mapper.pmo
 * Author ：zhxy
 * 2017/4/4 2:51
 * 说明：TODO
 */
public interface PmoProjectMapper {
    public void insertSelective(PmoProject pmoProject);

    public String selectMaxMonthProCode(String s);

    public PmoProject selectByPrimaryKey(String projectId);

    List<PmoProject> selectPmoProjectList(ProjectQueryFilter projectQueryFilter);

    void updateByPrimaryKeySelective(PmoProject pmoProject);


    List<PmoProjectQueryVo> selectPmoProjectListByUser(ProjectQueryFilter projectQueryFilter);

    int selectProjectCount();

    int selectProjectPartCount(@Param("userId") String userId);

    int selectProjectTodoCount(String userId);

}
