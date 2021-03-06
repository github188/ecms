package com.ecaray.ecms.services.news;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.jms.TopicRequestor;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import com.ecaray.ecms.commons.constant.PageResult;
import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.commons.utils.DataUtil;
import com.ecaray.ecms.commons.utils.DateUtil;
import com.ecaray.ecms.commons.utils.ParaMap;
import com.ecaray.ecms.commons.utils.StrUtils;
import com.ecaray.ecms.dao.mapper.news.NewsComMapper;
import com.ecaray.ecms.dao.mapper.news.NewsMapper;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.news.News;
import com.ecaray.ecms.entity.news.NewsCom;
import com.ecaray.ecms.entity.news.NewsComWithChildren;
import com.ecaray.ecms.entity.news.PictureMsg;
import com.ecaray.ecms.entity.sys.SysToread;
import com.ecaray.ecms.services.authority.DeptService;
import com.ecaray.ecms.services.authority.UserService;
import com.ecaray.ecms.services.common.FileService;
import com.ecaray.ecms.services.common.ParameterService;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

/**
 * com.ecaray.imspmo.services.news
 * Author ：zhxy
 * 2017/4/19 19:21
 * 说明：TODO
 */
@Service
public class NewsService {
    @Autowired
    private NewsMapper newsMapper;
    @Autowired
    private NewsComMapper newsComMapper;
    @Autowired
    private FileService fileService;
    @Autowired
    private UserService userService;
    @Autowired
    private DeptService depService;
    @Autowired
    private ParameterService parameterService;
    @Autowired
    private PortalLikesService portalLikesService;
    @Autowired
    private SysToReadService sysToReadService;

    Logger logger  = LoggerFactory.getLogger(NewsService.class);
    /**
     * Author ：zhxy
     * 说明：新闻
     */
    public Result addNews(News news,User user ) {
        news.setId(DataUtil.uuidData());
        long curTime = System.currentTimeMillis();
        news.setAddTime(curTime);
        news.setUpdateTime(curTime);
        news.setAddPersonName(user.getRealname());
        newsMapper.insertSelective(news);
        news = newsMapper.selectById(news.getId());
        if (news.getIsPublish() == 0) {
        	creatAllUserNewsToRead(news);
        }
        logger.debug("news add success,news id:"+news.getId());
        return Result.success().addObject(news.getId());
    }

    public Result updateNews(News news) {
        String newsId = news.getId();
        if(newsId==null ||"".equals(newsId)){
            return Result.failed("id is null");
        }
        long curTime  =System.currentTimeMillis();
        news.setUpdateTime(curTime);
        if (news.getAttachmentId() == null) {
        	news.setAttachmentId("");
        	news.setAttachmentName("");
        }
        newsMapper.updateByPrimaryKeySelective(news);
        return Result.success();
    }

    public Result publishNews(String newsId, int ispub) {
        if(newsId==null ||"".equals(newsId)){
            return Result.failed("id is null");
        }
        News news = new News();
        news.setId(newsId);
        news.setIsPublish(ispub);
        news.setPublishDate(DateUtil.nowTime());
        newsMapper.updateByPrimaryKeySelective(news);
        if (ispub == 0) {
        	creatAllUserNewsToRead(news);
        }
        return Result.success();
    }

    public PageResult selectNewsList(int pageNum, int pageSize, String isTop,String newsType,
                                     String isPublish,String newsTitle,String newsAuthor,String key,String userId) {
        Page page = PageHelper.startPage(pageNum,pageSize);
        newsTitle = StringUtils.isEmpty(newsTitle)?null:"%"+newsTitle+"%";
        isPublish = StringUtils.isEmpty(isPublish)?null:isPublish;
        newsAuthor = StringUtils.isEmpty(newsAuthor)?null:"%"+newsAuthor+"%";
        key = StringUtils.isEmpty(key)?null:"%"+key+"%";
        if("null".equals(newsType)) {
            newsType = null;
        }
        List<News> newsList = newsMapper.selectNewsList(isTop,newsType, isPublish, newsTitle,newsAuthor,key,userId);
        for (News n : newsList) {
        	n.setTypeName(parameterService.getName("portal_type", n.getNewsType()+""));
        	n.setRead(portalLikesService.getNewsData(n.getId(), 1));
        	n.setLikes(portalLikesService.getNewsData(n.getId(), 2));
        	int count = userService.selectUserCount();
        	n.setNoRead(count - n.getRead());
        }
        return PageResult.success().addObject(newsList).addPageInfo(page,pageNum);
    }

