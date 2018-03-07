package com.ecaray.ecms.services.cwa;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecaray.ecms.commons.constant.Constants;
import com.ecaray.ecms.commons.utils.StrUtils;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.authority.Vo.DepTree;
import com.ecaray.ecms.services.authority.UserService;

@Service
public class CwaProcessVoService implements Constants {

	@Autowired
	UserService userService;

	/**
	 * 查询员工一级部门负责人id,员工部门为营销中心时，为二级部门负责人id type:0时 获取部门，其他获取负责人
	 */
	public String getUserOneManager(User user, int type) {
		int isCenter = 0;
		String depId = user.getDepId();
		DepTree tree = userService.getDeptTree(depId);
		int depth = 0;
		for (DepTree t = tree; t != null; t = t.getParent()) {
			if (t.getId().equals(dep_center_id)) {
				isCenter = 1;
			}
			if (t.getId().equals(dep_maintain_id)) {
				isCenter = 2;
			}
			if (t.getId().equals(dep_increment_id)) {
				isCenter = 3;
			}
			depth++;
		}
		if (isCenter == 1 && depth >= 3) {
			return userService.getUserOneDepLeader(user, dep_center_id, type);
		} else if (isCenter == 2 && depth >= 3) {
			return userService.getUserOneDepLeader(user, dep_maintain_id, type);
		} else if (isCenter == 3 && depth >= 3) {
			return userService.getUserOneDepLeader(user, dep_increment_id, type);
		} else {
			return userService.getUserOneDepLeader(user, dep_ecaray_id, type);
		}
	}

	public String getUserOneManager(User user) {
		return getUserOneManager(user, 1);
	}

	public Integer getUserOneManager(String userId) {
		Integer isLeader = 0;
		User user = userService.getUserById(userId);
		String manager = getUserOneManager(user);
		User leader = userService.getUserById(user.getDirectLeader());
		String leaderId = leader.getId();
		if (userId.equals(manager) || leaderId.equals(manager) || StrUtils.isNull(manager)) {
			isLeader = 1;
		} 
		else if (leader.getUsercode().equals("0001")||user.getUsercode().equals("0001")){
			isLeader = 1;
		} else {
			isLeader = 0;
		}
		return isLeader;
	}

}
