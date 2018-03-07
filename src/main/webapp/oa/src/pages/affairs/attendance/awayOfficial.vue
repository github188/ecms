// 出差
<template>
  <div>
    <el-dialog title="
                出差申请" :visible.sync="modal" size="tiny" id="awayOfficalModal">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px" label-position="right">
        <c-calcTime ref="calcTime" @caclTime="caclTime" :attr="{
          url: '/cwa/travel/timelong',
          rule:1,
          type: 3
        }"></c-calcTime>

        <el-form-item label="出发地点：" prop="startAddress">
          <el-input v-model="form.startAddress"></el-input>
        </el-form-item>
        <el-form-item label="目的地点：" prop="endAddress">
          <el-input v-model="form.endAddress"></el-input>
        </el-form-item>
        <el-form-item label="出差说明：" prop="remark">
          <el-input v-model="form.remark" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="附件：">
          <c-upload ref="upload" @getFileList="getFileList" :fileList="form.files"></c-upload>
        </el-form-item>
        <el-form-item label="机票服务：" prop="reason">
          <el-radio class="radio" v-model="form.isNeedplane" label="0">不需要</el-radio>
          <el-radio class="radio" v-model="form.isNeedplane" label="1">需要</el-radio>
        </el-form-item>

        <el-form-item label="" prop="planeRemark" v-if="form.isNeedplane == '1'">
          <el-input v-model="form.planeRemark" type="textarea" placeholder="请详细描述定机票起止地点及日期"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" :disabled="disable" @click="submit" v-if="disable">
          <i class="el-icon-loading"></i>
        </el-button>
        <el-button type="success" :disabled="disable" @click="submit" v-else>确 定</el-button>
        <el-button type="info" @click="modal = false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<style lang="scss">
#awayOfficalModal {
  .error {
    color: #f00;
  }
  .w-207 {
    width: 207px !important;
  }
  .el-dialog {
    width: 560px;
  }
}
</style>

<script>
export default {
  name: 'awayOffical',
  data() {
    return {
      modal: false,
      form: {
        startAddress: '', //出发地
        endAddress: '', //目的地
        remark: '', //说明
        isNeedplane: '0', //是否需要机票服务
        planeRemark: '', //机票说明
        files: [],
      },
      rules: {
        startAddress: [
          {
            required: true,
            message: '出发地点不能为空！',
          },
        ],
        endAddress: [
          {
            required: true,
            message: '目的地点不能为空！',
          },
        ],
        planeRemark: [
          {
            required: true,
            message: '机票服务说明不能为空！',
          },
        ],
        remark: [
          {
            required: true,
            message: '出差说明不能为空！',
          },
        ],
      },
    }
  },
  methods: {
    openModal() {
      this.disable = false
      this.modal = true
      this.resetForm('form')
      if (this.$refs.calcTime) {
        this.$refs.calcTime.reset()
      }
      if (this.$refs.upload) {
        this.$refs.upload.reset()
      }
    },
    getAffairs(obj) {
      //获取请假类型
      this.form.type = obj.value
      this.form.day = obj.day
    },
    caclTime(data) {
      this.form = Object.assign(this.form, data)
    },
    getFileList(list) {
      this.form.files = list
    },
    submit() {
      let flag = false
      this.$refs.calcTime.$refs.form.validate(valid => {
        flag = valid
      })
      this.$refs.form.validate(valid => {
        if (valid && flag) {
          this.disable = true
          let { timeLength, startAddress, endAddress, isNeedplane, remark, files, startTime, endTime } = this.form
          let params = {
            userId: this.$store.state.u,
            startTime,
            endTime,
            timeLength,
            startAddress,
            endAddress,
            isNeedplane,
            remark,
            files,
          }
          if (this.form.isNeedplane) {
            params.planeRemark = this.form.planeRemark
          }
          this.ajax({
            url: '/cwa/travel/start',
            type: 'post',
            data: params,
            success(data, $this) {
              if (data.code == 'success') {
                $this.successTips()
                $this.modal = false
                $this.$refs.form.resetFields()
              } else {
                $this.errorTips(data.message)
              }
              $this.disable = false
            },
          })
        }
      })
    },
  },
}
</script>





