package com.ecaray.ecms.services.pmo;

import com.alibaba.fastjson.JSONObject;
import com.ecaray.ecms.commons.constant.Constants;
import com.ecaray.ecms.commons.constant.PageResult;
import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.commons.exception.FlowSubmitException;
import com.ecaray.ecms.commons.utils.DataUtil;
import com.ecaray.ecms.commons.utils.ExcelUtils;
import com.ecaray.ecms.dao.mapper.authority.RoleMapper;
import com.ecaray.ecms.dao.mapper.pmo.PmoProjectMapper;
import com.ecaray.ecms.dao.mapper.pmo.PmoRequireMapper;
import com.ecaray.ecms.dao.mapper.pmo.PmoRequireTaskMapper;
import com.ecaray.ecms.entity.authority.Role;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.pmo.PmoProject;
import com.ecaray.ecms.entity.pmo.PmoRequire;
import com.ecaray.ecms.entity.pmo.PmoRequireTask;
import com.ecaray.ecms.entity.pmo.Vo.*;
import com.ecaray.ecms.services.common.FileService;
import com.ecaray.ecms.services.email.MailSendThread;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
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
 * Author ：zhxy
 * 2017/3/30 11:43
 */
@Service
public class PmoRequireService {

    @Autowired
    private PmoRequireMapper pmoRequireMapper;
    @Autowired
    private PmoRequireTaskMapper pmoRequireTaskMapper;
    @Autowired
    private PmoProjectMapper pmoProjectMapper;
    /**启动流程*/
    @Value("${flow.url.startFlow}")
    private String startFlowUrl ;
    /**提交流程*/
    @Value("${flow.url.submitFlow}")
    private String submitFlowUrl;
    /**会签派发*/
    @Value("${flow.url.countersignFlow}")
    private String countersignFlowUrl;
    @Value("${flow.processId}")
    private String processId;
    @Value("${file.path}")
    private String path;
    @Autowired
    private FileService fileService;
   /* @Autowired
    private PmoFlowService pmoFlowService;*/
    @Autowired
    private RoleMapper roleMapper;
    org.slf4j.Logger logger = LoggerFactory.getLogger(this.getClass());
    /**
     * Author ：zhxy
     * 说明：新建需求,如果创建流程失败则插入数据失败
     */
    @Transactional
    public Result addRequire(PmoRequire pmoRequire,User user) throws Exception {
        if(StringUtils.isEmpty(pmoRequire.getProId())){
            return Result.failed("项目编为空,新增失败!");
        }
        logger.info("add require message:" + pmoRequire.toString());
        long curTime =  System.currentTimeMillis();
        String requireId = DataUtil.uuidData();
        //设置参数
        pmoRequire.setId(requireId);
        pmoRequire.setStartTime(curTime);
        pmoRequire.setAddTime(curTime);
        pmoRequire.setUpdateTime(curTime);
        pmoRequire.setIsDelete(0);
        pmoRequire.setAddPersonId(user.getId());
        pmoRequire.setAddPersonName(user.getRealname());
        pmoRequire.setReqCode(generateRequireCode(pmoRequire.getProId()));
        pmoRequireMapper.insert(pmoRequire);


        //启动流程流程 项目合并 流程bug先屏蔽流程
        /*JSONObject jb = new JSONObject();
        jb.put("businessKey",requireId);
        jb.put("processId",processId);
        jb.put("userId",userId);
        FlowResult result =  pmoFlowService.startFlow(user,processId,requireId,new HashMap<String, Object>());
        if(!"success".equals(result.getCode())){
            throw new FlowSubmitException("flow submit error!");
            JSONObject contentResult = ((JSONArray)(result.getContent())).getJSONObject(0);
            logger.info("require:"+requireId+" add result:"+result.getCode());
        }
        */
        JSONObject contentResult = new JSONObject();
        contentResult.put("actId","pmo01");
        contentResult.put("actName","新建需求");
        PmoRequire updateRequire = new PmoRequire();
        //更新当前需求的流程节点
        updateRequire.setId(requireId);
        updateRequire.setActId(contentResult.getString("actId"));
        updateRequire.setActName(contentResult.getString("actName"));
        updateRequire.setCurProcessPersonId(pmoRequire.getReceivePersonId());
        //更新当前需求流程的处理人信息
        pmoRequireMapper.updateByPrimaryKeySelective(updateRequire);
        return Result.success();
    }


