<template>
  <div id="attenReport">
    <v-panel>
      <div>
        <el-form ref="formInline" :model="form" label-width="90px" :inline="true">
          <el-form-item label="部门：">
            <el-cascader style="width: 140px" @change="getAttendanceBtn" :options="departCascader" :change-on-select="true" :show-all-levels="false" :props="{
                    value: 'id',
                    label: 'name',
                    children: 'children'
                  }" v-model="form.depId">
            </el-cascader>
          </el-form-item>

          <el-form-item label="月份：">
            <el-date-picker style="width: 140px;" :editable="false" :clearable="false" :picker-options="pickerOptions" @change="getMonth" v-model="form.month" type="month" placeholder="选择月">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="姓名：">
            <el-input style="width: 140px;" v-model="form.name" placeholder="请输入姓名"></el-input>
          </el-form-item>

          <el-form-item label="确认情况：">
            <el-select style="width: 140px;" v-model="form.status" clearable placeholder="请选择">
              <el-option label="待确认" :value="1"></el-option>
              <el-option label="部门未确认" :value="2"></el-option>
              <el-option label="部门确认" :value="3"></el-option>
              <el-option label="已核实" :value="4"></el-option>
            </el-select>
          </el-form-item>

        </el-form>
        <div class="search-box">
          <button type="button" @click="getList(pages.pageNum)" class="search-btn btn btn-green" style="margin-top:4px; margin-left: 10px;">查询</button>
        </div>
      </div>
    </v-panel>

    <v-panel title="考勤统计">
      <div slot="button">
        <el-button v-for="(item, index) in button" v-if="item.show" :key="index" type="info" @click="submitReport(item.url,item)" :disabled="item.status" class="btn btn-space" style="margin-top:4px; margin-left: 10px;" v-html="item.name"></el-button>
      </div>
      <el-table v-if="attendanceData.length>0" :data="attendanceData" border style="width: 100%" :empty-text="loadingText">
        <el-table-column align="center" fixed scope="props" prop="name" label="员工信息" width="282">
          <el-table-column align="center" label="工号" width="60">
            <template slot-scope="scope">
              {{scope.row.report.usercode}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="姓名" width="75">
            <template slot-scope="scope">
              {{scope.row.report.userRealname}}
            </template>
          </el-table-column>
          <el-table-column align="center" label="部门" width="150">
            <template slot-scope="scope">
              {{scope.row.report.depName}}
            </template>
          </el-table-column>

        </el-table-column>
        <el-table-column align="center" label="考勤记录">
          <el-table-column align="center" v-for="i in punchClock.count" :key="i" :label="punchClock.month + '.' + i +'号'" min-width="130">
            <template slot-scope="scope">
              <p class="punch-time">{{scope.row.attendance[i-1] && scope.row.attendance[i-1].fristTime || '-'}}
                <!-- <span class="status">{{['未打卡', '未签退', '未签到', '出勤'][scope.row.attendance[i-1].status]}}</span> -->
                <span class="status" v-html="formateAtten(scope.row.attendance[i-1])"></span>
                <!-- <span class="status" v-html="scope.row.attendance[i-1] && scope.row.attendance[i-1].attName || ''"></span> -->
              </p>
              <p class="punch-time">{{scope.row.attendance[i-1] && scope.row.attendance[i-1].lastTime || '-'}}</p>
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column align="center" prop="province" label="出勤">
          <el-table-column align="center" prop="date" label="应出勤" width="65">
            <template slot-scope="scope">
              {{scope.row.report.workDay}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="date" label="实际出勤" width="75">
            <template slot-scope="scope">
              {{scope.row.report.normal}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="date" label="核算出勤" width="75">
            <template slot-scope="scope">
              {{scope.row.report.paidDay}}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" prop="city" label="年假">
          <el-table-column align="center" prop="date" label="上月结余" width="75">
            <template slot-scope="scope">
              {{scope.row.holiday.annualLastBlance}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="date" label="本月新增" width="75">
            <template slot-scope="scope">
              {{scope.row.holiday.annualAdd}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="date" label="本月减少" width="75">
            <template slot-scope="scope">
              {{scope.row.holiday.annualSub}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="outside" label="结余" width="55">
            <template slot-scope="scope">
              {{scope.row.holiday.annualBlance}}
            </template>
          </el-table-column>
        </el-table-column>

        <el-table-column align="center" prop="address" label="调休假">
          <el-table-column align="center" prop="outside" label="上月结余" width="75">
            <template slot-scope="scope">
              {{scope.row.holiday.takeoffLastBlance}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="outside" label="本月新增" width="75">
            <template slot-scope="scope">
              {{scope.row.holiday.takeoffAdd}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="outside" label="本月减少" width="75">
            <template slot-scope="scope">
              {{scope.row.holiday.takeoffSub}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="outside" label="结余" width="60">
            <template slot-scope="scope">
              {{scope.row.holiday.takeoffBlance}}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" prop="zip" label="其他假">
          <el-table-column align="center" prop="outside" label="有薪假" width="65">
            <template slot-scope="scope">
              {{scope.row.report.leave4}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="outside" label="病假" width="50">
            <template slot-scope="scope">
              {{scope.row.report.leave2}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="outside" label="事假" width="50">
            <template slot-scope="scope">
              {{scope.row.report.leave3}}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" prop="异常统计" label="异常统计">
          <el-table-column align="center" prop="outside" label="旷工" width="50">
            <template slot-scope="scope">
              {{scope.row.report.absenteeism}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="outside" label="早退" width="50">
            <template slot-scope="scope">
              {{scope.row.report.early}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="outside" label="补单" width="50">
            <template slot-scope="scope">
              {{scope.row.report.cwaexception}}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="outside" label="补签" width="50">
            <template slot-scope="scope">
              {{scope.row.report.correct}}
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column align="center" prop="是否确认" label="是否确认" width="90">
          <template slot-scope="scope">
            {{['','待确认', '部门未确认', '部门确认', '已核实'][scope.row.report.status]}}
            <!-- 1-待确认 2-已确认 3- 部门确认 4-已核实 -->
          </template>
        </el-table-column>
      </el-table>
      <div style="height:200px; line-height: 170px; text-align: center" v-else v-loading.body="loading">
        没有查询到数据
      </div>
      <el-pagination style="margin-top:30px; margin-bottom:10px" @current-change="changeSize" :current-page="pages.pageIndex" :page-size="10" layout="total,  prev, pager, next, jumper" :total="pages.totals">
      </el-pagination>
    </v-panel>
  </div>
</template>
<style lang="scss">
.el-loading-spinner {
  background: #fff;
}
#attenReport {
  .department {
    float: left;
    width: 300px;
  }
  .panel {
    overflow: hidden;
  }
  .calendar-modal .el-dialog {
    width: 1300px;
    height: 700px;
  }
  .punch-time {
    text-align: left;
    padding: 2px;
    line-height: 25px;
    height: 25px;
    .status {
      float: right;
      text-align: right;
    }
  }
  .el-table .cell {
    padding: 0 12px;
  }
  tbody tr td:nth-child(2) .cell,
  tbody tr td:nth-child(3) .cell {
    visibility: visible;
  }
}
</style>

<script>
import calendar from '@/components/Calendar' //日历考勤
export default {
  name: 'report',
  components: {
    calendar,
  },
  data() {
    let date = new Date()
    let month = (date.getMonth() + 1).toString()
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now() - 8.64e7
        },
      },
      modal: false,
      button: [],
      departCascader: [], // 部门树
      title: '考勤详情',
      form: {
        month: date.getFullYear() + '-' + (month.length == 1 ? '0' + month : month),
        name: '',
        depId: [],
        isSubmit: '',
        status: '',
        userId: Utils.getValue('u')
      },
      exportIng: false,
      loadingText: '加载中...',
      loading: false,
      punchClock: {
        count: 0,
        month: 0
      },  //打卡数据
      attendanceData: [],
      pages: {
        totals: 0,
        pageIndex: 1,
        pageNum: 1,
      },
    }
  },
  created() {
    this.getDepartment()
  },

  methods: {
    getDepartment() {
      // 获取部门树
      this.ajax({
        // url: '/authority/dep/tree/list',
        url: '/cwa/attendance/admin/tree',
        data: {
          userId: Utils.getValue('u')
        },
        success(data, $this) {
          if (data.code == 'success') {
            if (data.content.length > 0) {
              $this.form.depId = [data.content[0].id];
              $this.departCascader = $this.delTree(data.content)
            }
            $this.getList($this.pages.pageNum)
          }
        },
      })
    },
    // changDepart() {
    //   this.getAttendanceBtn()
    // },
    getMonth(month) {
      this.form.month = month
      if (month) {
        this.getAttendanceBtn()
      }
    },
    getType(id) {
      this.ajax({
        //获取请假类型
        url: 'ctm/setting/param/list',
        data: {
          code: 'cwa_leave_type',
        },
        success(data, $this) {
          if (data.code == 'success') {
            $this.getData(id, $this.form.month, data.content)
          }
        },
      })
    },
    getData(id, month, type) {
      //用户的出勤数据
      this.ajax({
        url: '/cwa/attendance/list',
        data: {
          month: month,
          userId: id,
        },
        success(data, $this) {
          if (data.code == 'success') {
            $this.$refs.calendar.dateList(month, data.content, type, id)
          }
        },
      })
    },
    getAttendanceBtn() { //获取提交考勤状态
      this.button = this.button.map((item) => {
        if (item.url == 'submitDepCwa') {
          item.status = true
        }
        return item
      })
      let { month, userId, depId } = this.form
      this.ajax({
        url: '/cwa/attendance/submit/status',
        data: {
          month,
          depId: depId[depId.length - 1] || 1,
          userId
        },
        success(data, $this) {  // [-1没权限, 1- 不显示, 2-部门考勤管理员, 3-总考勤管理员, 4-已提交]
          if (data.code == "success") {
            let { content } = data;
            $this.button = $this.button.map((item) => {

              if (content == -1) {
                if (item.url == 'submitDepCwa') {  //部门按钮不显示
                  item.show = false
                }
              }

              if (content == 1 || content == 2) {
                if (item.url == 'submitDepCwa' || item.url == 'submitAllCwa') {
                  item.status = false  //禁用
                  item.show = true
                  item.name = '提交总考勤'
                }
                if (item.url == 'submitDepCwa') {
                  item.name = '提交部门考勤'
                }
              }

              if (content == 3) {
                if (item.url == 'submitDepCwa') {
                  item.status = true
                  item.show = true
                  item.name = '部门考勤已提交'
                }
                if (item.url == 'submitAllCwa') {
                  item.status = false
                  item.name = '提交总考勤'
                }
              }

              if (content == 4) {
                if (item.url == 'submitAllCwa' || item.url == 'submitDepCwa') {
                  item.status = true
                  item.show = true
                  item.name = '已核实'
                }
                if (item.url == 'submitDepCwa') {
                  item.name = '已提交'
                }
              }
              return item;
            })
          } else {
            $this.errorTips(data.message)
          }
        }
      })
    },
    submitAttendance(url, params) {
      let $this = this
      this.confirmTips({
        title: '确认信息',
        content: '是否提交考勤？',
        submit() {
          $this.ajax({
            url,
            data: params,
            success(data, $this) {
              if (data.code == 'success') {
                $this.successTips('提交成功!')
                $this.getAttendanceBtn()
              } else {
                $this.errorTips(data.message)
              }
            },
          })
        }
      })
    },
    submitReport(id, item) {
      //发送考勤邮件或导出报表
      let object = this.form
      let $this = this
      let { month, name, depId, userId, status } = $this.form
      let _depId = depId[depId.length - 1] || 1
      if (id == 'exportReport') {
        //导出
        if ($this.exportIng) {
          $this.errorTips('正在导出,请稍候...')
          return
        }
        this.confirmTips({
          title: '确认信息',
          content: '是否导出报表？',
          submit() {
            let params = {
              month,
              name,
              status,
              depId: _depId,
            }
            $this.exportIng = true
            item.name = "<i class='el-icon-loading'></i>正在导出"
            $this.downFile('/cwa/attendance/export' + $this.getParams(params) + '', false, function () {
              item.name = '导出报表'
              $this.exportIng = false
            })
          },
        })
      } else if (id == 'sendEmail') {
        //发送考勤邮件
        this.confirmTips({
          title: '确认信息',
          content: `是否发送【${object.month.split('-')[1]}月份】考勤邮件？`,
          submit() {
            $this.ajax({
              url: '/cwa/attendance/sendemail',
              data: {
                month,
              },
              type: 'get',
              success(data, $this) {
                if (data.code == 'success') {
                  $this.successTips('发送成功!')
                  $this.getAttendanceBtn();
                } else {
                  $this.errorTips(data.message)
                }
              },
            })
          },
        })
      } else if (id == 'submitAllCwa') { //提交总考勤
        let params = {
          userId,
          month,
          depId: _depId,
        }
        this.ajax({
          url: '/cwa/attendance/submit/validation',
          data: params,
          success(data, $this) {
            if (data.code == 'failed') {
              $this.errorTips(data.message)
            } else {
              $this.submitAttendance('/cwa/attendance/submit/all', params);
            }
          }
        })
      } else if (id == 'submitDepCwa') { //提交部门考勤
        let params = {
          userId,
          month,
          depId: _depId,
        }
        $this.submitAttendance('/cwa/attendance/submit/dep', params);
      }
    },
    getList(pageNum) {
      let $this = this
      let { month, name, depId, status } = this.form
      let params = {
        month,
        name,
        pageSize: 10,
        pageNum,
        status,
        depId: depId[depId.length - 1] || 1,
      }
      this.attendanceData = [];
      this.loadingText = '加载中...';
      this.loading = true;
      this.getAttendanceBtn();
      this.ajax({
        url: '/cwa/attendance/atten/list',
        data: Utils.filterObjectNull(params),
        success(data, $this) {
          if (data.code == 'success') {
            let { content } = data;
            $this.pages.totals = data.totals
            $this.pages.pageIndex = data.pageIndex
            if (content && content.length > 0) {
              $this.attendanceData = content
              let attendance = content[0].attendance
              $this.punchClock = {
                count: attendance.length,
                month: attendance[0] && attendance[0].date.split('-')[1] || 0
              }
            } else {
              $this.loadingText = '暂无数据'
            }
          }
          $this.loading = false
        },
      })
    },
    changeSize(num) {
      this.pages.pageNum = num
      this.getList(num)
    },
    closeModal() {
      this.$refs.calendar.modal = false
      this.$refs.calendar.date = []
    },
    formateAtten(item) {
      let str = '';
      if (item && item.attName) {
        let name = item.attName.split('#');
        for (let i = 0; i < name.length; i++) {
          if (name[i].includes('旷工') || name[i].includes('早退')) {
            str += `<span style="color: red">${name[i]}</span><br/>`
          } else {
            str += `<span>${name[i]}</span><br/>`
          }
        }
      }
      return str;
    }
  },
  updated() {
    $(".el-table__body-wrapper").removeAttr('style').css({
      overflow: 'hidden',
      outline: 'none'
    }).niceScroll({
      cursorcolor: "rgba(125, 125, 125, 0.7)",
      cursorwidth: "5px",
      cursorborderradius: 5
    });
  },
  mounted() {
    this.getButton(data => {
      //获取当前用户看到的按钮
      this.button = [];
      for (let i = 0; i < data.length; i++) {
        let obj = {
          show: true,
          url: data[i].url,
          name: data[i].name,
        }
        if (data[i].url == 'submitDepCwa') {
          obj.status = true
        }
        this.button.push(obj)
      }
    })
  }
}
</script>
