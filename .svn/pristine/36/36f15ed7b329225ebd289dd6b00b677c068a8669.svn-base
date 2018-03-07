<template>
  <el-dialog :title="isAdd?'添加成员':'编辑成员'" :visible.sync="modal" size="tiny" id="personnelModal">
      <el-form ref="personForm" :model="form" :rules="rules" label-width="100px" label-position="right">
        <el-row :gutter="24" v-loading="loading">
          <el-col :span="9">
            <el-form-item label="姓名：" prop="realname">
              <el-input placeholder="请输入员工姓名" v-model="form.realname"></el-input>
            </el-form-item>
            <el-form-item label="手机：" prop="phone">
              <el-input placeholder="请输入11位手机号" v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" prop="email">
              <el-input v-model="form.email">
                <template slot="append">@ecaray.com</template>
              </el-input>
            </el-form-item>

            <el-form-item label="直接上级：" prop="directLeader">
              <el-select style="width:248px" v-model="form.directLeader" filterable placeholder="请输入关键字">
                <el-option v-for="item in personList" :key="item.id" :label="item.realname" :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="部门：" prop="depName">
              <!-- <el-input v-model="form.depName"></el-input> -->
              <el-cascader style="width: 100%" :options="departCascader" :change-on-select="true" :props="{
                      value: 'id',
                      label: 'name',
                      children: 'children'
                    }" v-model="form.depName">
              </el-cascader>
            </el-form-item>

            <el-form-item label="专业级别：" prop="professLevel">
              <el-input v-model="form.professLevel"></el-input>
            </el-form-item>

            <el-form-item label="常驻地：" prop="address">
              <el-input v-model="form.address"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="9">
            <el-form-item label="工号：" prop="usercode">
              <el-input placeholder="请输入员工编号" v-model="form.usercode"></el-input>
            </el-form-item>

            <el-form-item label="性别：" prop="sex">
              <el-radio class="radio" v-model="form.sex" :label="1">男</el-radio>
              <el-radio class="radio" v-model="form.sex" :label="2">女</el-radio>
            </el-form-item>

            <el-form-item label="生日：" prop="idcard">
                <el-date-picker style="width: 245px;"
                    :editable="false"
                    @change="getIdCard"
                    v-model="form.idcard"
                    type="date"
                    format="MM-dd"
                    placeholder="请选择生日">
                </el-date-picker>
            </el-form-item>

            <el-form-item label="所属公司：" prop="company">
              <el-select style="width:248px" placeholder="请选择所属公司"  v-model="form.company">
                <el-option label="深圳市前海亿车" value="1"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="岗位：" prop="post">
              <el-input v-model="form.post"></el-input>
            </el-form-item>

            <el-form-item label="管理级别：" prop="manageLevel">
              <el-input v-model="form.manageLevel"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-upload class="avatar-uploader" :action="url" accept="image/jpeg,image/png,image/jpg" :on-success="avatarSuccess" :show-file-list="false">
              <img :src="getAvatar(form)" class="avatar" title="更换头像">
            </el-upload>
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" :loading="disable" @click="personSubmit" >确 定</el-button>
        <el-button type="info" @click="modal = false">取 消</el-button>
      </span>
    </el-dialog>
</template>
<style lang="scss">
#personnelModal {
  .el-dialog {
    width: 1000px;
  }

  .avatar {
    height: 150px;
    width: 150px;
    margin-left: 40px;
    border-radius: 50%;
    display: block;
    border: 1px solid #ededed;
  }
  .avatar-uploader .el-upload {
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #20a0ff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 150px;
    height: 150px;
    line-height: 150px;
    margin-left: 40px;
    border: 1px dashed #dddee1;
    text-align: center;
  }
}
</style>