    @Transactional
    public Result addAndSubmitRequire(PmoRequire pmoRequire, User user) throws Exception {
        addRequire(pmoRequire,user);
        submitRequire(pmoRequire,user);
        return Result.success();
    }

    private String generateRequireCode(String proId) {

        SimpleDateFormat sdf=new SimpleDateFormat("yyyyMM");
        String curMonth = sdf.format(new Date());
        PmoProject pp = pmoProjectMapper.selectByPrimaryKey(proId);
        String cityCode ;//如果未找到到城市则默认设置成000
        if(StringUtils.isEmpty(pp.getCityId())){
            cityCode=pp.getCityId();
        }else{
            cityCode=pp.getProvinceId();
        }
        if(StringUtils.isEmpty(cityCode)){
            //如果cityId为空的话则设置默认 '000' 编码
            cityCode = "000";
        }

        String proCode = "YCXQ-"+cityCode+"-"+curMonth;
        String monthMaxCode =pmoRequireMapper.selectMaxMonthReqCode(proCode+"%");
        if(monthMaxCode==null||"".equals(monthMaxCode)) {
            proCode += "001";
        }else{
            int length = monthMaxCode.length();
            String str = monthMaxCode.substring(length-9, length);
            proCode="YCXQ-"+cityCode+"-"+(Long.parseLong(str)+1);
        }
        return proCode;
    }
    /**
     * Author ：zhxy
     * 说明：提交需求
     */
    public Result submitRequire(PmoRequire pmoRequire,User user)throws Exception {
        Map jb = new HashMap();
        List<String> mailUserList = new ArrayList<String>();
        jb.put("businessKey",pmoRequire.getId());
        jb.put("userId",pmoRequire.getReceivePersonId());
        /*FlowResult result = pmoFlowService.submitFlow(user,jb);
        if(!"success".equals(result.getCode())){
            throw new FlowSubmitException("flow submit error!");
        }

        logger.info("require:"+pmoRequire.getId()+","+user.getId()+",submit result:"+result.getCode());
        JSONObject contentResult = ((JSONArray)(result.getContent())).getJSONObject(0);
        */
        JSONObject contentResult = new JSONObject();
        contentResult.put("actId","pmo02");
        contentResult.put("actName","需求审核");

        mailUserList.add(pmoRequire.getReceivePersonId());
        //更新当前需求的流程节点
        PmoRequire updatePmoReq = new PmoRequire();
        updatePmoReq.setId(pmoRequire.getId());
        updatePmoReq.setActId(contentResult.getString("actId"));
        updatePmoReq.setActName(contentResult.getString("actName"));
        updatePmoReq.setUpdateTime(System.currentTimeMillis());
        updatePmoReq.setFirstInstancePersonId(pmoRequire.getReceivePersonId());
        updatePmoReq.setFirstInstancePersonName(pmoRequire.getReceivePersonName());
        updatePmoReq.setCurProcessPersonId(pmoRequire.getReceivePersonId());
        pmoRequireMapper.updateByPrimaryKeySelective(updatePmoReq);

        Map<String,String> mailParams = new HashMap<String, String>();
        mailParams.put("requireName",pmoRequire.getReqTitle());
        mailParams.put("requireCode",pmoRequire.getReqCode());
        mailParams.put("reqDetail","需求详情请登录OA系统查看。");
        MailVo mailVo  = new MailVo("【PMO OA系统】提交需求，等待审核","requireVerify",mailUserList);
        mailVo.setParams(mailParams);
        MailSendThread.queue.offer(mailVo);
        return Result.success();
    }

