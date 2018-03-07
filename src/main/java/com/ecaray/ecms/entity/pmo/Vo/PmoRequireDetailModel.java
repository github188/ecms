package com.ecaray.ecms.entity.pmo.Vo;

import com.ecaray.ecms.entity.pmo.PmoRequireTask;

import java.util.List;

/**
 * com.ecaray.imspmo.entity.Vo
 * Author ：zhxy
 * 2017/4/12 15:10
 * 说明：TODO
 */
public class PmoRequireDetailModel {
    PmoRequireDetailVo pmoRequireDetail;
    List<PmoRequireTask> pmoRequireTaskList ;

    public PmoRequireDetailVo getPmoRequireDetail() {
        return pmoRequireDetail;
    }

    public void setPmoRequireDetail(PmoRequireDetailVo pmoRequireDetail) {
        this.pmoRequireDetail = pmoRequireDetail;
    }

    public List<PmoRequireTask> getPmoRequireTaskList() {
        return pmoRequireTaskList;
    }

    public void setPmoRequireTaskList(List<PmoRequireTask> pmoRequireTaskList) {
        this.pmoRequireTaskList = pmoRequireTaskList;
    }
}
