<template>
  <div class="container" id="articlePage">
    <div class="content-box">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/news/list' }">新闻</el-breadcrumb-item>
        <el-breadcrumb-item>发表文章</el-breadcrumb-item>
      </el-breadcrumb>

      <div class="article-content">
        <el-form ref="form" :model="form" :rules="rules" style="position: relative">

          <el-form-item :show-message="false" label="" prop="newsTitle" style="margin-bottom:0">
            <el-input class="newsTitle" :maxlength="50" v-model="form.newsTitle" placeholder="请输入文章标题"></el-input>
            <span class="count-str">{{form.newsTitle.length}}/50</span>
          </el-form-item>

          <!-- <el-form-item label=""> -->
            <!-- <froala :tag="'textarea'" :config="config" v-model="form.content"></froala> -->
          <!-- </el-form-item> -->
          <VueUEditor class="editor-article-write" :ueditorConfig="ueditorConfig" @editorReady="editorReady" style="width: 100%;"></VueUEditor>
          <el-form-item label="类型" prop="type" :show-message="false" style="margin-top: 30px;">
            <el-select v-model="form.type" clearable placeholder="请选择文章类型">
              <el-option v-for="item in articleType" :key="item.id" :label="item.name.split('#')[0]" :value="item.value"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="附件：">
            <el-upload :headers="{authorization: authorization}" :before-upload="beforeFileUpload" :on-success="successFile" :on-remove="removeFile" :file-list="fileList" :action="uploadFileUrl">
              <el-button size="small" type="primary">点击上传</el-button>
            </el-upload>
          </el-form-item>

          <el-form-item class="cover-picture" label="封面图" :show-message="false">
            <cropUpload ref="cropUpload" :url="upload.url" field="img" :noCircle="true" v-model="show" :width="230" :height="120" img-format="png" @crop-success="cropSuccess" @crop-upload-success="cropUploadSuccess">
            </cropUpload>
            <div class="cover-pic" @click="show=!show">
              <template v-if="upload.photoSrc">
                <img :src="upload.photoSrc" alt="">
                <i @click="removeCover" class="el-icon-delete2"></i>
              </template>
              <div class="icon-plus" v-else>上传封面图</div>
            </div>
            <span style="margin-left: 50px;position: relative;top: 10px; color: #b3b4b9">上传尺寸不小于230*120的图片</span>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="article-footer">
      <div class="footer-btn">
        <el-button type="success" :disabled="disable" v-if="disable">
          <i class="el-icon-loading"></i>
        </el-button>
        <el-button type="success" :disabled="disable" @click="submit('/news/process/create')" v-else>提交审核</el-button>
        <!-- <el-button type="info" @click="submit('/news/process/add', 'save')">保存</el-button> -->
        <router-link target="_blank" to="/article/preview?type=1">
          <el-button type="info" @click="previewArticle">预览</el-button>
        </router-link>
      </div>

    </div>
  </div>
