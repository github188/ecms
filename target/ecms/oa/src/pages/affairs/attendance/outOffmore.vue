// 同时发起多条外出
<template>
  <div>
    <el-dialog title=" 外出报备单" :visible.sync="modal" size="tiny" class="tiny-type-modal" id="outoffDialog">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item v-for="(item, index) in partForm" :key="index" :name="index">
          <template slot="title">
            外出{{index+1}}
            <i title="删除" v-if="index != 0" @click="deleteAdpart(index, $event)" class="deleteAdpart el-icon-delete"></i>
          </template>

          <el-form :ref="'form'+index" :model="item" label-width="100px" label-position="right" style="width: 520px; margin:0 auto;">
            <el-form-item label="开始时间：" class="w-208" :rules="[{required: true, message: '请选择开始日期'}]" prop="startDate" style="display:inline-block">
              <el-date-picker class="w-208" v-model="item.startDate" :editable="false" @change="checkTime(index)" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="startTime" class="w-208" style="display:inline-block">
              <el-time-select class="w-208" :rules="[{trigger: 'blur', required: true, message: '请选择结束日期'}]" prop="startTime" v-model="item.startTime" @change="checkTime(index)" :editable="false" name="endTime" :picker-options="{
                      start: '09:00',
                      step: '01:00',
                      end: '18:00'
                    }" placeholder="选择时间">
              </el-time-select>
            </el-form-item>
            <div></div>
            <el-form-item label="结束时间：" ref="dasda" prop="endDate" class="w-208" style="display:inline-block" :rules="[{required: true, message: '请选择结束日期'}]">
              <el-date-picker class="w-208" :picker-options="endDateOpt" :editable="false" @change="checkTime(index)" v-model="item.endDate" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item prop="endTime" style="display:inline-block">
              <el-time-select class="w-208" :rules="[{trigger: 'blur', required: true, message: '请选择结束日期'}]" prop="endTime" v-model="item.endTime" @change="checkTime(index)" :editable="false" name="endTime" :picker-options="{
                      start: '09:00',
                      step: '01:00',
                      end: '18:00',
                      minTime: minTime(index)
                    }" placeholder="选择时间">
              </el-time-select>
            </el-form-item>
            <el-form-item label="时长(天)：" prop="timeLength" :rules="[{trigger: 'blur', required: true, message: '请输入时长!'}]">
              <el-input disabled v-model="item.timeLength"></el-input>
              <i v-if="item.timeLoading" class="el-icon-loading" style="position:absolute;right:10px;top:12px"></i>
            </el-form-item>
            <el-form-item label="外出地点：" prop="address" :rules="{trigger: 'blur', required: true, message: '请输入外出地点!'}">
              <el-input v-model="item.address"></el-input>
            </el-form-item>
            <el-form-item label="外出事由：" prop="reason" :rules="[{trigger: 'blur', required: true, message: '请输入外出事由!'}]">
              <el-input v-model="item.reason" type="textarea"></el-input>
            </el-form-item>
          </el-form>

        </el-collapse-item>
        <el-button @click="addAdpart" class="add-apart" type="info">新增</el-button>
        <!-- title="新增" @click="addAdpart" class="add-apart el-icon-plus"></i> -->
      </el-collapse>

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

<style scoped>
.error {
  color: #f00;
}

.w-208 {
  width: 208px!important;
}

.col-apart {
  height: 340px;
  border-bottom: 1px solid #eee;
  border-left: 1px solid #eee;
  position: relative;
  margin-top: 30px;
}

.add-apart {
  margin-top: 20px;
  /* font-size: 40px;
  border: 1px dashed #eee;
  cursor: pointer;
  text-align: center;
  margin: 0 auto;
  display: block;
  width: 150px;
  height: 150px;
  text-align: center;
  line-height: 150px;
  margin-top: 80px;
  color: rgba(72, 87, 106, 0.63); */
}

.col-apart:hover .deleteAdpart {
  opacity: 1;
  transition: opacity .5s ease;
}

.deleteAdpart {
  margin-right: 10px;
  font-size: 20px;
  opacity: 0;
  transition: opacity .5s ease;
  cursor: pointer;
  color: rgba(72, 87, 106, 0.63);
  float: right;
  margin-top: 10px;
}
</style>

<style>
.tiny-type-modal .el-collapse-item__wrap {
  background-color: #fff;
}

.el-collapse-item__header:hover .deleteAdpart {
  opacity: 1;
  transition: opacity .5s ease;
}

#outoffDialog .el-dialog__body {
  padding-top: 0;
}

