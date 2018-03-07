// 加班
<template>
  <div>
    <el-dialog title="加班申请" :visible.sync="modal" size="tiny" id="overtimeModal">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-position="right">
        <c-calcTime ref="calcTime" @caclTime="caclTime" :attr="{
          url: '/cwa/overtime/timelong',
          rule: 0,
          type: 2
        }"></c-calcTime>

        <el-form-item label="附件：">
          <c-upload ref="upload" @getFileList="getFileList" :fileList="form.files"></c-upload>
        </el-form-item>

        <el-form-item label="加班说明：" prop="reason">
          <el-input v-model="form.reason" type="textarea"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button type="success" :disabled="disable" @click="submit" v-if="disable">
          <i class="el-icon-loading"></i>
        </el-button>
        <el-button type="success" :disabled="disable" @click="submit" v-else>确 定</el-button>
        <el-button type="info" @click="modal = false">取 消</el-button>
      </span>

    </el-dialog>
  </div>
</template>

<style lang="scss">
#overtimeModal {
  .error {
    color: #f00;
  }
  .w-207 {
    width: 207px !important;
  }
  .el-dialog {
    width: 560px;
  }
}
</style>

<script>
export default {
  name: 'overtimeModal',
  data() {
    return {
      modal: false,
      form: {
        reason: '',
        files: [], //附件
      },
      rules: {
        reason: [
          {
            required: true,
            message: '加班说明不能为空！',
          },
        ],
      },
    }
  },

  methods: {
    openModal() {
      this.modal = true
      this.disable = false
      this.resetForm('form')
      if (this.$refs.calcTime) {
        this.$refs.calcTime.reset()
      }
      if (this.$refs.upload) {
        this.$refs.upload.reset()
      }
    },
    getAffairs(obj) {
      //获取请假类型
      this.form.type = obj.value
      this.form.day = obj.day
    },
    getFileList(list) {
      this.form.files = list
    },
    caclTime(data) {
      this.form = Object.assign(this.form, data)
    },
    submit() {
      let flag = false
      this.$refs.calcTime.$refs.form.validate(valid => {
        flag = valid
      })
      this.$refs.form.validate(valid => {
        if (valid && flag) {
          this.disable = true
          let { timeLength, reason, files, startTime, endTime } = this.form
          let params = {
            userId: this.$store.state.u,
            startTime,
            endTime,
            timeLength,
            reason,
            files,
          }
          this.ajax({
            url: '/cwa/overtime/start',
            type: 'post',
            data: params,
            success(data, $this) {
              if (data.code == 'success') {
                $this.successTips('操作成功!')
                $this.modal = false
                $this.$refs.form.resetFields()
              } else {
                $this.errorTips(data.message)
              }
              $this.disable = false
            },
          })
        }
      })
    },
  },
}
</script>





