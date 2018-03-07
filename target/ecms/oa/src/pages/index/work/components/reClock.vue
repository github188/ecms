<template>
  <el-dialog :title="title" :visible.sync="modal" size="tiny" id="reClockModal">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-position="right">
      <el-form-item label="上班时间：" prop="startTime" style="display: inline-block;">
        <el-time-picker :editable="false" format='HH:mm' @change="setStartTime" v-model="form.startTime" :picker-options="{
                format: 'HH:mm'
              }" placeholder="请选择上班时间">
        </el-time-picker>
      </el-form-item>

      <el-form-item label="下班时间：" prop="endTime" style=" display: inline-block; float: right">
        <el-time-picker :editable="false" format='HH:mm' @change="setEndTime" v-model="form.endTime" :picker-options="{
              }" placeholder="请选择下班时间">
        </el-time-picker>
      </el-form-item>

      <el-form-item label="时长：" prop="timeLength">

        <span :class="{'color-red': tips.type==1}" v-if="tips.type != 0">{{form.workTime}}h</span>
        <span class="warning">
          <template v-if="tips.type == 0">
            提醒：未检测到打卡记录，系统认定为{{tips.status}}
          </template>
          <template v-else-if="tips.type == 1">
            提醒：时长不满 {{tips.time}}h，系统认定为{{tips.status}}
          </template>
        </span>

      </el-form-item>

      <el-form-item label="补签说明：" prop="reason">
        <el-input class="word-break" v-model="form.reason" type="textarea"></el-input>
      </el-form-item>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="success" :loading="disable" @click="submit">确 定</el-button>
      <el-button type="info" @click="modal = false">取 消</el-button>
    </span>
  </el-dialog>
</template>
<style lang="scss">
#reClockModal {
  .el-dialog {
    width: 650px;
  }
  .color-red {
    color: red;
  }
  .warning {
    padding-left: 20px;
    color: #485782;
  }
}
</style>

<script>
export default {
  name: 'reClock',
  data() {
    return {
      modal: false,
      form: {
        startTime: '',
        endTime: '',
        workTime: 0,
        noWork: false,
        date: '',
        reason: '',
      },
      overDay: false,
      fristTime: '',
      lastTime: '',
      endM: '',
      title: '',
      details: {},
      tips: {
        type: 0, //[0-未打卡,1-打卡时间不满足4小时或8小时,2-满足工作时长]
        status: '早退',
        time: 8, //标准时长
      },
      rules: {
        startTime: [
          {
            required: true,
            message: '上班时间不能为空!',
          },
        ],
        endTime: [
          {
            required: true,
            message: '下班时间不能为空!',
          },
        ],
        reason: [
          {
            required: true,
            message: '补签说明不能为空!',
          },
        ],
      },
    }
  },
  methods: {
    openModal(details) {
      this.modal = true
      this.details = details
      let { fristtime, lasttime, worktime, date } = details
      this.title = date + ' 补签打卡'
      this.form.date = date
      this.fristTime = fristtime
      this.lastTime = lasttime

      this.form.startTime = (fristtime && new Date(this.calcTime(fristtime))) || ''
      this.form.endTime = (lasttime && new Date(this.calcTime(lasttime))) || ''


      if (details.expName) {
        let expName = details.expName.split('#')
        let name = expName[0]
        let time = expName[1]

        if (time == 0.5) {
          this.tips.time = 4
        } else if (time == 1) {
          this.tips.time = 8
        }

        // if (name && name.indexOf('加班异常') >= 0) {
        //   let time = Number(name.substring(4, 7))
        //   if (time == 0.5) {
        //     this.tips.time = 4
        //   } else if (time == 1) {
        //     this.tips.time = 8
        //   }
        // }
        //加班
        // this.tips.status = '加班异常'
      }
      this.setTime()
    },
    closeModal() {
      this.disable = false
      this.modal = false
    },
    calcTime(time, type) {
      if (time) {
        let date = this.form.date.replace(/-/g, '/')
        let times = new Date(date + ' ' + time).getTime()
        if (type) {
          times += 24 * 60 * 60 * 1000
        }
        return times
      }
    },
    submit() {
      let $this = this;
      this.$refs.form.validate(valid => {
        if (valid) {
          let submitForm = () => {
            this.disable = true
            let fristTime = this.calcTime(this.fristTime)
            let lastTime = this.calcTime(this.lastTime)
            if (this.overDay) {
              lastTime += 24 * 1000 * 3600
            }
            let process = {
              fristTime: fristTime,
              lastTime: lastTime,
              worktime: this.form.workTime,
              remark: this.form.reason,
            }
            this.$emit('reStart', 8, process)
          }
          if (this.tips.type == 1) {
            this.confirmTips({
              title: '提示信息',
              content: `时长不满 ${$this.tips.time}h，系统认定为${$this.tips.status}，是否继续？`,
              submit() {
                submitForm();
              }
            })
            return;
          }
          submitForm();
        }
      })
    },
    setStartTime(time) {
      this.fristTime = time
      this.setTime()
    },
    setEndTime(time) {
      this.lastTime = time
      this.setTime()
    },
    setTime() {
      if (this.fristTime && this.lastTime) {
        var start = this.calcTime(this.fristTime)
        var end = this.calcTime(this.lastTime)
        let ms = this.calcTime('12:00:00')
        let ass = this.calcTime('14:00:00')
        let cs = this.calcTime('06:00:00', true)
        let res = ''
        if (start <= end) {
          if (start <= ms && end >= ass) {
            //【12点前上班， 14点后下班】
            res = ms - start + (end - ass)
          } else if ((start < ms && end <= ms) || start >= ass) {
            //【12点前上班， 12点前下班】
            res = end - start
          } else if (start < ms && end <= ass) {
            //【12点前上班， 14点前下班】
            res = ms - start
          } else if (start >= ms && end >= ass) {
            //【12点后上班,14点后下班】
            res = end - ass
          }
          this.overDay = false
        } else {
          //跨天
          const DAYMS = 24 * 1000 * 3600
          res = start - end + 22 * 1000 * 3600
          // if (res >= DAYMS) {
          //   // 如果超过24小时减去24小时
          //   res -= DAYMS
          // }
          this.overDay = true
        }
        let timeMs = res / (1000 * 3600)
        let workTime = timeMs >= 22 ? 22 - (start - end) / (1000 * 3600) : timeMs
        this.form.workTime = Math.floor((workTime >= 21.98 ? 22 : workTime) * 10) / 10

        // if (this.details.expType == 3) {
        // 加班
        if (this.tips.time == 4) {
          this.tips.type = this.form.workTime >= 4 ? 2 : 1
        } else if (this.tips.time == 8) {
          this.tips.type = this.form.workTime >= 8 ? 2 : 1
          // }

          // this.tips.type = this.form.workTime >= 8 ? 2 : 1
          // this.tips.type = this.form.workTime >= 4 ? 2 : 1
        } else {
          this.tips.type = this.form.workTime >= 8 ? 2 : 1
        }
      } else if (!this.fristTime && !this.lastTime) {
        //没有打卡记录
        this.tips.status = '旷工'
        this.tips.type = 0
      } else {

        this.tips.status = '早退'
        this.tips.type = 1
        this.form.workTime = 0
        if (this.details.expType == 3) {
          this.tips.status = '加班异常'
        }

      }
    },
  },
  props: ['reStart'],
}
</script>

