package com.ecaray.ecms.services.ctm;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.commons.utils.DataUtil;
import com.ecaray.ecms.dao.mapper.ctm.CtmFilesMapper;
import com.ecaray.ecms.dao.mapper.ctm.CtmTemplateMapper;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.ctm.CtmFiles;
import com.ecaray.ecms.entity.ctm.CtmTemplate;
import com.ecaray.ecms.entity.ctm.Vo.CtmTempPage;
import com.ecaray.ecms.entity.ctm.Vo.CtmTemplateTree;
import com.ecaray.ecms.services.common.FileService;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Service
public class CtmTemplateService {
	@Autowired
	CtmTemplateMapper ctmTemplateMapper;

	@Autowired
	CtmFilesMapper ctmFilesMapper;

	@Autowired
	FileService fileService;

	/**
	 * 添加合同模板分类
	 */
	public int addCtmContractTemp(User user, CtmTemplate temp) {
		String id = DataUtil.uuidData();
		temp.setId(id);
		temp.setAddUser(user.getId());
		temp.setAddTime(System.currentTimeMillis());
		temp.setUpdateTime(System.currentTimeMillis());
		return ctmTemplateMapper.insertSelective(temp);
	}

	/**
	 * 更新合同模板分类
	 */
	public int updateCtmContractTemp(User user, CtmTemplate temp) {
		temp.setAddUser(user.getId());
		temp.setAddTime(System.currentTimeMillis());
		temp.setUpdateTime(System.currentTimeMillis());
		return ctmTemplateMapper.updateByPrimaryKeySelective(temp);
	}

	/**
	 * 获取模板分类列表
	 */
	public List<CtmTemplate> getCtmTemplateList() {
		return ctmTemplateMapper.selectCtmTemplateList();
	}

	/**
	 * 获取目录及所有的子目录id集合
	 */
	public List<String> getTempChildList(List<String> args, List<CtmTemplateTree> tree) {
		for (CtmTemplateTree c : tree) {
			args.add(c.getId());
			if (c.getChildren() != null) {
				getTempChildList(args, c.getChildren());
			}
		}
		return args;
	}
	
	/**
	 * 删除模板分类
	 * @param id
	 * @return
	 */
	@Transactional
	public String deleteCtmTemp(String id) {
		CtmTemplate temp = ctmTemplateMapper.selectByPrimaryKey(id);
		if ("0".equals(temp.getParentId())) {
			return "跟目录不能删除！";
		}
		List<CtmTemplateTree> treeList = new ArrayList<CtmTemplateTree>();
		treeList.add(getCtmTemplateTree(id));
		List<String> ids = getTempChildList(new ArrayList<String>(), treeList);
		ctmTemplateMapper.deleteCtmTemplate(ids);
		ctmFilesMapper.deleteFilesListByRefId(ids);
		return "删除成功！";
	}

	/**
	 * 获取合同模板文件结构树
	 */

	public CtmTemplateTree getCtmTemplateTree(String id) {
		return ctmTemplateMapper.selectCtmTemplateTree(id);
	}

	/**
	 * 上传合同模板文件
	 */
	public String ctmTempUpload(HttpServletRequest request) throws IllegalStateException, IOException {
		String url = "ctm/contractTemp";
		String ids = fileService.newSpringUpload(url, request);
		CtmFiles file = new CtmFiles();
		file.setId(ids);
		file.setAddTime(System.currentTimeMillis());
		ctmFilesMapper.insertSelective(file);
		return ids;
	}
	/**
	 * 下载合同模板文件
	 */
	public Result ctmTempDownload(String id ,String realname,HttpServletResponse response,HttpServletRequest request) throws IllegalStateException, IOException {
		String url = "ctm/contractTemp";
		return fileService.getFile(url, id, realname,request, response);
	}
	
	/**
	 * 提交上传
	 */
	public void addCtmTemplate(CtmFiles files,User user) {
		String ids = files.getId();
		String names = files.getName();
		String[] list = ids.split("_");
		String[] name = names.split("_");
		for (int i = 0; i < list.length; i++) {
			CtmFiles f = new CtmFiles();
			f.setAddUser(user.getId());
			f.setUpdateTime(System.currentTimeMillis());
			f.setId(list[i]);
			f.setName(name[i]);
			f.setRefId(files.getRefId());
			ctmFilesMapper.updateByPrimaryKeySelective(f);
		}
	}
	
	/**
	 * 通过模板id获取文件列表
	 */
	public Map<String,Object> getCtmTemplateList(CtmTempPage temp){
		String tempId = temp.getTempId();
		List<CtmTemplateTree> treeList = new ArrayList<CtmTemplateTree>();
		treeList.add(getCtmTemplateTree(tempId));
		List<String> ids = getTempChildList(new ArrayList<String>(),treeList);
		Page page = PageHelper.startPage(temp.getPageNum(),temp.getPageSize());
		List<CtmFiles> list = ctmFilesMapper.selectFileListByRefId(ids);
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("object", list);
		map.put("page", page);
		map.put("pageNum", temp.getPageNum());
		return map;
	}
	
	public void deleteCtmFiles(String id) {
		ctmFilesMapper.deleteByPrimaryKey(id);
	}
	
	/**
	 * 下载合同模板
	 */
	
	/*
	 获取模板目录的URL
	public String getCtmTempFolderUrl(String id) {
		CtmTemplateFoo foo = ctmTemplateMapper.selectCtmTemplatefoo(id);
		String urlname = "";
		String url = "";
		while (foo != null) {
			if (foo.getFoo() != null) {
				urlname = "/" + foo.getFolderName();
			} else {
				urlname = foo.getFolderName();
			}
			url = urlname + url;
			foo = foo.getFoo();
		}
		return url;
	}*/
}
