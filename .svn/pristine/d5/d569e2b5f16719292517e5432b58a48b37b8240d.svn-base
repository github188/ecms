package com.ecaray.ecms.services.crm;

import java.util.List;

import com.ecaray.ecms.entity.crm.Vo.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import com.ecaray.ecms.commons.constant.PageResult;
import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.commons.utils.DataUtil;
import com.ecaray.ecms.dao.mapper.crm.CrmClientContactsMapper;
import com.ecaray.ecms.dao.mapper.crm.CrmClientMapper;
import com.ecaray.ecms.dao.mapper.crm.CrmFollowMapper;
import com.ecaray.ecms.dao.redis.crm.CrmFieldsMapRedis;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.crm.CrmClient;
import com.ecaray.ecms.entity.crm.CrmClientContacts;
import com.ecaray.ecms.entity.crm.CrmFollow;
import com.ecaray.ecms.services.authority.UserService;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

/**
 * com.ecaray.ecms.services.crm
 * Author ：zhxy
 * 2017/5/12 9:41
 * 说明：crm 客户服务
 */
@Service
public class CrmClientService {
    Logger logger  = LoggerFactory.getLogger(CrmClientService.class);
    @Autowired
    private CrmClientMapper ccMapper;
    @Autowired
    private CrmClientContactsMapper ccContactsMapper;
    @Autowired
    private CrmFollowMapper crmFollowMapper;
    @Autowired
    private CrmFieldsMapRedis crmFieldsMapRedis;
    @Autowired
    private UserService userService;

    @Transactional
    public Result addClient(User user, CrmClientModel ccModel) {
        CrmClient client  = ccModel.getCrmClient();
        String id = DataUtil.uuidData();
        Long curTime  = System.currentTimeMillis();
        client.setId(id);
        client.setUpdateTime(curTime);
        client.setAddTime(curTime);
        client.setAddPersonId(user.getId());
        
        logger.info("add error!");
        //客户联系信息
        List<CrmClientContacts>  ccContactsList = ccModel.getCrmClientContactses();
        if(ccContactsList!=null && !ccContactsList.isEmpty()) {
            for (CrmClientContacts ccc : ccContactsList) {
                ccc.setId(DataUtil.randomId());
                ccc.setUpdateTime(curTime);
                ccc.setAddTime(curTime);
                ccc.setAddPersonId(user.getId());
                ccc.setAddPersonName(user.getRealname());
                ccc.setClientId(client.getId());
            }
            ccContactsMapper.insertBatch(ccContactsList);
            client.setContactsId(ccContactsList.get(0).getId());
        	client.setContactsName(ccContactsList.get(0).getName());
        	client.setContactsPhone(ccContactsList.get(0).getPhone());
        	ccMapper.insertSelective(client);
        }
        logger.info("添加客户关系成功，id："+id);
        
        return Result.success();
    }

    @Transactional
    public Result updateClient(CrmClient client) {
        if(StringUtils.isEmpty(client.getId()))
            return Result.failed("ID为空，更新客户信息失败!");
        Long curTime = System.currentTimeMillis();
        client.setUpdateTime(curTime);
        ccMapper.updateByPrimaryKeySelective(client);
        return Result.success();
    }

    @Transactional
    public Result addClientContacts(User user ,CrmClientContacts ccContacts) {
        ccContacts.setId(new DataUtil().toHexString());
        Long curTime = System.currentTimeMillis();
        ccContacts.setAddPersonId(user.getId());
        ccContacts.setAddPersonName(user.getRealname());
        ccContacts.setAddTime(curTime);
        ccContacts.setUpdateTime(curTime);
        ccContactsMapper.insertSelective(ccContacts);
        return Result.success();
    }

    @Transactional
    public Result updateClientContacts(CrmClientContacts ccContacts) {

        if(StringUtils.isEmpty(ccContacts.getId())){
            return Result.failed("ID为空，更新联系人信息失败!");
        }
        Long curTime = System.currentTimeMillis();
        ccContacts.setUpdateTime(curTime);
        ccContactsMapper.updateByPrimaryKeySelective(ccContacts);
        return Result.success();
    }


    public Result selectClientContactsList(String clientId){
        List<CrmClientContacts> list =  ccContactsMapper.selectContactsListByCId(clientId);
        return Result.success().addObject(list);
    }

    public Result addClientFollow(CrmFollow crmFollow) {
        crmFollow.setId(DataUtil.uuidData());
        crmFollow.setAddTime(System.currentTimeMillis());
        crmFollow.setUpdateTime(System.currentTimeMillis());
        updateClientLastFollowTime(crmFollow);
        crmFollowMapper.insertSelective(crmFollow);
        return Result.success();
    }

    private void updateClientLastFollowTime(CrmFollow crmFollow) {
    	 crmFollowMapper.updateClientLastFollowTime(crmFollow);
	}

	public Result updateClientFollow(CrmFollow crmFollow) {
        if(StringUtils.isEmpty(crmFollow.getId())){
            Result.failed("ID为空,更新跟进失败!");
        }
        crmFollow.setUpdateTime(System.currentTimeMillis());
        updateClientLastFollowTime(crmFollow);
        crmFollowMapper.updateByPrimaryKeySelective(crmFollow);
        return Result.success();
    }

