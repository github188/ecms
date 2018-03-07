
<template>
  <div id="personManage">
    <v-panel title="组织架构管理">
      <div slot="button">
        <el-form ref="formInline" :model="form" label-width="60px" :inline="true">
          <el-form-item label="姓名：">
            <el-input v-model="form.queryInfo" placeholder="请输入员工姓名或者手机号"></el-input>
          </el-form-item>
          <button type="button" @click="getPersonList()" class="search-btn btn btn-green">查询</button>
          <el-button type="info" @click="addPerson">添加成员</el-button>
          <!-- <el-button type="info" @click="exportList">导出列表</el-button> -->
        </el-form>
      </div>
      <div class="department">
        <el-tree node-key="id" ref="tree" :default-expanded-keys="['1']" :render-content="renderContent" highlight-current :expand-on-click-node="true" :data="departList" :props="{label: 'name',children: 'children'}">
        </el-tree>
      </div>
      <div class="panel-title panel-margin" style="padding-left: 320px;">
        <span v-if="census.selectedCount == 0">{{census.name}}（共{{census.total}}人）</span>
        <template v-else>
          <span class="selectedCount" style="float:left">当前已选中（{{census.selectedCount}}）条数据</span>
          <el-button style="margin-left: 60px;" type="info" @click="batch.departModal = true">移动部门</el-button>
          <el-button type="info" @click="batch.leaderModal = true">修改直接上级</el-button>
          <el-button type="info" @click="role.modal = true, batch.roles = true, getRoleList()">分配角色</el-button>
        </template>
        <div id="tablePersonList"></div>
      </div>

    </v-panel>
    <el-dialog :title="depart.title" :visible.sync="depart.modal" size="tiny" class="organize-modal">
      <el-form ref="form" :model="depart.form" :rules="depart.rules" label-width="110px" label-position="right">
        <el-form-item label="部门名称：" prop="name">
          <el-input v-model="depart.form.name" style="width: 90%"></el-input>
        </el-form-item>
        <el-form-item v-if="type == 0" label="上级部门：" prop="parentName">
          <el-cascader style="width: 90%" :options="departCascader" :change-on-select="true" :props="{
                      value: 'id',
                      label: 'name',
                      children: 'children'
                    }" v-model="depart.form.parentName">
          </el-cascader>
          <!-- <el-input v-model="depart.form.parentName" style="width: 90%"></el-input> -->
        </el-form-item>
        <el-form-item label="部门负责人：" prop="currentLeader">
          <el-select style="width:90%" v-model="depart.form.currentLeader" filterable clearable placeholder="请输入关键字">
            <el-option v-for="item in personList" :key="item.id" :label="item.realname" :value="item.id + '|' + item.realname">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商务助理：">
          <el-select style="width:90%" v-model="depart.form.assistant" filterable clearable placeholder="请输入关键字">
            <el-option v-for="item in personList" :key="item.id" :label="item.realname" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" :disabled="disable" v-if="disable">
          <i class="el-icon-loading"></i>
        </el-button>
        <el-button type="success" :disabled="disable" @click="submit" v-else>确 定</el-button>
        <el-button type="info" @click="depart.modal = false">取 消</el-button>
      </span>
    </el-dialog>
    <el-dialog title="个人信息详情" :visible.sync="person.detailModal" size="small" class="person-modal">
      <el-row :gutter="24" v-loading="loading">
        <el-col :span="9">
          <el-form label-width="120px" label-position="right">
            <el-form-item label="姓　　名：">
              <span> {{person.info.realname}} </span>
            </el-form-item>
            <el-form-item label="邮　　箱：">
              <span> {{person.info.email}} </span>
            </el-form-item>
            <el-form-item label="手　　机：">
              <span> {{person.info.phone}} </span>
            </el-form-item>
            <el-form-item label="部　　门：">
              <span> {{reverseDepart(person.info.depName)}} </span>
            </el-form-item>
            <el-form-item label="专业级别：">
              <span> {{person.info.professLevel || '/'}} </span>
            </el-form-item>
            <el-form-item label="直接上级：">
              <span> {{person.info.leaderName || '/'}} </span>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="9">
          <el-form label-width="120px" label-position="right">
            <el-form-item label="工　　号：">
              <span> {{person.info.usercode}} </span>
            </el-form-item>
            <el-form-item label="生　　日：">
              <span> {{person.info.idcard || '/'}} </span>
            </el-form-item>
            <el-form-item label="性　　别：">
              <span> {{ person.info.sex == 1? '男': '女'}} </span>
            </el-form-item>
            <el-form-item label="岗　　位：">
              <span> {{person.info.post}} </span>
            </el-form-item>
            <el-form-item label="管理级别：">
              <span> {{person.info.manageLevel || '/'}} </span>
            </el-form-item>
            <el-form-item label="常 驻 地：">
              <span> {{person.info.address || '/'}} </span>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="6">
          <img @click="person.avatarModal = true" :src="getAvatar(person.info)" alt="" style="cursor:pointer; height: 120px; width: 120px; border-radius: 50%">
        </el-col>
      </el-row>
    </el-dialog>
    <el-dialog :title="person.title" :visible.sync="person.modal" size="tiny" class="person-edit-modal">
      <el-form ref="personForm" :model="person.form" :rules="person.rules" label-width="100px" label-position="right">
        <el-row :gutter="24" v-loading="loading">
          <el-col :span="9">
            <el-form-item label="姓名：" prop="realname">
              <el-input v-model="person.form.realname"></el-input>
            </el-form-item>
            <el-form-item label="手机：" prop="phone">
              <el-input v-model="person.form.phone"></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" prop="email">
              <el-input v-model="person.form.email">
                <template slot="append">@ecaray.com</template>
              </el-input>
            </el-form-item>

            <el-form-item label="直接上级：" prop="leaderName">
              <el-select style="width:248px" v-model="person.form.leaderName" filterable @change="chooseLeader" placeholder="请输入关键字">
                <el-option v-for="item in personList" :key="item.id" :label="item.realname" :value="item.id + '|' + item.realname">
                  <span style="float:left" class="search-label">{{item.realname}}</span>
                  <span style="float:right; padding-right:40px;" class="search-label">{{item.phone}}</span>
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="部门：" prop="depName">
              <!-- <el-input v-model="person.form.depName"></el-input> -->
              <el-cascader style="width: 100%" :options="departCascader" :change-on-select="true" :props="{
                      value: 'id',
                      label: 'name',
                      children: 'children'
                    }" v-model="person.form.depName">
              </el-cascader>
            </el-form-item>

            <el-form-item label="专业级别：" prop="professLevel">
              <el-input v-model="person.form.professLevel"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="9">
            <el-form-item label="工号：" prop="usercode">
              <el-input v-model="person.form.usercode"></el-input>
            </el-form-item>

            <el-form-item label="性别：" prop="sex">
              <el-radio class="radio" v-model="person.form.sex" :label="1">男</el-radio>
              <el-radio class="radio" v-model="person.form.sex" :label="2">女</el-radio>
            </el-form-item>

            <el-form-item label="生日：" prop="idcard">
              <el-input placeholder="格式:  MM-dd" v-model="person.form.idcard"></el-input>
            </el-form-item>

            <el-form-item label="岗位：" prop="post">
              <el-input v-model="person.form.post"></el-input>
            </el-form-item>

            <el-form-item label="常驻地：" prop="address">
              <el-input v-model="person.form.address"></el-input>
            </el-form-item>

            <el-form-item label="管理级别：" prop="manageLevel">
              <el-input v-model="person.form.manageLevel"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-upload class="avatar-uploader" :action="url" accept="image/jpeg,image/png,image/jpg" :on-success="avatarSuccess" :show-file-list="false">
              <img :src="getAvatar(person.form)" class="avatar" title="更换头像">
              <!-- <i title="添加头像" class="el-icon-plus avatar-uploader-icon" v-else></i> -->
            </el-upload>
            <!-- <el-dialog v-model="dialogVisible" size="tiny">
                        <img width="100%" :src="dialogImageUrl" alt="">
                    </el-dialog> -->
          </el-col>
        </el-row>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" :disabled="disable" v-if="disable">
          <i class="el-icon-loading"></i>
        </el-button>
        <el-button type="success" :disabled="disable" @click="personSubmit" v-else>确 定</el-button>
        <el-button type="info" @click="person.modal = false">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog v-model="person.avatarModal" size="small">
      <img width="100%" :src="getAvatar(person.info)" alt="">
    </el-dialog>

    <el-dialog title="批量修改直接上级" v-model="batch.leaderModal" size="tiny" class="organize-modal">
      <el-form ref="leaderForm" :model="batch.form" :rules="batch.rules" label-width="100px" label-position="right">
        <el-form-item label="直接上级：" prop="leader">
          <el-select style="width:90%" v-model="batch.form.leader" filterable @change="chooseLeader" placeholder="请输入关键字">
            <el-option v-for="item in personList" :key="item.id" :label="item.realname" :value="item.id + '|' + item.realname">
              <span style="float:left" class="search-label">{{item.realname}}</span>
              <span style="float:right; padding-right:40px;" class="search-label">{{item.phone}}</span>
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" :disabled="disable" v-if="disable">
          <i class="el-icon-loading"></i>
        </el-button>
        <el-button type="success" :disabled="disable" @click="batchLeader" v-else>确 定</el-button>
        <el-button type="info" @click="batch.leaderModal = false">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog title="批量移动部门" v-model="batch.departModal" size="tiny" class="organize-modal">
      <el-form ref="departForm" :model="batch.form" :rules="batch.rules" label-width="100px" label-position="right">
        <el-form-item label="选择部门" prop="depart">
          <el-cascader style="width: 90%" :options="departCascader" :change-on-select="true" :props="{
                  value: 'id',
                  label: 'name',
                  children: 'children'
                }" v-model="batch.form.depart">
          </el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" :disabled="disable" v-if="disable">
          <i class="el-icon-loading"></i>
        </el-button>
        <el-button type="success" :disabled="disable" @click="batchDepart" v-else>确 定</el-button>
        <el-button type="info" @click="batch.departModal = false">取 消</el-button>
      </span>
    </el-dialog>

    <el-dialog title="分配角色" :visible.sync="role.modal" size="small" class="person-modal">
      <div id="roleList"></div>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" :disabled="disable" v-if="disable">
          <i class="el-icon-loading"></i>
        </el-button>
        <el-button type="success" :disabled="disable" @click="roleSubmit" v-else>确 定</el-button>
        <el-button type="info" @click="role.modal = false">取 消</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<style scoped>
