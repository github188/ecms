<template>
  <div>
    <div class="human-attendance">
      <ul v-loading="reportLoading">
        <li class="human-calendar">
          <p id="layYear">{{form.yearHead}}</p>
          <div class="human-calendar-choose">
            <!-- <a title="前一月" class="h-prev" @click="prevMonth" href="javascript:;"></a> -->
            <a href="javascript:;" title="前一月" @click="prevMonth" class="h-prev el-icon-arrow-left"></a>
            <span id="layDate" class="human-calendar-month">{{form.monthHead}}</span>
            <em class="human-calendar-text">月</em>
            <el-date-picker @change="chooseMonth" :picker-options="pickerOptions" v-model="form.month" popper-class="popper-choose-calendar" class="month-choose-calendar" type="month"></el-date-picker>
            <!-- <a title="后一月" :disabled="noChoose" class="h-next" @click="nextMonth" href="javascript:;"></a> -->
            <a href="javascript:;" title="后一月" :disabled="noChoose" @click="nextMonth(noChoose)" class="h-next el-icon-arrow-right"></a>
          </div>
        </li>
        <!-- <li>
          <p>正常打卡</p>
          <div class="human-calendar-count">{{summary.normal}}</div>
        </li> -->
        <!-- <li>
          <p>未打卡</p>
          <div class="human-calendar-count h-red">{{summary.noPunch}}</div>
        </li>
        <li>
          <p>未签到</p>
          <div class="human-calendar-count h-red">{{summary.noFrist}}</div>
        </li>
        <li>
          <p>未签退</p>
          <div class="human-calendar-count h-red">{{summary.noLast}}</div>
        </li> -->

        <li>
          <p>早退-天</p>
          <div class="human-calendar-count h-red">{{summary.early}}</div>
        </li>
        <li>
          <p>旷工-天</p>
          <div class="human-calendar-count h-red">{{summary.absenteeism}}</div>
        </li>
        <li>
          <p>补单-次</p>
          <div class="human-calendar-count h-red">{{summary.cwaexception}}</div>
        </li>
        <li>
          <p>补签-次</p>
          <div class="human-calendar-count h-red">{{summary.correct}}</div>
        </li>

        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <!--
        <li>
          <p>剩余年假</p>
          <div class="human-calendar-count">{{summary.annual}}</div>
        </li>
        <li>
          <p>剩余调休假</p>
          <div class="human-calendar-count">{{summary.takeoff}}</div>
        </li> -->

        <div class="clearfix"></div>
        <li style="width: 100px">
          <p>应出勤</p>
          <div class="human-calendar-count">{{summary.workday}}</div>
        </li>
        <li>
          <p>实际出勤</p>
          <div class="human-calendar-count">{{summary.normal}}</div>
        </li>
        <li>
          <p>核算出勤</p>
          <div class="human-calendar-count">{{(summary.paidDay)}}</div>
        </li>
        <li>
          <p>年假上月</p>
          <div class="human-calendar-count">{{summary.lastannual}}</div>
        </li>
        <li>
          <p>新增</p>
          <div class="human-calendar-count">{{summary.annualadd}}</div>
        </li>
        <li>
          <p>减少</p>
          <div class="human-calendar-count">{{summary.annualsub}}</div>
        </li>
        <li>
          <p>年假结余</p>
          <div class="human-calendar-count">{{summary.annualblance}}</div>
        </li>
        <li>
          <p>调休假上月</p>
          <div class="human-calendar-count">{{summary.lasttakeoff}}</div>
        </li>
        <li>
          <p>新增</p>
          <div class="human-calendar-count">{{summary.takeoffadd}}</div>
        </li>
        <li>
          <p>减少</p>
          <div class="human-calendar-count">{{summary.takeoffsub}}</div>
        </li>
        <li>
          <p>调休假结余</p>
          <div class="human-calendar-count">{{summary.takeoffblance}}</div>
        </li>
        <li>
          <p>病假</p>
          <div class="human-calendar-count">{{summary.leave2}}</div>
        </li>
        <li>
          <p>事假</p>
          <div class="human-calendar-count">{{summary.leave3}}</div>
        </li>
        <li>
          <p>有薪假</p>
          <div class="human-calendar-count">{{summary.leave4}}</div>
        </li>
      </ul>

      <div class="human-operator">
        <button v-if="buttons.askForLeave" class="ask-for-leave" @click="openLeavel">请假</button>
        <button v-if="buttons.overTime" class="over-time" @click="openOvertime">加班</button>
        <button v-if="buttons.awayOfficial" class="away-official" @click="openAway">出差</button>
        <button v-if="buttons.outOff" class="be-out" @click="openOutOff">外出</button>
        <button v-if="buttons.unusual" class="unusual" @click="openUnusual">考勤异常</button>
      </div>
    </div>

    <v-panel>
      <calendar ref="calendar"></calendar>
    </v-panel>

    <leave ref="leaveModal"></leave>
    <overtime ref="overtimeModal"></overtime>
    <awayOffcial ref="awayModal"></awayOffcial>
    <outOff ref="outOffModal"></outOff>
    <unusual ref="unusualModal"></unusual>
  </div>
