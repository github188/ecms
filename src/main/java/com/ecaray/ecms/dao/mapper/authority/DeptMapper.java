package com.ecaray.ecms.dao.mapper.authority;


import com.ecaray.ecms.entity.authority.Dept;
import com.ecaray.ecms.entity.authority.Vo.DeptDetailVo;
import com.ecaray.ecms.entity.authority.Vo.DeptTreeVo;
import com.ecaray.ecms.entity.authority.Vo.DeptVo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface DeptMapper {
    int deleteByPrimaryKey(long id);

    int insertSelective(Dept record);

    Dept selectByPrimaryKey(long id);

    int updateByPrimaryKeySelective(Dept record);

    List<DeptVo> selectDeptChildrenById(String id);

    List<Dept> selectDeptByParentId(@Param("pid") String pid);

    List<Dept> selectDeptListAll();

	List<DeptTreeVo> selectDeptTreeList(long id);

    DeptDetailVo selectDetailByPrimaryKey(long id);

    void deleteDeptsBatch(List<String> depIds);

	List<Dept> selectAttendanceDept();

	List<Dept> getDeptListByParentId(String parentId);

	List<String> selectdepIdByLeaderId(String userId);

	List<String> selectDepLeaderList();

	String selectDeptByName(String parentName);

	String selectDeptByNameAndGName(@Param("parentName") String parentName,@Param("GName")  String gName);

	Dept selectDeptByNameAndPName(@Param("name")String name,@Param("pname") String parentName);
}