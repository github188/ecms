<template>
  <div id="projectFinance">
    <v-panel class="search-panel">
      <el-form :model="form" label-width="85px" :inline="true">
        <el-form-item label="项目名称：">
          <el-input placeholder="请输入项目名称" v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="项目编号：">
          <el-input placeholder="请选择项目编号" v-model="form.code"></el-input>
        </el-form-item>

        <el-form-item label="项目类别：">
          <el-select placeholder="请选择项目类别" clearable v-model="form.projectType" style="width: 180px;">
            <el-option v-for="(item, index ) in categoryList" :key="index" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="所属公司：">
          <el-select placeholder="请选择所属公司" clearable v-model="form.sonCom" style="width: 180px;">
            <el-option v-for="(item, index ) in companyList" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="部门：">
          <el-cascader :options="departCascader" clearable :change-on-select="true" :show-all-levels="false" :props="{
                    value: 'id',
                    label: 'name',
                    children: 'children'
                  }" v-model="form.depId">
          </el-cascader>
        </el-form-item>

        <el-form-item label="负责人：">
          <el-input placeholder="请输入负责人" v-model="form.leaderName"></el-input>
        </el-form-item>

        <el-form-item label="状态：">
          <el-select v-model="form.isvalid" clearable placeholder="请选择状态">
            <el-option label="启用中" value="1"></el-option>
            <el-option label="已关闭" value="0"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="立项日期：">
          <el-date-picker class="time-ranger" @change="changeTime" :editable="false" :picker-options="pickerOptions" v-model="createDate" type="daterange" placeholder="选择日期范围">
          </el-date-picker>
        </el-form-item>

      </el-form>
      <div class="search-box">
        <button type="button" @click="getList" class="search-btn btn btn-green">查询</button>
      </div>
    </v-panel>
    <v-panel title="项目列表">
      <div slot="button">
        <el-button v-if="buttonList.financeAdd" @click="financeAdd" type="info">新增</el-button>
        <el-button v-if="buttonList.financeExport" @click="financeExport" type="info">导出</el-button>
      </div>
      <div id="financeList"></div>
    </v-panel>
    <entering :categoryList="categoryList" :companyList="companyList" @getList="getList" ref="entering" />
    <financeDetails ref="financeDetails" />
  </div>
</template>
<style lang="scss">
#projectFinance {
  .search-panel .el-input {
    width: 180px;
  }
  .time-ranger .el-input__inner {
    padding-right: 0;
    font-size: 13px;
    padding-left: 6px;
  }
}
.el-tooltip__popper.is-dark {
  max-width: 600px;
}
.down-link {
  padding: 12px 45px;
  color: #fff;
  &:hover {
    color: #fff;
  }
}
</style>