</template>
<style scoped>
.human-attendance {
  background: #fff;
  padding-top: 24px;
}

.human-attendance ul {
  height: 275px;
  padding: 0;
  border-bottom: 1px solid #e8e9e8;
  margin: 0 24px;
  margin-right: 0;
}

.human-attendance ul li {
  float: left;
  width: 6.84%;
  height: 110px;
  list-style: none;
  text-align: center;
  margin-bottom: 24px;
}

.human-attendance ul li p {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  margin: 0;
  color: rgba(0, 0, 0, 0.6);
}
@media screen and (max-width: 1360px) {
  .human-attendance ul li p {
    font-size: 13px;
  }
}
@media screen and (max-width: 1260px) {
  .human-attendance ul li p {
    font-size: 12px;
  }
}

.human-attendance ul li .human-calendar-count {
  line-height: 70px;
  position: relative;
  font-size: 22px;
  color: #3e3e3e;
  font-family: cursive;
}

.human-attendance ul li .human-calendar-count.h-red {
  color: #f35857 !important;
}

.human-attendance ul li.human-calendar {
  border: 1px solid #01cd78;
  width: 100px;
}

.human-attendance ul li.human-calendar p {
  color: #01cd78;
  background-color: #ccffea;
  border-bottom: 1px solid #01cd78;
  font-size: 14px;
}

.human-calendar-choose {
  line-height: 70px;
  position: relative;
}

.human-calendar-choose a {
  color: #d0cdcd;
  font-size: 18px;
  font-weight: bold;
  top: 26px;
  position: absolute;
}

.human-calendar-choose a.h-prev,
.human-calendar-choose a.h-prev[disabled]:hover {
  left: 6px;
  color: #ddd;
}

.human-calendar-choose a.h-prev:hover,
.human-calendar-choose a.h-next:hover {
  color: #01cd78;
}

.human-calendar-choose a.h-next,
.human-calendar-choose a.h-next[disabled]:hover {
  right: 10px;
  color: #d0cdcd;
}

.human-calendar-choose a[disabled] {
  cursor: not-allowed;
}

.human-calendar-month {
  font-size: 24px;
  color: #01cd78;
  cursor: pointer;
  display: inline-block;
  height: 68px;
  width: 50px;
  z-index: 11;
}

.human-calendar-text {
  font-size: 16px;
  font-style: normal;
  color: #222222;
  position: relative;
  left: -14px;
}

.human-operator {
  height: 80px;
  background: #fff;
  float: right;
  margin-right: 24px;
}

.human-operator button {
  cursor: pointer;
  display: inline-block;
  height: 32px;
  width: 80px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  margin-left: 16px;
  border: none;
  border-radius: 4px;
  outline: none;
  margin-top: 24px;
}

.human-operator .ask-for-leave {
  background: #20a9f7;
}

.human-operator .over-time {
  background: #f35857;
}

.human-operator .away-official {
  background: #f7a039;
}

.human-operator .be-out {
  background: #ca4ef0;
}
.human-operator .unusual {
  background: #6d72e7;
}
</style>
<style>
.month-choose-calendar .el-icon-date {
  display: none;
}

.month-choose-calendar .el-input__inner {
  width: 50px;
  padding-right: 0;
  position: absolute;
  left: 25px;
  top: -95px;
  border: none;
  opacity: 0;
  cursor: pointer;
}

.month-choose-calendar .el-input__inner:hover {
  border: none;
}

.popper-choose-calendar {
  margin-top: -50px;
}
.el-loading-mask {
  z-index: 1000;
}
</style>

