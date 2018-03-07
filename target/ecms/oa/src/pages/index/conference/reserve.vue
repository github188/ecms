<template>
  <el-dialog custom-class="reserve-dialog" title="预订会议室" :visible.sync="modal" size="tiny">
    <el-form ref="form" :model="form" :rules="rules" label-width="110px" label-position="right">
      <el-form-item label="会议室：" prop="room">
        <el-select v-model="form.room" placeholder="请选择" style="width:450px;">
          <el-option v-for="item in roomList" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="会议时间：" prop="date" class="picker-choose">
        <el-date-picker class="picker-choose" v-model="form.date" type="date" :picker-options="pickerTimeOption" @change="pickerTimeHandle" placeholder="选择日期">
        </el-date-picker>
      </el-form-item>
<!--
      <el-form-item label="" prop="startTime    " class="picker-choose">
        <el-time-picker class="picker-choose"
        v-model="form.startTime"
        format="HH:mm"
        :editable="false"
        :picker-options="{
          selectableRange: startTimeRange
        }"
        popper-class="reserve-popper" placeholder="选择时间">
        </el-time-picker>
      </el-form-item> -->


      <el-form-item label="会议主题：" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="参与人：">
        <!-- <el-input v-model="form.person"></el-input> -->
        <v-person :multiple="true" style="width: 100%" @change="getPerson"></v-person>
      </el-form-item>
      <el-form-item label="开启邮件通知：">
        <el-tooltip content="注意：开启邮件通知会给会议参与人发送会议通知邮件" placement="right">
          <el-switch on-text="" off-text="" v-model="form.email"></el-switch>
        </el-tooltip>
        <!-- <span style="float:right;color:red">注意：开启邮件通知会给会议参与人发送会议通知邮件</span> -->
      </el-form-item>

      <el-select  @change="startTimeHandle" v-model="form.startTime" placeholder="请选择">
        <el-option v-for="item in startTime" :key="item.value" :label="item.label" :disabled="item.disabled" :value="item.value">
        </el-option>
      </el-select>

       <el-select v-model="form.endTime" placeholder="请选择">
        <el-option v-for="item in endTime" :key="item.value" :label="item.label" :disabled="item.disabled" :value="item.value">
        </el-option>
      </el-select>

    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button type="success" :disabled="disable" @click="submit" v-if="disable">
        <i class="el-icon-loading"></i>
      </el-button>
      <el-button type="success" :disabled="disable" @click="submit" v-else>确 定</el-button>
      <el-button type="info" @click="modal = false">取 消</el-button>
    </span>
  </el-dialog>
</template>
<style>
.reserve-dialog {
  width: 600px;
}

.reserve-popper .el-scrollbar__wrap {
  box-sizing: content-box;
}

.reserve-dialog .picker-choose {
  display: inline-block;
  width: 222px;
}
</style>

<script>
export default {
  data() {
    return {
      modal: false,
      roomList: [],//会议室列表
      startTime: [],
      endTime: [],
      form: {
        room: '',
        email: false,  //是否邮件通知
        person: '',  //会议参与人
        date: '',
        startTime: '',
        endTime: ''
      },
      rules: {
        room: [{
          required: true,
          message: '请选择会议室'
        }],
        title: [{
          required: true,
          message: '会议主题不能为空'
        }],
        date: [{
          required: true,
          message: '会议日期不能为空'
        }],
        time: [{
          required: true,
          message: '会议时间不能为空'
        }]
      },
      pickerTimeOption: {
        disabledDate(time) {
          return time.getTime() < Date.now() - 8.64e7 || time.getTime() >= Date.now() + 3600 * 1000 * 24 * 6;
        }
      }
    };
  },
  created() {
    this.roomList = [{
      value: 0,
      label: '黄河会议室'
    }, {
      value: 1,
      label: '泰山会议室'
    }, {
      value: 2,
      label: '珠峰会议室'
    }];
    this.renderTime();  //渲染时间列表

    //数据是已经被预定的（不可用）



    const dis = ['18:30:00 - 20:00:00'];   //不可用




    this.startTimeRange = ['08:00:00 - 18:30:00'];


  },
  methods: {
    openModal() {
      this.modal = true;
    },
    getPerson(obj) {
      console.log(obj);
    },
    pickerTimeHandle(value) {
      console.log(value);
      this.calcTime();
    },
    calcTime(){
      let disabled = [{
        start: '0830',
        end: '0930'
      },{
        start: '1430',
        end: '1600'
      },{
        start: '1600',
        end: '1800'
      }];

      let st = this.startTime;
      let et = this.endTime;
      let fst = this.form.startTime;
      let startTemp = null;

      //结束时间可选值 一定是小于开始时间所在时间段的结束时间的
      //如果form.start大于两点半

      for(let s = 0; s < st.length; s++){
        let sortTemp = [];
        st.splice(s, 1, {   //自动更新状态为可用
          label: st[s].label,
          value: st[s].value,
          disabled: false
        });
        et.splice(s, 1, {
          label: et[s].label,
          value: et[s].value,
          disabled: false
        });

        for(let time = 0; time < disabled.length; time++){
          if(fst > disabled[time].start && fst <= disabled[time].end){
            console.log(time);
          }

          if(st[s].value >= disabled[time].start && st[s].value < disabled[time].end){
          //设置开始时间的禁用时间段（如果开始时间的某个值大于等于禁用时间的开始时间，并且开始时间的某个值小于禁用时间的结束时间）
            st.splice(s, 1, {
              label: st[s].label,
              value: st[s].value,
              disabled: true
            });
          }else if(et[s].value <= fst){   //结束时间的可选值一定大于开始时间
            //  || et[s].value > disabled[0].start
            et.splice(s, 1, {
              label: et[s].label,
              value: et[s].value,
              disabled: true
            });
          }
        }
      }
    },
    renderTime() {
      const START_TIME = 8;  // 早上08:00
      const END_TIME = 20;  // 晚上20:00
      const STEP = 10;  //步长
      const FRE = 60 / STEP;
      const STEP_TOTAL = (END_TIME - START_TIME) * 60 / STEP;
      let index = 0; // 记录分钟是否到达60则小时+1
      for (let i = 0; i < STEP_TOTAL; i++) {
        let time_0 = START_TIME;   //小时
        let time_1 = 0;    //分钟
        index++;
        time_0 += parseInt(i / FRE);
        if (index >= FRE) {  //如果分钟数达到60则小时+1.分钟置0
          index = 0;
          time_0 += 1;
        }
        time_1 += index * STEP;

        if (time_0 <= 9) {   //加0补位
          time_0 = '0' + time_0;
        }
        if (time_1 <= 9) {
          time_1 = '0' + time_1;
        }
        let label = time_0 + ':' + time_1;
        let value = time_0 + '' + time_1;
        this.startTime.push({
          label: label,
          value: value
        });
        this.endTime.push({
          label: label,
          value: value
        });
      }
    },
    startTimeHandle(){
      this.form.endTime = '';
      this.calcTime();
    },
    submit() {

    }
  }
};
</script>
