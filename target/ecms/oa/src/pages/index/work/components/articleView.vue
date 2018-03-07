<template>
  <div class="news-body">
    <h2 class="news-title">{{details.newsTitle}}</h2>
    <div class="news-category">
      <span class="news-category-tag">{{details.type}}</span>
      <span class="news-time">{{new Date(details.updateTime || details.addTime).toStr()}}</span>
      <span class="new-author">撰稿人:&nbsp;研发中心 {{details.userName}}</span>
      <div class="news-content" v-html="details.content">
      </div>
    </div>
</template>
<style scoped>
.article-content {
  background: #fff;
  padding-top: 40px;
}
.news-body {
  width: 680px;
  margin: 0 auto;
}
.news-category {
  color: #9e9e9e;
  font-size: 14px;
  margin-top: 18px;
  margin-bottom: 35px;
}

.news-category-tag {
  border: 1px solid #999999;
  padding: 1px 2px;
}

.news-time {
  margin: 0 10px;
}

.news-content {
  padding-bottom: 80px;
}

.news-title {
  text-align: left;
  font-size: 28px;
  color: #000;
  font-weight: normal;
}
</style>

<script>
export default {
  name: 'articleView',
  props: ['details'],
}
</script>