<script>
import entering from "./entering";
import financeDetails from "./details";
export default {
  name: "project",
  components: {
    entering,
    financeDetails
  },
  data() {
    return {
      departCascader: [], // 部门树
      categoryList: [], //项目类别
      companyList: [], //子公司
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近三个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      buttonList: {},
      operateList: {
        financeDetails: "详情",
        financeDown: "下载"
      }, //列表操作按钮
      createDate: "",
      form: {
        name: "",
        code: "",
        projectType: "",
        depId: [],
        leaderName: "",
        isvalid: "",
        createDate: "",
        createStart: "",
        createEnd: ""
      }
    };
  },
  created() {
    this.getDepartment();
    this.getList();
    this.getCategoryList();
    this.getCompany();
    this.getButton(list => {
      list.map(item => {
        Vue.set(this.buttonList, item.url, item.name);
      });
    });
  },
  methods: {
    getCompany() {
      //获取子公司
      this.command("sys", "SonCom", "listSonCompany").then(result => {
        this.companyList = result.data;
      });
    },
    getCategoryList() {
      //获取项目类别
      this.ajax({
        url: "/ctm/setting/param/list",
        data: {
          code: "project_type"
        },
        success(data, $this) {
          if (data.code == "success") {
            $this.categoryList = data.content;
          }
        }
      });
    },
    getDepartment() {
      // 获取部门树
      this.ajax({
        url: "/cwa/attendance/project/tree",
        success(data, $this) {
          if (data.code == "success") {
            $this.departCascader = $this.delTree(data.content);
          }
        }
      });
    },
    changeTime(val) {
      this.form.createDate = val;
      if (val) {
        let _val = val.split(" - ");
        this.form.createStart = _val[0];
        this.form.createEnd = _val[1];
      } else {
        this.form.createStart = "";
        this.form.createEnd = "";
      }
    },
    getList() {
      let $this = this;
      let params = Object.assign({}, this.form);
      params.depId = params.depId[params.depId.length - 1];
      this.tableList({
        element: "#financeList",
        command: ["sys", "Project", "listProjectByRole"],
        data: Utils.filterObjectNull(params),
        columns: [
          {
            name: "项目编号",
            value: "code",
            width: 150
          },
          {
            name: "项目名称",
            value: "name",
            align: "left",
            minWidth: 250
          },
          {
            name: "项目类别",
            value: "projectTypeName",
            minWidth: 100
          },
          {
            name: "所属公司",
            value: "sonComName",
            minWidth: 250
          },
          {
            name: "所属部门",
            value: "depName",
            align: "left",
            minWidth: 210,
            render(row) {
              return $this.reverseDepart(row.depName);
            }
          },
          {
            name: "负责人",
            value: "leaderName",
            width: 90
          },
          {
            name: "预估收入（元）",
            align: "left",
            width: 130,
            render(row) {
              let value = row.forecastIncome;
              return (value && value.addComma()) || "-";
            }
          },
          {
            name: "预估成本（元）",
            align: "left",
            width: 130,
            render(row) {
              let value = row.estimatedCost;
              return (value && value.addComma()) || "-";
            }
          },
          {
            name: "立项日期",
            value: "createDate",
            minWidth: 110
          },
          {
            name: "状态",
            width: 80,
            render(row) {
              return ["已关闭", "启用中"][row.isvalid];
            }
          },
          {
            name: "操作",
            width: 180,
            align: "left",
            operator(row) {
              return $this.finaceButton(row);
            }
          }
        ]
      });
    },
    details(row) {
      this.$refs.financeDetails.openModal(row);
    },
    edit(row) {
      this.$refs.entering.openModal(row);
    },
    setStatus(row) {
      let title = "启用";
      let status = 0;
      let $this = this;
      if (row.isvalid == 1) {
        title = "关闭";
        status = 0;
      } else {
        title = "启用";
        status = 1;
      }
      this.confirmTips({
        title: "确认信息",
        content: `确定要${title}吗？`,
        submit() {
          $this
            .command("sys", "Project", "closeProject", {
              id: row.id,
              isvalid: status
            })
            .then(result => {
              $this.getList();
            })
            .catch(() => {
              $this.errorTips("操作失败!");
            });
        },
        beforeClose() {
          $(".nicescroll-rails").css("visibility", "visible");
        }
      });
    },
    finaceButton(row) {
      let $this = this;
      let niceRails = $(".nicescroll-rails");
      let tempArr = [
        {
          name: "详情",
          click() {
            $this.details(row);
          }
        },
        { name: "", click() {} },
        { name: "", click() {} },
        {
          name: "下载",
          click() {
            $this.confirmTips({
              title: "确认信息",
              content: "确定要下载吗？",
              customClass: "down-confirm",
              submit(e) {
                // $this.command('sys', 'Project', 'exportProjectWord', { id: row.id }, { down: true, type: 'get' })
              },
              beforeClose() {
                $this.beforeClose();
              }
            });
            setTimeout(() => {
              $this.command(
                "sys",
                "Project",
                "exportProjectWord",
                { id: row.id },
                { down: true, type: "get" }
              );
              if ($(".down-link").length != 0) {
                $(".down-link").attr("href", downloadLink);
              } else {
                $(".down-confirm")
                  .find(".el-button--primary")
                  .wrap(
                    `<a class="el-button down-link" href="${downloadLink}"></a>`
                  );
              }
            }, 500);
          }
        }
      ];

      if (row.edit == "1") {
        tempArr[1] = {
          name: "编辑",
          click() {
            $this.edit(row);
          }
        };
        tempArr[2] = {
          name: row.isvalid == 1 ? "关闭" : "启用",
          click() {
            $this.setStatus(row);
          }
        };
      }
      // let $this = this
      // let niceRails = $('.nicescroll-rails')
      // if (row.leaderId === Utils.getValue('u')) {
      //   $this.operateList['financeEdit'] = '编辑'
      //   $this.operateList['financeStatus'] = '状态'
      // }
      // // if (Object.keys(this.buttonList).length > 0) {
      // for (let item in $this.operateList) {
      //   tempArr.push({
      //     name: (function () {
      //       if (item == 'financeStatus') {
      //         if (row.isvalid == 1) {
      //           return '关闭'
      //         } else {
      //           return '启用'
      //         }
      //       } else {
      //         return $this.operateList[item]
      //       }
      //     })(),
      //     click(row) {
      //       niceRails.css('visibility', 'hidden');
      //       if (item == 'financeDetails') { //详情
      //         $this.details(row)
      //       } else if (item == 'financeEdit') { //编辑
      //         $this.edit(row)
      //       } else if (item == 'financeStatus') { //修改状态
      //         $this.setStatus(row)
      //       } else if (item == 'financeDown') { //下载
      //         $this.confirmTips({
      //           title: '确认信息',
      //           content: '确定要下载吗？',
      //           submit() {
      //             $this.command('sys', 'Project', 'exportProjectWord', { id: row.id }, { down: true, type: 'get' })
      //           },
      //           beforeClose() {
      //             niceRails.css('visibility', 'visible');
      //           }
      //         })
      //       }
      //     }
      //   })
      // }
      return tempArr;
      // }
    },
    financeAdd() {
      this.$refs.entering.openModal();
    },
    beforeClose() {
      setTimeout(() => {
        $(".down-confirm")
          .find(".down-link")
          .attr("href", this.appRoot);
      }, 1500);
      $(".nicescroll-rails").css("visibility", "visible");
    },
    financeExport() {
      let $this = this;
      var a = this.confirmTips({
        title: "确认信息",
        content: "确定要导出吗？",
        customClass: "down-confirm",
        submit(e) {
          // let params = Object.assign({}, $this.form)
          // params.depId = params.depId[params.depId.length - 1]
        },
        beforeClose() {
          $this.beforeClose();
        }
      });
      setTimeout(() => {
        let params = Object.assign({}, $this.form);
        params.depId = params.depId[params.depId.length - 1];
        params.pageNum = "";
        params.pageIndex = "";
        params.pageSize = "";
        $this.command(
          "sys",
          "Project",
          "exportProjectListByRole",
          Utils.filterObjectNull(params),
          { down: true, type: "get" }
        );
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
