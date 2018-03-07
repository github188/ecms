<template>
  <div id="analyseBox">
    <el-tabs @tab-click="tabChange" v-model="type" type="card">
      <el-form label-width="90px" :inline="true">
        <el-form-item label="部门：">
          <el-cascader clearable style="width: 140px" :options="departCascader" :change-on-select="true" :show-all-levels="false" :props="{
                      value: 'id',
                      label: 'name',
                      children: 'children'
                    }" v-model="search.depName">
          </el-cascader>
        </el-form-item>
        <el-form-item label="姓名：">
          <el-input style="width:150px;" v-model="search.userName"></el-input>
        </el-form-item>
        <el-button style="margin-top:3px;margin-left: 10px" class="search-btn" type="success" @click="getList">查询</el-button>
      </el-form>

      <el-tab-pane label="已看" name="1">
        <div id="readList"></div>
      </el-tab-pane>
      <!-- <el-tab-pane label="未看" name="2">
          <div id="waitList"></div>
        </el-tab-pane> -->
      <el-tab-pane label="点赞" name="3">
        <div id="thumbList"></div>
      </el-tab-pane>
      <el-tab-pane label="评论" name="4">
        <div id="commentsList"></div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<style lang="scss">
.el-tooltip__popper {
  max-width: 400px;
}
</style>

<script>
export default {
  name: 'analyse',
  data() {
    return {
      departList: [], //部门树
      departCascader: [], //部门级联选择
      search: {
        depName: [],
        userName: ''
      }
    };
  },
  created() {
    this.type = this.articleType;
    this.getList();
    this.getDepartment();
  },
  props: ['articleId', 'articleType'],
  methods: {
    getList() {
      this.tabChange(this.type);
    },
    getDepartment() { // 获取部门树
      this.ajax({
        url: '/authority/dep/tree/list',
        success(data, $this) {
          if (data.code == "success") {
            $this.departCascader = $this.delTree(data.content);
          }
        }
      });
    },
    tabChange(type) {
      let name;
      if (typeof type == 'object') {
        name = type.name;
      } else {
        name = type;
      }
      if (name == '1') {
        this.readList();
      } else if (name == '2') {
        this.waitList();
      } else if (name == '3') {
        this.thumbList();
      } else if (name == '4') {
        this.commentsList();
      }
    },
    readList() {  //已读
      let { depName, userName } = this.search;
      let $this = this;
      this.tableList({
        url: '/news/likes/list',
        element: '#readList',
        data: Utils.filterObjectNull({
          refId: this.articleId,
          type: 1,
          depId: depName[depName.length - 1] || 1,
          userName: userName
        }),
        columns: [{
          name: '部门',
          align: 'left',
          value: 'depName',
          render(row){
            return $this.reverseDepart(row.depName);
          }
        }, {
          name: '姓名',
          value: 'userName'
        }]
      });
    },
    waitList() { //未读
      let { depName, userName } = this.search;
       let $this = this;
      this.tableList({
        url: '/news/likes/noread/list',
        element: '#waitList',
        data: Utils.filterObjectNull({
          refId: this.articleId,
          depId: depName[depName.length - 1] || 1,
          userName: userName
        }),
        columns: [{
          name: '部门',
          value: 'depName',
          align: 'left',
           render(row){
            return $this.reverseDepart(row.depName);
          }
        }, {
          name: '姓名',
          value: 'userName'
        }]
      });
    },
    thumbList() {  //点赞
      let { depName, userName } = this.search;
       let $this = this;
      this.tableList({
        url: '/news/likes/list',
        element: '#thumbList',
        data: Utils.filterObjectNull({
          refId: this.articleId,
          type: 2,
          depId: depName[depName.length - 1] || 1,
          userName: userName
        }),
        columns: [{
          name: '部门',
          value: 'depName',
          align: 'left',
          minWidth: 110,
           render(row){
            return $this.reverseDepart(row.depName);
          }
        }, {
          name: '姓名',
          value: 'userName'
        }, {
          name: '点赞时间',
          render(row) {
            return new Date(row.addTime).toStr();
          }
        }]
      });
    },
    commentsList() {  //评论
      let { depName, userName } = this.search;
      let $this = this;
      this.tableList({
        url: '/news/comment/all/list',
        data: Utils.filterObjectNull({
          newId: this.articleId,
          depId: depName[depName.length - 1] || 1,
          userName: userName
        }),
        element: '#commentsList',
        columns: [{
          name: '部门',
          width: 300,
          align: 'left',
          render(row) {
            return $this.reverseDepart(row.depName);
          }
        }, {
          name: '姓名',
          width: 110,
          value: 'addPersonName'
        }, {
          name: '评论时间',
          width: 180,
          render(row) {
            return new Date(row.addTime).toStr();
          }
        }, {
          name: '评论内容',
          value: 'content',
          align: 'left'
        }, {
          name: '操作',
          width: 100,
          operator(row) {
            let name = ['隐藏', '显示'][row.status];
            return [{
              name: name,
              click() {
                const status = row.status == 1 ? 0 : 1;
                $this.ajax({
                  url: '/news/comment/' + row.id + '/' + status + '/hide',
                  type: 'put',
                  success(data, $this) {
                    if (data.code == 'success') {
                      $this.successTips();
                      $this.commentsList();
                    } else {
                      $this.errorTips();
                    }
                  }
                });
              }
            }]
          }
        }]
      });
    }
  }
};
</script>
