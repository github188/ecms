<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="id" label="ID" width="150">
      </el-table-column>
      <el-table-column label="标题" width="420" show-overflow-tooltip>
        <template scope="scope">
          <a href="javascript:void(0);" @click.prevent="btnHandle(scope.row.id)">
            <!--scope.$index-->
            <span>{{scope.row.title}}</span>
          </a>
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip prop="state" label="状态">
      </el-table-column>
      <el-table-column prop="priority" label="优先级">
      </el-table-column>
      <el-table-column prop="endtime" label="预计结束">
      </el-table-column>
      <el-table-column label="操作">
        <template scope="scope">
          <a href="javacript:void(0);" @click="handleEdit(scope.$index, scope.row)" class="btn-handle">编辑</a>
          <a href="javacript:void(0);" @click="handleDelete(scope.$index, scope.row)" class="btn-handle">删除</a>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-size="10" layout="total, sizes, prev, pager, next, jumper" :total="100">
    </el-pagination>
  </div>
</template>

<style>
.btn-handle {
  padding-right: 5px;
}
</style>

<script>
export default {
  name: "workspaceDBofPro",
  data() {
    return {
      currentPage: 2,
      tableData: [
        {
          id: "10001",
          title: "自主缴费功能1",
          state: 1,
          priority: 1,
          endtime: "2016-05-02",
        },
        {
          id: "10002",
          title: "自主缴费功能自主缴费功能自主缴费功能自主缴费功能2",
          state: 2,
          priority: 3,
          endtime: "2016-05-02",
        },
        {
          id: "10003",
          title: "自主缴费功能3",
          state: 3,
          priority: 2,
          endtime: "2016-05-02",
        },
      ],
    };
  },
  methods: {
    btnHandle(row) {
      alert(row);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      //请求接口获取这个pageSize条数据
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      //请求接口获取下一页
    },
  },
};
</script>
