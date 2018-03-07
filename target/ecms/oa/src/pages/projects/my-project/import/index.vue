<template>
  <div class="project-import">
    <el-dialog title="添加项目成员" :visible.sync="dialogInfo.importShow" @open="_onOpen" @close="_onClose" :close-on-click-modal="false">
      <!-- 导入项目成员start -->
      <el-tabs v-model="activeName">
        <el-tab-pane label="导入公司成员" name="1">
          <p>请输入公司已有成员昵称</p>
          <el-select class="special" filterable v-model="memberList" placeholder="" multiple>
            <el-option v-for="item in drops.personList" :key="item.userid" :label="item.username + ' (' + item.loginname + ')'" :value="item.userid" :disabled="!!Number(item.isadd)">
            </el-option>
          </el-select>
          <p>选择成员</p>
          <ul class="person-list">
            <li class="person-list-item" v-for="item in drops.personList" :key="item.value">
              <span class="person-list-item-title">{{item.username[0]}}</span>
              <el-checkbox class="person-list-item-selection" :label="item.userid" :disabled="!!Number(item.isadd)" v-model="memberList">{{""}}</el-checkbox>
              <div class="person-list-item-body">{{item.username + ' (' + item.loginname + ')'}}</div>
            </li>
          </ul>
        </el-tab-pane>
        <el-tab-pane label="从已有项目复制" name="2">
          <el-form :model="form" label-width="120px">
            <el-form-item label="选择项目">
              <el-select v-model="form.project" placeholder="请选择项目" @change="_projectChange" style="width:100%;">
                <el-option v-for="item in drops.projectList" :key="item.projectid"  :value="item.projectid" :label="item.projectname"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="复制的用户组">
              <el-checkbox-group v-model="form.roleid">
                <el-checkbox label="1" >管理员</el-checkbox>
                <el-checkbox label="2">普通成员</el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
      <span slot="footer" class="dialog-footer">
        <el-button v-if="activeName==1" type="primary" @click="_submit">导入成员</el-button>
        <el-button v-if="activeName==2" type="primary" @click="_submit">复制</el-button>
      </span>
      <!-- 导入项目成员end -->
    </el-dialog>
  </div>
</template>
<script>
import { $http, $dataFormat, $formatDate } from "@/pages/projects/common/js/util";
import { eventBus } from "@/pages/projects/common/js/eventBus";
export default {
  props: {
    dialogInfo: {
      type: Object,
      default() {
        return {
          importShow: false,
          projectid: "",
        };
      },
    },
  },
  data() {
    return {
      activeName: "1",
      // 下拉框选项
      drops: {
        personList: [],
        projectList: [],
      },
      form: {
        project: "",
        roleid: [],
      },
      memberList: [], // 需要导入项目成员
      projectMemberList: [], // 需要复制的项目成员（选择项目获取到的成员）
    };
  },
  methods: {
    _onOpen() {
      this._getSysUserList();
      this._getProjectList();
      // 动态修改多选下拉框的高度
      setTimeout(() => {
        let dom = document.querySelector(".el-select-dropdown.is-multiple");
        dom.querySelector(".el-select-dropdown__wrap.el-scrollbar__wrap").style.maxHeight = "120px";
      }, 10);
    },
    _onClose() {
      let dom = document.querySelector(".el-select-dropdown.is-multiple");
      dom.querySelector(".el-select-dropdown__wrap.el-scrollbar__wrap").style.maxHeight = "";
      // 重置data选项
      Object.assign(this.$data, this.$options.data());
    },
    // 获取系统成员
    _getSysUserList() {
      let params = { method: "getSysUserList" };
      if (this.dialogInfo.projectid) {
        params.projectid = this.dialogInfo.projectid;
      }
      $http(params).then(res => {
        this.drops.personList = res.datalist;
        let memberList = [];
        res.datalist.forEach(item => {
          if (item.isadd === "1") {
            memberList.push(item.userid);
          }
        });
        this.memberList = memberList;
        this.$nextTick(() => {
          $(".el-select__tags").find(".el-tag.el-tag--primary").addClass("disabled").find("i").remove();
        });
      });
    },
    // 获取项目列表
    _getProjectList() {
      $http({ method: "myProjectList" }).then(res => {
        this.drops.projectList = $dataFormat(res);
      });
    },
    // 选择项目
    _projectChange(val) {
      $http({ method: "getPrjJoinnerList", projectid: val }).then(res => {
        this.projectMemberList = $dataFormat(res.datalist);
      });
    },
    // 提交
    _submit() {
      if (this.memberList.length === 0) {
        this.$message.error("请选择项目成员");
      }
      let projectInfo = JSON.parse(localStorage.getItem("project"));
      let params = {};
      // 修改项目，添加项目成员
      if (this.dialogInfo.projectid) {
        params = {
          isaddadmin: 0,
          method: "insertProjectJoinner",
          projectid: this.dialogInfo.projectid,
        };
      } else {
        // 新增项目
        params = {
          method: "createProject",
          ...projectInfo,
        };
      }
      if (this.activeName === "1") {
        //导入成员
        params.userids = this.memberList.join();
      } else {
        // 复制成员
        if (!this.form.project) {
          this.$message.error("请选择要复制的项目");
          return;
        }
        if (this.form.roleid.length === 0) {
          this.$message.error("请选择要复制的项目的用户组");
          return;
        }
        var members = [...this.memberList];
        this.projectMemberList.forEach(item => {
          if (this.form.roleid.includes(item.roleid)) {
            members.push(item.userid);
          }
        });
        params.userids = members.join();
      }
      $http(params, { error: true }).then(res => {
        this.$message.success(res.message);
        if (!this.dialogInfo.projectid) {
          eventBus.$emit("addSuccess");
          localStorage.removeItem("project");
        } else {
          this.$emit("importSuccess");
          console.log("导入成功");
        }
        this.dialogInfo.importShow = false;
      });
    }
  },
};
</script>
 <style lang="scss" scoped>
.project-import {
  /deep/.el-form-item__label {
    text-align: left;
  }
  /deep/ .el-dialog .el-dialog__body {
    padding: 0;
    padding-bottom: 20px;
  }
  /deep/ .el-tabs {
    .el-tabs__header {
      border-bottom: 0 none;
      background-color: #eee;
      .el-tabs__active-bar {
        background-color: #01cd78;
      }
      .el-tabs__nav {
        left: 50%;
        transform: translateX(-50%);
      }
    }
    .el-tabs__content {
      padding: 10px 20px;
      p {
        margin-bottom: 10px;
      }
      .el-select.special {
        width: 100%;
        margin-bottom: 20px;
        .el-select__tags,
        .el-input,
        .el-input__inner {
          min-height: 80px !important;
        }
        .el-input__icon {
          visibility: hidden;
        }
      }
      .el-select-dropdown__wrap {
        max-height: 60px !important;
      }
    }
  }
  .person-list {
    height: 300px;
    overflow: auto;
    .person-list-item {
      height: 30px;
      line-height: 30px;
      margin-bottom: 10px;
      .person-list-item-title {
        float: left;
        width: 30px;
        height: 30px;
        overflow: hidden;
        text-align: center;
        font-weight: 700px;
        color: #01cd78;
        background-color: #e8fff6;
        border-radius: 15px;
      }
      .person-list-item-body {
        padding-left: 40px;
      }
      .person-list-item-selection {
        float: right;
        margin-right: 10px;
      }
    }
  }
}
</style>
