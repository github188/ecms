<template>
  <el-dialog :title="title" :visible.sync="modal" size="tiny" id="integralModal">
    <el-form ref="integralForm" :model="form" :rules="rules" label-width="100px" label-position="right">

      <el-form-item label="积分类别：" prop="name">
        <el-input v-model.trim="form.name" placeholder="请输入积分类别名称"></el-input>
      </el-form-item>
      <el-form-item label="积分数值：" prop="score">
        <el-input v-model.number="form.score" placeholder="请输入积分数值"></el-input>
      </el-form-item>
      <el-form-item label="使用说明：" prop="remark">
        <el-input v-model.trim="form.remark" type="textarea" placeholder="请输入积分的使用说明，如使用条件等，100字以内"></el-input>
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
</template>
<style lang="scss">
#integralModal {
  .el-dialog {
    width: 560px;
  }
}
</style>

<script>
export default {
  name: "operate",
  data() {
    return {
      modal: false,
      form: {
        name: "",
        score: "",
        remark: "",
        id: ""
      },
      type: 1,
      rules: {
        name: [
          {
            required: true,
            message: "积分类别不能为空!"
          },
          {
            max: 20,
            message: "不能超过20个字!"
          }
        ],
        score: [
          {
            required: true,
            type: "number",
            min: 0.1,
            max: 100,
            message: "积分数值不能为空且大于0小于等于100!"
          },
          {
            // pattern: /^\+?[1-9]\d*$/,
            pattern: /^[0-9]\d*(\.\d+)?$/,
            message: "积分数只能为数值!"
          }
        ],
        remark: [
          {
            required: true,
            message: "请输入使用说明!"
          },
          {
            max: 100,
            message: "积分使用说明不能超过100字！"
          }
        ]
      }
    };
  },
  methods: {
    openModal(type, row) {
      this.modal = true;
      this.type = type;
      if (type == 1) {
        setTimeout(() => {
          this.form.name = row.name;
          this.form.score = row.score;
          this.form.remark = row.remark;
          this.form.id = row.id;
        }, 100);
      } else {
        this.resetForm("integralForm");
      }
    },
    submit() {
      this.$refs.integralForm.validate(valid => {
        if (valid) {
          let arg = ["user", "UserScore"];
          if (this.type == 1) {
            //编辑
            arg[2] = "updateScoreType";
          } else {
            arg[2] = "addScoreType";
            delete this.form.id;
          }
          this.disable = true;
          this.command(...arg, this.form)
            .then(data => {
              this.disable = false;
              this.modal = false;
              this.$emit("getList");
              this.successTips("操作成功!");
            })
            .catch(error => {
              this.disable = false;
              this.errorTips(error.message);
            });
        }
      });
    }
  },
  props: ["title"]
};
</script>

