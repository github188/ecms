<template>
  <!--左侧菜单 begin-->
  <div class="side-menu" ref="sideBarRef">
    <a class="side-toggle" href="javascript:void(0);">
      <label for="toggleMenu" id="toggleMenuLabel" @click="changeIt"></label>
    </a>
    <div class="side-menu-slider">
      <div class="content">
        <el-menu :default-active="defaultActive" mode="vertical" class="el-menu-vertical-demo menu-list">
          <div v-for="item in menuList" :key="item.orders">
            <el-menu-item v-if="item.url" :index="item.orders+''">
              <label class="menu" @click="_linkTo(item.url)">
                <input type="radio" class="hidden" :value="item.name" v-model="currentMenu">
                <div>
                  <em :class="item.icon" class="margin-r-5"></em>
                  <el-tooltip :disabled="isCollapse" :content="item.name" placement="top">
                    <span>{{item.name}}</span>
                  </el-tooltip>
                  <i class="el-collapse-item__header__arrow el-icon-arrow-right icon-right"></i>
                </div>
              </label>
            </el-menu-item>
            <el-menu-item v-else :index="item.orders+''">
              <label class="menu" @click="btnHandle" style="color:#333">
                <div>
                  <em :class="item.icon"></em>
                  <el-tooltip :disabled="isCollapse" :content="item.name" placement="top">
                    <span>{{item.name}}</span>
                  </el-tooltip>
                  <i class="el-collapse-item__header__arrow el-icon-arrow-right icon-right"></i>
                </div>
              </label>
            </el-menu-item>
            <template v-if="item.name==='我的项目'">
              <ul class="block-list">
                <el-menu-item v-for="(item,index) in proList" :key="index" :index="index | spliceIndex">
                  <label class="project" style="color:#999">
                    <input class="hidden" type="radio" :value="item.projectid" v-model="currentMenu">
                    <div @click="_linkTo({ path: 'projectRelate', query: { projectid: item.projectid,projectname:item.projectname,t:Date.now() }})">
                      <el-tooltip :disabled="isCollapse" :content="item.projectname" placement="top">
                        <span>{{item.projectname}}</span>
                      </el-tooltip>
                    </div>
                  </label>
                </el-menu-item>
              </ul>
              <el-button v-if="proList.length==10&&!isMore" :plain="true" type="success" class="btn-showmore" @click="showMore">
                <el-tooltip :disabled="isCollapse" content="显示更多项目" placement="top">
                  <span>
                    <span style="font-weight:700">...</span>&nbsp;&nbsp;显示更多项目</span>
                </el-tooltip>
              </el-button>
            </template>
          </div>
        </el-menu>
      </div>
    </div>
  </div>
  <!--左侧菜单 end-->
</template>

<style scoped>
.content {
  width: 230px;
  padding-bottom: 160px;
}
.side-menu {
  width: 230px;
  height: 700px;
  overflow: hidden;
}
.side-menu-slider {
  overflow-x: hidden;
  overflow-y: scroll;
  height: 700px;
}
.side-menu-slider::-webkit-scrollbar {
  display: none;
}
label.menu,
label.project {
  display: block;
}
label.menu > div {
  height: 50px;
  padding: 0 25px;
  border-left: 3px solid #eee;
}
label.menu input:checked + div {
  color: #01cd78;
  background: #eee;
  border-left: 3px solid #01cd78 !important;
}
label.project > div {
  padding-left: 50px;
}
label.project input:checked + div {
  color: #333;
  background: #d4f1e5;
}
.hidden {
  display: none;
}
.fa {
  width: 16px;
  height: 16px;
}
.el-icon-caret-right {
  color: #555;
}
.side-menu {
  position: fixed;
  top: 72px;
  left: 0;
  width: 230px;
  height: 100%;
  background: #fff;
  transition: all 80ms ease-in-out;
}

.side-toggle {
  display: block;
  margin: 0 auto;
  width: 100%;
  height: 36px;
  border-bottom: 1px solid #eee;
  color: #90929c;
  text-align: center;
  font-size: 22px;
  line-height: 36px;
}

.el-menu {
  background-color: #fff;
}

.el-menu-item {
  padding: 0 !important;
  height: 50px;
  line-height: 50px;
}

.el-icon-menu {
  font-size: 16px;
}

.btn-showmore {
  overflow: hidden;
  padding-left: 40px;
  width: 100%;
  height: 50px;
  border: 0 none;
  border-radius: 0;
  text-align: left;
  line-height: 16px;
}
.btn-showmore:hover {
  border: 1px solid #01cd78;
  color: #01cd78;
}
.menu-list > li {
  border-left: 4px solid #fff;
  font-size: 16px;
  transition: background 180ms ease;
}

.menu-list li:hover {
  background: #f2f2f2;
  transition: background 180ms ease;
}

.menu-list li a {
  display: block;
  overflow: hidden;
  padding-right: 20px;
  padding-left: 20px; /*40px*/
  color: #555;
  font-size: 14px;
  transition: background 180ms ease;
}

.menu-list li a span,
.btn-showmore span i {
  display: inline-block;
  overflow: hidden;
}

.btn-showmore span i {
  width: 100%;
}

