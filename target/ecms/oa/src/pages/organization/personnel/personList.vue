<template>
  <div style="padding-left: 320px;">
      <span class="census" v-if="census.selectedCount == 0">{{census.name}}（共{{census.total}}人）</span>
      <template v-else>
        <span class="census selectedCount" style="float:left">当前已选中（{{census.selectedCount}}）条数据</span>
        <el-button style="margin-left: 60px;" type="info" @click="moveDepart">移动部门</el-button>
        <el-button type="info" @click="editLeader">修改直接上级</el-button>
        <el-button type="info" @click="batchRole">分配角色</el-button>
      </template>
      <div id="tablePersonList"></div>
      <personDetail ref="personDetail" />
      <personnel ref="personnel" />
      <roleList ref="roleList" />
      <moveDepart ref="moveDepart" />
      <editLeader ref="editLeader" />
    </div>
</template>
<style scoped>
.census {
  height: 40px;
  line-height: 40px;
  display: inline-block;
  font-size: 16px;
  position: relative;
  padding-left: 10px;
}
.census:after {
  content: "";
  position: absolute;
  border-left: 2px solid #01cd78;
  left: 0;
  top: 13px;
  height: 16px;
}
</style>

<script>
import personDetail from "./personDetail";
import personnel from "./personnel";
import roleList from "./role";
import moveDepart from "./departMove";
import editLeader from "./editLeader";
export default {
  name: "personList",
  data() {
    return {
      census: {
        name: "亿车",
        total: 0,
        selected: [], //当前选中的人
        selectedCount: 0
      }
    };
  },
  components: {
    personDetail,
    personnel,
    roleList,
    moveDepart,
    editLeader
  },
  methods: {
    getList(form) {
      let $this = this;
      this.census.name = form.name;
      this.census.selectedCount = 0;
      this.tableList({
        url: "/authority/user/dep/" + form.id,
        element: "#tablePersonList",
        checkbox: {
          change(selected) {
            $this.census.selected = selected;
            $this.census.selectedCount = Object.keys(selected).length;
          }
        },
        expand: true,
        data: {
          queryInfo: form.queryInfo
        },
        complete(data) {
          $this.census.total = data.totals;
        },
        columns: [
          {
            name: "姓名",
            value: "realname",
            width: 100,
            fixed: true
          },
          {
            name: "工号",
            value: "usercode",
            width: 80
          },
          {
            name: "岗位名称",
            value: "post",
            minWidth: 140,
            align: "left"
          },
          {
            name: "手机",
            value: "phone",
            width: 150,
            render(row){
              let value = row.phone
              let temp = []
              temp[0] = value.slice(0, 3)
              temp[1] = value.slice(3, 7)
              temp[2] = value.slice(7)
              return temp.join('-')
            }
          },
          {
            name: "操作",
            width: 350,
            operator(row) {
              let status = 0;
              let statusName = "启用";
              if (row.isLeave == 0) {
                status = 1;
                statusName = "停用";
              }
              return [
                {
                  name: "详情",
                  click() {
                    $this.$refs.personDetail.openModal(row);
                  }
                },
                {
                  name: "编辑",
                  click() {
                    $this.$refs.personnel.openModal(row);
                  }
                },
                {
                  name: "停用",
                  click() {
                    $this.confirmTips({
                      title: "确认信息",
                      content: `确定停用【${row.realname}】的信息？`,
                      submit() {
                        $this.changeStatus(row.id, status);
                      }
                    });
                  }
                },
                {
                  name: "角色权限",
                  click() {
                    $this.$refs.roleList.openModal(row);
                  }
                },
                {
                  name: "重置密码",
                  click() {
                    $this.confirmTips({
                      title: "确认信息",
                      content: `确定要重置【${row.realname}】的登录密码？`,
                      submit() {
                        $this.resetPassword(row.id);
                      }
                    });
                  }
                }
              ];
            }
          }
        ]
      });
    },
    resetPassword(id) {
      this.ajax({
        url: "/authority/user/update/restart",
        type: "put",
        data: {
          id
        },
        success(data, $this) {
          if (data.code == "success") {
            $this.successTips();
          } else {
            $this.errorTips(data.message);
          }
        }
      });
    },
    changeStatus(id, status) {
      this.ajax({
        url: "/authority/user/" + id + "/" + status + "/leave",
        type: "put",
        success(data, $this) {
          if (data.code == "success") {
            $this.successTips();
            $this.getList({
              name: "亿车",
              id: 1
            });
          }
        }
      });
    },
    batchRole() {
      //批量分配角色
      this.$refs.roleList.getRoleList("batch", this.census.selected);
    },
    moveDepart() {
      //批量移动部门
      this.$refs.moveDepart.openModal(this.census.selected);
    },
    editLeader() {
      //批量修改直接上级
      this.$refs.editLeader.openModal(this.census.selected);
    }
  }
};
</script>
