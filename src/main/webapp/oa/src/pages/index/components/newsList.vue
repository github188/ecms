<template>
  <div class="public-news">
    <p class="list-tag">
      <span>企业动态</span>
      <router-link to="/news/list">更多</router-link>
    </p>
    <div class="public-news-content">
      <template v-if="stickNews">
        <router-link target="_blank" :to="{path: '/news/detail', query:{id: stickNews.id}}">
          <img alt="" :src="setTopImg">
          <div class="top-line">
            <h2 class="top-line-title" id="topPublic">
              <!-- {{getTypeName(stickNews.typeName)}} -->
              <!-- <span v-html="getTypeName(stickNews.typeName)"></span> -->
              <span class="top-line-tag" style="position:relative; top:-4px" :style="getTypeName(stickNews.typeName).style">{{getTypeName(stickNews.typeName).name}}</span>
              <router-link target="_blank" :to="{path: '/news/detail', query:{id: stickNews.id}}">{{stickNews.newsTitle}}</router-link>
              <em class="tag-icon tag-icon-top">Top</em>
            </h2>
            <p id="topPublicContent" class="top-line-content" v-html="getContent(stickNews.content)"></p>
          </div>
        </router-link>
      </template>

      <ul id="topNews" class="top-line-list">
        <li class="top-line-title" v-for="(item, index) in topNews" :key="index">
          <span class="top-line-tag" :style="getTypeName(item.typeName).style">{{getTypeName(item.typeName).name}}</span>
          <router-link style="max-width: 60%" target="_blank" :to="{path: '/news/detail', query:{id: item.id}}">{{item.newsTitle}}</router-link>
          <em class="tag-icon tag-icon-new" v-if="restTime(item.publishDate)">New</em>
          <span class="top-line-time"> {{new Date(item.publishDate).toStr()}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
<style scoped>
.public-news {
  width: 100%;
  height: 320px;
  background: #fff;
  margin-bottom: 24px;
  padding: 20px 30px 30px 24px;
}

.public-news-content {
  margin-top: 15px;
}

.public-news-content img {
  width: 230px;
  height: 120px;
  float: left;
  margin-right: 20px;
  border: none;
}

.top-line h2 {
  font-size: 14px;
  font-weight: normal;
}

.top-line-tag {
  /* width: 34px; */
  padding: 0 2px;
  line-height: 18px;
  border-radius: 2px;
  display: inline-block;
  text-align: center;
  margin-right: 10px;
  font-size: 12px;
  border: 1px solid #fab33c;
}

.top-line-tag-publish {
  border: 1px solid #fab33c;
  color: #fab33c;
}

.top-line-tag-news {
  color: #41baad;
  border: 1px solid #41baad;
}

.top-line-tag-share {
  color: #4caee1;
  border: 1px solid #4caee1;
}

.top-line-tag-rule {
  color: #aa55cd;
  border: 1px solid #aa55cd;
}

.top-line-title a {
  font-size: 14px;
  color: #3e3e3e;
  display: inline-block;
  max-width: 40%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.top-line-title a:hover {
  color: #01cd78;
}

.top-line-time {
  float: right;
  color: #8d8d8d;
  font-size: 12px;
}

.top-line-content {
  font-size: 12px;
  color: #8d8d8d;
  line-height: 24px;
  height: 95px;
  overflow: hidden;
  text-align: justify;
  margin-top: 8px;
  margin-bottom: 15px;
}

.top-line-list {
  padding-left: 0;
}

.top-line-list a {
  color: #373e4a;
}

.top-line-list a:hover {
  color: #01cd78;
}

.top-line-list li {
  list-style: none;
  height: 35px;
  line-height: 35px;
  font-size: 14px;
}

.top-line-list .top-line-tag {
  position: relative;
  top: -12px;
}

.tab-menu {
  border-bottom: 1px solid #e5e5e5;
  padding: 0 30px 0 24px;
  font-size: 14px;
}

.tab-menu span {
  color: #01cd78;
}

.tab-menu a {
  color: #8e8e90;
  margin-right: 30px;
  padding: 0 8px;
  display: inline-block;
}

.tab-menu a.active {
  color: #3e3e3e;
  border-bottom: 2px solid #01cd78;
  padding-bottom: 10px;
}

.tag-icon {
  font-size: 12px;
  font-style: normal;
  position: relative;
  top: -8px;
  left: -4px;
  font-weight: bold;
}

.tag-icon-top {
  color: #0b99ea;
  left: 4px;
}

.tag-icon-new {
  color: #f42c0b;
  left: 4px;
  top: -18px;
}
</style>

<script>
export default {
  name: 'newsList',
  data() {
    return {
      topNews: [], //头条新闻
      stickNews: undefined, //置顶头条
    }
  },
  created() {
    this.ajax({
      //获取新闻或公共3条
      url: '/news/common/list',
      data: {
        isTop: 1,
        pageNum: 1,
        pageSize: 3,
        isPublish: 0,
      },
      success(data, $this) {
        if (data.code == 'success') {
          $this.topNews = data.content
        }
      },
    })
    this.ajax({
      //获取置顶新闻或公共1条
      url: '/news/common/list',
      data: {
        isTop: 0,
        pageNum: 1,
        pageSize: 1,
        isPublish: 0,
      },
      success(data, $this) {
        if (data.code == 'success') {
          $this.stickNews = data.content[0]
        }
      },
    })
  },
  computed: {
    setTopImg() {
      let { pictureId } = this.stickNews
      return pictureId ? this.domain + '/news/picture/top/' + pictureId + '/download?width=230&height=120' : require('./../img/news-default.png')
    }
  },
  methods: {
    getContent(value) {
      if (value) {
        return (
          Utils.unescapeHtml(value)
            .replace(/<\/?[^>]*>/g, '')
            .substring(0, 144) + '......'
        )
      }
    },
    restTime(dateTimeStamp) {
      var minute = 1000 * 60
      var hour = minute * 60
      var day = hour * 24
      var now = new Date().getTime()
      var diffValue = now - dateTimeStamp
      var dayC = diffValue / day
      if (dayC <= 5) {
        return true
      }
      return false
    },

    getTypeName(typeName) {
      let name = typeName.split('#')[0]
      let color = '#' + typeName.split('#')[1]
      let style = {
        'border-color': color,
        color: color,
      }
      return { name, color, style }
    }
  }
}
</script>
