<template>
  <div>
    <v-panel>
      <el-form id="searchPanel" ref="formInline" :model="form" label-width="95px" :inline="true">
        <el-form-item label="部门：">
          <el-cascader clearable :options="departCascader" :change-on-select="true" :show-all-levels="false" :props="{
                value: 'id',
                label: 'name',
                children: 'children'
              }" v-model="depId">
          </el-cascader>
        </el-form-item>

        <el-form-item label="常驻地：">
          <el-select v-model="form.address" placeholder="请选择">
            <el-option label="深圳" value="1">
            </el-option>
            <el-option label="全部" value="0">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="姓名：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="日期：">
          <el-date-picker type="date" :editable="false" :picker-options="pickerOptions0" @change="getList(pages.pageNum)" placeholder="选择日期" format="yyyy-MM-dd" v-model="form.date"></el-date-picker>
        </el-form-item>

        <div></div>

        <el-form-item label="上班签到：">
          <el-time-picker class="search-time" popper-class="search-time-panel" v-model="form.fbegin" format="HH:mm">
          </el-time-picker>
          <el-time-picker class="search-time" popper-class="search-time-panel" v-model="form.fend" format="HH:mm">
          </el-time-picker>
        </el-form-item>

        <el-form-item label="下班签退：" style="margin-left: -13px;">
          <el-time-picker class="search-time" popper-class="search-time-panel" v-model="form.lbegin" format="HH:mm">
          </el-time-picker>
          <el-time-picker class="search-time" popper-class="search-time-panel" v-model="form.lend" format="HH:mm">
          </el-time-picker>
        </el-form-item>
        <button type="button" @click="getList(pages.pageNum)" class="search-btn btn btn-green" style="margin-top:4px; margin-left: 10px;">查询</button>
      </el-form>
    </v-panel>

    <v-panel>
      <el-table id="dataList" :data="dataList" border :empty-text="loadingText">
        <el-table-column label="员工信息" align="center">
          <el-table-column prop="name" label="姓名" align="center" width="150">
          </el-table-column>
          <el-table-column min-width="300" prop="depName" :formatter="depName" label="部门" align="left">
          </el-table-column>
          <el-table-column prop="address" label="常住地" align="center" width="150">
          </el-table-column>
        </el-table-column>

        <el-table-column label="前一天" align="center">
          <el-table-column prop="lastday" :formatter="lastday" label="下班签退" align="center" width="150">
          </el-table-column>
        </el-table-column>
        <el-table-column :label="weekAndDay" align="center">
          <el-table-column :formatter="fristTime" prop="fristTime" label="上班签到" align="center" width="150">
          </el-table-column>
          <el-table-column :formatter="lastTime" prop="lastTime" label="下班签退" align="center" width="150">
          </el-table-column>
          <!-- <el-table-column :formatter="cwaName" prop="cwaName" label="考勤状态" align="center" width="150">
          </el-table-column> -->
        </el-table-column>
      </el-table>
      <el-pagination style="margin-top:30px; margin-bottom:10px" @current-change="changeSize" :current-page="pages.pageIndex" :page-size="10" layout="total,  prev, pager, next, jumper" :total="pages.totals">
      </el-pagination>
    </v-panel>
  </div>
</template>
<style>
#searchPanel .el-input__inner,
#searchPanel .el-date-editor.el-input {
  width: 150px;
}

#searchPanel .search-time .el-input__icon {
  display: none;
}

#searchPanel .search-time {
  width: 80px !important;
}

#searchPanel .search-time .el-input__inner {
  width: 68px;
  padding-right: 0;
}

