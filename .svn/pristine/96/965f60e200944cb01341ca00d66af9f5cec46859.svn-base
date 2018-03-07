package com.ecaray.ecms.controller.news;

import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ecaray.ecms.commons.authorization.annotation.Authorization;
import com.ecaray.ecms.commons.authorization.annotation.CurrentUser;
import com.ecaray.ecms.commons.constant.PageResult;
import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.commons.utils.ParaMap;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.news.News;
import com.ecaray.ecms.entity.news.NewsCom;
import com.ecaray.ecms.entity.sys.SysToread;
import com.ecaray.ecms.services.common.FileService;
import com.ecaray.ecms.services.news.NewsService;
import com.ecaray.ecms.services.news.SysToReadService;
import com.github.pagehelper.Page;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;

/**
 * com.ecaray.imspmo.controller.news
 * Author ：zhxy
 * 2017/4/19 16:22
 * 说明：
 */
@Api(description = "NEWS/新闻管理")
@RestController()
@RequestMapping("news")
public class NewsController {
    @Autowired
    private NewsService newsService;
    @Autowired
    public FileService fileService;
    @Autowired
    public SysToReadService sysToReadService;
    /**
     * Author ：zhxy
     * 说明：新增新闻
     */
    @RequestMapping(method = RequestMethod.POST)
    @Authorization
    @ApiOperation(value = "新增新闻")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    public Result addNews(@RequestBody News news, @CurrentUser User user ){
        return newsService.addNews(news,user);
    }
    /**
     * Author ：zhxy
     * 说明：修改新闻news
     */
    @RequestMapping(method = RequestMethod.PUT)
    @Authorization
    @ApiOperation(value = "修改新闻")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    public Result updateNews(@RequestBody News news){
        return newsService.updateNews(news);
    }
    /**
     * Author ：zhxy
     * 说明：发布新闻/取消发布
     */
    @RequestMapping(value = "/{newsId}/{isPublish}/publish",method = RequestMethod.PUT)
    @Authorization
    @ApiOperation(value = "发布新闻")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    public Result  publishNes(@PathVariable("newsId")String newsId,
                              @PathVariable("isPublish")int ispub){
        return newsService.publishNews(newsId,ispub);
    }

    /**
     * Author ：zhxy
     * 说明：获取新闻首页列表
     */
    @RequestMapping(value ="/common/list",method = RequestMethod.GET)
    @Authorization
    public PageResult selectHomeNewsList(@RequestParam("pageNum")int pageNum,
                                         @RequestParam("pageSize")int pageSize,
                                         String isPublish, String newsTitle, String isTop,
                                         String newsType,  String newsAuthor,String key,String userId){
        return newsService.selectNewsList(pageNum,pageSize,isTop,newsType,isPublish,newsTitle,newsAuthor,key,userId);
    }

    /**
     * Author ：zhxy
     * 说明：获取新闻详情
     */
    @RequestMapping(value = "/{newsId}/detail",method = RequestMethod.GET)
    @Authorization
    @ApiOperation(value = "获取新闻详情")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    public Result selectNewsDetailById(@PathVariable("newsId")String newsId,String comStatus){
        return newsService.selectNewsDetailById(newsId,comStatus);
    }

    
    @RequestMapping(value = "/picture/content/upload")
    public Result upLoadNewsPicture(HttpServletRequest request) {
        return newsService.springUpload("news/pic/content", request);

    }
    /**
	 * Ctm归档原件下载
	 */
	@Authorization
	@RequestMapping(value = "/picture/download", method = RequestMethod.GET)
	public Result newsPicDownload(String fileId, String name, HttpServletResponse response,HttpServletRequest req) throws Exception {
		return fileService.getFile("news/pic/content", fileId, name,req, response);
	}
    
    /**
     * Author ：zhxy
     * 说明：根据ID获取新闻图片
     */
    @RequestMapping(value="/picture/content/{picId}/download", method = RequestMethod.GET)
    public void downLoadNewsPicture(@PathVariable("picId")String picId,Integer width,Integer height,HttpServletResponse response,HttpServletRequest req) throws IOException{
         newsService.fileDownload("news/pic/content",picId,width,height,response,req);
    }


    /**
     * Author ：zhxy
     * 说明：上传新闻图片（返回图片的ID）
     * value = "content0",
     */
    @RequestMapping(value = "/picture/top/upload")
    public Result upLoadNewstopPicture(HttpServletRequest request){
        return newsService.springUpload("news/pic/top", request);
    }


