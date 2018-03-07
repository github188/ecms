package com.ecaray.ecms.services.common;

import com.ecaray.ecms.dao.mapper.sys.RegionMapper;
import com.ecaray.ecms.entity.sys.Area;
import com.ecaray.ecms.entity.sys.City;
import com.ecaray.ecms.entity.sys.Province;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * com.ecaray.imspmo.services.api
 * Author ：zhxy
 * 2017/4/3 15:25
 * 说明：TODO
 */
@Service
public class RegionService {

    @Autowired
    RegionMapper regionMapper;

    public List<Province> selectProvinces() {
        return regionMapper.selectProvinces();
    }

    public List<City> selectCityByProvinceId(String provinceId) {
        return regionMapper.selectCityByProvinceId(provinceId);
    }

    public List<Area> selectAreaByCityId(String cityId){
        return regionMapper.selctAreaByCityId(cityId);
    }

}
