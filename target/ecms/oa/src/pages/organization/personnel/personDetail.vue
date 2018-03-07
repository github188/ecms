<template>
  <el-dialog title="个人信息详情" :visible.sync="modal" size="small" id="oPersonDetail">
      <el-row :gutter="24" v-loading="loading">
        <el-col :span="9">
          <el-form label-width="120px" label-position="right">
            <el-form-item label="姓　　名：">
              <span> {{person.realname}} </span>
            </el-form-item>
            
            <el-form-item label="手　　机：">
              <span> {{person.phone}} </span>
            </el-form-item>
            
            <el-form-item label="邮　　箱：">
              <span> {{person.email}} </span>
            </el-form-item>

            <el-form-item label="直接上级：">
              <span> {{person.leaderName || '/'}} </span>
            </el-form-item>
            
            <el-form-item label="部　　门：">
              <span> {{reverseDepart(person.depName)}} </span>
            </el-form-item>

            <el-form-item label="专业级别：">
              <span> {{person.professLevel || '/'}} </span>
            </el-form-item>

             <el-form-item label="常 驻 地：">
              <span> {{person.address || '/'}} </span>
            </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="9">
          <el-form label-width="120px" label-position="right">
            <el-form-item label="工　　号：">
              <span> {{person.usercode}} </span>
            </el-form-item>
              <el-form-item label="性　　别：">
              <span> {{ person.sex == 1? '男': '女'}} </span>
            </el-form-item>
            <el-form-item label="生　　日：">
              <span> {{person.idcard || '/'}} </span>
            </el-form-item>

            <el-form-item label="所属公司：">
              <span> 这个地方是错的 </span>
            </el-form-item>
          
            <el-form-item label="岗　　位：">
              <span> {{person.post}} </span>
            </el-form-item>
            <el-form-item label="管理级别：">
              <span> {{person.manageLevel || '/'}} </span>
            </el-form-item>
           
          </el-form>
        </el-col>
        <el-col :span="6">
          <img class="avatar" :src="getAvatar(person)" />
        </el-col>
      </el-row>
    </el-dialog>
</template>
<style lang="scss">
#oPersonDetail {
  .el-form-item {
    margin-bottom: 0;
  }
  .el-dialog {
    width: 1000px;
  }
  .avatar {
    cursor: pointer;
    height: 120px;
    width: 120px;
    display: block;
    border: 1px solid #eee;
    border-radius: 50%;
  }
}
</style>

<script>
export default {
  name: "personDetail",
  data() {
    return {
      modal: false,
      loading: false,
      person: {}
    };
  },
  methods: {
    openModal(row) {
      this.modal = true;
      this.loading = true;
      this.userDetail(row.id);
    },
    userDetail(id) {
      this.ajax({
        url: `authority/user/${id}/detail`,
        success(data, $this) {
          if (data.code == "success") {
            $this.person = data.content;
          }
          $this.loading = false;
        }
      });
    }
  }
};
</script>

