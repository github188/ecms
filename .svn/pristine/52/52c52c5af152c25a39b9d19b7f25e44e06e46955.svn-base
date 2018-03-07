package com.ecaray.ecms.services.common;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.ecaray.ecms.commons.utils.DateUtil;
import com.ecaray.ecms.dao.redis.crm.CacheUtils;
import com.ecaray.ecms.dao.redis.crm.CrmFieldsMapRedis;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.crm.CrmFields;
import com.ecaray.ecms.services.authority.UserService;
import com.ecaray.ecms.services.crm.CrmFieldsService;
import com.ecaray.ecms.services.cwa.CwaAttendanceService;
import com.ecaray.ecms.services.cwa.CwaReportService;

/**
 * com.ecaray.ecms.services.common
 * Author ：zhxy
 * 2017/5/13 18:40
 * 说明：TODO
 */
@Service
public class InitService {
    @Autowired
    CrmFieldsService crmFieldsService;
    @Autowired
    CrmFieldsMapRedis crmFieldsMapRedis;
    @Autowired
    CacheUtils cacheUtils;
    @Autowired
    CwaReportService cwaAttendanceReportService;
    @Autowired
    CwaAttendanceService cwaAttendanceService;
    @Autowired
    UserService userService;

    Logger logger = LoggerFactory.getLogger(InitService.class);

    public void init() throws Exception {
        initCrmConstants();
//        initUserAttendance();
    }
    
    /**
     * 说明：缓存Crm的常量信息
     */
    public void initCrmConstants(){
        List<CrmFields> list = crmFieldsService.selectFieldsList(null);
        if(list != null && !list.isEmpty()){
            Map<String,String> map = new HashMap<String, String>();
            for(CrmFields crmFields:list){
                if(!StringUtils.isEmpty(crmFields.getId())){
                    map.put(crmFields.getId(),crmFields.getName());
                }
            }
            crmFieldsMapRedis.save(map);
        }
        logger.info("crm 常量数据初始化完毕!");
    }
    /**
     * 说明：缓存Crm的常量信息
     * @throws Exception 
     */
    public void initUserAttendance() throws Exception{
    	List<User> userList = userService.selectAllUserList();
    	String date = DateUtil.format(DateUtil.nowTime() - 24 * 3600 * 1000);
    	cwaAttendanceService.valiAttendanceAndPunchCard(userList,date);
    }
}
