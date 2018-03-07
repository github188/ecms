<template>
  <div>
    <v-panel class="search-panel">
      <el-form :model="form" label-width="120px" :inline="true">
        <el-form-item label="合同状态：">
          <v-choose type="radio" @change="getChoose" :data="tabChoose"></v-choose>
        </el-form-item>
        <div></div>
        <el-form-item label="合同名称：">
          <el-input placeholder="名称/编号" v-model="form.key"></el-input>
        </el-form-item>

        <el-form-item label="合同类型：">
          <v-code :clearable="true" codeType="ctm_attr" @change="getType"></v-code>
        </el-form-item>
        <el-form-item label="发起人：">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>

        <div></div>
        <el-form-item label="归属部门：">
          <el-cascader :options="departCascader" :change-on-select="true" :show-all-levels="false" :props="{
                    value: 'id',
                    label: 'name',
                    children: 'children'
                  }" v-model="depId">
          </el-cascader>
        </el-form-item>
        <el-form-item label="合同金额：">
          <el-input placeholder="最小金额" v-model="form.startAmount"></el-input>
          <el-input style="margin-left: 10px" placeholder="最大金额" v-model="form.endAmount"></el-input>
        </el-form-item>

        <div></div>
        <!-- <el-form-item label="归属部门：">
          <el-select @change="changeDapartTop" v-model="depart.departmantTop" placeholder="请选择一级部门" style="width:160px">
            <el-option v-for="(item, index) in depart.top" :key="index" clearable :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select @change="changeDapartMiddle" v-model="depart.departmantMiddle" placeholder="请选择二级部门" style="width:160px">
            <el-option v-for="(item, index) in depart.middle" :key="index" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-select @change="changeDapartBottom" v-model="depart.departmantBottom" placeholder="请选择三级部门" style="width:160px">
            <el-option v-for="(item, index) in depart.bottom" :key="index" :label="item.name" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item> -->

      </el-form>
      <div class="search-box">
        <button type="button" @click="getList" class="search-btn btn btn-green">查询</button>
      </div>
    </v-panel>
    <v-panel title="合同列表">
      <div slot="button">
        <button v-for="(item, index) in button" :key="index" type="button" @click="submitBtn(item.url)" class="btn btn-space" style="margin-top:2px;">{{item.name}}</button>
        <button style="margin-left: 10px;" @click="downTemplate" type="button" class="btn btn-space">下载模板</button>
      </div>
      <div id="tableList"></div>
    </v-panel>
    <v-approve ref="approve"></v-approve>
    <v-template ref="tempate"></v-template>
  </div>
</template>

<script>
import Approve from './approve'
import Template from './template'
export default {
  name: 'contracManage',
  components: {
    'v-approve': Approve,
    'v-template': Template,
  },
  data() {
    return {
      tabChoose: [
        {
          name: '已通过',
          value: 2,
        },
        {
          name: '审批中',
          value: 1,
        },
        {
          name: '已驳回',
          value: 3,
        },
      ],
      button: [],
      departCascader: [], // 部门树
      depId: [],
      form: {
        status: 2, //审批状态
        key: '', //合同名称编号
        userName: '',
        ctmAttr: '', //合同类型
        startAmount: '', //合同金额小
        endAmount: '', //合同金额大
        depId: [], //部门id
      },
    }
  },
  created() {
    this.getDepartment()
    this.getList()
  },
  mounted() {
    this.getButton(data => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].url == 'startVerify' || data[i].url == 'export') {
          this.button.push(data[i])
        }
      }
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
    getType(obj) {
      //获取合同类型
      this.form.ctmAttr = obj.value
    },
    getList() {
      //获取合同列表
      this.form.depId = this.depId[this.depId.length - 1] || 1
      let params = this.form
      let $this = this
      this.tableList({
        columns: [
          {
            name: '合同编号',
            value: 'ctmCode',
            width: 240,
          },
          {
            name: '合同名称',
            value: 'ctmName',
            align: 'left',
            minWidth: 250,
          },
          {
            name: '合同金额(元)',
            align: 'right',
            width: 150,
            render(row) {
              return row.amount ? row.amount.addComma() : '-'
            },
          },
          {
            name: '发起人',
            value: 'userName',
            width: 80
          },
          {
            name: '归属部门',
            align: 'left',
            width: 240,
            render(row) {
              return $this.reverseDepart(row.depName)
            },
          },
          {
            name: '合同类型',
            value: 'ctmAttr',
            align: 'left',
            minWidth: 250,
          },
          {
            name: '创建日期',
            align: 'left',
            render(row) {
              return new Date(row.updateTime).toStr()
            },
            minWidth: 180,
          },
          {
            name: '操作',
            width: 100,
            fixed: 'right',
            operator(row) {
              return [
                {
                  name: '详情',
                  click(row) {
                    window.open($this.appRoot + '/work/detail?type=4&detail=0&id=' + row.processId + '', '_blank')
                    // $this.$router.push({
                    //   path: '/work/detail',
                    //   query: {
                    //     type: 4,
                    //     id: row.processId,
                    //     detail: 0
                    //   }
                    // });
                  },
                },
              ]
            },
          },
        ],
        url: '/ctm/contract/list',
        data: Utils.filterObjectNull(params),
      })
    },
    getChoose(value) {
      this.form.status = value
      this.getList()
    },
    submitBtn(url) {
      let $this = this
      if (url == 'export') {
        //导出数据
        this.confirmTips({
          title: '确定导出?',
          customClass: '',
          content: '确定要导出数据吗？',
          submit() {
            let object = $this.form
            const params = $this.getParams(object)
            $this.downFile('/ctm/contract/export' + params)
          },
        })
      } else if (url == 'startVerify') {
        //发起审批
        this.$refs.approve.openModal()
      }
    },
    downTemplate() {
      //下载模板
      this.$refs.tempate.openModal()
    },
  },
}
</script>
