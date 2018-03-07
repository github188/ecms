<template>
  <div class="operation box">
    <el-carousel trigger="click" :autoplay="true" arrow="never" height="360px">
      <ul>
        <el-carousel-item v-for="n in (Math.ceil(fastEntry.length/6))" :key="n">
          <li @click="fastEntryHandle(item.icon)" v-for="(item, index) in fastEntry" :key="index" v-if="index <= 6 && n == 1">
            <a href="javascript:;">
              <div :class="'operation-' + item.icon"></div>
              <span>{{item.name}}</span>
            </a>
          </li>

          <li @click="fastEntryHandle(item.icon)" v-for="(item, index) in fastEntry" :key="index" v-if="index > 6 && n == 2">
            <a href="javascript:;">
              <div :class="'operation-' + item.icon"></div>
              <span>{{item.name}}</span>
            </a>
          </li>
        </el-carousel-item>
      </ul>
    </el-carousel>
    <overTime ref="overTime"></overTime>
    <awayOfficial ref="awayOfficial"></awayOfficial>
    <outOff ref="outOff"></outOff>
    <leave ref="leave"></leave>
    <contract ref="contract"></contract>
    <financeAdd ref="financeAdd"></financeAdd>
  </div>
</template>
<style scoped>
.operation {
  height: 390px;
  padding: 15px 45px 20px 45px;
}

.operation ul {
  padding-left: 0;
  /* height: 348px; */
  /* overflow: hidden; */
}

.operation ul li {
  float: left;
  list-style: none;
  height: 96px;
  width: 80px;
  margin-top: 20px;
}

.operation ul li span {
  text-align: center;
  display: block;
  width: 65px;
  font-size: 16px;
  color: #3e3e3e;
}

.operation ul li div {
  display: block;
  height: 36px;
  width: 36px;
  background-image: url('./../img/icon.png');
  border-radius: 100%;
  margin-bottom: 14px;
  margin-left: 16px;
  transition: all 0.3s ease;
  transform: scale();
}

.operation ul li div:hover {
  transform: scale(1.2);
  transition: all 0.3s ease;
}

.operation-leave {
  background-position: -25px -75px;
}

.operation-extra {
  background-position: -86px -75px;
}

.operation-out {
  background-position: -147px -75px;
}

.operation-expense {
  background-position: -209px -75px;
}

.operation-client {
  background-position: -270px -75px;
}

.operation-business {
  background-position: -330px -75px;
}

.operation-approval {
  background-position: -452px -75px;
}

.operation-need {
  background-position: -513px -75px;
}

.operation-contract {
  background-position: -574px -75px;
}

.operation-conference {
  background-position: -635px -75px;
}

.operation-egress {
  background-position: -696px -75px;
}

.operation ul li:nth-child(even) {
  margin-left: 24px;
}

.operation ul li:nth-child(even) a {
  float: right;
}

.operation .slide-toggle {
  position: relative;
  top: -35px;
}
</style>

<script>
import overTime from '@/pages/affairs/attendance/overtime'
import awayOfficial from '@/pages/affairs/attendance/awayOfficial'
import outOff from '@/pages/affairs/attendance/outOff'
import leave from '@/pages/affairs/attendance/leave'
import contract from '@/pages/contract/manage/approve'
import financeAdd from '@/pages/finance/project/manage/entering'
export default {
  name: 'fastEntry',
  components: {
    overTime,
    awayOfficial,
    outOff,
    leave,
    contract,
    financeAdd
  },
  data() {
    return {
      fastEntry: [], // 快捷登陆入口
    }
  },
  created() {
    this.getFastEntry()
  },
  methods: {
    getFastEntry() {
      let temp = []
      let baseEntry = [
        // {
        //   url: 'pmo_add_project',
        //   name: "立项",
        //   icon: 'approval'
        // },
        {
          url: 'overTime',
          name: '加班',
          icon: 'extra',
        },
        {
          url: 'awayOfficial',
          name: '出差',
          icon: 'egress',
        },
        {
          url: 'askForLeave',
          name: '请假',
          icon: 'leave',
        },
        {
          url: 'outOff',
          name: '外出',
          icon: 'out',
        },
        {
          url: 'startVerify',
          name: '发起合同',
          icon: 'contract',
        },
        {
          url: 'financeAdd',
          name: '立项',
          icon: 'approval',
        },
        //  {
        //   url: 'pmo_add_demand',
        //   name: "提需求",
        //   icon: 'need'
        // },
        // {
        //   url: 'crm_add_client',
        //   name: "录客户",
        //   icon: 'client'
        // },
        // {
        //   url: 'crm_add_opportunity',
        //   name: "录商机",
        //   icon: 'business'
        // }
      ]
      this.ajax({
        url: '/authority/resource/user/resources',
        success(data, $this) {
          if (data.code == 'success') {
            const { content } = data
            for (let i = 0; i < content.length; i++) {
              for (let j = 0; j < baseEntry.length; j++) {
                if (baseEntry[j].url == content[i].url && content[i].status == 0) {
                  temp.push({
                    index: j,
                    name: baseEntry[j].name,
                    icon: baseEntry[j].icon,
                  })
                }
              }
            }
          }
          $this.fastEntry = temp.sort((a, b) => a.index > b.index)
        },
      })
    },
    fastEntryHandle(url) {
      if (url == 'extra') {
        //加班
        this.$refs.overTime.openModal()
      }
      if (url == 'egress') {
        //出差
        this.$refs.awayOfficial.openModal()
      }
      if (url == 'leave') {
        //请假
        this.$refs.leave.openModal()
      }
      if (url == 'out') {
        //外出
        this.$refs.outOff.openModal()
      }
      if (url == 'contract') {
        //发起合同
        this.$refs.contract.openModal()
      }
      if (url == 'conference') {
        this.$router.push('/conference')
      }
      if (url == 'approval') {
        this.$refs.financeAdd.openModal()
      }
    },
  }
}
</script>
