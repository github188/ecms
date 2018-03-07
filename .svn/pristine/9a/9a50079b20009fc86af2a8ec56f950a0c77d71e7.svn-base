<template>
  <div id="attenSet">
    <v-panel>
      <el-form ref="formInline" :model="form" label-width="100px" :inline="true">
        <el-form-item label="考勤设置：">
          <el-select v-model="form.select" placeholder="请选择" @change="changeHandle" style="width: 180px;">
            <el-option label="审批设置" :value="0"></el-option>
            <el-option label="考勤管理员设置" :value="1"></el-option>
            <el-option label="考勤查看设置" :value="2"></el-option>
            <el-option label="工作日设置" :value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

      <div class="table-list" v-if="form.select == 0" id="planeList"></div>
      <div class="table-list" v-if="form.select == 1" id="approveList"></div>
      <template v-if="form.select == 2">
        <el-button type="success" @click="addCheckPerson" style="float:right; margin-top:-54px;">添 加</el-button>
        <span class="check-tips">可以查看所有人的考勤记录</span>
        <div class="table-list" id="checkList"></div>
      </template>
      <template v-if="form.select == 3">
        <el-date-picker style="float: right ;margin-top:-54px;" :clearable="false" :editable="false" :picker-options="pickerOptions" @change="getMonth" v-model="form.month" type="month" placeholder="选择月">
        </el-date-picker>
        <div>
          <ul class="calendar-color">
            <li>工作日
              <span class="first"></span>
            </li>
            <li>非工作日
              <span class="second"></span>
            </li>
            <li>节假日
              <span class="third"></span>
            </li>
          </ul>
          <ul id="calendar">
            <li class="calendar-list calendar-week" v-for="(item, index) in calendar.week" :key="index">周&nbsp;&nbsp;{{item}}</li>
            <li class="calendar-list" @click="changeStatus(item)" v-for="(item, index) in calendar.date" :key="index" :class="[['','first','second', 'third'][item.type], (item.disabled || item.nowDay) && 'disabled']">
              <span class="date">{{item.day}}</span>
            </li>
          </ul>
          <div style="overflow: hidden">
            <span style="flaot:left; position: relative; top: 10px;">{{calendar.year}}年{{calendar.month}}月份共{{calendar.total}}天工作日。</span>
            <el-button style="float:right" :loading="disable" type="success" @click="setAttendance">确定</el-button>
          </div>
        </div>
      </template>

      <el-dialog :title="title" :visible.sync="modal" size="tiny" class="tiny-setting-modal">
        <el-form label-width="80px" label-position="right">
          <el-form-item label="姓名：">
            <el-select style=" width: 350px !important;" v-model="person" filterable :multiple="false" placeholder="请输入关键字">
              <el-option v-for="item in personList" :key="item.id" :label="item.realname" :value="item.id + '|' + item.realname">
                <span style="float:left" class="search-label">{{item.realname}}</span>
                <!-- <span style="float:right; padding-right:40px;" class="search-label">{{item.phone}}</span> -->
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>

        <span slot="footer" class="dialog-footer">
          <el-button type="success" :disabled="disable" v-if="disable">
            <i class="el-icon-loading"></i>
          </el-button>
          <el-button type="success" :disabled="disable" @click="submit" v-else>确 定</el-button>
          <el-button type="info" @click="modal = false">取 消</el-button>
        </span>
      </el-dialog>
    </v-panel>
  </div>
