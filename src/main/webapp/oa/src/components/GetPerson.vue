<!-- 组织架构人员选择 -->
<template>
  <el-select v-model="value" filterable :multiple="multiple" clearable @change="getPerson" @remove-tag="removePerson" placeholder="请输入关键字">
    <el-option :disabled="item.id == u && disabled" v-for="item in personList" :key="item.id" :label="item.realname" :value="item.id + '|' + item.realname">
      <span style="float:left" class="search-label">{{item.realname}}</span>
      <!-- <span style="float:right; padding-right:40px;" class="search-label">{{item.phone}}</span> -->
    </el-option>
  </el-select>
</template>
<script>

export default {
  name: "getPerson",
  data() {
    return {
      personList: [],
      value: '',
      u: ''
    };
  },
  created() {
    this.getList();
    this.value = this.selected || '';
    this.u = Utils.getValue('u');
  },
  methods: {
    getList() {
      this.ajax({
        url: '/authority/user/dep/1',
        data: {
          pageNum: 1,
          pageSize: 1000
        },
        success(data, $this) {
          if (data.code == 'success') {
            $this.personList = data.content;
          }
        }
      });
    },
    getPerson(data) {  //添加事件
      if (this.multiple) {
        let arr = [];
        for (let i = 0; i < data.length; i++) {
          arr.push({
            name: data[i].split('|')[1],
            value: data[i].split('|')[0]
          });
        }
        this.$emit('change', arr);
      } else {
        const person = data.split('|');
        const obj = {
          name: person[1],
          value: person[0]
        };
        this.$emit('change', obj);
      }
    },
    removePerson(data) {  //多选情况下的移除事件
      let { value } = data;
      let obj = {
        name: value.split('|')[1],
        value: value.split('|')[0]
      };
      this.$emit('remove', obj);
    }
  },
  props: ['change', 'multiple', 'remove', 'selected', 'disabled']   //selected 之前选中i的数据   remove 移除事件  multiple是否多选
};

</script>
