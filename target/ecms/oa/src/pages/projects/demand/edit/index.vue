<template>
  <div class="demand-edit" >
    <el-dialog :title="dialogInfo.title" :visible.sync="dialogInfo.show" @open="_onOpen" @close="_onClose">
      <el-form :model="formData" label-width="100px" :rules="rules" ref="ruleForm">
        <el-form-item label="需求名称" prop="title">
          <el-input v-model="formData.title" placeholder=""></el-input>
        </el-form-item>
        <el-form-item label="需求说明" prop="detailinfo">
          <el-input type="textarea" :rows="4" v-model="formData.detailinfo" placeholder=""></el-input>
        </el-form-item>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="优先级" prop="urgencydegree">
              <el-select v-model="formData.urgencydegree" placeholder="">
                <el-option v-for="item in drops.level" :value="item" :key="item" :label="item"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="当前处理人" prop="handler">
              <el-select v-model="formData.handler" placeholder="">
                <el-option v-for="item in drops.personList" :key="item.userid" :value="item.userid" :label="item.username"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预计开始" prop="prestarttime">
              <el-date-picker class="" :editable="false" :picker-options="startTimeOpt" @change="_startChange" v-model="formData.prestarttime" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="预计结束" prop="preendtime">
              <el-date-picker class="" :editable="false" :picker-options="endTimeOpt" v-model="formData.preendtime" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label="当前状态" prop="state" v-if="this.dialogInfo.id" class="demand-state">
          <el-radio-group v-model="formData.state">
            <el-radio v-for="(value,key) in drops.stateList" :key="key" :label="key">{{value}}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogInfo.show = false">取 消</el-button>
        <el-button type="primary" @click="_submit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { $http, $dataFormat, $formatDate } from "@/pages/projects/common/js/util";
export default {
  props: {
    dialogInfo: {
      type: Object,
      default() {
        return {
          show: false,
          id: "", //需求id;
          parentid: "", //父需求id
          title: "添加需求",
        };
      },
    },
  },
  data() {
    return {
      formData: {
        title: "",
        prestarttime: "",
        preendtime: "",
        handler: "",
        urgencydegree: "",
        detailinfo: "",
        state: "0",
      },
      // 下拉框选项
      drops: {
        level: ["紧急", "高", "中", "低", "无关紧要"],
        stateList: {
          0: "待规划",
          1: "规划中",
          2: "开发中",
          3: "测试中",
          4: "已完成",
          5: "已上线",
        },
        personList: [],
      },
      rules: {
        title: { required: true, message: "项目名称不能为空!" },
        detailinfo: { required: true, message: "项目描述不能为空!" },
        urgencydegree: { required: true, message: "请选择优先级!" },
        handler: { required: true, message: "请选择当前操作人!" },
        prestarttime: { required: true, message: "请选择预计开始时间!" },
        preendtime: { required: true, message: "请选择预计结束时间!" },
      },
      // 开始日期选项
      startTimeOpt: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7;
        },
      },
    };
  },
  computed: {
    // 结束日期选项
    endTimeOpt: function() {
      let that = this;
      return {
        disabledDate(time) {
          let startTime = new Date(that.formData.prestarttime || 0);
          return time.getTime() < startTime.getTime();
        },
      };
    },
  },
  methods: {
    // 打开时
    _onOpen() {
      this._getPrjJoinnerList();
      if (this.dialogInfo.id) {
        //编辑
        this.dialogInfo.title = "编辑需求";
        this._queryDemand();
      }
      if (this.dialogInfo.parentid) {
        this.dialogInfo.title = "编辑子需求";
      }
    },
    // 关闭时
    _onClose() {
      this.$refs.ruleForm.resetFields();
      this.dialogInfo.id = "";
      this.dialogInfo.parentid = "";
      this.dialogInfo.title = "添加需求";
      this.formData.state = "0";
    },
    // 开始时间变化,如果开始时间大于结束时间，结束时间等于开始时间
    _startChange(){
      if(this.formData.prestarttime > this.formData.preendtime){
        this.formData.preendtime = this.formData.prestarttime
      };
    },
    // 获取项目参与人
    _getPrjJoinnerList() {
      let projectid = this.$route.query.projectid;
      $http({ method: "getPrjJoinnerList", projectid, isPage: 0 }).then(res => {
        this.drops.personList = $dataFormat(res.datalist);
      });
    },
    // 提交请求
    _submit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let params = {
            service: "Demand",
            method: "createDemand",
            ...this.formData,
          };
          if (this.dialogInfo.id) {
            // 更新需求
            params.id = this.dialogInfo.id;
            params.method = "updateDemand";
          }
          if (this.dialogInfo.parentid) {
            //子需求
            params.parentid = this.dialogInfo.parentid;
          } else {
            // 父需求
            params.projectid = this.$route.query.projectid;
          }
          params.prestarttime = new Date(params.prestarttime).getTime();
          params.preendtime = new Date(params.preendtime).getTime();
          $http(params, { error: true }).then(res => {
            this.dialogInfo.show = false;
            this.$message.success(res.message);
            if (this.dialogInfo.parentid) {
              console.log("子需求添加成功");
              this.$emit("subAddSuccess", this.dialogInfo.parentid);
            } else {
              console.log("父需求添加成功");
              this.$emit("addSuccess");
            }
          });
        }
      });
    },
    // 获取需求详情
    _queryDemand() {
      let params = {
        method: "queryDemand",
        service: "Demand",
        id: this.dialogInfo.id,
      };
      $http(params).then(res => {
        let { title, prestarttime, preendtime, projectid, handler, urgencydegree, detailinfo, state } = $dataFormat(res)[0];
        prestarttime = new Date(Number(prestarttime));
        preendtime = new Date(Number(preendtime));
        this.formData = { title, prestarttime, preendtime, projectid, handler, urgencydegree, detailinfo, state };
      });
    },
  },
};
</script>
