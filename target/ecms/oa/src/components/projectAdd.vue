<template>
  <div>
    <!--添加项目 begin-->
    <el-dialog title="创建项目" :visible.sync="projectModal" :modal="projectModal" size="small" :modal-append-to-body="showBody">
      <el-form ref="projectForm" :model="form" :rules="rules" label-width="110px" label-position="right">
        <el-form-item label="项目名称：" prop="proName">
          <el-input v-model="form.proName"></el-input>
        </el-form-item>
        <el-form-item label="项目描述：" prop="proContent">
          <el-input :autosize="{ minRows: 6, maxRows: 12}" type="textarea" v-model="form.proContent"></el-input>
        </el-form-item>
        <el-form-item label="项目图标：" prop="proLogo" class="pro-logo">
          <el-upload ref="uploadLogo" class="avatar-uploader" :action="uploadUrl" accept="image/jpeg,image/png,image/jpg" :show-file-list="false" :on-change="beforeAvatarUpload" :on-success="uploadSuccess">
            <div>
              <img v-if="choosedLogoUrl" :src="choosedLogoUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="btnCancel">取 消</el-button>
        <el-button type="primary" @click="toChoosePerson">确 定</el-button>
      </div>
    </el-dialog>
    <!--添加项目 end-->

    <!--选择成员 begin-->
    <el-dialog title="添加项目成员" :visible.sync="personModal" size="tiny" :modal-append-to-body="showBody" class="person-panel" :before-close="resetPersonDialog" v-loading="loading">
      <el-tabs v-model="activeName" @tab-click="addPersonClick">
        <el-tab-pane label="导入公司成员" name="exportPerson">
          <div class="search-block">
            <span>请输入公司已有成员昵称</span>
            <div class="search-input" @click="searchInputClick">
              <el-tag v-for="tag in checkList" :key="tag" :closable="false" :close-transition="false" @close.prevent.stop="removeTags(tag)">{{tag}}
              </el-tag>
              <el-input class="input-new-tag txt-addnew" v-model="inputValue" ref="saveTagInput" size="mini" @input.native="keyupSearch">
              </el-input>
            </div>
            <div class="el-dropdown-menu confirm-block" v-if="isShowDropDown">
              <span v-for="(item,index) in matchList" :key="index" class="el-dropdown-menu__item" @click.prevent.stop="chooseIt(item)">{{item.loginname}}&nbsp;({{item.username}})</span>
            </div>
          </div>
          <div class="person-block">
            <span class="the-title">选择成员</span>
            <el-checkbox-group v-model="checkList" @change="checkeBoxChange">
              <el-row v-for="(item,index) in personList" :key="index">
                <el-col :span="2">
                  <span class="icon-surname">{{item.username | getChar}}</span>
                </el-col>
                <el-col :span="22">
                  <el-checkbox :label="item.loginname+'  ('+item.username+')'" :disabled="item.isadd==1" @change="e=>checkSingleFromAll(e,item)"></el-checkbox>
                </el-col>
              </el-row>
            </el-checkbox-group>
            <el-button type="success" class="btn-import" @click.prevent="addAll">导入成员</el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="从已有项目复制" name="copyPerson">
          <div class="copy-block">
            <el-form ref="form" :model="form" label-width="115px" label-position="left">
              <el-form-item label="选择项目">
                <el-select v-model="projectSelected" filterable placeholder="请选择项目" @change="getSelectedPro">
                  <el-option v-for="item in proList" :key="item.projectid" :label="item.projectname" :value="item.projectid">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="复制的用户组">
                <!--<el-checkbox-group v-model="checkList">
                                                                                                  <el-checkbox v-for="item in groupList" :key="item" :label="item"></el-checkbox>
                                                                                                </el-checkbox-group>-->
                <!--<el-checkbox v-model="checkAll" ref=""
                                                                                                             @change="checkGroupFromCopy" v-for="item in groupList"
                                                                                                             :key="item">{{item}}
                                                                                                </el-checkbox>
                                                                                                <div style="margin: 15px 0;"></div>
                                                                                                <el-checkbox-group v-model="copyList" @change="checkSingleFromGroupCopy">
                                                                                                  <el-checkbox v-for="item in cities" :label="item.username" :key="item.userid" @change="e=>checkSingleFromCopy(e,item)">{{item.username}}</el-checkbox>
                                                                                                </el-checkbox-group>-->

                <el-checkbox :indeterminate="isShowManagerDeterminate" v-model="checkManagerAll" @change="checkManagerAllChange" :disabled="isAbled"></el-checkbox>
                <span class="chk-text el-checkbox__label" @click="toggleManagerGroup">管理员</span>
                &nbsp;&nbsp;&nbsp;
                <el-checkbox :indeterminate="isShowDeterminate" v-model="checkAll" @change="checkAllChange" :disabled="isAbled"></el-checkbox>
                <span class="chk-text el-checkbox__label" @click="toggleGroup">普通成员</span>
                <el-checkbox-group v-model="checkedManagerTeam" @change="managerTeamChange" v-if="showManagerSub">
                  <el-checkbox v-for="(item,index) in managerList" :label="item.loginname+'  ('+item.username+')'" :key="index" @change="e=>checkSingleFromManager(e,item)"></el-checkbox>
                </el-checkbox-group>

                <el-checkbox-group v-model="checkedTeam" @change="teamChange" v-if="showSub">
                  <el-checkbox v-for="(item,index) in commonList" :label="item.loginname+'  ('+item.username+')'" :key="index" @change="e=>checkSingleFromCommon(e,item)"></el-checkbox>
                </el-checkbox-group>

              </el-form-item>
            </el-form>
            <el-button type="success" class="btn-copy" @click.prevent="copyPersonToCreatePro">复制</el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </el-dialog>
    <!--选择成员 end-->
  </div>
