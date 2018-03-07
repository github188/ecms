<template>
  <div>
    <v-panel class="search-panel">
      <el-tabs v-model="activeTab" type="card">
        <el-tab-pane label="项目可见设置" name="projectVisible">
          <v-visible></v-visible>
        </el-tab-pane>
      </el-tabs>
    </v-panel>
  </div>
</template>

<script>
import Visible from './projectVisible';
export default {
  name: 'contracSetting',
  components: {
    'v-visible': Visible
  },
  data() {
    return {
      activeTab: 'projectVisible',
    };
  }
};

</script>
