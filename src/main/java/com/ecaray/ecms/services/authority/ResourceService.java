package com.ecaray.ecms.services.authority;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.ecaray.ecms.commons.constant.PageResult;
import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.commons.utils.DataUtil;
import com.ecaray.ecms.dao.mapper.authority.ResourceMapper;
import com.ecaray.ecms.entity.authority.Resource;
import com.ecaray.ecms.entity.authority.RoleResource;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.authority.Vo.ResourceQueryFilter;
import com.ecaray.ecms.entity.authority.Vo.ResourceQueryVo;
import com.ecaray.ecms.entity.authority.Vo.ResourceTreeVo;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

/**
 * com.ecaray.authority.services
 * Author ：zhxy
 * 2017/2/10 11:20
 * 说明：资源服务类
 */

@SuppressWarnings("ALL")
@Service
public class ResourceService {
    @Autowired
    private ResourceMapper resourceMapper;
    @Autowired
    private RoleResourceService roleResourceService;
    @Autowired
    private UserRoleService userRoleService;

    /**
     * Author ：zhxy
     * 说明：添加资源信息
     */
    public Result addResource(Resource resource){
        String rrId =  DataUtil.randomId();
        resource.setId(rrId);
        resource.setIsDelete(0);
        resource.setStatus(0);
        if(StringUtils.isEmpty(resource.getParentId())){
            resource.setParentId("0");
        }
        resourceMapper.insert(resource);
        RoleResource rr = new RoleResource();
        rr.setRoleId("1");
        rr.setResourceId(rrId);
        roleResourceService.addRoleResource(rr);
        return Result.success();
    }

    /**
     * Author ：zhxy
     * 说明：更新资源信息
     */
    public Result updateResource(Resource resource){
       if(DataUtil.isNullOrEmpty(resource.getId())){
           return Result.failed("id is null");
       }
        resourceMapper.updateByPrimaryKeySelective(resource);
        return Result.success();
    }


    /**
     * Author ：zhxy
     * 说明：删除资源信息 by id
     */
    public Result delResource(Resource resource){
        String id = resource.getId();
        if(DataUtil.isNullOrEmpty(id)){
            return Result.failed("id is null");
        }
        resourceMapper.deleteByPrimaryKey(id);
        return Result.success();
    }

    public Result selectResourceByAppId(String appId){
        if(DataUtil.isNullOrEmpty(appId)){
            return Result.failed("id is null");
        }
        resourceMapper.selectResourceByAppId(appId);
        return Result.success();
    }

    /**
     * Author ：zhxy
     * 说明：根据条件来查询
     */
    public PageResult selectResourcesFilter(ResourceQueryFilter resourceQueryFilter) {
//        String  type =resourceQueryFilter.getType();
        Page page  = PageHelper.startPage(0, 0);
//        resourceQueryFilter.setType(null);
        List<ResourceQueryVo> resources = resourceMapper.selectResourcesFilter(resourceQueryFilter);
        List<ResourceQueryVo> cacheResources = new ArrayList<ResourceQueryVo>();
        setResourceDegree(resources,cacheResources,"1",0);

        //根据查询条件去掉
        List<ResourceQueryVo> resultResources = new ArrayList<ResourceQueryVo>();
        int size = cacheResources.size();
        int pageNum = resourceQueryFilter.getPageNum();
        int pageSize = resourceQueryFilter.getPageSize();
        int pages = size%pageSize==0?size/pageSize:(size/pageSize)+1;
        int startIndex = (pageNum-1)*pageSize;
        for(int i=startIndex;i<startIndex+pageSize&&i<size;i++){
            resultResources.add(cacheResources.get(i));
        }
        PageResult pageResult = PageResult.success().addObject(resultResources);
        pageResult.setPageIndex(pageNum);
        pageResult.setPages(pages);
        pageResult.setTotals(size);
        return pageResult;
    }

    /**
     * Author ：zhxy
     * 说明：递归计算子节点的深度
     */
    public void setResourceDegree(List<ResourceQueryVo> resources,
                                  List<ResourceQueryVo> cacheResources,
                                  String parentId,
                                  int degree){
        for(ResourceQueryVo rqv : resources){
            if(parentId!=null&&!StringUtils.isEmpty(rqv.getParentId()) && parentId.equals(rqv.getParentId())){
                cacheResources.add(rqv);
                rqv.setDegree(degree);
                setResourceDegree(resources,cacheResources,rqv.getId(),degree+1);
            }
        }

    }


    public Result selectTreeResources(String pid) {
        List<ResourceTreeVo> resourceTrees = resourceMapper.selectTreeResources(pid);
        return Result.success().addObject(resourceTrees);
    }
    public Result selectTreeResourcesByUserId(String userId,String parentId) {
    	List<String> rolelist = userRoleService.getRoleIdListByUserId(userId);
    	List<String> roleResourcelist = selectResourceListByRoleList(rolelist);
    	Set<String> resourceList = new HashSet<>();
    	for (String id : rolelist){
    		Set<String> roleResourceList = resourceMapper.selectOneResourceByRoleId(id,parentId);
    		resourceList.addAll(roleResourceList);
    	}
    	List<ResourceTreeVo> resourceTree = new ArrayList<>();
    	for (String id : resourceList) {
			ResourceTreeVo vo = new ResourceTreeVo();
    		Resource r = resourceMapper.selectByPrimaryKey(id);
    		vo.setId(r.getId());
    		vo.setIcon(r.getIcon());
    		vo.setName(r.getName());
    		vo.setUrl(r.getUrl());
    		vo.setType(r.getType() + "");
    		List<ResourceTreeVo> tlist = resourceMapper.selectTreeResources(id);
    		List<ResourceTreeVo> clist = new ArrayList<>();
    		for (ResourceTreeVo v :tlist) {
    			if (roleResourcelist.contains(v.getId())) {
    				clist.add(v);
    			}
    		}
    		vo.setChildren(clist);
    		resourceTree.add(vo);
    	}
    	return Result.success().addObject(resourceTree);
    }

    private List<String> selectResourceListByRoleList(List<String> rolelist) {
		return resourceMapper.selectResourceListByRoleList(rolelist);
	}

	public Result selectResourceById(String resourceId) {
       ResourceQueryVo r = resourceMapper.selectDetailByPrimaryKey(resourceId);
        return Result.success().addObject(r);
    }

    public PageResult selectResourceByRoleId(String roleId,int pageNum,int pageSize){
        Page page = PageHelper.startPage(pageNum,pageSize);
        List<ResourceQueryVo> rs = resourceMapper.selectResourceByRoleId(roleId);
        return PageResult.success().addObject(rs).addPageInfo(page,pageNum);
    }

    public PageResult selectResourceByUserId(User user, String typeLevel,String resourceId) {
        List<ResourceQueryVo> rs = resourceMapper.selectResourceByUserId(user.getId(),typeLevel,resourceId);
        return PageResult.success().addObject(rs);
    }
}
