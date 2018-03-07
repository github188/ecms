// 请假
<template>
  <div>
    <el-dialog title="请假申请" :visible.sync="modal" size="tiny" class="tiny-type-modal">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-position="right">
        <el-form-item label="请假类型：" prop="type">
          <v-affairs ref="getAffairs" filter="true" class="w-228" @change="getAffairs" style="display:inline-block"></v-affairs>
          <span :class="[days.annual == 0? 'error': '']" v-if="form.type == 4" style="padding-left: 10px">剩余年休假 {{days.annual}} 天</span>
          <span :class="[days.takeoff == 0? 'error': '']" v-if="form.type == 5" style="padding-left: 10px">剩余调休假 {{days.takeoff}} 天</span>
        </el-form-item>
        <el-form-item label="开始时间：" prop="startDate" style="display:inline-block; width: 228px;">
          <el-date-picker class="w-228" :disabled="readonly" :editable="false" @change="checkTime" v-model="form.startDate" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="startTime" style="display:inline-block; width: 228px">
          <el-time-select class="w-228" v-model="form.startTime" :editable="false" @change="checkTime" :picker-options="{
                                                    start: '08:30',
                                                    step: '00:30',
                                                    end: '18:30',
                                                    maxTime: form.endTime
                                                }" placeholder="选择时间">
          </el-time-select>
        </el-form-item>
        <el-form-item label="结束时间：" prop="endDate" class="w-228" style="display:inline-block">
          <el-date-picker class="w-228" :disabled="readonly" :editable="false" :picker-options="endDateOpt" @change="checkTime" v-model="form.endDate" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="endTime" class="w-228" style="display:inline-block">
          <el-time-select class="w-228" v-model="form.endTime" @change="checkTime" :editable="false" name="endTime" :picker-options="{
                                                    start: '08:30',
                                                    step: '00:30',
                                                    end: '18:30',
                                                    minTime: form.startTime
                                                }" placeholder="选择时间">
          </el-time-select>
        </el-form-item>
        <el-form-item label="时长(天)：" prop="timeLength">
          <el-input disabled v-model="form.timeLength"></el-input>
          <i v-if="timeLoading" class="el-icon-loading" style="position:absolute;right:10px;top:12px"></i>
        </el-form-item>
        <el-form-item label="工作代理人：">
          <v-person ref="getPerson" :disabled="true" style="width: 100%" @change="getPerson"></v-person>
        </el-form-item>
        <el-form-item label="附件：">
          <c-upload @getFileList="getFileList" :fileList="form.files"></c-upload>
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

<style scoped>
.error {
  color: #f00;
}

