package com.ecaray.ecms.controller.news;

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
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.news.PortalLikes;
import com.ecaray.ecms.entity.news.vo.PortalLikesVo;
import com.ecaray.ecms.services.news.PortalLikesService;
import com.github.pagehelper.Page;

@RestController
@RequestMapping(value = "news/likes")
public class NewsLikesController {
	
	@Autowired
	PortalLikesService portalLikesService;
	
	/**
	 * 新增
	 */
	@Authorization
	@RequestMapping(value="/read/add", method = RequestMethod.PUT)
	public Result addNewsLikeOrRead(@RequestBody PortalLikes likes,@CurrentUser User user){
		return Result.success().addObject(portalLikesService.add(likes,user));
	}
	
	/**
	 * 取消点赞
	 */
	@Authorization
	@RequestMapping(value="/update", method = RequestMethod.PUT)
	public Result removeNewsLikeS(@RequestBody PortalLikes likes){
		portalLikesService.updateLikes(likes);
		return Result.success();
	}
	
	/**
	 * 查询点赞人，查看人列表
	 */
	@Authorization
	@RequestMapping(value="/list", method = RequestMethod.GET)
	public PageResult getPortalLikesList(PortalLikesVo vo){
		ParaMap map = portalLikesService.getPortalLikesList(vo);
		Object o = map.get("object");
		Page page = (Page)map.get("page");
    	Integer pageNum = (Integer)map.get("pageNum");
		return PageResult.success().addObject(o).addPageInfo(page,pageNum);
	}
	
	/**
	 * 查询点赞人，查看人列表
	 */
	@Authorization
	@RequestMapping(value="/noread/list", method = RequestMethod.GET)
	public PageResult getPortalNoReadList(PortalLikesVo vo){
		ParaMap map = portalLikesService.getPortalNoReadList(vo);
		Object o = map.get("object");
		Page page = (Page)map.get("page");
		Integer pageNum = (Integer)map.get("pageNum");
		return PageResult.success().addObject(o).addPageInfo(page,pageNum);
	}
	
	/**
	 * 查询人是否点赞，是否查看过
	 */
	@Authorization
	@RequestMapping(value="/status", method = RequestMethod.GET)
	public Result getIsReadOrLike(PortalLikes vo){
		return Result.success().addObject(portalLikesService.getIsReadOrLike(vo));
	}
}
