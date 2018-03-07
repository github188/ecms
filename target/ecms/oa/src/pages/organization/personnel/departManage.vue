<template>
  <el-dialog :title="isAdd?'添加':'编辑'" :visible.sync="modal" size="tiny" id="departManage">
      <el-form ref="form" :model="form" :rules="rules" label-width="110px" label-position="right" v-loading="loading">
        <el-form-item label="部门名称：" prop="name">
          <el-input v-model="form.name" placeholder="请输入部门名称" style="width: 90%"></el-input>
        </el-form-item>
        <el-form-item v-if="!isAdd" label="上级部门：" prop="parentName">
          <el-cascader style="width: 90%" :options="departCascader" :change-on-select="true" :props="{
                      value: 'id',
                      label: 'name',
                      children: 'children'
                    }" v-model="form.parentName">
          </el-cascader>
        </el-form-item>
        <el-form-item label="部门负责人：" prop="currentLeader">
          <el-select style="width:90%" v-model="form.currentLeader"  value-key="id" filterable clearable placeholder="请输入关键字">
            <el-option v-for="item in personList" :key="item.id" :label="item.realname" :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="商务助理：">
          <el-select style="width:90%" v-model="form.assistant" filterable clearable placeholder="请输入关键字">
            <el-option v-for="item in personList" :key="item.id" :label="item.realname" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item> -->
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" :loading="disable" @click="submit" >确 定</el-button>
        <el-button type="info" @click="modal = false">取 消</el-button>
      </span>
    </el-dialog>
</template>
<style>
#departManage .el-dialog {
  width: 500px;
}
</style>

<script>
export default {
  name: "departManage",
  data() {
    return {
      modal: false,
      title: "",
      isAdd: true,
      loading: true,
      departCascader: [], //部门
      personList: [], //人员
      rules: {
        name: [
          {
            required: true,
            message: "部门名称不能为空！"
          }
        ],
        parentName: [
          {
            required: true,
            message: "上级部门不能为空！"
          }
        ],
        currentLeader: [
          {
            required: true,
            message: "部门负责人不能为空！"
          }
        ]
      },
      form: {
        name: "", //部门名称
        id: "", //部门id
        parentId: "", //上级部门id
        parentName: [], //上级部门名称
        leaderId: "",
        leaderName: "",
        currentLeader: "", //当前的部门负责人
        assistant: "" //商务助理
      }
    };
  },
  methods: {
    openModal(store, data, add) {
      this.isAdd = add;
      this.loading = true;
      this.form.id = data.id;

      this.getDepartment(data.id);
      if (!this.isAdd) {
        //编辑
        if (data.id == 1) {
          this.errorTips("不能编辑根节点!");
          return;
        }
        this.form.name = data.name;
      } else {

        this.resetForm("form");
        this.form.name = "";
      }
      this.modal = true;
    },
    getDepartLeader(id) {
      //获取部门负责人
      this.ajax({
        url: "/authority/dep/" + id + "/detail",
        success(data, $this) {
          if (data.code == "success") {
            let content = data.content;
            if (content.leaderName != null) {
              $this.personList.forEach(item => {
                if (item.id === content.leaderId) {
                  $this.form.currentLeader = item;
                  $this.loading = false;
                }
              });
            }
          }
        }
      });
    },
    getDepartment(id) {
      // 获取部门树
      this.ajax({
        url: "/authority/dep/tree/list",
        success(data, $this) {
          if (data.code == "success") {
            $this.departList = data.content;
            $this.departCascader = $this.delTree(data.content);
            let treeArr = $this.parentTree($this.departCascader, "id", id);
            // let treeId = treeArr.splice(0, treeArr.length - 1);
            $this.form.parentName = treeArr;
            $this.form.parentId = treeArr[treeArr.length-1];
            $this.getAllPerson(id);
          }
        }
      });
    },
    getAllPerson(id) {
      //获取全部人员
      this.ajax({
        url: "/authority/user/dep/1",
        data: {
          pageNum: 1,
          pageSize: 1000
        },
        success(data, $this) {
          if (data.code == "success") {
            $this.personList = data.content;
            if($this.isAdd){
              $this.loading = false;
            }else{
              $this.getDepartLeader(id);
            }
          }
        }
      });
    },
    submit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.disabled = true;
          let { name, parentId, id, currentLeader, parentName } = this.form;
          let leaderId = currentLeader.id;
          let leaderName = currentLeader.realname;
          let params = {
            name,
            leaderName,
            leaderId,
            parentId
          };
          let type = "post";
          if (!this.isAdd) {
            //编辑
            params.id = id;
            params.parentId = parentName[parentName.length - 1];
            type = "put";
          }
          this.ajax({
            url: "/authority/dep",
            type,
            data: params,
            success(data, $this) {
              if (data.code == "success") {
                $this.successTips();
                $this.$emit("getDepartment");
                $this.modal = false;
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

