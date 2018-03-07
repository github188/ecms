<template>
  <div id="integraManage">
    <v-panel>
      <el-form ref="formInline" :model="form" label-width="90px" :inline="true">
        <el-form-item label="部门：">
          <el-cascader style="width: 140px" :options="departCascader" :change-on-select="true" :show-all-levels="false" :props="{
                    value: 'id',
                    label: 'name',
                    children: 'children'
                  }" v-model="form.depId">
          </el-cascader>
        </el-form-item>

        <el-form-item label="姓名：">
          <el-input style="width: 140px;" placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="年份：">
          <el-date-picker style="width: 140px;" v-model="form.year" align="right" type="year" placeholder="选择年">
          </el-date-picker>
        </el-form-item>

        <el-form-item label="月份：">
          <el-date-picker style="width: 140px;" v-model="form.month" type="month" placeholder="选择月" format="MM" popper-class="integra-month">
          </el-date-picker>
        </el-form-item>

      </el-form>
      <div class="search-box">
        <button type="button" @click="getList" class="search-btn btn btn-green" style="margin-top:4px; margin-left: 10px;">查询</button>
      </div>
    </v-panel>

    <v-panel title="积分列表">
      <div slot="button">
        <el-button type="info" v-show="checkList.length>0" @click="allotIntegral(1)">批量分配积分</el-button>
        <el-button type="info" @click="exportIntegral">导出</el-button>
      </div>
      <div id="integraTable"></div>
    </v-panel>
    <operator ref="operator" @getList="getList" title="分配积分" />
  </div>
</template>
<style lang="scss">
.integra-month {
  .el-date-picker__header {
    display: none;
  }
}
</style>

<script>
import operator from "./operate";
export default {
  name: "integralList",
  components: {
    operator
  },
  data() {
    return {
      form: {
        depId: [],
        name: "",
        year: "",
        month: "",
        date: ''
      },
      checkList: [],
      departCascader: [] // 部门树
    };
  },
  created() {
    this.getDepartment();
    this.getList();
  },
  methods: {
    getDepartment() {
      // 获取部门树
      this.ajax({
        url: "/authority/dep/tree/list",
        success(data, $this) {
          if (data.code == "success") {
            $this.departCascader = $this.delTree(data.content);
          }
        }
      });
    },
    getParams(){
      let params = JSON.parse(JSON.stringify(this.form));
      let depId = params.depId;
      let month = '';
      let year = params.year && new Date(params.year).getFullYear();
      if(params.month){
          month = new Date(params.month).getMonth() + 1;
          month = month>9?month:'0'+month
      }
      params.date = year +  (month && '-' + month)
      params.depId = depId[depId.length - 1] || 1
      let data = Utils.filterObjectNull(params);
      return data
    },
    getList() {
      let $this = this;
      let data = this.getParams()
      this.tableList({
        command: ["user", "UserScore", "listUserScoreAccout"],
        element: "#integraTable",
        data,
        checkbox: {
          change(list) {
            $this.checkList = [];
            for (let id in list) {
              $this.checkList.push(id);
            }
          }
        },
        columns: [
          {
            name: "工号",
            width: 100,
            value: "usercode"
          },
          {
            name: "姓名",
            width: 120,
            value: "realname"
          },
          {
            name: "部门",
            value: "depname",
            align: "left",
            render(row){
              return $this.reverseDepart(row.depname)
            }
          },
          {
            name: "积分数值",
            value: "total",
            width: 120
          },
          {
            name: "操作",
            width: 160,
            operator(row) {
              return [
                {
                  name: "查看",
                  href: `${$this.appRoot}/integral/manage?id=${row.id}&details=${row.id}&date=${data.date || ''}&type=1`,
                  click(row) {}
                },
                {
                  name: "分配",
                  click(row) {
                    $this.allotIntegral(row.id);
                  }
                }
              ];
            }
          }
        ]
      });
    },
    allotIntegral(value) {
      let userId = [];
      if (value == 1) {
        //批量分配积分
        userId = this.checkList;
      }else{
        userId = [value];
      }
      this.$refs.operator.openModal(userId.join(','));
    },
    exportIntegral(){
      var a = this.confirmTips({
        title: "确认信息",
        content: "确定要导出吗？",
        customClass: "down-confirm",
        submit(e) {},
        beforeClose() {
           setTimeout(() => {
                $(".down-link")
                .attr("href", 'javascript:;');
            }, 1500);
        }
      });
      setTimeout(() => {
        this.command('user', 'UserScore', 'exportUserScoreList',  this.getParams(),{ down: true, type: "get" })
        if ($(".down-link").length != 0) {
          $(".down-link").attr("href", downloadLink);
        } else {
          $(".down-confirm")
            .find(".el-button--primary")
            .wrap(`<a class="el-button down-link" href="${downloadLink}"></a>`);
        }
      }, 500);
    }
  }
};
</script>

