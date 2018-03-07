package com.ecaray.ecms.services.pmo;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.ecaray.ecms.commons.constant.Constants;
import com.ecaray.ecms.commons.constant.PageResult;
import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.commons.utils.DataUtil;
import com.ecaray.ecms.commons.utils.ExcelUtils;
import com.ecaray.ecms.dao.mapper.authority.RoleMapper;
import com.ecaray.ecms.dao.mapper.pmo.PmoPersonMapper;
import com.ecaray.ecms.dao.mapper.pmo.PmoProjectMapper;
import com.ecaray.ecms.entity.authority.Role;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.pmo.PmoPerson;
import com.ecaray.ecms.entity.pmo.PmoProject;
import com.ecaray.ecms.entity.pmo.Vo.*;
import com.ecaray.ecms.services.common.FileService;
import com.ecaray.ecms.services.email.MailSendThread;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * com.ecaray.ecms.services.api
 * Author ：zhxy
 * 2017/3/30 10:18
 * 说明：TODO
 */
@Service
public class PmoProjectService {

    @Autowired
    private PmoProjectMapper pmoProjectMapper;
    @Autowired
    private PmoPersonMapper pmoPersonMapper;
    @Autowired
    private RoleMapper roleMapper;
    @Autowired
    private FileService fileService;
    @Value("${file.path}")
    private String path;

    Logger logger = LoggerFactory.getLogger(PmoProjectService.class);

    /**
     * Author ：zhxy
     * 说明：添加项目
     */
    @Transactional
    public Result addProject(PmoProjectModel pmoProjectModel,User user) {
        Map<String,String> params = new HashMap<String, String>();
        long curTime = System.currentTimeMillis();
        PmoProject pmoProject  = pmoProjectModel.getPmoProject();
        String userArrays ="";
        //生成项目编码
        String proCode = generateProjectCode();
        logger.info("新增项目，项目编码：" + proCode);
        pmoProject.setProCode(proCode);
        pmoProject.setId(DataUtil.uuidData());
        pmoProject.setAddTime(curTime);
        pmoProject.setUpdateTime(curTime);
        pmoProject.setProStatus(2);
        List<String> userIdList = new ArrayList<String>();
        List<PmoPerson> persons = pmoProjectModel.getPmoPersonList();
        boolean hasCurUser = false;
        String curUserId = user.getId();
        Map<String ,Object> rePersons = new HashMap<>();
        //记录是否存在本人，并且记录当前项目人员和市场人员，用于后面去重
        for(PmoPerson pmoPerson:persons) {
            if(curUserId.equals(pmoPerson.getPersonId())){
                hasCurUser = true;
            }
            if(pmoPerson.getPersonCategory()==1 ||pmoPerson.getPersonCategory()==2){
                rePersons.put(pmoPerson.getPersonId(),null);
            }
        }
        if(!hasCurUser){
            PmoPerson pmoPersont = new PmoPerson();
            pmoPersont.setPersonId(user.getId());
            pmoPersont.setPersonName(user.getRealname());
            pmoPersont.setPersonCategory(3);//默认设置成一般人员
            persons.add(pmoPersont);
        }

        //去处重复人员
        List<PmoPerson> addPersons = new ArrayList<>();
        for(PmoPerson pmoPerson:persons){
            pmoPerson.setId(DataUtil.uuidData());
            pmoPerson.setProId(pmoProject.getId());
            pmoPerson.setProCode(pmoProject.getProCode());
            pmoPerson.setAddTime(curTime);
            if(pmoPerson.getPersonCategory()==1){
                pmoProject.setManagePersonId(pmoPerson.getPersonId());
                pmoProject.setManagePersonName(pmoPerson.getPersonName());
                addPersons.add(pmoPerson);
            }else if(pmoPerson.getPersonCategory()==2){
                pmoProject.setMarktPersonId(pmoPerson.getPersonId());
                pmoProject.setMarktPersonName(pmoPerson.getPersonName());
                addPersons.add(pmoPerson);
            }else{
                if(!rePersons.containsKey(pmoPerson.getPersonId())){
                    addPersons.add(pmoPerson);
                    userArrays = userArrays+pmoPerson.getPersonName()+"   ";
                }else{
                    continue;
                }
            }
            userIdList.add(pmoPerson.getPersonId());
        }
        pmoProjectMapper.insertSelective(pmoProject);
        pmoPersonMapper.addPersonBatch(addPersons);
        MailVo mailVo = new MailVo("【PMO OA系统】新增立项","projectMailMessage",userIdList);
        params.put("proName",pmoProject.getProName());
        params.put("marktName",pmoProject.getMarktName());
        params.put("provinceName",pmoProject.getProvince());
        params.put("cityName",pmoProject.getCity());
        params.put("areaName",pmoProject.getArea());
        params.put("proContents",pmoProject.getProContents());
        params.put("marketPerson",pmoProject.getMarktPersonName());
        params.put("proManager",pmoProject.getManagePersonName());
        params.put("Participant",userArrays);
        mailVo.setParams(params);
        MailSendThread.queue.offer(mailVo);
        return Result.success();
    }

