<template>
  <div style="padding-left: 320px;">
      <el-table
    :data="data"
    border
    style="width: 100%"
    :row-style="showTr">
    <el-table-column v-for="(column, index) in columns" :key="column.dataIndex"
      :label="column.text">
      <template slot-scope="scope">
        <span v-if="spaceIconShow(index)" v-for="(space, levelIndex) in scope.row._level" :key="levelIndex" class="ms-tree-space"></span>
        <div class="expanded-btn" v-if="toggleIconShow(index,scope.row)" @click="toggle(scope.$index)">
          <i v-if="!scope.row._expanded" class="el-icon el-icon-arrow-right" title="展开"></i>
          <i v-if="scope.row._expanded" class="el-icon el-icon-arrow-down" title="折叠"></i>
        </div>
        <span v-else-if="index===0" class="ms-tree-space"></span>
        {{scope.row[column.dataIndex]}}
      </template>
    </el-table-column>
    <el-table-column label="操作" align="center">
      <template slot-scope="scope">
        <a href="javascript:;" @click="departDetail(scope)" class="operator">详情</a>
        <a href="javascript:;" @click="departEdit(scope)" class="operator">编辑</a>
        <a href="javascript:;" @click="changeStatus(scope)" class="operator">停用</a>
        <a href="javascript:;" @click="departDelete(scope)" class="operator">删除</a>
      </template>
    </el-table-column>
  </el-table>
  <DepartDetail ref="DepartDetail" />
  <DepartEdit ref="DepartEdit" />
  </div>
</template>
<style scoped>
.operator{
  padding: 0 5px;
}
.expanded-btn {
  display: inline-block;
  width: 40px;
  text-align: center;
  margin-left: -20px;
  cursor: pointer;
}
.ms-tree-space {
  position: relative;
  top: 1px;
  display: inline-block;
  font-family: "Glyphicons Halflings";
  font-style: normal;
  font-weight: 400;
  line-height: 1;
  width: 18px;
  height: 14px;
}
.expanded-btn:hover {
  opacity: 0.8;
}
.ms-tree-space::before {
  content: "";
}
table td {
  line-height: 26px;
}
</style>

<script>
import DataTransfer from './dataTransfer';
import DepartDetail from './departDetail'
import DepartEdit from './departManage'
export default {
  name: "departTreeList",
  components:{
    DepartDetail,
    DepartEdit
  },
  data() {
    return {
      treeType: "normal",
      treeStructure: true, //是否树形结构
      columns: [
        {
          text: "部门名称",
          dataIndex: "name"
        },
        {
          text: "负责人",
          dataIndex: "age"
        },
        {
          text: "状态",
          dataIndex: "sex"
        }
      ],
      dataSource: []
    };
  },
  computed: {
    // 格式化数据源
    data: function() {
      let me = this;
      if (me.treeStructure) {
        let data = DataTransfer.treeToArray(
          me.dataSource,
          null,
          null,
          me.defaultExpandAll
        );
        return data;
      }
      return me.dataSource;
    }
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.ajax({
        url: "/authority/dep/tree/list",
        success(data, $this) {
          if (data.code == "success") {
            $this.dataSource = data.content;
          }
        }
      });
    },
    departDetail(scope){
      //部门详情
      this.$refs.DepartDetail.openModal(scope.row);
    },
    departEdit(scope){
      //编辑部门信息
      this.$refs.DepartEdit.openModal(scope.row);
    },
    changeStatus(scope){ //更改状态
      this.confirmTips({
        title: '确认信息',
        content: `确定要更改状态为XX吗？`,
        submit(){
          //todo
        }
      })
    },
    departDelete(){
      this.confirmTips({
        title: '确认信息',
        content: `确定要删除XX吗？`,
        submit(){
          //todo
        }
      })
    },
    showTr: function(row, index) {
      let show = row._parent
        ? row._parent._expanded && row._parent._show
        : true;
      row._show = show;
      return show ? "" : "display:none;";
    },
    // 展开下级
    toggle: function(trIndex) {
      let me = this;
      let record = me.data[trIndex];
      record._expanded = !record._expanded;
    },
    // 显示层级关系的空格和图标
    spaceIconShow(index) {
      let me = this;
      if (me.treeStructure && index === 0) {
        return true;
      }
      return false;
    },
    // 点击展开和关闭的时候，图标的切换
    toggleIconShow(index, record) {
      let me = this;
      if (
        me.treeStructure &&
        index === 0 &&
        record.children &&
        record.children.length > 0
      ) {
        return true;
      }
      return false;
    }
  }
};
</script>



