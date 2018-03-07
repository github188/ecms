//加班
<template>
  <div>
    <el-form label-width="100px" label-position="right">
      <el-form-item label="申请人：">
        <span> {{details.userName}} </span>
      </el-form-item>

      <el-form-item label="开始时间：">
        <span> {{details.startTime | getTime}}</span>
      </el-form-item>
      <el-form-item label="结束时间：">
        <span> {{details.endTime | getTime}} </span>
      </el-form-item>
      <el-form-item label="时长：">
        <span> {{details.timeLength}}天 </span>
      </el-form-item>
      <el-form-item label="加班理由：">
        <span class="word-break" v-html="details.reason"></span>
      </el-form-item>
      <el-form-item label="附件：" v-if="details.files && details.files.length>0">
        <a style="cursor:pointer" class="block" href="javascript:;" title="下载附件" @click="downFile('/news/attachment/'+ item.fileId +'/download', item.fileName)" :key="index" v-for="(item, index) in details.files">
          <i class="el-icon-document"></i>&nbsp;&nbsp;{{item.fileName}}</a>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'overTime',
  props: ['details'],
  filters: {
    getTime(time) {
      if (time) {
        return new Date(time).toStr().slice(0, 16)
      }
    },
  },
}
</script>
