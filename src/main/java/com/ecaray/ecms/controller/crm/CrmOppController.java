package com.ecaray.ecms.controller.crm;

import com.ecaray.ecms.commons.authorization.annotation.Authorization;
import com.ecaray.ecms.commons.authorization.annotation.CurrentUser;
import com.ecaray.ecms.commons.constant.PageResult;
import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.crm.CrmFollow;
import com.ecaray.ecms.entity.crm.CrmFollowCom;
import com.ecaray.ecms.entity.crm.CrmOpp;
import com.ecaray.ecms.entity.crm.CrmOppContacts;
import com.ecaray.ecms.entity.crm.Vo.AddBatchContactsFilter;
import com.ecaray.ecms.entity.crm.Vo.CrmOppModel;
import com.ecaray.ecms.entity.crm.Vo.OppQueryFilter;
import com.ecaray.ecms.services.crm.CrmOppService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.core.MediaType;
import java.util.List;

/**
 * com.ecaray.ecms.controller.crm
 * Author ：zhxy
 * 2017/5/12 19:02
 * 说明：商机服务类
 */
@Api(description = "CRM/商机管理")
@RequestMapping("crm/opp")
@RestController
public class CrmOppController {
    @Autowired
    private CrmOppService crmOppService;

    /**
     * Author ：zhxy
     * 说明：添加商机
     */
    @Authorization
    @RequestMapping(value="/insert",method = RequestMethod.POST)
    public Result  addCrmOpp(@CurrentUser User user, @RequestBody CrmOppModel crmOppModel){
        return crmOppService.addCrmOpp(user,crmOppModel);
    }
    
    /**
     * Author ：zhxy
     * 说明：添加商机
     */
    @Authorization
    @RequestMapping(value="/info",method = RequestMethod.GET)
    public Result selectCrmOppById(String oppId){
    	return crmOppService.selectCrmOppById(oppId);
    }

    /**
     * Author ：zhxy
     * 说明：修改商机
     */
    @RequestMapping(method = RequestMethod.PUT)
    public Result updateCrmOpp(@RequestBody  CrmOpp crmOpp){
        return crmOppService.updateCrmOpp(crmOpp);
    }


    @RequestMapping(value = "/{id}/detail",method = RequestMethod.GET)
    public Result selectOppDetail(@PathVariable("id")String id){
        return crmOppService.selectOppDetail(id);
    }


    /**
     * Author ：xs
     * 说明：批量新增联系人
     */
    @ApiOperation(value = "批量新增联系人",notes ="批量新增联系人",httpMethod = "POST",produces = MediaType.APPLICATION_JSON)
    @RequestMapping(value = "/add/batch",method = RequestMethod.POST)
    @Authorization
    public Result addBatchClientContacts(@CurrentUser User user,@RequestBody AddBatchContactsFilter contacts){
        return crmOppService.addBatchOppContacts(user,contacts);
    }
    /**
     * Author ：zhxy
     * 说明：修改商机联系人
     */
    @RequestMapping(value ="/contacts",method = RequestMethod.PUT)
    public Result updateContactsBatch(List<CrmOppContacts> crmOppContactses){
        return crmOppService.updateContactsBatch(crmOppContactses);
    }

    /**
     * Author ：zhxy
     * 说明：根据商机ID 获取联系人列表
     */
    @RequestMapping(value = "/contacts/list",method = RequestMethod.GET)
    public Result selectOppContactsList(@RequestParam("oppId") String oppId){
        return crmOppService.selectOppContactsList(oppId);
    }
    /**
     * Author ：zhxy
     * 说明：添加商机跟进记录
     */
    @RequestMapping(value = "/follow",method = RequestMethod.POST)
    public Result addOppFollow(@RequestBody CrmFollow crmFollow){
        return crmOppService.addOppFollow(crmFollow);
    }

    /**
     * Author ：zhxy
     * 说明：添加商机跟进记录
     */
    @RequestMapping(value = "/follow",method = RequestMethod.PUT)
    public Result updateOppFollow(@RequestBody CrmFollow crmFollow){
        return crmOppService.updateOppFollow(crmFollow);
    }

    /**
     * Author ：zhxy
     * 说明：
     */
    @RequestMapping(value="/follow/list",method = RequestMethod.GET)
    public Result selectOppFollows(@RequestParam("oppId") String oppId){
        return crmOppService.selectOppFollowList(oppId);
    }

    @RequestMapping(value="/list",method = RequestMethod.GET)
    @Authorization
    public PageResult selectOppFollows(@CurrentUser User user , OppQueryFilter oppQueryFilter){
        return crmOppService.selectOppListQuery(user,oppQueryFilter);
    }

    @RequestMapping(value = "/comment",method = RequestMethod.POST)
    @Authorization
    public Result addFollowComment(@CurrentUser User user ,@RequestBody CrmFollowCom crmFollowCom){//TODO
        return crmOppService.addFollowComment(user,crmFollowCom);
    }


    @RequestMapping(value = "/comment",method = RequestMethod.PUT)
    public Result updateFollowComment(CrmFollowCom crmFollowCom){//TODO
        return crmOppService.updateFollowComment(crmFollowCom);
    }


    @RequestMapping(value = "/comment/list",method = RequestMethod.GET)
    public Result selectByFollowId(@RequestParam("followId")String followId){
        return crmOppService.selectComByFollowId(followId);
    }

    @RequestMapping(value = "/comment/sub/list",method = RequestMethod.GET)
    public Result selectByBelongId(@RequestParam("belongId")String belongId){
        return Result.success().addObject(crmOppService.selectComByBelongId(belongId));
    }


}
