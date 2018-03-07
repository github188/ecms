<template>
  <el-dialog title="部门详情" :visible.sync="modal" size="small" id="departDetailModal">
      <el-row :gutter="24" v-loading="loading">
        <el-col :span="9">
          <el-form label-width="120px" label-position="right">
            <el-form-item label="部门名称：">
             
            </el-form-item>
            
            <el-form-item label="所属公司：">
            </el-form-item>
            
            <el-form-item label="创建时间：">
            </el-form-item>

           
            </el-form>
        </el-col>
        <el-col :span="9">
          <el-form label-width="120px" label-position="right">
            <el-form-item label="部门经理：">
            </el-form-item>
              <el-form-item label="上级部门：">
            </el-form-item>
           
          </el-form>
        </el-col>

      </el-row>
    </el-dialog>
</template>
<style lang="scss">
#departDetailModal {
  .el-form-item {
    margin-bottom: 0;
  }
  .el-dialog {
    width: 800px;
  }
}
</style>

<script>
export default {
  name: "departDetail",
  data() {
    return {
      modal: false,
      loading: false,
      person: {}
    };
  },
  methods: {
    openModal(row) {
      this.modal = true;
      // this.loading = true;
      this.userDetail();
    },
    userDetail() {
      
    }
  }
};
</script>

