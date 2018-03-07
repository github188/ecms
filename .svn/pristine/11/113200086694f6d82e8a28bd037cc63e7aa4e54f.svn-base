<template>
  <div>
    <v-panel>
      <el-form ref="formInline" :model="form" label-width="80px" :inline="true">
        <el-form-item label="姓名：">
          <el-input v-model="form.realname"></el-input>
        </el-form-item>
        <!--
          <el-form-item label="直接上级：">
            <el-input v-model="form.driectName"></el-input>
        </el-form-item>

          <el-form-item label="常驻地：">
            <el-input v-model="form.address"></el-input>
        </el-form-item> -->
        <el-button class="search-btn" type="success" @click="getList">查 询</el-button>
      </el-form>
    </v-panel>
    <v-panel>
      <div id="tableList">
        <p class="search-tips">想要协作找不到人? 搜索一下马上找到ta!</p>
      </div>
    </v-panel>
  </div>
</template>
<style scoped>
.search-tips {
  padding: 40px;
  text-align: center;
  font-size: 14px;
}
.search-btn {
  margin-top: 4px;
  margin-left: 10px;
}
</style>
<script>
export default {
  name: 'contacts',
  data() {
    return {
      form: {
        realname: '',
      },
    }
  },
  methods: {
    getList() {
      const data = Utils.filterObjectNull(this.form) //过滤值为空的对象
      if (Object.keys(data).length == 0) {
        this.errorTips('查询字段不能为空!')
        return
      }
      this.tableList({
        columns: [
          {
            name: '员工编号',
            value: 'usercode',
          },
          {
            name: '姓名',
            value: 'realname',
          },
          {
            name: '电话',
            render(row) {
              let value = row.phone
              let temp = []
              temp[0] = value.slice(0, 3)
              temp[1] = value.slice(3, 7)
              temp[2] = value.slice(7)
              return temp.join('-')
            },
          },
          {
            name: '邮箱',
            value: 'email',
          },
          {
            name: '部门',
            value: 'depName',
          },
          {
            name: '岗位',
            value: 'post',
          },
          {
            name: '常驻地',
            value: 'address',
          },
        ],
        url: 'authority/user/phone/list',
        data: data,
      })
    },
  },
}
</script>
