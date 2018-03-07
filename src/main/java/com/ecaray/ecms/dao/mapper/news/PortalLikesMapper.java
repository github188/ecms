package com.ecaray.ecms.dao.mapper.news;

import java.util.List;

import com.ecaray.ecms.entity.news.PortalLikes;
import com.ecaray.ecms.entity.news.vo.PortalLikesVo;

public interface PortalLikesMapper {
    int deleteByPrimaryKey(String id);

    int insert(PortalLikes record);

    int insertSelective(PortalLikes record);

    PortalLikes selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(PortalLikes record);

    int updateByPrimaryKey(PortalLikes record);

	List<PortalLikesVo> selectListByVo(PortalLikesVo vo);

	int selectNewsData(PortalLikes likes);

	int selectIsReadOrLike(PortalLikes protalLikes);

	void updateByUserAndRef(PortalLikes protalLikes);

	int selectNoReadCount(String newsId);

	List<String> selectNoReadListByVo(PortalLikesVo vo);
}