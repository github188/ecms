package com.ecaray.ecms.entity.crm.Vo;

import com.ecaray.ecms.entity.crm.CrmOpp;
import com.ecaray.ecms.entity.crm.CrmOppContacts;

import java.util.List;

/**
 * com.ecaray.ecms.entity.crm.Vo
 * Author ：zhxy
 * 2017/5/12 18:03
 * 说明：TODO
 */
public class CrmOppModel {
    private CrmOpp crmOpp;
    private List<CrmOppContacts> crmOppContactsList;

    public CrmOpp getCrmOpp() {
        return crmOpp;
    }

    public void setCrmOpp(CrmOpp crmOpp) {
        this.crmOpp = crmOpp;
    }

    public List<CrmOppContacts> getCrmOppContactsList() {
        return crmOppContactsList;
    }

    public void setCrmOppContactsList(List<CrmOppContacts> crmOppContactsList) {
        this.crmOppContactsList = crmOppContactsList;
    }
}