    /**
     * Author ：zhxy
     * 说明：需求审核
     */
    public Result verify1(PmoRequire pmoRequire,User user )throws Exception {
        Map jb = new JSONObject();
        jb.put("businessKey",pmoRequire.getId());
        boolean isNeedVerfied = "1".equals(pmoRequire.getFirstInstanceOpinion());
        jb.put("verified",isNeedVerfied+"");
        String mailSubject;
        String mailKey = null;
        List<String> mailUserList = new ArrayList<String>();
        Map<String,String> mailMap = new HashMap<String, String>();
        PmoRequire pmop = pmoRequireMapper.selectByPrimaryKey(pmoRequire.getId());
        String actId;
        String actName;
        if(isNeedVerfied) {
            mailKey="requireVerify2";
            if ("1".equals(pmoRequire.getNeedSecondInstance())) {
                jb.put("userId", pmoRequire.getSecondInstancePersonId());
                jb.put("need_second", "true");

                mailSubject = "【PMO OA系统】需求审核通过,需要二审";

                mailUserList.add( pmoRequire.getSecondInstancePersonId());
                pmoRequire.setCurProcessPersonId(pmoRequire.getSecondInstancePersonId());
                actId="pmo03";
                actName="需求二审";

            } else {

                jb.put("userId", pmoRequire.getFirstInstancePersonId());
                jb.put("need_second","false");
                mailSubject = "【PMO OA系统】需求审核通过,派发任务";
                mailUserList.add( pmoRequire.getFirstInstancePersonId());
                pmoRequire.setCurProcessPersonId(pmoRequire.getFirstInstancePersonId());
                actId="pmo04";
                actName="任务派发";
            }
        }else{
            mailSubject = "【PMO OA系统】审核被驳回";
            mailKey = "requireReject";
            PmoProject pmoproject = pmoProjectMapper.selectByPrimaryKey(pmop.getProId());
            mailMap.put("proName",pmoproject.getProName());
            mailMap.put("requireName",pmop.getReqTitle());
            mailMap.put("rejectReason",pmoRequire.getFirstInstanceOpinion());
            mailUserList.add(pmop.getReceivePersonId());
            mailUserList.add(pmop.getAddPersonId());
            pmoRequire.setCurProcessPersonId("finish");
            actId="reject";
            actName="已驳回";

        }
        JSONObject contentResult = new JSONObject();
        contentResult.put("actId",actId);
        contentResult.put("actName",actName);
        /*FlowResult result = pmoFlowService.submitFlow(user,jb);
//        JSONObject result = HttpPostClient.doPost(submitFlowUrl,token,jb);
        if(!"success".equals(result.getCode())){
            throw new FlowSubmitException("flow submit error!");
        }
        logger.info("require:"+pmoRequire.getId()+" submit result:"+result.getCode());
        //将返回结果更新到数据库
        JSONObject contentResult = ((JSONArray)(result.getContent())).getJSONObject(0);*/
        //更新当前需求的流程节点
        long curTime = System.currentTimeMillis();
        pmoRequire.setActId(contentResult.getString("actId"));
        pmoRequire.setActName(contentResult.getString("actName"));
        pmoRequire.setUpdateTime(curTime);
        pmoRequire.setFirstInstanceTime(curTime);
        pmoRequireMapper.updateByPrimaryKeySelective(pmoRequire);
        //发送邮件
        MailVo mailVo  = new MailVo(mailSubject,mailKey,mailUserList);
        mailMap.put("requireName",pmop.getReqTitle());
        mailMap.put("reqDetail",pmop.getReqDetail());
        mailVo.setParams(mailMap);
        MailSendThread.queue.offer(mailVo);
        return Result.success();
    }

    /**
     * Author ：zhxy
     * 说明： 二审
     */

    public Result verify2(PmoRequire pmoRequire ,User user)throws Exception {
//        String token = request.getHeader(Constants.TOKEN_AYTHORIZATION);
        String userId = user.getId();
        Map jb = new JSONObject();
        PmoRequire pmoRequireQuery = pmoRequireMapper.selectByPrimaryKey(pmoRequire.getId());
        jb.put("businessKey",pmoRequire.getId());
        String actId;
        String actName;
        if("1".equals(pmoRequire.getSecondInstanceOpinion())) {
            jb.put("verified2", "true");
            pmoRequire.setCurProcessPersonId(pmoRequireQuery.getFirstInstancePersonId());
            actId="pmo04";
            actName="任务派发";
        }else{
            jb.put("verified2", "false");
            pmoRequire.setCurProcessPersonId("finish");
            actId="reject";
            actName="已驳回";

        }
        /*pmoProjectMapper.selectByPrimaryKey()*/

         /*jb.put("userId",pmoRequireQuery.getReceivePersonId());

//        JSONObject result = HttpPostClient.doPost(submitFlowUrl,token,jb);
       FlowResult result = pmoFlowService.submitFlow(user,jb);
        if(!"success".equals(result.getCode())){
            throw new FlowSubmitException("flow submit error!");
        }
        logger.info("require:"+pmoRequire.getId()+" submit result:"+result.getCode());

        //将返回结果更新到数据库

        JSONObject contentResult = ((JSONArray)(result.getContent())).getJSONObject(0);*/

        JSONObject contentResult = new JSONObject();
        contentResult.put("actId",actId);
        contentResult.put("actName",actName);

        long curTime = System.currentTimeMillis();
        pmoRequire.setActId(contentResult.getString("actId"));
        pmoRequire.setActName(contentResult.getString("actName"));
        pmoRequire.setUpdateTime(curTime);
        pmoRequire.setSecondInstanceTime(curTime);
        pmoRequireMapper.updateByPrimaryKeySelective(pmoRequire);
        return Result.success();
    }

