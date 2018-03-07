//请假
<template>
  <div>
    <el-form label-width="100px" label-position="right">
      <el-form-item label="请假人：">
        <span> {{details.userName}} </span>
      </el-form-item>
      <el-form-item label="请假类型：">
        <span> {{affairsName}} </span>
      </el-form-item>
      <el-form-item label="开始时间：">
        <span>{{details.startTime | getTime}}</span>
      </el-form-item>
      <el-form-item label="结束时间：">
        <span> {{details.endTime | getTime}}</span>
      </el-form-item>
      <el-form-item label="工作代理人：" v-if="details.agentName">
        <span> {{details.agentName}} </span>
      </el-form-item>
      <el-form-item label="时长：">
        <span> {{details.timeLength}}天 </span>
      </el-form-item>
      <el-form-item label="请假理由：">
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
  name: 'contract',
  props: ['details'],
  data() {
    return {
      affairsName: '',
    }
  },
  mounted() {
    this.getAffairsType()
  },
  updated() {
    this.getAffairsType()
  },
  filters: {
    getTime(time) {
      if (time) {
        return new Date(time).toStr(true).slice(0, 16)
      }
    },
  },
  methods: {
    getAffairsType() {
      this.ajax({
        url: '/ctm/setting/param/list',
        data: {
          code: 'cwa_leave_type',
        },
        success(data, $this) {
          if (data.code == 'success') {
            const { content } = data
            for (let i = 0; i < content.length; i++) {
              if (content[i].value == $this.details.type) {
                $this.affairsName = content[i].name
              }
            }
          }
        },
      })
    },
  },
}
</script>
