package com.ecaray.ecms.entity.pmo.Vo;

/**
 * com.ecaray.owms.entity.orders.OrderVo
 * Author ：zhxy
 * 2016/12/1 22:44
 * 说明：TODO
 */
public class  RegionVo {
    private String province;
    private String city;
    private String area;
    private String provinceName;
    private String cityName;
    private String areaName;

    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getArea() {
        return area;
    }

    public void setArea(String area) {
        this.area = area;
    }

    public String getProvinceName() {
        return provinceName;
    }

    public void setProvinceName(String provinceName) {
        this.provinceName = provinceName;
    }

    public String getCityName() {
        return cityName;
    }

    public void setCityName(String cityName) {
        this.cityName = cityName;
    }

    public String getAreaName() {
        return areaName;
    }

    public void setAreaName(String areaName) {
        this.areaName = areaName;
    }
}
