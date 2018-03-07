<template>
  <div>
    <el-dialog title="下载合同模板" :visible.sync="modal" size="tiny" class="middle-modal">
      <el-row>
        <el-col :span="8">
          <div class="catalogue">
            <el-tree :data="catalogue" :default-expanded-keys="[tempId]" :highlight-current="true" @node-click="loadTemplate" node-key="id" :props="{
                          label: 'name',
                          children: 'children'
                      }">
            </el-tree>
          </div>
        </el-col>
        <el-col :span="16">
          <div style="padding-left: 20px;">
            <div id="catalogueList"></div>
          </div>
        </el-col>
      </el-row>
    </el-dialog>
  </div>
</template>

<style scoped>
.catalogue {
  height: 580px;
  overflow: auto;
  border-right: 4px solid #eee;
  padding-right: 20px;
}
</style>
<style>
.middle-modal .el-dialog {
  width: 800px;
  height: 700px;
  overflow: auto;
}

.catalogue .el-tree {
  height: 580px;
}
</style>

<script>
export default {
  name: 'template',
  data() {
    return {
      modal: false,
      catalogue: [],  //目录
      tempId: "1000000"  //目录id
    };
  },
  methods: {
    getCatalogue() {  //获取文件目录
      this.ajax({
        url: '/ctm/template/tree',
        success(data, $this) {
          if (data.code == 'success') {
            $this.catalogue = [];
            $this.catalogue.push(data.content);
          }
        }
      });

    },
    openModal() {
      this.modal = true;
      this.getCatalogue();
      this.getTemplateList();
    },
    getTemplateList() {
      const $this = this;
      this.tableList({
        columns: [{
          name: '模板名称',
          operator(row) {
            let name = row.name;
            return [{
              name: name,
              click(row) {
                $this.downFile(`/ctm/template/download?id=${row.id}&realname=${name}`, name);
              }
            }];
          }
        }],
        element: '#catalogueList',
        url: '/ctm/template/temp/list/',
        data: {
          tempId: this.tempId
        }
      });
    },
    loadTemplate(a) {
      this.tempId = a.id;
      this.getTemplateList();
    }
  }
};
</script>
