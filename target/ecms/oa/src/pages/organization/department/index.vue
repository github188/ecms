<template>
  <div>
    <v-panel>
        <el-form ref="formInline" :model="form" label-width="90px" :inline="true">
        <el-form-item label="部门名称：">
        <el-input placeholder="请输入部门关键字" v-model="form.name"></el-input>
        </el-form-item>
        <button type="button" @click="getList(form)" class="search-btn btn btn-green" style="margin-top:4px; margin-left: 10px;">查询</button>
    </el-form>
    </v-panel>

    <v-panel title="请选择公司">
        <div slot="button">
            <el-button type="info" @click="addPerson">新增</el-button>
        </div>
        <companyTree @getList="getList"  />
    </v-panel>
    <departManages ref="departManages" />
  </div>
</template>

<script>
import companyTree from "./companyTree";
import departManages from "./departManage";
export default {
  name: "departManage",
  components: {
    companyTree,
    departManages
  },
  data() {
    return {
      form: {
        name: ""
      }
    };
  },
  mounted() {},
  methods: {
    getList() {},
    addPerson() {
        this.$refs.departManages.openModal()
    }
  }
};
</script>