</template>
<style lang="scss">
#articlePage {
  .edui-container {
    // margin-bottom: 35px;
  }
  .fr-element.fr-view {
    font-size: 16px;
    line-height: 30px;
    text-align: justify;
    padding-bottom: 40px;
  }
  .fr-box.fr-basic.fr-element {
    padding: 10px 30px;
  }
  .fr-element.fr-view p {
    line-height: 1.8;
  }
  .cover-picture {
    height: 160px;
    margin-top: -10px;
  }
  .cover-picture .el-form-item__content {
    top: 36px;
    left: -50px;
  }
  .cover-pic {
    height: 120px;
    line-height: 120px;
    width: 230px;
    border: 1px dashed #01cd78;
    border-radius: 6px;
    box-sizing: border-box;
    text-align: center;
    cursor: pointer;
    overflow: hidden;
    position: relative;
    &:hover {
      &:before {
        opacity: 1;
      }
      .el-icon-delete2 {
        opacity: 1;
      }
    }
    &:before {
      content: "";
      left: 0;
      top: 0;
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      transition: opacity 0.3s;
      opacity: 0;
    }
    img {
      left: 0;
      top: 0;
    }
    .el-icon-delete2 {
      position: absolute;
      left: 100px;
      top: 50px;
      font-size: 21px;
      color: #fff;
      z-index: 88;
      opacity: 0;
    }
    .icon-plus {
      background: url("./img/plus.png") no-repeat center;
      width: 90px;
      height: 30px;
      margin: 0 auto;
      margin-top: 26px;
      color: #01cd78;
    }
  }
  .article-content {
    background: #fff;
    padding: 48px 32px;
    padding-bottom: 80px;
    .newsTitle input {
      height: 48px;
      border: 0;
      border-radius: 3px 3px 0 0;
      outline: 1px solid #dddee1;
      outline-offset: 0px;
    }
    .count-str {
      position: absolute;
      right: 15px;
      top: 6px;
      color: #40474d;
      font-size: 12px;
    }
    .el-form-item {
      margin-bottom: 30px;
    }
  }
  .article-footer {
    height: 58px;
    width: 100%;
    background: #fff;
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 99999;
    box-shadow: 0px 4px 15px 0px rgba(0, 0, 0, 0.66);
    .footer-btn {
      width: 1180px;
      margin: 0 auto;
      margin-top: 15px;
      text-align: right;
      padding-right: 32px;
      .el-button {
        padding: 0;
        width: 100px;
        text-align: center;
        height: 30px;
        line-height: 30px;
        margin-left: 15px;
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
import cropUpload from "vue-image-crop-upload";
import VueUEditor from "@/components/editor/";
import { setStore, getStore } from "@/utils/localStorage";
export default {
  name: "write",
  components: {
    cropUpload,
    VueUEditor
  },
  data() {
    return {
      form: {
        type: "",
        newsTitle: "",
        content: "",
        headPic: "",
        userId: Utils.getValue("u"),
        files: [] //附件列表
      },
      articleType: [], //文章类型
      show: false, //是否显示图片裁剪
      upload: {
        photoSrc: "",
        url: ""
      },
      authorization: "",
      uploadFileUrl: "",
      fileList: [], //附件列表
      ueditorConfig: {},
      editorInstance: null,
      rules: {
        type: [
          {
            required: true,
            message: "文章类型不能为空!"
          }
        ]
      }
    };
  },
  created() {
    this.getArticleType();
    this.upload.url = this.domain + "/news/picture/top/upload"; //头图地址
    this.uploadFileUrl = this.domain + "/news/attachment/upload"; //附件地址
    // this.config.videoGetUrl = this.domain + '/news/attachment/';

    this.ueditorConfig = {
      toolbar: [
        " bold italic underline | justifyleft justifycenter justifyright justifyjustify | fontfamily | fontsize | forecolor | backcolor | removeformat |",
        "insertorderedlist horizontal | link ",
        " emotion | image video fullscreen | undo redo "
      ],
      imageUploadUrl: this.domain + "/news/picture/content/upload",
      imageDownUrl: this.domain + "/news/picture/content/",
      videoUploadUrl: this.getUploadUrl("sys", "News", "uploadVideoAll")
    };
  },
  methods: {
    editorReady(editor) {
      this.editorInstance = editor;
      editor.addListener("contentChange", () => {
        this.form.content = editor.getContent();
      });
      editor.setContent("");
    },
    getArticleType() {
      this.ajax({
        url: "ctm/setting/param/list",
        data: {
          code: "portal_type"
        },
        success(data, $this) {
          if (data.code == "success") {
            $this.articleType = data.content;
          }
        }
      });
    },
    submit(url, type) {
      if (this.form.newsTitle.trim().length == 0) {
        this.errorTips("请输入文章标题!");
        return;
      }
      if (this.form.content.trim().length == 0) {
        this.errorTips("请输入文章内容!");
        return;
      }
      if (!this.form.type) {
        this.errorTips("请选择文章类型!");
        return;
      }
      this.form.files = this.fileList.map(item => {
        return {
          fileName: item.name,
          fileId: item.response.content.picId
        };
      });
      this.$refs.form.validate(valid => {
        if (valid) {
          if (!type) {
            this.disable = true;
          }
          this.ajax({
            url: url,
            type: "post",
            data: this.form,
            success(data, $this) {
              if (data.code == "success") {
                $this.successTips();
                $this.disable = false;
                if (type) {
                  $this.successTips('保存成功,可在"我的申请"中查看!');
                } else {
                  $this.$router.push({
                    path: "/work/list",
                    query: {
                      name: "myapply"
                    }
                  });
                }
              } else {
                $this.errorTips(data.message);
              }
            }
          });
        }
      });
    },
    cropSuccess(url, filed) {
      this.upload.photoSrc = url;
    },
    cropUploadSuccess(data, field) {
      if (data.code == "success") {
        const { picId } = data.content;
        this.form.headPic = picId;
        this.$refs.cropUpload.off();
      }
    },
    removeCover(e) {
      e.stopPropagation();
      this.upload.photoSrc = "";
      this.form.headPic = "";
    },
    previewArticle(e) {
      if (this.form.newsTitle.trim().length == 0) {
        this.errorTips("请输入文章标题!");
        e.preventDefault();
      }
      if (this.form.content.trim().length == 0) {
        this.errorTips("请输入文章内容!");
        e.preventDefault();
      }

      if (!this.form.type) {
        this.errorTips("请选择文章类型!");
        e.preventDefault();
      }

      this.form.files = this.fileList.map(item => {
        return {
          fileName: item.name,
          fileId: item.response.content.picId
        };
      });

      this.$refs.form.validate(valid => {
        if (valid) {
          setStore("article", {
            newsTitle: this.form.newsTitle,
            content: this.form.content,
            time: new Date().getTime(),
            files: this.form.files,
            type: this.articleType.filter(item => {
              if (item.value == this.form.type) {
                return item.name.split("#")[0];
              }
            })
          });
        } else {
          e.preventDefault();
        }
      });
    },
    successFile(response, file, list) {
      this.fileList = list;
    },
    removeFile(file, list) {
      this.fileList = list;
    },
    beforeFileUpload(file) {
      if (file.name.length > 30) {
        this.errorTips("附件名称过长!");
        return false;
      }
    }
  }
};
</script>

