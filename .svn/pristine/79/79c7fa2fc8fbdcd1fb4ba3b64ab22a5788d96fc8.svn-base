// 文件上传组件
<template>
  <el-upload :before-upload="beforeFileUpload" :headers="{authorization: authorization}" ref="upload" :action="url" :on-success="successFile" :on-remove="removeFile" :file-list="list">
    <el-button size="small" type="primary">点击上传</el-button>
  </el-upload>
</template>

<script>
export default {
  name: 'upload',
  data() {
    let list = this.fileList.map(item => {
      return {
        name: item.fileName,
        fileId: item.fileId,
      }
    })
    return {
      url: '',
      authorization: '',
      list: list,
    }
  },
  created() {
    this.url = this.domain + '/news/attachment/upload'
    this.authorization = Utils.getValue('authorization')
  },
  methods: {
    reset() {
      this.list = []
    },
    successFile(response, file, list) {
      this.handleUpload(list)
    },
    removeFile(file, list) {
      this.handleUpload(list)
    },
    beforeFileUpload(file) {
      if (file.name.length > 30) {
        this.errorTips('附件名称过长!')
        return false
      }
    },
    handleUpload(list) {
      let fileList = list.map(item => {
        return {
          fileName: item.name,
          fileId: item.response ? item.response.content.picId : item.fileId,
        }
      })
      this.$emit('getFileList', fileList)
    },
  },
  props: ['fileList'],
}
</script>



