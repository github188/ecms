<template>
  <div>
    <v-panel>
      <div id="integralDetails">
      </div>
    </v-panel>
    <operator @getList="getList" ref="operator" title="修改积分" />
  </div>
</template>
<script>
import operator from './operate'
export default {
  name: 'integralDetails',
  data() {
    return {
      id: '',
      date: ''
    }
  },
  components: {
    operator
  },
  created() {
    this.getList();
  },
  methods: {
    getList() {
      let $this = this;
      let query = this.$route.query
      this.id = query.details
      this.date = query.date
      this.tableList({
        command: ['user','UserScore','listUserScore'],
        element: '#integralDetails',
        data:{
          userId: this.id,
          date: this.date
        },
        columns: [
          {
            name: '积分类别',
            minWidth: 120,
            value: 'name',
            align: 'left'
          },
          {
            name: '积分日期',
            value: 'date',
            align: 'left',
            width: 120,
          },
          {
            name: '积分数值',
            value: 'score',
            width: 120,
          },
          {
            name: '积分说明',
            value: 'remark',
            align: 'left'
          },
          {
            name: '操作',
            width: 160,
            align: 'left',
            operator(row) {
              var operate = [{
                  name: '删除',
                  click(row){
                    $this.confirmTips({
                      title: '确认信息',
                      content: `确定要删除吗？`,
                      submit(){
                        $this.delIntegral(row.id)
                      }
                    })
                  }
                }];

              if(row.isdelete != 0){ 
                operate.push({
                  name: '修改',
                  click(row) {
                    $this.$refs.operator.openModal(row, 1);
                  },
                })
              }
              return operate
            },
          }
        ],
      })
    },
    delIntegral(id){
      this.command('user','UserScore','deleteUserScore',{id}).then((data)=>{
        this.successTips('操作成功!')
        this.getList()
      }).catch((error)=>{
        this.errorTips(error)
      })  
    }
  }
}
</script>

