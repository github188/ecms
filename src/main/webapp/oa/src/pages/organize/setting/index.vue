<template>
  <div id="bgSetting">
    <v-panel>
      <el-popover
        ref="popover"
        placement="top"
        width="160"
        v-model="popoverState">
        <p>确定要更换背景图吗？</p>
        <br />
        <div style="text-align: right; margin: 0">
          <el-button size="mini" type="text" @click="popoverState = false">取消</el-button>
          <el-button type="primary" size="mini" @click="popoverState = false">确定</el-button>
        </div>
      </el-popover>

      <el-row :gutter="20">
        <el-col >
          <el-card :body-style="{ padding: '20px' }">
            <Login />
            <div style="padding: 14px;">
              <div class="bottom clearfix">
                <el-upload :on-success="handleSuccess" :action="domain + '/news/picture/top/upload'">
                  <el-button size="small" type="primary">更换背景图</el-button>
                </el-upload>
                <el-button v-popover:popover style="position: absolute; left: 100px; top: 0" size="small" type="info">保存</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
        <!-- <el-col :span="12">
          <el-card :body-style="{ padding: '20px' }">
            <img :src="bgSrc" class="image">
            <div style="padding: 14px;">
              <div class="bottom clearfix">
                <el-upload :on-success="handleSuccessCore" action="https://jsonplaceholder.typicode.com/posts/">
                  <el-button size="small" type="primary">更换核心图</el-button>
                </el-upload>
              </div>
            </div>
          </el-card>
        </el-col> -->
      </el-row>
    </v-panel>
  </div>
</template>
<style lang="scss">
#bgSetting {
  .login-wrap {
    margin-top: 50px;
    height: calc(100vh - 50px);
  }
  .bottom{
    position: relative;
  }
  .el-card__body img {
    width: 100%;
  }
}
</style>

<script>
import Login from '@/pages/login/'
export default {
  name: 'rolesManage',
  components: {
    Login
  },
  data() {
    return {
      popoverState: false,
      bgSrc: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513853990680&di=ecb3dce427a451e4d4cae31eb82d981b&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Dc3295a38d333c895b2739038b97a1985%2Fd043ad4bd11373f04e0f4230ae0f4bfbfbed0468.jpg',
      coreSrc: ''
    }
  },
  created() {
  },
  methods: {
    handleSuccess() {
      
    }
  }
};

</script>

