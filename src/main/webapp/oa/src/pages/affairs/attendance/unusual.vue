// 申请考勤异常
<template>
  <div id="unusualModal">
    <el-dialog title="考勤异常单" :visible.sync="modal" size="tiny">
      <el-form ref="form" :model="form" :rules="rules" label-width="128px" label-position="right">
        <el-form-item label="异常类型：">
          <el-select @change="typeChange" class="w-100" v-model="form.type" placeholder="请选择">
            <el-option label="考勤变更" value="1">
            </el-option>
            <el-option label="工作时间变更" value="2">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="实际考勤类型：" prop="cwaType" v-if="form.type==1">
          <el-select @change="checkTime" class="w-100" clearable v-model="form.cwaType" placeholder="请选择">
            <el-option v-for="item in cwaTypeList" :key="item.value" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="开始时间：" class="w-222" prop="startDate" style="display:inline-block">

          <el-date-picker class="w-222" :picker-options="form.type==2?startDateWork:startDateOpt" :editable="false" @change="checkTime" v-model="form.startDate" type="date" placeholder="选择日期">
          </el-date-picker>

        </el-form-item>
        <el-form-item prop="startTime" class="w-222" style="display:inline-block;">
          <el-time-select class="w-222" v-model="form.startTime" :editable="false" @change="checkTime" :picker-options="form.type==2?{

                                                                                start: '07:00',
                                                                              step: '00:30',
                                                                              end: '22:00'
                                                                            }:{
                                                                               start: '08:00',
                                                                                step: '00:30',
                                                                                end: '22:00'
                                                                            }" placeholder="选择时间">
          </el-time-select>
        </el-form-item>

        <el-form-item label="结束时间：" prop="endDate" class="w-222" style="display:inline-block">
          <el-date-picker class="w-222" :editable="false" :picker-options="form.type==2?endDateWork:endDateOpt" @change="checkTime" v-model="form.endDate" type="date" placeholder="选择日期">
          </el-date-picker>
        </el-form-item>
        <el-form-item prop="endTime" class="w-222" style="display:inline-block">
          <el-time-select class="w-222" v-model="form.endTime" @change="checkTime" :editable="false" name="endTime" :picker-options="form.type==2?{
                                                                                start: '07:00',
                                                                              step: '00:30',
                                                                              end: '22:00'
                                                                            }:{
                                                                              start: '08:00',
                                                                                step: '00:30',
                                                                                end: '22:00'
                                                                            }" placeholder="选择时间">
          </el-time-select>
        </el-form-item>
        <el-form-item v-if="form.type == 1" label="时长(天)：" prop="timeLength">
          <el-input disabled v-model="form.timeLength"></el-input>
          <i v-if="timeLoading" class="el-icon-loading" style="position:absolute;right:10px;top:12px"></i>
        </el-form-item>

        <template v-if="form.type==1">
          <template v-if="form.cwaType == 1">
            <!-- 请假 -->
            <el-form-item label="请假类型：" prop="leaveType">
              <v-affairs ref="getAffairs" filter="true" class="w-207" @change="getAffairs" style="display:inline-block"></v-affairs>
              <span :class="[days.annual == 0? 'error': '']" v-if="affairsDay.value == 4" style="padding-left: 10px">剩余年休假 {{days.annual}} 天</span>
              <span :class="[days.takeoff == 0? 'error': '']" v-if="affairsDay.value == 5" style="padding-left: 10px">剩余调休假 {{days.takeoff}} 天</span>
            </el-form-item>

            <el-form-item label="工作代理人：">
              <v-person ref="getPerson" :disabled="true" style="width: 100%" @change="getPerson"></v-person>
            </el-form-item>
          </template>

          <template v-if="form.cwaType == 3">
            <!-- 出差 -->
            <el-form-item label="出发地点：" prop="startAddress">
              <el-input v-model="form.startAddress"></el-input>
            </el-form-item>
            <el-form-item label="目的地点：" prop="endAddress">
              <el-input v-model="form.endAddress"></el-input>
            </el-form-item>
          </template>

          <template v-if="form.cwaType == 10">
            <!-- 外出 -->
            <el-form-item label="外出地点：" prop="address">
              <el-input v-model="form.address"></el-input>
            </el-form-item>
          </template>

          <template v-if="form.type == 1">
            <el-form-item label="覆盖考勤单：" prop="cwaList">
              <el-select class="w-100" multiple v-model="form.cwaList" placeholder="请选择要覆盖的考勤单">
                <el-option :label="item.title" :value="item.id" v-for="item in attendanceList" :key="item.id">
                </el-option>
              </el-select>

              <!-- <el-checkbox-group v-if="form.cwaList.length>0" v-model="form.cwaList">
                <el-checkbox v-for="item in attendanceList" :key="item.id" :label="item.id" class="w-100">
                  {{item.title}}
                  <span style="float: right;">{{item.salesmanName}}</span>
                </el-checkbox>
              </el-checkbox-group> -->
            </el-form-item>

          </template>
        </template>
        <el-form-item label="附件：">
          <c-upload @getFileList="getFileList" :fileList="form.files"></c-upload>
        </el-form-item>
        <el-form-item label="事由：" prop="reason">
          <el-input v-model="form.reason" type="textarea"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <!-- <el-button type="success" :disabled="disable" @click="submit" v-if="disable">
                                  <i class="el-icon-loading"></i>
                                </el-button> -->
        <el-button type="success" :loading="disable" @click="submit">确 定</el-button>
        <el-button type="info" @click="modal = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style lang="scss">
