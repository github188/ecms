// 发起合同审批
<template>
  <div>
    <el-dialog title="
              合同审批申请" :visible.sync="modal" size="tiny" class="tiny-modal">
      <el-form ref="form" :model="form" :rules="rules" label-width="125px" label-position="right" style="padding:0 30px;">
        <el-form-item label="合同发起人：" prop="salesmanName">
          <el-input v-model="form.salesmanName" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="合同归属部门：" prop="department">
          <el-input v-model="form.department" :disabled="true"></el-input>
        </el-form-item>

        <el-form-item label="关联项目：">
          <el-select v-model="form.projectId" filterable clearable placeholder="请选择" style="width:100%">
            <el-option v-for="item in project" :key="item.id" :label="item.proName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="合同类型：" prop="ctmAttr">
          <el-select v-model="form.ctmAttr" clearable filterable placeholder="请选择" style="width: 100%">
            <el-option v-for="item in contractType" :key="item.id" :label="item.name" :value="item.value ">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="合同名称：" prop="ctmName">
          <el-input v-model="form.ctmName"></el-input>
        </el-form-item>

        <el-form-item label="合作方名称：" prop="cusName">
          <el-input v-model="form.cusName"></el-input>
        </el-form-item>

        <el-form-item label="合同金额：" prop="amount">
          <el-tooltip placement="top" :disabled="!(form.amount)">
            <span style="font-size:14px;" slot="content">{{form.amount | amount}}</span>
            <el-input v-model="form.amount">
              <el-button slot="append">元</el-button>
            </el-input>
          </el-tooltip>
        </el-form-item>

        <el-form-item label="合同日期：" required>
          <el-col :span="11">
            <el-form-item prop="startTime">
              <el-date-picker :editable="false" v-model="form.startTime" type="date" placeholder="选择开始日期" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col class="line" :span="2" style="text-align:center">-</el-col>
          <el-col :span="11">
            <el-form-item prop="endTime">
              <el-date-picker :editable="false" v-model="form.endTime" type="date" :picker-options="endDateOpt" placeholder="选择结束日期" style="width: 100%;"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-form-item>

        <el-form-item label="合同附件：" prop="fileList">
          <el-upload ref="upload" accept='application/pdf,xlapplication/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheets,
          image/png,
          image/jpeg,
          image/png'
           :action="url"
           :file-list="form.fileList"
           :on-success="uploadSuccess"
           :on-remove="handleRemove">
            <el-button size="small" type="info">点击上传</el-button>
            <span slot="tip" class="el-upload__tip" style="padding-left: 15px;">只能上传word/excel/pdf及图片类型文件</span>
          </el-upload>
        </el-form-item>

        <el-form-item label="其他说明：" prop="remark">
          <el-input v-model="form.remark" :autosize="{ minRows: 4, maxRows: 8}" type="textarea"></el-input>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button type="success" :disabled="disable" v-if="disable">
          <i class="el-icon-loading"></i>
        </el-button>
        <el-button type="success" :disabled="disable" @click="submit" v-else>确 定</el-button>
        <el-button type="info" @click="modal = false">取 消</el-button>
      </span>

    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'approve',
  data() {
    return {
      modal: false,
      project: [],  //关联项目数据
      contractType: [],  //合同类型
      fileList: [],  //临时附件
      form: {
        salesmanName: '',  //发起人
        department: '',  //发起人部门
        projectId: '',  //关联项目id
        remark: '',  //特殊说明
        ctmName: '',   //合同名称
        ctmAttr: '', //合同类型
        cusName: '',  //合作方名称
        startTime: '',
        endTime: '',
        amount: '',  //合同金额
        fileList: []  //合同文件
      },
      endDateOpt: {
        disabledDate: (time) => {
          return time.getTime() < this.form.startTime;
        }
      },
      url: '',  //合同文件上传路径
      rules: {
        salesmanName: [{
          required: true,
          message: '合同发起人不能为空!'
        }],
        department: [{
          required: true,
          message: '部门归属不能为空!'
        }],
        ctmAttr: [{
          required: true,
          message: '合同类型不能为空!'
        }],
        cusName: [{
          required: true,
          message: '合作方不能为空!'
        }],
        ctmName: [{
          required: true,
          message: '合同名称不能为空!'
        }, {
          max: 50,
          message: '不能超过50个字符!'
        }],
        startTime: [{
          required: true,
          message: '开始日期不能为空!'
        }],
        endTime: [{
          required: true,
          message: '结束日期不能为空!'
        }],
        amount: [{
          pattern: /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/,
          message: "请输入正确的合同金额！"
        }],
        remark: [{
          max: 250,
          message: '不能超过250个字符!'
        }],
        fileList: [{
          required: true,
          message: '合同附件不能为空!'
        }]
      }
    };
  },
  created() {
    this.url = this.domain + '/ctm/contract/files/upload';  //附件上传地址
    this.getUser();
  },
  filters: {
    amount(value) {
      if (value) {
        return Number(value).addComma();
      }
    }
  },
  methods: {
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.disable = true;
          const { ctmName, cusName, ctmAttr, amount, projectId, remark, fileList, startTime, endTime } = this.form;
          const params = {
            ctmName,
            cusName,
            ctmAttr,
            amount,
            projectId,
            startTime: new Date(startTime).getTime(),
            endTime: new Date(endTime).getTime(),
            remark,
            list: this.fileList
          };
          this.ajax({
            url: '/ctm/contract/create',
            type: 'post',
            data: Utils.filterObjectNull(params),
            success(data, $this) {
              if (data.code == 'success') {
                $this.successTips();
                $this.modal = false;
                $this.$refs.upload.clearFiles();
                $this.$refs.form.resetFields();
              } else {
                $this.errorTips(data.message);
              }
            }
          });
        }
      });
    },
    handleUpload(list) {  //归档合同文件
      this.fileList = [];
      for (let i = 0; i < list.length; i++) {
        this.fileList.push({
          name: list[i].name,
          id: list[i].response.content.split('.')[0]
        });
      }
      this.form.fileList = list;
      this.$refs.form.validateField('fileList');
    },
    handleRemove(file, list) {   //合同文件移除
      this.handleUpload(list);
    },
    uploadSuccess(res, file, list) {  //上传文件成功
      this.handleUpload(list);
    },
    getUser() {
      this.ajax({  //获取个人信息
        url: '/authority/user/homepage/detail',
        success(data, $this) {
          if (data.code == 'success') {
            $this.form.salesmanName = data.content.realname;
            $this.form.department = $this.reverseDepart(data.content.depName);
          }
        }
      });
    },
    getProject() {//获取关联项目
      this.ajax({
        url: '/pmo/project/list',
        success(data, $this) {
          if (data.code == 'success') {
            $this.project = data.content;
          }
        }
      });
    },
    getType(obj) {  //获取合同类型
      this.ajax({
        url: 'ctm/setting/param/list',
        data: {
          code: 'ctm_attr'
        },
        success(data, $this) {
          if (data.code == 'success') {
            $this.contractType = data.content;
          }
        }
      });
    },
    openModal(details) {
      this.getProject();
      this.getType();
      this.resetForm('form');
      this.modal = true;
    }
  }
};
</script>