</template>
<style lang="scss">
#attenSet {
  .calendar-color {
    float: right;
    margin: 10px 0;
  }
  .calendar-color li {
    float: left;
    height: 20px;
    line-height: 20px;
    position: relative;
    margin-right: 15px;
  }
  .calendar-color li span {
    height: 12px;
    width: 20px;
    display: inline-block;
  }
  #calendar {
    overflow: hidden;
    margin-bottom: 12px;
    width: 100%;
    border: 1px solid #e5e6e5;
    border-right: none;
    border-bottom: none;
    font-size: 14px;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
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
    cursor: pointer;
  }
  .first {
    color: #23d183;
    background: #e8fff6;
  }
  .second {
    color: #fff1e1;
    background: #f8a64a;
    // color: #fff;
    // background: #f35857;
  }
  .third {
    // background: #4bb5f8;
    // color: #e8f8ff;
    color: #f7ebff;
    background: #c06dec;
  }

  .calendar-list .date {
    position: absolute;
    top: 12px;
    left: 12px;
    font-weight: bold;
    font-size: 16px;
    font-family: cursive;
  }
  .calendar-list.disabled {
    color: #dadddb;
    cursor: no-drop;
  }

  .calendar-week {
    height: 60px;
    background: #fff;
    line-height: 60px;
  }

  .tiny-setting-modal .el-dialog {
    width: 500px;
  }

  .check-tips {
    position: relative;
    top: -48px;
    left: 300px;
    color: red;
  }
  .table-list {
    margin-bottom: 30px;
  }
}
</style>
<script>
export default {
  name: 'setting',
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < new Date(2017, 12, 1).getTime() - 8.64e7
        },
      },
      person: '',  //当前已经设置好的审批人
      personList: [],  //所有员工列表
      leaderList: [],  //人事审批节点
      title: '审批设置',
      modal: false,
      form: {
        nodeId: '',
        select: 0,
        depId: '',  //部门id
        id: '',  //本条数据id
        month: new Date()
      },
      calendarData: [],
      calendar: {
        week: ['日', '一', '二', '三', '四', '五', '六'],
        date: [],
        year: '',
        month: '',
        total: 0
      }
    };
  },
  created() {
    this.getPersonList();
    this.getPlaneList();
  },
  methods: {
    getPlaneList() {//获取机票设置人列表
      let $this = this;
      this.tableList({
        columns: [{
          name: '名称',
          value: 'nodeName'
        }, {
          name: '姓名',
          render(row) {
            let userName = row.userName;
            return userName || '/';
          }
        }, {
          name: '操作',
          operator() {
            return [{
              name: '设置',
              click(row) {
                $this.modal = true;
                let id = row.userId;
                let name = row.userName;
                if (!!id) {
                  $this.person = id + '|' + name;
                  $this.form.id = row.id;  //本条数据id
                } else {
                  $this.person = '';
                }
                $this.form.nodeId = row.nodeId;
              }
            }];
          }
        }],
        url: '/cwa/attendance/handler/list',
        element: '#planeList',
        isPage: false
      });
    },
    geDeptList() {   //获取考勤管理员列表
      let $this = this;
      this.tableList({
        columns: [{
          name: '审批名称',
          value: 'depName'
        }, {
          name: '姓名',
          value: 'name',
          render(row) {
            let userName = row.userName;
            return userName || '/';
          }
        }, {
          name: '操作',
          operator() {
            return [{
              name: '设置',
              click(row) {
                $this.modal = true;
                $this.form.depId = row.depId;  // 获取当前部门id
                let name = row.userName;
                let id = row.userId;
                if (!!id) {
                  $this.person = id + '|' + name;
                  $this.form.id = row.id;  //本条数据id
                } else {
                  $this.person = '';
                }
              }
            }];
          }
        }],
        url: '/cwa/attendance/dept/list',
        element: '#approveList',
        isPage: false
      });
    },
    getCheckList() {  //获取考勤查看人员列表
      let $this = this;
      this.tableList({
        columns: [{
          name: '姓名',
          value: 'name',
          render(row) {
            let userName = row.userName;
            return userName;
          }
        }, {
          name: '操作',
          operator() {
            return [{
              name: '删除',
              click(row) {
                $this.confirmTips({
                  title: '删除确认',
                  content: '您确定删除吗？',
                  submit() {
                    $this.ajax({
                      url: '/authority/role/user/delete',
                      type: 'put',
                      data: {
                        userId: row.userId
                      },
                      success(data) {
                        if (data.code == 'success') {
                          $this.successTips();
                          $this.getCheckList();
                        } else {
                          $this.errorTips(data.message);
                        }
                      }
                    });
                  }
                });
              }
            }];
          }
        }],
        url: '/authority/role/list/code',
        element: '#checkList',
        isPage: false
      });
    },
    getPersonList() {  //获取所有人
      this.ajax({
        url: '/authority/user/query/list',
        data: {
          pageNum: 1,
          pageSize: 1000
        },
        success(data, $this) {
          if (data.code == 'success') {
            $this.personList = data.content;
          }
        }
      });
    },
    changeHandle(value) {
      if (value == 0) {  //机票审批设置
        this.title = '审批设置';
        this.getPlaneList();
      } else if (value == 1) {  //部门考勤管理员设置
        this.title = '考勤管理员设置';
        this.geDeptList();
      } else if (value == 2) {  //考勤查看设置
        this.getCheckList();
      } else if (value == 3) { //工作日设置
        this.queryAttendance(new Date().toStr().slice(0, 7))
      }
    },
    addCheckPerson() {  //添加考勤查看人员
      this.modal = true;
      this.title = '考勤查看设置';
      this.person = '';
    },
    submit() {
      let userId = this.person.split('|')[0];
      if (!userId) {
        this.errorTips('审批人不能为空!');
        return;
      }
      this.disable = true;
      let { select } = this.form;
      if (select == 0) {  //机票审批设置
        this.ajax({
          url: '/cwa/attendance/handler/update',
          type: 'put',
          data: {
            nodeId: this.form.nodeId,
            userId: this.person.split('|')[0]
          },
          success(data, $this) {
            if (data.code == 'success') {
              $this.modal = false;
              $this.successTips();
              $this.getPlaneList();
            } else {
              $this.errorTips(data.message);
            }
          }
        });
      } else if (select == 1) { //部门考勤管理员设置
        let params = this.form;
        params.userId = this.person.split('|')[0],
          this.ajax({
            url: '/cwa/attendance/dept/update',
            type: 'put',
            data: Utils.filterObjectNull(params),
            success(data, $this) {
              if (data.code == 'success') {
                $this.modal = false;
                $this.successTips();
                $this.geDeptList();
              } else {
                $this.errorTips(data.message);
              }
            }
          });
      } else if (select == 2) {  //考勤查看人员设置
        this.ajax({
          url: '/authority/role/user/add',
          type: 'put',
          data: {
            userId: this.person.split('|')[0]
          },
          success(data, $this) {
            if (data.code == 'success') {
              $this.modal = false;
              $this.successTips();
              $this.getCheckList();
            } else {
              $this.errorTips(data.message);
            }
          }
        });
      }
    },
    getMonth(month) {
      this.queryAttendance(month);
    },
    queryAttendance(month) { //查询工作排期
      this.ajax({
        url: '/cwa/attendance/date/holiday',
        data: {
          month
        },
        success(data, $this) {
          if (data.code == 'success') {
            $this.calendarData = data.content;
            $this.renderCalendar(month)
          } else {
            $this.errorTips(data.message)
          }
        }
      })
    },
    setAttendance() { //设置工作日排期
      let date = this.calendar.date.filter(item => {
        return !item.disabled && item.type != 1;
      });
      this.disable = true;
      this.ajax({
        url: '/cwa/attendance/date/update',
        type: 'post',
        data: {
          month: this.form.month.toStr().slice(0, 7),
          userId: Utils.getValue('u'),
          list: date
        },
        success(data, $this) {
          if (data.code == 'success') {
            $this.successTips('保存成功!');
          } else {
            $this.successTips(data.message);
          }
          $this.disable = false;
        }
      })
    },
    changeStatus(item) {
      let { disabled, type } = item
      if (disabled) {
        return
      }
      if (type < 3) {
        item.type++;
      } else {
        item.type = 1;
      }
      this.calendar.total = this.calendar.date.filter(items => items.type == 1).length
    },
    renderCalendar(month) {
      this.calendar.date = [];
      const DATE = new Date();
      let activeDate = new Date(month)
      let $day = DATE.getDate()
      let bf = true,
        af = false
      activeDate.setDate(1 - activeDate.getDay())

      this.calendar.year = month.split('-')[0]
      this.calendar.month = month.split('-')[1]
      this.calendar.total = 0;

      for (let i = 0; i < 42; i++) {
        let day = activeDate.getDate() //每月的日期- 1号
        let info = {};
        if (day == 1) {
          if (bf) {
            bf = false
          } else {
            af = true
          }
        }
        if (af || bf) {
          info = {
            day
          }
          info.disabled = true //是否本月日历之外
        } else {
          let { type, date } = this.calendarData[day - 1];
          info = {
            day,
            type,
            date
          }
          if (type == 1) {
            this.calendar.total++
          }
        }
        if (month == DATE.getFullYear() + '-' + (DATE.getMonth() + 1) && day <= $day) {//是否小于当前时间
          info.disabled = true
          // info.nowDay = true
        }
        activeDate.setDate(day + 1)
        this.calendar.date.push(info)
      }
    }
  }
};
</script>
