<template>
  <div>
    <v-panel class="search-panel">
      <el-tabs v-model="activeTab" type="card" @tab-click="handleClick">
        <el-tab-pane label="合同类型设置" name="type">
          <v-type></v-type>
        </el-tab-pane>
        <el-tab-pane label="合同审批设置" name="approve">
          <v-approve></v-approve>
        </el-tab-pane>
        <el-tab-pane label="合同模板管理" name="template">
          <v-template></v-template>
        </el-tab-pane>
      </el-tabs>
    </v-panel>
  </div>
</template>

<script>
import Type from './type';
import Approve from './approve';
import Template from './template';
export default {
  name: 'contracSetting',
  components: {
    'v-type': Type,
    'v-approve': Approve,
    'v-template': Template
  },
  data() {
    return {
      activeTab: 'type',
    };
  },
  methods: {
    handleClick() {

    },
  }
};

</script>
