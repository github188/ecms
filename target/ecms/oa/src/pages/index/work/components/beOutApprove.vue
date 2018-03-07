// 外出
<template>
  <div>
    <el-dialog title=" 外出报备单" :visible.sync="modal" size="tiny" id="beOutModal">
      <el-form ref="form" :model="form" label-width="100px" :rules="rules" label-position="right" style="width: 520px; margin:0 auto;">
        <el-form-item label="开始时间：" class="w-207" prop="startDate" style="display:inline-block">
          <el-date-picker class="w-207" :disabled="readonly" v-model="form.startDate" :editable="false" @change="checkTime()" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="startTime" class="w-207" style="display:inline-block">
          <el-time-select class="w-207" prop="startTime" v-model="form.startTime" @change="checkTime()" :editable="false" name="endTime" :picker-options="{
                            start: '08:30',
                            step: '00:30',
                            end: '18:30',
                          }" placeholder="选择时间">
          </el-time-select>
        </el-form-item>
        <div></div>
        <el-form-item label="结束时间：" ref="dasda" prop="endDate" class="w-207" style="display:inline-block">
          <el-date-picker class="w-207" :disabled="readonly" :picker-options="form.endDateOpt" :editable="false" @change="checkTime()" v-model="form.endDate" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="endTime" style="display:inline-block">
          <el-time-select class="w-207" prop="endTime" v-model="form.endTime" @change="checkTime()" :editable="false" name="endTime" :picker-options="{
                           start: '08:30',
                          step: '00:30',
                          end: '18:30',
                            minTime: minTime()
                          }" placeholder="选择时间">
          </el-time-select>
        </el-form-item>
        <el-form-item label="时长(天)：" prop="timeLength">
          <el-input disabled v-model="form.timeLength"></el-input>
          <i v-if="timeLoading" class="el-icon-loading" style="position:absolute;right:10px;top:12px"></i>
        </el-form-item>
        <el-form-item label="外出地点：" prop="address">
          <el-input v-model="form.address"></el-input>
        </el-form-item>
        <el-form-item label="附件：">
          <c-upload @getFileList="getFileList" :fileList="form.files"></c-upload>
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
    width: 600px;
  }
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
      minTime() {
        if ((this.form.startDate && new Date(this.form.startDate).getTime()) == (this.form.endDate && new Date(this.form.endDate).getTime())) {
          //如果是同一天
          return this.form.startTime
        }
        return '06:00'
      },
      flag: false,
      readonly: true,
      timeLoading: false, //计算时长的load icon
      reAttendance: false, //是否考勤异常
      form: {
        startDate: undefined,
        startTime: undefined,
        endDate: undefined,
        endTime: undefined,
        address: '',
        reason: '',
        timeLength: '',
        files: [],
      },
      rules: {
        startDate: [
          {
            required: true,
            message: '请选择开始日期!',
          },
        ],
        startTime: [
          {
            required: true,
            message: '请选择开始时间!',
          },
        ],
        endDate: [
          {
            required: true,
            message: '请选择结束日期!',
          },
        ],
        endTime: [
          {
            required: true,
            message: '请选择结束时间!',
          },
        ],
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
        this.readonly = false
        this.form.reason = details.reason
        this.form.timeLength = details.timeLength
        this.form.startDate = this.tTs(details.startTime).date
        this.form.startTime = this.tTs(details.startTime).ham
        this.form.endDate = this.tTs(details.endTime).date
        this.form.endTime = this.tTs(details.endTime).ham
        this.form.address = details.address
        this.form.id = details.id
        this.form.files = details.files
        this.checkTime()
        // this.from.startDate = details
      }
      this.modal = true
    },
    closeModal() {
      this.disable = false
      this.modal = false
    },
    checkTime() {
      this.form.timeLength = ''
      let { startDate, startTime, endDate, endTime } = this.form
      if (startDate && startTime && endDate && endTime) {
        this.timeLoading = true
        let START = new Date(startDate).toStr(true).split(' ')[0] + ' ' + startTime
        let END = new Date(endDate).toStr(true).split(' ')[0] + ' ' + endTime
        this.startDate = new Date(START).getTime()
        this.endDate = new Date(END).getTime()
        this.ajax({
          url: '/cwa/travel/timelong',
          data: {
            starttime: this.startDate,
            endtime: this.endDate,
          },
          success(data, $this) {
            if (data.code == 'success') {
              $this.form.timeLength = data.content
              $this.timeLoading = false
            } else {
              $this.errorTips('服务异常，时长计算失败!')
            }
          },
        })
      }
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
    getFileList(list) {
      this.form.files = list
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.disable = true
          let { id, timeLength, address, reason, files } = this.form
          let params = {
            id,
            timeLength,
            address,
            reason,
            files,
            startTime: this.startDate,
            endTime: this.endDate,
            userId: this.$store.state.u,
          }
          if (this.reAttendance) {
            //如果是补外出单
            this.$emit('reStart', 10, params)
          } else {
            this.ajax({
              url: '/cwa/outside/update',
              type: 'put',
              data: params,
              success(data, $this) {
                if (data.code == 'success') {
                  $this.$emit('reStart', 2, false, function (success) {
                    if (success) {
                      $this.successTips()
                      $this.modal = false
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





