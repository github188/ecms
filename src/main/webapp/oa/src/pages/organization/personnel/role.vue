<template>
  <el-dialog title="分配角色" :visible.sync="modal" size="small" id="rolesModal">
      <div id="roleList"></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" :loading="disable" @click="roleSubmit">确 定</el-button>
        <el-button type="info" @click="modal = false">取 消</el-button>
      </span>
    </el-dialog>
</template>
<style>
#rolesModal .el-dialog {
  width: 1000px;
}
#roleList .el-table {
  min-height: 443px;
}
</style>

<script>
export default {
  name: "roles",
  data() {
    return {
      modal: false,
      roleList: [],
      userList: [],
      batch: false //是否批量分配
    };
  },
  methods: {
    openModal(row) {
      this.modal = true;
      this.queryRole(row.id);
    },
    queryRole(id) {
      this.userList = id;
      this.ajax({
        // 获取当前用户的角色权限
        url: "/authority/role/user/rolelist",
        data: {
          userId: id,
          pageNum: 0,
          pageSize: 0
        },
        success(data, $this) {
          if (data.code == "success") {
            $this.roleList = data.content;
            $this.getRoleList(data.content); //获取所有角色权限
          }
        }
      });
    },
    getRoleList(select, userList) {
      let $this = this;
      let selected = [];
      if (select == "batch") {
        this.batch = true;
        this.modal = true;
        this.userList = userList;
      } else {
        this.batch = false;
        selected = select;
      }
      this.tableList({
        url: "/authority/role/list",
        element: "#roleList",
        checkbox: {
          selected,
          change(obj) {
            $this.roleList = [];
            for (let id in obj) {
              $this.roleList.push({
                id
              });
            }
          }
        },
        columns: [
          {
            name: "角色名称",
            value: "name"
          },
          {
            name: "角色说明",
            value: "profile"
          },
          {
            name: "角色状态",
            render(row) {
              return ["启用", "停用"][row.status];
            }
          }
        ]
      });
    },
    roleSubmit() {
      this.disable = true;
      let params, type, url;
      let roleList = this.roleList; //角色列表
      if (this.batch) {
        type = "put";
        url = "/authority/user/update/batch";
        let userList = this.userList; //用户列表
        params = {
          ids: [],
          roleIds: []
        };
        for (let i in userList) {
          params.ids.push(i);
        }
        for (let i = 0; i < roleList.length; i++) {
          params.roleIds.push(roleList[i].id);
        }
      } else {
        params = [];
        type = "post";
        url = "/authority/user_permission";
        for (let i = 0; i < roleList.length; i++) {
          params.push({
            roleId: roleList[i].id,
            userId: this.userList
          });
        }
      }
      this.ajax({
        url,
        data: params,
        type,
        success(data, $this) {
          if (data.code == "success") {
            $this.batch = false;
            $this.successTips();
            $this.modal = false;
          } else {
            $this.errorTips(data.message);
          }
        }
      });
    }
  }
};
</script>

