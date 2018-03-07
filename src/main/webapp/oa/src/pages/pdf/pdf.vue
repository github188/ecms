<template>
  <iframe id="eapPdf" v-if="url" :data-url="url" :style="{'height':height+'px', 'width': width+'px'}" :src="appRoot+'/static/pdf/index.html'">
  <!-- <iframe id="eapPdf" v-if="url" :data-url="url" :style="{'height':height+'px', 'width': width+'px'}" :src="'/static/pdf/index.html'"> -->
  </iframe>
</template>
<script>
export default {
  name: 'pdf',
  data() {
    return {
      height: document.documentElement.clientHeight - 10,
      width: document.documentElement.clientWidth - 15,
      url: false,
    }
  },
  created() {
    this.getFile()
  },
  methods: {
    getFile() {
      let { url, name } = this.$route.query
      let $this = this
      const xhr = new XMLHttpRequest()
      xhr.open('get', this.domain + url + '&name=' +name, true)
      xhr.setRequestHeader('authorization', Utils.getValue('authorization'))
      xhr.responseType = 'blob'
      xhr.onload = function () {
        if (this.status == 200) {
          document.title = name + '-在线预览-亿车科技EAP'
          let blob = new Blob([this.response])
          $this.url = URL.createObjectURL(blob)
        }
      }
      xhr.send()
    },
  },
}
</script>