    public ParaMap selectAllNewsCommentList(String depId,String userName,String newId,Integer pageNum,Integer pageSize) {
    	NewsCom com = new NewsCom();
    	if (StrUtils.isNotNull(depId)) {
			List<String> deplist = depService.getDepChildIdList(depId);
			com.setDepList(deplist);
		} 
    	if (StrUtils.isNotNull(userName)) {
    		com.setAddPersonName("%" + userName + "%");
    	} 
    	com.setPageSize(pageSize);
    	com.setNewId(newId);
    	com.setPageNum(pageNum);
    	Page page = PageHelper.startPage(pageNum, pageSize);
    	List<NewsCom> commentList  = newsComMapper.selectAllNewsCommentList(com);
    	for (NewsCom n : commentList ) {
    		n.setDepName(depService.getAllDept(new StringBuffer(), Long.parseLong(n.getDepId())));
    	}
    	return ParaMap.getPageHelperMap(commentList, page);
    }
    public Result selectNewsDetailById(String newsId,String comStatus) {
        News news = newsMapper.selectByPrimaryKey(newsId,comStatus);
        news.setTypeName(parameterService.getName("portal_type", news.getNewsType() +""));
        news.setRead(portalLikesService.getNewsData(newsId, 1));
        news.setLikes(portalLikesService.getNewsData(newsId, 2));
        return Result.success().addObject(news);
    }

    /**
     * Author ：zhxy
     */
    public Result fileUpload(String range, CommonsMultipartFile file) {
        Result result = null;
        try {
            result =  fileService.fileUpload(range,file);
        } catch (IOException e) {
            return Result.failed("上传失败!");
        }
        PictureMsg np =null;
        if(result !=null) {
            np = new PictureMsg(result.getContent() == null ? null : result.getContent().toString());
        }
        return Result.success().addObject(np);
    }

    public void fileDownload(String range,String picId,Integer w,Integer h,HttpServletResponse response,HttpServletRequest req) throws IOException {
        fileService.getImg(picId, range, w, h, response,req);
    }

    public void attachMentDownLoad(String range, String acctId,HttpServletResponse response,HttpServletRequest req) {
        String realName = newsMapper.selectNewsCommentName(acctId);
        fileService.getFile(range,acctId,realName,req,response);
    }

    public Result addNewsComment(NewsCom newsCom,User user ) {
        long curTime = System.currentTimeMillis();
        newsCom.setId(DataUtil.uuidData());
        newsCom.setAddTime(curTime);
        newsCom.setUpdateTime(curTime);
        newsCom.setAddPersonId(user.getId());
        newsCom.setAddPersonName(user.getRealname());
        newsCom.setStatus(0);
        if (StringUtils.isEmpty(newsCom.getParentId()))
            newsCom.setParentId("0");

        newsComMapper.insertSelective(newsCom);
        int count  = newsComMapper.selectNewsCommentCount(newsCom.getNewId());
        creatAllUserComToRead(newsCom);
        return Result.success().addObject(count);
    }

    /**
     * Author ：zhxy
     * 说明：改变评论状态  0正常1 隐藏 3 删除
     */
    public Result changeCommentStatus(String comId,int status) {
        long curTime = System.currentTimeMillis();
        NewsCom  newsCom  = new NewsCom();
        newsCom.setId(comId);
        newsCom.setUpdateTime(curTime);
        newsCom.setStatus(status);
        newsComMapper.updateByPrimaryKeySelective(newsCom);
        List<NewsComWithChildren> comlist = newsComMapper.selectNewsCommentListByPId(comId);
        List<String> list = getListByNewsCom(new ArrayList<String>(),comlist);
        for (String id :list) {
        	newsCom.setId(id);
        	newsCom.setUpdateTime(curTime);
        	newsCom.setStatus(status);
            newsComMapper.updateByPrimaryKeySelective(newsCom);
        }
        return Result.success();
    }

    private List<String> getListByNewsCom(List<String> list,List<NewsComWithChildren> comlist){
    	for (NewsComWithChildren c : comlist) {
    		list.add(c.getId());
    		if (c.getChildren() != null) {
    			getListByNewsCom (list,c.getChildren());
    		}
    	}
    	return list;
    }
    /**
     * Author ：zhxy
     * 说明：根据传入状态 status =0 时候 只显示筛选后的信息，如果传入 其他状态值 则选择全部评论信息
     */
    public ParaMap selectNewsCommentListById(String newId,int status,User user,Integer pageNum,Integer pageSize) {
    	String u = user.getId();
        List<NewsComWithChildren> commentList;
        Page page = PageHelper.startPage(pageNum, pageSize);
        if (0==status) {
            commentList  = newsComMapper.selectComListByIdWithoutHide(newId);
        } else {
            commentList  = newsComMapper.selectNewsCommentListById(newId);
        }
        putLikesToNewsComment(commentList,u);
        putNameToNewsComment("",commentList);
        for (NewsComWithChildren n : commentList) {
        	List<NewsComWithChildren> list = new ArrayList<NewsComWithChildren>();
        	list = putLikesToArrayList(list,n);
        	n.setChildren(list);
        }
        return ParaMap.getPageHelperMap(commentList, page);
    }
    
