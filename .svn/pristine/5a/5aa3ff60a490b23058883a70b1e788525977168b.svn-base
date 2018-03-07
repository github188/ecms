package com.ecaray.ecms.controller.pmo;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * com.ecaray.authority.controller.processes
 * Author ：zhxy
 * 2017/4/4 1:56
 * 说明：TODO
 */
@RestController
@RequestMapping("test")
public class TestGetUserController {
    /*@RequestMapping(method = RequestMethod.GET)
    public JSONObject testUser(){
        Map<String, String> params = new HashMap<String, String>();
        params.put("pageNum","1");
        params.put("pageSize","10");
        String aaa = HttpClientsUtil.httpGet("http://127.0.0.1:8888/user/list","",params);
        JSONObject obj= JSON.parseObject(aaa);
        return obj;
    }*/

    public static void main(String[] args) {


            StringBuffer sb = new StringBuffer("<body>");
            sb.append("<p>")
                    .append("您好,有一个新的PMO项目需要您参与。</p>")
                    .append("<p>项目名称#proName#</p>")
                    .append("<p>营销中心#marktName#</p>")
                    .append("<p>所属区域#provinceName}-{cityName}-{areaName#</p>")
                    .append("<p>项目背景#proContents#</p>")
                    .append("<p>市场负责人#marketPerson#</p>")
                    .append("<p>项目经理#proManager#</p>")
                    .append("<p>项目成员#Participant#</p>");
        String aaa =  sb.toString();

        aaa = aaa.replace("#proName#","项目名称");





/*
        List<String> baseUserList =new ArrayList<String>();
        baseUserList.add("22138154459971");
        baseUserList.add("33138154459971");
        baseUserList.add("44138154459971");
        baseUserList.add("55138154459971");
        String userIds = "";
        int size = baseUserList.size();
        for(int i=0;i<size;i++){
            userIds+=baseUserList.get(i)+",";
        }
        Map<String,String> userMaps = new HashMap<String, String>();
        userIds = userIds.substring(0,userIds.length()-1);
        System.out.println(userIds);
        userMaps.put("userIds",userIds);
        String userResult = HttpClientsUtil.httpGet("http://127.0.0.1:8888/authority/user/contacts/list","",userMaps);
        JSONObject obj= JSON.parseObject(userResult);
        JSONArray ja = (JSONArray) obj.get("content");
            ja.size();
            Iterator<Object> it = ja.iterator();
            while (it.hasNext()) {
                JSONObject jb = (JSONObject) it.next();
                jb.get("email");
            }*/
        }




}




