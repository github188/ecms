<template>
  <div>
    <ul id="calendar">
      <li class="calendar-list calendar-week" v-for="(item, index) in week" :key="item">周&nbsp;&nbsp;{{item}}</li>
      <template v-if="date.length == 0">
        <div class="no-data" v-loading="true"></div>
      </template>

      <li v-else class="calendar-list" v-for="(item, index) in date" :key="index" :class="(item.last?item.last:'workday')">
        <div v-if="item.disabled" class="disabled"></div>
        <div v-else :class="item.klass">

          <el-tooltip placement="top" effect="light" :disabled="!item.remark">
            <!-- <div slot="content" class="edit-record" v-if="item.record.remark">
                <p>时间: {{item.record.remark.split('##')[2]}}日</p>
                <p>事项: {{item.record.remark.split('##')[0]}}</p>
                <p>原因: {{item.record.remark.split('##')[1]}}</p>
              </div> -->

            <div class="calendar-list-box calendar-list-all">
              <!-- <div class="edit-tag" v-if="item.record.remark"></div> -->
              <!-- <template v-if="edit">
                  <div title="修改" class="name" @click="editHandel(item.record.id, item.day)" :style="{'cursor': 'pointer','color': item.record.color, 'background': item.record.bg}">{{item.record.time==0.5? item.record.name+ 0.5:item.record.name}}</div>
                  <span class="date">{{item.date}}</span>
                </template> -->

              <!-- <template v-else> -->

              <div v-for="(info, index) in item.info" v-if="info.time > 0" :key="index" class="name" :style="{'color': info.color, 'background': info.bg}">
                <router-link title="查看详情" class="unusual-link" v-if="info.type == -1 || info.type == -2" target="_blank" :to="{path: `/work/detail?id=${info.refId}&type=7`}" :style="{'color': info.color}">
                  {{info.time==0.5? info.name+ 0.5:info.name}}
                </router-link>
                <span v-else>
                  {{info.time==0.5? info.name+ 0.5:info.name}}
                </span>
               
              </div>

              <span class="date">{{item.date}}</span>
              <template v-if="item.sign">
                <span v-if="item.sign.early" class="sign early" :style="{'color': item.sign.early[1]}">{{item.sign.early[0]}}</span>
                <span v-if="item.sign.night" class="sign night" :style="{'color': item.sign.night[1]}">{{item.sign.night[0]}}</span>
              </template>
            </div>
          </el-tooltip>
        </div>
      </li>
    </ul>

    <el-dialog title="修改考勤记录" :visible.sync="modal" size="tiny" class="edit-calendar-modal" :modal="false">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-position="right">
        <el-form-item label="状态：" prop="type">
          <el-select v-model="form.type" class="select-area w-100">
            <el-option v-for="item in affairsType" :key="item.id" :label="item.name" :value="item.value +'|'+ item.name">
            </el-option>
          </el-select>
          <!-- <v-affairs @change="getAffairs"></v-affairs> -->
          <!-- <span :class="[day == 0? 'error': '']" v-if="form.type == 4" style="padding-left: 10px">剩余年休假 {{day}} 天</span>
              <span :class="[day == 0? 'error': '']" v-if="form.type == 5" style="padding-left: 10px">剩余调休假 {{day}} 天</span> -->
        </el-form-item>

        <el-form-item label="开始时间：" prop="startDate" style="display:inline-block; width: 228px;">
          <el-input :disabled="true" class="w-228" v-model="form.date" type="text"></el-input>
        </el-form-item>
        <el-form-item prop="startTime" class="w-228" style="display:inline-block">
          <el-time-select class="w-228" v-model="form.startTime" @change="changeTime" :editable="false" :picker-options="{
                start: '09:00',
                step: '01:00',
                end: '18:00'
            }" placeholder="选择时间">
          </el-time-select>
        </el-form-item>
        <el-form-item label="结束时间：" prop="endDate" class="w-228" style="display:inline-block">
          <el-input :disabled="true" class="w-228" v-model="form.date" type="text"></el-input>
        </el-form-item>
        <el-form-item prop="endTime" class="w-228" style="display:inline-block;">
          <el-time-select class="w-228" v-model="form.endTime" :editable="false" @change="changeTime" name="endTime" :picker-options="{
                start: '09:00',
                step: '01:00',
                end: '18:00',
                minTime: minTime()
            }" placeholder="选择时间">
          </el-time-select>
        </el-form-item>

        <el-form-item label="时长：" prop="time">
          <!-- <el-select class="w-100" v-model="form.time" placeholder="请选择">
              <el-option label="1天" value="1"></el-option>
              <el-option label="0.5天" value="0.5"></el-option>
            </el-select> -->
          <el-input :disabled="true" v-model="form.time" type="text"></el-input>
        </el-form-item>

        <el-form-item label="修改备注：" prop="remark">
          <el-input v-model="form.remark" type="textarea"></el-input>
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
.w-228 {
  width: 228px;
}

