<template>
  <div class="my-projects">
    <p class="item-title">我的项目</p>
    <ul class="project-list clearfix">
      <li class="item" v-for="item in projectList" :key="item.projectid" @click="_linkTo(item)">
        <div class="picture" :style="{backgroundImage:_getImageURL(item.picurl)}"></div>
        <el-tooltip :content="item.projectname" placement="bottom" effect="dark">
          <p class="pic-title">{{item.projectname}}</p>
        </el-tooltip>
      </li>
      <li v-if="hasAdd" class="item" @click="dialogInfo.show = true">
        <div class="picture el-icon-plus"></div>
      </li>
    </ul>
    <p class="item-title">已结束项目</p>
    <ul class="project-list clearfix">
      <li class="item" v-for="item in projectListFilish" :key="item.projectid" @click="_linkTo(item)">
        <div class="picture" :style="{backgroundImage:_getImageURL(item.picurl)}"></div>
        <el-tooltip :content="item.projectname" placement="bottom" effect="dark">
          <p class="pic-title">{{item.projectname}}</p>
        </el-tooltip>
      </li>
    </ul>
    <projectAdd :dialogInfo="dialogInfo" @saveProject="dialogInfo.importShow = true"></projectAdd>
    <importPerson :dialogInfo="dialogInfo"></importPerson>
  </div>
</template>
<script>
import { $http, $dataFormat, $getImageURL } from "@/pages/projects/common/js/util";
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
      dialogInfo: {
        show: false,
        importShow: false,
      },
      projectList:[], // 项目列表,
      projectListFilish:[], // 已结束项目，
      menuList:[] // 权限菜单
    };
  },
  computed: {
    // 是否有添加的权限
    hasAdd(){
      let urls =  this.menuList.map(item => item.url);
      return urls.includes(null) || urls.includes("");
    },
  },
  created () {
    this._getMenuList();
    this._getProjectList();
    this._getProjectListFilish();
    this._listeningAdd();
  },
  methods: {
    _addProject() {
      this.dialogInfo.show = true;
    },
    // 获取项目列表
    _getProjectList() {
      $http({ method: "myProjectList" }).then(res => {
        this.projectList = $dataFormat(res);
      });
    },
    // 获取权限菜单
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
    // 监控项目添加成功
    _listeningAdd(){
      eventBus.$on("addSuccess",()=>{
        this._getProjectList();
      });
    },
    _getImageURL(picurl){
      if(!picurl){
        return "";
      }
      let url = $getImageURL(picurl);
      return `url(${url})`;
    },
    _getProjectListFilish() {
      var params = { method: "myProjectListByType", projecttype: 2 };
      $http(params).then(res => {
        this.projectListFilish = $dataFormat(res.projectlist);
      });
    },
    // 点击项目跳转
    _linkTo(item){
      this.$router.replace({
        name:"demandList",
        query:{
          projectid:item.projectid,
          projectname:item.projectname
        }
      })
    },
  },
};
</script>
<style lang="scss" scoped>
.my-projects {
  min-height: 600px;
  padding: 20px;
  font-size: 14px;
  background-color: #fff;
  .item-title {
    height: 20px;
    line-height: 20px;
    padding-left: 10px;
    border-left: 3px solid #01cd78;
    margin-bottom: 20px;
  }
  .project-list {
    margin-bottom: 10px;
    .item {
      &:hover{
        cursor: pointer;
      }
      margin: 10px;
      float: left;
      text-align: center;
      .picture {
        border: 1px solid #ccc;
        width: 120px;
        height: 120px;
        line-height: 120px;
        margin-bottom: 10px;
        background-image: url(../common/images/project_bg.jpg);
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center center;
        &.el-icon-plus {
          background-image:url();
          background-color: #fff;
          font-size: 20px;
          color: #aaa;
          border: 1px solid #aaa;
        }
      }
      p.pic-title{
        width: 120px;
        text-overflow:ellipsis;
        white-space:nowrap;
        overflow: hidden;
      }
    }
  }
}
</style>
