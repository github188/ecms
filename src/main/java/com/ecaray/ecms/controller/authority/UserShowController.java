package com.ecaray.ecms.controller.authority;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ecaray.ecms.commons.authorization.annotation.Authorization;
import com.ecaray.ecms.commons.authorization.annotation.CurrentUser;
import com.ecaray.ecms.commons.constant.PageResult;
import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.commons.utils.ParaMap;
import com.ecaray.ecms.entity.authority.SysUserShow;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.authority.Vo.UserShowVo;
import com.ecaray.ecms.services.authority.UserShowService;
import com.github.pagehelper.Page;

/**
 * 新人秀
 * @author Administrator
 *
 */
@RestController
@RequestMapping(value = "authority/show")
public class UserShowController {
	
	@Autowired
	private UserShowService userShowService;
	
	/**
	 * 新增
	 */
	@Authorization
	@RequestMapping(method = RequestMethod.POST)
	public Result addUserShow(@RequestBody SysUserShow userShow,@CurrentUser User user){
		userShow.setAddUser(Long.parseLong(user.getId()));
		return  Result.success().addObject(userShowService.add(userShow));
	}
	
	/**
	 * 编辑
	 */
	@Authorization
	@RequestMapping(method = RequestMethod.PUT)
	public Result editUserShow(@RequestBody SysUserShow userShow){
		return  Result.success().addObject(userShowService.editUserShow(userShow));
	}
	
	/**
	 * 获取列表
	 */
	@Authorization
	@RequestMapping(value = "/list",method = RequestMethod.GET)
	public PageResult getUserShowList(SysUserShow userShow){
		ParaMap map = userShowService.getUserShowList(userShow);
    	Object o = map.get("object");
    	@SuppressWarnings("rawtypes")
		Page page = (Page)map.get("page");
    	Integer pageNum = (Integer)map.get("pageNum");
    	return PageResult.success().addObject(o).addPageInfo(page,pageNum);
	}
	
	/**
	 * 删除
	 */
	@Authorization
	@RequestMapping(value = "/delete",method = RequestMethod.PUT)
	public Result deleteUserShow(@RequestBody SysUserShow userShow){
		userShowService.deleteUserShow(userShow);
		return Result.success();
	}
	
	/**
	 * 获取详情
	 */
	@Authorization
	@RequestMapping(value = "/detail",method = RequestMethod.GET)
	public Result getUserShowById(String id){
		return Result.success().addObject(userShowService.getUserShowById(id));
	}
	
	/**
	 * 更改发布状态
	 */
	@Authorization
	@RequestMapping(value = "/update",method = RequestMethod.PUT)
	public Result chanegeUserShowStatus(@RequestBody SysUserShow userShow){
		userShowService.chanegeUserShowStatus(userShow);
		return Result.success();
	}
	
	/**
	 * 更改发布状态
	 */
	@Authorization
	@RequestMapping(value = "/update/batch",method = RequestMethod.PUT)
	public Result batchUpdateStatus(@RequestBody UserShowVo vo){
		userShowService.batchUpdateStatus(vo);
		return Result.success();
	}
	
	/**
	 * 批量删除
	 */
	@Authorization
	@RequestMapping(value = "/delete/batch",method = RequestMethod.PUT)
	public Result batchDeleteUserShow(@RequestBody UserShowVo vo){
		userShowService.batchDeleteUserShow(vo);
		return Result.success();
	}
	
}