.search-btn.btn {
  margin-right: 15px;
  margin-top: -4px;
}

.department {
  width: 300px;
  float: left;
}

.panel {
  overflow: hidden;
}

.edit-tree-btn {
  width: 300px;
  margin-bottom: 20px;
  height: 40px;
}

.avatar {
  height: 150px;
  width: 150px;
  margin-left: 40px;
  border-radius: 50%;
  display: block;
  border: 1px solid #ededed;
}

.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 150px;
  height: 150px;
  line-height: 150px;
  margin-left: 40px;
  border: 1px dashed #dddee1;
  text-align: center;
}

.panel-margin .el-button {
  float: left;
}

.panel-title span.selectedCount:before {
  top: 12px;
}

@media screen and (max-width: 1366px) {
  .department {
    width: 250px;
  }
  .panel-margin {
    padding-left: 270px !important;
  }
}
</style>

<style>
.person-modal .el-form-item {
  margin-bottom: 0;
}

.person-modal .el-dialog,
.person-edit-modal .el-dialog {
  width: 1000px;
}

.department .el-tree {
  height: 550px;
  overflow: auto;
  margin-bottom: 100px;
}

.department .edit-tree i {
  padding: 0 8px;
  color: #8391a5;
  visibility: hidden;
}

.department .edit-tree {
  float: right;
}

