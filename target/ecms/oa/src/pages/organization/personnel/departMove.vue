<template>
  <el-dialog title="批量移动部门" v-model="modal" size="tiny" id="moveDepartModal">
      <el-form ref="departForm" :model="form" :rules="rules" label-width="100px" label-position="right">
        <el-form-item label="选择部门" prop="depart">
          <el-cascader style="width: 90%" :options="departCascader" :change-on-select="true" :props="{
                  value: 'id',
                  label: 'name',
                  children: 'children'
                }" v-model="form.depart">
          </el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" :loading="disable" @click="submit">确 定</el-button>
        <el-button type="info" @click="modal = false">取 消</el-button>
      </span>
    </el-dialog>
</template>
<style>
#moveDepartModal .el-dialog {
  width: 500px;
}
</style>

<script>
export default {
  name: "moveDepart",
  data() {
    return {
      modal: false,
      form: {
        depart: []
      },
      userList: [],
      departCascader: [],
      rules: {
        depart: [
          {
            required: true,
            message: "部门不能为空！"
          }
        ]
      }
    };
  },

  methods: {
    openModal(selected) {
      this.modal = true;
      this.userList = selected;
      this.resetForm("departForm");
      this.getDepartment();
    },
    getDepartment() {
      // 获取部门树
      this.ajax({
        url: "/authority/dep/tree/list",
        success(data, $this) {
          if (data.code == "success") {
            $this.departList = data.content;
            $this.departCascader = $this.delTree(data.content);
          }
        }
      });
    },
    submit() {
      //批量移动部门
      this.$refs.departForm.validate(valid => {
        if (valid) {
          this.disable = true;
          let departId = this.form.depart;
          let selected = this.userList;
          let params = {
            depId: departId[departId.length - 1],
            ids: []
          };
          for (let i in selected) {
            params.ids.push(i);
          }
          this.ajax({
            url: "/authority/user/update/batch",
            data: params,
            type: "put",
            success(data, $this) {
              if (data.code == "success") {
                $this.successTips();
                $this.modal = false;
              } else {
                $this.errorTips(data.message);
              }
            }
          });
        }
      });
    }
  }
};
</script>