    /**
     * Author ：zhxy
     * 说明：生成项目编码
     */

    private String generateProjectCode() {
        SimpleDateFormat sdf=new SimpleDateFormat("yyyyMM");
        String curMonth = sdf.format(new Date());
        String proCode = "YC"+curMonth;
        String monthMaxCode =pmoProjectMapper.selectMaxMonthProCode(proCode+"%");
        if(monthMaxCode==null||"".equals(monthMaxCode)) {
            proCode += "001";
        }else{
            proCode="YC"+(Long.parseLong(monthMaxCode.replaceAll(".*[^\\d](?=(\\d+))",""))+1);
        }
        return proCode;
    }

    /**
     * Author ：zhxy
     * 说明：关闭项目
     */
    public Result closeProject(String projectId){
        PmoProject pmoProject = new PmoProject();
        pmoProject.setId(projectId);
        pmoProject.setUpdateTime(System.currentTimeMillis());
        pmoProject.setProStatus(Constants.PMO_PROJECT_STATUS_FINISH);
        pmoProjectMapper.updateByPrimaryKeySelective(pmoProject);
        return Result.success();
    }
    /**
     * Author ：zhxy
     * 说明：获取项目详情
     */
    public Result getProjectDetail(String projectId){

        PmoProject pmoProject = pmoProjectMapper.selectByPrimaryKey(projectId);
        List<PmoPerson>persons  = pmoPersonMapper.selectByProjectId(projectId,"3");
        PmoProjectModel ppm = new PmoProjectModel();
        ppm.setPmoPersonList(persons);
        ppm.setPmoProject(pmoProject);
        return Result.success().addObject(ppm);
    }
    /**
     * Author ：zhxy
     * 说明：获取项目详情
     */
    public String getProjectName(String projectId){
    	
    	PmoProject pmoProject = pmoProjectMapper.selectByPrimaryKey(projectId);
    	List<PmoPerson>persons  = pmoPersonMapper.selectByProjectId(projectId,"3");
    	PmoProjectModel ppm = new PmoProjectModel();
    	ppm.setPmoPersonList(persons);
    	ppm.setPmoProject(pmoProject);
    	return ppm.getPmoProject().getProName();
    }

    /**
     * Author ：zhxy
     * 说明：获取立项项目列表
     */
    public PageResult selectProjectList(ProjectQueryFilter projectQueryFilter,User user) {
        if(Constants.QUERY_PROJECT_SCOPE_PART == projectQueryFilter.getScope()){
            projectQueryFilter.setPartUserId(user.getId());
        }else if(Constants.QUERY_PROJECT_SCOPE_TODO == projectQueryFilter.getScope()){
            projectQueryFilter.setTodoUserId(user.getId());
        }
        PageHelper.startPage(0, 0);
        List<Role> roles = roleMapper.selectRoleByUser(user.getId());
        projectQueryFilter.setCurUserId(user.getId());
        //100899 为特殊角色
        for(Role role :roles){
            if(role.getCode()!=null && 100899 ==role.getCode()) {
                projectQueryFilter.setCurUserId(null);
                break;
            }
        }
        String proMsg = projectQueryFilter.getProMsg();
        if(!StringUtils.isEmpty(proMsg)){
            projectQueryFilter.setProMsg("%"+proMsg+"%");
        }else{
            projectQueryFilter.setProMsg(null);
        }
        if(!StringUtils.isEmpty(projectQueryFilter.getPeopleName())){
            projectQueryFilter.setPeopleName("%"+projectQueryFilter.getPeopleName()+"%");
        }
        Page<?> page =  PageHelper.startPage(projectQueryFilter.getPageNum(), projectQueryFilter.getPageSize());
        List <PmoProjectQueryVo> pmoProjectList = pmoProjectMapper.selectPmoProjectListByUser(projectQueryFilter);
        return PageResult.success().addObject(pmoProjectList).addPageInfo(page,projectQueryFilter.getPageNum());
    }

    public Result addPersonBatch(PmoPersonModel pmoPersonModel) {
        pmoPersonMapper.addPersonBatch(pmoPersonModel.getPmoPersonList());
        return Result.success();
    }
    @Transactional
    public Result selectPmoProjectUsers(String projectId) {
        List<PmoPerson> persons  = pmoPersonMapper.selectByProjectId(projectId,null);
        return Result.success().addObject(persons);
    }