.error {
  color: red;
}

#calendar {
  overflow: hidden;
  margin-bottom: 12px;
  width: 100%;
  border: 1px solid #e5e6e5;
  border-right: none;
  border-bottom: none;
  font-size: 14px;
}

.calendar-list {
  position: relative;
  float: left;
  width: 14.28%;
  height: 90px;
  border-right: 1px solid #e5e6e5;
  border-bottom: 1px solid #e5e6e5;
  background: rgba(238, 238, 238, 0.15);
  list-style: none;
  text-align: center;
}

.calendar-week {
  height: 60px;
  background: #fff;
  line-height: 60px;
}

.calendar-list .disabled {
  color: #dadddb;
}

/* .calendar-list .normal-day {} */

.calendar-list.weekend {
  background: #f2f2f2;
}
.calendar-list.weekend .disabled {
  color: rgb(0, 0, 0);
}

.calendar-list-box,
.calendar-list .enabled {
  height: 100%;
}

.calendar-list-box .date {
  position: absolute;
  top: 12px;
  left: 12px;
  font-weight: bold;
  font-size: 16px;
  font-family: cursive;
}

.calendar-list-box .name {
  position: absolute;
  right: 12px;
  min-width: 48px;
  height: 24px;
  border-radius: 30px;
  text-align: center;
  font-size: 12px;
  line-height: 24px;
}
.calendar-list-box .name:nth-child(1) {
  top: 12px;
}
.calendar-list-box .name:nth-child(2) {
  top: 44px;
}
.calendar-list-box .name:nth-child(3) {
  top: 12px;
  right: 70px;
}
.calendar-list-box .name:nth-child(4) {
  top: 44px;
  right: 70px;
}
.calendar-list-box .sign {
  position: absolute;
  left: 12px;
  color: #a9a9a9;
  font-size: 12px;
}

.calendar-list-box .sign.early {
  top: 40px;
}

.calendar-list-box .sign.night {
  top: 64px;
}

.calendar-list-half .half {
  width: 50%;
  height: 100%;
}

.calendar-list-half .double-half {
  position: relative;
  float: left;
  width: 50%;
  height: 100%;
}

.calendar-list-half .double-half:first-child {
  border-right: 1px solid #fff;
}

.calendar-list .edit-tag {
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  width: 100%;
  height: 100%;
}

.calendar-list .edit-tag:after {
  position: absolute;
  top: -10px;
  left: -10px;
  width: 20px;
  height: 20px;
  background: #01cd78;
  content: '';
  -webkit-transform: rotate(-130deg);
  -moz-transform: rotate(-130deg);
  -ms-transform: rotate(-130deg);
  -o-transform: rotate(-130deg);
  transform: rotate(-130deg);
}

.calendar-list .edit-log {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  display: none;
  overflow: auto;
  padding: 20px 0;
  min-height: 200%;
  max-height: 280px;
  width: 200%;
  background: #fff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  color: #333;
}

.calendar-list .edit-log p {
  margin: 0;
  margin-bottom: 8px;
  padding: 0 10px;
  text-align: justify;
  word-wrap: break-word;
  word-break: break-all;
  line-height: 20px;
}