.search-time-panel {
  width: 120px !important;
}
</style>
<script>
export default {
  name: 'punch',
  data() {
    return {
      departCascader: [], //部门树
      depId: [],
      dataList: [],
      pages: {
        totals: 0,
        pageIndex: 1,
        pageNum: 1,
      },
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
      },
      weekAndDay: '',
      loadingText: '加载中...',
      form: {
        depId: '',
        date: new Date(),
        name: '',
        address: '1',
        fbegin: '',
        fend: '',
        lbegin: '',
        lend: '',
      },
    }
  },
  created() {
    this.getDepartment()
    this.getList(this.pages.pageNum)
  },
  updated() {
    if (navigator.userAgent.indexOf('Trident') == -1) {
      this.renderHtml()
    }
    this.$nextTick(() => {
      $('.el-table__body-wrapper').niceScroll({
        cursorcolor: 'rgba(125, 125, 125, 0.7)',
        cursorwidth: '5px',
        cursorborderradius: 5,
      })
    })
  },
  methods: {
    getDepartment() {
      // 获取部门树
      this.ajax({
        url: '/authority/dep/tree/list',
        success(data, $this) {
          if (data.code == 'success') {
            $this.departCascader = $this.delTree(data.content)
          }
        },
      })
    },
    getDate(date) {
      let _date = date && new Date(date).toStr().split(' ')
      return {
        date: _date[0],
        time: _date[1],
      }
    },
    getList(pageNum) {
      this.dataList = []
      let { address, name, date, fbegin, fend, lbegin, lend } = this.form
      let params = {
        depId: this.depId[this.depId.length - 1] || 1,
        pageSize: 10,
        pageNum,
        address,
        name,
        date: this.getDate(date).date,
        fbegin: this.getDate(fbegin).time,
        fend: this.getDate(fend).time,
        lbegin: this.getDate(lbegin).time,
        lend: this.getDate(lend).time,
      }
      this.getWeekbyDay()
      this.ajax({
        url: '/cwa/attendance/pc/list',
        data: Utils.filterObjectNull(params),
        success(data, $this) {
          if (data.code == 'success') {
            $this.pages.totals = data.totals
            $this.pages.pageIndex = data.pageIndex
            $this.dataList = data.content
            if (data.content.length == 0) {
              $this.loadingText = '暂无数据'
            }
          } else {
            $this.errorTips(data.message)
          }
        },
      })
    },
    renderHtml() {
      let $this = this
      const TIME = 24 * 60 * 60 * 1000
      let dom = $($('#dataList thead th')[3])
        .find('.cell')
        .html(
          '<i title="前一天" style="padding-right:10px; cursor:pointer" class="el-icon-arrow-left"></i>' +
            this.weekAndDay +
            '<i title="后一天" class="el-icon-arrow-right" style="padding-left:10px;cursor:pointer"></i>',
        )
      dom.find('.el-icon-arrow-left').on('click', function() {
        $this.form.date = new Date(new Date($this.form.date).getTime() - TIME)
        $this.getList($this.pages.pageNum)
      })
      dom.find('.el-icon-arrow-right').on('click', function() {
        if (new Date($this.form.date).getTime() < new Date().getTime() - TIME) {
          $this.form.date = new Date(new Date($this.form.date).getTime() + TIME)
          $this.getList($this.pages.pageNum)
        } else {
          $(this).attr('title', '没有后一天了')
        }
      })
    },
    changeSize(num) {
      this.pages.pageNum = num
      this.getList(num)
    },
    fillNull(value) {
      if (!value) {
        return '-'
      }
      return value
    },
    getWeekbyDay() {
      let { date } = this.form
      let day = new Date(date).getDay()
      let today = ['日', '一', '二', '三', '四', '五', '六']
      this.weekAndDay = `${this.getDate(date).date} 星期（${today[day]}）`
    },
    fristTime(row, b, c) {
      return this.fillNull(c)
    },
    lastTime(row, b, c) {
      return this.fillNull(c)
    },
    cwaName(row, b, c) {
      return this.fillNull(c)
    },
    lastday(row, b, c) {
      return this.fillNull(c)
    },
    depName(row) {
      return this.reverseDepart(row.depName)
    },
  },
}
</script>
