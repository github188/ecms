package com.ecaray.ecms.entity.authority.Vo;

import com.ecaray.ecms.entity.authority.User;

/**
 * com.ecaray.authority.entity.Vo
 * Author ：zhxy
 * 2017/4/21 17:16
 * 说明：TODO
 */

public class UserDetailVo extends User {
    private String depName;

    private String leaderName;

    private String sex;
    
    private String joindate;

    public String getDepName() {
        return depName;
    }

    public void setDepName(String depName) {
        this.depName = depName;
    }

    public String getLeaderName() {
        return leaderName;
    }

    public void setLeaderName(String leaderName) {
        this.leaderName = leaderName;
    }
	public String getJoindate() {
		return joindate;
	}

	public void setJoindate(String joindate) {
		this.joindate = joindate;
	}
}
