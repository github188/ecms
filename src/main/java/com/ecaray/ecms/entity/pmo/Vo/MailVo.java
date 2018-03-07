package com.ecaray.ecms.entity.pmo.Vo;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * com.ecaray.owms.entity.Vo.OrderVo
 * Author ：zhxy
 * 2016/11/30 18:05
 * 说明：TODO
 */
public class MailVo {
    private String subject;
    private String mailKey;
    private Map<String,String> params;
    private List<String> receiver;

    public MailVo(String subject, String mailKey,List<String> receiver) {
        this.subject = subject;
        this.mailKey = mailKey;
        this.receiver = receiver;
    }
    public MailVo(String subject, String mailKey,String userId) {
    	List<String> list = new ArrayList<>();
    	list.add(userId);
    	this.subject = subject;
    	this.mailKey = mailKey;
    	this.receiver = list;
    }

    public List<String> getReceiver() {
        return receiver;
    }

    public void setReceiver(List<String> receiver) {
        this.receiver = receiver;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getMailKey() {
        return mailKey;
    }

    public void setMailKey(String mailKey) {
        this.mailKey = mailKey;
    }

    public Map<String, String> getParams() {
        return params;
    }

    public void setParams(Map<String, String> params) {
        this.params = params;
    }

}
