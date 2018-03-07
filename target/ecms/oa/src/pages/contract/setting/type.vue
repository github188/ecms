//类型设置
<template>
  <div>
    <button style="margin-bottom: 20px; float: right" @click="addType" type="button" class="btn btn-space">新增</button>
    <div id="tableList"></div>
    <el-dialog :title="title + '合同类型'" :visible.sync="modal" size="tiny" class="contract-type-modal">
      <el-form ref="form" :model="form" :rules="rules" label-width="95px" label-position="right">
        <el-form-item label="合同类型：" prop="name">
          <el-input v-model="form.name" style="width: 90%"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" :disabled="disable" v-if="disable">
          <i class="el-icon-loading"></i>
        </el-button>
        <el-button type="success" :disabled="disable" @click="submit" v-else>确 定</el-button>
        <el-button type="info" @click="modal = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style>
.contract-type-modal .el-dialog {
  width: 500px;
}
</style>

<script>
export default {
  name: 'typeSetting',
  created() {
    this.getList();
  },
  data() {
    return {
      modal: false,
      title: '添加',
      form: {
        name: '',
        id: '',
        value: '',
        code: 'ctm_attr'
      },
      rules: {
        name: [{
          required: true,
          message: '合同类型不能为空！'
        }]
      }
    };
  },
  methods: {
    getList() {
      const $this = this;
      this.tableList({
        columns: [{
          name: '编号',
          value: 'value'
        }, {
          name: '合同类型',
          value: 'name'
        }, {
          name: '操作',
          operator() {
            return [{
              name: '编辑',
              click(row) {
                $this.resetForm('form');
                $this.title = '编辑';
                $this.modal = true;
                $this.form.name = row.name;
                $this.form.id = row.id;
                $this.form.value = row.value;
              }
            }];
          }
        }],
        url: '/ctm/setting/param/list',
        data: {
          code: 'ctm_attr'
        }
      });
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.disable = true;
          let _value = this.form.value;
          let params = this.form;
          this.ajax({
            url: '/ctm/setting/param/update',
            type: 'put',
            data: {
              data: [Utils.filterObjectNull(params)]
            },
            success(data, $this) {
              if (data.code == 'success') {
                $this.$message({
                  message: '操作成功！',
                  type: 'success'
                });
                $this.modal = false;
                $this.getList();
              } else {
                $this.$message({
                  message: data.message,
                  type: 'warning'
                });
              }
            }
          });
        }
      });
    },
    addType() {
      this.title = '添加';
      this.modal = true;
      this.form.name = '';
      this.form.id = '';
      this.form.value = '';
      this.resetForm('form');
    }
  }
};
</script>
