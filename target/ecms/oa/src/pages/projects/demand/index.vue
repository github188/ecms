<template>
  <div class="demand-list">
    <el-row>
      <el-col :span="12">
        <p class="title" >
          <span>{{$route.query.projectname}}</span>
          <i class="fa fa-pencil-square-o" @click="_toProjectDetail"></i>
        </p>
      </el-col>
      <el-col :span="4" :offset="7">
        <el-input placeholder="搜索" icon="search" v-model="keywords" :on-icon-click="_queryDemandByProjectId"></el-input>
      </el-col>
    </el-row>
    <el-tabs v-model="projectType" type="card">
      <el-tab-pane label="需求" name="1"></el-tab-pane>
      <el-tab-pane label="缺陷" name="2">缺陷</el-tab-pane>
      <el-tab-pane label="文档" name="3">文档</el-tab-pane>
      <el-tab-pane label="报表" name="4">报表</el-tab-pane>
    </el-tabs>
    <div v-show="projectType == 1">
        <el-row>
          <el-col :span="2" :offset="22">
            <el-button type="success" @click.prevent="dialogInfo.show=true">创建需求</el-button>
          </el-col>
        </el-row>
        <el-table :data="demandList" border style="width: 100%;" class="main-table" @expand="_expand">
          <!--扩展子需求表格 begin-->
          <el-table-column type="expand">
            <template slot-scope="props">
              <el-table  :data="subDemandList[props.row.id]" v-loading="loading" :show-header="false" empty-text="暂无子需求" ref="subDemandList" class="sub-table" style="width: 100%;">
                <el-table-column type="index" width="57">
                </el-table-column>
                <el-table-column label="标题">
                  <template slot-scope="scope">
                    <el-button type="text" size="mini" @click="_toDetail(scope.row)">{{scope.row.title}}</el-button>
                  </template>
                </el-table-column>
                <el-table-column width="120" label="状态">
                  <template slot-scope="scope">
                    <span>{{stateList[scope.row.state]}}</span>
                  </template>
                </el-table-column>
                <el-table-column prop="urgencydegree" width="120" label="优先级">
                </el-table-column>
                <el-table-column prop="realname" width="140" label="处理人">
                </el-table-column>
                <el-table-column width="140" label="预计结束">
                  <template slot-scope="scope">
                    <span>{{scope.row.preendtime | formateDate}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="操作" width="169">
                  <template slot-scope="scope">
                    <el-button  type="text" size="mini" @click="_edit(scope.row)">编辑</el-button>
                    <el-button  type="text" size="mini" @click="_delete(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </template>
          </el-table-column>
          <!--扩展子需求表格 end-->
          <el-table-column label="标题">
            <template slot-scope="scope">
              <el-button type="text" size="mini" @click="_toDetail(scope.row)">{{scope.row.title}}</el-button>
            </template>
          </el-table-column>
          <el-table-column width="120" label="状态">
            <template slot-scope="scope">
              <span>{{stateList[scope.row.state]}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="urgencydegree" width="120" label="优先级">
          </el-table-column>
          <el-table-column prop="realname" width="140" label="处理人">
          </el-table-column>
          <el-table-column width="140" label="预计结束">
            <template slot-scope="scope">
              <span>{{scope.row.preendtime | formateDate}}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="170">
            <template slot-scope="scope">
              <el-button @click="_edit(scope.row)" size="mini" type="text">编辑</el-button>
              <el-button @click.prevent="_addSubDemand(scope.row);" size="mini" type="text">新增</el-button>
              <el-button @click="_delete(scope.row)" size="mini" type="text">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination @size-change="_sizeChange" @current-change="_pageChange" :current-page="page.pageIndex" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="page.totalCount">
        </el-pagination>
    </div>
    <demandEdit :dialogInfo="dialogInfo" @addSuccess="_queryDemandByProjectId" @subAddSuccess="_queryDemandByParentId"></demandEdit>
  </div>
</template>
<script>
import demandEdit from "./edit";
import { $http, $dataFormat, $formatDate } from "@/pages/projects/common/js/util";
export default {
  components: {
    demandEdit,
  },
  data() {
    return {
      loading: false, // 加载中
      projectType: "1",
      dialogInfo: {
        show: false,
        parentid: "",
        id: "",
        title: "添加需求",
      },
      keywords: "",
      demandList: [], //需求列表
      subDemandList: {},
      page: { // 分页信息
        pageIndex: 1,
        pageSize: 10,
        totalCount: 0,
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
  filters: {
    // 格式化日期
    formateDate(date) {
      return $formatDate(date);
    },
  },
  mounted() {
    this._queryDemandByProjectId();
  },
  beforeRouteUpdate(to, from, next) {
    this.page = { pageIndex: 1, pageSize: 10, totalCount: 0 };
    next();
    this._queryDemandByProjectId();
  },
  methods: {
    _pageChange(val){
      this.page.pageIndex = val;
      this._queryDemandByProjectId();
    },
    _sizeChange(val){
      this.page.pageSize = val;
      this._queryDemandByProjectId();
    },
    // 获取需求列表
    _queryDemandByProjectId() {
      let { pageIndex, pageSize } = this.page;
      let params = {
        method: "queryDemandByParam",
        service: "Demand",
        isPage: 1,
        projectid: this.$route.query.projectid,
        param: this.keywords,
        pageIndex,
        pageSize,
      };
      $http(params).then(res => {
        // 给每个item添加一个subDemandList，用于存储子需求
        this.demandList = $dataFormat(res).map(item => {
          item.subDemandList = [];
          return item;
        });
        let { pageIndex, pageSize, totalCount } = res;
        this.page = { pageIndex, pageSize, totalCount };
      });
    },
    // 获取子需求列表
    _queryDemandByParentId(id) {
      let params = { method: "queryDemandByParentId", service: "Demand", parentid: id };
      this.loading = true;
      $http(params).then(res => {
        this.loading = false;
        let subDemandList = $dataFormat(res);
        this.$set(this.subDemandList, id, subDemandList);
      });
    },
    // 编辑需求
    _edit(row) {
      this.dialogInfo.show = true;
      this.dialogInfo.id = row.id;
      this.dialogInfo.parentid = row.parentid;
    },
    // 添加子需求；
    _addSubDemand(row) {
      this.dialogInfo.show = true;
      this.dialogInfo.parentid = row.id;
      let demandName = row.title;
      this.dialogInfo.title = `添加子需求【${demandName}】`;
    },
    // 删除需求
    _delete(row) {
      let title = row.title;
      let message = `你确定要删除需求【${title}】吗？删除后不可恢复!`;
      if (row.parentid) {
        message = `你确定要删除子需求【${title}】吗？删除后不可恢复!`;
      }
      this.$confirm(message, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return $http({ method: "deleteDemand", service: "Demand", id: row.id }, { error: true });
        })
        .then(res => {
          this.$message.success(res.message);
          if (row.parentid) {
            this._queryDemandByParentId(row.parentid);
          } else {
            this._queryDemandByProjectId();
          }
        });
    },
    // 查看详情
    _toDetail(row) {
      this.$router.push({
        name: "demandDetail",
        query: {
          ...this.$route.query,
          id: row.id,
        },
      });
    },
    // 查看项目详情
    _toProjectDetail() {
      this.$router.push({
        name: "projectDetail",
        query: {
          projectid: this.$route.query.projectid,
        },
      });
    },
    // 展开子需求
    _expand(row, expanded) {
      if (expanded) {
        let id = row.id;
        this._queryDemandByParentId(id);
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.demand-list {
  background-color: #fff;
  padding: 20px;
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
  /deep/.main-table {
    margin: 20px 0;
    .el-table__expanded-cell {
      padding: 0;
      .sub-table {
        border: 0 none;
      }
    }
    .sub-table {
      .el-button {
        color: #01cdee;
      }
    }
  }
}
</style>
