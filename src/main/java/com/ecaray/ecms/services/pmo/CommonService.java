package com.ecaray.ecms.services.pmo;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.commons.utils.HttpClientsUtil;
import com.ecaray.ecms.dao.mapper.sys.SysConstantsMapper;
import com.ecaray.ecms.services.authority.DeptService;
import com.ecaray.ecms.services.authority.UserService;

/**
 * Author ：zhxy
 * 2017/4/6 14:53
 */
@Service
public class CommonService {
    @Value("${security.markets.url}")
    private String marketsUrl;
    @Value("${security.users.url}")
    private String usersUrl;
    @Value("${security.users.contacts.url}")
    private String userContactsUrl;
    @Autowired
    DeptService deptService;

    @Autowired
    UserService userService;
    @Autowired
    private SysConstantsMapper sysConstantsMapper;
    public Result selectMarkets(String token) {
//        String result =  HttpClientsUtil.httpGet(marketsUrl,token,new HashMap<String, String>());
        return deptService.selectDepsByParentId("14");
    }

    public JSONObject selectUserMenus(String token ){
//        String result = HttpClientsUtil.httpGet()
        return null;
    }

    public Result selectPomProjectStatus(String type){
        return Result.success().addObject(sysConstantsMapper.selectByType(type));
    }

    public Object selectUsers(String token,String nocheck) {
        Map<String,String> params = new HashMap<String, String>();
        params.put("pageNum","0");
        params.put("pageSize","0");
        return userService.selectUserTreeWithDept(nocheck);
        /*String aaa = HttpClientsUtil.httpGet(usersUrl+"/"+nocheck,token,params);
        JSONObject obj= JSON.parseObject(aaa);
        return obj;*/
    }

    public String[] selectUserConstantsById() {
        CommonService commonService = new CommonService();
        Map<String,String> params = new HashMap<String, String>();
        params.put("userIds","22,33,44");
        String[] resultArray = null;
        String contacts = HttpClientsUtil.httpGet("http://127.0.0.1:8888/authority/user/contacts/list","",params);
        JSONObject myJson = JSONObject.parseObject(contacts);
        return null;
    }

    public static void main(String[] args) {
//        CommonService commonService = new CommonService();
        Map<String,String> params = new HashMap<String, String>();
        String[] aa = new String[3];
        aa[0]="1";
        aa[1]="2";
        aa[2]="3";
        String.valueOf(aa);
        System.out.println(String.valueOf(aa));
        params.put("userIds","22,33,44");
        String[] resultArray = null;
//        String contacts = HttpClientsUtil.httpGet("http://127.0.0.1:8888/authority/user/contacts/list","",params);
//        JSONObject myJson = JSONObject.parseObject(contacts);
        /*if("success".equals(myJson.get("code"))){
            JSONArray userArrays =(JSONArray)myJson.get("content");
            int size = userArrays.size();
            resultArray = new String[size];
            for(int i=0;i<size;i++){
                resultArray[i] = ((JSONObject)userArrays.get(i)).get("email")+"";
            }
        }*/
        System.out.println(resultArray);
    }
}
