<template>
  <el-form id="timeLength" ref="form" :model="form" :rules="rules" label-width="100px" label-position="right">
    <el-form-item label="开始时间：" class="w-207" prop="startDate" style="display:inline-block">
      <el-date-picker :clearable="false" class="w-207" :picker-options="startDateOpt" v-model="form.startDate" :editable="false" @change="checkTime()" type="date" placeholder="选择日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item prop="startTime" class="w-207" style="display:inline-block">
      <el-time-select :clearable="false" class="w-207" prop="startTime" v-model="form.startTime" @change="checkTime()" :editable="false" name="endTime" :picker-options="options" placeholder="选择时间">
      </el-time-select>
    </el-form-item>
    <div></div>
    <el-form-item label="结束时间：" ref="dasda" prop="endDate" class="w-207" style="display:inline-block">
      <el-date-picker :clearable="false" class="w-207" :picker-options="endDateOpt" :editable="false" @change="checkTime()" v-model="form.endDate" type="date" placeholder="选择日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item prop="endTime" style="display:inline-block">
      <el-time-select :clearable="false" class="w-207" prop="endTime" v-model="form.endTime" @change="checkTime()" :editable="false" name="endTime" :picker-options="options" placeholder="选择时间">
      </el-time-select>
    </el-form-item>

    <el-form-item label="时长(天)：" prop="timeLength">
      <template v-if="type==3">
        <el-input disabled v-model="form.timeLength" style="width: 70px; margin-right:20px;"></el-input>
        <span>如果申请日期包括周末，如有加班请另提加班申请。</span>
        <i v-if="timeLoading" class="el-icon-loading" style="position:absolute;left:50px;top:12px"></i>
      </template>
      <template v-else>
        <el-input disabled v-model="form.timeLength"></el-input>
        <i v-if="timeLoading" class="el-icon-loading" style="position:absolute;right:10px;top:12px"></i>
      </template>
    </el-form-item>

  </el-form>
</template>
<style lang="scss">
#timeLength {
  .el-form-item__error {
    width: 200px;
  }
}
</style>

<script>
export default {
  name: 'timelength',
  data() {
    let { url, rule, type, options } = this.attr
    return {
      startDate: '',
      endDate: '',
      timeLoading: false,
      url,
      type,
      options: options || {
        start: '08:00',
        step: '00:30',
        end: '22:00',
      },
      rule, //【1-今天及之后的日期, 0-不限定】
      form: {
        startDate: undefined,
        startTime: undefined,
        endDate: undefined,
        endTime: undefined,
      },
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
      },
      endDateOpt: {
        disabledDate: time => {
          if (this.rule == 1) {
            return time.getTime() < Date.now() - 8.64e7 || (this.form.startDate && time.getTime() < this.form.startDate)
          } else if (this.rule == 0) {
            if (this.form.startDate) {
              return time.getTime() < this.form.startDate
            }
          }
        },
      },
      startDateOpt: {
        disabledDate: time => {
          if (this.rule == 1) {
            return time.getTime() < Date.now() - 8.64e7 || (this.form.endDate && time.getTime() > this.form.endDate)
          } else if (this.rule == 0) {
            if (this.form.endDate) {
              return time.getTime() > this.form.endDate
            }
          }
        },
      },
      minTime() {
        if ((this.form.startDate && new Date(this.form.startDate).getTime()) == (this.form.endDate && new Date(this.form.endDate).getTime())) {
          return this.form.startTime
        }
        return '06:00'
      },
    }
  },
  methods: {
    reset() {
      this.resetForm('form')
    },
    // isDay(day) {
    //   if (day) {
    //     let $day = day.getDay()
    //     if (this.type == 2 && ($day != 6 && $day != 0)) {
    //       this.errorTips('工作日不能提起加班申请!')
    //       return
    //     }
    //   }
    // },
    checkTime() {
      let { startDate, startTime, endDate, endTime } = this.form
      // if (this.type == 2) {
      // this.isDay(startDate)
      // }
      if (startDate && startTime && endDate && endTime) {
        this.timeLoading = true
        let START = new Date(startDate).toStr(true).split(' ')[0] + ' ' + startTime
        let END = new Date(endDate).toStr(true).split(' ')[0] + ' ' + endTime
        this.startDate = new Date(START).getTime()
        this.endDate = new Date(END).getTime()

        if (this.type == 2) {
          this.ajax({
            url: '/cwa/overtime/validation',
            data: {
              starttime: this.startDate,
              endtime: this.endDate,
            },
            success(data, $this) {
              if (data.code == 'success') {
                if (!data.content) {
                  $this.errorTips('工作日不能提起加班申请!');
                }
              } else {
                $this.errorTips(data.message)
              }
            }
          })
        }
        this.ajax({
          url: this.url,
          data: {
            starttime: this.startDate,
            endtime: this.endDate,
          },
          success(data, $this) {
            if (data.code == 'success') {
              $this.form.timeLength = data.content
              $this.timeLoading = false
              $this.$emit('caclTime', {
                startTime: $this.startDate,
                endTime: $this.endDate,
                timeLength: data.content,
              })
            } else {
              $this.form.timeLength = ''
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
  },
  props: ['attr', 'caclTime'],
}
</script>
