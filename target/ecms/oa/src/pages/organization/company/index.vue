<template>
  <div>
      <v-panel>
          <el-form ref="formInline" :model="form" label-width="90px" :inline="true">
            <el-form-item label="公司名称：">
            <el-input style="width: 140px;" placeholder="请输入公司关键字" v-model="form.name"></el-input>
            </el-form-item>
            <button type="button" @click="getList" class="search-btn btn btn-green" style="margin-top:4px; margin-left: 10px;">查询</button>
        </el-form>
      </v-panel>

      <v-panel title="公司列表">
        <div slot="button">
            <el-button type="info" @click="addCompany">新 增</el-button>
        </div>
        <div id="companyTable"></div>
    </v-panel>
    <companyDetails ref="companyDetails" />
    <companyEntering ref="companyEntering" />
  </div>
</template>

<script>
import companyDetails from './details'
import companyEntering from './company'
export default {
  name: "companyManage",
  components:{
      companyDetails,
      companyEntering
  },
  data() {
    return {
      form: {
        name: ""
      }
    };
  },
  created(){
      this.getList();
  },
  methods: {
    getList() {
      let $this = this;
      this.tableList({
        command: ["user", "UserScore", "listScoreType"],
        element: "#companyTable",
        data: {
          name: $this.form.name
        },
        columns: [
          {
            name: "公司编号",
            value: ""
          },
          {
            name: "公司名称",
            value: "",
            minWidth: 150,
            align: 'left'
          },
          {
            name: "负责人",
            value: "",
            width: 100
          },
          {
            name: "状态",
            value: "",
            width: 100
          },
          {
            name: "操作",
            operator(row) {

                let status = true?'启用':'停用';
              return [
                {
                  name: "详情",
                  click(row) {
                      $this.$refs.companyDetails.openModal(row)
                  }
                },
                {
                  name: "编辑",
                  click(row) {
                      $this.$refs.companyEntering.openModal(row)
                  }
                },
                {
                  name: status,
                  click(row) {
                      $this.statusCompany(row)
                  }
                },
                {
                  name: "删除",
                  click(row) {
                      $this.deleteCompany(row)
                  }
                }
              ];
            }
          }
        ]
      });
    },
    addCompany() {
        this.$refs.companyEntering.openModal()
    },
    statusCompany(row){//更改状态
        this.confirmTips({
            title: '确认信息',
            content: '确定要停用吗？',
            submit(){
                //todo
            }
        })
    },
    deleteCompany(row){ //删除公司
        this.confirmTips({
            title: '确认信息',
            content: '确定要删除XXX公司吗？',
            submit(){
                //todo
            }
        })
    }
  }
};
</script>
