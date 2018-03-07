<template>
  <div>
    <el-dialog :title="isAdd?'新增公司':'编辑公司'" :visible.sync="modal" size="tiny" id="enteringModal">
      <el-form ref="form" :model="form" :inline="true" :rules="rules" label-width="110px" label-position="right" v-loading="loading">


        <el-popover
            ref="popover1"
            placement="top-start"
            title="标题"
            width="200"
            trigger="click"
            content="这是一段内容,这是一段内容,这是一段内容,这是一段内容。">
        </el-popover>


        <el-form-item label="公司编号：" prop="number">
          <el-input style="width: 300px;" placeholder="请输入公司编号"  v-model.trim="form.number">
            </el-input>
            <span style="cursor: pointer" class="tips" v-popover:popover1>查看公司编号规则</span>
        </el-form-item>

      

        <el-form-item label="公司名称：" prop="name">
          <el-input placeholder="请输入公司名称，50个字以内"  v-model.trim="form.name">
            </el-input>
        </el-form-item>

        <el-form-item label="上级公司：" prop="company">
         <el-select clearable v-model="company">
             <el-option label="前海亿车科技有限公司" value="1"></el-option>
         </el-select>
        </el-form-item>

        <el-form-item label="负责人：" prop="name">
          <el-input placeholder="请输入公司法人姓名"  v-model.trim="form.name">
            </el-input>
        </el-form-item>

        <el-form-item label="办公地址：" prop="name">
          <el-input placeholder="请输入公司地址"  v-model.trim="form.name">
            </el-input>
        </el-form-item>

        <el-form-item label="公司电话：" prop="name">
          <el-input placeholder="请输入公司电话"  v-model.trim="form.name">
            </el-input>
        </el-form-item>

        <el-form-item label="成立日期：" prop="createDate">
          <el-date-picker :editable="false" v-model="form.createDate" type="date" placeholder="请选择日期">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="管理员账号：" prop="name">
          <el-input style="width: 250px;" readyonly v-model.trim="form.name">
            </el-input>
            <span class="tips">注：初始密码与账号一致</span>
        </el-form-item>
      
        <el-form-item label="备注：" prop="remark">
          <el-input :autosize="{ minRows: 2, maxRows: 6}" type="textarea" placeholder="备注" v-model.trim="form.remark"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" :loading="disable" @click="submit" >确 定</el-button>
        <el-button type="info" @click="modal = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<style lang="scss">
#enteringModal {
  .el-dialog {
    width: 600px;
  }
  .el-input,
  .el-textarea {
    width: 400px;
  }
  .tips {
    font-size: 12px;
    padding-left: 10px;
    color: red;
  }
}
</style>

<script>
let flag = true;
export default {
  name: "company",
  data() {
    return {
      isAdd: false, //是否新增模式
      modal: false,
      loading: false,
      rules: {
        number: [
          {
            required: true,
            message: "公司编号不能为空!"
          }
        ],
        name: [
          {
            required: true,
            message: "公司名称不能为空!"
          },
          {
            max: 50,
            message: "公司名称不能超过50个字符!"
          }
        ],
        remark: [
          {
            max: 100,
            message: "备注不能超过100个字符!"
          }
        ]
      },
      form: {
        number: "",
        name: "",
        createDate: "",
        company: new Date()
      }
    };
  },
  mounted() {},
  methods: {
    openModal(row) {
      this.isAdd = !Boolean(row);
      this.modal = true;
      this.disable = true;
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
        }
      });
    }
  }
};
</script>
