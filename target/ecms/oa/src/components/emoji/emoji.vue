<template>
  <div class="emoji">
    <ul>
      <li v-for="(item, key) in data" :key="key">
        <a href="javascript:;" @click="getvalue(key, require('./img/' + item + '.gif'))" :title="key" >
          <img :src="require('./img/' + item + '.gif')" :alt="key">
        </a>
      </li>
    </ul>
  </div>
</template>
<style scoped>
  .emoji{
    width: 100%;
    height: 100%;
    padding: 20px;
    background: #fff;
  }
  .emoji ul li{
    height: 28px;
    width: 28px;
    float: left;
    border: 1px solid #eee;
    margin: 2px;
    text-align: center;
  }
  .emoji ul li:hover{
    border: 1px solid #01cd78
  }
</style>

<script>
import data from './data';
export default {
  name: 'emoji',
  data(){
    return {
      data: data
    };
  },
  props: ['choose'],
  methods:{
    getvalue(key, src){
      this.$emit('choose', key, src);
    }
  }
};
</script>
