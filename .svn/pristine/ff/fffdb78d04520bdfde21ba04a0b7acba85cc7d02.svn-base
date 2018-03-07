<template>
  <div class="entry-menu">
    <ul>
      <li v-for="(item, index) in menuList" :key="index">
        <!-- <router-link :to="{name: item.url, params:{id: item.id, name: item.name}}"> -->
        <router-link @click.native="setParams(item)" :to="{path: item._url, query: {id: item._id}}">
          <em class="icon" :class="item.icon"></em>
          <span>{{item.name}}</span>
          <em class="icon-cell"></em>
        </router-link>
      </li>
      <li>
        <a target="_blank" href="http://ecaray.learnnow.net.cn/app/user/userLogin/$">
          <em class="icon icon-learn"></em>
          <span>学习平台</span>
          <em class="icon-cell"></em>
        </a>
      </li>
    </ul>
  </div>
</template>
<style>
.entry-menu {
  height: 714px;
  background: #fff;
}

.entry-menu ul {
  padding: 20px 30px;
}

.entry-menu ul li {
  height: 76px;
  line-height: 76px;
  list-style: none;
  border-bottom: 1px solid #e5e5e5;
}

/* .entry-menu ul li a{
  transition: all .3s ease;
  margin-left: 0;
}
.entry-menu ul li:hover a{
  margin-left: 10px;
} */

.entry-menu ul li:last-child {
  border-bottom: none;
}

.entry-menu ul li a {
  display: block;
  height: 100%;
  position: relative;
}

.entry-menu ul li span {
  padding-left: 60px;
  font-size: 16px;
  color: #3e3e3e;
  /* transition: all 0.1s ease-out; */
}
/* .entry-menu ul li:hover span {
  padding-left: 68px;
  transition: all 0.1s ease-in;
} */
.entry-menu ul li a .icon-cell {
  display: inline-block;
  position: absolute;
  height: 11px;
  width: 7px;
  background: url('./../img/icon.png') -185px -140px;
  top: 34px;
  right: 0;
}

.entry-menu ul li a .icon {
  display: inline-block;
  height: 30px;
  width: 40px;
  position: absolute;
  top: 22px;
  background-image: url('./../img/icon.png');
}

.entry-menu ul li a .icon-affairs {
  background-position: -16px -22px;
}

.entry-menu ul li a .icon-finance {
  background-position: -70px -20px;
}

.entry-menu ul li a .icon-learn {
  background-position: -110px -20px;
}

.entry-menu ul li a .icon-client {
  background-position: -159px -20px;
}

.entry-menu ul li a .icon-contract {
  background-position: -205px -20px;
}

.entry-menu ul li a .icon-project {
  background-position: -256px -20px;
}

.entry-menu ul li a .icon-organize {
  background-position: -303px -20px;
}

.entry-menu ul li a .icon-oa {
  background-position: -356px -18px;
}

.icon-attendance {
  background-position: -402px -22px;
}
</style>

<script>
import { setStore } from '@/utils/localStorage'
export default {
  name: 'entryMenu',
  data() {
    return {
      menuList: [], // 菜单
    }
  },
  created() {
    this.getMenuList();
  },
  methods: {
    getMenuList() {
      this.ajax({
        //获取首页模块菜单
        // url: 'authority/resource/' + 1 + '/tree/list',
        url: '/authority/resource/user/tree/list',
        data: {
          userId: Utils.getValue('u'),
          parentId: 1
        },
        success(data, $this) {
          if (data.code == 'success') {
            let temp = data.content;
            let item = 0;
            function matchUrl(json, index) {
              for (let i = 0; i < json.length; i++) {
                if (index) {
                  item = i;
                }
                if (json[i].type == 0 && json[i].children.length > 0) {
                  matchUrl(json[i].children)
                } else if (json[i].type == 1) {
                  let _json = json[0];
                  temp[item]._id = _json.id;
                  temp[item]._url = _json.url;
                  temp[item]._name = _json.url;
                  break;
                }
              }
            }
            matchUrl(data.content, true)
            $this.menuList = temp
          }
          if (data.code == '401') {
            Utils.logOut()
          }
        },
      })
    },
    setParams(item) {
      let params = {
        id: item.id,
        name: item.name
      }
      setStore('menuParmas', params)
    },
  }
}
</script>

