<template>
  <div class="project-detail">
    <p class="title">
      <span>{{detail.projectname}}</span>
    </p>
    <el-tabs v-model="projectType" type="card">
      <el-tab-pane label="需求 " name="1"></el-tab-pane>
      <el-tab-pane label="缺陷" name="2">缺陷</el-tab-pane>
      <el-tab-pane label="文档" name="3">文档</el-tab-pane>
      <el-tab-pane label="报表" name="4">报表</el-tab-pane>
    </el-tabs>
    <div v-if="projectType == 1">
      <div class="detail-panel">
        <div class="title">
          <p>项目设置</p>
          <el-tabs v-model="activeName" @tab-click="_handleClick">
            <el-tab-pane label="项目信息" name="1"></el-tab-pane>
            <el-tab-pane label="成员与权限" name="2"></el-tab-pane>
            <el-tab-pane label="其他设置" name="3">其他设置</el-tab-pane>
          </el-tabs>
        </div>
        <!-- 项目信息 -->
        <div class="content">
          <div v-if="activeName==1">
            <div class="info edit-info">
              <div class="logo">
                <div class="pic" :style="{backgroundImage:_getImageURL(form.picurl)}"></div>
                <el-upload :show-file-list="false" :action="_action()" :on-success="_handleSuccess" :before-upload="_beforeUpload">
                  <el-button type="primary">上传图片</el-button>
                </el-upload>
              </div>
              <div class="edit">
                <el-form label-width="80px" :model="form" labelPosition="right" :rules="rules" ref="ruleForm">
                  <el-form-item label="标题" prop="projectname">
                    <el-input v-model.trim="form.projectname" @blur="_editProject"></el-input>
                  </el-form-item>
                  <el-form-item label="项目描述" prop="content">
                    <el-input type="textarea" :rows="6" v-model.trim="form.content"  @blur="_editProject"></el-input>
                  </el-form-item>
                </el-form>
              </div>
            </div>
            <div class="info fixed-info">
              <el-row>
                <el-col :span="3">管 理 员</el-col>
                <el-col :span="21">{{detail.adminname}}</el-col>
              </el-row>
              <el-row>
                <el-col :span="3">项目成员</el-col>
                <el-col :span="21">{{detail.totalCount}}</el-col>
              </el-row>
            </div>
          </div>
          <!-- 成员与权限 -->
          <div v-if="activeName==2">
            <el-row class="search-area">
              <el-col :span="4">
                <el-input placeholder="搜索成员" icon="search" v-model="initValue.keys" :on-icon-click="_freshPersonList"></el-input>
              </el-col>
              <el-col :span="5" :offset="15" v-if="isAdmin">
                <el-button type="primary" @click="_removePerson('')">批量移除</el-button>
                <el-button type="primary" @click="_addPerson">添加成员</el-button>
              </el-col>
            </el-row>
            <ec-table-list  :params="initValue" listProp="datalist" pageProp="datalist" @selection-change="_selectionChange">
              <el-table-column type="selection" width="55" v-if="isAdmin"></el-table-column>
              <el-table-column type="index" width="55" v-else></el-table-column>
              <el-table-column show-overflow-tooltip prop="userid" label="成员id" width="150"></el-table-column>
              <el-table-column show-overflow-tooltip prop="loginname" label="成员昵称"></el-table-column>
              <el-table-column show-overflow-tooltip prop="username" label="真实姓名" width="100"></el-table-column>
              <el-table-column show-overflow-tooltip prop="orgname" label="部门" width="100"></el-table-column>
              <el-table-column show-overflow-tooltip prop="post" label="岗位" width="120"></el-table-column>
              <el-table-column show-overflow-tooltip prop="email" label="邮箱"></el-table-column>
              <el-table-column label="用户组" width="100">
                <template slot-scope="scope">{{ scope.row.roleid | roleName}}</template>
              </el-table-column>
              <el-table-column label="操作" width="80" v-if="isAdmin">
                <template v-if="scope.row.roleid != 1" slot-scope="scope">
                  <el-button type="text" size="mini" @click="_removePerson(scope.row)">移除</el-button>
                </template>
              </el-table-column>
            </ec-table-list>
          </div>
        </div>
      </div>
    </div>
    <personImport :dialogInfo="dialogInfo" @importSuccess="_freshPersonList"></personImport>
  </div>
