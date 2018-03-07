<template>
  <div class="nav-side">
    <div class="nav-side-slider">
      <el-menu :default-active="defaultActive" class="project-menu">
        <template v-for="menu in menuList">
          <el-menu-item  :index="String(menu.id)" :key="menu.id" @click="_linkTo(menu)">
            <i :class="menu.icon" ></i>&nbsp;
            <span slot="title">{{menu.name}}</span>
          </el-menu-item>
          <ul v-if="menu.name==='我的项目'" :key="menu.id+1">
            <el-menu-item v-for="item in projectList" :key="item.id" class="project-list-item" @click="_linkToProject(item)" :index="item.projectid">{{item.projectname}}</el-menu-item>
            <el-button class="load-more" v-if="projectList.length === 10 && !isLoadMore" @click="_getProjectList(0)">...显示更多</el-button>
          </ul>
        </template>
      </el-menu>
    </div>
    <project-add :dialogInfo="dialogInfo" @close="_repairRouter" @saveProject="dialogInfo.importShow = true"></project-add>
    <import-person :dialogInfo="dialogInfo"></import-person>
  </div>
</template>
<script>
import { $http, $dataFormat } from "@/pages/projects/common/js/util";
import { eventBus } from "@/pages/projects/common/js/eventBus";
import projectAdd from "@/pages/projects/my-project/edit";
import importPerson from "@/pages/projects/my-project/import";
export default {
  components: {
    projectAdd,
    importPerson,
  },
  data() {
    return {
      isLoadMore: false, // 是否已经显示全部；
      dialogInfo: {
        show: false,
        importShow: false,
      },
      defaultActive: "/projects/workplace",
      menuList: [],
      projectList: [], // 项目列表
    };
  },
  watch: {
    // 菜单路由维护
    $route: {
      handler: function(route) {
        if (route.query.projectid) {
          this.defaultActive = route.query.projectid;
        }
      },
      deep: true,
    },
  },
  created() {
    this._getMenuList();
    this._getProjectList(1);
    this._listeningAdd();
    this._repairRouter();
  },
  methods: {
    // 获取菜单
    _getMenuList() {
      let params = {
        module: "sys",
        service: "Permission",
        method: "getMenuList",
        parentid: JSON.parse(localStorage.getItem("menuParmas")).id,
      };
      $http(params).then(res => {
        this.menuList = $dataFormat(res.datalist);
      });
    },
    // 获取项目列表
    _getProjectList(isPage) {
      if (!isPage) {
        this.isLoadMore = true;
      }
      $http({ method: "myProjectList", isPage }).then(res => {
        this.projectList = $dataFormat(res);
      });
    },
    // 监控项目添加成功
    _listeningAdd() {
      eventBus.$on("addSuccess", () => {
        this._getProjectList();
      });
    },
    // 修复路由
    _repairRouter() {
      if(this.$route.query.projectid){
        this.defaultActive = this.$route.query.projectid;
        console.log(this.defaultActive);
        return;
      }
      if(this.$route.query.orders){
        this.defaultActive = this.$route.query.orders;
      }
    },
    // 点击菜单路由跳转
    _linkTo(item) {
      // 增加项目
      if (!item.url) {
        this.dialogInfo.show = true;
        return;
      }
      if (item.url) {
        this.$router.push({
          path: item.url,
          query: {
            orders: item.id,
          },
        });
      }
    },
    // 点击项目跳转
    _linkToProject(item){
      let { projectid, projectname } = item;
      this.$router.push({
        path:"/projects/demand",
        query: {
          projectid,
          projectname
        },
      });
    }
  },
};
</script>
<style lang="scss" scoped>
.nav-side {
  float: left;
  width: 230px;
  background-color: #fff;
  overflow: hidden;
  .nav-side-slider {
    height: 700px;
    width: 250px;
    overflow-x: hidden;
    overflow-y: scroll;
    .project-menu {
      margin-bottom: 20px;
      background-color: #fff;
      &:not(.el-menu--collapse) {
        width: 240px;
        min-height: 400px;
      }
      .el-menu-item {
        border-left: 3px solid #d1dbe5;
        &.is-active {
          color: #01cd78;
          border-left: 3px solid #01cd78;
          background-color: #dedbe5;
        }
        &.project-list-item {
          padding-left: 45px !important;
          height: 50px;
          line-height: 50px;
          border-left: 3px solid #d1dbe5;
          color: #888;
        }
        .fa {
          display: inline-block;
          vertical-align: middle;
          width: 16px;
          height: 16px;
          font-size: 15px;
          &.fa-plus-square-o {
            font-size: 17px;
          }
        }
      }
      .load-more {
        width: 100%;
        height: 40px;
        text-align:left;
        padding-left: 45px;
      }
    }
  }
}
</style>
