package com.ecaray.ecms.services.news;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecaray.ecms.commons.constant.PageResult;
import com.ecaray.ecms.commons.utils.DataUtil;
import com.ecaray.ecms.commons.utils.DateUtil;
import com.ecaray.ecms.commons.utils.StrUtils;
import com.ecaray.ecms.dao.mapper.news.NewsComMapper;
import com.ecaray.ecms.dao.mapper.sys.SysToreadMapper;
import com.ecaray.ecms.entity.news.NewsCom;
import com.ecaray.ecms.entity.sys.SysToread;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Service
public class SysToReadService {
	
	@Autowired
	private SysToreadMapper sysToreadMapper;
	
	@Autowired
	private NewsComMapper newsComMapper;
	
	/**
	 * 新增待阅
	 */
	public void saveToRead(SysToread toread){
		String userId = toread.getUserId();
		String refId = toread.getRefId();
		if (getUserToRead(userId,refId) == null) {
			long time = DateUtil.nowTime();
			toread.setAddTime(time);
			toread.setUpdateTime(time);
			String id = toread.getId();
			if (StrUtils.isNull(id)) {
				id = DataUtil.uuidData();
				toread.setId(id);
			}
			toread.setIsRead(0);
			sysToreadMapper.insertSelective(toread);
		}
	}
	
	public SysToread getUserToRead(String userId,String refId) {
		return sysToreadMapper.selectUserToRead(userId,refId);
	}
	
	
	/**
	 * 更新待阅为已读
	 */
	public void updateToRead(SysToread toread){
		long time = DateUtil.nowTime();
		toread.setUpdateTime(time);
		toread.setIsRead(1);
		sysToreadMapper.updateByPrimaryKey(toread);
	}
	
	public PageResult listToReadByUserId(String userId,String key,Integer pageSize,Integer pageNum){
		Page<?> page = PageHelper.startPage(pageNum, pageSize);
		if (StrUtils.isNotNull(key)) {
			key = "%" + key + "%";
		}
		List<SysToread> list = sysToreadMapper.selectListByUser(userId,key);
		for (SysToread read : list) {
			if (read.getType() == 2) {
				String id = read.getRefId();
				NewsCom newcom = newsComMapper.selectByPrimaryKey(id);
				read.setNewscomId(id);
				read.setRefId(newcom.getNewId());
			}
		}
		return PageResult.success().addObject(list).addPageInfo(page, pageNum);
	}
}
