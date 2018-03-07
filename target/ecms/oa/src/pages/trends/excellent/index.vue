<template>
  <div id="excellentPerson">
    <v-panel>
      <el-form label-width="90px" :inline="true">
        <el-form-item label="姓名：">
          <el-input style="width:150px;" v-model="search.name"></el-input>
        </el-form-item>

        <el-form-item label="称号：">
          <el-input style="width:150px;" v-model="search.title"></el-input>
        </el-form-item>

        <el-form-item label="当前状态：">
          <el-select style="width:150px" v-model="search.status" clearable>
            <el-option :value="0" label="未发布"></el-option>
            <el-option :value="1" label="已发布"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="年份：" class="inline-block" prop="year">
          <el-date-picker style="width:150px" :editable="false" v-model="search.year" align="right" type="year" placeholder="选择年">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="季度：">
          <el-select style="width:150px" clearable  v-model="search.quarter" placeholder="请选择">
            <el-option label="第一季度" value="第一季度"></el-option>
            <el-option label="第二季度" value="第二季度"></el-option>
            <el-option label="第三季度" value="第三季度"></el-option>
            <el-option label="第四季度" value="第四季度"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
       <div class="search-box">
          <el-button style="margin-top:3px;margin-left: 10px" class="search-btn" type="success" @click="getList">查询</el-button>
      </div>
    </v-panel>

    <v-panel title="优秀员工列表">
      <div slot="button">
        <el-button type="info" v-show="checkList.length>0" @click="batchPublish(1)">批量发布</el-button>
        <el-button type="info" v-show="checkList.length>0" @click="batchPublish(0)">批量取消发布</el-button>
        <el-button type="info" v-show="checkList.length>0" @click="batchDelete">批量删除</el-button>
        <el-button type="info" @click="addPerson">新 增</el-button>
      </div>
      <div id="personList"></div>
    </v-panel>

    <el-dialog :title="title" :visible.sync="modal" size="tiny" id="postPerson">
      <el-form v-loading="loading" ref="postPersonForm" :model="form" :rules="rules" label-width="100px" label-position="right">
        <el-form-item label="姓名：" prop="userId">
          <el-select @change="getDepart" v-model="form.userId" filterable clearable placeholder="请输入关键字" style="width:460px;">
            <el-option v-for="item in personList" :key="item.id" :label="item.realname" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="部门职位：" prop="depName">
          <el-input disabled v-model="form.depName"></el-input>
        </el-form-item>

        <el-form-item label="季度：" class="w-228 inline-block" prop="year">
          <el-date-picker class="w-228" :editable="false" v-model="form.year" align="right" type="year" placeholder="选择年">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="" class="w-228 inline-block" prop="quarter">
          <el-select class="w-228" v-model="form.quarter" placeholder="请选择">
            <el-option label="第一季度" value="第一季度"></el-option>
            <el-option label="第二季度" value="第二季度"></el-option>
            <el-option label="第三季度" value="第三季度"></el-option>
            <el-option label="第四季度" value="第四季度"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="照片：" prop="photo">
          <cropUpload ref="cropUpload" :url="upload.url" field="img" :noSquare="true" v-model="show" :width="180" :height="180" img-format="png" @crop-success="cropSuccess" @crop-upload-success="cropUploadSuccess">
          </cropUpload>

          <!-- <el-upload
          name='img'
          :action="upload.url"
          list-type="picture-card">
          <i class="el-icon-plus"></i>
        </el-upload> -->

          <div class="cover-pic" @click="show=!show">
            <img :src="upload.photoSrc" alt="" v-if="upload.photoSrc">
            <i class="el-icon-plus" v-else></i>
          </div>
          <!--
          <el-upload class="upload-demo" :action="upload.url" name="content">
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload> -->
        </el-form-item>
        <el-form-item label="称号：" prop="title">
          <el-input v-model.trim="form.title" placeholder="请输入称号"></el-input>
        </el-form-item>

        <el-form-item label="推荐理由：" prop="reason">
          <el-input :autosize="{ minRows: 4, maxRows:8 }" type="textarea" v-model.trim="form.reason" placeholder="请输入推荐理由"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" :disabled="disable" v-if="disable">
          <i class="el-icon-loading"></i>
        </el-button>
        <template v-if="edit">
          <el-button type="success" :disabled="disable" @click="submit(true, true)" v-if="!disable">保存</el-button>
        </template>
        <template v-else>
          <el-button type="success" :disabled="disable" @click="submit(true)" v-if="!disable">提交并返回</el-button>
          <el-button type="success" :disabled="disable" @click="submit(false)" v-if="!disable">提交继续添加</el-button>
        </template>

        <el-button type="info" @click="modal = false">取 消</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<style lang="scss">
