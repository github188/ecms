// 新闻公告管理
<template>
    <v-panel id="trendsManage">
      <analyse v-if="analyse" :articleType="type" :articleId="id"></analyse>
      <el-tabs v-else v-model="activeTab" type="card">
        <el-tab-pane label="文章管理" name="article">
          <articleManage @analyseClick="analyseChange" :articleType="articleType"></articleManage>
        </el-tab-pane>
        <!-- <el-tab-pane label="互动管理" name="interact">
            <interactManage :articleType="articleType"></interactManage>
          </el-tab-pane> -->
        <!-- <el-tab-pane label="数据分析" name="data">
            数据分析
          </el-tab-pane> -->
        <el-tab-pane label="设置" name="template">
          <settingManage></settingManage>
        </el-tab-pane>
      </el-tabs>
    </v-panel>
</template>
<style lang="scss">
#trendsManage {
  .el-tabs__content {
    padding-top: 30px;
  }
}
</style>

<script>
import articleManage from './articleManage';
// import interactManage from './interactManage';
import settingManage from './setting';
import analyse from './analyse';
export default {
  name: 'newsManage',
  components: {
    articleManage,
    // interactManage,
    settingManage,
    analyse
  },
  data() {
    return {
      activeTab: 'article',
      articleType: [],
      analyse: false,
      id: '',
      type: ''
    };
  },
  created() {
    this.getArticleType();
    let { type, id } = this.$route.query;
    if(type){
      this.type = type.toString();
      this.id = id;
      this.analyse = true;
    }
  },
  beforeRouteUpdate (to, from, next) {
    this.analyse = false;
    next();
  },
  methods: {
    analyseChange(type, id) {
      this.id = id;
      this.type = type;
    },
    getArticleType() {
      this.ajax({
        url: 'ctm/setting/param/list',
        data: {
          code: 'portal_type'
        },
        success(data, $this) {
          if (data.code == 'success') {
            $this.articleType = data.content;
          }
        }
      });
    },
  }
};
</script>
