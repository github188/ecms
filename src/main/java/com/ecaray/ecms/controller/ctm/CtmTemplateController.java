package com.ecaray.ecms.controller.ctm;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ecaray.ecms.commons.authorization.annotation.Authorization;
import com.ecaray.ecms.commons.authorization.annotation.CurrentUser;
import com.ecaray.ecms.commons.constant.PageResult;
import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.ctm.CtmFiles;
import com.ecaray.ecms.entity.ctm.CtmTemplate;
import com.ecaray.ecms.entity.ctm.Vo.CtmTempPage;
import com.ecaray.ecms.services.ctm.CtmTemplateService;
import com.github.pagehelper.Page;

@RestController()
@RequestMapping("ctm/template")
public class CtmTemplateController {
	@Autowired
	CtmTemplateService ctmTemplateService;
	
	/**
     * 添加目录节点
     */
	@Authorization
    @RequestMapping(value = "/add",method = RequestMethod.POST)
    public Result addCtmContractTemp(@CurrentUser User user,@RequestBody CtmTemplate temp){
    	return Result.success().addObject(ctmTemplateService.addCtmContractTemp(user,temp));
    }
	
	/**
	 * 修改目录节点
	 */
	@Authorization
	@RequestMapping(value = "/update",method = RequestMethod.PUT)
	public Result updateCtmContractTemp(@CurrentUser User user,@RequestBody CtmTemplate temp){
		return Result.success().addObject(ctmTemplateService.updateCtmContractTemp(user,temp));
	}
	
	/**
	 * 获取目录节点列表
	 */
	@Authorization
	@RequestMapping(value = "/list",method = RequestMethod.GET)
	public Result getCtmTemplateList(){
		return Result.success().addObject(ctmTemplateService.getCtmTemplateList());
	}
	
	/**
	 * 删除目录节点
	 */
	@Authorization
	@RequestMapping(value = "/delete",method = RequestMethod.PUT)
	public Result deleteCtmTemp(@RequestBody Map<String,String> map){
		String id = map.get("id");
		return Result.success().addObject(ctmTemplateService.deleteCtmTemp(id));
	}
	
	/**
	 * 获取目录树
	 */
	@RequestMapping(value = "/tree",method = RequestMethod.GET)
	public Result getCtmTemplateTree(){
		return Result.success().addObject(ctmTemplateService.getCtmTemplateTree("1000000"));
	}
	
	/**
	 * 上传合同模板
	 */
	@Authorization
	@RequestMapping(value = "/upload",method = RequestMethod.POST)
	public Result ctmTempUpload(HttpServletRequest request) throws IllegalStateException, IOException{
		return Result.success().addObject(ctmTemplateService.ctmTempUpload(request));
	}
	
	/**
	 * 模板上传提交
	 */
	@Authorization
	@RequestMapping(value = "/submit",method = RequestMethod.POST)
	public Result addCtmTemplate(@RequestBody CtmFiles files,@CurrentUser User user){
		ctmTemplateService.addCtmTemplate(files,user);
		return Result.success();
	}
	/**
	 * 模板上传提交
	 */
	@Authorization
	@RequestMapping(value = "/download",method = RequestMethod.GET)
	public Result ctmTempDownload(String id,String realname,HttpServletResponse response,HttpServletRequest req) throws IllegalStateException, IOException{
		return ctmTemplateService.ctmTempDownload(id,realname,response,req);
	}
	
	/**
	 * 获取目录下模板文件列表
	 */
	@Authorization
	@RequestMapping(value = "/temp/list",method = RequestMethod.GET)
	public PageResult getCtmTemplateList(CtmTempPage temp){
		Map<String,Object> map = ctmTemplateService.getCtmTemplateList(temp);
    	Object o = map.get("object");
    	@SuppressWarnings("rawtypes")
		Page page = (Page)map.get("page");
    	Integer pageNum = (Integer)map.get("pageNum");
    	return PageResult.success().addObject(o).addPageInfo(page,pageNum);
	}
	
	@Authorization
	@RequestMapping(value = "/temp/delete",method = RequestMethod.PUT)
	public Result deleteCtmFiles(@RequestBody CtmFiles files){
		ctmTemplateService.deleteCtmFiles(files.getId());
		return Result.success();
	}
}
