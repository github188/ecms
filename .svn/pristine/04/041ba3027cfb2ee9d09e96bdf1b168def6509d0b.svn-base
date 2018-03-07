<template>
  <div class="container" id="articlePrview">
    <div class="content-box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/news/list' }">企业动态</el-breadcrumb-item>
        <el-breadcrumb-item>预览</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="article-content">
        <div class="news-body">
          <h2 class="news-title">{{preview.newsTitle}}</h2>
          <div class="news-category">
            <span class="news-category-tag">{{typeName}}</span>
            <span class="new-author">{{preview.depName}} | {{preview.userName}}</span>
            <span class="news-time">{{new Date(preview.time).toStr()}}</span>
          </div>
          <div class="news-content fr-element fr-view edui-body-container" v-html="preview.content">
          </div>

          <template v-if="preview.files.length > 0">
            <div class="file-box">
              <p>
                <b>附件</b>（{{preview.files.length}}个）</p>
              <ul class="file-list">
                <li v-for="item in preview.files" :key="item.fileId">
                    <div v-if="isInstitution()" class="file-download" href="javascript:;">
                      <i class="el-icon-document" style="padding-right:10px;"></i>{{item.fileName}}
                    </div>
                    <a v-else title="附件下载" @click="downFile('/news/attachment/'+ item.fileId +'/download', item.fileName)" class="file-download" href="javascript:;">
                      <i class="el-icon-document" style="padding-right:10px;"></i>{{item.fileName}}
                    </a>

                  <router-link v-if="filePreview(item.fileName) =='pdf'" class="preview" :to="{path: '/pdf', query: {url: `/news/attachment/${item.fileId}/download`, name: item.fileName}}" target="_blank" title="在线预览"> 预览</router-link>
                  <a v-if="filePreview(item.fileName) =='img'" @click="previewUrl(item)" href="javasceipt:;" class="preview"> 预览</a>

                </li>
              </ul>
            </div>
          </template>
        </div>
      </div>
    </div>
    <!-- <div class="article-footer">
                  <div class="footer-btn">
                    <el-button type="info" @click="modal = false">返回编辑</el-button>

                    <el-button type="success" :disabled="disable" v-if="disable">
                      <i class="el-icon-loading"></i>
                    </el-button>
                    <el-button type="success" :disabled="disable" @click="submit" v-else>提交审核</el-button>
                  </div>
                </div> -->
    <el-dialog v-model="imgModal" size="small">
      <img width="100%" :src="imgUrl" alt="">
    </el-dialog>
  </div>
</template>
<style lang="scss">
#articlePrview {
  .fr-element.fr-view {
    text-align: justify;
    word-break: break-all;
    font-size: 16px;
  }
  .file-download {
    display: block;
    height: 30px;
    font-size: 16px;
    line-height: 30px;
  }
  .new-author {
    padding-left: 14px;
  }

  .fr-element.fr-view p {
    line-height: 1.8;
  }
  .file-box {
    p {
      padding-left: 15px;
      height: 30px;
      background: #e6e6e6;
      line-height: 30px;
    }
    .file-list {
      padding: 10px;
      border: 2px solid #e6e6e6;
      li {
        position: relative;
        .preview {
          position: absolute;
          top: 5px;
          right: 0;
        }
      }
    }
    a.file-download {
      height: 30px;
      color: rgb(120, 120, 120);
      font-size: 16px;
      line-height: 30px;
      &:hover {
        color: #01cd78;
      }
    }
  }
  .article-content {
    padding-top: 40px;
    background: #fff;
    .news-body {
      margin: 0 auto;
      padding-bottom: 40px;
      min-height: 780px;
      width: 680px;
      .news-category {
        margin-top: 18px;
        margin-bottom: 35px;
        color: #9e9e9e;
        font-size: 14px;
      }
      .news-category-tag {
        padding: 1px 2px;
        border: 1px solid #999999;
      }
      .news-time {
        margin: 0 10px;
      }
      .news-content {
        // padding-bottom: 80px;
      }
    }
    .news-title {
      margin-bottom: 20px;
      color: #000;
      font-size: 26px;
      line-height: 36px;
    }
  }
  .article-footer {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 99999;
    width: 100%;
    height: 58px;
    background: #fff;
    box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.66);
    .footer-btn {
      margin: 0 auto;
      margin-top: 15px;
      padding-right: 32px;
      width: 1180px;
      text-align: center;
      .el-button {
        margin-left: 15px;
        padding: 0;
        width: 100px;
        height: 30px;
        text-align: center;
        line-height: 30px;
      }
      .el-button--info {
        border: 1px solid #e6eaed;
        color: #2d3039;
      }
    }
  }
}
</style>

<script>
require('@/components/froala-editor/css/froala_editor.pkgd.min.css')
require('font-awesome/css/font-awesome.css')
require('@/components/froala-editor/css/froala_style.min.css')
import { setStore, getStore } from '@/utils/localStorage'
export default {
  name: 'preview',
  data() {
    return {
      preview: {},
      type: '',
      typeName: '',
      imgUrl: '',
      imgModal: false
    }
  },
  created() {
    this.getPreview()
  },
  mounted() {
    $('.fr-view').viewer({
      url: 'data-original',
      navbar: false,
      rotatable: false,
      scalable: false,
      transition: false,
      view: function name(params) {
        $('.viewer-canvas').addClass('load')
      },
      viewed: function () {
        $('.viewer-canvas').removeClass('load')
      },
    })
    $('.thumb-img').lazyload({ threshold: 180, effect: 'fadeIn', data_attribute: 'src' })
    $('body').on('click', '.viewer-container', function (e) {
      if ($(e.target).hasClass('viewer-canvas')) {
        $('.viewer-close').trigger('click')
      }
    })
  },
  methods: {
    getPreview() {
      this.preview = JSON.parse(getStore('article'))
      this.dealImgs()
      if (this.$route.query.type == 1) {
        //自己预览
        let depName = unescape(Utils.getValue('depName')).split('-')
        this.preview.depName = depName[depName.length - 1]
        this.preview.userName = unescape(getStore('realname'))
      }
      let { type } = this.preview;
      this.typeName = type[0].name.split('#')[0];
      this.type = type[0].value;
    },
    dealImgs() {
      this.preview.content = this.dealImg(this.preview.content)
      this.dealVideo();
    },
    isInstitution(file){ //是否是制度版块，附件只能预览不能下载
      if(this.typeName == '制度' || this.type  == 3){
        return true
      }
    },
    filePreview(file) {
      file = file.toLowerCase();
      if(file.includes('.png') || file.includes('.jpg') || file.includes('.gif')){
       return 'img';
      }
      if(file.includes('.pdf')){
        return 'pdf'
      }
    },
    previewUrl(item) {
        let $this = this
        let url = `/news/attachment/${item.fileId}/download`;
        this.imgModal = true
        let xhr = new XMLHttpRequest()
        xhr.open('get', this.domain + url, true)
        xhr.setRequestHeader('authorization', Utils.getValue('authorization'))
        xhr.responseType = 'blob'
        xhr.onload = function () {
          if (this.status == 200) {
            let blob = new Blob([this.response])
            $this.imgUrl = URL.createObjectURL(blob)
          }
        }
        xhr.send()
    }
  },
}
</script>

