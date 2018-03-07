package com.ecaray.ecms.entity.crm.Vo;

import com.ecaray.ecms.entity.crm.CrmClient;
import com.ecaray.ecms.entity.crm.CrmClientContacts;

import java.util.List;

/**
 * com.ecaray.ecms.entity.crm.Vo
 * Author ：zhxy
 * 2017/5/12 10:08
 * 说明：添加用户用：客户信息价+联系人列表
 */
public class CrmClientModel {
    private CrmClient crmClient;
    private List<CrmClientContacts> crmClientContactses;

    public CrmClient getCrmClient() {
        return crmClient;
    }

    public void setCrmClient(CrmClient crmClient) {
        this.crmClient = crmClient;
    }

    public List<CrmClientContacts> getCrmClientContactses() {
        return crmClientContactses;
    }

    public void setCrmClientContactses(List<CrmClientContacts> crmClientContactses) {
        this.crmClientContactses = crmClientContactses;
    }
}
