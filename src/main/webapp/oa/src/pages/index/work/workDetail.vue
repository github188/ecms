<template>
  <div id="workDetail">
    <div class="content-box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/work/list' }">我的工作台</el-breadcrumb-item>
        <el-breadcrumb-item>详情</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="order-detail">
        <articleApprove v-if="type==6" :userInfo="userInfo" :details="details"></articleApprove>
        <attendanceConfirm v-if="type==11" :userInfo="userInfo" :details="details"></attendanceConfirm>
        <template v-if="mod.header">
          <h2 class="order-title">{{title}}</h2>
          <div class="order-box order-detail-header">
            <img class="user-avatar" :src="getAvatar(this.userInfo, {normal:false, width: 160, height:160})">
            <div class="user-info">
              <span class="user-name">{{userInfo.realname}}</span>
              <p class="user-section">{{userInfo.depName}}</p>
            </div>
            <span class="order-time">{{ details.addTime && new Date(details.addTime).toStr()}}</span>
          </div>
        </template>

        <template v-if="mod.body">
          <unusual v-if="type == 7 || type == 9" :details="details">
          </unusual>
          <template v-else>
            <div class="order-box order-detail-container">
              <askForLeave v-if="type == 1" :details="details"></askForLeave>
              <overTime v-if="type == 2" :details="details"></overTime>
              <outOff v-if="type == 3" :details="details"></outOff>
              <contract v-if="type == 4" :details="details"></contract>
              <beOut v-if="type == 5 || type == 10" :details="details.list?details.list:[details]"></beOut>
            </div>
          </template>
        </template>

        <div class="approve-input" v-if="mod.input">
          <el-input type="textarea" v-model="message" :autosize="{ minRows: 3, maxRows: 10}" :placeholder="placeholder">
          </el-input>
          <el-upload accept="image/jpeg,image/png,image/jpg" id="approveImg" list-type="picture-card" :before-upload="uploadBefore" :on-success="uploadSuccess" :on-remove="uploadRemove" :action="domain+action">
            <a href="javascript:;" class="upload-img" title="上传图片"></a>
          </el-upload>
        </div>

        <template v-if="mod.btn && btnList">
          <div class="approve-btn">
            <div style="position: relative;top: 30px; left: -120px;" v-if="btnList.ceoApprove">
              <label for=""> CEO审批：</label>
              <el-switch on-text="是" off-text="否" v-model="ceoApprove"></el-switch>
            </div>
            <el-button v-if="btnList.agree_6" style="margin-top: 30px" :loading="disable" @click="approveAgree" class="operate-btn" type="success">允许发布</el-button>
            <el-button v-if="btnList.edit_6" style="margin-top: 30px" @click="articleEdit" class="operate-btn" type="info">修改</el-button>
            <el-button v-if="btnList.rebut_6" style="margin-top: 30px" @click="approveRebut" class="operate-btn" type="info">不予发布</el-button>
            <el-button v-if="btnList.agree" @click="approveAgree" :loading="disable" class="operate-btn" type="success">同意</el-button>
            <el-button v-if="btnList.rebut" @click="approveRebut" class="operate-btn" type="info">驳回</el-button>
            <el-button v-if="btnList.restart" @click="approveRestart" class="operate-btn" type="success">重新发起审批</el-button>
            <el-button v-if="btnList.end" @click="approveEnd" class="operate-btn" type="info">结束流程</el-button>
            <!-- <el-button v-if="btnList.revoke" @click="recallApprove" class="operate-btn" type="info">撤销</el-button> -->
            <el-button v-if="btnList.noHandle" @click="noHandle" :loading="disable" class="operate-btn" type="info">不处理</el-button>
            <el-button style="margin-right: 8px;" v-if="btnList.reClock" @click="reClock" class="operate-btn" type="info">补签打卡</el-button>

            <template v-if="type==11">
              <el-button v-if="btnList.attendanceSure" @click="attendanceSure" :loading="disable" class="confirm-btn" type="info">确认考勤</el-button>
              <p style="height:90px; line-height:90px; color: #23d183" v-else>
                <i class="el-icon-circle-check" style="padding-right: 5px"></i>考勤已确认</p>
            </template>

            <el-dropdown v-if="btnList.reAttendance" @command="reAttendance">
              <el-button type="info">
                补考勤单
                <i class="el-icon-caret-bottom el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item :command="1">请假</el-dropdown-item>
                <el-dropdown-item :command="3">出差</el-dropdown-item>
                <el-dropdown-item :command="10">外出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </template>

        <template v-if="type==11 && !btnList">
          <p style="text-align:center; height:90px; line-height:90px; color: #23d183">
            <i class="el-icon-circle-check" style="padding-right: 5px"></i>考勤已确认</p>
        </template>

        <template v-if="mod.record">
          <div class="approve-box">
            <div class="approve-record">审批记录</div>
            <div v-if="details.status == 4 || details.status == 3" id="approveResult" class="approve-result approve-result-refuse"></div>
            <div v-if="details.status == 2" id="approveResult" class="approve-result approve-result-agree"></div>
            <ul class="approve-record-list" id="processLine">
              <li class="approve-record-ing" v-if="doingList.length>0">
                <template>
                  <p class="approve-name">{{doingList[0].nodeName}}
                    <span class="approve-time">{{doingList[0].updateTime && new Date(doingList[0].updateTime).toStr()}}</span>
                  </p>
                  <p class="approve-process">
                    <span v-for="(item, index) in doingList" :key="index">{{item.handlerName}}
                      <template v-if="index<doingList.length-1">、
                      </template>
                    </span>
                    ：
                    <span class="deal-status">处理中</span>
                  </p>
                </template>
              </li>

              <li class="approve-record-end" v-for="(item, index) in doneList" :key="index">
                <template v-if="type==7">
                  <!-- 系统发起异常 -->
                  <p class="approve-name">{{item.nodeName}}
                    <span class="approve-time">{{item.updateTime && new Date(item.updateTime).toStr()}}</span>
                  </p>
                  <p class="approve-process">{{item.handlerName}}：
                    <!-- <span class="deal-status">{{['驳回', '同意','重新发起审批', '结束流程'][item.result]}}</span> -->
                    <span v-if="item.nodeId == 'cwaExp_2'" class="deal-status">{{['不处理', '补请假单','重新发起审批', '补出差单', '','','','','补签打卡','','补外出单'][item.result]}}
                      <span v-if="item.result == 0" v-show="false">{{details.status = 0}}</span>
                    </span>
                    <span v-else class="deal-status">{{['驳回', '同意','重新发起审批', '结束流程'][item.result]}}</span>
                  </p>
                  <div class="approve-reason" v-html="item.opinion"></div>
                </template>

                <template v-else>
                  <p class="approve-name">
                    {{item.nodeName}}
                    <span class="approve-time">{{item.updateTime && new Date(item.updateTime).toStr()}}</span>
                  </p>
                  <p class="approve-process">{{item.handlerName}}：
                    <span class="deal-status">{{['驳回', '同意','重新发起审批', '结束流程'][item.result]}}</span>
                  </p>
                  <div class="approve-reason" v-html="item.opinion"></div>
                </template>
              </li>

              <li class="approve-record-end" v-if="type ==7 ">
                <p class="approve-name">考勤结果判定
                  <span class="approve-time">{{details.addTime && new Date(details.addTime).toStr()}}</span>
                </p>
                <p class="approve-process">EAP考勤系统： {{details.date}} {{dealExpName(details.expName)}}</p>
              </li>

              <li class="approve-record-end" v-else>
                <p class="approve-name">发起申请
                  <span class="approve-time">{{details.addTime && new Date(details.addTime).toStr()}}</span>
                </p>
                <p class="approve-process">{{details.salesmanName || details.userName}}</p>
              </li>
            </ul>

          </div>
        </template>
      </div>
    </div>
    <askForLeaveApprove ref="askForLeaveApprove" @reStart="approveAction"></askForLeaveApprove>
    <overTimeApprove ref="overTimeApprove" @reStart="approveAction"></overTimeApprove>
    <outOffApprove ref="outOffApprove" @reStart="approveAction"></outOffApprove>
    <contractApprove ref="contractApprove" @reStart="approveAction"></contractApprove>
    <beOutApprove ref="beOutApprove" @reStart="approveAction"></beOutApprove>
    <reClockApprove ref="reClockApprove" @reStart="approveAction"></reClockApprove>
    <el-dialog v-model="approveImgModal" size="small">
      <img width="100%" :src="approveImgUrl" alt="">
    </el-dialog>
  </div>
