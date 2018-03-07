<template>
  <div>
    <v-panel>
      <el-form label-width="90px" :inline="true">
        <el-form-item label="角色状态：">
          <el-select v-model="status" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="角色名称：">
          <el-input v-model="name"></el-input>
        </el-form-item>
        <button type="button" @click="getList" class="search-btn btn btn-green" style="margin-top:4px;">查询</button>
      </el-form>
    </v-panel>

    <v-panel title="角色管理">
      <div slot="button">
        <button type="button" @click="addModal = true" class="btn btn-space">新增</button>
      </div>
      <div id="roleTableList"></div>
    </v-panel>

    <el-dialog title="编辑角色" :visible.sync="editModal" size="tiny">
      <el-form ref="editForm" :model="editForm" :rules="rules" label-width="120px" label-position="right">
        <el-form-item label="角色名称：" prop="name">
          <el-input v-model="editForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色备注：">
          <el-input v-model="editForm.profile" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" :disabled="disable" v-if="disable">
          <i class="el-icon-loading"></i>
        </el-button>
        <el-button type="success" :disabled="disable" @click="editSubmit" v-else>确 定</el-button>
        <el-button type="info" @click="editModal = false">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog title="新增角色" :visible.sync="addModal" size="tiny">
      <el-form ref="addForm" :model="addForm" :rules="rules" label-width="120px" label-position="right">
        <el-form-item label="角色名称：" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色备注：">
          <el-input v-model="addForm.profile" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" :disabled="disable" v-if="disable">
          <i class="el-icon-loading"></i>
        </el-button>
        <el-button type="success" :disabled="disable" @click="addSubmit" v-else>确 定</el-button>
        <el-button type="info" @click="addModal = false">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog @open="allotOpen" :title="roleTitle" :visible.sync="allotModal" size="small">
      <el-tree ref="allotTree" style="height: 500px; overflow: auto" :data="menuList" :props="{
            label: 'name',
            children: 'children'
        }" :check-strictly="true" default-expand-all show-checkbox node-key="id">
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" :disabled="disable" v-if="disable">
          <i class="el-icon-loading"></i>
        </el-button>
        <el-button type="success" :disabled="disable" @click="allotSubmit" v-else>确 定</el-button>
        <el-button type="info" @click="allotModal = false">取 消</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<style>

</style>

<script>
export default {
  name: 'rolesManage',
  data() {
    return {
      editModal: false,
      addModal: false,
      allotModal: false, // 角色分配菜单
      roleTitle: '',  //  角色分配菜单弹出框名称
      status: '',  //角色状态
      name: '', //角色名称
      menuList: [],  //角色所有的菜单
      rolesId: '', //选中项对应的id
      options: [{
        name: '全部',
        value: ''
      }, {
        name: '已启用',
        value: '0'
      }, {
        name: '已停用',
        value: '1'
      }],
      editForm: {
        name: '',
        profile: '',
        id: ''
      },
      addForm: {
        name: '',
        profile: '',
      },
      rules: {
        name: {
          required: true,
          message: '角色名称不能为空！'
        }
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      const params = {
        status: this.status,
        name: this.name
      };
      const $this = this;
      this.tableList({
        url: '/authority/role/list',
        element: '#roleTableList',
        data: Utils.filterObjectNull(params),
        columns: [{
          name: '角色名称',
          value: 'name',
          align: 'left'
        }, {
          name: '角色说明',
          value: 'profile',
          align: 'left'
        }, {
          name: '角色状态',
          width: 100,
          render(row) {
            return row.status == 0 ? '启用中' : '停用中';
          }
        }, {
          name: '操作',
          width: 180,
          operator(row) {
            let { status } = row;
            let statusName = '启用';
            if (status == 0) {
              statusName = '停用';
              status = 1;
            } else {
              status = 0;
            }
            return [{
              name: '编辑',
              click(row) {
                $this.editModal = true;
                $this.editForm.name = row.name;
                $this.editForm.profile = row.profile;
                $this.editForm.id = row.id;
              }
            }, {
              name: statusName,
              click(row) {
                $this.$confirm('确定要' + statusName + '【' + row.name + '】这个角色？', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  $this.ajax({
                    url: '/authority/role',
                    type: 'put',
                    data: {
                      id: row.id,
                      status: status
                    },
                    success(data) {
                      if (data.code == 'success') {
                        $this.$message({
                          type: 'success',
                          message: '操作成功!'
                        });
                        $this.getList();
                      }
                    }
                  });
                }).catch(() => { });
              }
            }, {
              name: '分配菜单',
              click(row) {
                $this.allotModal = true;
                $this.rolesId = row.id;
                $this.roleTitle = "给【" + row.name + "】这个角色分配菜单";
              }
            }];
          },
        }]
      });
    },
    editSubmit() {
      this.$refs.editForm.validate((valid) => {  //更新
        if (valid) {
          this.disable = true;
          this.ajax({
            url: '/authority/role',
            type: 'put',
            data: {
              id: this.editForm.id,
              name: this.editForm.name,
              profile: this.editForm.profile
            },
            success(data, $this) {
              if (data.code == 'success') {
                $this.$message({
                  type: 'success',
                  message: '修改成功!'
                });
                $this.editModal = false;
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

    addSubmit() {
      this.$refs.addForm.validate((valid) => {   //添加
        if (valid) {
          this.disable = true;
          this.ajax({
            url: '/authority/role',
            type: 'post',
            data: {
              name: this.addForm.name,
              profile: this.addForm.profile
            },
            success(data, $this) {
              if (data.code == 'success') {
                $this.$message({
                  type: 'success',
                  message: '添加成功!'
                });
                $this.addModal = false;
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
    allotSubmit() {
      let nodes = this.$refs.allotTree.getCheckedNodes();
      let params = [];
      for (let i = 0; i < nodes.length; i++) {
        params.push({
          roleId: this.rolesId,
          resourceId: nodes[i].id
        });
      }
      this.disable = true;
      this.ajax({
        url: '/authority/role/resource/batch',
        data: params,
        type: 'put',
        success(data, $this) {
          if (data.code == 'success') {
            $this.$message({
              message: '操作成功！',
              type: 'success'
            });
            $this.allotModal = false;
          } else {
            $this.$message({
              message: data.message,
              type: 'warning'
            });
          }
        }
      });
    },
    allotOpen() {
      this.getMenu();
    },
    getMenu() {
      this.ajax({
        url: 'authority/resource/tree/list',
        success(data, $this) {
          if (data.code == 'success') {
            $this.menuList = data.content;
            $this.getRoleMenu();
          }
        }
      });
    },
    getRoleMenu() {  //获取当前角色所勾选的菜单
      if (this.rolesId == '1') { //超级管理员
        this.$refs.allotTree.setCheckedKeys(['1']);
      } else {
        this.ajax({
          url: '/authority/resource/role/resources?roleId=' + this.rolesId + '&pageNum=0&pageSize=0',
          success(data, $this) {
            if (data.code == 'success') {
              let content = data.content;
              let arr = [];
              for (let i = 0; i < content.length; i++) {
                if (content[i].id != '1') {
                  arr.push(content[i].id);
                }
              }
              $this.$refs.allotTree.setCheckedKeys(arr);
            }
          }
        });
      }
    }
  }
};

</script>

