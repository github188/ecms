package com.ecaray.ecms.dao.redis.crm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;
import org.springframework.util.StringUtils;

import java.util.Map;

/**
 * com.ecaray.ecms.dao.redis.crm
 * Author ：zhxy
 * 2017/5/13 14:37
 * 说明：CRM 常量服务类
 */
@Repository
public class CrmFieldsMapRedis {
    @Autowired
    private RedisTemplate<String,Map<String,String>> redisTemplate;

    public void save(Map<String ,String > map){
        ValueOperations<String, Map<String,String>> valueOper = redisTemplate.opsForValue();
        valueOper.set("oa:crm:fields:", map);
    }

    public Map<String ,String > read(){
        ValueOperations<String,Map<String,String >> valueOper = redisTemplate.opsForValue();
        return valueOper.get("oa:crm:fields:");
    }

    public String readById(String id){
        ValueOperations<String,Map<String,String >> valueOper = redisTemplate.opsForValue();
        if(StringUtils.isEmpty(id))
            return null;
        return valueOper.get("oa:crm:fields:").get(id);
    }

    public void delete(){
        ValueOperations<String,Map<String,String >>  valueOper = redisTemplate.opsForValue();
        RedisOperations<String,Map<String,String >>  RedisOperations  = valueOper.getOperations();
        RedisOperations.delete("oa:crm:fields:");
    }


}
