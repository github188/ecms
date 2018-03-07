<template>
  <div>
      <v-panel>
          <el-form ref="formInline" :model="form" label-width="90px" :inline="true">
            <el-form-item label="姓名：">
            <el-input placeholder="请输入员工姓名或者手机号" v-model="form.queryInfo"></el-input>
            </el-form-item>
            <button type="button" @click="getList(form)" class="search-btn btn btn-green" style="margin-top:4px; margin-left: 10px;">查询</button>
        </el-form>
      </v-panel>

      <v-panel title="人员管理">
           <div slot="button">
               <el-button type="info" @click="addPerson">添加成员</el-button>
           </div>
            <departTree @getList="getList"  />
            <personList ref="personList" />
            <personnel ref="personnel" />
      </v-panel>
  </div>
</template>
<script>
import departTree from "./departTree";
import personList from "./personList"
import personnel from './personnel'
export default {
  name: "personnelManage",
  components: {
    departTree,
    personList,
    personnel
  },
  data() {
    return {
      form: {
        queryInfo: "",
        id: 1,
        name: '亿车'
      }
    };
  },
  mounted(){
      this.getList(this.form);
  },
  methods: {
    getList(obj) {
        this.$refs.personList.getList(obj)
    },
    addPerson(){
        this.$refs.personnel.openModal()
    }
  }
};
</script>
