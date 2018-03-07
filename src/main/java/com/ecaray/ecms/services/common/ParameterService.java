package com.ecaray.ecms.services.common;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ecaray.ecms.commons.utils.ChineseCharToEn;
import com.ecaray.ecms.commons.utils.DataUtil;
import com.ecaray.ecms.commons.utils.DateUtil;
import com.ecaray.ecms.commons.utils.ParaMap;
import com.ecaray.ecms.commons.utils.StrUtils;
import com.ecaray.ecms.dao.mapper.process.SysParameterMapper;
import com.ecaray.ecms.entity.process.SysParameter;
import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;

@Service
public class ParameterService {
	
	@Autowired
	SysParameterMapper sysParameterMapper;
	
	/**
	 * 查询字段
	 * @param param
	 * @return
	 */
	public ParaMap getParameterList(SysParameter param) {
		param.setIsvalid(1);
		Page<?> page = PageHelper.startPage(param.getPageNum(),param.getPageSize());
		List<SysParameter> list = sysParameterMapper.selectParameterList(param);
		return ParaMap.getPageHelperMap(list, page);
	}
	
	public List<SysParameter> getLeaveTypeList(){
		SysParameter param = new SysParameter();
		param.setCode("cwa_leave_type");
		List<SysParameter> list = sysParameterMapper.selectParameterList(param);
		List<SysParameter> leaveList = new ArrayList<>();
		for (SysParameter s :list) {
			int v = Integer.parseInt(s.getValue());
			if (v > 3 && v < 9 && v != 8) {
				leaveList.add(s);
			}
			if (v > 10) {
				leaveList.add(s);
			}
		}
		return leaveList;
	}
	public String getName(String code,String value) {
		return sysParameterMapper.selectParameterNameByValue(code,value);

	}
	
	/**
	 * 更新字段信息
	 * @param param
	 * @return
	 */
	public int updateParameter(SysParameter param) {
		return sysParameterMapper.updateByPrimaryKeySelective(param);
	}
	
	public boolean hasTheName(String id,String code,String name){
		if(sysParameterMapper.hasTheName( id,code, name) == 0) {
			return true;
		}
		return false;
	}
	public boolean hasTheName(SysParameter sys){
		String code = sys.getCode();
		String name = sys.getName();
		String id = sys.getId();
		return hasTheName(id,code,name);
	}
	/**
	 * 添加字段属性
	 * @param param
	 * @return
	 */
	public int addParameter(SysParameter param) {
		String code = param.getCode();
		String name = param.getName();
		if(!hasTheName(null,code, name)){
			return 0;
		}
		long now = DateUtil.nowTime();
		param.setAddTime(now);
		param.setUpdateTime(now);
		if(StrUtils.isNull(param.getId())){
			String id = DataUtil.uuidData();
			param.setId(id);
		}
		param.setIsvalid(1);
		if("department".equals(code)){
			param.setValue(ChineseCharToEn.getAllFirstLetter(name));
		}else {
			int value = Integer.parseInt(getMaxValueByCode(code));
			if("ctm_attr".equals(code)){
				String val = String.format("%03d", value + 1);
				param.setValue(val);
			}else{
				value = value + 1;
				param.setValue(value + "");
			}
		}
		return sysParameterMapper.insertSelective(param);
	}

	/**
	 * 获取某个参数最大的value值
	 */
	public String getMaxValueByCode(String code) {
		return sysParameterMapper.getMaxValueByCode(code);
	}
}