.calendar-list .edit-tag {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  display: block;
  overflow: hidden;
  width: 20px;
  height: 20px;
}

.no-data {
  margin-top: 60px;
  height: 500px;
  border-right: 1px solid #e5e6e5;
  border-bottom: 1px solid #e5e6e5;
}

.edit-record p {
  line-height: 25px;
}
.unusual-link{
  text-decoration: underline;
  display: inline-block;
  width: 100%;
}
.unusual-link:hover{
  text-decoration: underline
}
</style>

<style>
.edit-calendar-modal .el-dialog {
  width: 600px !important;
  height: 500px !important;
}
</style>

<script>
export default {
  name: 'calendar',
  data() {
    return {
      week: ['日', '一', '二', '三', '四', '五', '六'],
      date: [],
      type: [],
      affairsType: [], //考勤类型数据
      modal: false,
      minTime() {
        return this.form.startTime
      },
      // day: '', //假期剩余天数
      form: {
        startTime: '',
        endTime: '',
        remark: '',
        type: '', //修改类型
        time: '', //时长
        userId: '', //用户id
        typeName: '',
        id: '',
        date: '', //修改的那一天
      },
      rules: {
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
        type: [
          {
            required: true,
            message: '状态不能为空！',
          },
        ],
        time: [
          {
            required: true,
            message: '请选择时长！',
          },
        ],
        remark: [
          {
            required: true,
            message: '修改备注不能为空！',
          },
        ],
      },
    }
  },
  props: ['edit', 'getType'],
  methods: {
    editHandel(id, date) {
      this.modal = true
      this.form.id = id
      this.form.date = date
    },
    changeTime() {
      let start = this.form.startTime.split(':')[0]
      let end = this.form.endTime.split(':')[0]
      if (start && end) {
        let result = 0
        if (end > 12 && end <= 13) {
          result = end - start - 1
        } else if (end > 13 && end <= 14) {
          result = end - start - 2
        } else {
          result = end - start
        }
        if (result <= 4) {
          this.form.time = 0.5
        } else {
          this.form.time = 1
        }
      } else {
        this.form.time = ''
      }
    },
    submit() {
      //修改考勤记录
      this.$refs.form.validate(valid => {
        if (valid) {
          let { type } = this.form
          let params = this.form
          params.type = type.split('|')[0]
          params.typeName = type.split('|')[1]
          this.disable = true
          this.ajax({
            url: '/cwa/attendance/update',
            type: 'put',
            data: Utils.filterObjectNull(params),
            success(data, $this) {
              if (data.code == 'success') {
                $this.successTips('修改成功')
                $this.modal = false
                $this.$emit('getType', $this.form.userId)
                $this.resetForm('form')
              } else {
                $this.errorTips(data.message)
              }
            },
          })
        }
      })
    },
    dateList(month, data, type, id) {
      this.affairsType = type
      this.date = []
      this.form.userId = id
      if (!month) {
        return
      }
      let DATE = month.split('-') //传过来的日期
      let $year = DATE[0] //年 2017
      let $month = DATE[1] //月 11
      let activeDate = new Date($year, $month - 1, 1)
      let bf = true,
        af = false
      activeDate.setDate(1)
      activeDate.setDate(1 - activeDate.getDay())

      let leaveType = {} //考勤类型

      let getStyle = value => {
        //不同考勤类型对应不同的样式
        let style = {}
        if (value == 0 || value == 1) {
          //0-初始正常 1-修改后考勤后变正常
          style = {
            bg: '#e8fff6',
            color: '#23d183',
          }
        }
        if (value == 2 || value == 9) {
          //加班
          style = {
            bg: '#ffe6e6',
            color: '#f46564',
          }
        }
        if (value == 3) {
          //出差
          style = {
            bg: '#fff1e1',
            color: '#f8a64a',
          }
        }
        if (value >= 4 && value != 9) {
          //请假
          style = {
            bg: '#e8f8ff',
            color: '#4bb5f8',
          }
        }
        if (value == 10) {
          //外出
          style = {
            bg: '#f7ebff',
            color: '#c06dec',
          }
        }
        if (value == -1) {
          //旷工
          style = {
            bg: '#f35857',
            color: '#fff',
          }
        }
        if (value == -2) {
          //早退
          style = {
            bg: '#f35857',
            color: '#fff',
          }
        }
        if (value == -3) {
          //休息
          style = {
            bg: '#e8f8ff',
            color: '#4bb5f8',
          }
        }
        // if (value == -4) {
        //   //审批中
        //   style = {
        //     bg: '#f35857',
        //     color: '#fff',
        //   }
        // }
        return style
      }
      type.forEach(item => {
        //遍历考勤类型
        let value = Number(item.value)
        leaveType[value] = {
          name: item.name,
          value: value,
          style: getStyle(value),
        }
      })
      for (var j = 0; j < 42; j++) {
        let $date = activeDate.getDate() //每月的日期- 1号
        if ($date == 1) {
          if (bf) {
            bf = false
          } else {
            af = true
          }
        }
        activeDate.setDate($date + 1)
        let dayInfo = {
          //每天对应的信息
          date: $date,
          day: [$year, $month, $date < 10 ? '0' + $date : $date].join('-'),
          info: [],
        }
        if (af || bf) {
          dayInfo.disabled = true //是否本月日历之外
        }

        let tempData = []
        data.forEach(item => {
          //遍历当月的考勤数据
          let { date, dayList, fristTime, lastTime, status } = item

          if ([$year, $month, $date].join('-').toTime() === date.toTime()) {
            //如果循环表格的日期和数据的日期匹配上
            tempData.push({
              date, //日期
              fristTime, //首次打卡时间
              lastTime, //末次打卡时间
              status, //打卡状态
              dayList, //存在考勤类型列表
            })
          }
        })

        if (j % 7 == 0 || (j + 1) % 7 == 0) {
          //周六或周日
          dayInfo.klass = 'enabled'
          dayInfo.name = ''
          if (j % 7 == 0) {
            dayInfo.last = 'weekend diurnal'
          } else {
            dayInfo.last = 'weekend sat'
          }
        }
        tempData.forEach(item => {
          let { dayList, fristTime, lastTime, status } = item
          let sign = {} //打卡记录
          if (status == 0) {
            //未打卡
            sign.noPunch = ['', '#ed6b6a']
          } else if (status == 1) {
            //未签退
            sign.early = [fristTime, '#bdbdbd']
            sign.night = ['--', 'red']
          } else if (status == 2) {
            //未签到
            sign.early = ['--', 'red']
            sign.night = [lastTime, '#bdbdbd']
          } else if (status == 3) {
            //完美
            sign.early = [fristTime, '#bdbdbd']
            sign.night = [lastTime, '#bdbdbd']
          }

          dayInfo.sign = sign
          if (dayList) {
            dayList.forEach(list => {
              let { name, style } = leaveType[list.type] || { name: '', value: -3, style: { color: '', bg: '' } } //获取对应考勤类型的样式
              let { id, time, type, remark, refId } = list

              // let _name = name
              // if ((type == 9 || type == 2) && status != 3) {
              //   _name = '加班异常'
              // }
              dayInfo.info.push({
                refId,
                id,
                time,
                type,
                remark,
                name,
                bg: style.bg,
                color: style.color,
              })
            })
          } else {
            dayInfo.info.push({
              id: 1,
              type: 0,
              remark: '3213',
              name: '出勤',
              bg: '#e8fff6',
              color: '#23d183',
              time: 1
            })
          }
        })
        let toDayYear = [new Date().getFullYear(), new Date().getMonth() + 1, 0].join('-').toTime()
        let dayYear = [$year, $month, 0].join('-').toTime()
        if ($date > new Date().getDate() && toDayYear == dayYear) {
          //大于当前日期为不可用
          dayInfo.klass = 'disabled'
        }
        this.date.push(dayInfo)

      }
    },
  },
}
</script>