    /**
     * Author ：zhxy
     * 说明：派发任务
     */

    public Result distributeRequire(PmoRequireTaskModel pmoRequireTaskModel,User user)throws Exception {
        String userId = user.getId();
        List<PmoRequireTask> pmoRequireTaskList= pmoRequireTaskModel.getPmoRequireTaskList();
        PmoRequire pr = pmoRequireTaskModel.getPmoRequire();
        if(pmoRequireTaskList==null ||pmoRequireTaskList.size()<1){
            return Result.failed("未指定派发任务人");
        }
        //mail用
        Map<String,String> mailParams = new HashMap<String, String>();
        List<String> userList = new ArrayList<String>();

        long curTime = System.currentTimeMillis();

        String requireId = pr.getId();
        PmoRequire pmoRequire = pmoRequireMapper.selectByPrimaryKey(requireId);
        PmoProject project = pmoProjectMapper.selectByPrimaryKey(pmoRequire.getProId());
        /*Map jb = new JSONObject();
        jb.put("businessKey",requireId);
        jb.put("userId",pmoRequire.getReceivePersonId());
        FlowResult result = pmoFlowService.submitFlow(user,jb);

        if(!"success".equals(result.getCode())){
            throw new FlowSubmitException("flow submit error!");
        }
        logger.info("require:"+pmoRequire.getId()+" submit result:"+result.getCode());
        JSONObject contentResult = ((JSONArray)(result.getContent())).getJSONObject(0);*/
        JSONObject contentResult = new JSONObject();
        contentResult.put("actId","pmo05");
        contentResult.put("actName","任务处理");
        pr.setId(pmoRequire.getId());
        pr.setActId(contentResult.getString("actId"));
        pr.setActName(contentResult.getString("actName"));
        pr.setUpdateTime(curTime);
        pr.setCurProcessPersonId(project.getManagePersonId());
        pmoRequireMapper.updateByPrimaryKeySelective(pr);

        for(PmoRequireTask pmoRequireTask:pmoRequireTaskList){
            pmoRequireTask.setId(DataUtil.uuidData());
            pmoRequireTask.setRequireId(pmoRequire.getId());
            pmoRequireTask.setStartTime(pr.getStartTime());
            pmoRequireTask.setEndTime(pr.getEndTime());
            pmoRequireTask.setAddTime(curTime);
            pmoRequireTask.setUpdateTime(curTime);
            pmoRequireTask.setFadebackInfo("反馈未提交");
            userList.add(pmoRequireTask.getTaskPerson());

        }

        pmoRequireTaskMapper.insertTaskBatch(pmoRequireTaskList);
        PmoProject pmoProject = pmoProjectMapper.selectByPrimaryKey(pmoRequire.getProId());
        SimpleDateFormat dsf = new SimpleDateFormat("yyyy-MM-dd");
        mailParams.put("proName",pmoProject.getProName());
        mailParams.put("requireName",pmoRequire.getReqTitle());
        mailParams.put("startTime",dsf.format(new Date(pmoRequireTaskList.get(0).getStartTime())));
        mailParams.put("endTime",dsf.format(new Date(pmoRequireTaskList.get(0).getEndTime())) );
        mailParams.put("reqDetail","  详情请登录OA系统查看!");

        MailVo  mailVo = new MailVo("【PMO OA 系统】任务分配","taskDistribute",userList);
        mailVo.setParams(mailParams);

        MailSendThread.queue.offer(mailVo);
        return Result.success();
    }