#excellentPerson {
  .el-dialog--tiny {
    width: 600px;
  }
  .w-228 {
    width: 228px;
  }
  .vue-image-crop-upload {
    .vicp-preview {
      height: 180px;
      overflow: inherit;
    }
    .vicp-preview-item {
      width: 180px;
      height: 180px;
      img {
        width: 180px !important;
        height: 180px !important;
        border: 0;
      }
      span {
        opacity: 0;
      }
    }
  }
  .cover-pic {
    height: 135px;
    line-height: 135px;
    width: 135px;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    text-align: center;
    cursor: pointer;
    .el-icon-plus {
      font-size: 28px;
      color: #8c939d;
    }
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

<script>
import cropUpload from "vue-image-crop-upload";
export default {
  name: "excellentPerson",
  components: {
    cropUpload
  },
  data() {
    return {
      search: {
        name: "",
        status: "",
        year: "",
        quarter: "",
        time: ""
      },
      checkList: [], //多选列表
      dataList: [], //数据列表
      title: "添加",
      loading: false,
      modal: false,
      edit: false,
      show: false, //是否显示图片裁剪
      personList: [],
      upload: {
        url: "", //上传相片的地址
        photoSrc: "" //获取相片的地址
      },
      form: {
        id: "",
        userId: "",
        name: "",
        depId: "",
        depName: "",
        title: "",
        photo: "",
        time: "",
        reason: "",
        quarter: ""
      },
      rules: {
        userId: [
          {
            required: true,
            message: "姓名不能为空!"
          }
        ],
        depName: [
          {
            required: true,
            message: "部门职位不能为空!"
          }
        ],
        year: [
          {
            required: true,
            message: "年份不能为空!"
          }
        ],
        quarter: [
          {
            required: true,
            message: "季度不能为空!"
          }
        ],
        title: [
          {
            required: true,
            message: "称号不能为空!"
          },
          {
            max: 20,
            message: "不能超过20个字!"
          }
        ],
        reason: [
          {
            required: true,
            message: "推荐理由不能为空!"
          },
          {
            max: 600,
            message: "不能超过600字!"
          }
        ],
        photo: [
          {
            required: true,
            message: "照片不能为空!"
          }
        ]
      }
    };
  },
  created() {
    this.getList();
    this.getPersonList();
    this.upload.url = this.getUploadUrl("user", "UserFine", "uploadImg");
  },
  methods: {
    openModal() {
      this.modal = true;
      this.resetForm("postPersonForm");
    },
    getDepart(value) {
      //根据员工获取部门和职位
      if (!value) {
        this.form.name = "";
        this.form.depName = "";
      } else {
        let person = this.personList.filter(arr => arr.id == value)[0];
        let { depId, depName, realname, post } = person;
        this.form.name = realname;
        this.form.depId = depId;
        this.form.depName =
          this.reverseDepart(depName).split("-")[0] + "-" + post;
      }
    },
    getPersonList() {
      return new Promise((resolve, reject) => {
        this.ajax({
          url: "/authority/user/dep/1",
          data: {
            pageNum: 1,
            pageSize: 1000
          },
          success(data, $this) {
            if (data.code == "success") {
              $this.personList = data.content;
              resolve(data.content);
            }
          }
        });
      });
    },
    getList() {
      let $this = this;
      let params = Object.assign(this.search);
      if (params.year) {
        params.year = new Date(params.year).getFullYear() + "";
      }
      params.time = params.year + "-" + params.quarter;
      let data = Utils.filterObjectNull(params);
      this.checkList = [];
      this.tableList({
        command: ["user", "UserFine", "listUserFine"],
        data,
        element: "#personList",
        complete({ data }) {
          $this.dataList = data;
        },
        checkbox: {
          change(row) {
            $this.checkList = [];
            for (let id in row) {
              $this.checkList.push(id);
            }
          }
        },
        columns: [
          {
            name: "姓名",
            value: "name",
            align: "left",
            width: 90
          },
          {
            name: "部门",
            value: "depName",
            align: "left",
            minWidth: 250
          },
          {
            name: "称号",
            value: "title",
            minWidth: 110
          },
          {
            name: "季度",
            value: "time",
            width: 160
          },
          {
            name: "更新时间",
            width: 170,
            render(row) {
              return new Date(row.updatetime).toStr();
            }
          },
          {
            name: "当前状态",
            width: 100,
            render(row) {
              return ["未发布", "已发布"][row.status];
            }
          },
          {
            name: "操作",
            width: 170,
            operator(row) {
              let name = ["发布", "取消发布"][row.status];
              return [
                {
                  name,
                  click(row) {
                    $this.publishPerson([row.id], name, row.status);
                  }
                },
                {
                  name: "修改",
                  click(row) {
                    if (row.status == 1) {
                      $this.errorTips("请先取消发布再修改!");
                      return;
                    }
                    $this.editPerson(row);
                  }
                },
                {
                  name: "删除",
                  click(row) {
                    if (row.status == 1) {
                      $this.errorTips("请先取消发布再删除!");
                      return;
                    }
                    $this.deleatePerson([row.id]);
                  }
                }
              ];
            }
          }
        ]
      });
    },
    cropSuccess(url, filed) {
      this.upload.photoSrc = url;
    },
    cropUploadSuccess(data, field) {
      if (data.state == 1) {
        this.form.photo = data.content;
        this.$refs.postPersonForm.validateField("photo");
        this.$refs.cropUpload.off();
      }
    },
    addPerson() {
      this.openModal();
      this.edit = false;
      this.title = "新增优秀员工";
      this.upload.photoSrc = "";
    },
    submit(type, edit) {
      this.$refs.postPersonForm.validate(valid => {
        if (valid) {
          let params = Object.assign(this.form);
          let arg = ["user", "UserFine"];
          if (edit) {
            arg[2] = "updateUserFine";
          } else {
            arg[2] = "addUserFine";
            delete params.id;
          }

          params.time =
            new Date(params.year).getFullYear() + "-" + params.quarter;
          this.disable = true;
          this.command(...arg, params)
            .then(data => {
              this.disable = false;
              this.getList();
              this.successTips("操作成功!");
              if (type) {
                this.modal = false;
              } else {
                //清空数据
                this.resetForm("postPersonForm");
                this.upload.photoSrc = "";
              }
            })
            .catch(error => {
              this.disable = false;
              this.errorTips(error.message);
            });
        }
      });
    },
    editPerson(row) {
      //编辑人员
      this.openModal();
      this.edit = true;
      this.title = "修改优秀员工";
      this.loading = true;
      this.upload.photoSrc = this.getUploadUrl(
        "user",
        "UserFine",
        "downloadImg",
        row.photo
      ); //获取头像
      this.command("user", "UserFine", "getUserFineDetails", { id: row.id })
        .then(async data => {
          //查询个人详情
          let { status, userId, time, title, reason, id, photo } = data;
          let _time = time.split("-");
          let year = _time[0];
          let quarter = _time[1];
          let form = this.form;
          await this.getPersonList().then(res => {
            this.getDepart(userId);
            form.userId = userId + "";
            form.quarter = quarter;
            form.year = new Date(year);
            form.title = title;
            form.reason = reason;
            form.id = id;
            form.photo = photo;
            this.loading = false;
          });
        })
        .catch(error => {
          this.loading = false;
          this.errorTips(error.message);
        });
    },
    deleatePerson(id) {
      //删除人员
      let $this = this;
      this.confirmTips({
        title: "确认信息",
        content: `确定要删除吗？`,
        submit() {
          $this
            .command("user", "UserFine", "deleteUserFine", {
              ids: id.join(","),
              isvalid: 0
            })
            .then(data => {
              $this.successTips("删除成功!");
              $this.getList();
            })
            .catch(error => {
              $this.errorTips(error.message);
            });
        }
      });
    },
    publishPerson(id, name, status) {
      //发布/取消人员
      let $this = this;
      $this.confirmTips({
        title: "确认信息",
        content: `确定要${name}吗？`,
        submit() {
          $this
            .command("user", "UserFine", "updateUserFineStatus", {
              ids: id.join(","),
              status: status ? 0 : 1
            })
            .then(() => {
              $this.successTips("操作成功!");
              $this.getList();
            })
            .catch(error => {
              $this.errorTips(error.message);
            });
        }
      });
    },
    batchDelete() {
      let data = this.dataList;
      let check = this.checkList;
      for (let i = 0; i < data.length; i++) {
        for (let j = 0; j < check.length; j++) {
          if (data[i].id == check[j] && data[i].status == 1) {
            this.errorTips("请先取消发布再删除!");
            return
          }
        }
      }
      this.deleatePerson(this.checkList);
    },
    batchPublish(type) {
      //批量发布/取消发布
      let name = ["取消发布", "发布"][type];
      this.publishPerson(this.checkList, name, !type);
    }
  }
};
</script>
