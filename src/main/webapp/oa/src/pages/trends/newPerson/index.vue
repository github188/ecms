<template>
  <div id="newPerson">
    <v-panel>
      <el-form label-width="100px" :inline="true">
        <el-form-item label="姓名：">
          <el-input style="width:150px;" v-model="search.name"></el-input>
        </el-form-item>

        <el-form-item label="发布状态：">
          <el-select style="width:150px" v-model="search.status" clearable>
            <el-option :value="1" label="已发布"></el-option>
            <el-option :value="0" label="未发布"></el-option>
          </el-select>
        </el-form-item>
        <el-button style="margin-top:3px;margin-left: 10px" class="search-btn" type="success" @click="getList">查询</el-button>
      </el-form>
    </v-panel>

    <v-panel title="新员工列表">
      <div slot="button">
        <el-button type="info" v-show="checkList.length>0" @click="batchPublish(1)">批量发布</el-button>
        <el-button type="info" v-show="checkList.length>0" @click="batchPublish(0)">批量取消发布</el-button>
        <el-button type="info" v-show="checkList.length>0" @click="batchDelete">批量删除</el-button>
        <el-button type="info" @click="addPerson">新 增</el-button>
      </div>
      <div id="newPersonList"></div>
    </v-panel>

    <el-dialog :title="title" :visible.sync="modal" size="tiny" id="postPerson" @close="closeModal">
      <el-form v-loading="loading" ref="postPersonForm" :model="form" :rules="rules" label-width="100px" label-position="right">
        <el-form-item label="姓名：" prop="name">
          <el-select @change="getDepart" v-model="form.user" filterable clearable placeholder="请输入关键字" style="width:460px;">
            <el-option v-for="item in personList" :key="item.id" :label="item.realname" :value="item.realname+'|'+item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="部门职位：">
          <el-input disabled v-model="form.postDepart"></el-input>
        </el-form-item>
        <el-form-item label="照片：" prop="photo">
          <cropUpload ref="cropUpload" :url="upload.url" field="img" :noSquare="true" v-model="show" :width="180" :height="180" img-format="png" @crop-success="cropSuccess" @crop-upload-success="cropUploadSuccess" @crop-upload-fail="cropUploadFail">
          </cropUpload>
          <div class="cover-pic" @click="show=!show">
            <img :src="upload.photoSrc" alt="" v-if="upload.photoSrc">
            <i class="el-icon-plus" v-else></i>
          </div>
        </el-form-item>
        <el-form-item label="家乡：" prop="home">
          <el-input v-model="form.home" placeholder="省市以空格隔开，比如深圳市 宝安区"></el-input>
        </el-form-item>
        <el-form-item label="爱好特长：" prop="hobby">
          <el-input v-model="form.hobby" placeholder="请输入爱好特长"></el-input>
        </el-form-item>
        <el-form-item label="个人展示：" prop="personSign">
          <el-input v-model="form.personSign" placeholder="请输入个人展示"></el-input>
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
#newPerson {
  .el-dialog--tiny {
    width: 600px;
  }
  .batch-btns {
    width: 230px;
    float: left;
    margin-top: -58px;
    margin-left: 110px;
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
import cropUpload from 'vue-image-crop-upload'
export default {
  name: 'newPerson',
  components: {
    cropUpload,
  },
  data() {
    return {
      search: {
        name: '',
        status: '',
      },
      checkList: [], //多选列表
      title: '添加',
      modal: false,
      show: false, //是否显示图片裁剪
      edit: false,
      loading: false,
      personList: [],
      upload: {
        url: '', //上传相片的地址
        photoSrc: '', //相片的地址
      },
      form: {
        user: '',
        userId: '',
        name: '',
        postDepart: '',
        home: '',
        hobby: '',
        personSign: '',
        photo: '',
      },
      rules: {
        name: [
          {
            required: true,
            message: '姓名不能为空!',
          },
        ],
        home: [
          {
            required: true,
            message: '家乡不能为空!',
          },
          {
            max: 10,
            message: '家乡不能超过10个字!',
          },
        ],
        hobby: [
          {
            required: true,
            message: '爱好特长不能为空!',
          },
          {
            max: 12,
            message: '爱好特长不能超过12个字!',
          },
        ],
        personSign: [
          {
            required: true,
            message: '个人展示不能为空!',
          },
          {
            max: 36,
            message: '个人展示不能超过36个字!',
          },
        ],
        photo: [
          {
            required: true,
            message: '照片不能为空!',
          },
        ],
      },
    }
  },
  created() {
    this.getList()
    this.upload.url = this.domain + '/authority/user/picture/head/upload'
  },
  methods: {
    closeModal() {
      this.clearForm()
    },
    getDepart(obj, persons) {
      //根据员工获取部门和职位
      if (!obj) {
        this.form.user = ''
        this.form.name = ''
        this.form.postDepart = ''
      } else {
        let objSplit = obj.split('|')
        let [name, id] = [objSplit[0], objSplit[1]]
        let personList = persons || this.personList
        let person = personList.filter(arr => arr.id == id)[0]
        if (person) {
          this.form.name = person.realname
          this.form.postDepart = person.depName + '-' + person.post
          this.form.userId = person.id
        } else {
          this.form.postDepart = ''
        }
      }
    },
    getPersonList() {
      return new Promise((resolve, reject) => {
        this.ajax({
          url: '/authority/user/dep/1',
          data: {
            pageNum: 1,
            pageSize: 1000,
          },
          success(data, $this) {
            if (data.code == 'success') {
              $this.personList = data.content
              resolve(data.content)
            }
          },
        })
      })
    },
    clearForm() {
      this.resetForm('postPersonForm')
      this.form.userId = ''
      this.form.postDepart = ''
      this.upload.photoSrc = ''
      this.form.user = ''
    },
    submit(type, edit) {
      this.$refs.postPersonForm.validate(valid => {
        if (valid) {
          let params = this.form
          if (!edit) {
            delete params.id
          }
          this.disable = true
          this.ajax({
            url: '/authority/show',
            type: edit ? 'put' : 'post',
            data: params,
            success(data, $this) {
              $this.disable = false
              $this.successTips()
              $this.getList()
              $this.clearForm()
              if (type) {
                $this.modal = false
              }
            },
          })
        }
      })
    },
    getList() {
      let $this = this
      let data = Utils.filterObjectNull(this.search)
      this.tableList({
        url: '/authority/show/list',
        data: data,
        element: '#newPersonList',
        checkbox: {
          change(row) {
            $this.checkList = []
            for (let id in row) {
              $this.checkList.push(id)
            }
          },
        },
        columns: [
          {
            name: '姓名',
            value: 'name',
            align: 'left',
            width: 90,
            fixed: true,
          },
          {
            name: '部门',
            value: 'depName',
            align: 'left',
            width: 270,
          },
          {
            name: '家乡',
            value: 'home',
            width: 180,
            align: 'left',
          },
          {
            name: '爱好/特长',
            value: 'hobby',
            align: 'left',
            width: 190,
          },
          {
            name: '个人展示',
            align: 'left',
            value: 'personSign',
          },
          {
            name: '更新时间',
            width: 170,
            render(row) {
              return new Date(row.updateTime).toStr()
            },
          },
          {
            name: '当前状态',
            width: 90,
            render(row) {
              return ['未发布', '已发布'][row.status]
            },
          },
          {
            name: '操作',
            width: 170,
            operator(row) {
              return [
                {
                  name: ['发布', '取消发布'][row.status],
                  click(row) {
                    $this.ajax({
                      url: '/authority/show/update',
                      type: 'put',
                      data: {
                        status: row.status ? '0' : '1',
                        id: row.id,
                      },
                      success(data) {
                        if (data.code == 'success') {
                          $this.successTips()
                          $this.getList()
                        } else {
                          $this.errorTips(data.message)
                        }
                      },
                    })
                  },
                },
                {
                  name: '修改',
                  async click(row) {
                    if (row.status == 1) {
                      $this.errorTips('请先取消发布再需改!')
                      return
                    }
                    $this.loading = true
                    $this.edit = true
                    $this.modal = true
                    $this.title = '编辑新员工展示'
                    await $this.getPersonList().then(res => {
                      $this.getDepart(row.name + '|' + row.userId, res)
                      $this.form.user = row.name + '|' + row.userId
                      $this.loading = false
                    })
                    $this.form.home = row.home
                    $this.form.hobby = row.hobby
                    $this.form.personSign = row.personSign
                    $this.form.photo = row.photo
                    $this.form.id = row.id
                    $this.$nextTick(() => {
                      $this.upload.photoSrc = $this.getAvatar({
                        headPic: row.photo,
                      })
                    })
                  },
                },
                {
                  name: '删除',
                  click(row) {
                    $this.confirmTips({
                      title: '删除确认',
                      content: '确定要删除【' + row.name + '】吗？',
                      submit() {
                        $this.ajax({
                          url: '/authority/show/delete',
                          type: 'put',
                          data: {
                            id: row.id,
                          },
                          success(data) {
                            if (data.code == 'success') {
                              $this.successTips()
                              $this.getList()
                            } else {
                              $this.errorTips(data.message)
                            }
                          },
                        })
                      },
                    })
                  },
                },
              ]
            },
          },
        ],
      })
    },
    addPerson() {
      this.getPersonList()
      this.clearForm()
      this.modal = true
      this.edit = false
      this.title = '新增新员工展示'
    },
    cropUploadFail() { },
    cropSuccess(url, filed) {
      this.upload.photoSrc = url
    },
    cropUploadSuccess(data, field) {
      if (data.code == 'success') {
        const { picId } = data.content
        this.form.photo = picId
        this.$refs.postPersonForm.validateField('photo')
        this.$refs.cropUpload.off()
      }
    },
    batchDelete() {
      //批量删除
      let $this = this
      this.confirmTips({
        title: '删除确认',
        content: '是否批量删除？',
        submit() {
          $this.ajax({
            url: '/authority/show/delete/batch',
            type: 'put',
            data: {
              ids: $this.checkList,
            },
            success(data) {
              if (data.code == 'success') {
                $this.successTips()
                $this.getList()
              } else {
                $this.errorTips(data.message)
              }
            },
          })
        },
      })
    },
    batchPublish(status) {
      //批量发布/取消发布
      this.ajax({
        url: '/authority/show/update/batch',
        type: 'put',
        data: {
          ids: this.checkList,
          status,
        },
        success(data, $this) {
          if (data.code == 'success') {
            $this.successTips()
            $this.getList()
          } else {
            $this.errorTips(data.message)
          }
        },
      })
    },
  },
}
</script>
