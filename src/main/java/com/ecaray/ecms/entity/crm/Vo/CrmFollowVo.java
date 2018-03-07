package com.ecaray.ecms.entity.crm.Vo;

import com.ecaray.ecms.entity.crm.CrmFollow;

/**
 * com.ecaray.ecms.entity.crm.Vo
 * Author ：ecaray
 * 2017/6/9 15:05
 * 说明：添加评论统计
 */
public class CrmFollowVo extends CrmFollow {
    private Integer comCount = 0;

    @Override
    public Integer getComCount() {
        return comCount;
    }

    @Override
    public void setComCount(Integer comCount) {
        this.comCount = comCount;
    }
}