</template>

<style lang="scss">
#workDetail {
  .order-detail-container .el-form-item {
    margin-bottom: 5px;
  }
  .order-detail-container .el-icon-document {
    color: #97a8be;
    font-size: 18px;
  }
  #approveImg .el-upload--picture-card {
    float: left;
    box-sizing: border-box;
    width: 34px;
    height: 30px;
    border: none;
    border-radius: 6px;
    background-color: #fbfdff;
    cursor: pointer;
  }
  #approveImg .el-upload-list--picture-card .el-upload-list__item {
    margin-top: 20px;
    margin-left: 20px;
  }
  #approveImg .el-upload--picture-card .upload-img {
    float: left;
  }
  .approve-reason img {
    display: inline-block;
    margin: 10px;
    margin-left: 0;
    width: 100px;
    height: 100px;
    cursor: pointer;
  }
  .approve-article {
    margin: 0 auto;
    padding-top: 50px;
    width: 960px;
    border-top: 1px solid #eee;
    /* margin-left: 100px;
       margin-right: 370px; */
  }
  .order-detail {
    padding: 15px;
    background: #fff;
    font-size: 14px;
    min-height: calc(100vh - 152px);
  }
  .order-title {
    overflow: hidden;
    margin: 0;
    padding: 0;
    height: 82px;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-weight: normal;
    font-size: 27px;
    line-height: 82px;
  }
  .order-box {
    margin-bottom: 24px;
    border: 1px solid #e6e9eb;
    background: #f9f9f9;
  }
  .order-detail-header {
    padding: 22px 30px;
    height: 126px;
  }
  .user-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .user-info {
    position: relative;
    top: -30px;
    display: inline-block;
    margin-left: 25px;
    height: 80px;
  }
  .user-section {
    position: relative;
    top: 8px;
    color: #888a95;
    font-size: 14px;
  }
  .order-time {
    float: right;
    color: #888a95;
    font-size: 12px;
  }
  .user-name {
    color: #2f313a;
    font-size: 20px;
  }
  .order-detail-container {
    padding: 10px 30px;
  }
  .approve-box {
    position: relative;
    clear: both;
    padding: 20px;
    background: #fff;
    font-size: 14px;
  }
  .approve-result {
    position: absolute;
    top: 25px;
    right: 0;
    width: 92px;
    height: 72px;
    background-color: #fff;
    background-position: center;
    background-repeat: no-repeat;
  }
  .approve-record {
    clear: both;
    height: 54px;
    border-bottom: 1px solid #e6e9eb;
    color: #2f313a;
    font-size: 16px;
    line-height: 54px;
  }
  .approve-result-agree {
    background-image: url('./img/success.png');
  }
  .approve-result-refuse {
    background-image: url('./img/refuse.png');
  }
  .approve-record-list {
    margin-top: 30px;
    margin-bottom: 100px;
    border-left: 1px dashed #e6e9eb;
  }
  .approve-record-list p {
    margin-bottom: 5px;
  }
  .approve-record-list li {
    padding: 20px 50px;
    padding-bottom: 0;
  }
  .approve-record-list li:before {
    position: relative;
    top: 16px;
    display: block;
    margin-left: -56px;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    content: '';
  }
  .approve-reason {
    color: #888a95;
    word-wrap: break-word;
    word-break: break-all;
    font-size: 12px;
  }
  .approve-time {
    padding-left: 16px;
    color: #888a95;
    font-size: 12px;
  }
  .approve-record-ing .approve-name {
    color: #fc5f45;
  }
  .approve-record-end .approve-name {
    color: #38c695;
  }
  .approve-record-ing:before {
    background: #fc5f45;
  }
  .approve-record-end:before {
    background: #38c695;
  }
  .deal-status {
    color: #888a95;
  }
  .approve-btn {
    text-align: right;
  }
  .operate-btn {
    margin-top: 50px;
    width: 120px;
    height: 32px;
  }
  .upload-img {
    display: inline-block;
    margin-top: 26px;
    width: 34px;
    height: 30px;
    background: url('./img/photo-icon.png');
  }
  .word-break {
    word-break: break-all;
  }
  .confirm-btn {
    display: block;
    height: 42px;
    line-height: 42px;
    width: 170px;
    color: #fff;
    padding: 0;
    background: #01cd78;
    margin: 30px auto;
  }
}
</style>

