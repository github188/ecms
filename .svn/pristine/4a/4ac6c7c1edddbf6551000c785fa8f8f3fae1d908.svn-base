<template>
  <div>
    <div class="panel">
      <div class="panel-title">
        <span>{{currentProName}}</span>
        <i class="el-icon-edit btn-editproject" @click.prevent="btnProjectEdit"></i>
        <div class="panel-operate">
          <el-input placeholder="搜索" icon="search" v-model="searchquery" :on-icon-click="searchHandle" @change="searchHandle" v-if="showWhenDListShow">
          </el-input>
        </div>
      </div>
      <div class="panel-content">
        <el-tabs v-model="activeTab" type="card" @tab-click="showDemandList">
          <el-tab-pane label="需求" name="demandTab">
            <!--需求列表 begin-->
            <div v-if="isDemandList">
              <div class="panel-operate-demand">
                <el-button type="success" @click.prevent="demandAddMain">创建需求</el-button>
              </div>
              <el-table :data="demandList" border style="width: 100%;" class="main-table" :row-key="getRowKeys" @expand="expandIt">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <!--子需求表格 begin-->
                    <el-table :border="false"  :data="subDemandList[props.row.id]" v-loading="loading" :show-header="showheader" ref="subDemandList" class="sub-table" style="width: 100%;">
                      <el-table-column type="index" width="57">
                      </el-table-column>
                      <!-- <el-table-column prop="id" label="ID" show-overflow-tooltip width="220">
                      </el-table-column> -->
                      <el-table-column label="标题">
                        <template slot-scope="scope">
                          <el-button type="text" size="mini" @click.prevent="showDemandDetail(scope.row.id)">{{scope.row.title}}</el-button>
                        </template>
                      </el-table-column>
                      <el-table-column width="120" label="状态">
                        <template slot-scope="scope">
                          <span>{{scope.row.state | formatState}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column prop="urgencydegree" width="120" label="优先级">
                      </el-table-column>
                      <el-table-column prop="realname" width="140" label="处理人">
                      </el-table-column>
                      <el-table-column width="140" label="预计结束">
                        <template slot-scope="scope">
                          <span>{{scope.row.preendtime | formatDate}}</span>
                        </template>
                      </el-table-column>
                      <el-table-column label="操作" width="179">
                        <template slot-scope="scope">
                          <el-button @click="demandEdit(scope.row)" type="text" size="mini">编辑</el-button>
                          <el-button @click="demandDelete(scope.$index, scope.row,'sub')" type="text" size="mini">删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                    <!--子需求表格 end-->
                  </template>
                </el-table-column>
                <!-- <el-table-column width="220" prop="id" show-overflow-tooltip label="ID">
                </el-table-column> -->
                <el-table-column label="标题">
                  <template slot-scope="scope">
                    <el-button type="text" size="mini" @click.prevent="showDemandDetail(scope.row.id)">{{scope.row.title}}</el-button>
                    <!-- <a href="javascript:void(0);" >
                      <i class="el-icon-plus" style="margin-left: 5px;color: #01cd78;"></i>
                    </a> -->
                  </template>
                </el-table-column>
                <el-table-column width="120" label="状态">
                  <template slot-scope="scope">
                    <span>{{scope.row.state | formatState}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="urgencydegree" width="120" label="优先级">
                </el-table-column>
                <el-table-column prop="realname" width="140" label="处理人">
                </el-table-column>
                <el-table-column width="140" label="预计结束">
                  <template slot-scope="scope">
                    <span>{{scope.row.preendtime | formatDate}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="180">
                  <template slot-scope="scope">
                    <el-button @click="demandEdit(scope.row)" size="mini" type="text">编辑</el-button>
                    <el-button @click="demandEdit(scope.row)" @click.prevent="demandAddSub(scope.row.id)" size="mini" type="text">新增</el-button>
                    <el-button @click="demandDelete(scope.$index, scope.row)" size="mini" type="text">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currPageDemand" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalDemandList" v-if="totalDemandList>0">
              </el-pagination>
            </div>
            <!--需求列表 end-->

            <!--项目设置 begin-->
            <div v-if="isProjectEdit" class="setting-panel">
              <div class="setting-title">项目设置</div>
              <el-tabs v-model="activeSettingName" @tab-click="handleSettingClick">
                <el-tab-pane label="项目信息" name="proSetting">
                  <div class="proinfo-panel">
                    <el-row :gutter="20">
                      <el-col :span="3">
                        <div class="upload-block">
                          <span>应用LOGO上传</span>
                          <div class="logo-block">
                            <img :src="proInfo.picurl">
                            <span v-if="isShowUploadTip">请上传小于2M的图片</span>
                          </div>
                          <el-upload class="upload-logo" :action="uploadUrl" accept="image/jpeg,image/png,image/jpg" :show-file-list="false" :before-upload="beforeAvatarUpload" :on-success="uploadSuccess">
                            <el-button size="small" type="primary">上传图片</el-button>
                          </el-upload>
                        </div>
                      </el-col>
                      <el-col :span="8">
                        <div class="info-block">
                          <el-form label-position="top" label-width="80px" :model="proInfo" :rules="rulesProinfo" ref="formProinfo">
                            <el-form-item label="标题" prop="projectname">
                              <el-input v-model.trim="proInfo.projectname" @blur="toSaveEdit"></el-input>
                            </el-form-item>
                            <el-form-item label="项目描述" prop="content">
                              <el-input :autosize="{ minRows: 6, maxRows: 12}" type="textarea" v-model.trim="proInfo.content" @blur="toSaveEdit"></el-input>
                            </el-form-item>
                          </el-form>
                        </div>
                      </el-col>
                      <el-col :span="8" :offset="1">
                        <div class="info-show-block">
                          <el-row>
                            <el-col :span="5" class="text-title">管&nbsp;理&nbsp;员</el-col>
                            <el-col :span="7">{{proInfo.adminname}}</el-col>
                          </el-row>
                          <el-row>
                            <el-col :span="5" class="text-title">项目成员</el-col>
                            <el-col :span="7">{{proInfo.totalCount}}</el-col>
                          </el-row>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="成员与权限" name="personAuthority">
                  <div class="person-authority" v-if="handleList.length>0">
                    <div class="panel-operate-demand">
                      <el-input placeholder="搜索成员" class="input-searchperson" icon="search" v-model="personquery" :on-icon-click="searchPerson" @change="searchPerson">
                      </el-input>
                      <el-button type="success" v-if="isAdmin" @click="addProPerson(proInfo.projectid)">添加成员</el-button>
                      <!-- 项目id 也可从currentProId拿-->
                      <el-button type="success" v-if="isAdmin" @click="personBatchDelete">批量移除</el-button>
                    </div>
                    <el-table ref="personTable" :data="handleList" border tooltip-effect="dark" style="width: 100%;margin-top: 20px;" @selection-change="handleSelectionChange">
                      <el-table-column type="selection" v-if="isAdmin" width="55">
                      </el-table-column>
                      <!-- <el-table-column show-overflow-tooltip prop="userid" label="成员id" width="150">
                      </el-table-column> -->
                      <el-table-column show-overflow-tooltip prop="loginname" label="成员昵称">
                      </el-table-column>
                      <el-table-column show-overflow-tooltip prop="username" label="真实姓名" width="100">
                      </el-table-column>
                      <el-table-column show-overflow-tooltip prop="orgname" label="部门" width="100">
                      </el-table-column>
                      <el-table-column show-overflow-tooltip prop="post" label="岗位" width="120">
                      </el-table-column>
                      <el-table-column show-overflow-tooltip prop="email" label="邮箱">
                      </el-table-column>
                      <el-table-column label="用户组" width="100">
                        <template slot-scope="scope">{{ scope.row.roleid | fomartRole}}</template>
                      </el-table-column>
                      <el-table-column label="操作" width="80" v-if="isAdmin">
                        <template v-if="scope.row.roleid != 1" slot-scope="scope">
                          <el-button type="text" size="mini" @click="personDelete(scope.$index, scope.row,handleList)">移除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                    <el-pagination @size-change="sizeChangePerson" @current-change="currChangePerson" :current-page="currPagePerson" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total"></el-pagination>
                  </div>
                </el-tab-pane>
                <el-tab-pane label="其他设置" name="otherSetting">
                  <div class="other-setting">
                    暂无
                  </div>
                </el-tab-pane>
              </el-tabs>
            </div>
            <!--项目设置 end-->

            <!--查看需求详情 begin-->
            <div v-if="isDemandDetail">
              <div class="panel-operate-demand">
                <el-button :plain="true" type="success" @click.prevent="demandShowMore">更多</el-button>
                <el-button type="success" @click="toEdit(formAddD.id)">编辑</el-button>
              </div>
              <div class="dd-panel">
                <div class="dd-title">
                  {{formAddD.title}}
                  <span class="dd-state">
                    ID：{{formAddD.id}}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;状态：{{formAddD.state | formatState}}
                  </span>
                </div>
                <div class="dd-content">
                  <el-row :gutter="20">
                    <el-col :span="12">
                      <div class="dd-sub-title">
                        <i class="el-icon-document"></i>
                        <span>详细信息</span>
                      </div>
                      <div class="dd-sub-block">
                        {{formAddD.detailinfo}}
                      </div>
                    </el-col>
                    <el-col :span="11" :offset="1">
                      <div class="dd-sub-title">
                        <i class="el-icon-setting"></i>
                        <span>基本信息</span>
                      </div>
                      <el-row class="dd-sub-item">
                        <el-col :span="4" class="title">父需求</el-col>
                        <el-col :span="14" class="text">{{formAddD.parentid}}</el-col>
                      </el-row>
                      <el-row class="dd-sub-item">
                        <el-col :span="4" class="title">优先级</el-col>
                        <el-col :span="14" class="text">{{formAddD.urgencydegree}}</el-col>
                      </el-row>
                      <el-row class="dd-sub-item">
                        <el-col :span="4" class="title">当前处理人</el-col>
                        <el-col :span="14" class="text">{{formAddD.handler}}</el-col>
                      </el-row>
                      <el-row class="dd-sub-item">
                        <el-col :span="4" class="title">预计开始</el-col>
                        <el-col :span="14" class="text">{{formAddD.prestarttime | formatDate}}</el-col>
                      </el-row>
                      <el-row class="dd-sub-item">
                        <el-col :span="4" class="title">预计结束</el-col>
                        <el-col :span="14" class="text">{{formAddD.preendtime | formatDate}}</el-col>
                      </el-row>
                      <el-row class="dd-sub-item">
                        <el-col :span="4" class="title">创建人</el-col>
                        <el-col :span="14" class="text">{{formAddD.creator}}</el-col>
                      </el-row>
                      <el-row class="dd-sub-item">
                        <el-col :span="4" class="title">创建时间</el-col>
                        <el-col :span="14" class="text">{{formAddD.prestarttime | formatDate}}</el-col>
                      </el-row>
                      <el-row class="dd-sub-item">
                        <el-col :span="4" class="title">完成时间</el-col>
                        <el-col :span="14" class="text">{{formAddD.finishtime | formatDate}}</el-col>
                      </el-row>
                    </el-col>
                  </el-row>
                </div>
              </div>
            </div>
            <!--查看需求详情 end-->

          </el-tab-pane>
          <el-tab-pane label="缺陷" name="bugTab">
            缺陷
          </el-tab-pane>
          <el-tab-pane label="文档" name="docTab">
            文档
          </el-tab-pane>
          <el-tab-pane label="报表" name="reportformTab">
            报表
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>

    <!--添加需求 begin-->
    <el-dialog :title="theDemandAddTitle" :visible.sync="isShowDemandDialog" :modal="isShowDemandDialog" size="small" :before-close="closeDemandAddDialog">
      <el-form ref="demandAddForm" :model="formAddD" :rules="rules" label-width="110px" label-position="right" class="demandadd-form">
        <el-form-item label="需求名称" prop="title">
          <el-input v-model="formAddD.title"></el-input>
        </el-form-item>
        <el-form-item label="详细说明" prop="detailinfo">
          <el-input :autosize="{ minRows: 6, maxRows: 12}" type="textarea" v-model="formAddD.detailinfo"></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="优先级" prop="urgencydegree">
              <el-select v-model="formAddD.urgencydegree" placeholder="请选择优先级">
                <el-option v-for="item in level" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="当前处理人" prop="handler">
              <el-select v-model="formAddD.handler" filterable placeholder="请选择" @change="handerChange">
                <!--multiple-->
                <el-option v-for="item in handleList" :key="item.userid" :label="item.username" :value="item.userid">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="预计开始" prop="prestarttime">
              <!--<el-input v-model="formAddD.startTime"></el-input>-->
              <el-date-picker class="" :editable="false" :picker-options="startTimeOpt" v-model="formAddD.prestarttime" type="date" placeholder="选择日期">
              </el-date-picker>
              <!-- :default-value="formAddD.prestarttime"-->
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预计结束" prop="preendtime">
              <!--<el-input v-model="formAddD.endTime"></el-input>-->
              <el-date-picker class="" :editable="false" :picker-options="endTimeOpt" v-model="formAddD.preendtime" type="date" placeholder="选择日期">
              </el-date-picker>
              <!-- :default-value="formAddD.preendtime"-->
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="当前状态" prop="state" v-if="handleType=='edit'" class="demand-state">
          <el-radio-group v-model="formAddD.state">
            <el-radio v-for="item in stateList" :key="item.label" :label="item.label">{{item.text}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDemandAddDialog">取 消</el-button>
        <el-button type="primary" @click="demandSubmit">提 交</el-button>
      </div>
    </el-dialog>
    <!--添加需求 end-->

    <!--共用添加项目组件里的选择成员dialog-->
    <projectAdd @proAddSuccess="proAddSuccess" ref="projectAdd"></projectAdd>

  </div>
</template>

<style scoped>
.panel {
  margin-bottom: 24px;
  padding: 12px 24px;
  border: 0;
  background: #ffffff;
}

.panel-title {
  height: 40px;
  font-size: 16px;
  line-height: 40px;
}

.panel-title span {
  position: relative;
  padding-left: 10px;
}

.panel-title span:before {
  position: absolute;
  top: 4px;
  left: 0;
  height: 16px;
  border-left: 2px solid #01cd78;
  content: "";
}

.panel-content {
  margin-top: 20px;
}

.panel-operate {
  float: right;
}

.panel-operate button {
  margin-left: 15px;
}

.panel-operate-demand {
  overflow: hidden;
}

.panel-operate-demand button {
  float: right;
  margin-left: 15px;
}

.main-table {
  margin-top: 15px;
}

.btn-editproject {
  display: inline-block;
  margin-left: 10px;
  color: #01cd78;
  vertical-align: middle;
  cursor: pointer;
}

.setting-panel,
.dd-panel {
  margin-top: 5px;
  border: 1px solid #d5d5d5;
}

.setting-title {
  padding: 5px 0 0 15px;
  height: 40px;
  background-color: #f2f2f2;
  color: #333;
  font-size: 16px;
  line-height: 40px;
}

.proinfo-panel,
.person-authority,
.other-setting {
  padding: 15px 15px;
}

.upload-block {
  padding-bottom: 20px;
  width: 120px;
  font-size: 14px;
}

.upload-block > span {
  display: block;
  padding-bottom: 10px;
}

.logo-block {
  position: relative;
  overflow: hidden;
  max-height: 120px;
  width: 100%;
  height: 120px;
  border: 1px solid #e1e1e1;
  background-color: #f4f4f4;
}

.logo-block span {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 1;
  display: inline-block;
  padding: 0 4%;
  width: 91%;
  color: #888;
  line-height: 22px;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

.logo-block img {
  z-index: 2;
  display: block;
  width: 100%;
}

.upload-logo {
  margin-top: 12px;
  text-align: center;
}

.info-show-block {
  color: #333;
  font-size: 14px;
}

.text-title {
  color: #888;
}

.info-show-block .el-row {
  margin-bottom: 10px;
}
</style>

<style scoped>
.input-searchperson {
  float: left;
  width: 217px;
}

.dd-panel {
  overflow: hidden;
  margin-top: 15px;
}

.dd-title {
  padding: 0 15px;
  height: 50px;
  background-color: #f2f2f2;
  color: #333;
  font-size: 16px;
  line-height: 50px;
}

.dd-state {
  float: right;
  font-size: 14px;
}

.dd-content {
  padding: 25px 20px;
  font-size: 14px;
}

.dd-sub-title {
  padding-bottom: 15px;
}

.dd-sub-title > i {
  margin-right: 5px;
  color: #01cd78;
}

.dd-sub-title > span {
  color: #333;
}

.dd-sub-item {
  padding-bottom: 10px;
}

.dd-sub-item .title {
  color: #888;
}

.dd-sub-item .text {
  color: #333;
}
</style>

<style>
/*.el-table__expand-column {
    !*在非scoped模式下重置有效*!
    border-right: 0 !important;
  }*/

.main-table .el-table__expanded-cell {
  padding-top: 0;
  padding-right: 0;
  padding-bottom: 0;
  padding-left: 0;
}

.main-table .el-table tr {
  background-color: #f8f8f8;
}

.main-table .el-table__expand-icon > .el-icon {
  color: #01cd78;
}

.setting-panel .el-tabs__active-bar {
  background-color: #05d181;
}

.setting-panel .el-tabs__header {
  border-bottom: 0;
  background-color: #f2f2f2;
}

.setting-panel .el-tabs__nav-scroll {
  margin: 0 auto;
  width: 280px;
}

.proinfo-panel .el-row {
  margin-right: 5px !important;
  margin-left: 5px !important;
}

.upload-logo .el-button--small {
  font-size: 14px;
}

.demand-state .el-radio__input.is-checked .el-radio__inner {
  border-color: #01cd78;
  background: #01cd78;
}

.demandadd-form .el-select,
.demandadd-form .el-date-editor.el-input {
  width: 100%;
}
</style>

<script>
import config from "../../../utils/config";
export default {
  name: "projectRelate",
  data() {
    return {
      currentProjectAdmin:"",
      admin: localStorage.getItem("u"),
      isShowDemandDialog: false,
      formAddD: {
        id: "",
        title: "",
        prestarttime: "",
        preendtime: "",
        projectid: "",
        //          handler: [],
        handler: "",
        urgencydegree: "",
        parentid: "",
        state: "",
        detailinfo: "",
        creator: "",
        isvalid: "",
      },
      stateList: [
        {
          label: "0",
          text: "待规划",
        },
        {
          label: "1",
          text: "规划中",
        },
        {
          label: "2",
          text: "开发中",
        },
        {
          label: "3",
          text: "测试中",
        },
        {
          label: "4",
          text: "已完成",
        },
        {
          label: "5",
          text: "已上线",
        },
      ],
      level: [
        {
          value: "紧急",
          label: "紧急",
        },
        {
          value: "高",
          label: "高",
        },
        {
          value: "中",
          label: "中",
        },
        {
          value: "低",
          label: "低",
        },
        {
          value: "无关紧要",
          label: "无关紧要",
        },
      ],
      rules: {
        title: {
          required: true,
          message: "项目名称不能为空!",
        },
        detailinfo: {
          required: true,
          message: "项目描述不能为空!",
        },
        urgencydegree: {
          required: true,
          message: "请选择优先级!",
        },
        handler: {
          required: true,
          message: "请选择当前操作人!",
        },
        prestarttime: {
          required: true,
          message: "请选择预计开始时间!",
        },
        preendtime: {
          required: true,
          message: "请选择预计结束时间!",
        },
      },
      demandType: "", //需求类型：父、子
      startTimeOpt: {
        disabledDate: time => {
          var res = false;
          if (!Utils.isNullorEmpty(this.formAddD.endTime)) {
            res = time.getTime() > Date.now() - 8.64e7 && time.getTime() > this.formAddD.endTime;
          } else {
            res = time.getTime() < Date.now() - 8.64e7;
          }
          return res;
        },
      },
      handleList: [],
      handleType: "",
      //
      //
      activeTab: "demandTab",
      currPageDemand: 1,
      currentPage: 1,
      demandList: [],
      showWhenDListShow: true,
      subDemandList: {},
      searchquery: "",
      border: true,
      showheader: false,
      loading: false,
      isDemandList: true,
      isProjectEdit: false,
      isDemandDetail: false,
      isDemandEdit: false,
      activeSettingName: "proSetting",
      rulesProinfo: {
        projectname: {
          required: true,
          message: "项目名称不能为空!",
          trigger: "blur",
        },
        content: {
          required: true,
          message: "项目背景不能为空!",
          trigger: "blur",
        },
      },
      proInfo: {},
      isShowUploadTip: true,
      uploadUrl: "http://" + config.appHost + config.appRoot + "/data?" + "module=common&service=File&method=upLoadImg" + "&type=UserImg",
      choosedLogoUrl: "",
      personquery: "",
      multipleSelection: [],
      currPagePerson: 1,
      theDemandAddTitle: "",
      pageSize: 10,
      pageIndex: 1,
      totalDemandList: 0,
      total: 0,
    };
  },
  filters: {
    formatState(state) {
      let stateText = "";
      if (state == "0") {
        stateText = "待规划";
      } else if (state == "1") {
        stateText = "规划中";
      } else if (state == "2") {
        stateText = "开发中";
      } else if (state == "3") {
        stateText = "测试中";
      } else if (state == "4") {
        stateText = "已完成";
      } else if (state == "5") {
        stateText = "已上线";
      }
      return stateText;
    },
    formatDate(date) {
      return Utils.formatDate(date);
    },
    fomartRole(roleid) {
      if (roleid == 1) {
        return "管理员";
      } else if (roleid == 2) {
        return "普通成员";
      }
    },
  },
  created: function() {
    this.queryDemandByProjectId(this.currentProId, this.pageSize, this.pageIndex);
    this.getPrjJoinnerList(this.currentProId);
  },
  beforeRouteUpdate(to, from, next){
    if(to.query.t){
      this.isDemandList = true;
      this.showWhenDListShow = true; //显示项目名称右侧的搜索框
      this.isProjectEdit = false;
      this.isDemandDetail = false;
      this.pageIndex = 1;
      this.queryDemandByProjectId(to.query.projectid, this.pageSize, this.pageIndex);
      this.getPrjJoinnerList(to.query.projectid);
    }
    next();
  },
  mounted: function() {
    //判断并显示从工作台跳转来的需求详情
    var querys = this.$route.query;
    if (!Utils.isNullorEmpty(querys.jumpfrom) && !Utils.isNullorEmpty(querys.demandid)) {
      this.showDemandDetail(querys.demandid);
    }
  },
  methods: {
    openModal(title) {
      this.isShowDemandDialog = true;
      this.theDemandAddTitle = title;
      debugger;
      this.resetForm("demandAddForm");
    },
    closeModal() {
      this.isShowDemandDialog = false;
    },
    closeDemandAddDialog() {
      this.closeModal();
      this.$refs.demandAddForm.resetFields();
    },
    getPrjJoinnerList(projectId, keys) {
      //获取项目参与人列表

      let that = this;
      let theFetch = new fetch("pm", "ProjectManager", "getPrjJoinnerList");
      theFetch.projectid = projectId;
      theFetch.keys = keys;
      theFetch.isPage = 1;
      theFetch.pageSize = this.pageSize;
      theFetch.pageIndex = this.currPagePerson;
      theFetch.success = function(res) {
        if (res.state == 1) {
          that.handleList = [];
          that.handleList = Utils.dataFormat(res.datalist);
          let {pageIndex,pageSize,totalCount} = res.datalist;
          that.currPagePerson = pageIndex;
          that.pageSize = pageSize;
          that.total = totalCount;
          if(that.handleList.length > 0 && that.handleList[0].roleid == 1){
            that.currentProjectAdmin = that.handleList[0].userid;
          }
        }
      };
      theFetch.executeAsync();
    },
    demandSubmit() {
      this.$refs.demandAddForm.validate(valid => {
        //验证通过，这里进行提交
        if (valid) {
          let requestMethod = "";
          //如果是编辑需求，即this.handleType是true，则调编辑接口
          if (!Utils.isNullorEmpty(this.handleType)) {
            if (this.handleType == "edit") {
              requestMethod = "updateDemand";
            } else if (this.handleType == "add") {
              requestMethod = "createDemand";
            }
          }
          let that = this;
          let theFetch = new fetch("pm", "Demand", requestMethod);
          theFetch.title = that.formAddD.title;
          theFetch.prestarttime = that.formAddD.prestarttime;
          theFetch.preendtime = that.formAddD.preendtime;
          if (that.demandType == "main") {
            theFetch.projectid = that.currentProId;
          } else if (that.demandType == "sub") {
            theFetch.parentid = that.formAddD.id;
          }
          theFetch.handler = that.formAddD.handler;
          theFetch.urgencydegree = that.formAddD.urgencydegree;
          if (requestMethod == "updateDemand") {
            theFetch.state = that.formAddD.state;
          } else if (requestMethod == "createDemand") {
            theFetch.state = "0"; //待规划
          }
          theFetch.detailinfo = that.formAddD.detailinfo;
          if (!Utils.isNullorEmpty(that.formAddD.id)) {
            //如果有需求id，说明不是修改需求就是在父需求下添加子需求
            theFetch.id = that.formAddD.id;
          }
          theFetch.u = Utils.getValue("u"); // userid
          theFetch.success = function(res) {
            console.log(res);
            if (res.state == 1) {
              that.demandType = "";
              that.demandId = "";
              that.isShowDemandDialog = false;
              //刷新父需求列表
              that.queryDemandByProjectId(that.currentProId, that.pageSize, that.pageIndex);
              that.$message.success(res.message);
            } else {
              that.$message.error(res.message);
            }
          };
          theFetch.executeAsync();
        }
      });
    },
    queryDemandByProjectId(projectid, pageSize, pageIndex) {
      //查询项目下的所有父级需求
      let that = this;
      let theFetch = new fetch("pm", "Demand", "queryDemandByProjectId");
      theFetch.projectid = projectid;
      theFetch.isPage = 1;
      theFetch.pageSize = pageSize;
      theFetch.pageIndex = pageIndex;
      theFetch.u = Utils.getValue("u"); // 当前登录人的userid
      theFetch.success = function(res) {
        if (res.state == 1) {
          that.demandList = [];
          that.demandList = Utils.dataFormat(res);
          that.currPageDemand = res.pageIndex;
          that.pageSize = res.pageSize;
          that.totalDemandList = res.totalCount;
          // var rslen = res.rs.length;
          // that.totalDemandList = rslen;
          // if (rslen > 0) {
          //   Utils.renderFs(res);
          //   for (var i = 0; i < rslen; i++) {
          //     var row = res.rs[i],
          //       id = Utils.getRowValue(row, "id"),
          //       title = Utils.getRowValue(row, "title"),
          //       prestarttime = Utils.getRowValue(row, "prestarttime"),
          //       preendtime = Utils.getRowValue(row, "preendtime"),
          //       projectid = Utils.getRowValue(row, "projectid"),
          //       handler = Utils.getRowValue(row, "handler"),
          //       urgencydegree = Utils.getRowValue(row, "urgencydegree"),
          //       parentid = Utils.getRowValue(row, "parentid"),
          //       state = Utils.getRowValue(row, "state"),
          //       detailinfo = Utils.getRowValue(row, "detailinfo"),
          //       creator = Utils.getRowValue(row, "creator"),
          //       isvalid = Utils.getRowValue(row, "isvalid"),
          //       finishtime = Utils.getRowValue(row, "finishtime"),
          //       realname = Utils.getRowValue(row, "realname");
          //     that.demandList.push({
          //       id: id,
          //       title: title,
          //       prestarttime: prestarttime,
          //       preendtime: preendtime,
          //       projectid: projectid,
          //       handler: handler,
          //       urgencydegree: urgencydegree,
          //       parentid: parentid,
          //       state: state,
          //       detailinfo: detailinfo,
          //       creator: creator,
          //       isvalid: isvalid,
          //       finishtime: finishtime,
          //       realname: realname,
          //     });
          //   }
          // }
        }
      };
      theFetch.executeAsync();
    },
    queryDemandByParentId(mainDemandId) {
      //查询父级需求下所有子需求
      let that = this;
      that.loading = true;
      let theFetch = new fetch("pm", "Demand", "queryDemandByParentId");
      theFetch.parentid = mainDemandId;
      theFetch.u = Utils.getValue("u"); // 当前登录人的userid
      theFetch.success = function(res) {
        if (res.state == 1) {
          let rslen = res.rs.length;
          that.subDemandList[mainDemandId] = Utils.dataFormat(res);
          that.loading = false;
        } else {
          that.$message.error(data.message);
        }
      };
      theFetch.executeAsync();
    },
    queryDemand(demandId) {
      //查询需求详情，显示在编辑需求的dialog里的
      let that = this;
      let theFetch = new fetch("pm", "Demand", "queryDemand");
      theFetch.id = demandId;
      theFetch.u = Utils.getValue("u"); // 当前登录人的userid
      theFetch.success = function(res) {
        if (res.state == 1) {
          var rslen = res.rs.length;
          if (rslen > 0) {
            Utils.renderFs(res);
            var row = res.rs[0];
            that.formAddD.id = Utils.getRowValue(row, "id");
            that.formAddD.title = Utils.getRowValue(row, "title");
            that.formAddD.prestarttime = Utils.getRowValue(row, "prestarttime");
            that.formAddD.preendtime = Utils.getRowValue(row, "preendtime");
            that.formAddD.projectid = Utils.getRowValue(row, "projectid");
            that.formAddD.handler = Utils.getRowValue(row, "handler");
            that.formAddD.urgencydegree = Utils.getRowValue(row, "urgencydegree");
            that.formAddD.parentid = Utils.getRowValue(row, "parentid");
            that.formAddD.state = Utils.getRowValue(row, "state");
            that.formAddD.detailinfo = Utils.getRowValue(row, "detailinfo");
            that.formAddD.creator = Utils.getRowValue(row, "creator");
            that.formAddD.isvalid = Utils.getRowValue(row, "isvalid");
          } else {
            that.$message.error(res.message);
          }
        }
      };
      theFetch.executeAsync();
    },
    queryDemandDetail(demandId) {
      //查询需求详情，显示在需求详情区的
      let that = this;
      let theFetch = new fetch("pm", "Demand", "queryDemandDetail");
      theFetch.id = demandId;
      theFetch.u = Utils.getValue("u"); // 当前登录人的userid
      theFetch.success = function(res) {
        if (res.state == 1) {
          var rslen = res.rs.length;
          if (rslen > 0) {
            Utils.renderFs(res);
            var row = res.rs[0];
            that.formAddD.id = Utils.getRowValue(row, "id");
            that.formAddD.title = Utils.getRowValue(row, "title");
            that.formAddD.prestarttime = Utils.getRowValue(row, "prestarttime");
            that.formAddD.preendtime = Utils.getRowValue(row, "preendtime");
            that.formAddD.projectid = Utils.getRowValue(row, "projectid");
            that.formAddD.handler = Utils.getRowValue(row, "handler");
            that.formAddD.urgencydegree = Utils.getRowValue(row, "urgencydegree");
            that.formAddD.parentid = Utils.getRowValue(row, "parentid");
            that.formAddD.state = Utils.getRowValue(row, "state");
            that.formAddD.detailinfo = Utils.getRowValue(row, "detailinfo");
            that.formAddD.creator = Utils.getRowValue(row, "creator");
            that.formAddD.isvalid = Utils.getRowValue(row, "isvalid");
            that.formAddD.realname = Utils.getRowValue(row, "realname");
            that.formAddD.projectname = Utils.getRowValue(row, "projectname");
          } else {
            that.$message.error(res.message);
          }
        }
      };
      theFetch.executeAsync();
    },
    deleteDemand(demandId, callback) {
      //删除需求
      let that = this;
      let theFetch = new fetch("pm", "Demand", "deleteDemand");
      theFetch.id = demandId;
      theFetch.u = Utils.getValue("u"); // 当前登录人的userid
      theFetch.success = function(res) {
        callback(res);
        that.$message.success(res.message);
      };
      theFetch.executeAsync();
    },
    showDemandList(tab, event) {
      //如果点击的是需求这个Tab，则加载需求列表
      if (tab.index == "0" || tab.index == 0) {
        this.isDemandList = true;
        this.showWhenDListShow = true; //显示项目名称右侧的搜索框
        this.isProjectEdit = false;
        this.isDemandDetail = false;
        //请求此项目下的所有父需求
        this.queryDemandByProjectId(this.currentProId, this.pageSize, this.pageIndex);
      }
    },
    showDemandDetail(id) {
      //点击需求列表里的标题
      this.queryDemandDetail(id); //查询需求详情
      this.isDemandList = false;
      this.showWhenDListShow = false; //隐藏项目名称右侧的搜索框
      this.isDemandDetail = true;
      this.isProjectEdit = false;
    },
    handleSizeChange(val) {
      //需求列表-切换每页显示条数
      console.log(`每页 ${val} 条`);
      //请求接口获取这个pageSize条数据
      this.pageSize = val;
      this.queryDemandByProjectId(this.currentProId, this.pageSize, this.pageIndex);
    },
    handleCurrentChange(val) {
      //需求列表-翻页
      console.log(`当前页: ${val}`);
      //请求接口获取下一页
      this.pageIndex = val;
      this.queryDemandByProjectId(this.currentProId, this.pageSize, this.pageIndex);
    },
    searchHandle(val) {
      //需求panel里的搜索
      let that = this;
      that.pageIndex = 1; //搜索需求则重置当前页为1
      let theFetch = new fetch("pm", "Demand", "queryDemandByParam");
      theFetch.projectid = that.currentProId;
      if (!Utils.isNullorEmpty(that.searchquery)) {
        theFetch.param = that.searchquery;
      }
      theFetch.isPage = 1;
      theFetch.pageSize = that.pageSize;
      theFetch.pageIndex = that.pageIndex;
      theFetch.u = Utils.getValue("u"); // 当前登录人的userid
      theFetch.success = function(res) {
        if (res.state == 1) {
          that.demandList = [];
          var rslen = res.rs.length;
          that.totalDemandList = rslen;
          if (rslen > 0) {
            Utils.renderFs(res);
            for (var i = 0; i < rslen; i++) {
              var row = res.rs[i],
                id = Utils.getRowValue(row, "id"),
                title = Utils.getRowValue(row, "title"),
                prestarttime = Utils.getRowValue(row, "prestarttime"),
                preendtime = Utils.getRowValue(row, "preendtime"),
                projectid = Utils.getRowValue(row, "projectid"),
                handler = Utils.getRowValue(row, "handler"),
                urgencydegree = Utils.getRowValue(row, "urgencydegree"),
                parentid = Utils.getRowValue(row, "parentid"),
                state = Utils.getRowValue(row, "state"),
                detailinfo = Utils.getRowValue(row, "detailinfo"),
                creator = Utils.getRowValue(row, "creator"),
                isvalid = Utils.getRowValue(row, "isvalid"),
                finishtime = Utils.getRowValue(row, "finishtime");
              that.demandList.push({
                id: id,
                title: title,
                prestarttime: prestarttime,
                preendtime: preendtime,
                projectid: projectid,
                handler: handler,
                urgencydegree: urgencydegree,
                parentid: parentid,
                state: state,
                detailinfo: detailinfo,
                creator: creator,
                isvalid: isvalid,
                finishtime: finishtime,
              });
            }
          }
        } else {
          that.$message.error(data.message);
        }
      };
      theFetch.executeAsync();
    },
    getRowKeys(row) {
      // 获取row的key值
      return row.id;
    },
    expandIt(obj, expanded) {
      //展开父需求下的子需求列表
      console.log(obj.id);
      console.log(expanded);
      //展开时才去请求接口
      if (expanded) {
        this.queryDemandByParentId(obj.id);
      }
    },
    btnProjectEdit() {
      //点击项目名称旁边的编辑图标，显示项目设置panel
      this.getProjectDetail(this.currentProId); //显示项目详情
      this.isProjectEdit = true;
      this.isDemandList = false;
      this.showWhenDListShow = false;
      this.isDemandDetail = false;
    },
    handleSettingClick(tab, event) {
      //切换项目设置里的Tabs时显示对应数据
      if (this.activeSettingName == "proSetting") {
        var projectid = this.$route.query.projectid;
        this.getProjectDetail(projectid);
      } else if (this.activeSettingName == "personAuthority") {
        this.handleList = [];
        this.getPrjJoinnerList(this.currentProId);
      } else if (this.activeSettingName == "otherSetting") {
      }
    },
    editProject(callback) {
      let that = this;
      let theFetch = new fetch("pm", "ProjectManager", "editProject");
      theFetch.projectid = that.proInfo.projectid;
      theFetch.projectname = that.proInfo.projectname;
      theFetch.content = that.proInfo.content;
      theFetch.picurl = that.choosedLogoUrl;
      theFetch.u = Utils.getValue("u"); // 当前登录人的userid
      theFetch.success = function(res) {
        if (res.state == 1) {
          callback(res);
        } else {
          this.$message.error(data.message);
        }
      };
      theFetch.executeAsync();
    },
    toSaveEdit() {
      //项目信息-修改
      this.$refs.formProinfo.validate(valid => {
        if (valid) {
          let that = this;
          //修改项目信息
          that.editProject(function(res) {
            //更改地址栏参数并跳转，以达到项目详情更新之后顶部项目名称会更新。另需更新左侧项目列表。
            that.$router.push({ name: "projectRelate", query: { projectid: that.proInfo.projectid, projectname: that.proInfo.projectname } });
            //请求左侧项目列表接口
            //。。。
          });
        }
      });
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      } else {
        return isLt2M;
      }
    },
    uploadSuccess(data) {
      //图片上传成功之后的回调
      if (data.resultcode == "232") {
        let filename = data.filename;
        filename = filename.substring(0, filename.lastIndexOf("."));
        let that = this;
        that.choosedLogoUrl = filename;
        that.editProject(function(res) {
          //图片修改修改成功
          console.log(that.choosedLogoUrl);
          that.proInfo.picurl =
            "http://" +
            config.appHost +
            config.appRoot +
            "/image?" +
            "module=common&service=File&method=view" +
            "&type=UserImg&fileName=" +
            filename +
            ".jpg&w=120&h=120&t=" +
            new Date().getTime();
        });
      } else {
        this.$message.error(data.resultmsg);
      }
    },
    searchPerson() {
      //搜索成员（项目设置-成员与权限）
      this.getPrjJoinnerList(this.currentProId, this.personquery);
    },
    handleSelectionChange(val) {
      // 拿到选中的
      this.multipleSelection = val;
    },
    sizeChangePerson(val) {
      //切换每页显示条数
      console.log(`项目设置-成员与权限-每页 ${val} 条`);
      //请求接口获取这个pageSize条数据
      this.pageSize = val;
      var projectid = this.$route.query.projectid;
      this.getPrjJoinnerList(projectid);
    },
    currChangePerson(val) {
      //翻页
      console.log(`项目设置-成员与权限-当前页: ${val}`);
      //请求接口获取下一页
      this.currPagePerson = val;
      var projectid = this.$route.query.projectid;
      this.getPrjJoinnerList(projectid);
    },
    demandAddMain() {
      //点击 创建需求（右上角）
      this.openModal("创建需求");
      this.handleType = "add";
      this.demandType = "main";
    },
    demandAddSub(demandId) {
      //在父需求下创建子需求,把当前需求id传过去添加需求的dialog
      this.openModal("创建子需求");
      this.formAddD.id = demandId;
      this.handleType = "add";
      this.demandType = "sub";
    },
    demandEdit(rows) {
      //编辑需求
      this.isDemandEdit = true;
      this.openModal("编辑需求");
      this.handleType = "edit";
      //获取需求详情
      this.queryDemand(rows.id);
    },
    demandDelete(index, rows, flag) {
      //删除需求
      let title = rows.title;
      this.$confirm(`你确定要删除需求【${title}】吗？`, "提示")
        .then(() => {
          this.deleteDemand(rows.id, data => {
            if (!flag) {
              this.queryDemandByProjectId(rows.projectid, this.pageSize, this.pageIndex);
            } else {
              this.queryDemandByParentId(rows.parentid);
            }
          });
        })
        .catch(() => {});
    },
    toEdit(id) {
      this.isDemandEdit = true;
      this.openModal("编辑需求");
      this.handleType = "edit";
      //获取需求详情
      this.queryDemand(id);
    },
    demandShowMore() {},
    getProjectDetail(projectid) {
      //获取项目详情
      let that = this;
      let theFetch = new fetch("pm", "ProjectManager", "getProjectDetail");
      theFetch.projectid = projectid;
      theFetch.u = Utils.getValue("u"); // 当前登录人的userid
      theFetch.success = function(data) {
        that.proInfo = {
          adminCount: data.adminCount,
          adminid: data.adminid,
          adminname: data.adminname,
          content: data.content,
          normalCount: data.normalCount,
          picurl:
            "http://" +
            config.appHost +
            config.appRoot +
            "/image?" +
            "module=common&service=File&method=view" +
            "&type=UserImg&fileName=" +
            data.picurl +
            ".jpg&w=120&h=120&t=" +
            new Date().getTime(),
          projectid: data.projectid,
          projectname: data.projectname,
          totalCount: data.totalCount,
        };
        if (!Utils.isNullorEmpty(data.picurl)) {
          that.isShowUploadTip = false;
        }
      };
      theFetch.executeAsync();
    },
    delProjectJoinner(id, callback) {
      //删除项目成员
      let theFetch = new fetch("pm", "ProjectManager", "delProjectJoinner");
      theFetch.ids = id;
      theFetch.u = Utils.getValue("u"); // 当前登录人的userid
      theFetch.success = res => {
        callback(res);
        this.$message.success(res.message);
      };
      theFetch.error = err => {
        this.$message.error(err);
      };
      theFetch.executeAsync();
    },
    personDelete(index, rows, list) {
      //删除项目成员
      let that = this;
      let name = rows.username;
      this.$confirm(`你确定要移除成员【${name}】吗？`, "提示").then(() => {
        this.delProjectJoinner(rows.id, data => {
          this.getPrjJoinnerList(that.currentProId, that.personquery);
        });
      });
    },
    personBatchDelete() {
      //批量删除项目成员
      let that = this;
      let ids = ""; //多个成员id
      let personSelected = that.multipleSelection;
      let flag = false; // 判断是否有管理员
      if (personSelected.length > 0) {
        let namesArr = [];
        let ids = personSelected.map(item => {
          if (item.roleid === "1") {
            flag = true;
          }
          namesArr.push(item.username);
          return item.id;
        });
        if (flag) {
          this.$message.warning("管理员不可被移除");
          return;
        }
        let names = namesArr.join(",");
        this.$confirm(`你确定要移除成员【${names}】吗？`, "提示").then(() => {
          that.delProjectJoinner(ids.join(","), function(data) {
            that.getPrjJoinnerList(that.currentProId, that.personquery);
          });
        });
      } else {
        that.$message.error("请先选择要移除的成员！");
      }
    },
    addProPerson(projectid) {
      //添加项目成员
      console.log(projectid);
      //初始化人员选择dialog
      this.$refs.projectAdd.openPersonDialog(projectid);
    },
    handerChange() {
      console.log(this.formAddD.handler);
    },
    proAddSuccess() {
      console.log("添加成功");
    },
  },
  computed: {
    // // 判断当前用户是不是当前项目的管理员
    isAdmin(){
      return localStorage.getItem("u") == this.currentProjectAdmin;
    },
    currentProId: function() {
      return this.$route.query.projectid;
    },
    currentProName: function() {
      return this.$route.query.projectname;
    },
    endTimeOpt: function() {
      let that = this;
      return {
        disabledDate(time) {
          let startTime = new Date(that.formAddD.prestarttime || 0);
          return time.getTime() < startTime.getTime();
        },
      };
    },
  },

  watch: {
    currentProId: function(val, oldval) {
      this.proInfo.projectid = val;
      //切换项目的时候
      if (this.isDemandList) {
        //请求需求列表
        this.queryDemandByProjectId(val, this.pageSize, this.pageIndex);
      } else if (this.isProjectEdit) {
        if (this.activeSettingName == "proSetting") {
          //请求项目详情
          this.getProjectDetail(this.currentProId);
        } else if (this.activeSettingName == "personAuthority") {
          this.handleList = [];
          this.getPrjJoinnerList(this.currentProId);
        } else {
        }
      }
    },
  },
};
</script>
