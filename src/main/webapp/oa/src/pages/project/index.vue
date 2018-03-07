<template>
  <div class="module-content" id="project-manager">
    <p-header></p-header>
    <input class="z-hide" type="checkbox" id="toggleMenu">
    <div class="wrap">
      <p-sidebar @toShowAddDialog="openIt" ref="sidebar"></p-sidebar>
      <router-view class="content" :style="{'min-height': sideHeight+'px'}"></router-view>
    </div>

    <projectAdd ref="projectAdd" title="创建项目"></projectAdd>

  </div>
</template>
<style scoped>
.content {
  margin-top: 59px;
  padding: 24px 24px 40px;
  background: #eee;
}

.wrap {
  padding-left: 230px;
}

#toggleMenu:checked + .wrap {
  padding-left: 50px;
}
</style>
<style>
#project-manager .el-table .el-button {
  padding: 3px 3px;
  border: 0 none;
  color: #05d181;
}
.module-content .header-box {
  max-width: 100% !important;
}

.module-content .logo {
  width: 230px !important;
}

.el-pagination {
  margin-top: 30px;
  margin-bottom: 10px;
}

.el-dialog__headerbtn:focus .el-dialog__close,
.el-dialog__headerbtn:hover .el-dialog__close {
  color: #01cd78;
}
</style>
<script>
// import header from "./header";
import header from "../index/header";
import sidebar from "./sidebar";
import components from "@/components/"; //获取注册的全局组件
import { setStore, getStore } from "@/utils/localStorage";

export default {
  components: {
    "p-header": header,
    "p-sidebar": sidebar,
  },
  data() {
    return {
      sideHeight: 0,
    };
  },
  mounted() {
    this.sideHeight = this.$refs.sidebar.$el.clientHeight - 78;
  },
  beforeRouteEnter(to, from, next) {
    if (to.params && to.params.id && to.params.name) {
      setStore("menuParmas", to.params);
    }
    next();
  },
  methods: {
    openIt() {
      this.$refs.projectAdd.openProjectModal();
    },
  },
};
</script>

