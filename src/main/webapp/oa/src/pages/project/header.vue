<template>
  <!--头部 begin-->
  <header class="header">
    <div class="header-box">
      <router-link to="/index" class="logo" title="亿车科技EAP系统首页">
        <h2>
          <img src="../index/img/logo.png" alt="">
        </h2>
      </router-link>
      <!-- <div class="search">
              <input type="text" placeholder="输入关键字搜索">
          </div> -->

      <div class="setting">
        <ul>
          <li class="menu">
            <a title="邮箱" target="_blank" class="message"></a>
            <!-- <template v-if="(emailNum > 1)">
                <div class="email-num" v-if="(emailNum > 99)">
                  <span>99</span>
                  <em>+</em>
                </div>
                <div class="email-num" v-else>{{emailNum}}</div>
              </template> -->
          </li>

          <li class="menu">
            <a class="setting" href="javascript:;"></a>
            <!-- <ol v-show="menu" class="sub-menu">
                <li>
                  <a href="javascript:;">修改密码</a>
                </li>
                <li>
                  <router-link to="/person">个人信息</router-link>
                </li>
              </ol> -->
          </li>
          <li class="menu">
            <a title="退出" class="log-out" href="javascript:;"></a>
          </li>
        </ul>
      </div>
    </div>
  </header>
  <!--头部 end-->
</template>

<style scoped>
.module-content .header-box {
  max-width: 100% !important;
}

.module-content .logo {
  width: 230px !important;
}

/*头部start*/
.header {
  height: 72px;
  background: #fff;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  box-shadow: 0 0 8px rgba(46, 48, 55, 0.51);
}

.header-box {
  max-width: 1440px;
  margin: 0 auto;
  height: 72px;
  padding: 0 24px;
}

.logo {
  display: block;
  width: 204px;
  height: 72px;
  line-height: 72px;
  float: left;
  text-align: center;
}

.logo img {
  vertical-align: middle;
}

/* .search {
          width: 312px;
          height: 36px;
          float: left;
          margin-left: 30px;
          background: #f3f5f7 url("./img/icon.png") no-repeat -93px -126px;
          border-radius: 30px;
          margin-top: 18px;
          overflow: hidden;
      } */

.search input {
  width: 240px;
  border: none;
  outline: none;
  height: 28px;
  margin: 4px;
  margin-left: 40px;
  font-size: 14px;
  background: #f3f5f7;
}

.setting {
  float: right;
  height: 72px;
  line-height: 72px;
}

.setting ul li.menu {
  float: left;
  width: 70px;
  text-align: center;
  list-style: none;
  position: relative;
}

.setting ul li.menu a {
  height: 72px;
  background-repeat: no-repeat;
  background-position: center;
}

.setting .menu a.message {
  background-image: url("../index/img/message-icon.png");
}

.setting .menu a.setting {
  background-image: url("../index/img/setting-icon.png");
}

.setting .menu a.log-out {
  background-image: url("../index/img/logout-icon.png");
}

.setting ul li:hover .setting-icon {
  transform: rotateX(-180deg);
  -webkit-transform: rotateX(-180deg);
  -moz-transform: rotateX(-180deg);
  top: -2px;
  transition: all 0.5s ease;
  -webkit-transition: all 0.5s ease;
  -moz-transition: all 0.5s ease;
}

.setting ul li.menu a {
  color: #868f94;
  display: inline-block;
  width: 100%;
}

.setting ul li a:hover {
  text-decoration: none;
}

.setting .sub-menu {
  list-style: none;
  position: absolute;
  padding: 0;
  background: #fff;
  width: 120px;
  left: -20px;
  height: 120px;
  border-radius: 0 0 6px 6px;
  box-shadow: 0 0 10px #d4d4d4;
  top: 70px;
}

.setting .sub-menu li {
  height: 60px;
  line-height: 60px;
}

.setting .sub-menu li:hover {
  opacity: 0.8;
}

.email-num {
  position: absolute;
  top: 20px;
  left: 35px;
  height: 15px;
  width: 22px;
  line-height: 14px;
  background: #fb6c2e;
  border-radius: 14px;
  color: #fff;
}

.email-num span {
  position: relative;
  left: -3px;
}

.email-num em {
  font-style: normal;
  position: relative;
  top: -16px;
  left: 7px;
}
</style>

