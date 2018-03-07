// 目前header统一，这个header暂未使用
<template>
  <div class="header">
    <div class="head">{{moduleName}}</div>
    <div class="top-nav">
      <router-link to="/index" class="back-index">
        <!-- <img src="./img/icon-back.png" alt=""> -->
        <span>返回首页</span>
      </router-link>

      <div class="current-user">

        <el-dropdown trigger="click">
          <a href="javascript:void(0)">
            <img :src="setAvatar()" alt="" class="user-avatar">
            <span class="user-name">{{personInfo.realname}}</span>
            <i class="el-icon-arrow-down"></i>
          </a>

          <el-dropdown-menu slot="dropdown" class="drop-list-diy">
            <el-dropdown-item class="drop-list-user">
              <img :src="setAvatar()" alt="" class="user-avatar">
              <span>{{personInfo.realname}}</span>
            </el-dropdown-item>

            <el-dropdown-item class="drop-list-logout">
              <div @click="logOut">
                <!-- <Icon class="icon-locked" type="locked"></Icon> -->
                退出系统
              </div>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>

    </div>
    <div class="clearfix"></div>
  </div>
</template>

<style scoped>
.header {
  width: 100%;
  height: 72px;
  line-height: 72px;
  position: fixed;
  color: #fff;
  top: 0;
  left: 0;
  z-index: 100;
}

.head {
  height: 72px;
  width: 230px;
  background: #01cd78;
  float: left;
  font-size: 20px;
  font-family: "Microsoft YaHei";
  font-weight: bold;
  text-align: center;
}

.top-nav {
  height: 72px;
  background: #fff;
  box-shadow: 0 0 15px #999;
  margin-left: 230px;
  border-right: 1px solid #c9cacb;
}

.back-index {
  color: #373e4a;
  font-size: 12px;
  display: inline-block;
  margin-left: 15px;
  padding: 0 10px;
}

.back-index img {
  position: relative;
  top: 2px;
  left: -2px;
}

.current-user {
  float: right;
  margin-right: 35px;
}

.user-avatar {
  height: 28px;
  width: 28px;
  background: #eee;
  border-radius: 50%;
  vertical-align: middle;
}

.user-name {
  margin: 0 5px;
  display: inline-block;
  vertical-align: middle;
  color: #000;
  font-size: 14px;
}

.arrow-down {
  font-size: 12px;
  color: #000;
  font-weight: bold;
}

.drop-list-diy {
  width: 200px;
  height: 105px;
}

.drop-list-diy:before {
  content: "";
  position: absolute;
  top: -11px;
  left: 155px;
  width: 0;
  height: 0;
  line-height: 0;
  font-size: 0;
  display: block;
  border-width: 0 10px 11px;
  border-style: solid;
  border-color: transparent transparent #01cd78;
}

.el-dropdown-menu {
  padding: 0;
}

.drop-list-user {
  height: 58px;
  line-height: 58px;
  vertical-align: middle;
  background: #01cd78;
  padding-left: 16px;
}

.drop-list-user:hover {
  background: #01cd78;
}

.drop-list-user span {
  font-size: 16px;
  font-weight: 500;
  color: #fff;
  padding-left: 5px;
}

.drop-list-logout {
  height: 47px;
  line-height: 47px;
  color: #222;
  padding-left: 16px;
}

.icon-locked {
  font-size: 14px;
  padding-right: 5px;
}
</style>
<script>
import { appHost, fsHost, appPort, appRoot, avatar } from "@/config/config";
import { getStore } from "@/utils/localStorage";
export default {
  data() {
    return {
      personInfo: {},
      moduleName: JSON.parse(getStore("menuParmas")).name,
    };
  },
  created() {
    this.ajax({
      //获取用户信息
      url: "/authority/user/homepage/detail",
      success(data, $this) {
        if (data.code == "success") {
          $this.personInfo = data.content;
        }
      },
    });
  },

  methods: {
    setAvatar() {
      return Utils.getAvatar(this.personInfo);
    },
    logOut() {
      Utils.logOut();
    },
  },
};
</script>
