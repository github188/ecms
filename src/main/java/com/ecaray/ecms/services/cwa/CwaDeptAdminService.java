package com.ecaray.ecms.services.cwa;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecaray.ecms.commons.constant.Constants;
import com.ecaray.ecms.commons.utils.DataUtil;
import com.ecaray.ecms.commons.utils.DateUtil;
import com.ecaray.ecms.commons.utils.StrUtils;
import com.ecaray.ecms.dao.mapper.cwa.CwaDeptAdminMapper;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.authority.UserRole;
import com.ecaray.ecms.entity.authority.Vo.DeptTreeVo;
import com.ecaray.ecms.entity.cwa.CwaDeptAdmin;
import com.ecaray.ecms.services.authority.DeptService;
import com.ecaray.ecms.services.authority.UserRoleService;

@Service
public class CwaDeptAdminService implements Constants {
	
	@Autowired
	private CwaDeptAdminMapper cwaDeptAdminMapper;
	@Autowired
	private UserRoleService userRoleService;
	@Autowired
	private DeptService deptService;
	
	/**
	 * 通过部门id查询考勤管理员
	 */
	public CwaDeptAdmin getAttendanceAdminByDepId(String depId) {
		return cwaDeptAdminMapper.selectByPrimaryDepId(depId);
	}
	
	/**
	 * 查询某人是哪些部门的考勤管理员
	 */
	public List<String> listDepIdByAdminId(String userId) {
		return cwaDeptAdminMapper.selectdepListByUserId(userId);
	}
	
	/**
	 * 获取某人所能看到考勤数据的部门树
	 */
	public List<DeptTreeVo> getAttendanceDepTree(User user) {
		String userId = user.getId();
		List<String> depList = listDepIdByAdminId(userId);
		List<String> roleList = userRoleService.getRoleCodeListByUserId(userId);
		if (roleList.contains("5") || roleList.contains("8")) {
			return deptService.selectDeptTreeListById(1);
		}
		List<String> leaderList = deptService.getdepIdByLeaderId(userId);
		depList.addAll(leaderList);
		List<DeptTreeVo> list = new ArrayList<DeptTreeVo>();
		if (depList.contains("1")) {
			return deptService.selectDeptTreeListById(1);
		}
		for(String depId : depList) {
			List<DeptTreeVo> vo = deptService.selectDeptTreeListById(Long.parseLong(depId));
			list.addAll(vo);
		}
		return list;
	}
	
	/**
	 * 获取某人所能看到考勤数据的部门树
	 */
	public List<DeptTreeVo> getProjectDepTree(User user) {
		String userId = user.getId();
		List<String> roleList = userRoleService.getRoleCodeListByUserId(userId);
		if (roleList.contains("20001")) {
			return deptService.selectDeptTreeListById(1);
		}
		List<String> leaderList = deptService.getdepIdByLeaderId(userId);
		List<DeptTreeVo> list = new ArrayList<DeptTreeVo>();
		for(String depId : leaderList) {
			List<DeptTreeVo> vo = deptService.selectDeptTreeListById(Long.parseLong(depId));
			list.addAll(vo);
		}
		return list;
	}
	
	/**
	 * 设置部门考勤管理员
	 */
	public void setDeptAttendanceAdmin(User user, CwaDeptAdmin cwaDeptAdmin) {
		long now = DateUtil.nowTime();
		cwaDeptAdmin.setAddUser(user.getId());
		String deproleId = userRoleService.selectByRoleCode(cwa_role_dept);
		String ecarroleId = userRoleService.selectByRoleCode(cwa_role_ecar);
		String addId = deproleId;
		if(cwaDeptAdmin.getDepId().equals("1")) {
			addId = ecarroleId;
		}
		if (StrUtils.isNotNull(cwaDeptAdmin.getId())) {
			CwaDeptAdmin old = cwaDeptAdminMapper.selectByPrimaryKey(cwaDeptAdmin.getId());
			String olduserId = old.getUserId();
			UserRole userrole = new UserRole();
			userrole.setUserId(olduserId);
			userrole.setRoleId(addId + "");
			userRoleService.deleteUserRole(userrole);
			List<String> roleIdList = userRoleService.getRoleIdListByUserId(cwaDeptAdmin.getUserId());
			if(!roleIdList.contains(deproleId)) {
				userrole.setUserId(cwaDeptAdmin.getUserId());
				userRoleService.add(userrole);
			}
			cwaDeptAdmin.setUpdateTime(now);
			cwaDeptAdminMapper.updateByPrimaryKeySelective(cwaDeptAdmin);
		} else {
			String id = DataUtil.uuidData();
			cwaDeptAdmin.setAddTime(now);
			cwaDeptAdmin.setUpdateTime(now);
			cwaDeptAdmin.setId(id);
			cwaDeptAdminMapper.insertSelective(cwaDeptAdmin);
			UserRole userrole = new UserRole();
			userrole.setUserId(cwaDeptAdmin.getUserId());
			userrole.setRoleId(addId);
			List<String> roleIdList = userRoleService.getRoleIdListByUserId(cwaDeptAdmin.getUserId());
			if(!roleIdList.contains(deproleId)) {
				userrole.setUserId(cwaDeptAdmin.getUserId());
				userRoleService.add(userrole);
			}
		}
	}
}
