<template>
  <div>
    <v-panel>
      <el-form ref="formInline" :model="form" label-width="90px" :inline="true">
        <el-form-item label="积分类别：">
          <el-input style="width: 140px;" placeholder="请输入积分类别" v-model="form.name"></el-input>
        </el-form-item>
        <button type="button" @click="getList" class="search-btn btn btn-green" style="margin-top:4px; margin-left: 10px;">查询</button>
      </el-form>
    </v-panel>
    <v-panel title="积分列表">
      <div slot="button">
        <el-button type="info" @click="addIntegral">新 增</el-button>
      </div>
      <div id="integraTable"></div>
    </v-panel>
    <category :title="title" @getList="getList" ref="category" />
  </div>
</template>

<script>
import category from './category'
export default {
  name: 'integralSetting',
  components: {
    category
  },
  data() {
    return {
      title: '',
      form: {
        name: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList() {
      let $this = this;
      this.tableList({
        command: ['user', 'UserScore', 'listScoreType'],
        element: '#integraTable',
        data: Utils.filterObjectNull({name: this.form.name}),
        columns: [
          {
            name: '积分类别',
            value: 'name',
            align: 'left',
            width: 300,
          },
          {
            name: '积分分值',
            value: 'score',
            width: 120,
          },
          {
            name: '使用说明',
            value: 'remark',
            align: 'left'
          },
          {
            name: '操作',
            width: 160,
            operator(row) {
              return [
                {
                  name: '编辑',
                  click(row) {
                    $this.title = '编辑积分项'
                    $this.$refs.category.openModal(1, row);
                  },
                },
                {
                  name: '删除',
                  click(row) {
                    $this.confirmTips({
                      title: '信息确认',
                      content: `确定要删除【${row.name}】吗？`,
                      submit() {
                        $this.command( 'user', 'UserScore', 'deleteScoreType',{id: row.id, isvalid:0}).then(()=>{
                          $this.successTips('操作成功!')
                          $this.getList()
                        }).catch((error)=>{
                          $this.errorTips(error.message)
                        })
                      }
                    })
                  },
                }
              ]
            },
          },
        ],
      })
    },
    addIntegral() {
      this.title = '新增积分项'
      this.$refs.category.openModal();
    }
  }
};
</script>
