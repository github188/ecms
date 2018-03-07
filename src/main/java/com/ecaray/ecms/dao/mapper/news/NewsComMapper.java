package com.ecaray.ecms.dao.mapper.news;


import com.ecaray.ecms.entity.news.News;
import com.ecaray.ecms.entity.news.NewsCom;
import com.ecaray.ecms.entity.news.NewsComWithChildren;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface NewsComMapper {
    int deleteByPrimaryKey(String id);

    int insert(NewsCom record);

    int insertSelective(NewsCom record);

    NewsCom selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(NewsCom record);

    int updateByPrimaryKey(NewsCom record);
    /**
     * Author ：zhxy
     * 说明：查询全部的评论列表 带隐藏的
     */
    List<NewsComWithChildren> selectNewsCommentListById(String newId);
    List<NewsComWithChildren> selectNewsCommentListByPId(String newId);
    /**
     * Author ：zhxy
     * 说明：TODO
     */
    List<NewsComWithChildren> selectComListByIdWithoutHide(String newId);

	int selectNewsCommentCount(String newId);

	List<NewsCom> selectAllNewsCommentList(NewsCom com);

	void updateStatusByParentId(@Param("status")int status,@Param("comId")String comId);

	List<NewsCom> selectNewsComByUserId(String userId);
	NewsCom selectNewsComById(String id);

	List<News> selectNewsList();
}