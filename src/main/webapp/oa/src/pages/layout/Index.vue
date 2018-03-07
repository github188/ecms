<template>
  <div id="index" class="module-content">
    <c-header></c-header>
    <input class="z-hide" type="checkbox" id="toggleMenu">
    <div class="wrap">
      <c-side ref="side"></c-side>
      <router-view class="content"></router-view>
    </div>
  </div>
</template>

<style scoped>
.content {
  background: #eee;
  margin-top: 59px;
  padding: 24px 24px 40px;
  min-height: calc(100vh - 78px);
}

.wrap {
  padding-left: 230px;
  transition: all 280ms ease;
}

#toggleMenu:checked + .wrap {
  padding-left: 50px;
  transition: all 180ms ease;
}
</style>
<style>
.module-content .header-box {
  max-width: 100% !important;
  padding: 0;
}

.module-content .logo {
  width: 230px !important;
}
</style>
<script>
import Header from "@/pages/index/header";
import Side from "./Side";
import components from "@/components/"; //获取注册的全局组件

export default {
  components: {
    "c-header": Header,
    "c-side": Side,
  },
  methods: {
    searchForm() {
      this.$nextTick(() => {
        if ($('.el-form').length != 0) {
          $('.el-form').find('input:text')
            .off('keypress').on('keypress', function (e) {
              if (e.keyCode == 13) {
                e.preventDefault()
                $(this)
                  .parents('.panel')
                  .find('.search-btn')
                  .trigger('click')
              }
            })
        }
      })
    }
  },
  mounted() {
    this.searchForm();
  },
  updated() {
    this.searchForm();
  },
}
</script>


