package com.ecaray.ecms.dao.mapper.sys;

import org.apache.ibatis.annotations.Param;

import com.ecaray.ecms.entity.authority.Dept;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.sys.SysDept;

public interface SysExcelTestMapper {
	
    SysDept selectByPrimaryKey(String id);
    
    SysDept selectByName(String name);

	SysDept selectByNameAndParentId(@Param("name")String string, @Param("parentId")String string2);

	void insertSysDept(SysDept depTwo);

	Integer selectMaxOrder();
	
	void insertUser(User user);

	User selectUserByName(String realname);
	String selectUserByUsercode(String usercode);
	void updateUser(User user);

	void updateCreateTimeByUserCode(User user);

	String selectoneDepIdByName(String twoName);

	String selecttwoDepIdByName(@Param("oneName")String depName,@Param("twoName")String twoName);
	
	String selectthreeDepIdByName(@Param("oneName")String depName,@Param("twoName")String twoName,@Param("threeName")String threeName);

	void updateDeptLeader(Dept dep);

	void updateUserPassword(@Param("usercode")String usercode, @Param("password")String password);
}