<script>
import leave from './leave' //请假
import overtime from './overtime' //加班
import awayOffcial from './awayOfficial' //出差
import outOff from './outOff' //出差
import unusual from './unusual' //出差
import calendar from '@/components/Calendar' //日历考勤

export default {
  name: 'myAttendance',
  components: {
    leave,
    overtime,
    awayOffcial,
    calendar,
    outOff,
    unusual,
  },
  data() {
    let date = new Date()
    let month = (date.getMonth() + 1).toString()
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
      },
      summary: {}, //考勤总结
      reportLoading: true,
      noChoose: true, //大于本月不能选择
      form: {
        monthHead: date.getMonth() + 1,
        yearHead: date.getFullYear(),
        month: date.getFullYear() + '-' + (month.length == 1 ? '0' + month : month),
        type: [],
      },
      buttons: {}
    }
  },
  created() {
    this.getType()
    this.getSummary(this.form.month)
  },
  mounted() {
    this.getButton(content => {
      content.forEach(item => {
        if (item.status == 0) {
          Vue.set(this.buttons, item.url, item.url)
        }
      })
    })
    $('.human-calendar-count').each(function (a, b) {
      if ($(b).text() == '-') {
        $(b)
          .css('color', 'rgb(153, 153, 153)')
      }
    })
  },
  methods: {
    getType() {
      this.ajax({
        //获取请假类型
        url: 'ctm/setting/param/list',
        data: {
          code: 'cwa_leave_type',
        },
        success(data, $this) {
          if (data.code == 'success') {
            $this.getData($this.form.month)
            $this.form.type = data.content
          }
        },
      })
    },
    getData(month) {
      this.ajax({
        url: '/cwa/attendance/list',
        data: {
          month: month,
          userId: Utils.getValue('u'),
        },
        success(data, $this) {
          if (data.code == 'success') {
            $this.$refs.calendar.dateList(month, data.content, $this.form.type)
          }
          $this.reportLoading = false
        },
      })
    },
    getSummary(month) {
      //获取考勤总结
      this.ajax({
        url: 'cwa/attendance/my/total',
        data: {
          month,
          userId: Utils.getValue('u'),
        },
        success(data, $this) {
          if (data.code == 'success') {
            let { content } = data
            for (let key in content) {
              if (content[key] == 0 || content[key] == null) {
                $this.summary[key] = '-'
              } else {
                Vue.set($this.summary, key, content[key])
              }
            }
          }
        },
      })
    },
    openLeavel() {
      this.$refs.leaveModal.openModal()
    },
    openOvertime() {
      this.$refs.overtimeModal.openModal()
    },
    openAway() {
      this.$refs.awayModal.openModal()
    },
    openOutOff() {
      this.$refs.outOffModal.openModal()
    },
    openUnusual() {
      this.$refs.unusualModal.openModal()
    },
    prevMonth() {
      if (this.form.monthHead == 1) {
        this.form.monthHead = 12
        this.form.yearHead--
      } else {
        this.form.monthHead--
      }
      this.form.month = this.form.yearHead + '-' + this.form.monthHead
      this.noChoose = false
    },
    nextMonth(status) {
      if (status) {
        return false;
      }
      let choose = this.form.yearHead + '-' + (Number(this.form.monthHead)) + '-02'
      let now = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-01'
      if (new Date(choose).getTime() >= new Date(now).getTime()) {
        this.noChoose = true
        return
      } else {
        this.noChoose = false
      }
      if (this.form.monthHead == 12) {
        this.form.monthHead = 1
        this.form.yearHead++
      } else {
        this.form.monthHead++
      }
      this.form.month = this.form.yearHead + '-' + this.form.monthHead
    },
    chooseMonth(val) {
      let tempDate
      if (val) {
        tempDate = val
      } else {
        tempDate = this.form.month
      }
      this.$refs.calendar.date = []
      this.reportLoading = true
      let _val = tempDate.split('-')
      let year = _val[0]
      let month = _val[1]
      if (month > 9) {
        this.form.monthHead = month
      } else {
        this.form.monthHead = parseInt(month)
        month = '0' + parseInt(month)
      }
      let fullyear = year + '-' + month
      this.form.yearHead = year
      this.getData(fullyear)
      this.getSummary(fullyear)
    },
  },
}
</script>
