package com.ecaray.ecms.controller.crm;


import com.ecaray.ecms.commons.authorization.annotation.Authorization;
import com.ecaray.ecms.commons.authorization.annotation.CurrentUser;
import com.ecaray.ecms.commons.constant.PageResult;
import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.crm.CrmClient;
import com.ecaray.ecms.entity.crm.CrmClientContacts;
import com.ecaray.ecms.entity.crm.CrmFollow;
import com.ecaray.ecms.entity.crm.Vo.AddBatchContactsFilter;
import com.ecaray.ecms.entity.crm.Vo.ClientQueryFilter;
import com.ecaray.ecms.entity.crm.Vo.CrmClientModel;
import com.ecaray.ecms.services.crm.CrmClientService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.core.MediaType;

/**
 * com.ecaray.ecms.controller.crm
 * Author ：zhxy
 * 2017/5/12 9:38
 * 说明：TODO
 */
@Api(description = "CRM/客户管理")
@RestController
@RequestMapping("crm/client")
public class CrmClientController {
    @Autowired
    CrmClientService ccs;
    /**
     * Author ：zhxy
     * 说明：添加客户信息
     */

    @ApiOperation(value = "添加用户",notes ="添加用户",httpMethod = "POST",produces = MediaType.APPLICATION_JSON)
    @RequestMapping(method = RequestMethod.POST)
    public Result addClient(/*@CurrentUser*/ User user , @RequestBody CrmClientModel ccm){
        user =new User();//TODO
        user.setId("149309277119639");
        user.setRealname("老板");
       return  ccs.addClient(user,ccm);
    }

    /**
     * Author ：zhxy
     * 说明：更新客户信息
     */
    @ApiOperation(value = "修改用户",notes ="修改用户",httpMethod = "PUT",produces = MediaType.APPLICATION_JSON)
    @RequestMapping(method = RequestMethod.PUT)
    public Result updateClient(@RequestBody CrmClient client){
        return ccs.updateClient(client);
    }


    /**
     * Author ：zhxy
     * 说明：查询客户列表
     */
    @ApiOperation(value = "获取客户列表",notes ="获取客户列表",httpMethod = "GET",produces = MediaType.APPLICATION_JSON)
    @RequestMapping(value = "/list" ,method = RequestMethod.GET)
    @Authorization
    public PageResult selectClientList(@CurrentUser User user,ClientQueryFilter clientQueryFilter){
        return ccs.selectClientList(user,clientQueryFilter);
    }

    /**
     * Author ：zhxy
     * 说明：新增联系人
     */
    @ApiOperation(value = "新增联系人",notes ="新增联系人",httpMethod = "POST",produces = MediaType.APPLICATION_JSON)
    @RequestMapping(value = "/contacts",method = RequestMethod.POST)
    @Authorization
    public Result addClientContacts(@CurrentUser User user,CrmClientContacts ccContacts){
      return ccs.addClientContacts(user,ccContacts);
    }
    
    /**
     * Author ：xs
     * 说明：批量新增联系人
     */
    @ApiOperation(value = "批量新增联系人",notes ="批量新增联系人",httpMethod = "POST",produces = MediaType.APPLICATION_JSON)
    @RequestMapping(value = "/add/batch",method = RequestMethod.POST)
    @Authorization
    public Result addBatchClientContacts(@CurrentUser User user,@RequestBody AddBatchContactsFilter contacts){
    	return ccs.addBatchClientContacts(user,contacts);
    }

    /**
     * Author ：zhxy
     * 说明：修改联系人
     */
    @ApiOperation(value = "修改联系人",notes ="修改联系人",httpMethod = "PUT",produces = MediaType.APPLICATION_JSON)
    @RequestMapping(value = "/contacts",method = RequestMethod.PUT)
    public Result updateContacts(@RequestBody CrmClientContacts ccContacts){
        return ccs.updateClientContacts(ccContacts);
    }
    
    /**
     * Author ：zhxy
     * 说明：修改联系人
     */
    @ApiOperation(value = "通过id获取联系人",notes ="通过id获取联系人",httpMethod = "GET",produces = MediaType.APPLICATION_JSON)
    @RequestMapping(value = "/contacts/info",method = RequestMethod.GET)
    public Result selectContactByconId( String conId){
    	return ccs.selectContactByconId(conId);
    }


    /**
     * Author ：zhxy
     * 说明：根据客户ID 获取联系人列表
     */
    @ApiOperation(value = "根据客户ID获取联系人列表",notes ="根据客户ID获取联系人列表",httpMethod = "GET",produces = MediaType.CHARSET_PARAMETER)
    @RequestMapping(value = "/contacts/list",method = RequestMethod.GET)
    public Result selectContactsByClientId(@RequestParam("clientId")String clientId){
        return ccs.selectClientContactsList(clientId);

    }

    @ApiOperation(value = "添加跟进记录",notes ="添加跟进记录",httpMethod = "POST",produces = MediaType.APPLICATION_JSON)
    @RequestMapping(value="/follow",method = RequestMethod.POST)
    public Result addClientFollow(@RequestBody CrmFollow crmFollow){
       return  ccs.addClientFollow(crmFollow);
    }
    
    @ApiOperation(value = "查询跟进记录",notes ="添加跟进记录",httpMethod = "GET",produces = MediaType.APPLICATION_JSON)
    @RequestMapping(value="/follow/detail",method = RequestMethod.GET)
    public Result selectFollowById(@RequestParam String followId){
    	return  ccs.selectFollowById(followId);
    }

    @ApiOperation(value = "修改跟进记录",notes ="修改跟进记录",httpMethod = "PUT",produces = MediaType.APPLICATION_JSON)
    @RequestMapping(value="/follow",method = RequestMethod.PUT)
    public Result updateClientFollow(@RequestBody CrmFollow crmFollow){
        return  ccs.updateClientFollow(crmFollow);
    }

    @ApiOperation(value = "根据客户ID获取跟进记录",notes ="根据客户ID获取跟进记录",httpMethod = "PUT",produces = MediaType.CHARSET_PARAMETER)
    @RequestMapping(value = "/follow/list",method =  RequestMethod.GET)
    public Result selectClientFollowList(@RequestParam("clientId") String clientId){
        return ccs.selectClientFollowList(clientId);
    }

    @Authorization
    @ApiOperation(value = "根据客户ID获取商机列表",notes ="根据客户ID获取商机列表",httpMethod = "get",produces = MediaType.CHARSET_PARAMETER)
    @RequestMapping(value = "/opp/list",method =  RequestMethod.GET)
    public Result selectClientOppList(@RequestParam("clientId") String clientId){
    	return ccs.selectClientOppList(clientId);
    }
    
    @ApiOperation(value = "根据客户ID获取客户详情",notes ="根据客户ID获取客户详情",httpMethod = "GET",produces = MediaType.CHARSET_PARAMETER)
    @Authorization
    @RequestMapping(value = "/{clientId}/detail",method = RequestMethod.GET)
    public  Result selectClientById(@PathVariable("clientId")String clientId,@CurrentUser User user){
        return ccs.selectClientDetail(clientId,user);
    }

}
