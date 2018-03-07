package com.ecaray.ecms.services.crm;

import com.ecaray.ecms.commons.constant.PageResult;
import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.commons.utils.DataUtil;
import com.ecaray.ecms.dao.mapper.crm.*;
import com.ecaray.ecms.dao.redis.crm.CrmFieldsMapRedis;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.crm.*;
import com.ecaray.ecms.entity.crm.Vo.*;
import com.ecaray.ecms.services.authority.UserService;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

/**
 * com.ecaray.ecms.services.crm
 * Author ：zhxy
 * 2017/5/12 17:37
 * 说明：商机服务类
 */
@Service
public class CrmOppService {

    @Autowired
    private CrmFollowMapper crmFollowMapper;
    @Autowired
    private CrmOppMapper crmOppMapper;
    @Autowired
    private CrmOppContactsMapper crmOppContactsMapper;
    @Autowired
    private CrmClientContactsMapper crmClientContactsMapper;
    @Autowired
    private CrmFollowComMapper crmFollowComMapper;

    @Autowired
    private CrmClientService crmClientService;
    @Autowired
    private UserService userService;
    @Autowired
    private CrmFieldsMapRedis crmFieldsMapRedis;

    @Transactional
    public Result addCrmOpp(User user, CrmOppModel crmOppModel){
        CrmOpp crmOpp = crmOppModel.getCrmOpp();
        Long curTime = System.currentTimeMillis();
        String oppId  = DataUtil.uuidData();
        crmOpp.setId(oppId);
        crmOpp.setUpdateTime(curTime);
        crmOpp.setAddTime(curTime);
        crmOpp.setAddPersonId(user.getId());
        if(crmOpp.getKeeperId() == null) {
        	crmOpp.setKeeperId(user.getId());
        	crmOpp.setKeeperName(user.getRealname());
        }
        String clientId = crmOpp.getClientId();
        if(!StringUtils.isEmpty(clientId)) {
        	Result r = crmClientService.selectClientDetail(clientId,user);
        	CrmClient c = (CrmClient)(r.getContent());
        	crmOpp.setClientName(c.getName());
        }
        crmOppMapper.insertSelective(crmOpp);
        List<CrmOppContacts> crmOppContactses = crmOppModel.getCrmOppContactsList();
        if(crmOppContactses!=null &&!crmOppContactses.isEmpty()){
            for(CrmOppContacts coc:crmOppContactses){
                coc.setId(DataUtil.uuidData());
                coc.setOppId(oppId);
                coc.setAddTime(curTime);
                coc.setUpdateTime(curTime);
            }
            crmOppContactsMapper.insertBatch(crmOppContactses);
        }
        return Result.success();
    }

    @Transactional
    public Result updateCrmOpp(CrmOpp crmOpp){
        if(StringUtils.isEmpty(crmOpp.getId())){
            return Result.failed("更新失败，商机ID为空!");
        }
        crmOppMapper.updateByPrimaryKeySelective(crmOpp);
        return Result.success();
    }

    @Transactional
    public  Result updateContactsBatch(List<CrmOppContacts> crmOppContactses){
        if(crmOppContactses==null ||crmOppContactses.isEmpty()){
            return Result.failed("修改失败，未传入有效联系人!");
        }
        String oppId = null;
        for(CrmOppContacts crmOppContacts:crmOppContactses){
            if(!StringUtils.isEmpty(crmOppContacts.getOppId())){
                oppId = crmOppContacts.getOppId();
            }
        }
        if(oppId==null) {
            return Result.failed("未传入商机ID，更新失败!");
        }

        crmOppContactsMapper.deleteByOppId(oppId);
        crmOppContactsMapper.insertBatch(crmOppContactses);
        return Result.success();
    }

