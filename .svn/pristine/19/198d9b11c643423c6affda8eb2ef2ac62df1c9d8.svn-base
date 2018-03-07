<template>
  <el-dialog :title="isAdd?'新增部门':'编辑部门'" :visible.sync="modal" size="tiny" id="departManages">
      <el-form ref="form" :model="form" :rules="rules" label-width="110px" label-position="right" v-loading="loading">
        <el-form-item label="部门名称：" prop="departName">
          <el-input v-model="form.departName" placeholder="请输入部门名称" style="width: 90%"></el-input>
        </el-form-item>

        <el-row>
            <el-col :span="12">
                <el-form-item  label="所属公司：" prop="company">
            <el-cascader :options="departCascader" :change-on-select="true" :props="{
                        value: 'id',
                        label: 'name',
                        children: 'children'
                    }" v-model="form.company">
            </el-cascader>
        </el-form-item>
            </el-col>
            <el-col :span="12" style="margin-left: -10px;">
                <el-form-item  label="上级部门：" prop="parentName">
          <el-cascader :options="departCascader" :change-on-select="true" :props="{
                      value: 'id',
                      label: 'name',
                      children: 'children'
                    }" v-model="form.parentName">
          </el-cascader>
        </el-form-item>
            </el-col>
            <el-col :span="12">
                <el-form-item label="部门负责人：" prop="currentLeader">
          <el-select v-model="form.currentLeader"  value-key="id" filterable clearable placeholder="请输入关键字">
            <el-option v-for="item in personList" :key="item.id" :label="item.realname" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
            </el-col>
        </el-row>
        
        <el-form-item label="备注：" prop="remark">
          <el-input type="textarea" v-model="form.remark" placeholder="请输入部门名称" style="width: 90%"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" :loading="disable" @click="submit" >确 定</el-button>
        <el-button type="info" @click="modal = false">取 消</el-button>
      </span>
    </el-dialog>
</template>
<style>
#departManages .el-dialog {
  width: 800px;
}
</style>

<script>
export default {
  name: "departManage",
  data() {
    return {
      modal: false,
      title: "",
      isAdd: true,
      loading: false,
      companyCascader: [], //公司级联选择
      departCascader: [], //部门级联选择
      personList: [], //部门负责人列表
      rules: {
        departName: [
          {
            required: true,
            message: "部门名称不能为空!"
          },
          {
            max: 50,
            message: "部门名称不能超过50个字!"
          }
        ],
        company: [
          {
            required: true,
            message: "所属公司不能为空!"
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
        departName: "",
        company: [],
        parentName: [],
        currentLeader: {},
        remark: ""
      }
    };
  },
  methods: {
    openModal(row) {
      this.modal = true;
      this.isAdd = !row;
    },
    getCompany() {},

    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
        }
      });
    }
  }
};
</script>

