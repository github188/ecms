package com.ecaray.ecms.dao.mapper.authority;

import java.util.List;

import com.ecaray.ecms.entity.authority.SysUserShow;
import com.ecaray.ecms.entity.authority.Vo.UserShowVo;

public interface SysUserShowMapper {
    int deleteByPrimaryKey(String id);

    int insert(SysUserShow record);

    int insertSelective(SysUserShow record);

    SysUserShow selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(SysUserShow record);

    int updateByPrimaryKey(SysUserShow record);
    
    SysUserShow selectByUserId(Long userId);

	List<SysUserShow> selectListByNameAndStatus(SysUserShow userShow);

	SysUserShow selectUserById(SysUserShow userShow);

	void batchUpdateStatus(UserShowVo vo);

	void batchDeleteUserShow(UserShowVo vo);
}