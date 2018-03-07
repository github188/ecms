/*
 * @Author: wangqibiao
 * @Date: 2017-11-06 15:43:04
 * @Last Modified by: YanGuoliang
 * @Last Modified time: 2018-02-27 16:04:24
 */

<template>
  <div>
    <el-table border @selection-change='_selectionChange' @expand="expand" :data="dataList" highlight-current-row>
      <!-- <el-table-column type="index" label=" " width="60" align="center"></el-table-column> -->
      <slot></slot>
    </el-table>
    <el-row class="pagination-body" id="pagination">
      <el-pagination :page-sizes="[10, 20, 30, 40]" layout="total, sizes, prev, pager, next, jumper" @size-change="_sizeChange" @current-change="_pageChange" :current-page="page.pageIndex" :page-size="page.pageSize" :total="page.totalCount">
      </el-pagination>
    </el-row>
  </div>
</template>
<script>
import { $http, $dataFormat } from "@/pages/projects/common/js/util";
export default {
  name: "EcTableList",
  props: {
    mock: Array,
    params: {
      type: Object,
      default: function() {
        return {};
      },
    },
    listProp:{
      type:String
    },
    pageProp:{
      type:String
    }
  },
  data() {
    return {
      dataList: [],
      page:{
        pageIndex:1,
        pageSize:10,
        totalCount:0,
      }
    };
  },
  mounted () {
    this.lisenting();
  },
  destroyed () {
    this.$parent.$off("refresh");
  },
  methods: {
    _list() {
      if (!this.params.method) {
        this.dataList.data = this.mock;
        return;
      }
      let page = {pageIndex:this.page.pageIndex,pageSize:this.page.pageSize,isPage:1};
      $http({...page, ...this.params })
        .then(res => {
          if(!this.listProp){
            this.dataList = $dataFormat(res);
          }else{
            this.dataList = $dataFormat(res[this.listProp]);
          }
          let response = res;
          if(this.pageProp){
            response = res[this.pageProp];
          }
          let {pageIndex,pageSize,totalCount} = response;
          this.page = {pageIndex,pageSize,totalCount};
          this.$emit("dataChange",res);
        })
    },
    lisenting() {
      // 监测父组件的的刷新事件
      this.$parent.$on("refresh", () => {
        console.log("fresh");
        this._list();
      });
    },
    // 点击分页回调
    _pageChange(val) {
      this.params.pageIndex = val;
      this._list();
    },
    // 更改每页条数回调
    _sizeChange(val) {
      this.params.pageSize = val;
      this._list();
    },
    // 选项变化
    _selectionChange(val) {
      this.$emit("selection-change", val);
    },
    //展开
    expand(row, expanded) {
      this.$emit("expand", row, expanded);
    },
  }
};
</script>
<style scoped lang="scss">
#pagination{
  padding-top: 20px;
}
</style>


