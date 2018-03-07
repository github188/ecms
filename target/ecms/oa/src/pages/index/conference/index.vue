<template>
  <div>
    <v-header></v-header>
    <div v-if="false" class="content">
      <button @click="reduce">前一天</button>
      <ul class="week-list">
        <li v-for="(item, index) in week" :key="index">
          {{item.date}}
          <br> {{getWeekDay(item.weekDay)}}
        </li>
      </ul>
      <button @click="increase">后一天</button>

      <div class="clearfix"></div>
      <div class="reserve-room" ref="reserveRoom">
        <div class="reserve-room-list" v-for="(item, index) in roomList" :key="index">
          <div class="room-name">
            <p>{{item.name}}</p>
            <p>（{{item.size}}）</p>
          </div>
          <div class="room-time" ref="roomTime">
            <div class="rule-degree" :style="{'width': degreeWidth + 'px'}">
              <div class="rule-time-num">
                <span class="rule-time-1">08:00</span>
                <span class="rule-time-2">12:00</span>
                <span class="rule-time-3">16:00</span>
                <span class="rule-time-4">20:00</span>
              </div>
              <el-slider :show-tooltip="false" disabled class="rule-standard" show-stops range :max="range.degree" v-model="range.value">
              </el-slider>

              <el-tooltip placement="bottom" effect="light" v-for="(disable, index) in item.disable" :key="index">
                <div class="room-list-disable" :style="{'width':disable.width + 'px', 'left':disable.left + 'px'}">
                </div>
                <div slot="content">
                  <p>时间段：{{disable.start}} - {{disable.end}}</p>
                  <p>预约人：周周周 | 研发中心</p>
                  <p>电话：131-8989-8989</p>
                  <p>议题：部门内部沟通</p>
                </div>
              </el-tooltip>

              <div class="room-list-enable" v-if="time.width" v-for="(time, index) in item.enable" :key="index" :style="{'width':time.width + 'px', 'left':time.left + 'px'}">
                <el-tooltip placement="bottom">
                  <div slot="content">
                    时间段： {{time | getRangeTime(rangeArr).start}} - {{time | getRangeTime(rangeArr).end}}
                    <br /> 状态：可预约
                    <br />
                    <el-button type="success" @click="reserve(index, item.name)">立即预约</el-button>
                  </div>
                  <el-slider :show-tooltip="false" show-stops range :step="0.1" v-model="rangeArr[index]" :max="time.degree">
                  </el-slider>
                </el-tooltip>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button @click="cancel">取消预约</button>
    </div>
    <reserve ref="reserve"></reserve>


  <el-row style="margin-top: 100px;">
      <el-col :span="8">
        <el-card class="box-card" style="height: 300px">
            <div slot="header" class="clearfix">
              <span style="line-height: 36px; font-size: 20px;">考勤结果验证</span>
            </div>
          <el-form label-width="110px" label-position="right">
            
            <el-form-item label="姓名：">
              <el-input style="width: 250px" v-model="name" type="text"></el-input>
            </el-form-item>

            <el-form-item label="时间：">
              <el-date-picker style="width: 250px" v-model="date" type="date" placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-form>
          <el-button style="margin-left:50px;" type="success" @click="submit">确 定</el-button>
      </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card"  style="height: 300px">
            <div slot="header" class="clearfix">
              <span style="line-height: 36px; font-size: 20px;">考勤确认</span>
            </div>
          <el-form label-width="110px" label-position="right">
            <el-form-item label="选择月份：">
              <el-date-picker @change="chooseMonth" v-model="month" format="yyyy-MM" type="month" placeholder="选择月">
              </el-date-picker>
            </el-form-item>
          </el-form>
          <el-button style="margin-left:50px;"  type="success" @click="submit2">确 定</el-button>
        </el-card>
      </el-col>
      <el-col :span="8"><div class="grid-content bg-purple"></div></el-col>
  </el-row>
    
  </div>
</template>
<style>
.rule-standard .el-slider__button-wrapper {
  display: none;
}

.rule-standard .el-slider__button {
  cursor: default;
}

.room-list-enable .el-slider__bar {
  height: 50px;
  background: #01cd78;
}

