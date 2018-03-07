package com.ecaray.ecms.entity.crm.Vo;

import java.util.List;

/**
 * com.ecaray.ecms.entity.crm.Vo
 * Author ：ecaray
 * 2017/6/15 17:17
 * 说明：TODO
 */
public class CrmClientDetailQuery {
    private String clientId;
    private List<String> keepers;

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public List<String> getKeepers() {
        return keepers;
    }

    public void setKeepers(List<String> keepers) {
        this.keepers = keepers;
    }
}
