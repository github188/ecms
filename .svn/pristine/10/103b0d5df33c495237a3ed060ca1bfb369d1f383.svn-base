package com.ecaray.ecms.services.authority;

import com.ecaray.ecms.commons.constant.PageResult;
import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.commons.utils.DataUtil;
import com.ecaray.ecms.dao.mapper.authority.ApplicationMapper;
import com.ecaray.ecms.entity.authority.Application;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * com.ecaray.authority.services
 * Author ：zhxy
 * 2017/1/14 15:41
 * 说明：应用
 */
@SuppressWarnings("ALL")
@Service
public class AppService {
    @Autowired
    private ApplicationMapper appMapper;
    /**
     * Author ：zhxy
     * 说明：选取在用的apps
     */
    public PageResult selectAppList(int pageNum, int pageSize) {
        Page page   = PageHelper.startPage(pageNum,pageSize);
        return PageResult.success().addObject(appMapper.selectApps()).addPageInfo(page,pageNum);
    }

    /**
     * Author ：zhxy
     * 说明：添加应用
     */
    public Result addApp(Application application) {
        application.setId(DataUtil.uuidData());
        application.setCreateTime(System.currentTimeMillis()+"");
        appMapper.insert(application);
        return Result.success();
    }

    /**
     * Author ：zhxy
     * 说明：添加应用信息
     */
    public Result delApp(String id){
        Application app  = new Application();
        app.setId(id);
        app.setIsDelete(1);
        appMapper.updateByPrimaryKeySelective(app);
        return Result.success();
    }

    /**
     * Author ：zhxy
     * 说明：更新应用信息
     */
    public Result updateApp(Application application) {
        if(DataUtil.isNullOrEmpty(application.getId())){
            return Result.failed("id not found");
        }
        appMapper.updateByPrimaryKeySelective(application);
        return Result.success();
    }

    /**
     * Author ：zhxy
     * 说明：根据id获取数据
     */
    public Result selectAppByKey(String id) {
        if(DataUtil.isNullOrEmpty(id))
            return Result.failed("id is null");
        return Result.success().addObject(appMapper.selectByPrimaryKey(id));
    }

    public Result selectUserApps(String id) {
        if(DataUtil.isNullOrEmpty(id)){
            return Result.failed("id is null");
        }
        return Result.success().addObject(appMapper.selectUserApps(id));
    }
}
