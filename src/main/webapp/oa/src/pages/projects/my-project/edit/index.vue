<template>
  <div class="project-edit">
    <el-dialog title="添加项目" :visible.sync="dialogInfo.show" @close="_onClose">
      <!-- 添加项目start -->
      <el-form label-width="80px" :model="projectForm" :rules="rules" ref="ruleForm">
        <el-form-item label="项目名称" prop="projectname">
          <el-input v-model.trim="projectForm.projectname"></el-input>
        </el-form-item>
        <el-form-item label="项目描述" prop="content">
          <el-input type="textarea" :rows="4" v-model.trim="projectForm.content"></el-input>
        </el-form-item>
        <el-form-item label="项目图标">
          <el-upload class="avatar-uploader" :action="_action()" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogInfo.show=false">取 消</el-button>
        <el-button type="primary" @click="_submit">确 定</el-button>
      </span>
      <!-- 添加项目end -->
    </el-dialog>
  </div>
</template>
<script>
import { $http, $dataFormat, $formatDate,$getUploadURL } from "@/pages/projects/common/js/util";
export default {
  props: {
    dialogInfo: {
      type: Object,
      default() {
        return {
          show: false,
        };
      },
    },
  },
  data() {
    return {
      projectForm: {
        projectname: "",
        content: "",
        picurl: "",
      },
      imageUrl: "",
      rules: {
        projectname: {
          validator(rule, value, callback) {
            if (value === "") {
              callback(new Error("项目名称不能为空!"));
              return;
            };
            $http({ method: "checkProjectName", projectname: value }).then(res => {
              if (res.state == 1) {
                if (res.isexist == "1") {
                  callback(new Error("该项目名称已存在"));
                } else {
                  callback();
                }
              } else {
                callback(new Error(res.message));
              }
            });
          },
          trigger: "blur",
        },
        content: {
          required: true,
          message: "项目描述不能为空!",
          trigger: "blur",
        },
      },
    };
  },
  methods: {
    // 图片上传地址
    _action() {
      return $getUploadURL();
    },
    _onClose() {
      this.$refs.ruleForm.resetFields();
      this.$emit("close");
    },
    handleAvatarSuccess(res, file) {
      this.projectForm.picurl = res.filename;
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
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
    _submit(){
      this.$refs.ruleForm.validate((valid) => {
          if (valid) {
            localStorage.setItem("project",JSON.stringify(this.projectForm));
            this.dialogInfo.show = false;
            this.$emit("saveProject");
          } else {
            console.log('error submit!!');
            return false;
          }
        });
    }
  },
};
</script>
<style lang="scss" scoped>
.project-edit {
  .avatar-uploader {
    width: 158px !important;
    height: 158px;
    border: 1px dashed #ccc;
    text-align: center;
    margin: 10px;
    width: 100%;
    line-height: 158px;
    .avatar {
      width: 158px;
      height: 158px;
      font-size: 20px;
    }
    .el-icon-plus {
      font-size: 30px;
      color: #ccc;
      font-weight: 100;
    }
  }
}
</style>