.w-228 {
  width: 228px !important;
}
</style>
<script>
export default {
  name: 'leaveModal',
  data() {
    return {
      endDateOpt: {
        disabledDate: time => {
          return time.getTime() < this.form.startDate
        },
      },
      modal: false,
      readonly: false,
      startDate: undefined,
      endDate: undefined,
      timeLoading: false, //计算时长的load icon
      days: '',
      affairsDay: {},
      form: {
        startDate: undefined,
        startTime: undefined,
        endDate: undefined,
        endTime: undefined,
        agentId: undefined,
        reason: '',
        type: '',
        day: '',
        timeLength: '', //请假时长
        files: [],
      },
      reAttendance: false, //是否补考勤单
      rules: {
        timeLength: [
          {
            required: true,
            message: '时长不能为空!',
          },
          {
            validator: (rule, value, callback) => {
              if (Number(value) == 0) {
                callback(new Error('时长必须大于0!'))
              } else {
                callback()
              }
            },
          },
        ],
        startDate: [
          {
            required: true,
            message: '开始日期不能为空！',
          },
        ],
        endDate: [
          {
            required: true,
            message: '结束日期不能为空！',
          },
        ],
        startTime: [
          {
            required: true,
            message: '开始时间不能为空！',
          },
        ],
        endTime: [
          {
            required: true,
            message: '结束时间不能为空！',
          },
        ],
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
    openModal(details) {
      if (details.reAttendance) {
        //补考勤单
        let date = new Date(details.data.date).getTime()
        this.reAttendance = true
        this.readonly = true
        this.form.startDate = this.tTs(date).date
        this.form.endDate = this.tTs(date).date
      } else {
        //重新发起审批
        this.form.reason = details.reason
        this.form.timeLength = details.timeLength
        this.form.startDate = this.tTs(details.startTime).date
        this.form.startTime = this.tTs(details.startTime).ham
        this.form.endDate = this.tTs(details.endTime).date
        this.form.endTime = this.tTs(details.endTime).ham
        // this.form.type = details.type.toString()
        this.form.agentId = details.agentId
        this.form.agentName = details.agentName
        this.form.id = details.id
        this.form.files = details.files
      }
      this.modal = true
    },
    closeModal() {
      this.disable = false
      this.modal = false
    },
    getPerson(obj) {
      //获取代理人
      this.form.agentId = obj.value
    },
    tTs(time) {
      //时间戳转为年月日
      let _dateTime = new Date(time).toStr().split(' ')
      let _date = _dateTime[0] //年月日
      let _time = _dateTime[1] //时分秒
      let _ham = _time.split(':')
      let ham = _ham[0] + ':' + _ham[1] //时分
      return {
        date: _date,
        time: _time,
        ham: ham,
      }
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
    checkTime(rule, value, callback) {
      this.form.timeLength = ''
      let { startDate, startTime, endDate, endTime } = this.form
      if (startDate && startTime && endDate && endTime) {
        this.timeLoading = true
        let START = new Date(startDate).toStr(true).split(' ')[0] + ' ' + startTime
        let END = new Date(endDate).toStr(true).split(' ')[0] + ' ' + endTime
        this.startDate = new Date(START).getTime()
        this.endDate = new Date(END).getTime()
        this.ajax({
          url: '/cwa/leave/timelong',
          data: {
            starttime: this.startDate,
            endtime: this.endDate,
          },
          success(data, $this) {
            if (data.code == 'success') {
              $this.form.timeLength = data.content
              $this.timeLoading = false
            } else {
              this.form.timeLength = ''
              $this.errorTips('服务异常，时长计算失败!')
            }
          },
        })
      } else {
        this.form.timeLength = ''
      }
    },
    getFileList(list) {
      this.form.files = list
    },
    submit() {
      if (this.affairsDay.value == '04' && this.days.annual <= 0) {
        this.errorTips('剩余年休假 0 天!')
        return
      }
      if (this.affairsDay.value == '05' && this.days.takeoff <= 0) {
        this.errorTips('剩余调休假 0 天!')
        return
      }
      this.$refs.form.validate(valid => {
        if (valid && this.priorDay(this.affairsDay)) {
          this.disable = true
          let { type, startTime, endTime, timeLength, reason, id, files } = this.form
          let params = {
            userId: this.$store.state.u,
            type,
            startTime: this.startDate,
            endTime: this.endDate,
            timeLength,
            reason,
            id,
            files,
          }
          let agentId = this.form.agentId
          if (agentId) {
            params.agentId = agentId
          }
          if (this.reAttendance) {
            //如果是补请假考勤单
            this.$emit('reStart', 1, params)
          } else {
            this.ajax({
              url: '/cwa/leave/update',
              type: 'put',
              data: params,
              success(data, $this) {
                if (data.code == 'success') {
                  $this.$emit('reStart', 2, false, function (success) {
                    if (success) {
                      $this.successTips()
                      $this.modal = false
                      $this.resetForm('form')
                    }
                  })
                } else {
                  $this.errorTips(data.message)
                }
                $this.disable = false
              },
            })
          }
        }
      })
    },
  },
  props: ['reStart'],
}
</script>





