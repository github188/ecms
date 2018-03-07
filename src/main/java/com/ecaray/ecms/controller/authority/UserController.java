package com.ecaray.ecms.controller.authority;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecaray.ecms.commons.authorization.annotation.Authorization;
import com.ecaray.ecms.commons.authorization.annotation.CurrentUser;
import com.ecaray.ecms.commons.authorization.manager.TokenManager;
import com.ecaray.ecms.commons.constant.PageResult;
import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.commons.utils.ParaMap;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.authority.Vo.AccountMsg;
import com.ecaray.ecms.entity.authority.Vo.BatchUserVo;
import com.ecaray.ecms.entity.authority.Vo.UserFilter;
import com.ecaray.ecms.services.authority.UserService;
import com.github.pagehelper.Page;

import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

/**
 * Author ：zhxy 2017/1/14 12:09 说明：用户操作
 */
@RestController
@RequestMapping("authority/user")
public class UserController {

	@Autowired
	private UserService userService;

	@Autowired
	private TokenManager tokenManager;
	Logger logger = LoggerFactory.getLogger(UserController.class);

	@Authorization
	@RequestMapping(value = "list", method = RequestMethod.GET)
	public PageResult selectUserList(@RequestParam int pageNum, @RequestParam int pageSize) {
		return userService.selectUserList(pageNum, pageSize);
	}
	
	@Authorization
	@RequestMapping(value = "/{id}/detail", method = RequestMethod.GET)
	public Result selectUserDetailById(@PathVariable("id") String id) {
		return userService.selectUserDetailById(id);
	}