.menu-list > li.is-active {
  border-left: 4px solid #01cd78;
  border-left-color: #01cd78;
  background: #f2f2f2;
  color: #01cd78;
}

.block-list > li {
  height: 40px;
  line-height: 40px;
}
.block-list > li.is-active {
  background-color: #d4f1e5;
  color: #01cd78;
}

.block-list > li:hover {
  background: #d4f1e5;
  transition: background 180ms ease;
}

.block-list .block-list-slider > li a {
  padding-left: 45px;
  width: 100%;
}

.menu-list .icon-right {
  position: absolute;
  top: 50%;
  right: 0;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
}

#toggleMenuLabel {
  display: block;
  margin: 0 auto;
  width: 16px;
  height: 35px;
  background: url('../layout/img/menu.png') center no-repeat;
  cursor: pointer;
}

#toggleMenu:checked + .wrap .side-menu {
  width: 50px;
  transition: all 80ms ease-in-out;
}

#toggleMenu:checked + .wrap .side-menu .menu-list li a {
  padding-left: 13px !important;
  transition: all 250ms ease-in-out;
}

#toggleMenu:checked + .wrap .side-menu .menu-list li a span {
  width: 14px;
}

#toggleMenu:checked + .wrap .side-menu .menu-list .btn-showmore span i {
  width: 14px;
}

#toggleMenu:checked + .wrap .side-menu .menu-list .icon-right {
  display: none;
}
</style>
<style scoped>
::-webkit-scrollbar {
  width: 12px;
}

::-webkit-scrollbar-track {
  -webkit-border-radius: 10px;
  border-radius: 10px;
  /* 滚动条的滑轨背景颜色 */
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
}

::-webkit-scrollbar-thumb {
  /* 滑块颜色 */
  -webkit-border-radius: 10px;
  border-radius: 10px;
  background: #ccc; /*#787878*/ /*#01cd78*/
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5); /*rgba(1,205,120,0.5)*/
}

::-webkit-scrollbar-thumb:hover {
  background-color: #787878 !important;

  -moz-appearance: none !important;
}
</style>
<script>
import { setStore, getStore } from "@/utils/localStorage";
import { eventBus } from "./eventBus";
import config from "@/utils/config"
export default {
  name: "sidebar",
  data() {
    return {
      currentProject: "",
      currentMenu: "工作台",
      menuList: [],
      isCollapse: true,
      proList: [],
      pageSize: 10,
      pageIndex: 1,
      defaultActive: "0",
      isMore:false,//是否有更多
    };
  },
  created: function () {
    let that = this;
    //获取项目列表
    this.myProjectList();

    // 监听project增加成功事件,刷新项目列表；
    eventBus.$on("projectAddSuccess", () => {
      console.log("项目添加添加成功");
      this.myProjectList();
    });
  },
  mounted: function () {
    //获取左侧菜单
    let that = this;
    const menuParmas = JSON.parse(getStore("menuParmas"));
    let theFetch = new fetch("sys", "Permission", "getMenuList");
    theFetch.parentid = menuParmas.id;
    theFetch.u = Utils.getValue("u"); // 当前登录人的userid
    theFetch.success = function (res) {
      that.menuList = Utils.dataFormat(res.datalist);
      if (that.menuList.length > 0) {
        that.currentMenu = that.menuList[0].name;
        if (that.menuList[0].url) {
          that.$router.replace(that.menuList[0].url);
        }
        //  else {
        //   that.$router.replace("/project");
        // }
      } else {
        that.$router.back();
      }
    };
    theFetch.executeAsync();
  },
  methods: {
    changeIt() {
      this.isCollapse = !this.isCollapse;
    },
    btnHandle() {
      this.$emit("toShowAddDialog"); //像父级组件传递一个信息，第一个参数是父组件要绑定的事件名
    },
    myProjectList(isPage = 1) {
      //获取未完成项目列表
      //        alert('sidebar111');
      fetch.prototype._configParam = function () {
        var defConfig = {}
        defConfig.appHost = config.appHost //服务器地址
        defConfig.approot = config.appRoot //平台
        defConfig.protocol = 'http://' //协议 默认http
        defConfig.stype = '/data' //方法,导出导入数据请求，默认数据请求
        defConfig.type = 'POST' //请求方式,默认post请求
        return defConfig
      }
      fetch.prototype._getUrl = function (obj) {
        var defConfig = this._configParam()
        var url = defConfig.protocol + defConfig.appHost + defConfig.approot + (obj.stype || defConfig.stype)
        return url
      }
      let that = this;
      let theFetch = new fetch("pm", "ProjectManager", "myProjectList");
      theFetch.isPage = isPage;
      theFetch.u = Utils.getValue("u"); // 当前登录人的userid
      theFetch.success = function (res) {
        that.proList = Utils.dataFormat(res);
      };
      theFetch.executeAsync();
    },
    showMore() {
      this.isMore = true;
      this.myProjectList(0);
    },
    _linkTo(url) {
      if (typeof url === "object") {
        this.currentMenu = "我的项目";
      }else{
        this.currentProject = "";
      }
      this.$router.replace(url);
    },
  },
  filters: {
    spliceIndex(index) {
      //拼接左侧菜单的index属性值
      return "2-" + index;
    },
  },
};
</script>
