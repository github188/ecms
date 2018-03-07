// 审批设置
<template>
  <div>
    <el-form>
      <el-form-item label="合同类型：">
        <v-code codeType="ctm_attr" @change="getCode" :defalultChoose="true" :clearable="false"></v-code>
      </el-form-item>
    </el-form>

    <div id="approveList" v-if="code"></div>
    <el-dialog title="审批人设置" :visible.sync="modal" size="tiny" id="tinyTypeModal">
      <el-form label-width="80px" label-position="right">
        <el-form-item label="审批人：">
          <el-select v-model="person" filterable clearable :multiple="true" placeholder="请输入关键字">
            <el-option v-for="item in personList" :key="item.id" :label="item.realname" :value="item.id + '|' + item.realname">
              <span style="float:left" class="search-label">{{item.realname}}</span>
              <span style="float:right; padding-right:40px;" class="search-label">{{item.phone}}</span>
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
<style scoped>
.tips {
  padding: 40px;
  text-align: center;
  font-size: 14px;
}
</style>

<style>
#tinyTypeModal .el-input {
  width: 450px !important;
}
#tinyTypeModal .el-dialog{
  width: 600px;
}
</style>

<script>
export default {
  name: 'approveSetting',
  data() {
    return {
      code: '',
      person: [],  //当前已经设置好的审批人
      personList: [],  //所有员工列表
      modal: false,
      nodeId: ''  //节点id
    };
  },
  created() {
    this.getPersonList();
    this.getList();
  },
  methods: {
    getList() {   //获取审批列表
      const $this = this;
      this.tableList({
        columns: [{
          name: '审批名称',
          value: 'nodeName'
        }, {
          name: '审批人',
          value: 'name',
          render(row) {
            let user = row.user || [];
            let tempUsre = [];
            for (let i = 0; i < user.length; i++) {
              tempUsre.push(user[i].realname);
            }
            return tempUsre.join('、');
          }
        }, {
          name: '操作',
          operator() {
            return [{
              name: '设置',
              click(row) {
                $this.modal = true;
                let user = row.user || [];
                $this.person = [];
                $this.nodeId = row.nodeId;
                for (let i = 0; i < user.length; i++) {
                  $this.person.push(user[i].id + '|' + user[i].realname);
                }

              }
            }];
          }
        }],
        url: '/ctm/setting/attr/list',
        data: {
          attr: this.code
        },
        element: '#approveList',
        isPage: false
      });
    },
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
    getCode(obj) {
      this.code = obj.value;
      this.getList();
    },

    submit() {
      this.disable = true;
      let person = this.person;
      let tempPerson = [];
      for (let i = 0; i < person.length; i++) {
        tempPerson.push({
          id: person[i].split('|')[0]
        });
      }
      this.ajax({
        url: '/ctm/setting/attr/update',
        type: 'post',
        data: {
          attr: this.code,
          nodeId: this.nodeId,
          user: tempPerson
        },
        success(data, $this) {
          if (data.code == 'success') {
            $this.$message({
              message: '操作成功！',
              type: 'success'
            });
            $this.modal = false;
            $this.disable = false;
            $this.getList();
          } else {
            $this.$message({
              message: data.message,
              type: 'warning'
            });
            $this.disable = false;
          }
        }
      });
    }
  }
};
</script>