</template>

<style scoped>
.person-panel {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.search-block {
  padding: 10px 20px 22px 20px;
  border-bottom: 1px solid #dfe6ec;
}

.search-block > span {
  margin-bottom: 8px;
  display: inline-block;
}

.person-block {
  padding: 15px 0 15px 20px;
  min-height: 380px;
  position: relative;
}

.the-title {
  display: inline-block;
  margin-bottom: 15px;
}

.icon-surname {
  display: inline-block;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 100%;
  color: #01cd78;
  background-color: #e8fff6;
  font-size: 14px;
  font-weight: bold;
}

.btn-import {
  margin-top: 10px;
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.copy-block {
  padding: 10px 20px 22px 20px;
  min-height: 260px;
  position: relative;
}

.btn-copy {
  width: 90px;
  position: absolute;
  bottom: 20px;
  right: 20px;
}

.search-input {
  padding: 5px;
  font-size: 14px;
  line-height: 28px;
  cursor: pointer;
  min-height: 85px;
  border: 1px solid #dfe6ec;
}

.search-input .el-tag {
  margin-right: 5px;
}
</style>
<style scoped>
.txt-addnew {
  width: 81px;
  line-height: 24px;
  font-size: 14px;
}

.btn-addnew {
  border: 0;
}

.search-block {
  position: relative;
}

.confirm-block {
  width: 240px;
  position: absolute;
  top: 82%;
  left: 32%;
  border: 1px solid #999;
  padding: 3px 0;
}

.confirm-block span {
  display: block;
  line-height: 30px;
}

.confirm-block span.active {
  background-color: #01cd78;
}
</style>

<style>
.pro-logo .avatar-uploader .el-upload > div {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.pro-logo .avatar-uploader .el-upload > div:hover {
  border-color: #20a0ff;
}

.pro-logo .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  text-align: center;
}

.pro-logo .avatar {
  width: 150px;
  height: 150px;
  display: block;
}

.person-panel .el-dialog--tiny {
  width: 35%;
}

.person-panel .el-dialog__header {
  border-bottom: 0;
  margin: 0;
  padding-left: 20px;
  background-color: #f1f1f1;
}

.person-panel .el-dialog__body {
  padding: 0;
}

.person-panel .el-tabs__header {
  border-bottom: 0;
  background-color: #f2f2f2;
}

.person-panel .el-tabs__nav-scroll {
  margin: 0 auto;
  width: 280px;
}

.person-panel .el-tabs__active-bar {
  background-color: #05d181;
}

.person-block .el-row {
  margin: 8px 0;
}

.person-block .el-checkbox-group {
  max-height: 260px;
  overflow: auto;
  padding-right: 20px;
}

.person-block .el-checkbox {
  width: 100%;
  overflow: hidden;
  padding: 6px 0 0px 0;
}

.person-block .el-checkbox__label {
  float: left;
}

.person-block .el-checkbox__input {
  float: right;
}

.search-input .el-input__inner:hover,
.search-input .el-select .search-input .el-input__inner:focus,
.search-input .el-select:hover .el-input__inner {
  border: 0;
}

.search-input .el-input--mini .el-input__inner {
  height: 24px;
  line-height: 24px;
  font-size: 14px;
  border: 0;
  background-color: transparent;
}

.chk-text.el-checkbox__label {
  cursor: pointer;
  padding-left: 0;
}
</style>
<style scoped>
/*设置滚动条样式*/
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  /* 滚动条的滑轨背景颜色 */
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  -webkit-border-radius: 10px;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  /* 滑块颜色 */
  -webkit-border-radius: 10px;
  border-radius: 10px;
  background: #ccc; /*#787878*/ /*#01cd78*/
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5); /*rgba(1,205,120,0.5)*/
}

