package com.ecaray.ecms.dao.redis.crm;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

@Repository
public class CacheUtils {
	 	@Autowired
	    private  RedisTemplate<String,Object> redisTemplate;
	    public   void set(String key,Object value){
	        ValueOperations<String,Object> valueOper = redisTemplate.opsForValue();
	        valueOper.set(key, value);
	    }
	    public  Object get(String key){
	        ValueOperations<String,Object> valueOper = redisTemplate.opsForValue();
	        return valueOper.get(key);
	    }
	    public  void remove(String key){
	    	ValueOperations<String,Object> valueOper = redisTemplate.opsForValue();
	    	RedisOperations<String,Object> RedisOperations  = valueOper.getOperations();
	        RedisOperations.delete(key);
	    }
}
