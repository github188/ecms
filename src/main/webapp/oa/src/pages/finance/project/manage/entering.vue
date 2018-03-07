<template>
  <div>
    <el-dialog :before-close="closeDialog" :title="add?'新增项目':'编辑项目'" :visible.sync="modal" size="tiny" id="financeEnteringModal">
      <el-form ref="form" :model="form" :rules="rules" :inline="true" label-width="100px" label-position="right" v-loading="loading">

        <el-form-item label="项目名称：" prop="name">
          <el-input @blur="validateName" placeholder="请输入项目名称" v-model.trim="form.name" style="width: 645px;"></el-input>
        </el-form-item>
        <div></div>

        <el-form-item label="立项日期：" prop="createDate">
          <el-date-picker :editable="false" v-model="form.createDate" @change="getCreateDate" type="date" placeholder="请选择日期">
          </el-date-picker>
        </el-form-item>
        <div></div>

        <el-form-item label="项目负责人：" prop="leaderName">
          <el-input disabled v-model="form.leaderName"></el-input>
        </el-form-item>

        <el-form-item label="所属部门：" prop="depId">
          <el-input disabled v-model="form.depName"></el-input>
        </el-form-item>

        <el-form-item label="所属公司：" prop="sonCom">
          <el-select placeholder="请选择所属公司" v-model="form.sonCom">
            <el-option v-for="(item) in companyList" :key="item.id" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="项目类别：" prop="projectType">
          <el-select placeholder="请选择项目类别" v-model="form.projectType">
            <el-option v-for="(item) in categoryList" :key="item.id" :label="item.name" :value="item.value"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="预估收入：" prop="forecastIncome">
          <el-tooltip placement="top">
            <span style="font-size:14px;" slot="content">{{form.forecastIncome | amount}}</span>
            <el-input placeholder="请输入预估收入" type="number" step="0.01" v-model.number="form.forecastIncome">
              <el-button slot="append">元</el-button>
            </el-input>
          </el-tooltip>
        </el-form-item>

        <el-form-item label="预估成本：" prop="estimatedCost">
          <el-tooltip placement="top">
            <span style="font-size:14px;" slot="content">{{form.estimatedCost | amount}}</span>
            <el-input placeholder="请输入预估成本" type="number" step="0.01" v-model.number="form.estimatedCost">
              <el-button slot="append">元</el-button>
            </el-input>
          </el-tooltip>
        </el-form-item>
        <div></div>

        <el-form-item label="项目成员：" prop="userList">
          <el-select class="person-select" v-model="form.userList" @change="removeTag" filterable multiple clearable placeholder="请输入关键字">
            <el-option v-for="item in personList" :key="item.id" :disabled="item.id == form.leaderId" :label="item.realname" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <!-- <el-form-item label="项目成员：" prop="userList">
          <div class="finance-person el-input__inner">
            <span class="el-tag el-tag--primary">
              <span class="el-select__tags-text">熊小军</span>
              <i class="el-tag__close el-icon-close"></i>
            </span>
            <span class="el-tag el-tag--primary">
              <span class="el-select__tags-text">熊小军</span>
              <i class="el-tag__close el-icon-close"></i>
            </span>
            <span class="el-tag el-tag--primary">
              <span class="el-select__tags-text">熊小军</span>
              <i class="el-tag__close el-icon-close"></i>
            </span>
            <span class="el-tag el-tag--primary">
              <span class="el-select__tags-text">熊小军</span>
              <i class="el-tag__close el-icon-close"></i>
            </span>
            <span class="el-tag el-tag--primary">
              <span class="el-select__tags-text">熊小军</span>
              <i class="el-tag__close el-icon-close"></i>
            </span>
            <span class="el-tag el-tag--primary">
              <span class="el-select__tags-text">熊小军</span>
              <i class="el-tag__close el-icon-close"></i>
            </span>
            <span class="el-tag el-tag--primary">
              <span class="el-select__tags-text">熊小军</span>
              <i class="el-tag__close el-icon-close"></i>
            </span>
            <span class="el-tag el-tag--primary">
              <span class="el-select__tags-text">熊小军</span>
              <i class="el-tag__close el-icon-close"></i>
            </span>
            <span class="el-tag el-tag--primary">
              <span class="el-select__tags-text">熊小军</span>
              <i class="el-tag__close el-icon-close"></i>
            </span>
            <span class="el-tag el-tag--primary">
              <span class="el-select__tags-text">熊小军</span>
              <i class="el-tag__close el-icon-close"></i>
            </span>

          </div>
          <div class="organize-person el-select-dropdown">
            <el-tree node-key="id" ref="tree" :default-expanded-keys="['1']" accordion highlight-current :expand-on-click-node="true" :data="departList" :props="{label: 'name',children: 'children'}">
            </el-tree>
          </div>
        </el-form-item> -->

        <div></div>
        <el-form-item label="项目简介：" prop="profile">
          <el-input :autosize="{ minRows: 4, maxRows: 30}" style="width: 645px;" type="textarea" placeholder="请对项目做简要说明" v-model.trim="form.profile"></el-input>
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
  </div>