    /**
     * Author ：zhxy
     * 说明：TODO
     */
    public Result completeRequireTask(PmoRequireTask pmoRequireTask,HttpServletRequest request)throws Exception {

        if(pmoRequireTask.getId()==null ||"".equals(pmoRequireTask.getId())){
            return Result.failed("id is null");
        }
        List<String> userList = new ArrayList<String>();
        Map<String,String> emailParams = new HashMap<String, String>();

        String requireId = pmoRequireTask.getRequireId();
        PmoRequire pmoRequire = pmoRequireMapper.selectByPrimaryKey(requireId);
        long curTime = System.currentTimeMillis();
        pmoRequireTask.setUpdateTime(curTime);
        pmoRequireTask.setFinishTime(curTime);

        pmoRequire.getReceivePersonName();
        userList.add(pmoRequire.getReceivePersonId());
        pmoRequireTask.setTaskStatus("1");//0 未完成 1 已经完成

        emailParams.put("proCode",pmoRequire.getProCode());
        emailParams.put("requireName",pmoRequire.getReqTitle());
        emailParams.put("reqFadeback",pmoRequireTask.getFadebackInfo());

        pmoRequireTaskMapper.updateByPrimaryKeySelective(pmoRequireTask);

        MailVo  mailVo = new MailVo("【PMO OA 系统】任务分配","taskComplete",userList);
        mailVo.setParams(emailParams);
        MailSendThread.queue.offer(mailVo);

        return Result.success();
    }
    /**
     * Author ：zhxy
     * 说明：结束需求
     */
    public Result finishRequire(PmoRequire pmoRequire,User user)throws FlowSubmitException {
        String userId = user.getId();
        if(StringUtils.isEmpty(pmoRequire.getId()))
            return  Result.failed("需求ID为空，结束流程失败！");
     /*   Map jb = new JSONObject();
        jb.put("businessKey",pmoRequire.getId());

//        JSONObject result = HttpPostClient.doPost(submitFlowUrl,token,jb);
        FlowResult result = pmoFlowService.submitFlow(user,jb);
        if(!"success".equals(result.getCode())){
            throw new FlowSubmitException("flow submit error!");
        }*/
        PmoRequire pmoRequire1 = new PmoRequire();
        pmoRequire1.setId(pmoRequire.getId());
        pmoRequire1.setUpdateTime(System.currentTimeMillis());
        pmoRequire1.setActId("finish");//按照配置写死定义流程
        pmoRequire1.setActName("结束流程");
        logger.info("结束需求，user："+user.getId()+","+user.getRealname());
        pmoRequire1.setCurProcessPersonId(userId);
        pmoRequireMapper.updateByPrimaryKeySelective(pmoRequire1);
        return Result.success();
    }

    public PageResult selectRequireList(RequireQueryFilter requireQueryFilter, User user) {
        String userId = user.getId();
        if(Constants.QUREY_REQUIRE_SCOPE_PART == requireQueryFilter.getScope()){//默认 all
            requireQueryFilter.setAddUserId(userId);
        }else if(Constants.QUREY_REQUIRE_SCOPE_TODO == requireQueryFilter.getScope()){
            requireQueryFilter.setTodoUserId(userId);
        }
        List<Role> roles = roleMapper.selectRoleByUser(user.getId());
        requireQueryFilter.setCurUserId(user.getId());
        //如果判定为pmo的超级查看权限则可以查看所有 100899 为跟前端约定的特殊角色（可查看所有项目）
        for(Role role :roles){
            if(role.getCode()!=null && 100899 ==role.getCode()) {
                requireQueryFilter.setCurUserId(null);
                break;
            }
        }
        String startTime = requireQueryFilter.getStartTime();
        if(!StringUtils.isEmpty(startTime)&&!"0".equals(startTime)){
            String endTime = startTime;
            startTime = (Long.valueOf(endTime)-86399999)+"";
            requireQueryFilter.setStartTime(startTime);
            requireQueryFilter.setEndTime(endTime);
        }
        if(!StringUtils.isEmpty(requireQueryFilter.getAddPerson())){
            requireQueryFilter.setAddPerson("%"+requireQueryFilter.getAddPerson().trim()+"%");
        }
        if(!StringUtils.isEmpty(requireQueryFilter.getReceivePerson())){
            requireQueryFilter.setReceivePerson("%"+requireQueryFilter.getReceivePerson().trim()+"%");
        }
        if(!StringUtils.isEmpty(requireQueryFilter.getProInfo()))
            requireQueryFilter.setProInfo("%"+requireQueryFilter.getProInfo().trim()+"%");
        Page page =  PageHelper.startPage(requireQueryFilter.getPageNum(),requireQueryFilter.getPageSize());
        List<PmoRequireQueryVo> pmoRequireQueryVoList = pmoRequireMapper.selectPmoRequireListByUser(requireQueryFilter);
        return PageResult.success().addObject(pmoRequireQueryVoList).addPageInfo(page,requireQueryFilter.getPageNum());
    }

