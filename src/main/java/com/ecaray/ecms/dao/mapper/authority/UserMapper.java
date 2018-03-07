package com.ecaray.ecms.dao.mapper.authority;

import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.authority.Vo.*;
import com.ecaray.ecms.entity.cwa.CwaPunchCard;

import org.apache.ibatis.annotations.Param;
import org.mybatis.spring.annotation.MapperScan;

import java.util.List;

@MapperScan
public interface UserMapper {
    int deleteByPrimaryKey(long id);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(String id);

    List<User> selectAllUsers();

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);

    List<User> selectUserByDeptId(@Param("list") List<String> depids ,@Param("queryInfo") String queryInfo);

    User selectUserByAccount(@Param("username") String username);

    User selectUserById(@Param("userId") String userId);

    List<UserBaseInfo> selectUserBaseInfos();

    List<UserDeptTreeVo> selectUserTreeWithDept();

    List<UserDeptTreeVo> selectUserTreeWithDeptNocheck();

    List<UserContacts> selectUserContacts(String[] userArray);

    UserDetailVo selectUserDetailById(@Param("id") String id);

    List <UserDetailVo> selectUsersByNameOrDept(@Param("queryInfo") String queryInfo);

    List<UserSubTreeVo> selectSubordinateTree(@Param("userId") String userId);
    
    String selectDepName(String userId);

	String getDeptLeader(String userId);

	DepTree selectDepTree(String depId);

	UserTree selectUserTree(String userId);

	void restartUserPassword(User user);

	List<User> selectUserPhoneList(UserFilter userFilter);

	List<User> selectUserListByMonth(String month);

	List<User> selectAllUserList();

	String selectUserPasswordByName(String realname);

	User selectUserByUsercode(String usercode);

	User selectUserByIdNoPassWord(String userId);

	void insertTotmp(User user);

	User selectByrealname(String name);

	List<User> selectUserListByPc(CwaPunchCard pc);

	List<User> getAllUserList();

	int selectUserCount();

	List<String> selectUserListByDepId(@Param("list")List<String> deptids);

	User getUserByLikename(String nameKey);
}