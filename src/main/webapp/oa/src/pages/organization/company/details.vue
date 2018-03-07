<template>
  <el-dialog :lock-scroll="false" title="深圳前海亿车科技" :visible.sync="modal" size="tiny" id="companyDetails">
    <el-form ref="form" label-width="120px" label-position="right" v-loading="loading">
      <span class="title">基础信息</span>
      <hr>
      <el-row>
        <el-col :span="12">
          <el-form label-width="120px" label-position="right">
            <el-form-item label="公司编号：">
              <!-- <span style="word-wrap: break-word;">{{details.name}}</span> -->
            </el-form-item>
            <el-form-item label="上级公司：">
              <!-- <span>{{details.sonComName}}</span> -->
            </el-form-item>
            <el-form-item label="办公地址：">
              <!-- <span>{{details.leaderName}}</span> -->
            </el-form-item>
            <el-form-item label="公司电话：">
              <!-- <span>{{details.forecastIncome && details.forecastIncome.addComma() + '（元）' || '-'}} </span> -->
            </el-form-item>

          </el-form>
        </el-col>
        <el-col :span="12">
          <el-form label-width="120px" label-position="right">
            <el-form-item label="公司名称：">
              <!-- <span>{{details.code}}</span> -->
            </el-form-item>
            <el-form-item label="负责人：">
              <!-- <span>{{reverseDepart(details.depName)}}</span> -->
            </el-form-item>
            <el-form-item label="成立日期：">
              <!-- <span>{{details.projectTypeName}}</span> -->
            </el-form-item>
            <el-form-item label="管理员账号：">
              <!-- <span>{{details.estimatedCost && details.estimatedCost.addComma() + ' （元）' || '-'}}</span> -->
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="24">
         
          <el-form-item label="备注：">
            <!-- <span style="word-break: break-all;">{{details.profile}}</span> -->
          </el-form-item>
        </el-col>
      </el-row>


      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="modal = false">关 闭</el-button>
      </span>
    </el-form>
  </el-dialog>
</template>
<style lang="scss">
#companyDetails {
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
  name: 'companyDetails',
  data() {
    return {
      modal: false,
      loading: false,
    }
  },
  methods: {
    openModal(row) {
      this.modal = true
      this.loading = true
      this.resetForm('form')
     
    }
  }
}
</script>

