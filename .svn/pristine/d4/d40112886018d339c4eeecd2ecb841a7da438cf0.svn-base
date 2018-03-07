//类型设置
<template>
  <div id="projectVisible">
    <button style="margin-bottom: 20px; float: right" @click="addType" type="button" class="btn btn-space">新增</button>
    <div id="projectList"></div>
    <el-dialog title="新增可见项目人员" :visible.sync="modal" size="tiny" class="contract-type-modal">
      <el-form ref="form" :model="form" :rules="rules" label-width="95px" label-position="right">
        <el-form-item label="选择人员：" prop="userId" style="width:360px">
          <el-select v-model="form.userId" filterable clearable placeholder="请输入关键字">
            <el-option v-for="(item, index) in personList" :key="item.id" :disabled="banPerson(item.id, index)" :label="item.realname" :value="item.id">
            </el-option>
          </el-select>
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
<style lang="scss">
#projectVisible {
  .el-dialog {
    width: 500px;
    .el-input {
      width: 360px !important;
    }
  }
}
</style>

<script>
export default {
  name: 'projectVisible',
  created() {
    this.getPersonList();
    this.getList();
  },
  data() {
    return {
      modal: false,
      personList: [],
      disablePerson: [],
      form: {
        userId: ''
      },
      rules: {
        userId: [{
          required: true,
          message: '可见项目人员不能为空！'
        }]
      }
    };
  },
  methods: {
    getPersonList() {  //获取审批人列表
      this.ajax({
        url: '/authority/user/query/list',
        data: {
          pageNum: 1,
          pageSize: 1000
        },
        success(data, $this) {
          if (data.code == 'success') {
            $this.personList = data.content;
          }
        }
      });
    },
    banPerson(id, index) {
      for (let item in this.disablePerson) {
        if (this.disablePerson[item].userId == id) {
          return true
        }
      }
    },
    getList() {
      let $this = this;
      this.tableList({
        element: '#projectList',
        command: ["sys", "Project", "listUserByProjectRole"],
        complete(data) {
          $this.disablePerson = data.data
        },
        columns: [{
          name: '姓名',
          value: 'realname',
          width: 120
        }, {
          name: '部门',
          align: 'left',
          render(row) {
            return $this.reverseDepart(row.depname)
          }
        }, {
          name: '操作',
          width: 100,
          operator() {
            return [{
              name: '删除',
              click(row) {
                $this.confirmTips({
                  title: '确认信息',
                  content: `是否要删除【${row.realname}】`,
                  submit() {
                    $this.command('sys', 'Project', 'removeUserProjectRole', { userId: row.userId }).then((result) => {
                      $this.successTips('操作成功!')
                      $this.getList();
                    }).catch(() => {
                      $this.errorTips('操作失败!')
                    })
                  }
                })
              }
            }];
          }
        }],
      });
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.disable = true;
          this.command('sys', 'Project', 'addUserProjectRole', this.form).then((result) => {
            this.successTips('操作成功!')
            this.modal = false
            this.disable = false;
            this.getList()
          }).catch(() => {
            this.errorTips('操作失败!')
            this.disable = false;
          })
        }
      });
    },
    addType() {
      this.modal = true;
      this.disable = false
      this.resetForm('form');
    }
  }
};
</script>
