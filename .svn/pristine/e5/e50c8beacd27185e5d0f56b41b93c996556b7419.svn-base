<template>
  <el-select v-model="value" clearable @change="getMarket" placeholder="请选择">
    <el-option v-for="item in marketList" :key="item.id" :label="item.name" :value="item.id +'|'+  item.name">
    </el-option>
  </el-select>
</template>
<script>
export default {
  name: 'market',
  created() {
    this.ajax({
      url: '/pmo/common/markets',
      success(data, $this) {
        if (data.code == 'success') {
          $this.marketList = data.content;
        }
      }
    });
  },
  data() {
    return {
      marketList: [],
      value: ''
    };
  },
  props: ['change'],
  methods: {
    getMarket(data) {
      let value = data.split('|');
      const obj = {
        name: value[1],
        value: value[0]
      };
      this.$emit('change', obj);
    }
  }
};
</script>