#outoffDialog .el-dialog__header {
  border-bottom: 0;
}

#outoffDialog .el-collapse {
  border: 0
}
</style>

<script>
export default {
  name: "leaveModal",
  data() {
    return {
      endDateOpt: {
        disabledDate: (time) => {
          return time.getTime() < this.partForm[this.index].startDate;
        }
      },
      modal: false,
      minTime(index) {
        if ((this.partForm[index].startDate && this.partForm[index].startDate.getTime()) == (this.partForm[index].endDate && this.partForm[index].endDate.getTime())) { //如果是同一天
          return this.partForm[index].startTime;
        }
        return '06:00';
      },
      flag: false,
      params: [],
      index: 0,  //当前作用的表单序号
      partForm: [],   // 存储多个表单
      form: {
        timeLoading: false,  //计算时长的load icon
        aTime: '',
        bTime: '',
        startDate: undefined,
        startTime: undefined,
        endDate: undefined,
        endTime: undefined,
        address: '',
        reason: '',
        timeLength: ''
      },
      activeName: 0
    };
  },
  created() {
    this.addAdpart();
  },
  methods: {
    openModal() {
      this.modal = true;
      this.disable = false;
      this.partForm = [];
      this.addAdpart();
      this.$refs.form0 && (this.$refs.form0)[0].resetFields();
    },
    getAffairs(obj) { //获取请假类型
      this.form.type = obj.value;
      this.form.day = obj.day;
    },
    countTime(index) { //计算请假时长
      // this.index = index;
      // const {
      //   startDate,
      //   startTime,
      //   endDate,
      //   endTime
      //   } = this.partForm[index];
      // if (startDate && startTime && endDate && endTime) {
      //   let START = (startDate).toStr(true).split(' ')[0] + ' ' + startTime;
      //   let END = (endDate).toStr(true).split(' ')[0] + ' ' + endTime;
      //   this.partForm[index].aTime = new Date(START).getTime();
      //   this.partForm[index].bTime = new Date(END).getTime();
      //   this.$refs['form'+index][0].validateField('timeLength');
      // }
    },
    submit() {
      const partForm = this.partForm;
      for (let i = 0; i < partForm.length; i++) {
        this.$refs['form' + i][0].validate((valid) => {
          if (valid) {
            this.params[i] = {
              startTime: partForm[i].aTime,
              endTime: partForm[i].bTime,
              timeLength: partForm[i].timeLength,
              address: partForm[i].address,
              reason: partForm[i].reason
            };
          }
          this.flag = valid;
        });
      }
      if (this.flag) {
        this.disable = true;
        this.ajax({
          url: '/cwa/outside/start',
          type: 'post',
          data: {
            list: this.params
          },
          success(data, $this) {
            if (data.code == 'success') {
              $this.successTips();
              $this.modal = false;
              $this.partForm = [];
              $this.addAdpart();
            } else {
              $this.errorTips(data.message);
            }
          }
        });
      }
    },
    checkTime(index) {
      this.index = index;
      this.partForm[this.index].timeLength = '';
      const { startDate, startTime, endDate, endTime } = this.partForm[this.index];
      if (startDate && startTime && endDate && endTime) {
        let START = (startDate).toStr(true).split(' ')[0] + ' ' + startTime;
        let END = (endDate).toStr(true).split(' ')[0] + ' ' + endTime;
        this.partForm[index].aTime = new Date(START).getTime();
        this.partForm[index].bTime = new Date(END).getTime();
        this.partForm[this.index].timeLoading = true;
        this.ajax({
          url: '/cwa/overtime/timelong',
          data: {
            starttime: this.partForm[this.index].aTime,
            endtime: this.partForm[this.index].bTime
          },
          success(data, $this) {
            if (data.code == 'success') {
              $this.partForm[$this.index].timeLength = '' + data.content;
              $this.partForm[$this.index].timeLoading = false;
            } else {
              $this.errorTips('服务异常，时长计算失败!');
            }
          }
        });
      }
    },
    addAdpart() {
      let temp = {};
      for (let item in this.form) {
        temp[item] = this.form.item;
      }
      this.partForm.push(temp);
      this.activeName = this.partForm.length - 1;
    },
    deleteAdpart(index, event) {
      let $this = this;
      event.stopPropagation();
      this.confirmTips({
        title: '确认删除?',
        content: '确认删除该条外出申请？',
        submit() {
          $this.partForm.splice(index, 1);
          $this.activeName = $this.partForm.length - 1;
        }
      });
    }
  }
};
</script>