.rule-degree .el-slider__runway {
  height: 10px;
}

.room-list-enable .el-slider__button {
  background: none;
  cursor: col-resize;
  height: 80px;
}

.room-list-enable .el-slider__runway {
  top: -20px;
}

.reserve-cancel-confirm {
  width: 450px;
}
</style>

<style scoped>
.content {
  max-width: 1440px;
  margin: 0 auto;
  margin-top: 96px;
  padding: 0 24px;
}

.week-list li {
  float: left;
  width: 100px;
  text-align: center;
}

.reserve-room {
  border: 1px solid #000;
  border-bottom: 0;
}

.reserve-room-list {
  border-bottom: 1px solid #000;
}

.rule-degree {
  margin: 0 auto;
  position: relative;
}

.room-name {
  width: 150px;
  float: left;
  height: 100px;
  text-align: center;
}

.room-time {
  height: 100px;
  margin-right: 100px;
  margin-left: 150px;
  border-left: 1px solid #000;
  border-right: 1px solid #000;
  padding-top: 20px;
}

.room-list-enable {
  height: 45px;
  overflow: hidden;
  border-left: 1px solid #000;
  border-right: 1px solid #000;
  position: absolute;
  top: 20px;
}

.room-list-disable {
  height: 45px;
  position: absolute;
  top: 20px;
  background: #b8b8b8;
}

.room-time-bg {
  height: 60px;
  width: 80%;
  margin: 0 auto;
  background: #000;
}

.room-do {
  float: right;
  width: 100px;
  height: 100px;
  margin-top: -100px;
}

.rule-time-num span {
  position: absolute;
  margin-left: -16px;
}

.rule-time-1 {
  left: 0;
}

.rule-time-2 {
  left: 33.3%;
}

.rule-time-3 {
  left: 66.6%;
}

