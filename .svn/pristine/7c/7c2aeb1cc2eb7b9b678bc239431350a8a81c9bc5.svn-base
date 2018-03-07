package com.ecaray.ecms.services.authority;

import com.ecaray.ecms.commons.constant.PageResult;
import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.commons.utils.DataUtil;
import com.ecaray.ecms.dao.mapper.authority.RoleMapper;
import com.ecaray.ecms.entity.authority.Role;
import com.ecaray.ecms.entity.authority.UserRole;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * com.ecaray.authority.services
 * Author ：zhxy
 * 2017/1/16 11:50
 * 说明：角色信息服务类
 */
@Service
public class RoleService {
    @Autowired
    private RoleMapper roleMapper;

    /**
     * Author ：zhxy
     * 说明：取得角色信息
     * @param statusStr
     * @param name
     * @param pageNum
     * @param pageSize
     */
    public PageResult selectRoleList(String statusStr, String name, int pageNum, int pageSize) {
        if(name!=null&&!"".equals(name))
            name = "%"+name+"%";
        Page page = PageHelper.startPage(pageNum,pageSize);
        List<Role> roles = roleMapper.selectRoles(statusStr,name);
        return PageResult.success().addObject(roles).addPageInfo(page,pageNum);
    }

    public boolean isNumeric(String str){
        Pattern pattern = Pattern.compile("[0-9]*");
        Matcher isNum = pattern.matcher(str);
        if( !isNum.matches() ){
            return false;
        }
        return true;
    }
    /**
     * Author ：zhxy
     * 说明：添加角色
     */
    public Result addRole(Role role){
        role.setId(DataUtil.randomId());
        role.setStatus(0);
        roleMapper.insertSelective(role);
        return Result.success();

    }
    /**
     * Author ：zhxy
     * 说明：更新角色信息
     */
    public Result updateRole(Role role){
        if(DataUtil.isNullOrEmpty(role.getId()))
            return Result.failed("id is empty");
        roleMapper.updateByPrimaryKeySelective(role);
        return Result.success();
    }

    /**
     * Author ：zhxy
     * 说明：删除ID
     */
    public Result delRoleByKey(String id){
        if(DataUtil.isNullOrEmpty(id))
            return Result.failed("id is empty");
        Role role = new Role();
        role.setId(id);
        role.setIsDelete(1);
        roleMapper.updateByPrimaryKey(role);
        return Result.success();
    }

    @Transactional
    public PageResult selectRoleByUser(String userId, int pageNum, int pageSize) {
       Page<?> page = PageHelper.startPage(pageNum,pageSize);
       List<Role> roles = roleMapper.selectRoleByUser(userId);
       return PageResult.success().addObject(roles).addPageInfo(page,pageNum);
    }
    
    /**
     * 
     * 查询用户角色id列表
     * @param userId
     * @return
     */
    public List<Role> listRoleByUserId(String userId){
    	return roleMapper.selectRoleByUser(userId);
    }
   
    /**
     * 查询角色id通过code
     */
    public String getRoleIdByCode(int code) {
    	return roleMapper.selectRoleIdByCode(code);
    }
    
}
