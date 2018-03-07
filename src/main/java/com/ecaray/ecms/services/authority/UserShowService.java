package com.ecaray.ecms.services.authority;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecaray.ecms.commons.constant.DataUtil;
import com.ecaray.ecms.commons.utils.DateUtil;
import com.ecaray.ecms.commons.utils.ParaMap;
import com.ecaray.ecms.commons.utils.StrUtils;
import com.ecaray.ecms.dao.mapper.authority.SysUserShowMapper;
import com.ecaray.ecms.entity.authority.SysUserShow;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.authority.Vo.UserShowVo;
import com.ecaray.ecms.entity.process.Vo.ProDoFilter;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

/**
 * 新人秀
 * @author Administrator
 *
 */
@Service
public class UserShowService {
	
	@Autowired
	SysUserShowMapper showMapper;
	@Autowired
	DeptService deptService;
	@Autowired
	UserService userService;
	
	/**
	 * 添加新人秀成员
	 * @param userShow
	 * @return
	 */
	public String add(SysUserShow userShow){
		if (hasTheUser(userShow)){
			return null;
		}
		String id = userShow.getId();
		if (StrUtils.isNull(id)) {
			id = DataUtil.uuidData();
			userShow.setId(id);
		}
		long time = DateUtil.nowTime();
		userShow.setAddTime(time);
		userShow.setUpdateTime(time);
		userShow.setStatus(0);
		showMapper.insertSelective(userShow);
		return id;
	}
	
	/**
	 * 编辑新人资料
	 * @param userShow
	 * @return
	 */
	public String editUserShow(SysUserShow userShow) {
		if (showMapper.selectUserById(userShow) != null) {
			return null;
		}
		userShow.setUpdateTime(DateUtil.nowTime());
		showMapper.updateByPrimaryKeySelective(userShow);
		return userShow.getId();
	}
	
	/**
	 * 获取详情
	 */
	public SysUserShow getUserShowById (String id) {
		return showMapper.selectByPrimaryKey(id);
	}
	/**
	 * 判断是否已经存在该员工
	 * @param userId 
	 * @return
	 * false:不存在，true:存在
	 */
	public boolean hasTheUser(long userId){
		if (showMapper.selectByUserId(userId) == null) {
			return false;
		}
		return true;
	}
	
	/**
	 * 判断是否已经存在该员工
	 * @return
	 * false:不存在，true:存在
	 */
	public boolean hasTheUser(SysUserShow userShow){
		return hasTheUser(userShow.getUserId());
	}
	
	/**
	 * 查询新人秀列表
	 * @return
	 */
	public ParaMap getUserShowList(SysUserShow userShow){
		String name = userShow.getName();
		if (StrUtils.isNotNull(name)) {
			name = "%" + name + "%";
			userShow.setName(name);
		}
		Page<?> page = PageHelper.startPage(userShow.getPageNum(), userShow.getPageSize());
		List<SysUserShow> list = showMapper.selectListByNameAndStatus(userShow);
		for (SysUserShow sysUserShow : list) {
			User u = userService.getUserByIdNoPassWord(sysUserShow.getUserId() + "");
			sysUserShow.setPost(u.getPost());
			sysUserShow.setDepName(deptService.getAllDept(new StringBuffer(), Long.parseLong(u.getDepId())));
		}
		return ParaMap.getPageHelperMap(list, page);
	}
	
	/**
	 * 删除新人
	 */
	public void deleteUserShow(SysUserShow show) {
		String id = show.getId();
		if (StrUtils.isNull(id)) {
			return ;
		}
		showMapper.deleteByPrimaryKey(id);
	}
	
	/**
	 *  发布/取消发布
	 */
	public void chanegeUserShowStatus(SysUserShow userShow) {
		showMapper.updateByPrimaryKeySelective(userShow);
	}
	
	/**
	 * 批量更新发布状态
	 */
	public void batchUpdateStatus(UserShowVo vo) {
		showMapper.batchUpdateStatus(vo);
	}
	
	/**
	 * 批量删除
	 */
	public void batchDeleteUserShow(UserShowVo vo){
		showMapper.batchDeleteUserShow(vo);
	}
	
}
