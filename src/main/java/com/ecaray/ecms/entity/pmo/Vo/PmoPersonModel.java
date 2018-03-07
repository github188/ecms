package com.ecaray.ecms.entity.pmo.Vo;

import com.ecaray.ecms.entity.pmo.PmoPerson;

import java.util.ArrayList;
import java.util.List;

/**
 * com.ecaray.imspmo.entity.Vo
 * Author ：zhxy
 * 2017/4/4 0:06
 * 说明：TODO
 */
public class PmoPersonModel {
    List<PmoPerson> pmoPersonList = new ArrayList<PmoPerson>();

    public PmoPersonModel(List<PmoPerson> pmoPersonList) {
        this.pmoPersonList = pmoPersonList;
    }

    public List<PmoPerson> getPmoPersonList() {
        return pmoPersonList;
    }

    public void setPmoPersonList(List<PmoPerson> pmoPersonList) {
        this.pmoPersonList = pmoPersonList;
    }
}