    public Result selectRequireDetailById(String requireId) {
        PmoRequireDetailModel prdm = new PmoRequireDetailModel();
        PmoRequireDetailVo prdv = pmoRequireMapper.selectByRequireId(requireId);
        List<PmoRequireTask> taskList = pmoRequireTaskMapper.selectRequireTaskList(requireId);
        prdm.setPmoRequireDetail(prdv);
        prdm.setPmoRequireTaskList(taskList);
        return Result.success().addObject(prdm);
    }


    public void downloadRequireExcel(RequireQueryFilter requireQueryFilter,
                                     HttpServletResponse response,
                                     HttpServletRequest request) {
        String authorization =requireQueryFilter.getAuthorization();

        if(StringUtils.isEmpty(authorization)){
            logger.info("没有权限下载此文件"+requireQueryFilter.toString());
        }
        String[] params =authorization.split("_");
        String userId = params[0];
        if(Constants.QUREY_REQUIRE_SCOPE_PART == requireQueryFilter.getScope()){//默认 all
            requireQueryFilter.setAddUserId(userId);
        }else if(Constants.QUREY_REQUIRE_SCOPE_TODO == requireQueryFilter.getScope()){
            requireQueryFilter.setTodoUserId(userId);
        }

        List<Role> roles = roleMapper.selectRoleByUser(userId);
        requireQueryFilter.setCurUserId(userId);
        //如果判定为pmo的超级查看权限则可以查看所有 100899 为跟前端约定的特殊角色（可查看所有项目）
        for(Role role :roles){
            if(role.getCode()!=null && 100899 ==role.getCode()) {
                requireQueryFilter.setCurUserId(null);
                break;
            }
        }
        if(!StringUtils.isEmpty(requireQueryFilter.getAddPerson())){
            requireQueryFilter.setAddPerson("%"+requireQueryFilter.getAddPerson().trim()+"%");
        }
        if(!StringUtils.isEmpty(requireQueryFilter.getReceivePerson())){
            requireQueryFilter.setReceivePerson("%"+requireQueryFilter.getReceivePerson().trim()+"%");
        }
        if(!StringUtils.isEmpty(requireQueryFilter.getProInfo()))
            requireQueryFilter.setProInfo("%"+requireQueryFilter.getProInfo()+"%");
        List<PmoRequireQueryVo> pmoRequireList = pmoRequireMapper.selectRequireList(requireQueryFilter);
        for(PmoRequireQueryVo pmoRequireQueryVo:pmoRequireList){
            if("1".equals(pmoRequireQueryVo.getReqEmergency())){
                pmoRequireQueryVo.setReqEmergency("是");
            }else{
                pmoRequireQueryVo.setReqEmergency("否");
            }
        }

        String fileName = "需求"+System.currentTimeMillis()+".xls";
        String filePath = path+"/projectExcel/"+fileName;
        try {
            ExcelUtils.writeExcel(pmoRequireList, PmoRequireQueryVo.class,filePath);
        } catch (Exception e) {
            e.printStackTrace();
        }
        fileService.getFile("projectExcel",fileName,null,request,response);
    }



    public Result selectRequireCount(HttpServletRequest request) {
        String userId = request.getHeader("user_id");
        int sumCount = pmoRequireMapper.selectRequireCount();
        int partCount = pmoRequireMapper.selectRequirePartCount(userId);
        int todoCount = pmoRequireMapper.selectRequireTodoCount(userId);

        PmoCounts pc = new PmoCounts();
        pc.setSumCount(sumCount);
        pc.setPartCount(partCount);
        pc.setTodoCount(todoCount);
        return Result.success().addObject(pc);

    }

}
