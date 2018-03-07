<template>
  <header class="header">
    <div class="header-box">
      <router-link to="/index" class="logo" title="亿车科技EAP系统首页">
        <h2>
          <img src="./img/logo.png" alt="">
        </h2>
      </router-link>
      <!-- <div class="search">
                      <input type="text" placeholder="输入关键字搜索">
                  </div> -->

      <div class="setting">
        <ul>
          <li class="menu">
            <a title="邮箱" target="_blank" @click="getEmailUrl" class="message" :href="emailUrl"></a>
            <template v-if="(emailNum > 1)">
              <div class="email-num" v-if="(emailNum > 99)">
                <span>99</span>
                <em>+</em>
              </div>
              <div class="email-num" v-else>{{emailNum}}</div>
            </template>
          </li>
          <li class="menu" @mouseover="showMenu" @mouseout="hideMenu">
            <a class="setting" href="javascript:;"></a>
            <el-collapse-transition>
              <ol v-show="menu" class="sub-menu">
                <li>
                  <a href="javascript:;" @click="dialog = true">修改密码</a>
                </li>
                <li>
                  <router-link :to="'/person/'+u">个人信息</router-link>
                </li>
              </ol>
            </el-collapse-transition>
          </li>
          <li class="menu">
            <a title="退出" @click="logOut" class="log-out" href="javascript:;"></a>
          </li>
        </ul>
      </div>
    </div>

    <el-dialog title="修改密码" :visible.sync="dialog" :modal-append-to-body="false" size="tiny">
      <el-form :model="change" :rules="rule" ref="changePassword" label-width="80px">
        <el-form-item label="原密码" prop="passwdOld" style="margin-bottom: 25px">
          <el-input placeholder="请输入原密码" type="password" v-model="change.passwdOld"></el-input>
        </el-form-item>

        <el-form-item label="新密码" prop="passwd" style="margin-bottom: 25px">
          <el-input placeholder="请输入新密码" type="password" v-model="change.passwd"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" prop="passwdCheck" style="margin-bottom: 25px">
          <el-input placeholder="请确认新密码" type="password" v-model="change.passwdCheck"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="success" @click="handleSubmit('changePassword')">提交</el-button>
          <el-button type="info" @click="closeModal" style="margin-left: 8px">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

  </header>
</template>


<style scoped>
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
  max-width: 1180px;
  margin: 0 auto;
  height: 72px;
  /* padding: 0 24px; */
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
  background-image: url('./img/message-icon.png');
}

.setting .menu a.setting {
  background-image: url('./img/setting-icon.png');
}

.setting .menu a.log-out {
  background-image: url('./img/logout-icon.png');
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

@media screen and (max-width: 1366px) {
  .header-box {
    padding: 0 24px;
    max-width: 100%;
  }
}
/*
@media screen and (max-width: 1360px) {
  .header-box {
    zoom: 0.85;
  }
} */
</style>
<script>
import md5 from '@/utils/jquery.md5'
export default {
  data() {
    const checkPassWd = (rule, value, callback) => {
      if (value !== this.change.passwd) {
        callback(new Error('两次密码不一致！'))
      } else {
        callback()
      }
    }
    return {
      u: Utils.getValue('u'),
      menu: false,
      dialog: false,
      change: {
        passwdOld: '',
        passwd: '',
        passwdCheck: '',
      },
      emailNum: 0,
      emailUrl: '',
      rule: {
        passwdOld: {
          required: true,
          message: '请填写原密码!',
          trigger: 'blur',
        },
        passwd: {
          required: true,
          message: '请填写新密码!',
          trigger: 'blur',
        },
        passwdCheck: {
          validator: checkPassWd,
          required: true,
          trigger: 'blur',
        },
      },
    }
  },

  created() {
    this.getEmailNum()
    this.getEmailUrl()
  },
  methods: {
    showMenu() {
      this.menu = true
    },
    hideMenu() {
      this.menu = false
    },
    logOut() {
      this.confirmTips({
        title: '退出确认',
        content: '您确定要退出登录吗?',
        submit() {
          Utils.logOut()
        },
      })
    },
    getEmailNum() {
      //获取邮箱數量
      this.ajax({
        url: '/authority/user/mail/toread',
        success(data, $this) {
          if (data.code == 'success') {
            $this.emailNum = data.content
          }
        },
        error() { },
      })
    },
    getEmailUrl() {
      //获取邮箱信息
      this.ajax({
        url: '/authority/user/mail/login',
        success(data, $this) {
          if (data.code == 'success') {
            $this.emailUrl = data.content
            $this.getEmailNum()
          }
        },
        error() { },
      })
    },
    closeModal() {
      this.dialog = false
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          const { passwdOld, passwd } = this.change
          const data = {
            oldPass: $.md5(passwdOld),
            newPass: $.md5(passwd),
          }
          this.ajax({
            url: '/authority/user/reset/password',
            type: 'put',
            data: data,
            success(data, $this) {
              if (data.code == 'success') {
                $this.dialog = false
                $this.$message({
                  showClose: true,
                  message: '密码修改成功!',
                  type: 'success',
                  duration: 2000,
                  onClose() {
                    Utils.logOut()
                  },
                })
              } else {
                $this.errorTips('原密码错误!')
              }
            },
          })
        }
      })
    },
  },
  mounted() {
    $('html').css('background', '#eef0f5')
  },
}
</script>
