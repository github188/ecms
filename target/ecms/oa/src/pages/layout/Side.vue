<template>
  <div class="side-menu" id="sideMenu">
    <a class="side-toggle" href="javascript:;">
      <label for="toggleMenu" id="toggleMenuLabel" @click="tooltip=!tooltip"></label>
    </a>
    <el-menu :default-openeds="tooltip?['01','11']:['']" class="menu-list" :collapse="!tooltip" mode="vertical" default-active="1">
      <template v-if="menuList.length > 0 && menuList[0].children.length > 0 && menuList[0].children[0].type == 1">
        <el-submenu :index="index+'1'" :key="index" v-for="(item, index) in menuList">
          <template slot="title">
            <i v-show="!tooltip" :class="'el-icon-'+item.icon"></i>
            <span>{{item.name}}</span>
          </template>
          <el-menu-item v-if="sub.status == 0" :key="id" :index="id.toString()" v-for="(sub, id) in item.children">
            <router-link :to="{path: sub.url, query:{id:  sub.id} }">
              <span>{{sub.name}}</span>
            </router-link>
          </el-menu-item>
        </el-submenu>
      </template>

      <el-menu-item v-else v-for="(item, index) in menuList" :key="index" :index="index.toString()">
        <router-link v-if="!tooltip" :to="{path: item.url, query:{id:  item.id}}" :data-id="item.id">
          <i :class="'el-icon-'+item.icon"></i>
        </router-link>
        <span slot="title">
          <router-link slot="title" :to="{path: item.url, query:{id:  item.id}}" :data-id="item.id">{{item.name}}</router-link>
          <span v-if="!tooltip">{{item.name}}</span>
        </span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<style lang="scss">
.side-menu {
  position: fixed;
  height: 100%;
  width: 230px;
  background: #fff;
  left: 0;
  top: 72px;
  // transition: width 180ms ease-in-out;
  z-index: 999;
}
#toggleMenuLabel {
  cursor: pointer;
  display: block;
  height: 35px;
  width: 16px;
  margin: 0 auto;
  background: url('./img/menu.png') center no-repeat;
}

#toggleMenu:checked + .wrap .side-menu {
  width: 64px;
  // transition: width 180ms ease;
}

#toggleMenu:checked + .wrap .side-menu .menu-list li a {
  padding-left: 13px;
  // transition: width 180ms ease-in-out;
}

#sideMenu {
  .el-menu,
  .el-submenu .el-menu {
    background: #fff;
  }
  .el-menu-item {
    padding: 0 !important;
    .el-tooltip {
      padding: 0 !important;
    }
  }
  .el-menu-item,
  .el-submenu__title {
    height: 50px;
    line-height: 50px;
    .el-icon-message {
      margin-left: -5px;
    }
  }
  .el-submenu__icon-arrow {
    display: none;
  }
  .side-toggle {
    display: block;
    width: 100%;
    margin: 0 auto;
    height: 36px;
    line-height: 36px;
    text-align: center;
    color: #90929c;
    font-size: 22px;
    border-bottom: 1px solid #eee;
  }

  .menu-list li {
    font-size: 16px;
  }

  .menu-list li.el-menu-item:hover {
    background: #f2f2f2;
  }

  .menu-list li span {
    font-size: 14px;
  }

  .menu-list li a {
    display: block;
    height: 50px;
    line-height: 50px;
    overflow: hidden;
    padding-left: 40px;
    padding-right: 20px;
    transition: all 180ms ease-in-out;
    color: #555;
    border-left: 4px solid #fff;
  }

  .menu-list li a.router-link-active {
    color: #01cd78;
    background: #f2f2f2;
    border-left-color: #01cd78;
    border-left: 4px solid #01cd78;
  }

  .el-icon-menu {
    font-size: 16px;
  }
}

/* @media screen and (max-width: 1360px) {
 .side-menu{
   zoom: .85;
 }
 .side-menu .side-toggle{
   margin-top: 30px;
 }
} */
</style>
<script>
import { getStore, setStore } from '@/utils/localStorage'
export default {
  name: 'side',
  data() {
    return {
      menuList: [],
      tooltip: true,
    }
  },
  created() {
    let menuParmas = JSON.parse(getStore('menuParmas'))
    let queryId = this.$route.query.id
    let queryType = this.$route.query.type
    if (!menuParmas) {
      this.$router.push('/')
      return
    }
    this.ajax({
      // url: 'authority/resource/' + menuParmas.id + '/tree/list',
      url: '/authority/resource/user/tree/list',
      data: {
        parentId: menuParmas.id,
        userId: Utils.getValue('u')
      },
      success(data, $this) {
        let { content } = data
        $this.menuList = content
        let isAuth = false
        function isAuthMenu(menu) {
          for (let i = 0; i < menu.length; i++) {
            if (menu[i].id == queryId) {
              isAuth = true
            } else if (menu[i].children.length > 0) {
              isAuthMenu(menu[i].children)
            }
          }
        }
        isAuthMenu(content)
        if (!isAuth && !queryType) {  //如果为false, 则表示没有权限访问
          $this.$router.push('/')
          console.log('没有权限访问....')
        }
      }
    })
  },
}
</script>
