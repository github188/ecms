package com.ecaray.ecms.services.crm;

import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.commons.utils.DataUtil;
import com.ecaray.ecms.dao.mapper.crm.CrmFieldsMapper;
import com.ecaray.ecms.dao.redis.crm.CrmFieldsMapRedis;
import com.ecaray.ecms.entity.crm.CrmFields;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * com.ecaray.ecms.services.crm
 * Author ：zhxy
 * 2017/5/12 20:02
 * 说明：常量信息字段
 */
@Service
public class CrmFieldsService {
    @Autowired
    CrmFieldsMapper crmFieldsMapper;
    @Autowired
    private CrmFieldsMapRedis crmFieldsRedis;

   @Transactional
    public Result addFields(CrmFields crmFields) {
        String id = DataUtil.randomId();
        long curTime = System.currentTimeMillis();
        crmFields.setId(id);
        crmFields.setCode(id);
        crmFields.setAddTime(curTime);
        crmFieldsMapper.insertSelective(crmFields);
        return Result.success();
    }

    public Result updateFields(CrmFields crmFields) {
        if(StringUtils.isEmpty(crmFields.getId())){
            return Result.failed("更新失败!");
        }
        crmFieldsMapper.updateByPrimaryKeySelective(crmFields);
        return Result.success();
    }

    public List<CrmFields> selectFieldsList(String belongCode) {
        return crmFieldsMapper.selectFieldsListByBelong(belongCode);
    }

    @Transactional
    public Result updateFieldsBatch(List<CrmFields> listCrmFields) {
        List<CrmFields> listAdd = new ArrayList<CrmFields>();
        List<CrmFields> listUpd = new ArrayList<CrmFields>();
        Map<String,String > cacheMap = crmFieldsRedis.read();
        Long curTime = System.currentTimeMillis();
        for(CrmFields crmFields:listCrmFields){
            if(StringUtils.isEmpty(crmFields.getId())){
                String id = DataUtil.randomId();
                crmFields.setId(id);
                crmFields.setAddTime(curTime);
                listAdd.add(crmFields);
            }else{
                listUpd.add(crmFields);
            }
            cacheMap.put(crmFields.getId(),crmFields.getName());
        }
        //批量新增
        if(!listAdd.isEmpty()) {
            crmFieldsMapper.addFieldsBatch(listAdd);
        }
        //批量更新
        if(!listUpd.isEmpty()) {
            crmFieldsMapper.updateFieldsBatch(listUpd);
        }
        //更新缓存信息
        crmFieldsRedis.save(cacheMap);

        return Result.success();
    }
}
