<template>
  <div>
    <v-panel>
      <el-tabs v-model="activeTabOfPro" type="card" @tab-click="handleClick">
        <el-tab-pane label="我的待办" name="1">
          <div class="items">
            <el-button :class="{active:currentPro.projectid==item.projectid}" type="text" v-for="(item,index) in proList" :key="index" @click.native.prevent="sendSinglePro(item,1)">
              <span class="pro-name">{{item.projectname}}</span>
              <span class="demand-count">({{item.num}})</span>
            </el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="我的已办" name="2">
          <div class="items">
            <el-button :class="{active:currentPro.projectid==item.projectid}" type="text" v-for="(item,index) in proList" :key="index" @click.native.prevent="sendSinglePro(item,2)">
              <span class="pro-name">{{item.projectname}}</span>
              <span class="demand-count">({{item.num}})</span>
            </el-button>
          </div>
        </el-tab-pane>
        <el-tab-pane label="我创建的" name="3">
          <div class="items">
            <el-button :class="{active:currentPro.projectid==item.projectid}" type="text" v-for="(item,index) in proList" :key="index" @click.native.prevent="sendSinglePro(item,3)">
              <span class="pro-name">{{item.projectname}}</span>
              <span class="demand-count">({{item.num}})</span>
            </el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </v-panel>
    <v-panel>
      <el-tabs v-model="activeTab" type="card">
        <el-tab-pane :label="'需求('+demandCount+')'" name="demandTab">
          <el-table :data="demandList" border style="width: 100%">
            <!-- <el-table-column width="180" prop="id" show-overflow-tooltip label="ID">
            </el-table-column> -->
            <el-table-column label="标题">
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click.prevent="showDemandDetail(scope.row)">{{scope.row.title}}</el-button>
              </template>
            </el-table-column>
            <el-table-column width="120" label="状态">
              <template slot-scope="scope">
                <span>{{scope.row.state | formatState}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="urgencydegree" width="180" label="优先级">
            </el-table-column>
            <el-table-column prop="realname" width="180" label="处理人">
            </el-table-column>
            <el-table-column width="180" label="预计结束">
              <template slot-scope="scope">
                <span>{{scope.row.preendtime | formatDate}}</span>
              </template>
            </el-table-column>
            <!-- <el-table-column label="操作">
                            <template slot-scope="scope">
                              <el-button type="text" size="mini" @click="demandEdit(scope.row)">编辑</el-button>
                              <el-button type="text" size="mini" @click="demandDelete(scope.$index, scope.row,demandList)">删除</el-button>
                            </template>
                          </el-table-column> -->
          </el-table>
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page.pageIndex" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="page.totalCount">
          </el-pagination>

        </el-tab-pane>
        <el-tab-pane label="缺陷" name="bugTab">
          缺陷
        </el-tab-pane>
      </el-tabs>
    </v-panel>

    <!--编辑需求 begin-->
    <el-dialog title="编辑需求" :visible.sync="isShowDemandDialog" :modal="isShowDemandDialog" size="small" :before-close="closeDemandAddDialog">
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
              <el-select v-model="formAddD.handler" filterable placeholder="请选择">
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
        <el-form-item label="当前状态" prop="state" class="demand-state">
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
    <!--编辑需求 end-->
  </div>
</template>

<style scoped>
.items {
  padding: 10px 0;
}

.items a {
  display: inline-block;
  margin-right: 40px;
  font-size: 14px;
}

.items .pro-name {
  color: #333;
}

.items .demand-count {
  color: #01cd78;
}
.items .el-button.active span{
  color:#01cd78;
}
.btn-handle {
  padding-right: 5px;
}
</style>
<script>
export default {
  name: "workspace",
  data() {
    return {
      activeTabOfPro: "1",
      activeTab: "demandTab",
      theCount: 0,
      currentPro: "",
      proList: [],
      demandCount: 0,
      demandList: [],
      isShowDemandDialog: false,
      formAddD: {
        id: "",
        title: "",
        prestarttime: "",
        preendtime: "",
        projectid: "",
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
      page: {
        pageIndex: 1,
        pageSize: 10,
        totalCount: 0,
      },
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
      endTimeOpt: {
        disabledDate: time => {
          return time.getTime() < this.formAddD.startTime;
        },
      },
      handleList: [],
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
    this.myProjectListByType(1, () => {
      if (this.proList.length > 0) {
        this.currentPro = this.proList[0];
        this.queryDemandByProjectId(this.proList[0].projectid, this.page.pageSize, this.page.pageIndex, this.activeTabOfPro);
      }
    }); //默认获取待办项目
  },
  methods: {
    handleClick() {
      if (this.activeTabOfPro == "1" || this.activeTabOfPro == "2") {
        this.myProjectListByType(this.activeTabOfPro, () => {
          if (this.proList.length > 0) {
            this.currentPro = this.proList[0];
            this.queryDemandByProjectId(this.proList[0].projectid, this.page.pageSize, this.page.pageIndex, this.activeTabOfPro);
          }
        });
      } else {
        this.myCreateProjectList();
      }
    },
    sendSinglePro(item, state) {
      this.currentPro = item;
      this.queryDemandByProjectId(item.projectid, this.page.pageSize, this.page.pageIndex, state);
    },
    queryDemandByProjectId(projectid, pageSize, pageIndex, state) {
      //查询项目下的所有父级需求
      let that = this;
      this.demandList = [];
      this.page = { pageIndex: 1, pageSize: 10, totalCount: 0 };
      let theFetch = new fetch("pm", "Demand", "queryDemandByProjectId");
      theFetch.projectid = projectid;
      theFetch.isPage = 1;
      theFetch.pageSize = pageSize;
      theFetch.pageIndex = pageIndex;
      if (state == 3) {
        //我创建的
        theFetch.type = "mine"; //我创建的
      } else {
        theFetch.state = state; //待办、已办
      }
      theFetch.u = Utils.getValue("u"); // 当前登录人的userid
      theFetch.success = function(res) {
        if (res.state == 1) {
          var rslen = res.rs.length;
          that.total = rslen;
          that.totalDemandList = rslen;
          if (rslen > 0) {
            that.demandList = Utils.dataFormat(res);
            let { pageIndex, pageSize, totalCount } = res;
            that.demandCount = totalCount;
            that.page = { pageIndex, pageSize, totalCount };
          }
        }
      };
      theFetch.executeAsync();
    },
    myProjectListByType(projectType, callback) {
      //获取待办、已完成的项目列表
      let that = this;
      this.demandList = [];
      this.page = { pageIndex: 1, pageSize: 10, totalCount: 0 };
      let theFetch = new fetch("pm", "ProjectManager", "myProjectListByType");
      theFetch.projecttype = projectType; // 待办、已办
      theFetch.u = Utils.getValue("u"); // 当前登录人的userid
      theFetch.success = function(data) {
        that.proList = Utils.dataFormat(data.projectlist);
        callback && callback();
      };
      theFetch.executeAsync();
    },
    myCreateProjectList() {
      //获取我创建的项目列表
      let that = this;
      let theFetch = new fetch("pm", "ProjectManager", "myCreateProjectList");
      theFetch.u = Utils.getValue("u"); // 当前登录人的userid
      theFetch.success = function(data) {
        that.proList = [];
        that.demandList = [];
        that.proList = Utils.dataFormat(data.projectlist);
        if (that.proList.length > 0) {
          that.queryDemandByProjectId(that.proList[0].projectid, that.page.pageSize, that.page.pageIndex, this.activeTabOfPro);
        }
      };
      theFetch.executeAsync();
    },
    handleSizeChange(val) {
      this.queryDemandByProjectId(this.currentPro.projectid, val, this.page.pageIndex, this.activeTabOfPro);
    },
    handleCurrentChange(val) {
      this.queryDemandByProjectId(this.currentPro.projectid, this.page.pageSize, val, this.activeTabOfPro);
    },
    closeDemandAddDialog() {
      this.isShowDemandDialog = false;
    },
    queryDemand(demandId) {
      //查询需求详情
      let that = this;
      let theFetch = new fetch("pm", "Demand", "queryDemand");
      theFetch.id = demandId;
      theFetch.u = Utils.getValue("u"); // 当前登录人的userid
      theFetch.success = function(res) {
        if (res.state == 1) {
          var rslen = res.rs.length;
          if (rslen > 0) {
            let data = Utils.dataFormat(res);
            that.formAddD = data[0];
          } else {
            that.$message.error(res.message);
          }
        }
      };
      theFetch.executeAsync();
    },
    deleteDemand(demandId, callback) {
      let that = this;
      //删除需求
      let theFetch = new fetch("pm", "Demand", "deleteDemand");
      theFetch.id = demandId;
      theFetch.u = Utils.getValue("u"); // 当前登录人的userid
      theFetch.success = function(data) {
        callback && callback(data);
        that.$message.success(data.message);
      };
      theFetch.executeAsync();
    },
    demandEdit(rows) {
      //编辑需求
      this.isShowDemandDialog = true;
      this.resetForm("demandAddForm");
      this.queryDemand(rows.id);
    },
    demandDelete(index, rows, list) {
      //删除需求
      this.$confirm("此操作将永久删除需求, 是否继续?", "提示").then(() => {
        this.deleteDemand(rows.id, () => {
          this.myProjectListByType(this.activeTabOfPro, () => {
            this.queryDemandByProjectId(rows.projectid, this.page.pageSize, this.page.pageIndex, this.activeTabOfPro);
          });
        });
      });
    },
    showDemandDetail(row) {
      console.log(row);
      //点击需求列表里的标题
      this.$router.push({
        path: "projectRelate",
        query: { projectid: row.projectid, demandid: row.id, jumpfrom: "myWorkspaceManage", projectname: this.currentPro.projectname },
      });
    },
    demandSubmit() {
      this.$refs.demandAddForm.validate(valid => {
        //验证通过，这里进行提交
        if (valid) {
          let that = this;
          let theFetch = new fetch("pm", "Demand", "updateDemand");
          theFetch.title = that.formAddD.title;
          theFetch.prestarttime = that.formAddD.prestarttime;
          theFetch.preendtime = that.formAddD.preendtime;
          theFetch.handler = that.formAddD.handler;
          theFetch.urgencydegree = that.formAddD.urgencydegree;
          theFetch.state = that.formAddD.state;
          theFetch.detailinfo = that.formAddD.detailinfo;
          if (!Utils.isNullorEmpty(that.formAddD.id)) {
            //如果有需求id，说明不是修改需求就是在父需求下添加子需求
            theFetch.id = that.formAddD.id;
          }
          theFetch.u = Utils.getValue("u"); // userid
          theFetch.success = function(res) {
            if (res.state == 1) {
              that.demandType = "";
              that.demandId = "";
              that.isShowDemandDialog = false;
              that.$message.success(res.message);
              // // 刷新父需求列表;
              that.queryDemandByProjectId(that.currentPro.projectid, that.page.pageSize, that.page.pageIndex, that.activeTabOfPro);
            } else {
              that.$message.error(res.message);
            }
          };
          theFetch.executeAsync();
        }
      });
    },
  },
};
</script>