</template>
<script>
import { $http, $dataFormat, $formatDate, $getImageURL, $getUploadURL } from "@/pages/projects/common/js/util";
import personImport from "../import";
import ecTableList from "@/pages/projects/components/ec-table-list";
export default {
  components: {
    personImport,
    ecTableList,
  },
  data() {
    return {
      activeName: "1",
      projectType: "1",
      detail: {},
      form: {
        projectname: "",
        content: "",
        picurl: "",
      },
      dialogInfo: {
        importShow: false,
        projectid: "",
      },
      selectedPerson: [], // 选中的成员
      // 表单验证
      rules: {
        projectname: { required: true, message: "项目名称不能为空!" },
        content: { required: true, message: "项目背景不能为空!" },
      },
      // 获取项目成员需要的参数
      initValue: {
        projectid: this.$route.query.projectid,
        method: "getPrjJoinnerList",
        keys: "",
      },
    };
  },
  filters: {
    // 格式化时间
    formatDate(date) {
      return $formatDate(date);
    },
    // 获取角色名
    roleName(roleid) {
      let roles = { 1: "管理员", 2: "普通成员" };
      return roles[roleid];
    },
  },
  computed: {
    // 当前用户是否是当前项目的管理员
    isAdmin() {
      let userid = localStorage.getItem("u");
      return userid === this.detail.adminid;
    },
  },
  created() {
    this._getProjectDetail();
  },
  methods: {
    // 获取项目详情
    _getProjectDetail() {
      let params = {
        method: "getProjectDetail",
        projectid: this.$route.query.projectid,
      };
      $http(params).then(res => {
        this.detail = res;
        let { projectname, content, picurl } = res;
        this.form = { projectname, content, picurl };
      });
    },
    // 编辑
    _edit() {
      this.dialogInfo.show = true;
      this.dialogInfo.id = this.$route.query.id;
    },
    // 获取图片路径
    _getImageURL(picurl) {
      if(!picurl){
        return "";
      }
      let url = $getImageURL(picurl);
      return `url(${url})`;
    },
    // 图片上传地址
    _action() {
      return $getUploadURL();
    },
    // 上传拦截
    _beforeUpload(file) {
      let imageTypes = ["image/jpeg", "image/png", "image/jpg"];
      const isJPG = imageTypes.includes(file.type);
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 上传成功
    _handleSuccess(res) {
      this.form.picurl = res.filename;
      this._editProject();
    },
    // 修改项目
    _editProject() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          let projectid = this.$route.query.projectid;
          $http({ method: "editProject", ...this.form, projectid }, { error: true }).then(res => {
            this.$message.success(res.message);
            this._getProjectDetail();
          });
        }
      });
    },
    _freshPersonList() {
      // 通知ec-table-list刷新列表
      this.$nextTick(() => {
        this.$emit("refresh");
      });
    },
    // tab栏切换
    _handleClick(val) {
      console.log(this.activeName);
      if(this.activeName === "1"){
        this._getProjectDetail();
      }
      if(this.activeName === "2"){
        this._freshPersonList();
      }
    },
    // 选项变化时，
    _selectionChange(val) {
      this.selectedPerson = val;
    },
    // 移除项目成员
    _removePerson(row) {
      let id = [],
        name = [],
        ids = "",
        names = "",
        flag = false; // 是否包含管理员
      if (row) {
        // 单个移除
        ids = row.id;
        names = row.username;
      } else {
        // 批量移除
        if(this.selectedPerson.length === 0){
          this.$message.error("请至少选择一个项目成员");
          return;
        }
        id = this.selectedPerson.map(item => {
          name.push(item.username);
          if(item.roleid == 1){
            flag = true;
          }
          return item.id;
        });
        ids = id.join();
        names = name.join("、");
      }
      if (flag) {
        this.$message.error("项目管理员不可被移除");
        return;
      }
      let message = `你确定要移除项目成员【${names}】吗?`;
      this.$confirm(message, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          return $http({ method: "delProjectJoinner", ids }, { error:true });
        })
        .then(res => {
          this.$message.success("项目成员移除成功");
          this._freshPersonList();
        });
    },
    // 添加项目成员
    _addPerson(){
      this.dialogInfo.importShow = true;
      this.dialogInfo.projectid = this.$route.query.projectid;
    }
  },
};
</script>
<style lang="scss" scoped>
.project-detail {
  font-size: 14px;
  padding: 20px;
  background-color: #fff;
  .action {
    height: 30px;
    margin-bottom: 10px;
    .el-button {
      float: right;
      padding: 5px 10px;
      margin-left: 10px;
    }
  }
  p.title {
    border-left: 3px solid #01cd78;
    padding-left: 8px;
    font-size: 14px;
    height: 20px;
    line-height: 20px;
    margin-bottom: 20px;
    .fa {
      font-size: 16px;
      cursor: pointer;
    }
  }
  .detail-panel {
    border: 1px solid #ddd;
    .el-icon-setting,
    .fa {
      color: #01cd78;
    }
    .title {
      font-size: 16px;
      padding: 0 10px;
      height: 80px;
      background-color: #eee;
      p {
        height: 38px;
        line-height: 38px;
      }
      /deep/ .el-tabs__header {
        border: 0 none;
        .el-tabs__nav {
          left: 50%;
          transform: translateX(-50%);
          .el-tabs__active-bar {
            background-color: #01cd78;
          }
        }
      }
    }
    .content {
      padding: 20px;
      min-height: 300px;
      .info {
        width: 50%;
        float: left;
        &.edit-info {
          .logo {
            float: left;
            padding-right: 10px;
            overflow: hidden;
            text-align: center;
            .pic {
              border: 1px solid #ccc;
              width: 130px;
              height: 130px;
              margin-bottom: 20px;
              background-image: url(../../common/images/project_bg.jpg);
              background-repeat: no-repeat;
              background-size: cover;
              background-position: center;
            }
          }
          .edit {
            margin-left: 140px;
            .el-form-item {
              height: 40px;
            }
          }
        }
        &.fixed-info {
          padding-left: 30px;
          .el-row {
            color: #333;
            margin-bottom: 10px;
            .el-col:first-child {
              color: #999;
            }
          }
        }
      }
      .search-area {
        margin-bottom: 20px;
      }
    }
  }
}
</style>