    /**
     * Author ：zhxy
     * 说明：根据ID获取新闻图片
     */
    @RequestMapping(value="/picture/top/{picId}/download")
    public void downLoadNewsTopPicture(@PathVariable("picId")String picId,Integer width,Integer height,HttpServletResponse response,HttpServletRequest req) throws IOException{
        newsService.fileDownload("news/pic/top",picId,width,height,response,req);
    }

    /**
     * Author ：zhxy
     * 说明：上传资讯附件
     */
    @RequestMapping(value = "/attachment/upload")
    public Result upLoadNewsAttachment(HttpServletRequest request){
        return newsService.springUpload("news/attachment",request);
    }
    
    /**
     * Author ：zhxy
     * 说明：下载资讯附件
     */
    @Authorization
    @RequestMapping(value="/attachment/{attaId}/download")
    public void downLoadNewsAttachment(@PathVariable("attaId")String attaId,HttpServletResponse response,HttpServletRequest req){
        newsService.attachMentDownLoad("news/attachment",attaId,response,req);
    }
    /**
     * Author ：zhxy
     * 说明：添加评论
     */
    @RequestMapping(value="/comment",method = RequestMethod.POST)
    @Authorization
    @ApiOperation(value = "添加评论")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
    })
    public Result addNewsComment(@RequestBody NewsCom newsCom,@CurrentUser User user ){
       return  newsService.addNewsComment(newsCom,user);
    }
    
    /**
     * Author ：zhxy
     * 说明：隐藏评论（by comment id）
     */
    @RequestMapping(value = "/comment/{comId}/{state}/hide",method = RequestMethod.PUT)
    public Result changeCommentStatus(@PathVariable("comId")String comId,
                                      @PathVariable("state")int state){
        return newsService.changeCommentStatus(comId,state);
    }
    /**
     * Author ：zhxy
     * 说明：获取评论列表（by news id）
     */
    @Authorization
    @RequestMapping(value = "/comment/{newsId}/{state}/list",method = RequestMethod.GET)
    public PageResult selectNewsCommentListById(@PathVariable("newsId")String newsId,
                                            @PathVariable("state")int state,@CurrentUser User user,Integer pageNum,Integer pageSize){
    	ParaMap map = newsService.selectNewsCommentListById(newsId,state,user,pageNum,pageSize);
		Object o = map.get("object");
		Page page = (Page)map.get("page");
		return PageResult.success().addObject(o).addPageInfo(page,pageNum);
    }
    
    /**
     * Author ：zhxy
     * 说明：获取评论列表（by news id）
     */
    @Authorization
    @RequestMapping(value = "/comment/all/list",method = RequestMethod.GET)
    public PageResult getAllCommentList(String newId,String depId,String userName,Integer pageSize,Integer pageNum){
    	ParaMap map = newsService.selectAllNewsCommentList(depId, userName, newId,pageNum, pageSize);
    	Object o = map.get("object");
    	Page page = (Page)map.get("page");
    	return PageResult.success().addObject(o).addPageInfo(page,pageNum);
    }
    /**
     * Author ：zhxy
     * 说明：修改评论
     */
    @RequestMapping(value="/comment",method = RequestMethod.PUT)
    public Result updateNewsComments(@RequestBody NewsCom newsCom){
        return newsService.updateNewsComments(newsCom);
    }
    
    /**
     * Author ：zhxy
     * 说明：修改评论
     */
    @RequestMapping(value="/{userId}/comment",method = RequestMethod.GET)
    public PageResult listUserNewsComment(@PathVariable("userId") String userId,Integer pageSize,Integer pageNum){
    	return newsService.listUserNewsComment(userId,pageSize,pageNum);
    }
    
    /**
     * Author ：zhxy
     * 说明：修改评论
     */
    @RequestMapping(value="/toread/list",method = RequestMethod.GET)
    public PageResult listUserToRead(String userId,String title,Integer pageSize,Integer pageNum){
    	return sysToReadService.listToReadByUserId(userId,title,pageSize, pageNum);
    }
    /**
     * Author ：zhxy
     * 说明：修改评论
     */
    @RequestMapping(value="/toread/update",method = RequestMethod.GET)
    public Result updateToRead(SysToread toread){
    	sysToReadService.updateToRead(toread);
    	return Result.success();
    }
}
