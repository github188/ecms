package com.ecaray.ecms.dao.mapper.news;


import com.ecaray.ecms.entity.news.News;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface NewsMapper {
    int deleteByPrimaryKey(String id);

    int insertSelective(News record);

    News selectByPrimaryKey(@Param("id")String id,@Param("comStatus") String comStatus);
    
    News selectById(String id);

    int updateByPrimaryKeySelective(News record);

    List<News> selectNewsList(@Param("isTop") String isTop,
                              @Param("newsType") String newsType,
                              @Param("isPublish")String isPublish,
                              @Param("newsTitle")String newsTitle,
                              @Param("newsAuthor")String newsAuthor,
                              @Param("key")String key,
                              @Param("userId")String userId);

    String selectNewsCommentName(@Param("acctId") String acctId);

	List<News> selectNewsAsList();
}