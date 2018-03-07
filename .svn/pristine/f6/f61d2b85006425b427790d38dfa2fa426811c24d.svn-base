<template>
  <div class="person-new">
    <p class="list-tag" style="padding-left: 24px; margin-top:-10px">
      <span>新人秀</span>
    </p>
    <el-carousel trigger="click" :interval="8000" :autoplay="true" arrow="never" height="290px">
      <el-carousel-item v-for="(item, index) in workMate" :key="index">
        <router-link :to="'/person/'+item.userId">
          <img :src="getAvatar({headPic:item.photo})">
        </router-link>
        <div class="person-new-info">
          <p style="margin-bottom: 9px;">
            <span class="person-name">{{item.name}}</span>
            <span>{{item.home}}</span>
          </p>
          <p style="margin-bottom: 9px; overflow:hidden;text-overflow:ellipsis; white-space:nowrap">{{item.depName | getDepart}}&nbsp;&nbsp;{{item.post}}</p>
          <p style="margin-bottom: 8px;">{{item.hobby}}</p>
          <!-- <el-tooltip :content="item.show" placement="top"> -->
          <p style="text-align:center;">show me: {{item.personSign}}</p>
          <!-- </el-tooltip> -->
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<style scoped>
.person-new .person-name {
  font-size: 18px;
  color: #3e3e3e;
  padding-right: 28px;
}
.person-new {
  height: 320px;
  background: #fff;
  margin-bottom: 24px;
  padding-top: 30px;
}

.person-new img {
  height: 90px;
  width: 90px;
  display: block;
  border-radius: 100%;
  border: none;
  margin: 0 auto;
}

.person-new-info {
  margin-top: 20px;
  text-align: center;
  font-size: 14px;
  color: #9f9f9f;
}

.person-new-info p {
  /* overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap; */
  padding: 0 40px;
  margin-bottom: 8px;
  line-height: 20px;
}
</style>

<script>
export default {
  name: 'personSHow',
  data() {
    return {
      workMate: [], //新同事风采
    }
  },
  created() {
    //新人秀
    this.ajax({
      url: '/authority/show/list',
      data: {
        status: 1,
      },
      success(data, $this) {
        if (data.code == 'success') {
          $this.workMate = data.content
        }
      },
    })
  },
  filters: {
    getDepart(value) {
      if (value) {
        let depart = value.split('-')
        return depart[depart.length - 1]
      }
    },
  },
}
</script>
