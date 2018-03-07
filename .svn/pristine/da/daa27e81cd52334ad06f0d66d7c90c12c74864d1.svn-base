<template>
  <div id="articleApprove">
    <div class="article-content" v-if="details.newsTitle">
      <div class="news-body">
        <h2 class="news-title">{{details.newsTitle}}</h2>

        <div class="news-category">
          <span class="news-category-tag">{{details.typeName && details.typeName.split('#')[0]}}</span>
          <span class="new-author">{{user.depName}} | {{user.realname}}</span>
          <span class="news-time">{{new Date(details.updateTime).toStr()}}</span>
        </div>

        <div class="news-content fr-element fr-view" v-html="content">
        </div>
        <template v-if="details.files && details.files.length > 0">
          <div class="file-box">
            <p>
              <b>附件</b>（{{details.files.length}}个）</p>
            <ul class="file-list">
              <li v-for="(item, index) in details.files" :key="item.fileId">
                <a title="附件下载" @click="downFile('/news/attachment/'+ item.fileId +'/download', item.fileName)" class="file-download" href="javascript:;">
                  <i class="el-icon-document" style="padding-right:10px;"></i>{{item.fileName}}</a>
                <router-link class="preview" v-if="item.fileName.includes('.pdf')" :to="{path: '/pdf', query: {url: `/news/attachment/${item.fileId}/download`, name: item.fileName}}" target="_blank" title="在线预览"> 预览</router-link>
              </li>
            </ul>
          </div>
        </template>

      </div>
    </div>
  </div>
</template>
<style lang="scss">
#articleApprove {
  .fr-element.fr-view {
    text-align: justify;
    word-break: break-all;
    font-size: 16px;
    line-height: 30px;
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
      // margin-left: 102px;
      // margin-right: 102px;
      width: 680px;
      .news-category {
        margin-top: 18px;
        margin-bottom: 35px;
        color: #9e9e9e;
        font-size: 14px;
      }
      .new-author {
        padding-left: 14px;
      }
      .news-category-tag {
        padding: 1px 2px;
        border: 1px solid #999999;
      }
      .news-time {
        margin: 0 10px;
      }
      // .news-content {
      //   min-height: 264px;
      // }
    }
    .news-title {
      color: #000;
      text-align: left;
      font-weight: normal;
      font-size: 28px;
    }
  }
}
</style>

<script>
import lazyload from 'jquery-lazyload'

require('@/components/froala-editor/css/froala_editor.pkgd.min.css')
require('font-awesome/css/font-awesome.css')
require('@/components/froala-editor/css/froala_style.min.css')
export default {
  name: 'preview',
  data() {
    return {
      preview: {},
      content: '',
      user: {},
      flag: true,
    }
  },
  props: ['details', 'userInfo'],
  watch: {
    details(val, old) {
      this.loadContent()
    },
    userInfo(val, old) {
      this.user = val
    },
  },
  updated() {
    if (this.flag && $('.thumb-img').length > 0) {
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
      this.flag = false
    }
  },
  mounted() {
    $('body').on('click', '.viewer-container', function (e) {
      if ($(e.target).hasClass('viewer-canvas')) {
        $('.viewer-close').trigger('click')
      }
    })
  },
  methods: {
    loadContent() {
      let { newsTitle, content } = this.details
      document.title = newsTitle
      this.content = this.dealImg(content)
      this.dealVideo()
    },
  },
}
</script>

