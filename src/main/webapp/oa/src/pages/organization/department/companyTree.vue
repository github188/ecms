<template>
    <div style="overflow: hidden;">
        <el-tree id="companyTree" node-key="id" ref="tree"
        highlight-current  
        :default-expanded-keys="['1']" 
        :expand-on-click-node="true" 
        :data="companyList" 
        :props="{label: 'name',children: 'children'}">
        </el-tree>
        <departTreeList ref="departTreeList" />
    </div>
</template>
<style lang="scss">
#companyTree {
  width: 300px;
  float: left;
  height: 550px;
  overflow: auto;
}
</style>
<script>
import departTreeList from "./departTreeList";
export default {
  name: "companyTree",
  data() {
    return {
      companyList: []
    };
  },
  components: {
    departTreeList
  },
  created() {
    this.getCompany();
  },
  methods: {
    getCompany() {
      // 获取部门树
      this.ajax({
        url: "/authority/dep/tree/list",
        success(data, $this) {
          if (data.code == "success") {
            $this.companyList = data.content;
          }
        }
      });
    }
  }
};
</script>