    public Result updateProject(PmoProjectModel pmoProjectModel) {
        long curTime = System.currentTimeMillis();
        PmoProject pmoProject  = pmoProjectModel.getPmoProject();
        pmoProject.setUpdateTime(curTime);
        List<String> userIdList = new ArrayList<>();
        List<PmoPerson> persons = pmoProjectModel.getPmoPersonList();
        for(PmoPerson pmoPerson:persons){
            pmoPerson.setId(DataUtil.uuidData());
            pmoPerson.setProId(pmoProject.getId());
            pmoPerson.setProCode(pmoProject.getProCode());
            pmoPerson.setAddTime(curTime);
            if(pmoPerson.getPersonCategory()==1){
                pmoProject.setManagePersonId(pmoPerson.getPersonId());
                pmoProject.setManagePersonName(pmoPerson.getPersonName());
            }else if(pmoPerson.getPersonCategory()==2){
                pmoProject.setMarktPersonId(pmoPerson.getPersonId());
                pmoProject.setMarktPersonName(pmoPerson.getPersonName());
            }
            userIdList.add(pmoPerson.getPersonId());
        }
        pmoProjectMapper.updateByPrimaryKeySelective(pmoProject);
        pmoPersonMapper.deleteByProId(pmoProject.getId());
        pmoPersonMapper.addPersonBatch(persons);

        return Result.success();
    }

    public Result downloadProjectExcel(ProjectQueryFilter projectQueryFilter ,
                                       HttpServletResponse response,
                                       HttpServletRequest request) {
        String authorization = projectQueryFilter.getAuthorization();
        if(StringUtils.isEmpty(authorization)){
            return Result.failed("没有权限在此文件!");
        }
        String[] params =authorization.split("_");
        String userId = params[0];
        if(Constants.QUERY_PROJECT_SCOPE_PART == projectQueryFilter.getScope()){
            projectQueryFilter.setPartUserId(userId);
        }else if(Constants.QUERY_PROJECT_SCOPE_TODO == projectQueryFilter.getScope()){
            projectQueryFilter.setTodoUserId(userId);
        }
        PageHelper.startPage(0, 0);
        List<Role> roles = roleMapper.selectRoleByUser(userId);
        projectQueryFilter.setCurUserId(userId);
        //100899 为特殊角色
        for(Role role :roles){
            if(role.getCode()!=null && 100899 ==role.getCode()) {
                projectQueryFilter.setCurUserId(null);
                break;
            }
        }

        String proMsg = projectQueryFilter.getProMsg();
        if(!StringUtils.isEmpty(proMsg)){
            projectQueryFilter.setProMsg("%"+proMsg+"%");
        }else{
            projectQueryFilter.setProMsg(null);
        }
        if(!StringUtils.isEmpty(projectQueryFilter.getPeopleName())){
            projectQueryFilter.setPeopleName("%"+projectQueryFilter.getPeopleName()+"%");
        }
        List <PmoProjectQueryVo> pmoProjectList = pmoProjectMapper.selectPmoProjectListByUser(projectQueryFilter);
        String fileName = "项目"+System.currentTimeMillis()+".xls";
        String filePath = path+"/projectExcel/"+fileName;
        try {
            ExcelUtils.writeExcel(pmoProjectList, PmoProjectQueryVo.class,filePath);
        } catch (Exception e) {
            e.printStackTrace();
        }
        fileService.getFile("projectExcel",fileName,null,request,response);
        return Result.success();
    }

    public Result selectPmoProPersonTree(String projectId) {
        List<PmoPerson> persons  = pmoPersonMapper.selectByProjectId(projectId,null);
        JSONObject jb = new JSONObject();
        jb.put("id","1");
        jb.put("pId","0");
        jb.put("name","项目相关人员");
        jb.put("type", "dept");
        jb.put("open",false);
        jb.put("nocheck",false);
        JSONArray ja = new JSONArray();
        for(PmoPerson pmoPerson:persons){
            JSONObject jbt = new JSONObject();
            jbt.put("id",pmoPerson.getPersonId());
            jbt.put("name",pmoPerson.getPersonName());
            jbt.put("pId","1");
            jbt.put("type", "user");
            jbt.put("open",false);
            jbt.put("nocheck",false);
            ja.add(jbt);
        }
        jb.put("children",ja);
        return Result.success().addObject(jb);
    }

    public Result selectPmoProjectCount(HttpServletRequest request){
        String userId = request.getHeader("user_id");
        int sumCount = pmoProjectMapper.selectProjectCount();
        int partCount = pmoProjectMapper.selectProjectPartCount(userId);
        int todoCount = pmoProjectMapper.selectProjectTodoCount(userId);

        PmoCounts pc = new PmoCounts();
        pc.setSumCount(sumCount);
        pc.setPartCount(partCount);
        pc.setTodoCount(todoCount);
        return Result.success().addObject(pc);
    }

    public Result selectPmoProjectRole(User user,String proId){
        return Result.success().addObject(pmoPersonMapper.selectByPersonId(user.getId(),proId));
    }
}
