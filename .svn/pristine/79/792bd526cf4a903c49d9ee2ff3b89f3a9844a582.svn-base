package com.ecaray.ecms.controller.ctm;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;

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
import com.ecaray.ecms.entity.ctm.CtmContract;
import com.ecaray.ecms.entity.ctm.Vo.CtmFilter;
import com.ecaray.ecms.entity.process.SysProDone;
import com.ecaray.ecms.services.authority.UserService;
import com.ecaray.ecms.services.common.FileService;
import com.ecaray.ecms.services.ctm.CtmContractService;
import com.ecaray.ecms.services.processes.ProcessService;
import com.github.pagehelper.Page;

@RestController
@RequestMapping("ctm/contract")
public class CtmContractController {

	@Autowired
	CtmContractService ctmService;
	
	@Autowired
	FileService fileService;
	
	@Autowired
	UserService userService;

	@Autowired
	ProcessService processService;
	/**
	 * 
	 * 发起审批
	 */
	@Authorization
	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public Result createCtmExamine(@RequestBody CtmContract CtmContract, @CurrentUser User user)
			throws Exception {
		CtmContract.setUserId(user.getId());
		return processService.createProcess(CtmContract);
	}

	/**
	 * 合同审批
	 * 
	 * @throws Exception
	 * @throws RuntimeException
	 */
	@Transactional
	@RequestMapping(value = "/exmine", method = RequestMethod.POST)
	public Result ctmExmineContract(@CurrentUser User user, @RequestBody SysProDone done)
			throws RuntimeException, Exception {
		return processService.rotatingProcess(user, done);
	}

	/**
	 * 
	 * 修改合同审批内容
	 */
	@Authorization
	@RequestMapping(value = "/update", method = RequestMethod.PUT)
	public Result updateCtmExamine(@RequestBody CtmContract CtmContract, @CurrentUser User user) {
		ctmService.updateCtmContract(CtmContract,user);
		return Result.success();
	}

	/**
	 * 
	 * 获取审批通过合同列表
	 */
	@Authorization
	@RequestMapping(value = "/list", method = RequestMethod.GET)
	public PageResult getCtmContractList(CtmFilter filter, @CurrentUser User user) throws Exception {
		ParaMap map = ctmService.getCtmContractList(filter, user);
		Object o = map.get("object");
		Page<?> page = (Page<?>) map.get("page");
		Integer pageNum = map.getInteger("pageNum");
		return PageResult.success().addObject(o).addPageInfo(page, pageNum);
	}

	/**
	 * Ctm审批附件上传
	 */
	@RequestMapping(value = "/files/upload", method = RequestMethod.POST)
	public Result ctmFilesUpload(HttpServletRequest request) throws Exception {
		return Result.success().addObject(ctmService.ctmFilesUpload(request));
	}

	/**
	 * Ctm审批附件下载
	 */
	@Authorization
	@RequestMapping(value = "/files/download", method = RequestMethod.GET)
	public Result ctmFilesDownload(String fileId, String name, HttpServletResponse response,HttpServletRequest req)
			throws Exception {
		return fileService.getFile("ctm/contractFiles", fileId, name,req ,response);
	}

	/**
	 * Ctm归档原件上传
	 */
	@RequestMapping(value = "/pic/upload", method = RequestMethod.POST)
	public Result ctmContractPicUpload(HttpServletRequest request) throws Exception {
		return Result.success().addObject(ctmService.ctmTempPicUpload(request));
	}

	/**
	 * Ctm归档原件下载
	 */
	@Authorization
	@RequestMapping(value = "/pic/download", method = RequestMethod.GET)
	public Result ctmContractPicDownload(String fileId, String name, HttpServletResponse response,HttpServletRequest req) throws Exception {
		return fileService.getFile("ctm/contractPic", fileId, name,req, response);
	}

	
	/**
	 * 合同列表导出
	 */
	@Authorization
	@RequestMapping(value = "/export", method = RequestMethod.GET)
	public byte[] ctmContractExportExcel(@CurrentUser User user,CtmFilter filter, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		return ctmService.ctmContractExportExcel(filter, request, response, user);
	}

}
