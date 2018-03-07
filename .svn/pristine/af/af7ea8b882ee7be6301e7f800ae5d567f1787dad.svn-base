<template>
  <div class="workplace">
    <div class="panel">
      <el-tabs v-model="projectType" type="card" @tab-click="_myProjectList">
        <el-tab-pane label="我的待办" name="1"></el-tab-pane>
        <el-tab-pane label="我的已办" name="2"></el-tab-pane>
        <el-tab-pane label="我创建的" name="3"></el-tab-pane>
      </el-tabs>
      <div class="project-list">
        <el-button :class="{active:currentProject === item}" type="text" v-for="item in projectList" :key="item.projectid" @click="_getDemandList(item)">
          <span class="title">{{item.projectname}}</span>
          <span class="count">({{item.num}})</span>
        </el-button>
      </div>
    </div>
    <div class="panel">
      <el-tabs v-model="pannel" type="card">
        <el-tab-pane :label="'需求 ('+ totalCount +')'" name="1"></el-tab-pane>
        <el-tab-pane label="缺陷 (0)" name="2">缺陷</el-tab-pane>
      </el-tabs>
      <div v-show="pannel == 1">
        <ecTableList  :params="initValue"  @dataChange="_dataChange" v-show="projectList.length > 0">
            <el-table-column label="标题">
              <template slot-scope="scope">
                <el-button type="text" size="mini" @click.prevent="_toDetail(scope.row)">{{scope.row.title}}</el-button>
              </template>
            </el-table-column>
            <el-table-column width="120" label="状态">
              <template slot-scope="scope">
                <span>{{stateList[scope.row.state]}}</span>
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
          </ecTableList>
      </div>
    </div>
  </div>
</template>
<script>
import { $http, $dataFormat, $formatDate } from "@/pages/projects/common/js/util";
import ecTableList from "@/pages/projects/components/ec-table-list";
export default {
  components: {
    ecTableList,
  },
  data() {
    return {
      currentProject: {},
      pannel: "1", // 需求和缺陷面板选择
      projectType: "1", // 当前项目类型
      projectList: [], // 项目列表
      totalCount: 0, //需求总数
      initValue: {
        //表格的参数
        method: "queryDemandByProjectId",
        service: "Demand",
        projectid: "",
      },
      stateList: {
        0: "待规划",
        1: "规划中",
        2: "开发中",
        3: "测试中",
        4: "已完成",
        5: "已上线",
      },
    };
  },
  created() {
    this._myProjectList();
  },
  filters: {
    // 格式化日期
    formatDate(date) {
      return $formatDate(date);
    },
  },
  methods: {
    // 1、获取项目列表
    _myProjectList(projecttype) {
      let params = { method: "myProjectListByType", projecttype: this.projectType };
      if(this.projectType === "3"){
        params = { method: "myCreateProjectList"};
      }
      console.log(params);
      $http(params).then(res => {
        let projectList = $dataFormat(res.projectlist);
        this.projectList = projectList;
        if (projectList.length > 0) {
          this.currentProject = projectList[0];
          this.initValue.projectid = projectList[0].projectid; //默认项目,赋值刷新列表
          this.$emit("refresh"); // 通知子组件刷新需求列表；
        } else {
          this.totalCount = 0;
        }
      });
    },
    // 刷新需求列表
    _getDemandList(row) {
      this.currentProject = row;
      this.initValue.projectid = row.projectid;
      this.$emit("refresh");
    },
    _dataChange(res) {
      this.totalCount = res.totalCount;
    },
    _toDetail(row) {
      this.$router.push({
        name: "demandDetail",
        query: {
          projectid: this.currentProject.projectid,
          projectname: this.currentProject.projectname,
          id: row.id,
        },
      });
    },
  }
};
</script>
<style lang="scss" scoped>
.workplace {
  .panel {
    padding: 20px;
    background-color: #fff;
    border-radius: 5px;
    margin-bottom: 20px;
    .project-list .el-button {
      &.active .title{
        color:#01cd78;
      }
      .title {
        color: #333;
      }
      .count {
        color: #01cd78;
      }
    }
  }
}
</style>
