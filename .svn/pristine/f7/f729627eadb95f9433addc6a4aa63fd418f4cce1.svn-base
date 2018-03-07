<template>
  <el-dialog title="批量修改直接上级" v-model="modal" size="tiny" id="editLeader">
      <el-form ref="leaderForm" :model="form" :rules="rules" label-width="100px" label-position="right">
        <el-form-item label="直接上级：" prop="leader">
          <el-select style="width:90%" v-model="form.leader" filterable placeholder="请输入关键字">
            <el-option v-for="item in personList" :key="item.id" :label="item.realname" :value="item.id "></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" :loading="disable" @click="submit">确 定</el-button>
        <el-button type="info" @click="modal = false">取 消</el-button>
      </span>
    </el-dialog>
</template>
<style>
#editLeader .el-dialog {
  width: 500px;
}
</style>
<script>
export default {
  name: "editLeader",
  data() {
    return {
      personList: [],
      userlist: [],
      modal: false,
      form: {
        leader: ""
      },
      rules: {
        leader: [
          {
            required: true,
            message: "直接上级不能为空！"
          }
        ]
      }
    };
  },

  methods: {
    openModal(user) {
      this.modal = true;
      this.userlist = user;
      this.resetForm("leaderForm");
      this.getAllPerson();
    },
    getAllPerson() {
      //获取全部人员
      this.ajax({
        url: "/authority/user/dep/1",
        data: {
          pageNum: 1,
          pageSize: 1000
        },
        success(data, $this) {
          if (data.code == "success") {
            $this.personList = data.content;
          }
        }
      });
    },
    submit() {
      this.$refs.leaderForm.validate(valid => {
        if (valid) {
          let selected = this.userlist;
          let params = {
            leaderId: this.form.leader,
            ids: []
          };
          for (let i in selected) {
            params.ids.push(i);
          }
          this.disable = true;
          this.ajax({
            url: "/authority/user/update/batch",
            type: "put",
            data: params,
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