::-webkit-scrollbar-thumb:hover {
  -moz-appearance: none !important;
  background-color: #787878 !important;
}
</style>

<script>
import config from "@/utils/config";
import { eventBus } from "@/pages/project/eventBus";
export default {
  props: ["title"],
  data() {
    return {
      projectModal: false,
      personModal: false,
      showBody: true,
      form: {
        proId: "", //项目id
        proName: "", //项目名称
        proContent: "", //项目背景
        proImg: "", //项目图片
        proPersonList: [], //用于导入tab选的人
        copyPMList: [], //用于存放copy面板里选中的管理员
        copyPCList: [], //用于存放copy面板里选中的普通成员
      },
      uploadUrl: "http://" + config.appHost + config.appRoot + "/data?" + "module=common&service=File&method=upLoadImg" + "&type=UserImg",
      choosedLogoUrl: "",
      rules: {
        proName: {
          validator: this.checkProjectName,
          trigger: "blur",
        },
        proContent: {
          required: true,
          message: "项目描述不能为空!",
          trigger: "blur",
        },
      },
      activeName: "exportPerson",
      proList: [],
      projectSelected: "",
      checkList: [],
      searchPerson: "",
      personList: [],
      personSource: "", //人员tab选择的来源：有导入、复制按钮之分，表明从哪个tab选的成员。

      isAbled: true,
      showManagerSub: false,
      showSub: false,

      checkManagerAll: false,
      checkedManagerTeam: [] /*['上海1', '北京1']*/,
      managerList: [] /* ['上海1', '北京1', '广州1', '深圳1']*/,
      isShowManagerDeterminate: false,

      checkAll: false,
      checkedTeam: [] /*['上海2', '北京2']*/,
      commonList: [] /* ['上海2', '北京2', '广州2', '深圳2']*/,
      isShowDeterminate: false,

      //      groupList: ['管理员', '普通成员'],
      inputValue: "",
      isShowDropDown: false,
      matchList: [],
      proIdOfAddPerson: "", //当前要添加成员的项目id，“项目设置-成员与权限-添加成员”
      loading: false,
    };
  },
  filters: {
    getChar: function(str) {
      return str.substring(0, 1);
    },
  },
  methods: {
    checkManagerAllChange(event) {
      let managerList = this.managerList;
      if (event.target.checked) {
        this.checkedManagerTeam = [];
        this.form.copyPMList = [];
        for (let i in managerList) {
          this.checkedManagerTeam.push(managerList[i].loginname + "  (" + managerList[i].username + ")");
          this.form.copyPMList.push(managerList[i].userid); //存储copy面板里的已选人员
        }
      } else {
        this.checkedManagerTeam = [];
        this.form.copyPMList = [];
      }
      this.isShowManagerDeterminate = false;
      console.log(this.form.copyPMList);
    },
    managerTeamChange(value) {},
    checkSingleFromManager(e, item) {
      //点击管理员组里的单个复选框
      let copyPMList = this.form.copyPMList;
      if (e.path[0].checked) {
        copyPMList.push(item.userid); //放入选择的项目成员列表
      } else {
        var index = copyPMList.indexOf(item.userid);
        if (index > -1) {
          copyPMList.splice(index, 1);
        }
      }
      this.checkManagerAll = copyPMList.length === this.managerList.length;
      this.isShowManagerDeterminate = copyPMList.length > 0 && copyPMList.length < this.managerList.length;
    },
    toggleManagerGroup() {
      //显示管理员组，隐藏普通成员组
      this.showManagerSub = true;
      this.showSub = false;
    },

    checkAllChange(event) {
      let commonList = this.commonList;
      if (event.target.checked) {
        this.checkedTeam = [];
        this.form.copyPCList = [];
        for (let i in commonList) {
          this.checkedTeam.push(commonList[i].loginname + "  (" + commonList[i].username + ")");
          this.form.copyPCList.push(commonList[i].userid); //存储copy面板里的已选人员
        }
      } else {
        this.checkedTeam = [];
        this.form.copyPCList = [];
      }
      this.isShowDeterminate = false;
    },
    teamChange(value) {},
    checkSingleFromCommon(e, item) {
      //点击普通成员组里的单个复选框
      let copyPCList = this.form.copyPCList;
      if (e.path[0].checked) {
        copyPCList.push(item.userid); //放入选择的项目成员列表
      } else {
        var index = copyPCList.indexOf(item.userid);
        if (index > -1) {
          copyPCList.splice(index, 1);
        }
      }
      this.checkAll = copyPCList.length === this.commonList.length;
      this.isShowDeterminate = copyPCList.length > 0 && copyPCList.length < this.commonList.length;
    },
    toggleGroup() {
      //隐藏管理员组，显示普通成员组
      this.showManagerSub = false;
      this.showSub = true;
    },

    openProjectModal() {
      this.projectModal = true;
      this.resetForm("projectForm");
    },
    btnCancel() {
      this.projectModal = false;
      this.choosedLogoUrl = ""; //清空图片url
    },
    resetPersonDialog(done) {
      //重置选人员的dialog状态
      this.isShowDropDown = false; //隐藏搜索结果下拉
      this.inputValue = "";
      this.activeName = "exportPerson"; //重置成导入成员Tab页
      this.checkList.splice(0, this.checkList.length); //清空人员多选
      this.form.copyPMList = [];
      this.form.copyPCList = [];
      done && done();
    },
    checkProjectName(rule, value, callback) {
      if (value === "") {
        callback(new Error("项目名称不能为空!"));
      } else {
        let theFetch = new fetch("pm", "ProjectManager", "checkProjectName");
        theFetch.projectname = value;
        theFetch.success = function(data) {
          if (data.state == 1) {
            //已存在
            if (data.isexist == "1") {
              callback(new Error("该项目名称已存在"));
            } else {
              //不存在
              callback();
            }
          } else {
            callback(new Error(data.message));
          }
        };
        theFetch.executeAsync();
      }
    },
    getSysUserList(projectid, userids, keys, callback) {
      //查询公司所有员工列表
      let that = this;
      let theFetch = new fetch("pm", "ProjectManager", "getSysUserList");
      theFetch.projectid = projectid;
      theFetch.userids = userids;
      theFetch.keys = keys;
      theFetch.success = function(data) {
        if (data.state == 1) {
          callback(data);
        } else {
          that.$message.error(data.message);
        }
      };
      theFetch.executeAsync();
    },
    toChoosePerson() {
      //项目基本信息填写完毕之后打开选择成员dialog
      this.$refs.projectForm.validate(valid => {
        if (valid) {
          //请求数据
          let that = this;
          this.getSysUserList("", "", "", function(data) {
            that.personList = data.datalist;
          });

          this.projectModal = false;
          this.personModal = true;
          this.resetPersonDialog(); //重置选人员的dialog状态
        }
      });
    },
    openPersonDialog(projectid) {
      //当直接打开人员dialog时，比如：项目设置-成员与权限-添加项目成员
      this.personModal = true;
      let that = this;
      that.proIdOfAddPerson = projectid;
      that.loading = true;
      //查询公司所有员工
      this.getSysUserList(projectid, "", "", function(data) {
        that.personList = data.datalist;
        that.checkList = [];
        that.personList.forEach(item => {
          if (item.isadd == 1) {
            let tag = item.loginname + "  (" + item.username + ")";
            that.checkList.push(tag);
            that.form.proPersonList.push(item.userid);
          }
        });
        that.loading = false; //关闭loading
      });
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      } else {
        this.choosedLogoUrl = URL.createObjectURL(file.raw);
        return isLt2M;
      }
    },
    uploadSuccess(data) {
      //图片上传成功之后的回调
      let that = this;

      if (data.resultcode == "232") {
        that.loading = true;
        let filename = data.filename;
        filename = filename.substring(0, filename.lastIndexOf("."));
        that.form.proImg = filename;
      } else {
        this.$message.error(data.resultmsg);
      }
    },
    //添加项目
    _submit(){
        var that = this;
        let theFetch = new fetch("pm", "ProjectManager", "createProject");
        theFetch.projectname = that.form.proName;
        theFetch.picurl = that.form.proImg;
        theFetch.content = that.form.proContent;
        //成员选择，如果点击的导入按钮
        if (this.personSource == "export") {
          theFetch.userids = that.form.proPersonList.toString(); // 导入的项目成员的userid
        } else if (this.personSource == "copy") {
          //成员选择，如果点击的复制按钮
          theFetch.userids = that.form.copyPMList.toString() + "," + that.form.copyPCList.toString(); // 复制的项目成员的userid
        }
        theFetch.u = Utils.getValue("u"); // 当前登录人的userid
        theFetch.success = function(res) {
          that.loading = false;
          if (res.state == 1) {
            that.choosedLogoUrl = ""; //清空图片url
            that.resetPersonDialog(); //重置选人员的dialog状态
            that.personModal = false;
            that.checkList = []; //清空上一次复选框选中的人员列表
            that.form.proPersonList = []; //清空上一次选中（包括复选框和搜索）的人员列表
            //重置copy面板里的
            that.resetCopyTab();
            //添加成功之后跳转到项目列表

            let routePath = that.$route.path;
            if (routePath.substring(routePath.lastIndexOf("/") + 1) != "myProjectManage") {
              that.$router.push({ path: "myProjectManage" }); //跳转到项目列表
            }
            eventBus.$emit("projectAddSuccess");
            //刷新左侧菜单和我的项目的项目列表
            //            that.$refs.sideBarRef.myProjectList(that.$refs.sideBarRef.pageSize, that.$refs.sideBarRef.pageIndex); //失败的
            //            that.$refs.myProjectRef.myProjectList(that.$refs.myProjectRef.pageSize, that.$refs.myProjectRef.pageIndex);
          } else {
            that.$message.error(res.message);
          }
        };
        theFetch.executeAsync();
    },
    addPersonClick() {
      //切换tab页时加载数据
      if (this.activeName == "exportPerson") {
      } else if (this.activeName == "copyPerson") {
        this.myProjectList(); //获取当前登录人参与的项目列表
      }
    },
    myProjectList() {
      //获取当前登录人参与的项目列表
      let that = this;
      let theFetch = new fetch("pm", "ProjectManager", "myProjectList");
      theFetch.isPage = 0;
      theFetch.u = Utils.getValue("u"); // 当前登录人的userid
      theFetch.success = function(res) {
        that.proList = [];
        var rslen = res.rs.length;
        if (rslen > 0) {
          Utils.renderFs(res);
          for (var i = 0; i < rslen; i++) {
            var row = res.rs[i],
              projectid = Utils.getRowValue(row, "projectid"),
              projectname = Utils.getRowValue(row, "projectname"),
              picurl = Utils.getRowValue(row, "picurl");
            that.proList.push({
              projectid: projectid,
              projectname: projectname,
              picurl:
                "http://" +
                config.appHost +
                config.appRoot +
                "/image?" +
                "module=common&service=File&method=view" +
                "&type=UserImg&fileName=" +
                picurl +
                ".jpg&w=162&h=162&t=" +
                new Date().getTime(),
            });
          }
        }
      };
      theFetch.executeAsync();
    },
    getPrjJoinnerList(projectId, keys) {
      //获取项目参与人列表
      let that = this;
      let theFetch = new fetch("pm", "ProjectManager", "getPrjJoinnerList");
      theFetch.projectid = projectId;
      theFetch.keys = keys;
      theFetch.isPage = 0;
      theFetch.success = function(data) {
        if (data.state == 1) {
          that.managerList = [];
          that.commonList = [];
          let res = data.datalist;
          var rslen = res.rs.length;
          that.total = rslen;
          if (rslen > 0) {
            Utils.renderFs(res);
            for (var i = 0; i < rslen; i++) {
              var row = res.rs[i],
                id = Utils.getRowValue(row, "id"),
                username = Utils.getRowValue(row, "username"),
                userid = Utils.getRowValue(row, "userid"),
                roleid = Utils.getRowValue(row, "roleid"),
                loginname = Utils.getRowValue(row, "loginname");
              if (roleid == "1") {
                //管理员
                that.managerList.push({
                  id: id,
                  username: username,
                  userid: userid,
                  roleid: roleid,
                  loginname: loginname,
                });
              } else if (roleid == "2") {
                //普通成员
                that.commonList.push({
                  id: id,
                  username: username,
                  userid: userid,
                  roleid: roleid,
                  loginname: loginname,
                });
              }
            }
          }
        } else {
          that.$message.error(data.message);
        }
      };
      theFetch.executeAsync();
    },
    getSelectedPro(e) {
      this.getPrjJoinnerList(this.projectSelected); //获取项目成员列表
      this.isAbled = false;
      this.resetCopyTab();
    },
    resetCopyTab() {
      //隐藏各组成员列表
      this.checkManagerAll = false;
      this.checkAll = false;
      this.isShowManagerDeterminate = false;
      this.isShowDeterminate = false;
      this.showManagerSub = false;
      this.showSub = false;
      this.form.copyPMList = [];
      this.form.copyPCList = [];
      this.checkedManagerTeam = [];
      this.checkedTeam = [];
    },
    addAll() {
      //创建项目并添加成员
      let that = this;
      //项目id为空，则是添加项目和成员
      if (Utils.isNullorEmpty(that.proIdOfAddPerson)) {
        that.personSource = "export";
        if(!this.form.proImg){
          this.form.proImg = "20180130100741716878154558509411";
        }
        that._submit();
      } else {
        //否则，是给已存在的项目编辑（新增或移除）项目成员
        let theFetch = new fetch("pm", "ProjectManager", "insertProjectJoinner");
        theFetch.projectid = that.proIdOfAddPerson;
        theFetch.userids = that.form.proPersonList.toString(); // 项目成员的的userid
        theFetch.isaddadmin = 0;
        theFetch.u = Utils.getValue("u"); // 当前登录人的userid
        theFetch.success = function(res) {
          if (res.state == 1) {
            that.personModal = false;
            that.$message.success(res.message);
            //刷新项目成员列表
            that.$parent.getPrjJoinnerList(that.$parent.currentProId);
          } else {
            that.$message.error(res.message);
          }
        };
        theFetch.executeAsync();
      }
    },
    copyPersonToCreatePro() {
      //创建项目并添加从已有项目复制的成员
      let that = this;
      // 项目id为空，则是添加项目和成员
      console.log(that.proIdOfAddPerson);
      if (Utils.isNullorEmpty(that.proIdOfAddPerson)) {
        that.personSource = "copy";
        that._submit(); //上传logo
      } else {
        //否则，是给已存在的项目编辑（新增或移除）项目成员
        let theFetch = new fetch("pm", "ProjectManager", "insertProjectJoinner");
        if(that.proIdOfAddPerson){
          theFetch.projectid = that.proIdOfAddPerson;
        }
        theFetch.userids = that.form.copyPMList.toString() + that.form.copyPCList.toString(); // 复制来的项目成员的userid
        theFetch.isaddadmin = 0;
        theFetch.u = Utils.getValue("u"); // 当前登录人的userid
        theFetch.success = function(res) {
          if (res.state == 1) {
            that.personModal = false;
            //刷新项目成员列表
            that.$parent.getPrjJoinnerList(that.$parent.currentProId);
          } else {
            that.$message.error(res.message);
          }
        };
        theFetch.executeAsync();
      }
    },
    removeTags(tag) {
      //移除tag
      this.$refs.saveTagInput.$refs.input.blur();
      this.checkList.splice(this.checkList.indexOf(tag), 1);
    },
    searchInputClick() {
      //点击搜索人员区，让隐形文本框聚焦
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    keyupSearch(e) {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.matchList = [];
        let that = this;
        //请求接口，进行模糊搜索匹配
        this.getSysUserList("", this.form.proPersonList.toString(), inputValue, function(data) {
          that.matchList = data.datalist;
          //如果符合搜索的数组不为空，则显示符合的结果
          if (that.matchList.length > 0) {
            that.isShowDropDown = true;
          } else {
            that.isShowDropDown = false;
          }
        });
      } else {
        this.isShowDropDown = false;
      }
    },
    chooseIt(item) {
      let tag = item.loginname + "  (" + item.username + ")";
      if (!this.checkList.includes(tag)) {
        this.form.proPersonList.push(item.userid); //放入选择的项目成员列表
        this.checkList.push(tag); //放入到存放已选人员的复选框列表
      }
      this.isShowDropDown = false;
      this.matchList = []; //清空上一次查询符合的结果
      this.inputValue = ""; //清空文本框
    },
    checkeBoxChange(value) {
      //        console.log(value);
    },
    checkSingleFromAll(e, item) {
      let proPersonList = this.form.proPersonList;
      if (e.path[0].checked) {
        proPersonList.push(item.userid); //放入选择的项目成员列表
      } else {
        var index = proPersonList.indexOf(item.userid);
        if (index > -1) {
          proPersonList.splice(index, 1);
        }
      }
      //        console.log(proPersonList);
    },
    /*checkGroupFromCopy(event) {
       //        console.log(event.target);
       this.checkList = event.target.checked ? this.cities : [];
       this.isIndeterminate = false;
       },
       checkSingleFromGroupCopy(value) {
       let checkedCount = value.length;
       this.checkAll = checkedCount === this.cities.length;
       this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
       },
       checkSingleFromCopy(e, item){
       let proPersonList = this.form.proPersonList = [];
       if (e.path[0].checked) {
       proPersonList.push(item.id); //放入选择的项目成员列表
       } else {
       var index = proPersonList.indexOf(item.id);
       if (index > -1) {
       proPersonList.splice(index, 1);
       }
       }
       //        console.log(proPersonList);
       },*/
  },
};
</script>
