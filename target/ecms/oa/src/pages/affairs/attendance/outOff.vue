// 外出
<template>
  <div>
    <el-dialog title=" 外出报备单" :visible.sync="modal" size="tiny" id="beOutModal">
      <el-form ref="form" :model="form" label-width="100px" :rules="rules" label-position="right">
        <c-calcTime ref="calcTime" @caclTime="caclTime" :attr="{
          url: '/cwa/travel/timelong',
          rule:1
        }"></c-calcTime>

        <el-form-item label="外出地点：" prop="address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="附件：">
          <c-upload ref="upload" @getFileList="getFileList" :fileList="form.files"></c-upload>
        </el-form-item>
        <el-form-item label="外出事由：" prop="reason">
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
#beOutModal {
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
  name: 'leaveModal',
  data() {
    return {
      modal: false,
      flag: false,
      form: {
        address: '',
        reason: '',
        files: [],
      },
      rules: {
        address: [
          {
            required: true,
            message: '外出地点不能为空!',
          },
        ],
        reason: [
          {
            required: true,
            message: '外出事由不能为空!',
          },
        ],
      },
    }
  },
  methods: {
    openModal(details) {
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
    closeModal() {
      this.disable = false
      this.modal = false
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
          let { timeLength, address, reason, files, startTime, endTime } = this.form
          let params = {
            startTime,
            endTime,
            timeLength,
            address,
            reason,
            files,
          }
          this.ajax({
            url: '/cwa/outside/start',
            type: 'post',
            data: params,
            success(data, $this) {
              if (data.code == 'success') {
                $this.successTips()
                $this.modal = false
              } else {
                $this.errorTips(data.message)
              }
            },
          })
        }
      })
    },
  },
}
</script>