    @Transactional
    public Result addOppFollow(CrmFollow crmFollow) {
        crmFollow.setId(DataUtil.uuidData());
        crmFollow.setAddTime(System.currentTimeMillis());
        crmFollow.setUpdateTime(System.currentTimeMillis());
		if (StringUtils.isEmpty(crmFollow.getClientId())) {
			CrmOpp crmOpp = crmOppMapper.selectByPrimaryKey(crmFollow.getOppId());
			crmFollow.setClientId(crmOpp.getClientId());
		}
		crmFollowMapper.updateClientLastFollowTime(crmFollow);
        crmFollowMapper.insertSelective(crmFollow);
        return Result.success();
    }

    @Transactional
    public Result updateOppFollow(CrmFollow crmFollow) {
        if(StringUtils.isEmpty(crmFollow.getId())){
            Result.failed("ID为空,更新跟进失败!");
        }
        crmFollow.setUpdateTime(System.currentTimeMillis());
        crmFollowMapper.updateClientLastFollowTime(crmFollow);
        crmFollowMapper.updateByPrimaryKeySelective(crmFollow);
        return Result.success();
    }

    public PageResult selectOppListQuery(User user , OppQueryFilter oppQueryFilter){
        oppQueryFilter.setClientName(StringUtils.isEmpty(oppQueryFilter.getClientName())?
                null:("%"+oppQueryFilter.getClientName()+"%"));
        oppQueryFilter.setName(StringUtils.isEmpty(oppQueryFilter.getName())?
                null:("%"+oppQueryFilter.getName()+"%"));

        if(oppQueryFilter.getIsMyKeeper()!=1){
            List<String> userIds = userService.selectSubordinateIds(user.getId());
            userIds.add(user.getId());
            oppQueryFilter.setKeepers(userIds);
            oppQueryFilter.setKeeperId(null);
        }else{
            //如果是本人负责则查询条件无效
        	oppQueryFilter.setKeeperName(null);
            oppQueryFilter.setKeepers(null);
            oppQueryFilter.setClientName(null);
            oppQueryFilter.setKeeperId(user.getId());
        }
        Page page = PageHelper.startPage(oppQueryFilter.getPageNum(),oppQueryFilter.getPageSize());
        List<CrmOppVo> ccvList = crmOppMapper.selectOppListQuery(oppQueryFilter);
        if(ccvList!=null &&!ccvList.isEmpty()){
            for(CrmOppVo crmOppVo :ccvList){
                translatorOppFileds(crmOppVo);
            }
        }
        return PageResult.success().addObject(ccvList).addPageInfo(page,oppQueryFilter.getPageNum());

    }

    public Result selectOppContactsList(String oppId) {
       List<CrmClientContacts> crmClientContactsList =  crmClientContactsMapper.selectOppContactsList(oppId);
        return Result.success().addObject(crmClientContactsList);
    }

    @Transactional
    public Result addFollowComment(User user ,CrmFollowCom crmFollowCom) {
        Long curTime = System.currentTimeMillis();

        crmFollowCom.setAddPersonId(user.getId());
        crmFollowCom.setAddPersonName(user.getRealname());
        crmFollowCom.setAddTime(curTime);
        crmFollowCom.setUpdateTime(curTime);
        crmFollowCom.setId(DataUtil.uuidData());
        if(StringUtils.isEmpty(crmFollowCom.getParentId())){
            crmFollowCom.setParentId("0");
        }
        crmFollowComMapper.insertSelective(crmFollowCom);
        return Result.success();

    }

    @Transactional
    public Result updateFollowComment(CrmFollowCom crmFollowCom) {
        if(StringUtils.isEmpty(crmFollowCom.getId()))
            return Result.failed("ID为空，修改失败!");
        Long curTime = System.currentTimeMillis();
        crmFollowCom.setUpdateTime(curTime);
        crmFollowComMapper.insertSelective(crmFollowCom);
        return Result.success();
    }


