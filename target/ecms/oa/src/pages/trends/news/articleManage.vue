<template>
  <div id="writeArticlePage">
    <el-form label-width="90px" :inline="true">
      <el-form-item label="标题：">
        <el-input style="width:150px;" v-model="search.newsTitle"></el-input>
      </el-form-item>
      <el-form-item label="文章类型：">
        <el-select style="width:150px" v-model="search.newsType" clearable placeholder="请选择文章类型">
          <el-option v-for="item in articleType" :key="item.id" :label="item.name.split('#')[0]" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="当前状态：">
        <el-select style="width:150px" v-model="search.isPublish" clearable>
          <el-option :value="0" label="已发布"></el-option>
          <el-option :value="1" label="未发布"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="作者：">
        <el-input style="width:150px" v-model="search.newsAuthor"></el-input>

      </el-form-item>
      <el-button style="margin-top:3px;margin-left: 10px" class="search-btn" type="success" @click="getList">查询</el-button>
    </el-form>
    <v-panel title="新鲜事儿列表">
      <div slot="button">
        <el-button type="info" @click="openModal(false)">新 增</el-button>
      </div>
      <ArticleList :search="search" @openModal="openModal" ref="articleList" />
      <ArticleWrite :articleType="articleType" ref="articleWrite" />
    </v-panel>
  </div>
</template>
<style lang="scss">
#writeArticlePage {
  .edui-container {
    width: 810px !important;
    margin-top: -50px;
  }
  .edui-fullscreen{
    width: 100% !important;
  }
  #tableList a.operator {
    display: inline-block;
    width: 58px;
  }

  #postHead .el-upload-list--picture-card .el-upload-list__item {
    width: 296px;
  }

  #postCreate .el-dialog__body,
  #postCreate .el-dialog__footer {
    width: 950px;
    margin: 0 auto;
    color: #000;
  }

  #commentModal .el-dialog {
    width: 900px;
  }

  #commentModal .el-button--mini {
    padding: 3px;
    margin-left: 20px;
  }
}
</style>

<script>
import ArticleList from "./list";
import ArticleWrite from "./write";
export default {
  name: "newsManage",
  components: {
    ArticleList,
    ArticleWrite
  },
  data() {
    let $this = this;
    return {
      search: {
        newsType: "",
        newsTitle: "",
        newsAuthor: "",
        isPublish: ""
      },
      type: true, //添加模式,反之编辑模式
      articleType: [], //文章类型
      comments: {
        //评论
        open: true,
        modal: false,
        list: [],
        newsId: "" //当前评论所在的新闻id
      }
    };
  },
  created() {
    this.getList();
    this.getArticleType();
  },
  // props: ["articleType"],
  methods: {
    getList() {
      let ArticleList = this.$refs.articleList;
      ArticleList && ArticleList.getList();
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
    openModal(type, row) {
      //新增
      let articleWrite = this.$refs.articleWrite;
      articleWrite && articleWrite.openModal(type, row);
    },
    commentsRead(id) {
      this.comments.modal = true;
      this.ajax({
        // url: '/news/comment/' + id + '/12/list',
        url: "news/comment/all/list",
        data: {
          newId: id,
          depId: 1,
          pageNum: 1,
          pageSize: 100
        },
        success(data, $this) {
          if (data.code == "success") {
            $this.comments.list = data.content;
            $this.comments.newsId = id;
          }
        }
      });
    },
    commentsManage(id, state, e) {
      e.stopPropagation();
      let status = state == 1 ? 0 : 1;
      this.ajax({
        url: "/news/comment/" + id + "/" + status + "/hide",
        type: "put",
        success(data, $this) {
          if (data.code == "success") {
            $this.successTips();
            $this.commentsRead($this.comments.newsId);
          } else {
            $this.errorTips();
          }
        }
      });
    }
  }
};
</script>