.rule-time-4 {
  left: 100%;
}
</style>
<script>
import header from "../header";
import reserve from "./reserve";
let rangeTime = []; //当前的开始时间和结束时间;
export default {
  name: "conference",
  components: {
    "v-header": header,
    reserve: reserve
  },
  data() {
    return {
      date: {
        timestamp: new Date(new Date().toDay()).getTime(), //今天的时间戳
        daystamp: 24 * 60 * 60 * 1000 //一天的时间毫秒数
      },
      rangeArr: [], //所有的刻度集合
      degreeWidth: 0, //刻度尺的宽度
      range: {
        value: [72, 72],
        degree: 72
      },
      week: [], //顶部的预约时间
      roomList: [], //会议室的数据
      name: "",
      date: "",
      month: ""
    };
  },
  created() {
    this.initWeek();
  },
  mounted() {
    this.initRoom();
  },
  methods: {
    initRoom() {
      this.degreeWidth = this.$refs.reserveRoom.offsetWidth - 300;
      const SCALE = this.degreeWidth / 720;
      let disable = [
        ["09:00", "10:00"],
        ["12:10", "12:40"],
        ["14:00", "20:00"]
      ]; //已经被预约的时间段
      let enable = []; //可用的时间段
      let enableList = [];
      let disableList = [];
      if (disable.length == 0) {
        enable[0] = ["08:00", "20:00"];
      } else {
        for (let i = 0; i < disable.length; i++) {
          if (i == 0) {
            enable[0] = ["08:00", disable[0][0]];
          } else {
            enable[i] = [disable[i - 1][1], disable[i][0]];
          }
        }
        enable[disable.length] = [disable[disable.length - 1][1], "20:00"];
      }
      let getMinutes = (start, end, call) => {
        let [startMinutes, endMinutes] = [
          new Date("1970-01-01 " + start).getTime(),
          new Date("1970-01-01 " + end).getTime()
        ];
        let minutes = (endMinutes - startMinutes) / (1000 * 60); // 起始时间的总分钟数, 即总刻度
        let left =
          (startMinutes - new Date("1970-01-01 08:00:00").getTime()) /
          (1000 * 60);
        let degree = minutes / 10;
        return {
          startMinutes,
          endMinutes,
          minutes,
          left,
          degree
        };
      };
      for (let i = 0; i < enable.length; i++) {
        //可预约
        let { startMinutes, endMinutes, minutes, left, degree } = getMinutes(
          enable[i][0],
          enable[i][1]
        );
        enableList.push({
          startTime: startMinutes, //开始时间的毫秒数
          degree, // 总共划分的刻度, 一刻度代表10分钟
          width: minutes * SCALE, //div的宽度,也就是拖动条的像素宽度, 目前是 1刻度=10px(应该要通过总长计算比例)
          left: left * SCALE, //div距离坐标初始刻度的left值,开始时间减去08:00 * 10
          index: i
        });
        this.rangeArr.push([0, minutes]);
      }
      for (let i = 0; i < disable.length; i++) {
        //不可预约
        let [start, end] = [disable[i][0], disable[i][1]];
        let { minutes, left } = getMinutes(start, end);
        disableList.push({
          width: minutes * SCALE,
          left: left * SCALE,
          start, //被预约的开始时间
          end //被预约的结束时间
        });
      }
      this.roomList.push({
        name: "黄河会议室",
        size: "中",
        enable: enableList,
        disable: disableList
      });
    },
    initWeek() {
      //初始化当前日期
      const { timestamp, daystamp } = this.date;
      for (let i = 0; i < 7; i++) {
        let tempDay = new Date(timestamp + daystamp * i);
        this.week.push({
          date: tempDay.toDay(),
          weekDay: tempDay.getDay(),
          timestamp: timestamp + daystamp * i
        });
      }
    },
    reduce() {
      //前一天
      const { timestamp, daystamp } = this.date;
      const currentTs = this.week[0].timestamp;
      const lastTs = currentTs - daystamp; //得到前一天的时间戳
      let tempDay = new Date(lastTs);
      this.week.unshift({
        date: tempDay.toDay(),
        weekDay: tempDay.getDay(),
        timestamp: lastTs
      });
      this.week.pop();
    },
    increase() {
      //后一天
      const { timestamp, daystamp } = this.date;
      const currentTs = this.week[this.week.length - 1].timestamp;
      const nextTs = currentTs + daystamp; //得到后一天的时间戳
      // console.log(new Date(nextTs), new Date(timestamp+daystamp*7));
      if (nextTs >= timestamp + daystamp * 7) {
        //最多只能提前一周预约
        return;
      }
      let tempDay = new Date(nextTs);
      this.week.push({
        date: tempDay.toDay(),
        weekDay: tempDay.getDay(),
        timestamp: nextTs
      });
      this.week.shift();
    },
    getWeekDay(index) {
      const week = ["日", "一", "二", "三", "四", "五", "六"];
      return "星期" + week[index];
    },
    reserve(index) {
      console.log(rangeTime[index]);
      this.$refs.reserve.openModal();
    },
    cancel() {
      const $this = this;
      this.confirmTips({
        title: "确认信息",
        content: "取消预约后就不能在改时间段内使用秦岭会议室，确认取消预约？",
        customClass: "reserve-cancel-confirm",
        submit() {
          $this.successTips("成功取消预约!");
        }
      });
    },
    submit() {
      this.ajax({
        url: "/cwa/attendance/useratt/update",
        data: {
          name: this.name,
          date: this.date.toStr().split(" ")[0]
        },
        success(data) {
          alert("操作成功！");
        }
      });
    },
    chooseMonth(val) {
      this.month = val;
    },
    submit2() {
      if (!this.month) {
        alert("请选择月份");
        return;
      }
      this.ajax({
        url: "/cwa/attendance/userconfrim/update",
        data: {
          month: this.month
        },
        success(data) {
          alert("操作成功！");
        }
      });
    }
  },
  filters: {
    getRangeTime(time, range) {
      //格式化刻度数为时间
      let [startRange, endRange] = [range[time.index][0], range[time.index][1]];
      function caclTime(t) {
        let date = new Date(t * 10 * 60 * 1000 + time.startTime).toStr();
        let timeSplit = date.split(" ")[1];
        let times = timeSplit.split(":")[0] + ":" + timeSplit.split(":")[1];
        return times;
      }
      rangeTime[time.index] = {
        start: caclTime(startRange),
        end: caclTime(endRange)
      };
      return rangeTime[time.index];
    }
  }
};
</script>