    public Result selectComByFollowId(String followId) {
        List<CrmFollowCom> cfcList = crmFollowComMapper.selectComByFollowId(followId);
        List<CrmFlowComModel> cfcmList = new ArrayList<CrmFlowComModel>();
        for(CrmFollowCom crmFollowCom : cfcList){
            CrmFlowComModel crcm = new CrmFlowComModel();
            crcm.setCrmFollowCom(crmFollowCom);
            String id =  crmFollowCom.getId();
            List<CrmFollowComVo> cfcvList = selectComByBelongId(id);
            if(cfcvList!=null && !cfcvList.isEmpty()){
                crcm.setComCount(cfcvList.size());
                crcm.setComPersonName(cfcList.get(0).getAddPersonName());
                crcm.setCrmFollowComs(cfcvList);
            }
            cfcmList.add(crcm);

        }

        return Result.success().addObject(cfcmList);
    }

    public List<CrmFollowComVo>  selectComByBelongId(String belongId) {
        List<CrmFollowComVo> cfcList = crmFollowComMapper.selectComByBelongId(belongId);
        return cfcList;
    }


    public Result selectOppFollowList(String oppId) {
        if(StringUtils.isEmpty(oppId)) {
            return Result.failed("商机ID为空，查询失败!");
        }
        List<CrmFollow> crmFollows = crmFollowMapper.selectClientFollows(null,oppId);
        for(CrmFollow c : crmFollows){
        	c.setFollowModeName(crmFieldsMapRedis.readById(c.getFollowModeId()));
        }
        return Result.success().addObject(crmFollows);
    }

	public Result selectCrmOppById(String oppId) {	
		if(StringUtils.isEmpty(oppId)) {
            return Result.failed("商机ID为空，查询失败!");
        }
        CrmOpp crmOpp = crmOppMapper.selectCrmOppById(oppId);
        return Result.success().addObject(crmOpp);
	}

    public Result selectOppDetail(String id) {
        CrmOppVo cov = crmOppMapper.selectOppDetailById(id);
        if(cov!=null){
            translatorOppFileds(cov);
        }
        return Result.success().addObject(cov);
    }

    public void translatorOppFileds(CrmOppVo crmOppVo){
        crmOppVo.setRegionName(crmFieldsMapRedis.readById(crmOppVo.getRegionId()));
        crmOppVo.setSaleStageName(crmFieldsMapRedis.readById(crmOppVo.getSaleStageId()));
        crmOppVo.setCoModeName(crmFieldsMapRedis.readById(crmOppVo.getCoModeId()));
        crmOppVo.setIntItemsName(crmFieldsMapRedis.readById(crmOppVo.getIntItemsId()));
    }

    public Result addBatchOppContacts(User user, AddBatchContactsFilter contacts) {
        String oppId = contacts.getOppId();
        if(contacts.getContactsList()==null ||contacts.getContactsList().isEmpty()){
            return Result.failed("联系人信息为空，新增失败!");
        }

        //添加客户联系人
        CrmOpp crmOpp = crmOppMapper.selectByPrimaryKey(oppId);
        if(crmOpp!=null && !StringUtils.isEmpty(crmOpp.getClientId())) {
            contacts.setClientId(crmOpp.getClientId());
            crmClientService.addBatchClientContacts(user, contacts);
        }else{
            return Result.failed("新增联系人失败!");
        }
        //将这些人更新如商机联系人列表
        List<CrmClientContacts>  cccList = contacts.getContactsList();
        List<CrmOppContacts> cocList = new ArrayList<CrmOppContacts>();
        long curTime = System.currentTimeMillis();
        for(CrmClientContacts cccTmp:cccList){
            CrmOppContacts coc = new CrmOppContacts();
            coc.setId(DataUtil.uuidData());
            coc.setName(cccTmp.getName());
            coc.setOppId(oppId);
            coc.setPhone(cccTmp.getPhone());
            coc.setTitle(cccTmp.getTitle());
            coc.setPersonId(cccTmp.getId());
            coc.setAddPersonId(user.getId());
            coc.setAddPersonName(user.getRealname());
            coc.setAddTime(curTime);
            coc.setUpdateTime(curTime);
            cocList.add(coc);
        }
        if(!cocList.isEmpty()){
            crmOppContactsMapper.insertBatch(cocList);
        }
        return Result.success();
    }
}
