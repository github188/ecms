<template>
  <div ref="myProjectRef">
    <v-panel title="我的项目">
      <el-row :gutter="25" class="pro-panel">
        <el-col :span="4" v-for="(item, index) in proList" :key="item.projectid">
          <router-link :to="{ path: 'projectRelate', query: { projectid: item.projectid ,projectname:item.projectname }}">
            <el-card class="pro-item">
              <img :src="item.picurl?item.picurl:defaultUrl" class="image">
              <!--<img src="../img/img_01.jpg" class="image">-->
              <div class="card-title">
                <span>{{item.projectname}}</span>
              </div>
            </el-card>
          </router-link>
        </el-col>
        <el-col :span="4">
          <a class="btn-addpro" @click="btnHandle">
            <i class="el-icon-plus icon-addpro"></i>
          </a>
        </el-col>
      </el-row>
      <projectAdd @proAddSuccess="proAddSuccess" ref="projectAdd" title="创建项目"></projectAdd>
      <div class="panel-title">
        <span>已结束项目</span>
      </div>
      <div class="panel-content">
        <el-row :gutter="25" class="pro-panel">
          <el-col :span="4" v-for="(item, index) in doneProList" :key="item.id">
            <router-link :to="{ path: 'projectRelate', query: { projectid: item.projectid ,projectname:item.projectname }}">
              <el-card class="pro-item">
                <img :src="item.picurl?item.picurl:defaultUrl" class="image">
                <!--<img src="../img/img_01.jpg" class="image">-->
                <div class="card-title">
                  <span>{{item.projectname}}</span>
                </div>
              </el-card>
            </router-link>
          </el-col>
        </el-row>
      </div>
    </v-panel>
  </div>
</template>

<style scoped>
.pro-panel {
  margin-bottom: 20px;
}

.pro-item {
  height: 232px;
}

/*.pro-item, .btn-addpro {
    cursor: pointer;
  }

  .pro-item > img, .pro-item > span {
    display: block;
  }

  .pro-item > img {
    width: 100%;
    border: 0;
  }

  .pro-item > span {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    line-height: 38px;
    font-size: 15px;
    color: #222;
  }
*/
.btn-addpro {
  display: block;
  border: 3px dashed #d9d9d9;
  border-radius: 6px;
  text-align: center;
  height: 231.7px;
  line-height: 231.7px;
}

.btn-addpro:hover {
  border-color: #01cd78;
}

.icon-addpro {
  font-size: 28px;
  color: #8c939d;
  width: 100%;
}

.image {
  display: block;
  width: 100%;
  height: 161.8px;
  overflow: hidden;
}

.card-title {
  padding-top: 15px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
<style scoped>
.el-col-4 {
  /*width: 16.66667%;*/
  /*width: 12.5%;*/
  /*width: 14.28%;*/
  width: 228.8px;
  /*width: 200px;*/
  margin-bottom: 25px;
}
</style>
<script>
import config from "../../../utils/config";
import { eventBus } from "../eventBus";
export default {
  name: "myProjectManage",
  data() {
    return {
      theHeight: 0,
      proList: [],
      doneProList: [],
      pageSize: 10,
      pageIndex: 1,
      defaultUrl: "../img/img_01.jpg",
    };
  },
  mounted: function() {
    /*let that = this;
       that.$nextTick(function () {
       this.theHeight = that.$refs.proPanel.$el.clientHeight - 2;
       })*/
    this.myProjectList(this.pageSize, this.pageIndex); //获取未结束的项目列表
    this.myProjectListByType(); //获取已完成的项目列表
    this._listening();
  },
  methods: {
    btnHandle() {
      this.$refs.projectAdd.openProjectModal();
    },
    myProjectList(pageSize, pageIndex) {
      //获取未完成项目列表
      let that = this;
      let theFetch = new fetch("pm", "ProjectManager", "myProjectList");
      theFetch.isPage = 0;
      theFetch.pageSize = pageSize;
      theFetch.pageIndex = pageIndex;
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
    myProjectListByType() {
      //获取已完成项目列表
      let that = this;
      let theFetch = new fetch("pm", "ProjectManager", "myProjectListByType");
      theFetch.projecttype = 2; //已完成
      theFetch.u = Utils.getValue("u"); // 当前登录人的userid
      theFetch.success = function(data) {
        that.doneProList = [];
        let res = data.projectlist;
        var rslen = res.rs.length;
        Utils.renderFs(res);
        for (var i = 0; i < rslen; i++) {
          var row = res.rs[i],
            projectid = Utils.getRowValue(row, "projectid"),
            projectname = Utils.getRowValue(row, "projectname"),
            picurl = Utils.getRowValue(row, "picurl");
          that.doneProList.push({ projectid: projectid, projectname: projectname, picurl: "http://" +
                config.appHost +
                config.appRoot +
                "/image?" +
                "module=common&service=File&method=view" +
                "&type=UserImg&fileName=" +
                picurl +
                ".jpg&w=162&h=162&t=" +
                new Date().getTime(), });
        }
      };
      theFetch.executeAsync();
    },
    proAddSuccess() {
      this.myProjectListByType();
    },
    _listening(){
    // 监听project增加成功事件,刷新项目列表；
    eventBus.$on("projectAddSuccess", () => {
      console.log("项目添加添加成功2");
      this.myProjectList();
      this.myProjectListByType();
    });
    }
  },
};
</script>
