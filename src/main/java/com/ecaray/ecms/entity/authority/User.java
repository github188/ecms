package com.ecaray.ecms.entity.authority;

import com.ecaray.ecms.commons.utils.ExcelRows;

public class User {
    private String id;

    private String username;//用户名字

    private String password;//密码

    @ExcelRows(index = 0,remark = "姓名")
    private String realname;//真实姓名

    @ExcelRows(index = 1,remark = "工号")
    private String usercode;//工号

    @ExcelRows(index = 2,remark = "岗位名称")
    private String post;//岗位信息

    private String idcard;// 身份证号

    @ExcelRows(index = 3,remark = "手机")
    private String phone;//电话号码

    @ExcelRows(index = 4,remark = "座机电话")
    private String tel;//座机号码

    @ExcelRows(index = 5,remark = "邮箱")
    private String email;//邮件

    private Integer sex;//性别 1男 2 女

    private String professLevel;//专业级别

    private String manageLevel;//管理级别

    private String depId;//科室id
    
    private String depName;//科室id

    private String directLeader;//直接上级

    private String address;

    private String headPic;

    private int isLeave;

    private Long createTime;

    private Long updateTime;

    private String cwaName;
    
    private Integer isDelete;//是否逻辑删除0否 1是

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password == null ? null : password.trim();
    }

    public String getUsercode() {
        return usercode;
    }

    public void setUsercode(String usercode) {
        this.usercode = usercode == null ? null : usercode.trim();
    }

    public String getRealname() {
        return realname;
    }

    public void setRealname(String realname) {
        this.realname = realname == null ? null : realname.trim();
    }

    public String getIdcard() {
        return idcard;
    }

    public void setIdcard(String idcard) {
        this.idcard = idcard == null ? null : idcard.trim();
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone == null ? null : phone.trim();
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email == null ? null : email.trim();
    }

    public Integer getSex() {
        return sex;
    }

    public void setSex(Integer sex) {
        this.sex = sex;
    }

    public String getProfessLevel() {
        return professLevel;
    }

    public void setProfessLevel(String professLevel) {
        this.professLevel = professLevel == null ? null : professLevel.trim();
    }

    public String getManageLevel() {
        return manageLevel;
    }

    public void setManageLevel(String manageLevel) {
        this.manageLevel = manageLevel == null ? null : manageLevel.trim();
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getPost() {
        return post;
    }

    public void setPost(String post) {
        this.post = post;
    }

    public String getDepId() {
        return depId;
    }

    public void setDepId(String depId) {
        this.depId = depId == null ? null : depId.trim();
    }

    public String getDirectLeader() {
        return directLeader;
    }

    public void setDirectLeader(String directLeader) {
        this.directLeader = directLeader == null ? null : directLeader.trim();
    }

    public Long getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Long createTime) {
        this.createTime = createTime;
    }

    public Long getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Long updateTime) {
        this.updateTime = updateTime;
    }

    public String getAddress() {
        return address;
    }

    public int getIsLeave() {
        return isLeave;
    }

    public void setIsLeave(int isLeave) {
        this.isLeave = isLeave;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getHeadPic() {
        return headPic;
    }

    public void setHeadPic(String headPic) {
        this.headPic = headPic;
    }

    public Integer getIsDelete() {
        return isDelete;
    }

    public void setIsDelete(Integer isDelete) {
        this.isDelete = isDelete;
    }

    public String getDepName() {
		return depName;
	}

	public void setDepName(String depName) {
		this.depName = depName;
	}

	public String getCwaName() {
		return cwaName;
	}

	public void setCwaName(String cwaName) {
		this.cwaName = cwaName;
	}

	@Override
    public String toString() {
        return "User{" +
                "id='" + id + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", usercode='" + usercode + '\'' +
                ", realname='" + realname + '\'' +
                ", idcard='" + idcard + '\'' +
                ", phone='" + phone + '\'' +
                ", tel='" + tel + '\'' +
                ", email='" + email + '\'' +
                ", sex=" + sex +
                ", professLevel='" + professLevel + '\'' +
                ", manageLevel='" + manageLevel + '\'' +
                ", depId='" + depId + '\'' +
                ", post='" + post + '\'' +
                ", directLeader='" + directLeader + '\'' +
                ", address='" + address + '\'' +
                ", isLeave=" + isLeave +
                ", createTime=" + createTime +
                ", updateTime=" + updateTime +
                ", isDelete=" + isDelete +
                '}';
    }
}