<template>
  <div>
    <el-form label-width="90px" :inline="true">
      <el-form-item label="标题：">
        <el-input style="width:150px;" v-model="search.newsTitle"></el-input>
      </el-form-item>
      <el-form-item label="作者：">
        <el-input style="width:150px" v-model="search.newsAuthor"></el-input>
      </el-form-item>
      <el-form-item label="文章类型：">
        <el-select style="width:150px" v-model="search.type" clearable placeholder="请选择文章类型">
          <el-option v-for="item in articleType" :key="item.id" :label="item.name" :value="item.value"></el-option>
        </el-select>
      </el-form-item>
      <el-button style="margin-top:3px;margin-left: 10px" class="search-btn" type="success" @click="getList">查询</el-button>
    </el-form>
    <v-panel title="新鲜事儿列表">
      <el-table
      :data="[]">
      <el-table-column
        prop="date"
        label="文章类型"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="标题"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="作者">
      </el-table-column>
       <el-table-column
        prop="address"
        label="发布时间">
      </el-table-column>
       <el-table-column
        prop="address"
        label="已看">
      </el-table-column>
       <el-table-column
        prop="address"
        label="未看">
      </el-table-column>
       <el-table-column
        prop="address"
        label="点赞">
      </el-table-column>
       <el-table-column
        prop="address"
        label="评论">
      </el-table-column>
        <el-table-column
        prop="address"
        label="操作">
      </el-table-column>
    </el-table>
    </v-panel>
  </div>
</template>
<script>
export default {
  name: 'interact',
  data(){
    return {
      search: {
        newsTitle: '',
        type: '',
        isPublish: ''
      }
    };
  },

  methods: {
    getList(){

    }
  },
  props: ['articleType']
};
</script>
