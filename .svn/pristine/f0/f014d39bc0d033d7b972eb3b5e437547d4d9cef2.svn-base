//外出
<template>
  <div>
    <el-form class="form" label-width="130px" label-position="right" v-for="(item, index) in details" :key="index">
      <el-button v-if="details.length>1" class="small-tag" size="small">外出{{index+1}}</el-button>
      <el-form-item label="开始时间：">
        <span> {{item.startTime | getTime}}</span>
      </el-form-item>
      <el-form-item label="结束时间：">
        <span>{{item.endTime | getTime}}</span>
      </el-form-item>
      <el-form-item label="外出时长：">
        <span> {{item.timeLength}}天 </span>
      </el-form-item>
      <el-form-item label="外出地点：">
        <span> {{item.address}} </span>
      </el-form-item>
      <el-form-item label="外出事由：">
        <span class="word-break" v-html="item.reason"></span>
      </el-form-item>
      <hr v-if="details.length>1">
      <el-form-item label="附件：" v-if="item.files && item.files.length>0">
        <a style="cursor:pointer" class="block" href="javascript:;" title="下载附件" @click="downFile('/news/attachment/'+ list.fileId +'/download', list.fileName)" :key="index" v-for="(list, index) in item.files">
          <i class="el-icon-document"></i>&nbsp;&nbsp;{{list.fileName}}</a>
      </el-form-item>
    </el-form>
    <!-- <p class="remark">注：该外出单无需审批，已同步到个人考勤记录。</p> -->
  </div>
</template>
<style scoped>
.form {
  position: relative;
}
.small-tag {
  position: absolute;
  top: 10px;
  right: 0;
}
.remark {
  /* position: absolute; */
  bottom: 30px;
}
</style>

<script>
export default {
  name: 'outOff',
  props: ['details'],
  filters: {
    getTime(time) {
      if (time) {
        return new Date(time).toStr().slice(0, 16)
      }
    },
  },
  mounted() {
    $('.order-detail').css('min-height', window.innerHeight - 160)
  },
}
</script>
