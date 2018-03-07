package com.ecaray.ecms.dao.mapper.sys;

import com.ecaray.ecms.entity.sys.Area;
import com.ecaray.ecms.entity.sys.City;
import com.ecaray.ecms.entity.sys.Province;

import java.util.List;

/**
 * com.ecaray.ecms.dao.mapper
 * Author ：zhxy
 * 2017/4/3 15:51
 * 说明：区域mapper
 */

public interface RegionMapper {
    /**
     * Author ：zhxy
     * 说明：选取省份
     */
    List<Province> selectProvinces();
    /**
     * Author ：zhxy
     * 说明：根据省份Id获取城市
     */
    List<City> selectCityByProvinceId(String provinceId);
    /**
     * Author ：zhxy
     * 说明：根据城市ID选取区域
     */
    List<Area> selctAreaByCityId(String cityId);
}