<script>
import contract from './components/contract' //合同
import contractApprove from './components/contractApprove'
import askForLeave from './components/askForLeave' //请假
import askForLeaveApprove from './components/askForLeaveApprove'
import overTime from './components/overTime' //加班
import overTimeApprove from './components/overTimeApprove'
import outOff from './components/outOff' //出差
import outOffApprove from './components/outOffApprove'
import beOut from './components/beOut' //外出
import beOutApprove from './components/beOutApprove' //外出
import articleApprove from '@/pages/index/article/approve' //文章审核
import unusual from './components/unusual' //考勤异常
import reClockApprove from './components/reClock' //补签打卡
import attendanceConfirm from './components/attendance' //考勤确认
export default {
  name: 'workDetail',
  data() {
    return {
      mod: {
        //功能块
        header: true,
        body: true,
        btn: false,
        input: false,
        record: true,
      },
      placeholder: '请输入审核意见',
      count: 0, //图片数量限制为4
      message: null, //审核意见
      approveImg: [], //审核上传的图片
      ceoApprove: false, //是否需要ceo会审
      action: '/news/picture/content/upload',
      details: {},
      userInfo: {},
      doingList: [],
      doneList: [],
      file: [],
      title: '',
      btnList: null, //流程处理的按钮
      type: '', //工单类型   [1-请假, 2-加班，3-出差, 4-合同, 5-旧外出, 6-文章, 7-系统考勤异常, 9-主动发起考勤异常, 10-新外出, 11-考勤确认]
      id: '', //流程id
      approveImgModal: false,
      approveImgUrl: '',
      userId: '',
    }
  },
  components: {
    contract,
    contractApprove,
    askForLeave,
    askForLeaveApprove,
    overTime,
    overTimeApprove,
    outOff,
    outOffApprove,
    beOut,
    beOutApprove,
    articleApprove,
    unusual,
    reClockApprove,
    attendanceConfirm
  },
  created() {
    this.getProcessInfo()
    this.getBtn()
  },
  mounted() {
    this.sideHeight = window.innerHeight - 160
  },
  methods: {
    dealExpName(name) {
      if (!name) {
        return
      }
      return name.split('#')[0]
    },
    getBtn() {
      //获取审批按钮
      this.ajax({
        url: '/sys/process/todo/btn',
        data: {
          id: this.id,
        },
        success(data, $this) {
          if (data.code == 'success') {
            let content = data.content
            if (content.length > 0) {
              $this.btnList = {
                agree: false, //同意
                rebut: false, //驳回
                ceoApprove: false, //是否ceo审批
                restart: false, //重新发起审批
                end: false, //结束流程
                revoke: false, //撤销流程
                agree_6: false, //允许发布文章
                rebut_6: false, //不允许发布文章
                edit_6: false, //修改文章
                noHandle: false, //考勤不作处理
                reClock: false, //补签打卡
                reAttendance: false, //补考勤单
                attendanceSure: false, //是否确认考勤
              }
              $this.mod.btn = true
              for (let i = 0; i < content.length; i++) {
                if (content[i] == 'contractAgree' || content[i] == 'contractRebut') {
                  if ($this.type == 6) {
                    //文章类型
                    $this.btnList.agree_6 = true
                    $this.btnList.rebut_6 = true
                    $this.btnList.edit_6 = true
                  } else {
                    $this.btnList.agree = true
                    $this.btnList.rebut = true
                  }
                  $this.mod.input = true
                } else if (content[i] == 'contractRestart' || content[i] == 'contractEnd') {
                  $this.btnList.restart = true //重新发起审批
                  $this.btnList.end = true //结束流程
                } else if (content[i] == 'ceoApprove') {
                  //ceo审批
                  $this.mod.input = true
                  $this.btnList.ceoApprove = true
                } else if (content[i] == 'noHandle' || content[i] == 'reClock') {
                  $this.btnList.noHandle = true
                  $this.btnList.reClock = true
                  // $this.mod.input = true
                } else if (content[i] == 'reAttendance') {
                  $this.btnList.reAttendance = true
                } else if (content[i] == 'attendanceSure') {
                  $this.btnList.attendanceSure = true
                }
              }
            } else {
              $this.btnList = null
              $this.mod.input = false
            }
          }
        },
      })
    },
    // xiongyalin1213
    uploadBefore(file) {
      if (this.count >= 4) {
        this.errorTips('图片不能超过4张!')
        return false
      }
    },
    uploadSuccess(response, file, fileList) {
      this.count++
      this.approveImg = []
      for (let i = 0; i < fileList.length; i++) {
        this.approveImg.push(fileList[i].response.content.picId)
      }
    },
    uploadRemove(file, fileList) {
      this.count--
      this.approveImg = []
      for (let i = 0; i < fileList.length; i++) {
        this.approveImg.push(fileList[i].response.content.picId)
      }
    },
    getProcessInfo() {
      //获取流程信息
      let workParams = JSON.parse(unescape(Utils.getValue('workParams')));
      let query = this.$route.query
      if (query.id) {
        var { id, type } = query
      } else if (workParams.id) {
        var { id, type } = workParams
      }
      this.type = type
      this.id = id
      // this.isContractDetail = query.detail
      this.userId = Utils.getValue('u')
      if (this.type == 6 || this.type == 11) {
        this.mod.header = false
        this.mod.body = false
      }
      if (this.type == 11) {
        this.mod.record = false
      }
      this.ajax({
        url: '/sys/process/details',
        data: {
          processId: this.id,
          type: this.type,
        },
        success(data, $this) {
          if (data.message == 'success') {
            let content = data.content
            $this.details = content.detailsObject //详情
            $this.details.file = content.list //附件
            $this.userInfo = content.user //发起人信息
            $this.doingList = content.doingList //处理中的流程
            $this.doneList = content.doneList //已处理的流程
            $this.title = content.title //合同标题
          }
        },
        error($this) {
          $this.errorTips('查询失败!')
        },
      })
    },
    approveAgree() {
      //同意
      this.disable = true
      this.approveAction(1)
    },
    approveRebut() {
      //驳回
      if (!this.message) {
        this.errorTips('审核意见不能为空!')
        return false
      }
      this.approveAction(0)
    },
    approveRestart() {
      //重新发起审批
      if (this.type == 1) {
        this.$refs.askForLeaveApprove.openModal(this.details)
      }
      if (this.type == 2) {
        this.$refs.overTimeApprove.openModal(this.details)
      }
      if (this.type == 3) {
        this.$refs.outOffApprove.openModal(this.details)
      }
      if (this.type == 4) {
        this.$refs.contractApprove.openModal(this.details)
      }
      if (this.type == 10) {
        this.$refs.beOutApprove.openModal(this.details)
      }
      if (this.type == 6) {
        this.$router.push({
          path: '/article/edit',
          query: {
            type: this.type,
            id: this.id,
            restart: 1,
            isd: 1,
          },
        })
      }
    },
    articleEdit() {
      this.$router.push({
        path: '/article/edit',
        query: {
          type: this.type,
          id: this.id,
          approve: 1,
        },
      })
    },
    approveEnd() {
      //结束流程
      this.approveAction(3)
    },
    recallApprove() {
      //撤销申请
      this.ajax({
        url: '/sys/process/portal/revoke',
        data: {
          processId: this.id,
        },
        success(data, $this) {
          if (data.code == 'success') {
            $this.getProcessInfo() //重新获取审批流程
            $this.getBtn() //重新获取按钮
            $this.successTips('撤销成功!')
          } else {
            $this.errorTips(data.message)
          }
        },
      })
    },
    approveAction(type, process, callback) {
      //正常流程下：type[0-驳回，1-同意，2-重新发起审批， 3-结束流程]
      //考勤异常的情况下：type[1-请假, 3-出差，10-外出], 有process的时候
      let url = ''
      let img = this.approveImg
      let imgUrl = ''
      let params = {
        processId: this.id,
        result: type,
        flag: this.ceoApprove ? 1 : 0,
      }
      if (process) {
        params.process = process
      }
      for (let i = 0; i < img.length; i++) {
        //拼接图像和审核意见
        imgUrl += `<img class="approve-thumb-img" src="${this.domain}/news/picture/content/${img[i]}/download">`
      }
      if (imgUrl) {
        params.opinion = `<p>${this.message || ''}</p><div>${imgUrl}</div>`
      } else {
        params.opinion = this.message
      }
      if (this.type == 4) {
        //合同处理
        url = '/ctm/contract/exmine'
      } else if (this.type == 1) {
        //请假
        url = '/cwa/leave/submit'
      } else if (this.type == 2) {
        //加班
        url = '/cwa/overtime/submit'
      } else if (this.type == 3) {
        //出差
        url = '/cwa/travel/submit'
      } else if (this.type == 6) {
        //文章
        url = '/news/process/exmine'
      } else if (this.type == 7) {
        //系统考勤异常单
        url = '/cwa/exception/submit'
      } else if (this.type == 9) {
        //主动发起异常
        url = '/cwa/correct/submit'
      } else if (this.type == 10) {
        //外出发起异常
        url = '/cwa/outside/submit'
      } else if (this.type == 11) {
        //确定考勤
        url = '/cwa/confirm/submit'
      }

      this.ajax({
        url: url,
        type: 'post',
        data: params,
        success(data, $this) {
          $this.disable = false
          if (process) {
            switch (type) {
              case 1:
                $this.$refs.askForLeaveApprove.closeModal()
                break
              case 3:
                $this.$refs.outOffApprove.closeModal()
                break
              case 8:
                $this.$refs.reClockApprove.closeModal()
                break
              case 10:
                $this.$refs.beOutApprove.closeModal()
                break
            }
          }
          if (data.code == 'success') {
            $this.successTips()
            $this.getProcessInfo() //重新获取审批流程
            $this.getBtn() //重新获取按钮
            callback && callback(true)
          } else {
            $this.errorTips(data.message)
          }
        },
      })
    },
    noHandle() {
      //异常考勤不处理
      let $this = this
      this.placeholder = '请输入不处理的原因'
      this.mod.input = true
      if (!this.message) {
        this.errorTips('请输入原因!')
        return false
      }
      let content = '';
      if(this.details.expType == 3){ //加班异常
        content = '选择不处理该考勤异常，考勤结果将以实际打卡时间为准，确认不处理？'
      }else{
        content = `选择不处理该考勤异常，当天考勤结果将记录为 '${this.details.expName.split('#')[0]}' ，确认不处理？`
      }
      this.confirmTips({
        title: '操作确认',
        content,
        submit() {
          $this.disable = true
          $this.approveAction(0)
        },
      })
    },
    reClock() {
      //补签打卡
      this.$refs.reClockApprove.openModal(this.details)
    },
    reAttendance(command) {
      //补考勤单
      let details = {
        data: this.details,
        reAttendance: true,
      }
      if (command == 1) {
        //请假
        this.$refs.askForLeaveApprove.openModal(details)
      }
      if (command == 3) {
        //出差
        this.$refs.outOffApprove.openModal(details)
      }
      if (command == 10) {
        //外出
        this.$refs.beOutApprove.openModal(details)
      }
    },
    attendanceSure() { //确认考勤
      let $this = this;
      this.confirmTips({
        title: '信息确认',
        content: '确认考勤说明您对本月考勤结果无任何异议，是否继续？',
        submit() {
          $this.disable = true
          $this.approveAction(1)
        }
      })
    }
  },
  mounted() {
    let $this = this
    $('.order-detail').on('click', '.approve-thumb-img', function () {
      $this.approveImgModal = true
      $this.approveImgUrl = $(this).attr('src')
    })
  },
  beforeRouteEnter(to, from, next) {
    if (Object.keys(to.params).length != 0) { //带有params参数
      window.localStorage.setItem('workParams', escape(JSON.stringify(to.params)))
    }
    next()
  },
}
</script>

