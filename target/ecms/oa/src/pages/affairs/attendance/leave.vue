// 请假
<template>
  <div>
    <el-dialog title="请假申请" :visible.sync="modal" size="tiny" id="leaveModal">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-position="right">
        <el-form-item label="请假类型：" prop="type">
          <v-affairs ref="getAffairs" filter="true" class="w-207" @change="getAffairs" style="display:inline-block"></v-affairs>
          <span :class="[days.annual == 0? 'error': '']" v-if="form.type == 4" style="padding-left: 10px">剩余年休假 {{days.annual}} 天</span>
          <span :class="[days.takeoff == 0? 'error': '']" v-if="form.type == 5" style="padding-left: 10px">剩余调休假 {{days.takeoff}} 天</span>
        </el-form-item>

        <c-calcTime ref="calcTime" @caclTime="caclTime" :attr="{
          url: '/cwa/leave/timelong',
          rule: 1,
           type: 1
        }"></c-calcTime>

        <el-form-item label="工作代理人：">
          <v-person ref="getPerson" :disabled="true" style="width: 100%" @change="getPerson"></v-person>
        </el-form-item>

        <el-form-item label="附件：">
          <c-upload ref="upload" @getFileList="getFileList" :fileList="form.files"></c-upload>
        </el-form-item>

        <el-form-item label="请假理由：" prop="reason">
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
#leaveModal {
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
</style>
<script>
export default {
  name: 'leaveModal',
  data() {
    return {
      modal: false,
      form: {
        agentId: undefined,
        reason: '',
        type: '',
        files: [],
      },
      days: '',
      affairsDay: {},
      rules: {
        reason: [
          {
            required: true,
            message: '请假理由不能为空！',
          },
        ],
        type: [
          {
            required: true,
            message: '请假类型不能为空！',
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
      if (this.$refs.getPerson) {
        this.$refs.getPerson.value = ''
      }
      if (this.$refs.getAffairs) {
        this.$refs.getAffairs.type = ''
      }
      if (this.$refs.calcTime) {
        this.$refs.calcTime.reset()
      }
      if (this.$refs.upload) {
        this.$refs.upload.reset()
      }
    },
    getPerson(obj) {
      //获取代理人
      this.form.agentId = obj.value
    },
    getAffairs(obj) {
      //获取请假类型
      this.form.type = obj.value
      this.days = obj.day
      this.$refs.form.validateField('type')
      this.affairsDay = obj
      this.priorDay(obj)
    },
    priorDay(obj) {
      //04-年假 -05调休假 07-事假
      if (obj.value == '05') {
        if (this.days.annual > 0) {
          this.errorTips('请优先选择年假!')
          return
        }
      }
      if (obj.value == '07') {
        if (this.days.annual > 0) {
          this.errorTips('请优先选择年假!')
          return
        }
        if (this.days.takeoff > 0) {
          this.errorTips('请优先选择调休假!')
          return
        }
      }
      return true
    },
    caclTime(data) {
      this.form = Object.assign(this.form, data)
    },
    getFileList(list) {
      this.form.files = list
    },
    submit() {
      let flag = false
      this.$refs.calcTime.$refs.form.validate(valid => {
        flag = valid
      })
      this.$refs.form.validate(valid => {
        if (valid && flag && this.priorDay(this.affairsDay)) {
          if (this.affairsDay.value == '04' && this.days.annual <= 0) {
            this.errorTips('剩余年休假 0 天!')
            return
          }
          if (this.affairsDay.value == '05' && this.days.takeoff <= 0) {
            this.errorTips('剩余调休假 0 天!')
            return
          }
          this.disable = true
          let { type, timeLength, reason, files, startTime, endTime } = this.form
          let params = {
            userId: this.$store.state.u,
            startTime,
            endTime,
            timeLength,
            reason,
            type,
            files,
          }
          let agentId = this.form.agentId
          if (agentId) {
            params.agentId = agentId
          }
          this.ajax({
            url: '/cwa/leave/start',
            type: 'post',
            data: params,
            success(data, $this) {
              if (data.code == 'success') {
                $this.successTips()
                $this.modal = false
                $this.resetForm('form')
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





