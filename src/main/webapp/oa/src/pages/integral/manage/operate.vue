<template>
  <el-dialog :title="title" :visible.sync="modal" size="tiny" id="integralModal">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-position="right">

      <el-form-item label="积分类别：" prop="name">
        <!-- <el-input v-model="form.category"></el-input> -->
        <el-select v-model="form.name" placeholder="请选择积分类别" style="width: 420px">
          <el-option
            v-for="item in integralList"
            :key="item.value"
            :label="item.name"
            :value="item.name">
            <span style="float: left">{{ item.name }}</span>
            <span style="float: right; font-size: 13px">{{ item.score }}分</span>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="积分日期：" prop="date">
        <el-date-picker v-model="form.date" type="date" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="积分说明：" prop="remark">
        <el-input v-model.trim="form.remark" placeholder="请输入积分说明，100字以内" type="textarea"></el-input>
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
      integralList: [], //积分类别
      form: {
        ids: "",
        id: "",
        name: "",
        date: "",
        remark: ""
      },
      type: "",
      rules: {
        name: [
          {
            required: true,
            message: "请选择积分类别!"
          }
        ],
        date: [
          {
            required: true,
            message: "积分日期不能为空!"
          }
        ],
        remark: [
          {
            required: true,
            message: "请输入积分说明!"
          },
          {
            max: 100,
            message: "积分说明不能超过100字!"
          }
        ]
      }
    };
  },
  created() {
    this.getIntegralList();
  },
  methods: {
    openModal(ids, type) {
      this.form.name = "";
      this.resetForm("form");

      if (type == 1) {
        this.form.name = ids.name;
        this.form.name = ids.name;
        this.form.remark = ids.remark;
        this.form.date = ids.date;
        this.form.id = ids.id;
      } else {
        this.form.ids = ids;
      }
      this.type = type;
      this.modal = true;
    },
    getIntegralList() {
      // 获取积分类别
      this.command("user", "UserScore", "listScoreType", { ispage: 0 }).then(
        data => {
          this.integralList = data.data;
        }
      );
    },

    submit() {
      let $this = this;
      this.$refs.form.validate(valid => {
        if (valid) {
          var rquest = () => {
            $this.disable = true;
            let arg = ["user", "UserScore", "addUserScore"];
            if (this.type == 1) {
              // type == 1 修改积分记录， 分配积分
              arg[2] = "updateUserScore";
            }
            let params = JSON.parse(JSON.stringify(this.form));
            params.date = new Date(params.date).toDay();
            this.command(...arg, params)
              .then(() => {
                this.disable = false;
                this.modal = false;
                this.$emit("getList");
                this.successTips("操作成功!");
              })
              .catch(error => {
                this.disable = false;
                this.errorTips(error.message);
              });
          };
          if (this.type == 1) {
            this.confirmTips({
              title: "确认信息",
              content: "提交修改结果，积分将以最新数值为准，确认修改？",
              submit() {
                rquest();
              }
            });
          } else {
            rquest();
          }
        }
      });
    }
  },
  props: ["title"]
};
</script>