</template>
<style lang="scss">
#financeEnteringModal {
  .el-dialog {
    width: 800px;
  }

  .el-input {
    width: 265px;
  }
  .person-select {
    width: 645px;
    .el-input {
      width: 645px;
    }
  }
  .person-select .el-tag:first-child .el-icon-close {
    display: none;
  }
  // .finance-person {
  //   position: relative;
  //   width: 650px;
  //   height: auto;
  //   padding: 3px 0;
  //   .el-tag {
  //     height: 24px;
  //     line-height: 24px;
  //     box-sizing: border-box;
  //     margin: 3px 0 3px 6px;
  //   }
  // }
  // .organize-person {
  //   width: 100%;
  //   height: 200px;
  //   overflow-y: scroll;
  // }
}
</style>

<script>
let flag = true
export default {
  name: 'entering',
  data() {
    let amountReg = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/;
    return {
      modal: false,
      loading: false,
      personList: [],
      categoryList: [],
      companyList: [],
      // departList: [],
      add: true, //是否新增模式，反之编辑模式
      id: '',
      form: {
        name: '',
        createDate: '',
        depId: Utils.getValue('depId'),
        depName: unescape(Utils.getValue('depName')),
        leaderName: unescape(Utils.getValue('realname')),
        leaderId: Utils.getValue('u'),
        sonCom: '',
        profile: '',
        projectType: '',
        userList: [Utils.getValue('u')]
      },
      rules: {
        name: [{
          required: true,
          message: '项目名称不能为空!'
        }, {
          max: 50,
          message: '项目名称不能超过50个字符!'
        }],
        createDate: [{
          required: true,
          message: '立项日期不能为空!'
        }],
        sonCom: [{
          required: true,
          message: '所属公司不能为空!'
        }],
        depId: [{
          required: true,
          message: '请选择所属部门!'
        }],
        projectType: [{
          required: true,
          message: '请选择项目类别!'
        }],
        forecastIncome: [{
          pattern: amountReg,
          message: "请输入正确的金额!"
        }],
        estimatedCost: [{
          pattern: amountReg,
          message: "请输入正确的金额!"
        }],
        profile: [{
          required: true,
          message: '请输入项目简介!'
        }, {
          max: 1000,
          message: '不能超过1000字!'
        }]
      }
    }
  },
  created() {
    this.getPersonList();
    // this.getDepartment();
  },
  mounted() {
    this.$nextTick(() => {

    })
  },
  filters: {
    amount(value) {
      if (value) {
        return Number(value).addComma();
      }
    }
  },
  methods: {
    openModal(row) {
      this.resetForm('form')
      this.modal = true
      if (row) {
        this.id = row.id
        this.add = false
        this.loading = true
        this.getDetails(row)
      } else {
        this.add = true
      }
      this.getCompany()
      this.getCategoryList()
    },
    closeDialog(done) {
      done()
      $('.nicescroll-rails').css('visibility', 'visible');
    },
    removeTag(item) {
      let userId = Utils.getValue('u')
      if (!item.includes(userId)) {
        this.form.userList.unshift(userId)
      }
    },
    validateName(id) {
      let params = {
        name: this.form.name
      }
      if (!this.add) {
        params.id = this.id
      }
      this.command("sys", "Project", "validateProjectName", params).then((result) => {
        if (!result.content) {
          flag = false
          this.errorTips('项目名称已存在!')
        } else {
          flag = true
        }

      })
    },
    getCompany() { //获取子公司
      this.command("sys", "SonCom", "listSonCompany").then((result) => {
        this.companyList = result.data
      })
    },
    getCategoryList() {  //获取项目类别
      this.ajax({
        url: '/ctm/setting/param/list',
        data: {
          code: 'project_type'
        },
        success(data, $this) {
          if (data.code == 'success') {
            $this.categoryList = data.content
          }
        }
      });
    },
    getDetails(row) {
      this.command('sys', 'Project', 'getProjectDetails', { id: row.id }).then((result) => {
        let { name, createDate, sonCom, projectType, estimatedCost, forecastIncome, profile, userList, leaderName, leaderId } = result
        let form = this.form;
        form.name = name
        form.createDate = createDate
        form.sonCom = sonCom
        form.estimatedCost = estimatedCost
        form.forecastIncome = forecastIncome
        form.projectType = projectType.toString()
        form.profile = profile
        form.userList = userList
        form.leaderName = leaderName
        form.leaderId = leaderId
        this.loading = false
      })
    },
    getPersonList() {  //获取成员列表
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
    getCreateDate(val) {
      this.form.createDate = val
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (!flag) {
            this.errorTips('项目名称已存在!')
            return;
          }
          this.disable = true
          let { leaderId } = this.form.leaderId
          let userId = Utils.getValue('u')
          let arg = ['sys', 'Project'];
          let params = Object.assign({}, this.form)
          if (!params.userList.includes(userId)) {
            params.userList.push(userId)
          }
          params.userList = params.userList.join(',')
          if (this.add) {
            arg[2] = 'addProject'
          } else {
            arg[2] = 'updateProject'
            params.id = this.id
          }
          params.createDate = new Date(params.createDate).toDay()
          this.command(...arg, params).then((res) => {
            this.successTips('操作成功!')
            this.disable = false
            this.modal = false
            this.$emit('getList')
          }).catch((res) => {
            this.disable = false
            this.errorTips(res.message)
          })
        }
      })
    },
  }
}
</script>