#unusualModal {
  .el-dialog {
    width: 600px;
    .el-checkbox + .el-checkbox {
      margin-left: 0;
    }
  }
  .error {
    color: #f00;
  }
  .w-222 {
    width: 218px !important;
  }
  .el-form-item__content {
    width: 438px;
  }
}
</style>
<script>
export default {
  name: 'unusualModal',
  data() {
    return {
      startDateOpt: {
        disabledDate: time => {
          if (this.form.endDate) {
            return time.getTime() > this.form.endDate
          }
        },
      },
      endDateOpt: {
        disabledDate: time => {
          return time.getTime() < this.form.startDate || (this.form.startDate && time.getTime() < this.form.startDate)
          // return time.getTime() > Date.now() - 8.64e7
        },
      },
      startDateWork: {
        disabledDate: time => {
          return time.getTime() < Date.now() - 8.64e7 || (this.form.endDate && time.getTime() > this.form.endDate)
        },
      },
      endDateWork: {
        disabledDate: time => {
          return time.getTime() < Date.now() - 8.64e7 || (this.form.startDate && time.getTime() < this.form.startDate)
        },
      },
      //加班选所有的
      // endOverTime: {
      //   disabledDate: time => {
      //     return time.getTime() > Date.now() - 8.64e7
      //   },
      // },
      modal: false,
      cwaTypeList: [
        {
          name: '出勤',
          value: '0',
        },
      ], //考勤类型
      attendanceList: [], //用户某一时间段内的考勤
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
        agentId: '', //请假代理人
        cwaList: [], // 关联考勤单
        timeLength: '', //请假时长
        type: '1', //异常类型
        reason: '', // 事由
        cwaType: '', //考勤类型
        leaveType: '', //请假类型
        startAddress: '', //出差出发点
        endAddress: '', //目的地
        address: '', //外出地点
        files: [],
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
        reason: [
          {
            required: true,
            message: '事由不能为空！',
          },
        ],
        cwaType: [
          {
            required: true,
            message: '考勤类型不能为空！',
          },
        ],
        leaveType: [
          {
            required: true,
            message: '请假类型不能为空！',
          },
        ],
        startAddress: [
          {
            required: true,
            message: '出发地点不能为空！',
          },
        ],
        endAddress: [
          {
            required: true,
            message: '目的地点不能为空！',
          },
        ],
        address: [
          {
            required: true,
            message: '请输入外出地点!',
          },
        ],
        // cwaList: [
        //   {
        //     required: true,
        //     message: '关联考勤单不能为空!',
        //   },
        // ],
      },
    }
  },
  created() {
    this.getAffairTypes()
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
    },
    getAffairs(obj) {
      //获取请假类型
      this.form.leaveType = obj.value
      this.$refs.form.validateField('leaveType')
      this.days = obj.day
      this.affairsDay = obj
      this.priorDay(obj)
      // this.form.leave.day = obj.day;
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
    getAffairTypes() {
      this.ajax({
        url: '/ctm/setting/param/list',
        data: {
          code: 'processtype',
        },
        success(data, $this) {
          if (data.code == 'success') {
            let content = data.content
            for (let i = 0; i < content.length; i++) {
              if (content[i].value == 1 || content[i].value == 3 || content[i].value == 10) {
                $this.cwaTypeList.push(content[i])
              }
            }
          } else {
            $this.errorTips('考勤类型获取失败!')
          }
        },
      })
    },
    isDay(day) {
      if (day) {
        let $day = day.getDay()
        if ($day == 6 || $day == 0) {
          this.errorTips('周末不能发起工作时间变更!')
        }
      }
    },
    getPerson(obj) {
      //获取代理人
      this.form.agentId = obj.value
    },
    checkTime() {
      let cwaType = this.form.cwaType
      let url = '/cwa/leave/timelong'
      if (cwaType == 1) {
        //请假
        url = '/cwa/leave/timelong'
      } else if (cwaType == 2) {
        //加班
        url = '/cwa/overtime/timelong'
      } else if (cwaType == 10 || cwaType == 3) {
        //外出和出差
        url = '/cwa/travel/timelong'
      }
      this.form.timeLength = ''
      let { startDate, startTime, endDate, endTime } = this.form
      if (this.form.type == 2) {
        this.isDay(startDate)
      }
      if (startDate && startTime && endDate && endTime) {
        let START = startDate.toStr(true).split(' ')[0] + ' ' + startTime
        let END = endDate.toStr(true).split(' ')[0] + ' ' + endTime
        this.startDate = new Date(START).getTime()
        this.endDate = new Date(END).getTime()

        if (this.form.type == 1) {
          //考勤类型不能为空
          if (!this.form.cwaType) {
            this.errorTips('请先选择考勤类型!')
            return
          }
          this.queryAttendanceList()
        }
        this.timeLoading = true
        this.ajax({
          url: url,
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
    getFileList(list) {
      this.form.files = list
    },
    queryAttendanceList() {
      //查询用户的考勤单
      this.ajax({
        url: '/cwa/attendance/list/bytime',
        data: {
          starttime: this.startDate,
          endtime: this.endDate,
        },
        success(data, $this) {
          if (data.code == 'success') {
            if (data.content.length > 0) {
              $this.attendanceList = data.content
            } else {
              // $this.errorTips('没有查询到相关的考勤单!')
              $this.attendanceList = []
            }
          } else {
            // $this.errorTips('获取关联考勤单失败!')
          }
        },
      })
    },
    refer(data, type) {
      this.disable = true
      let params = {}
      let cwaType = this.form.cwaType
      params = data
      if (type) {
        //考勤变更
        params.map = {
          userId: this.$store.state.u,
          startTime: this.startDate,
          endTime: this.endDate,
          timeLength: this.form.timeLength,
          files: this.form.files,
        }

        if (cwaType == 1) {
          //请假
          params.map.userId = this.$store.state.u
          params.map.type = this.form.leaveType
          params.map.reason = this.form.reason
          let agentId = this.form.agentId
          if (agentId) {
            params.map.agentId = agentId
          }
        } else if (cwaType == 3) {
          //出差
          params.map.startAddress = this.form.startAddress
          params.map.endAddress = this.form.endAddress
          params.map.isNeedplane = '0'
          params.map.remark = this.form.reason
        } else if (cwaType == 5) {
          //外出
          params.map.address = this.form.address
          params.map.reason = this.form.reason
        }
      }
      this.ajax({
        url: '/cwa/correct/start',
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
    },
    typeChange() {
      this.resetForm('form')
    },
    submit() {
      let $this = this
      this.$refs.form.validate(valid => {
        if (valid) {
          let data = {
            starttime: $this.startDate,
            endtime: $this.endDate,
            timeLength: $this.form.timeLength,
            reason: $this.form.reason,
          }
          let cwaType = $this.form.cwaType
          if (this.form.type == 1) {
            if (this.form.cwaType == 1) {
              if (!this.priorDay(this.affairsDay)) {
                return
              }
              if (this.affairsDay.value == '04' && this.days.annual <= 0) {
                this.errorTips('剩余年休假 0 天!')
                return
              }
              if (this.affairsDay.value == '05' && this.days.takeoff <= 0) {
                this.errorTips('剩余调休假 0 天!')
                return
              }
            }
            //考勤变更
            let type = ['出勤', '请假', '加班', '出差'][cwaType] || '外出'
            this.confirmTips({
              title: '信息确认',
              content: `确定要将选定时间内的的考勤类型更改为${type}？`,
              submit() {
                data.type = 1
                data.resultType = $this.form.cwaType
                data.cwaList = $this.form.cwaList
                $this.refer(data, true)
              },
            })
          } else {
            //工作时间变更
            if ($this.startDate >= $this.endDate) {
              $this.errorTips('开始时间不能大于等于结束时间!')
              return
            }
            data.type = 2
            data.resultType = 8
            this.refer(data)
          }
        }
      })
    },
  },
}
</script>