    public void putLikesToNewsComment(List<NewsComWithChildren> commentList,String u){
    	for (NewsComWithChildren news : commentList) {
    		if(portalLikesService.getIsReadOrLike(u,news.getId(),2)){
    			news.setIsLikes(1);
    		} else {
    			news.setIsLikes(0);
    		}
    		String userId = news.getAddPersonId();
    		User user = userService.getUserByIdNoPassWord(userId);
    		user.setDepName(depService.getAllDept(new StringBuffer(), Long.parseLong(user.getDepId())));
    		news.setUser(user);
        	news.setLikes(portalLikesService.getNewsData(news.getId(), 2));
        	List<NewsComWithChildren> children = news.getChildren();
    		if( children != null) {
    			putLikesToNewsComment(children,u);
    		}
        }
    }
    
    public void putNameToNewsComment(String toName,List<NewsComWithChildren> commentList){
    	for (NewsComWithChildren news : commentList) {
    		String fromName = news.getAddPersonName();
        	news.setAddPersonId(fromName + "to" +toName);
        	List<NewsComWithChildren> children = news.getChildren();
    		if( children != null) {
    			putNameToNewsComment(fromName,children);
    		}
        }
    }
    public List<NewsComWithChildren> putLikesToArrayList(List<NewsComWithChildren> list,NewsComWithChildren foo){
    	List<NewsComWithChildren> child = foo.getChildren();
    	if (child != null) {
    		for (NewsComWithChildren children : child) {
    			list.add(children);
    			putLikesToArrayList(list,children);
        	}
    	}
    	return list;
    }
    public Result updateNewsComments(NewsCom newsCom) {
        if(newsCom.getId()==null  ||"".equals(newsCom.getId())){
            return Result.failed("news comment id is null!");
        }
        long curTime = System.currentTimeMillis();
        newsCom.setUpdateTime(curTime);
        newsComMapper.updateByPrimaryKeySelective(newsCom);
        return Result.success();
    }

    public Result springUpload(String range, HttpServletRequest request) {
        Result  result = null;
        try {
            result  =  fileService.springUpload(range,request);
        } catch (IOException e) {
            logger.info("上传头像信息失败:"+e.getMessage());
        }
        PictureMsg np =null;
        if(result !=null) {
            np = new PictureMsg(result.getContent() == null ? null : result.getContent().toString());
        }
        return Result.success().addObject(np);
    }

	public PageResult listUserNewsComment(String userId,Integer pageSize,Integer pageNum) {
		Page<?> page = PageHelper.startPage(pageNum, pageSize);
		return PageResult.success().addObject(newsComMapper.selectNewsComByUserId(userId)).addPageInfo(page, pageNum);
	}
	
	public List<News> listNews() {
		return newsMapper.selectNewsAsList();
	}
	
	public void creatAllUserNewsToRead(News news) {
		news = newsMapper.selectById(news.getId());
		List<User> userlist = userService.getAllUserList();
		for (User user : userlist) {
			SysToread toread = new SysToread();
			toread.setUserId(user.getId());
			toread.setRefId(news.getId());
			toread.setType(1);
			int length = 30 > news.getNewsTitle().length() ? news.getNewsTitle().length() :30;
			toread.setTitle(news.getNewsTitle().substring(0, length));
			sysToReadService.saveToRead(toread);
		}
	}
	
	public void creatAllUserComToRead(NewsCom newsCom) {
		NewsCom com = newsComMapper.selectNewsComById(newsCom.getId());
		String newsUserId = newsMapper.selectById(newsCom.getNewId()).getAddPersonId();
		String userId = com == null ? newsUserId :  com.getParentUserId();
		String type = com == null ? "文章" : "评论";
		SysToread toread = new SysToread();
		toread.setUserId(userId);
		toread.setRefId(newsCom.getId());
		toread.setType(2);
		int length = newsCom.getContent().length() >= 20 ? 20 :newsCom.getContent().length();
		toread.setTitle(newsCom.getAddPersonName() + "回复了您的" + type + ":" + newsCom.getContent().substring(0,length));
		sysToReadService.saveToRead(toread);
	}
	
	
}