	@ApiOperation(value = "首页用户基本列表", notes = "用户基本信息列表")
	@RequestMapping(value = "/homepage/detail", method = RequestMethod.GET)
	@Authorization
	@ApiImplicitParams({
			@ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"), })
	public Result selectHomePageUserDetail(@CurrentUser User user) {
		return userService.selectUserDetailById(user.getId());
	}

	@ApiOperation(value = "用户基本列表", notes = "用户基本信息列表")
	@RequestMapping(value = "/baseinfo/list", method = RequestMethod.GET)
	@Authorization
	@ApiImplicitParams({
			@ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"), })
	public Result selectUserList() {
		return userService.selectUserBaseInfoList();
	}

	@ApiOperation(value = "添加用户", notes = "参数：user")
	@RequestMapping(method = RequestMethod.POST)
	@Authorization
	@ApiImplicitParams({
			@ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"), })
	public Result addUser(@RequestBody User user) {
		User userTmp = userService.selectUserByAccount(user.getUsername());
		if (userTmp != null) {
			return Result.failed("新增失败,此账号已存在!");
		}
		return userService.addUser(user);
	}

	@ApiOperation(value = "更新用户", notes = "参数：user")
	@RequestMapping(method = RequestMethod.PUT)
	@Authorization
	@ApiImplicitParams({
			@ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"), })
	public Result updateUser(@RequestBody User user) {
		return userService.updateUser(user);
	}

	@ApiOperation(value = "更新用户", notes = "参数：user")
	@RequestMapping(value = "/{id}/{status}/leave", method = RequestMethod.PUT)
	@Authorization
	@ApiImplicitParams({
			@ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"), })
	public Result changeUserLeaveStatus(@PathVariable("id") String id, @PathVariable("status") int status) {
		User user = new User();
		user.setId(id);
		user.setIsLeave(status);
		return userService.updateUser(user);
	}

	@ApiOperation(value = "删除用户", notes = "参数：id")
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@Authorization
	@ApiImplicitParams({
			@ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"), })
	public Result delUser(@PathVariable("id") String id) {
		return userService.delUser(id);
	}

	@ApiOperation(value = "查询部门所属员工列表", notes = "select dep users by dep id")
	@RequestMapping(value = "dep/{depid}", method = RequestMethod.GET)
	@Authorization
	@ApiImplicitParams({
			@ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"), })
	public PageResult selectUserByDeptId(@PathVariable("depid") String id, @RequestParam("pageNum") int pageNum,
			@RequestParam("pageSize") int pageSize, String queryInfo) {
		return userService.selectUserByDeptId(id, pageNum, pageSize, queryInfo);
	}

	@ApiOperation(value = "导出项目")
	@RequestMapping(value = "dep/{depid}/download", method = RequestMethod.GET)
	@Authorization
	public void downloadExcel(String queryInfo, HttpServletResponse response, HttpServletRequest request,
			@PathVariable("depid") String id) {
		userService.exportUserList(id, queryInfo, response, request);
	}

	@ApiOperation(value = "查询用户树表", notes = "select user tree ")
	@RequestMapping(value = "/userdept/tree/{nocheck}", method = RequestMethod.GET)
	@Authorization
	@ApiImplicitParams({
			@ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"), })
	public Result selectUserTreeWithDept(@PathVariable("nocheck") String nocheck) {
		return userService.selectUserTreeWithDept(nocheck);
	}

	@ApiOperation(value = "根据用户id查询用户联系方式列表", notes = "select user contacts ")
	@RequestMapping(value = "/contacts/list", method = RequestMethod.GET)
	@Authorization
	@ApiImplicitParams({
			@ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"), })
	public Result selectUserContacts(@RequestParam String userIds) {
		return userService.selectUserContacts(userIds);
	}

	@ApiOperation(value = "根据用户名或者科室名称获取用户列表", notes = "select user contacts ")
	@RequestMapping(value = "/query/list", method = RequestMethod.GET)
	@Authorization
	@ApiImplicitParams({
			@ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"), })
	public PageResult selectUsersByNameOrDept(String queryInfo, @RequestParam("pageNum") int pageNum,
			@RequestParam("pageSize") int pageSize) {
		return userService.selectUsersByNameOrDept(queryInfo, pageNum, pageSize);
	}

	@ApiOperation(value = "修改用户密码", notes = "change user password ")
	@RequestMapping(value = "/reset/password", method = RequestMethod.PUT)
	@Authorization
	@ApiImplicitParams({
			@ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"), })
	public Result changePassword(@RequestBody AccountMsg accountMsg, @CurrentUser User user) {

		if (StringUtils.isEmpty(accountMsg.getNewPass()) || StringUtils.isEmpty(accountMsg.getOldPass())) {
			return Result.failed("修改失败:密码为空!");
		}
		if (!accountMsg.getOldPass().equals(user.getPassword())) {
			return Result.failed("修改失败：旧密码输入错误");
		}
		User updateUser = new User();
		updateUser.setUpdateTime(System.currentTimeMillis());
		updateUser.setId(user.getId());
		updateUser.setPassword(accountMsg.getNewPass());
		logger.info("修改密码完毕：" + user.getRealname());
		Result result = userService.updateUser(updateUser);
		// 如果修改成功，则设置redis失效
		if ("success".equals(result.getCode())) {
			tokenManager.deleteToken(user.getId());
		}
		return result;
	}

	/**
	 * Author ：zhxy 说明：上传新闻图片（返回图片的ID） value = "content0",
	 */
	@RequestMapping(value = "/picture/head/upload")
	public Result upLoadNewstopPicture(HttpServletRequest request) {
		return userService.springUpload("user/pic/head", request);
	}

	/**
	 * 获取用户头像
	 */
	@RequestMapping(value = "/picture/head/{picId}/download", method = RequestMethod.GET)
	public void downLoadNewsTopPicture(@PathVariable("picId") String picId,Integer width,Integer height, HttpServletResponse response,HttpServletRequest req) throws IOException {
		userService.getHeadPicture(picId,width,height,response,req);
	}
	
	@Authorization
	@RequestMapping(value = "/update/batch", method = RequestMethod.PUT)
	public Result batchUpdateUserInfo(@RequestBody BatchUserVo vo, @CurrentUser User user) {
		userService.batchUpdateUserDept(vo);
		return Result.success();
	}

	@Authorization
	@RequestMapping(value = "/update/restart", method = RequestMethod.PUT)
	public Result restartUserPassword(@RequestBody User user) {
		userService.restartUserPassword(user);
		return Result.success();
	}

	/**
	 * 通讯录
	 * 
	 * @param filter
	 * @return
	 */
	@Authorization
	@RequestMapping(value = "/phone/list", method = RequestMethod.GET)
	public PageResult getAllUserPhoneList(UserFilter filter) {
		ParaMap map = userService.selectUserPhoneList(filter);
		if (map == null) {
			return PageResult.success();
		}
		Object o = map.get("object");
		Page<?> page = (Page<?>) map.get("page");
		Integer pageNum = (Integer) map.get("pageNum");
		return PageResult.success().addObject(o).addPageInfo(page, pageNum);
	}

	@Authorization
	@RequestMapping(value = "/mail/login", method = RequestMethod.GET)
	public Result loginExMail(@CurrentUser User user) throws Exception {
		return userService.loginExMail(user);
	}

	@Authorization
	@RequestMapping(value = "/mail/toread", method = RequestMethod.GET)
	public Result getUserMailToRead(@CurrentUser User user) throws Exception {
		return userService.getUserMailToRead(user);
	}
}