<script>
export default {
  name: "personnel",
  data() {
    return {
      modal: false,
      isAdd: true,
      loading: false,
      personList: [], //全部人员
      departCascader: [], //部门选择
      url: "",
      form: {
        realname: "",
        usercode: "",
        sex: 1,
        phone: "",
        depName: [],
        post: "",
        idcard: "",
        email: "",
        directLeader: "",
        address: "",
        leaderName: "",
        currentLeader: "",
        professLevel: "",
        manageLevel: "",
        headPic: ""
      },
      rules: {
        realname: [
          {
            required: true,
            message: "姓名不能为空！"
          }
        ],
        leaderName: {
          required: true,
          message: "请选择直接上级！"
        },
        usercode: [
          {
            required: true,
            message: "工号不能为空！"
          }
        ],
        sex: [
          {
            required: true,
            message: "性别为必选项！"
          }
        ],
        phone: [
          {
            required: true,
            message: "手机号码格不能为空！"
          },
          {
            pattern: /^1\d{10}$/,
            message: "手机号码格式不正确!"
          }
        ],
        company: [
          {
            required: true,
            message: "所属公司不能为空!"
          }
        ],
        depName: [
          {
            required: true,
            message: "部门不能为空！"
          }
        ],
        idcard: [
          {
            required: true,
            message: "生日不能为空！"
          }
        ],
        post: [
          {
            required: true,
            message: "岗位不能为空！"
          }
        ],
        email: [
          {
            required: true,
            message: "邮箱不能为空！"
          }
        ],
        directLeader: [
          {
            required: true,
            message: "直接上级不能为空！"
          }
        ],
        address: [
          {
            required: true,
            message: "常驻地不能为空！"
          }
        ],
        currentLeader: [
          {
            required: true,
            message: "直接上级不能为空！"
          }
        ]
      }
    };
  },
  created() {
    this.url = this.domain + "/authority/user/picture/head/upload";
  },
  methods: {
    openModal(row) {
      this.modal = true;
      this.isAdd = !row;
      if (row) {
        //编辑
        this.loading = true;
        this.id = row.id;
      }
      this.getDepartment(row && row.id);
  
    },
    getAllPerson() {
      //获取全部人员
      this.ajax({
        url: "/authority/user/dep/1",
        data: {
          pageNum: 1,
          pageSize: 1000
        },
        success(data, $this) {
          if (data.code == "success") {
            $this.personList = data.content;
          }
        },
        error($this) {
          $this.errorTips("获取人员失败！");
        }
      });
    },
    getDepartment(id) {
      // 获取部门树
      this.ajax({
        url: "/authority/dep/tree/list",
        success(data, $this) {
          if (data.code == "success") {
            $this.departList = data.content;
            $this.departCascader = $this.delTree(data.content);
            $this.getAllPerson();
            if (id) {
              $this.userDetail(id);
            }
          }
        },
        error($this) {
          $this.errorTips("获取部门失败！");
        }
      });
    },
    getIdCard(value) {
      this.form.idcard = value;
    },
    avatarSuccess(response, file) {
      //上传用户头像
      // this.person.avatar = URL.createObjectURL(file.raw);
      this.form.headPic = response.content.picId;
    },
    userDetail(id) {
        this.ajax({
          url: `authority/user/${id}/detail`,
          success(data, $this) {
            if (data.code == "success") {
              let content = data.content;
              $this.form = content;
              $this.form.depName = $this.parentTree(
                $this.departCascader,
                "id",
                content.depId
              );
              $this.form.email = content.email.split("@")[0];
              $this.loading = false
            }
          },
          error($this) {
            $this.errorTips("获取人员信息失败！");
          }
        });
    },
    personSubmit() {
      this.$refs.personForm.validate(valid => {
        if (valid) {
          this.disable = true;
          let {
            realname,
            depName,
            usercode,
            phone,
            sex,
            post,
            email,
            professLevel,
            manageLevel,
            idcard,
            directLeader,
            address,
            headPic
          } = this.form;
          const params = {
            depId: depName[depName.length - 1],
            realname,
            usercode,
            phone,
            sex,
            post,
            username: email + "@ecaray.com",
            email: email + "@ecaray.com",
            professLevel,
            manageLevel,
            idcard,
            directLeader,
            address,
            headPic
          };

          let type = "";
          if (this.isAdd) {
            type = "post";
          } else {
            type = "put";
            params.id = this.id;
          }
          this.ajax({
            url: "/authority/user",
            data: params,
            type,
            success(data, $this) {
              if (data.code == "success") {
                $this.successTips();
                $this.modal = false;
              } else {
                $this.errorTips(data.message);
              }
            }
          });
        }
      });
    }
  }
};
</script>
