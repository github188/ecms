<template>
    <div id="organizationDepart">
        <el-tree node-key="id" ref="tree"
        highlight-current  
        :default-expanded-keys="['1']" 
        :render-content="renderContent"
        :expand-on-click-node="true" 
        :data="departList" 
        :props="{label: 'name',children: 'children'}">
        </el-tree>
        <departManage @getDepartment="getDepartment" ref="departManage" />
    </div>
</template>
<style lang="scss">
#organizationDepart {
  width: 300px;
  float: left;
  .edit-tree i {
    padding: 0 8px;
    color: #8391a5;
    visibility: hidden;
  }
  .edit-tree {
    float: right;
  }
  .el-tree {
    height: 550px;
    overflow: auto;
    margin-bottom: 100px;
  }
  .el-tree-node__content:hover .edit-tree i {
    visibility: visible;
  }
  .el-tree-node__content .edit-tree i:hover {
    color: #01cd78;
  }
}
</style>

<script>
import departManage from "./departManage";
export default {
  name: "departTree",
  components: {
    departManage
  },
  data() {
    return {
      departList: []
    };
  },
  created() {
    this.getDepartment();
  },
  methods: {
    getDepartment() {
      // 获取部门树
      this.ajax({
        url: "/authority/dep/tree/list",
        success(data, $this) {
          if (data.code == "success") {
            $this.departList = data.content;
          }
        }
      });
    },
    renderContent(h, { node, data, store }) {
      return (
        <span
          on-click={() => {
            this.$emit("getList", {
              name: data.name,
              id: data.id
            });
          }}
        >
          <span> {node.label} </span>
          <span class="edit-tree">
            <i
              title="编辑"
              on-click={e => {
                e.stopPropagation();
                this.$refs.departManage.openModal(store, data);
              }}
              class="el-icon-edit"
            />
            <i
              title="新增"
              on-click={e => {
                e.stopPropagation();
                this.$refs.departManage.openModal(store, data, true);
              }}
              class="el-icon-plus"
            />
            <i
              title="删除"
              on-click={e => {
                e.stopPropagation();
                this.remove(store, data);
              }}
              class="el-icon-delete"
            />
          </span>
        </span>
      );
    },
    remove(store, $data) {
      if ($data.id == 1) {
        this.errorTips("不能删除根节点!");
        return;
      }
      this.$confirm("确定要删除此部门及其子部门吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.ajax({
            url: "/authority/dep/" + $data.id + "/delete",
            type: "delete",
            success(data, $this) {
              if (data.code == "success") {
                store.remove($data);
                $this.successTips();
              } else {
                $this.errorTips(data.message);
              }
            }
          });
        })
        .catch(() => {});
    }
  }
};
</script>

