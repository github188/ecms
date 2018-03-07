package com.ecaray.ecms.controller.crm;

import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.entity.crm.CrmFields;
import com.ecaray.ecms.entity.crm.Vo.CrmOppVo;
import com.ecaray.ecms.services.crm.CrmFieldsService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.core.MediaType;
import java.util.List;

/**
 * com.ecaray.ecms.services.crm
 * Author ：zhxy
 * 2017/5/12 19:59
 * 说明：
 */
@Api(description = "CRM/字段管理")
@RestController
@RequestMapping("crm/fields")
public class CrmCommonController {
    @Autowired
    private CrmFieldsService crmFieldsService;


    /**
     * Author ：zhxy
     * 说明：添加字段信息
     */
    @RequestMapping(method = RequestMethod.POST)
    public Result addFields(CrmFields crmFields){
       return  crmFieldsService.addFields(crmFields);
    }

    /**
     * Author ：zhxy
     * 说明：更新字段信息
     */
    @RequestMapping(method = RequestMethod.PUT)
    public Result updateFields(CrmFields crmFields){
        return crmFieldsService.updateFields(crmFields);
    }

    /**
     * Author ：zhxy
     * 说明：更新字段信息
     */
    @ApiOperation(value = "批量更新crm字段信息",notes ="批量更新crm字段信息",httpMethod = "POST",produces = MediaType.APPLICATION_JSON)
    @RequestMapping(value = "/batch",method = RequestMethod.POST)
    public Result updateFieldsBatch(@RequestBody List<CrmFields> crmFields){
        return crmFieldsService.updateFieldsBatch(crmFields);
    }

    @RequestMapping(value = "list",method = RequestMethod.GET)
    public Result selectFields(String belongCode){
        return Result.success().addObject(crmFieldsService.selectFieldsList(belongCode));
    }

}
