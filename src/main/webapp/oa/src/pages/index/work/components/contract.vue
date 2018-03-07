<template>
  <div>
    <el-form label-width="110px" label-position="right">
      <el-form-item label="合同发起人：">
        <span> {{details.userName}} </span>
      </el-form-item>
      <el-form-item label="合同归属部门：">
        <span> {{reverseDepart(details.depName)}} </span>
      </el-form-item>
      <el-form-item label="关联项目：">
        <span> {{details.projectName || '-'}} </span>
      </el-form-item>
      <el-form-item label="合同类型：">
        <span> {{details.ctmAttrName}} </span>
      </el-form-item>
      <el-form-item label="合同名称：">
        <span> {{details.ctmName}} </span>
      </el-form-item>
      <el-form-item label="合作方名称：">
        <span> {{details.cusName}} </span>
      </el-form-item>
      <el-form-item label="合同金额：">
        <span> {{details.amount && (details.amount).addComma() + ' 元' || '/'}} </span>
      </el-form-item>
      <el-form-item label="合同开始日期：">
        <span> {{new Date(details.startTime).toDay()}} </span>
      </el-form-item>
      <el-form-item label="合同结束日期：">
        <span> {{new Date(details.endTime).toDay()}} </span>
      </el-form-item>
      <el-form-item label="其他说明：">
        <span v-html="details.remark"></span>
      </el-form-item>
      <el-form-item label="合同附件：" v-if="details.list">
        <li :key="index" v-for="(item, index) in details.list">
          <a style="color: #01cd79" v-if="isPreview(item)" @click="toPreview(item)" href="javascript:;" title="在线预览">
            <i class="el-icon-document"></i>&nbsp;&nbsp;{{item.name}}
          </a>
          <span v-else>
            <i class="el-icon-document"></i>&nbsp;&nbsp;{{item.name}}
          </span>
          <a class="pull-right" href="javascript:;" @click="downFile(`/ctm/contract/files/download?fileId=${item.id}&name=${item.name}`, item.name)">下载</a>
        </li>
      </el-form-item>
    </el-form>
    <el-dialog v-model="approveImgModal" size="small">
      <img width="100%" :src="approveImgUrl" alt="">
    </el-dialog>
  </div>
</template>
<style scoped>
a:hover {
  opacity: 0.6;
}
li {
  list-style: none;
}
</style>
<script>
export default {
  data() {
    return {
      preview: ['jpg', 'jpeg', 'png', 'pdf'],
      approveImgModal: false,
      approveImgUrl: ''
    }
  },
  name: 'contract',
  methods: {
    isPreview(item) {
      if (item) {
        let { name } = item
        let _name = name.split('.')
        let postfix = (_name[_name.length - 1]).toLowerCase();
        let preview = this.preview;
        for (let i = 0; i < preview.length; i++) {
          if (preview[i] == postfix) {
            item.postfix = postfix
            return true
          }
        }
      }
    },
    toPreview(item) {
      if (item) {
        let { postfix } = item
        let $this = this
        let url = `/ctm/contract/files/download?fileId=${item.id}&name=${item.name}`;
        if (postfix == 'jpg' || postfix == 'jpeg' || postfix == 'png') { //图片
          this.approveImgModal = true
          let xhr = new XMLHttpRequest()
          xhr.open('get', this.domain + url, true)
          xhr.setRequestHeader('authorization', Utils.getValue('authorization'))
          xhr.responseType = 'blob'
          xhr.onload = function () {
            if (this.status == 200) {
              let blob = new Blob([this.response])
              $this.approveImgUrl = URL.createObjectURL(blob)
            }
          }
          xhr.send()
        } else if (postfix == 'pdf') {
          window.open(`${$this.appRoot}/pdf?url=${url}`)
        }
      }
    }
  },
  props: ['details'],
}
</script>

