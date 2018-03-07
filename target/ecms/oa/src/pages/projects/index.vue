<template>
  <div class="project-manager">
    <header-side class="nav-header"></header-side>
    <div style="margin-top:90px">
      <nav-side class="nav-bar"></nav-side>
      <div class="main-view">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import headerSide from "../index/header";
import navSide from "./layout/nav-sider";
export default {
  components: {
    headerSide,
    navSide,
  },
};
</script>
<style lang="scss">
.project-manager {
  .nav-header .header-box{
    min-width: 100%!important;
    padding: 0 24px;
  }
  .el-dialog{
    z-index: 2001;
    .el-dialog__header {
      background-color: #eee;
      margin: 0;
      padding: 20px;
      border-bottom: 0 none;
      .el-icon-close {
        color: #aaa;
      }
    }
  }
  .main-view {
    overflow-y: auto;
    margin-left: 230px;
    padding-left: 20px;
    .el-button.el-button--mini {
      color: #01cd78;
    }
    .el-button {
      &.el-button--primary {
        color: #01cd78;
        border: 1px solid #01cd78;
        background-color: #fff;
        &:hover {
          color: #fff;
          border: 1px solid #01cd78;
          background-color: #01cd78;
        }
      }
      &.el-button--mini {
        padding: 5px 3px;
      }
    }
  }
}
</style>
