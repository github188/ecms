<template>
  <div>
    <v-panel>
      <el-form id="searchPanel" ref="formInline" :model="form" label-width="100px" :inline="true">
        <el-form-item label="考勤类型：">
          <el-select clearable v-model="form.cwaType" placeholder="请选择">
            <el-option v-for="item in cwaTypeList" :key="item.value" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="审批状态：">
          <el-select clearable v-model="form.status" placeholder="请选择">
            <el-option label="审批中" :value="1"></el-option>
            <el-option label="已通过" :value="2"></el-option>
            <el-option label="已驳回" :value="3"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="创建日期：">
          <el-date-picker type="date" placeholder="开始日期" v-model="form.starttime"></el-date-picker>
          <span>-</span>
          <el-date-picker type="date" placeholder="结束日期" @change="getTime" v-model="form.endtime"></el-date-picker>
        </el-form-item>

        <el-form-item label="部门：">
          <el-cascader clearable :options="departCascader" :change-on-select="true" :show-all-levels="false" :props="{
                    value: 'id',
                    label: 'name',
                    children: 'children'
                  }" v-model="depId">
          </el-cascader>
        </el-form-item>

        <el-form-item label="申请人：">
          <el-input v-model="form.authorName"></el-input>
        </el-form-item>
        <el-form-item label="考勤月份：">
          <el-date-picker @change="chooseMonth" v-model="form.month" format="yyyy-MM" type="month" placeholder="选择月">
          </el-date-picker>
        </el-form-item>
        <el-button style="margin-top:4px; margin-left: 10px;" class="search-btn" type="success" @click="getList">查 询</el-button>
      </el-form>
    </v-panel>

    <v-panel title="考勤审批单">
      <div id="tableList"></div>
    </v-panel>
  </div>
</template>
<style>
#searchPanel .el-input__inner,
#searchPanel .el-date-editor.el-input {
  width: 160px;
}
</style>

<script>
export default {
  name: 'approve',
  data() {
    return {
      cwaTypeList: [],
      departCascader: [], //部门树
      depId: [],
      pickerOptions0: {
        disabledDate(time) {
          return time.getTime() >= Date.now() - 8.64e7
        },
      },
      form: {
        status: '',
        cwaType: '', //考勤类型
        starttime: '', //开始日期
        endtime: '', //结束日期
        depId: '', //部门id
        authorName: '', //申请人
        month: ''
      },
    }
  },
  created() {
    this.getAffairTypes()
    this.getDepartment()
    this.getList()
  },
  updated() {
    $($('.el-table--border th')[4]).css({
      borderRight: 0,
    })
    $($('.el-table--border th')[5]).css({
      borderRight: 0,
    })
  },

  methods: {
    getAffairTypes() {
      this.ajax({
        url: '/ctm/setting/param/list',
        data: {
          code: 'processtype',
        },
        success(data, $this) {
          if (data.code == 'success') {
            const content = data.content
            for (let i = 0; i < content.length; i++) {
              if (content[i].value != 4 && content[i].value != 6) {
                $this.cwaTypeList.push(content[i])
              }
            }
          } else {
            $this.errorTips('考勤类型获取失败!')
          }
        },
      })
    },
    getDepartment() {
      // 获取部门树
      this.ajax({
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
            $this.getList()
          }
        },
      })
    },
    getTime(val) {
      this.form.endtime = val
    },
    chooseMonth(val) {
      this.form.month = val
    },
    getList() {
      let $this = this
      let params = this.form
      params.depId = this.depId[this.depId.length - 1] || 1
      params.starttime = this.form.starttime && new Date(this.form.starttime).getTime()
      params.endtime = this.form.endtime && new Date(this.form.endtime + ' ' + '23:59:59').getTime()
      this.tableList({
        url: '/sys/process/cwa/list',
        data: Utils.filterObjectNull(params),
        columns: [
          {
            name: '考勤类型',
            value: 'typeName',
            width: 100,
          },
          {
            name: '申请人',
            value: 'authorName',
            minWidth: 100,
          },
          {
            name: '开始时间',
            width: 180,
            render(row) {
              if (row.cwaType == 5) {
                return '-'
              } else {
                return Utils.timeToMinute(row.starttime)
                // new Date(parseInt(row.starttime)).toStr();
              }
            },
          },
          {
            name: '结束时间',
            width: 180,
            render(row) {
              if (row.cwaType == 5) {
                return '-'
              } else {
                return Utils.timeToMinute(row.endtime)
              }
            },
          },
          {
            name: '',
            align: 'left',
            width: 120,
            render(row) {
              return $this.reverseDepart(row.depName).split('-')[0]
            },
          },
          {
            name: '部门',
            width: 120,
            render(row) {
              return $this.reverseDepart(row.depName).split('-')[1] || '-'
            },
          },
          {
            name: '',
            align: 'left',
            width: 120,
            render(row) {
              return $this.reverseDepart(row.depName).split('-')[2] || '-'
            },
          },
          {
            name: '状态',
            align: 'left',
            value: 'status',
            width: 80,
            render(row) {
              if (row.cwaType == 5) {
                return '-'
              } else {
                return row.status
              }
            },
          },
          {
            name: '创建时间',
            width: 180,
            render(row) {
              return new Date(parseInt(row.addTime)).toStr().slice(0, 10)
            },
          },
          {
            name: '操作',
            width: 100,
            operator(row) {
              return [
                {
                  name: '详情',
                  click(row) {
                    window.open($this.appRoot + '/work/detail?type=' + row.cwaType + '&id=' + row.id + '', '_blank')
                  },
                },
              ]
            },
          },
        ],
      })
    },
  },
}
</script>
