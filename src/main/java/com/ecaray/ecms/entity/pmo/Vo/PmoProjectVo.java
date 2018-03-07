package com.ecaray.ecms.entity.pmo.Vo;

import com.ecaray.ecms.entity.pmo.PmoPerson;
import com.ecaray.ecms.entity.pmo.PmoProject;

import java.util.List;

/**
 * com.ecaray.imspmo.entity.Vo
 * Author ：zhxy
 * 2017/4/3 15:21
 * 说明：TODO
 */
public class PmoProjectVo  extends PmoProject {
    private List<PmoPerson> pmoPersonList;

    public List<PmoPerson> getPmoPersonList() {
        return pmoPersonList;
    }

    public void setPmoPersonList(List<PmoPerson> pmoPersonList) {
        this.pmoPersonList = pmoPersonList;
    }
}
