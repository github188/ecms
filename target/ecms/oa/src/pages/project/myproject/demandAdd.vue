<template>
  <div>
    <!--添加需求 begin-->
    <el-dialog :title="title" :visible.sync="isShowDemandDialog" :modal="isShowDemandDialog" size="small">
      <el-form ref="demandAddForm" :model="formAddD" :rules="rules" label-width="110px" label-position="right" class="demandadd-form">
        <el-form-item label="需求名称" prop="demandName">
          <el-input v-model="formAddD.demandName"></el-input>
        </el-form-item>
        <el-form-item label="详细说明" prop="demandContent">
          <el-input :autosize="{ minRows: 6, maxRows: 12}" type="textarea" v-model="formAddD.demandContent"></el-input>
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
            <el-form-item label="当前处理人" prop="handlePerson">
              <el-select v-model="formAddD.handlePerson" filterable placeholder="请选择">
                <el-option v-for="item in handleList" :key="item.userid" :label="item.username" :value="item.userid">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="预计开始" prop="startTime">
              <!--<el-input v-model="formAddD.startTime"></el-input>-->
              <el-date-picker class="" :editable="false" :picker-options="startTimeOpt" v-model="formAddD.startTime" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预计结束" prop="endTime">
              <!--<el-input v-model="formAddD.endTime"></el-input>-->
              <el-date-picker class="" :editable="false" :picker-options="endTimeOpt" v-model="formAddD.endTime" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="当前状态" prop="state" v-if="isEdit" class="demand-state">
          <el-radio-group v-model="rdoValue">
            <el-radio v-for="item in formAddD.state" :key="item.value" :label="item.label">{{item.text}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowDemandDialog = false">取 消</el-button>
        <el-button type="primary" @click="demandSubmit">提 交</el-button>
      </div>
    </el-dialog>
    <!--添加需求 end-->
  </div>
</template>

<style>
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
export default {
  name: "demandAdd",
  props: ["title", "proId", "isEdit"],
  data() {
    return {
      isShowDemandDialog: false,
      formAddD: {
        demandName: "",
        demandContent: "",
        urgencydegree: "",
        handlePerson: "",
        startTime: "",
        endTime: "",
        state: [
          {
            label: 0,
            text: "待规划",
          },
          {
            label: 1,
            text: "规划中",
          },
          {
            label: 2,
            text: "开发中",
          },
          {
            label: 3,
            text: "测试中",
          },
          {
            label: 4,
            text: "已完成",
          },
          {
            label: 5,
            text: "已上线",
          },
        ],
      },
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
        demandName: {
          required: true,
          message: "项目名称不能为空!",
        },
        demandContent: {
          required: true,
          message: "项目背景不能为空!",
        },
        urgencydegree: {
          required: true,
          message: "请选择优先级!",
        },
        handlePerson: {
          required: true,
          message: "请选择当前操作人!",
        },
        startTime: {
          required: true,
          message: "请选择预计开始时间!",
        },
        endTime: {
          required: true,
          message: "请选择预计结束时间!",
        },
      },
      demandType: "", //需求类型：父、子
      demandId: "",
      rdoValue: 2,
      startTimeOpt: {
        disabledDate: time => {
          return time.getTime() < Date.now() - 8.64e7 || time.getTime() > this.formAddD.endTime;
        },
      },
      endTimeOpt: {
        disabledDate: time => {
          return time.getTime() < Date.now() - 8.64e7 || time.getTime() < this.formAddD.startTime;
        },
      },
      handleList: [],
    };
  },
  methods: {
    openModal(demandType, demandId) {
      console.log(this.isEdit);
      //是修改需求
      if (this.isEdit == true) {
        console.log("修改需求，即将加载需求详情");
        this.$parent.queryDemand(demandId, function(data) {
          console.log(data);
        });
      } else {
        //是添加需求
        if (demandType == "sub") {
          //有值代表是在父需求下创建子需求
          if (demandId != null && demandId != "" && demandId != undefined) {
            this.demandId = demandId;
            console.log("当前需求id：" + this.demandId);
          }
        }
        this.demandType = demandType;
        this.resetForm("demandAddForm");
      }
      this.isShowDemandDialog = true;
      this.getPrjJoinnerList(); //获取项目成员列表
    },
    getPrjJoinnerList() {
      //获取项目参与人列表
      let that = this;
      let theFetch = new fetch("pm", "ProjectManager", "getPrjJoinnerList");
      theFetch.projectid = this.proId;
      theFetch.isPage = 0;
      theFetch.success = function(data) {
        if (data.state == 1) {
          let res = data.datalist;
          var rslen = res.rs.length;
          if (rslen > 0) {
            Utils.renderFs(res);
            for (var i = 0; i < rslen; i++) {
              var row = res.rs[i],
                username = Utils.getRowValue(row, "username"),
                userid = Utils.getRowValue(row, "userid"),
                roleid = Utils.getRowValue(row, "roleid"),
                orgname = Utils.getRowValue(row, "orgname"),
                email = Utils.getRowValue(row, "email"),
                post = Utils.getRowValue(row, "post"),
                loginname = Utils.getRowValue(row, "loginname");
              that.handleList.push({
                username: username,
                userid: userid,
                roleid: roleid,
                orgname: orgname,
                email: email,
                post: post,
                loginname: loginname,
              });
            }
          }
        } else {
          that.$message.error(data.message);
        }
      };
      theFetch.executeAsync();
    },
    demandSubmit() {
      this.$refs.demandAddForm.validate(valid => {
        //验证通过，这里进行提交
        if (valid) {
          let requestMethod = "";
          //如果是编辑需求，即this.isEdit是true，则调编辑接口
          if (!Utils.isNullorEmpty(this.isEdit) && this.isEdit) {
            requestMethod = "updateDemand";
          } else {
            requestMethod = "createDemand";
          }
          let that = this;
          let theFetch = new fetch("pm", "Demand", requestMethod);
          theFetch.title = that.formAddD.demandName;
          theFetch.prestarttime = that.formAddD.startTime;
          theFetch.preendtime = that.formAddD.endTime;
          if (that.demandType == "main") {
            theFetch.projectid = that.proId;
          } else if (that.demandType == "sub") {
            theFetch.parentid = that.demandId;
          }
          theFetch.handler = that.formAddD.handlePerson;
          theFetch.urgencydegree = that.formAddD.urgencydegree;
          theFetch.state = "0"; //待规划
          theFetch.detailinfo = that.formAddD.demandContent;
          theFetch.u = Utils.getValue("u"); // userid
          //如果有需求id，说明不是修改需求就是在父需求下添加子需求
          if (!Utils.isNullorEmpty(that.demandId)) {
            theFetch.id = that.demandId;
          }
          theFetch.success = function(res) {
            console.log(res);
            if (res.state == 1) {
              that.demandType = "";
              that.demandId = "";
              that.isShowDemandDialog = false;
              //刷新父需求列表
              that.$parent.queryDemandByProjectId(that.$parent.currentProId, that.$parent.pageSize, that.$parent.pageIndex);
            } else {
              that.$message.error(data.message);
            }
          };
          theFetch.executeAsync();
        }
      });
    },
  },
};
</script>
