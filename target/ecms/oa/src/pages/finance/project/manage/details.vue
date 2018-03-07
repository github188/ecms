<template>
  <el-dialog :before-close="closeDialog" :lock-scroll="false" title="项目详情" :visible.sync="modal" size="tiny" id="financeDetails">
    <el-form ref="form" label-width="120px" label-position="right" v-loading="loading">
      <span class="title">基础信息</span>
      <hr>
      <el-row>
        <el-col :span="12">
          <el-form label-width="120px" label-position="right">
            <el-form-item label="项目名称：">
              <span style="word-wrap: break-word;">{{details.name}}</span>
            </el-form-item>
            <el-form-item label="所属公司：">
              <span>{{details.sonComName}}</span>
            </el-form-item>
            <el-form-item label="项目负责人：">
              <span>{{details.leaderName}}</span>
            </el-form-item>
            <el-form-item label="预估收入：">
              <span>{{details.forecastIncome && details.forecastIncome.addComma() + '（元）' || '-'}} </span>
            </el-form-item>
            <el-form-item label="立项日期：">
              <span>{{details.createDate}}</span>
            </el-form-item>

          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form label-width="120px" label-position="right">
            <el-form-item label="项目编号：">
              <span>{{details.code}}</span>
            </el-form-item>
            <el-form-item label="所属部门：">
              <span>{{reverseDepart(details.depName)}}</span>
            </el-form-item>
            <el-form-item label="项目类别：">
              <span>{{details.projectTypeName}}</span>
            </el-form-item>
            <el-form-item label="预估成本：">
              <span>{{details.estimatedCost && details.estimatedCost.addComma() + ' （元）' || '-'}}</span>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
          <el-form-item label="项目成员：">
            <span> {{details.userNameList && details.userNameList.join('、')}} </span>
          </el-form-item>
          <el-form-item label="项目简介：">
            <span style="word-break: break-all;">{{details.profile}}</span>
          </el-form-item>
        </el-col>
      </el-row>

      <span class="title">编辑记录</span>
      <hr>
      <ul class="record-list">

        <el-collapse v-model="activeModel" accordion>
          <el-collapse-item v-for="(item, index) in recordList" :key="index" :name="index">
            <template slot="title">
              {{item.userName}}&nbsp;&nbsp;&nbsp;{{renderTitle(item.remark).title}}
              <span class="time">{{new Date(item.createTime).toStr()}}</span>
            </template>
            <p class="content" v-for="(item, index) in renderTitle(item.remark).content" :key="index">{{item.replace('更新了','').replace('“','"').replace('”','"').replace(':','：')}}</p>
          </el-collapse-item>
        </el-collapse>
      </ul>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="modal = false">关 闭</el-button>
      </span>
    </el-form>
  </el-dialog>
</template>
<style lang="scss">
#financeDetails {
  .el-dialog__body {
    padding: 20px 30px;
  }
  .el-dialog {
    width: 800px;
    .el-form-item {
      margin-bottom: 10px;
    }
    .title {
      font-size: 16px;
    }
    .username {
      padding-right: 40px;
    }
    .time {
      float: right;
      padding-right: 10px;
    }
    .remark {
      overflow: hidden;
      width: 490px;
      display: inline-block;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .content {
      word-wrap: break-word;
      font-size: 14px;
    }
    .record-list li {
      height: 40px;
    }
    hr {
      margin-top: 5px;
    }
  }
}
</style>
<script>
export default {
  name: 'details',
  data() {
    return {
      modal: false,
      activeModel: '1',
      loading: false,
      recordList: [],
      details: {}
    }
  },
  methods: {
    getProjectRecord(row) {
      this.command('sys', 'Project', 'listProjectRecord', { id: row.id }).then((result) => {
        this.recordList = result.list;
      })
    },
    renderTitle(title) {
      if (title) {
        let content = title.split('&');
        let list = title.split('为 ：')
        let tag = []
        for (let i = 0; i < list.length; i++) {
          let temp = list[i].split('&');
          tag.push(temp[temp.length - 1])
        }
        tag.length = 6;
        if (title.includes('创建')) {
          tag[0] = '创建了项目'
        }
        return {
          title: tag.join(''),
          content
        }
      }
    },
    openModal(row) {
      this.modal = true
      this.loading = true
      this.resetForm('form')
      this.getProjectRecord(row);
      this.command('sys', 'Project', 'getProjectDetails', { id: row.id }).then((result) => {
        this.details = result
        this.loading = false
      }).catch(() => {
        this.errorTips('查询失败!')
        this.loading = false
      })
    },
    closeDialog(done) {
      done()
      $('.nicescroll-rails').css('visibility', 'visible');
    },
  }
}
</script>