.department .el-tree-node__content:hover .edit-tree i {
  visibility: visible;
}

.department .el-tree-node__content .edit-tree i:hover {
  color: #01cd78;
}

#personManage .el-tree-node {
  white-space: normal;
}
.organize-modal .el-dialog {
  width: 576px;
}
</style>


<script>
export default {
  name: 'deparment',
  data() {
    return {
      type: '', //当前部门是编辑模式还是添加模式
      departList: [], //部门树
      departCascader: [], //部门级联选择
      personList: [], //全部人员
      form: { //查询条件
        queryInfo: undefined,
        id: 1
      },
      loading: true,
      url: '',
      role: {  //角色相关
        modal: false,
        userId: '',
        list: []  //此用户所配置的角色
      },
      batch: {  //批量操作
        leaderModal: false,
        departModal: false,
        form: {
          leader: '',
          depart: []
        },
        roles: false,
        rules: {
          leader: [{
            required: true,
            message: '直接上级不能为空！'
          }],
          depart: [{
            required: true,
            message: '部门不能为空！'
          }]
        }
      },
      census: {  //统计
        name: '亿车',
        total: 0,
        selected: [],   //当前选中的人
        selectedCount: 0
      },
      person: {
        title: '',
        detailModal: false, //个人详情模态框
        modal: false, //编辑，新增模态框
        avatarModal: false, //个人头像大图
        info: [], //个人信息
        type: 0, //当前是编辑模式（0）还是添加模式（1）
        form: {
          realname: '',
          usercode: '',
          sex: 1,
          phone: '',
          depName: [],
          post: '',
          idcard: '',
          email: '',
          directLeader: '',
          address: '',
          leaderName: '',
          currentLeader: '',
          professLevel: '',
          manageLevel: '',
          headPic: ''
        },
        rules: {
          realname: [{
            required: true,
            message: '姓名不能为空！'
          }],
          usercode: [{
            required: true,
            message: '工号不能为空！'
          }],
          sex: [{
            required: true,
            message: '性别为必选项！'
          }],
          phone: [{
            required: true,
            message: '手机号码格不能为空！'
          }, {
            pattern: /^1\d{10}$/,
            message: '手机号码格式不正确!'
          }],
          depName: [{
            required: true,
            message: '部门不能为空！'
          }],
          idcard: [{
            required: true,
            message: '生日不能为空！'
          }],
          post: [{
            required: true,
            message: '岗位不能为空！'
          }],
          email: [{
            required: true,
            message: '邮箱不能为空！'
          }],
          directLeader: [{
            required: true,
            message: '直接上级不能为空！'
          }],
          address: [{
            required: true,
            message: '常驻地不能为空！'
          }],
          currentLeader: [{
            required: true,
            message: '直接上级不能为空！'
          }]
        },
      },
      depart: { //部门相关
        modal: false,
        title: '',
        rules: {
          name: [{
            required: true,
            message: '部门名称不能为空！'
          }],
          parentName: [{
            required: true,
            message: '上级部门不能为空！'
          }],
          currentLeader: [{
            required: true,
            message: '部门负责人不能为空！'
          }]
        },
        form: {
          name: '', //部门名称
          id: '', //部门id
          parentId: '', //上级部门id
          parentName: [], //上级部门名称
          currentLeader: '', //当前的部门负责人
          assistant: ''  //商务助理
        }
      }
    };
  },
  created() {
    this.url = this.domain + '/authority/user/picture/head/upload';
    this.getDepartment();
    this.getPersonList();
    this.getAllPerson();
  },
  methods: {
    emailPostfix(email) {  //去掉邮箱后缀
      return email.split('@')[0];
    },
    exportList() { //导出列表
      let $this = this;
      this.confirmTips({
        title: '确认信息',
        content: '是否导出？',
        submit() {
          let params = '';
          let object = $this.form.queryInfo;
          for (let i in object) {
            if (object[i] !== '' && object[i] !== null) {
              params += i + '=' + object[i] + '&';
            }
          }
          $this.downFile('/authority/user/dep/' + $this.form.id + '/download?queryInfo');
        }
      });
    },
    getDepartment() { // 获取部门树
      this.ajax({
        url: '/authority/dep/tree/list',
        success(data, $this) {
          if (data.code == "success") {
            $this.departList = data.content;
            $this.departCascader = $this.delTree(data.content);
          }
        }
      });
    },
    chooseLeader(obj) { //编辑或添加个人信息的直接上级
      if (obj && obj.indexOf('|') > 0) {
        let leader = obj.split('|');
        this.person.form.leaderName = leader[1];
        this.person.form.directLeader = leader[0];
      }
    },
    getAllPerson() { //获取全部人员
      this.ajax({
        url: '/authority/user/dep/1',
        data: {
          pageNum: 1,
          pageSize: 1000
        },
        success(data, $this) {
          if (data.code == 'success') {
            $this.personList = data.content;
          }
        }
      });
    },
    getDepartLeader() { //获取部门负责人
      this.ajax({
        url: '/authority/dep/' + this.depart.form.id + '/detail',
        success(data, $this) {
          if (data.code == 'success') {
            const content = data.content;
            if (content.leaderName != null) {
              $this.depart.form.currentLeader = content.leaderId + '|' + content.leaderName;
            }
          }
        }
      });
    },
    addPerson() {
      this.loading = false;
      this.person.modal = true;
      this.person.title = '添加成员';
      this.person.type = 1; //添加模式
      this.resetForm('personForm');
      this.person.form.headPic = '';
    },
    avatarSuccess(response, file) { //上传用户头像
      // this.person.avatar = URL.createObjectURL(file.raw);
      this.person.form.headPic = response.content.picId;
    },
    getRoleList(selected) {  //获取角色
      const $this = this;
      this.tableList({
        url: '/authority/role/list',
        element: '#roleList',
        checkbox: {
          selected: selected,
          change(obj) {
            $this.role.list = [];
            for (let i in obj) {
              $this.role.list.push({
                id: i
              });
            }
          }
        },
        columns: [{
          name: '角色名称',
          value: 'name'
        }, {
          name: '角色说明',
          value: 'profile'
        }, {
          name: '角色状态',
          render(row) {
            return ['启用', '停用'][row.status];
          }
        }]
      });
    },
    getPersonList() { //查询部门对应的员工
      const { queryInfo } = this.form;
      let $this = this;
      this.tableList({
        url: '/authority/user/dep/' + this.form.id,
        element: '#tablePersonList',
        checkbox: {
          change(selected) {
            $this.census.selected = selected;
            $this.census.selectedCount = Object.keys(selected).length;

          }
        },
        expand: true,
        data: {
          queryInfo: queryInfo
        },
        complete(data) {
          $this.census.total = data.totals;
        },
        columns: [{
          name: "姓名",
          value: "realname",
          width: 100,
          fixed: true
        }, {
          name: "工号",
          value: "usercode",
          width: 80
        }, {
          name: '岗位名称',
          value: 'post',
          minWidth: 140,
          align: 'left'
        }, {
          name: '手机',
          value: 'phone',
          width: 150
        }, {
          name: '操作',
          width: 350,
          operator(row) {
            let status = 0;
            let statusName = '启用';
            if (row.isLeave == 0) { //启用
              status = 1;
              statusName = '停用';
            }
            return [{
              name: '详情',
              click(row) {
                $this.person.detailModal = true;
                $this.loading = true;
                $this.person.info = [];
                $this.ajax({
                  url: 'authority/user/' + row.id + '/detail',
                  success(data, that) {
                    if (data.code == 'success') {
                      $this.person.info = data.content;
                    }
                    $this.loading = false;
                  }
                });
              }
            }, {
              name: '编辑',
              click(row) {
                $this.person.modal = true;
                $this.person.title = "编辑成员信息";
                $this.person.type = 0;
                $this.loading = true;
                $this.ajax({
                  url: 'authority/user/' + row.id + '/detail',
                  success(data, that) {
                    if (data.code == 'success') {
                      const content = data.content;
                      $this.person.form = content;
                      $this.person.form.depName = $this.parentTree($this.departCascader, 'id', $this.person.form.depId);
                      $this.person.form.email = content.email.split('@')[0];
                      if (content.directLeader) {
                        $this.person.form.currentLeader = content.directLeader + '|' + content.leaderName;
                      }
                    }
                    $this.loading = false;
                  }
                });
              }
            }, {
              name: statusName,
              click(row) {
                $this.$confirm('确定' + statusName + '【' + row.realname + '】的信息？', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  $this.ajax({
                    url: '/authority/user/' + row.id + '/' + status + '/leave',
                    type: 'put',
                    success(data, $that) {
                      if (data.code == 'success') {
                        $that.successTips();
                        $this.getPersonList($this.form.id);
                      }
                    }
                  });
                }).catch(() => { });
              }
            }, {
              name: '角色权限',
              click(row) {
                $this.role.modal = true;
                $this.role.userId = row.id;
                $this.ajax({  // 获取当前用户的角色权限
                  url: '/authority/role/user/rolelist',
                  data: {
                    userId: row.id,
                    pageNum: 0,
                    pageSize: 0
                  },
                  success(data, $this) {
                    if (data.code == 'success') {
                      $this.role.list = data.content;
                      $this.getRoleList(data.content);  //获取所有角色权限
                    }
                  }
                });
              }
            }, {
              name: '重置密码',
              click(row) {
                $this.$confirm('确定要重置【' + row.realname + '】的登录密码？', '提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  $this.ajax({
                    url: '/authority/user/update/restart',
                    type: 'put',
                    data: {
                      id: row.id
                    },
                    success(data, $that) {
                      if (data.code == 'success') {
                        $that.successTips();
                      } else {
                        $that.errorTips(data.message);
                      }
                    }
                  });
                }).catch(() => { });
              }
            }];
          }
        }]
      });
    },
    batchDepart() { //批量移动部门
      this.$refs.departForm.validate((valid) => {
        if (valid) {
          this.disable = true;
          let departId = this.batch.form.depart;
          let selected = this.census.selected;
          let params = {
            depId: departId[departId.length - 1],
            ids: []
          };
          for (let i in selected) {
            params.ids.push(i);
          }
          this.ajax({
            url: '/authority/user/update/batch',
            data: params,
            type: 'put',
            success(data, $this) {
              if (data.code == 'success') {
                $this.successTips();
                $this.batch.departModal = false;
              } else {
                $this.errorTips(data.message);
              }
            }
          });
        }
      });
    },
    batchLeader() {  //批量修改直接上级
      this.$refs.leaderForm.validate((valid) => {
        if (valid) {
          let selected = this.census.selected;
          let params = {
            leaderId: (this.batch.form.leader).split('|')[0],
            ids: []
          };
          for (let i in selected) {
            params.ids.push(i);
          }
          this.disable = true;
          this.ajax({
            url: '/authority/user/update/batch',
            type: 'put',
            data: params,
            success(data, $this) {
              if (data.code == 'success') {
                $this.successTips();
                $this.batch.leaderModal = false;
              } else {
                $this.errorTips(data.message);
              }
            }
          });
        }
      });

    },

    roleSubmit() {  //更改用户角色
      this.disable = true;
      var params, type, url;
      let list = this.role.list;  //角色列表
      if (this.batch.roles) {  //批量移动
        type = 'put';
        url = '/authority/user/update/batch';
        let selected = this.census.selected;  //用户列表
        params = {
          ids: [],
          roleIds: []
        };
        for (let i in selected) {
          params.ids.push(i);
        }
        for (let i = 0; i < list.length; i++) {
          params.roleIds.push(list[i].id);
        }
      } else {
        params = [];
        type = 'post';
        url = '/authority/user_permission';
        for (let i = 0; i < list.length; i++) {
          params.push({
            roleId: list[i].id,
            userId: this.role.userId
          });
        }
      }
      this.ajax({
        url: url,
        data: params,
        type: type,
        success(data, $this) {
          if (data.code == 'success') {
            $this.batch.roles = false;
            $this.successTips();
            $this.role.modal = false;
          } else {
            $this.errorTips(data.message);
          }
        }
      });
    },
    renderContent(h, {
        node,
      data,
      store
      }) {
      return (
        <span on-click={() => {
          this.form.id = data.id;
          this.census.name = data.name;
          this.getPersonList();
        }}><span> {
          node.label
        } </span> <span class="edit-tree" >
            <i title="编辑" on-click={(e) => { e.stopPropagation(); this.openModal(store, data, 0); }}
              class="el-icon-edit"> </i> <i title="新增" on-click={
                (e) => { e.stopPropagation(); this.openModal(store, data, 1); }} class="el-icon-plus" > < /i> <
                  i title="删除" on-click={
                    (e) => { e.stopPropagation(); this.remove(store, data); }} class="el-icon-delete"></i></span></span>
          );
      },
      openModal(store, data, type) {
            this.resetForm('form');
          let treeArr = this.parentTree(this.departCascader, 'id',  data.id);
        let treeId  = treeArr.splice(0, treeArr.length - 1);
        this.depart.form.parentName = treeId;
        this.type = type;
        this.depart.form.id = data.id;
        if (type == 0) { //编辑
         if( data.id == 1){
            this.errorTips('不能编辑根节点!')
            return;
          }
          this.depart.title = '编辑';
          this.depart.form.name = data.name;
          this.depart.form.parentId = treeId[treeId.length - 1];
          this.getDepartLeader();
        } else if (type == 1) { //添加
            this.depart.title = '添加';
          this.depart.form.name = '';
            this.depart.form.parentId = data.id;
            this.depart.form.currentLeader = '';
            this.depart.form.assistant = '';

          }
          this.depart.modal = true;
        },
      remove(store, $data) {
        if( $data.id == 1){
            this.errorTips('不能删除根节点!')
          return;
        }
          this.$confirm('确定要删除此部门及其子部门吗？', '提示', {
            confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            this.ajax({
              url: '/authority/dep/' + $data.id + '/delete',
              type: 'delete',
              success(data, $this) {
                if (data.code == 'success') {
                  store.remove($data);
                  $this.successTips();
                } else {
                  $this.errorTips(data.message);
                }
              }
            });
          }).catch(() => {});
          },
      submit() {
            let parentId = this.depart.form.parentName;
        this.$refs.form.validate((valid) => {
          if (valid) {
            this.disabled = true;
          const depart = this.depart.form;
            let leader = depart.currentLeader.split('|');
            const leaderId = leader[0];
            const leaderName = leader[1];
            let params = {
            name: depart.name,
              leaderName: leaderName,
              leaderId: leaderId,
              parentId: depart.parentId,
              assistant: depart.assistant
            };
            let type = 'post';
            if (this.type == 0) { //编辑
            params.id = depart.id;
          params.parentId = parentId[parentId.length -1];
              type = 'put';
            }
            this.ajax({
            url: '/authority/dep',
              type: type,
              data: params,
              success(data, $this) {
                if (data.code == 'success') {
            $this.successTips();
          $this.depart.modal = false;
          $this.depart.form.assistant = ''
                  $this.getDepartment();
                } else {
            $this.errorTips(data.message);
          }
              }
            });
          }
        });
      },
      personSubmit() {
            this.$refs.personForm.validate((valid) => {
              if (valid) {
                this.disable = true;
                let type = 'post';
                const person = this.person.form;
                let depName = person.depName;
                const params = {
                  depId: depName[depName.length - 1],
                  realname: person.realname,
                  usercode: person.usercode,
                  phone: person.phone,
                  sex: person.sex,
                  post: person.post,
                  username: person.email + '@ecaray.com',
                  email: person.email + '@ecaray.com',
                  professLevel: person.professLevel,
                  manageLevel: person.manageLevel,
                  idcard: person.idcard,
                  directLeader: person.directLeader,
                  address: person.address,
                  headPic: person.headPic,
                };
                if (this.person.type == 0) { //编辑模式
                  params.id = person.id;
                  type = 'put';
                }
                this.ajax({
                  url: '/authority/user',
                  data: params,
                  type: type,
                  success(data, $this) {
                    if (data.code == 'success') {
                      $this.successTips();
                      $this.person.modal = false;
                    } else {
                      $this.errorTips(data.message);
                    }
                  }
                });
              }
            });
          }
    }
  };
</script>
