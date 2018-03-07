package com.ecaray.ecms.dao.redis.crm;

import com.ecaray.ecms.entity.crm.CrmFields;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

/**
 * com.ecaray.ecms.dao.redis.crm
 * Author ：zhxy
 * 2017/5/12 21:31
 * 说明：常量数据的redis缓存
 */

@Repository
public class CrmFieldsRedis {
    @Autowired
    private RedisTemplate<String,CrmFields> redisTemplate;

    public void save(CrmFields crmFields){
        ValueOperations<String, CrmFields> valueOper = redisTemplate.opsForValue();
        valueOper.set("oa:crm:"+crmFields.getId(), crmFields);
    }

    public CrmFields read(String id){
        ValueOperations<String, CrmFields> valueOper = redisTemplate.opsForValue();
        return valueOper.get("oa:crm:"+id);
    }

    public void delete(String id){
        ValueOperations<String, CrmFields> valueOper = redisTemplate.opsForValue();
        RedisOperations<String,CrmFields> RedisOperations  = valueOper.getOperations();
        RedisOperations.delete("oa:crm:"+id);
    }

}