    public Result selectClientFollowList(String clientId){
        if(StringUtils.isEmpty(clientId))
            return Result.failed("查询跟进失败，客户ID为空");
       List<CrmFollow>  crmFollows = crmFollowMapper.selectClientFollows(clientId,null);
       for(CrmFollow c : crmFollows) {
    	   c.setFollowModeName(crmFieldsMapRedis.readById(c.getFollowModeId()));
       }
       return Result.success().addObject(crmFollows);
    }

    /**
     * Author ：zhxy
     * 说明：根据查询条件选择客户列表
     */
    public PageResult selectClientList(User user,ClientQueryFilter clientQueryFilter) {
        clientQueryFilter.setClientName(StringUtils.isEmpty(clientQueryFilter.getClientName())?
                null:("%"+clientQueryFilter.getClientName()+"%"));

        if(clientQueryFilter.getIsMyKeeper()!=1){
            List<String> userIds = userService.selectSubordinateIds(user.getId());
            userIds.add(user.getId());
            /*String inIds= null;
            if(userIds!=null && !userIds.isEmpty()){
                inIds ="";
                for(String idTmp:userIds){
                    inIds = inIds+idTmp+",";
                }
                inIds = inIds + user.getId();
            }*/
            /*clientQueryFilter.setKeeperName(StringUtils.isEmpty(clientQueryFilter.getKeeperName())?
                    null:("%"+clientQueryFilter.getKeeperName()+"%"));*/
            clientQueryFilter.setKeepers(userIds);
            clientQueryFilter.setKeeperId(null);
            
        }else{
            //如果是本人负责则查询条件无效
            clientQueryFilter.setKeepers(null);
            clientQueryFilter.setKeeperId(user.getId());
            //如果是我负责的客户列表则 根据人名模糊查询条件无效
            /*clientQueryFilter.setKeeperName(null);*/

        }
        Page page = PageHelper.startPage(clientQueryFilter.getPageNum(),clientQueryFilter.getPageSize());
        List<CrmClientVo> ccvList = ccMapper.selectClientListQuery(clientQueryFilter);
        if(ccvList!=null && !ccvList.isEmpty()){
            for(CrmClientVo crmClientVo:ccvList){
                clientFieldsTranslator(crmClientVo);
            }
        }
        return PageResult.success().addObject(ccvList).addPageInfo(page,clientQueryFilter.getPageNum());
    }

    @Transactional
    public Result addBatchClientContacts(User user, AddBatchContactsFilter contacts) {
        String clientId = contacts.getClientId();
        List<CrmClientContacts> list = contacts.getContactsList();
        for(CrmClientContacts contact : list) {
            contact.setClientId(clientId);
            contact.setAddPersonId(user.getId());
            contact.setAddPersonName(user.getRealname());
            contact.setAddTime(System.currentTimeMillis());
            contact.setUpdateTime(System.currentTimeMillis());
            contact.setId(DataUtil.uuidData());
        }
        if(list!=null &&!list.isEmpty()) {
            ccContactsMapper.insertBatch(list);
        }
        return Result.success();
    }
    /**
     * Author ：zhxy
     * 说明：获取客户ID获取详情
     */

    public Result selectClientDetail(String clientId,User user){
        CrmClientDetailQuery crmClientDetailQuery = new CrmClientDetailQuery();
        List<String> userIds = userService.selectSubordinateIds(user.getId());
        userIds.add(user.getId());
        crmClientDetailQuery.setClientId(clientId);
        crmClientDetailQuery.setKeepers(userIds);
        //TODO
        CrmClientVo crmClientVo =ccMapper.selectDetailPrimaryKey(crmClientDetailQuery);
        if(crmClientVo!=null) {
            clientFieldsTranslator(crmClientVo);
        }
       return Result.success().addObject(crmClientVo);
    }

    /**
     * Author ：zhxy
     * 说明：crm字段意义翻译
     */
    private void clientFieldsTranslator(CrmClientVo crmClientVo){
        crmClientVo.setClientLevelName(crmFieldsMapRedis.readById(crmClientVo.getClientLevelId()));
        crmClientVo.setClientStatusName(crmFieldsMapRedis.readById(crmClientVo.getClientStatusId()));
        crmClientVo.setClientTypeName(crmFieldsMapRedis.readById(crmClientVo.getClientTypeId()));
        crmClientVo.setCoAreaName(crmFieldsMapRedis.readById(crmClientVo.getCoAreaId()));
        crmClientVo.setRegionName(crmFieldsMapRedis.readById(crmClientVo.getRegionId()));
        crmClientVo.setDealStatusName(crmFieldsMapRedis.readById(crmClientVo.getDealStatusId()));
        crmClientVo.setCoModeName(crmFieldsMapRedis.readById(crmClientVo.getCoModeId()));
    }

	public Result selectClientOppList(String clientId) {
		 if(StringUtils.isEmpty(clientId))
	            return Result.failed("查询商机失败，客户ID为空");
	       List<CrmOppVo>  crmOppVoList = ccMapper.selectClientOppList(clientId);
	       for(CrmOppVo cv: crmOppVoList){
	    	   cv.setIntItemsName(crmFieldsMapRedis.readById(cv.getIntItemsId()));
	    	   cv.setRegionName(crmFieldsMapRedis.readById(cv.getRegionId()));
	       }
	       return Result.success().addObject(crmOppVoList);
	}

	public Result selectContactByconId(String conId) {
		 return Result.success().addObject(ccContactsMapper.selectContactByconId(conId));
	}

	public Result selectFollowById(String followId) {
		 return Result.success().addObject(crmFollowMapper.selectFollowById(followId));
	}
}
