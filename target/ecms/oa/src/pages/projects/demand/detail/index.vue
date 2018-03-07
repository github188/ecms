<template>
  <div class="project-detail">
    <p class="title">
      <span>{{$route.query.projectname}}</span>
      <i class="fa fa-pencil-square-o" @click="_toProjectDetail"></i>
    </p>
    <el-tabs v-model="projectType" type="card">
      <el-tab-pane label="需求 " name="1"></el-tab-pane>
      <el-tab-pane label="缺陷" name="2">缺陷</el-tab-pane>
      <el-tab-pane label="文档" name="3">文档</el-tab-pane>
      <el-tab-pane label="报表" name="4">报表</el-tab-pane>
    </el-tabs>
    <div v-if="projectType == 1">
      <div class="action">
        <el-button type="primary" size="mini" @click="_edit">编辑</el-button>
        <el-button type="primary" size="mini">更多</el-button>
      </div>
      <div class="detail-panel">
        <div class="title">
          <span>{{detail.title}}</span>
          <span class="status">ID：{{detail.id}}&nbsp;&nbsp; 状态：{{stateList[detail.state]}}</span>
        </div>
        <div class="content">
          <div class="info">
            <div class="item-title">
              <i class="fa fa-file-text-o"></i>
              <span>详细信息</span>
              <p>{{detail.detailinfo}}</p>
            </div>
          </div>
          <div class="describe">
            <div class="item-title">
              <i class="el-icon-setting"></i>
              <span>详细描述</span>
              <el-row>
                <el-col :span="4">父需求</el-col>
                <el-col :span="20">{{detail.parentname}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="4">优先级</el-col>
                <el-col :span="20">{{detail.urgencydegree}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="4">当前处理人</el-col>
                <el-col :span="20">{{detail.realname}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="4">预计开始</el-col>
                <el-col :span="20">{{detail.prestarttime | formatDate}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="4">预计结束</el-col>
                <el-col :span="20">{{detail.preendtime | formatDate}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="4">创建人</el-col>
                <el-col :span="20">{{detail.creator}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="4">创建时间</el-col>
                <el-col :span="20">{{detail.createtime | formatDate}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="4">完成时间</el-col>
                <el-col :span="20">{{detail.finishtime | formatDate}}</el-col>
              </el-row>
            </div>
          </div>
        </div>
      </div>
    </div>
    <demandEdit :dialogInfo="dialogInfo" @addSuccess="_queryDemand" @subAddSuccess="_queryDemand"></demandEdit>
  </div>
</template>
<script>
import { $http, $dataFormat, $formatDate } from "@/pages/projects/common/js/util";
import demandEdit from "../edit";
export default {
  components: {
    demandEdit,
  },
  data() {
    return {
      projectType: "1",
      detail: {},
      stateList: {
        0: "待规划",
        1: "规划中",
        2: "开发中",
        3: "测试中",
        4: "已完成",
        5: "已上线",
      },
      dialogInfo: {
        show: false,
        parentid: "",
        id: "",
        title: "编辑需求",
      },
    };
  },
  filters: {
    formatDate(date) {
      return $formatDate(date);
    },
  },
  created() {
    this._queryDemand();
  },
  methods: {
    // 获取需求详情
    _queryDemand() {
      let params = {
        method: "queryDemand",
        service: "Demand",
        id: this.$route.query.id,
      };
      $http(params).then(res => {
        this.detail = $dataFormat(res)[0];
      });
    },
    // 编辑
    _edit() {
      this.dialogInfo.show = true;
      this.dialogInfo.id = this.$route.query.id;
    },
    // 项目详情
    _toProjectDetail(){
      this.$router.push({
        name: "projectDetail",
        query: {
          projectid: this.$route.query.projectid,
        },
      });
    }
  },
};
</script>
<style lang="scss" scoped>
.project-detail {
  font-size: 14px;
  padding: 20px;
  background-color: #fff;
  .action {
    height: 30px;
    margin-bottom: 10px;
    .el-button {
      float: right;
      padding: 5px 10px;
      margin-left: 10px;
    }
  }
  p.title {
    border-left: 3px solid #01cd78;
    padding-left: 8px;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    margin-bottom: 20px;
    .fa {
      font-size: 16px;
      cursor: pointer;
    }
  }
  .detail-panel {
    border: 1px solid #ddd;
    .el-icon-setting,
    .fa {
      color: #01cd78;
    }
    .title {
      font-size: 16px;
      padding: 0 10px;
      height: 50px;
      line-height: 50px;
      background-color: #eee;
      .status {
        float: right;
        font-size: 14px;
      }
    }
    .content {
      padding: 10px;
      min-height: 300px;
      .info {
        padding: 10px;
        float: left;
        width: 50%;
        p {
          padding: 20px;
          text-indent: 2em;
          line-height: 30px;
          color: #333;
        }
      }
      .describe {
        padding: 10px;
        float: left;
        width: 50%;
        color: #333;
        .el-row {
          margin: 10px;
          .el-col:first-child {
            color: #999;
          }
        }
      }
    }
  }
}
</style>
