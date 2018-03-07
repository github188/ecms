package com.ecaray.ecms.services.authority;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecaray.ecms.commons.constant.Result;
import com.ecaray.ecms.commons.utils.DataUtil;
import com.ecaray.ecms.commons.utils.StrUtils;
import com.ecaray.ecms.dao.mapper.authority.DeptMapper;
import com.ecaray.ecms.dao.mapper.cwa.CwaDeptAdminMapper;
import com.ecaray.ecms.entity.authority.Dept;
import com.ecaray.ecms.entity.authority.User;
import com.ecaray.ecms.entity.authority.Vo.DeptTreeVo;
import com.ecaray.ecms.entity.cwa.CwaDeptAdmin;

/**
 * com.ecaray.authority.services
 * Author ：zhxy
 * 2017/2/8 10:36
 * 说明：TODO
 */

@SuppressWarnings("ALL")
@Service
public class DeptService {
    @Autowired
    private DeptMapper deptMapper;
    
    @Autowired
    private CwaDeptAdminMapper cwaDeptAdminMapper;
    
    @Autowired
    private UserService userService;

    /**
     * Author ：zhxy
     * 说明：添加部门（组）
     */
    public Result addDept(Dept dept){
        dept.setId(Long.parseLong(DataUtil.randomId()));
        deptMapper.insertSelective(dept);
        return Result.success();
    }


    /**
     * Author ：zhxy
     * 说明：更新部门信息
     */
    public Result updateDept(Dept dept){
        if(dept.getId()<1){
            return Result.failed("id is null");
        }
        deptMapper.updateByPrimaryKeySelective(dept);
        return Result.success();
    }

    /**
     * Author ：zhxy
     * 说明：删除部门信息
     */
    public Result deleteDept(long id){
        if(id<1) {
            return Result.failed("id is null");
        }else if(id==1){
            return Result.failed("connot delete the root！");
        }
        List<DeptTreeVo> deps =  deptMapper.selectDeptTreeList(id);
        List<String> depIds = new ArrayList<String>();
        depIds =  buildTreeList(deps, depIds,0);
        deptMapper.deleteDeptsBatch(depIds);
        return Result.success();
    }

    public Result selectDepsByParentId(String pid) {
        List<Dept> deps =  deptMapper.selectDeptByParentId(pid);
        return  Result.success().addObject(deps);
    }

    public Result selectDeptTreeList() {
    	long id = 1l;
        List<DeptTreeVo> deps =  selectDeptTreeList(id);
        return Result.success().addObject(deps);
    }
    public List<DeptTreeVo> selectDeptTreeListById(long id) {
        return  selectDeptTreeList(id);
    }

    public List<DeptTreeVo> selectDeptTreeList(long id) {
		return deptMapper.selectDeptTreeList(id);
	}
    public List<String> getDeptChildList(List<String> args, List<DeptTreeVo> tree) {
		for (DeptTreeVo c : tree) {
			args.add(c.getId());
			if (c.getChildren() != null) {
				getDeptChildList(args, c.getChildren());
			}
		}
		return args;
	}
    public List<String> getDepChildIdList(String depId) {
    	List<String> ids = new ArrayList<String>();
    	List<DeptTreeVo> list = selectDeptTreeList(Long.parseLong(depId));
    	return getDeptChildList(ids,list);
    }
    
	public Result selectDeptDetailById(long depId) {
        Dept dept = deptMapper.selectDetailByPrimaryKey(depId);
        return Result.success().addObject(dept);
    }
	public String selectDeptNameById(String depId) {
		long id = Long.parseLong(depId);
		Dept dept = deptMapper.selectDetailByPrimaryKey(id);
		return dept.getName();
	}

    public List<String> buildTreeList(List<DeptTreeVo> depts, List<String> deptConver,int degree){
        for(DeptTreeVo deptVo:depts){
            List<DeptTreeVo> childrens = deptVo.getChildren();
            if(childrens.size()<1){
                deptVo.setDegree(degree);
                deptConver.add(deptVo.getId());
            }else{
                deptConver.add(deptVo.getId());
                buildTreeList(childrens,deptConver,degree+1);
            }
        }
        return deptConver;
    }

    /**
     * 查询可以配置考勤管理员的部门
     */
    public List<CwaDeptAdmin> getAttendanceDept(){
    	List<Dept> list = deptMapper.selectAttendanceDept();
    	List<CwaDeptAdmin> cwaList = new ArrayList<CwaDeptAdmin>();
    	for(Dept dep : list) {
    		long depId = dep.getId();
    		if(1 == depId) {
    			dep.setName("总考勤管理员");
    		}
    		CwaDeptAdmin cwaDeptAdmin = cwaDeptAdminMapper.selectByPrimaryDepId(depId + "");
    		if(cwaDeptAdmin == null) {
    			cwaDeptAdmin = new CwaDeptAdmin();
    			cwaDeptAdmin.setDepId(depId + "");
    		}
    		cwaDeptAdmin.setDepName(dep.getName());
    		String userId = cwaDeptAdmin.getUserId();
    		if(StrUtils.isNotNull(userId)) {
    			User user = userService.getUserById(userId);
    			cwaDeptAdmin.setUserName(user.getRealname());
    		}
    		cwaList.add(cwaDeptAdmin);
    	}
    	return cwaList;
    }

    /**
     * 获取一级部门
     */
	public Dept getOneLevalDep(long depId) {
		Dept dep = deptMapper.selectByPrimaryKey(depId);
		if(dep.getParentId() == 1){
			return dep;
		} else{
			return getOneLevalDep(dep.getParentId());
		}
	}
	
	public Dept getOneLevalDep(String depId) {
		return getOneLevalDep(Long.parseLong(depId));
	}
	public List<Dept> getDeptListByParentId(String parentId) {
		return deptMapper.getDeptListByParentId(parentId);
	}
	
	public String getAllDept(StringBuffer str,long depId) {
		Dept dep = deptMapper.selectByPrimaryKey(depId);
		if(dep == null){
			return "";
		}
		if(dep.getId() != 1){
			str.append(dep.getName() + "-");
			return getAllDept(str,dep.getParentId());
		} 
		String s = str.toString();
		return s.substring(0,s.length() - 1);
	}
	
	public List<String> getdepIdByLeaderId(String userId) {
		return deptMapper.selectdepIdByLeaderId(userId);
	}


	public List<String> getDepLeaderList() {
		return deptMapper.selectDepLeaderList();
	}
	
	public String getCompeletName(String depId) {
		return getAllDept(new StringBuffer(""), Long.parseLong(depId));
	}

	public String selectDeptByName(String parentName) {
		return deptMapper.selectDeptByName(parentName);
	}
	public Dept selectDeptByNameAndParentName(String name,String parentName) {
		return deptMapper.selectDeptByNameAndPName(name,parentName);
	}


	public String selectDeptByNameAndGName(String parentName,String GName) {
		return deptMapper.selectDeptByNameAndGName(parentName,GName);
	}
	
	

/*
    public void buildTree(List<DeptTreeVo> depts,String pid) {
        for (DeptTreeVo deptVo : depts) {
           if(deptVo.getpId() ==pid){
               //depVO set children;
               //depts.getChildRen;
               buildTree(depts,deptVo.getId());
           }else{
               //生成这个树
           }

        }301 循环301*301
    }*/
}
