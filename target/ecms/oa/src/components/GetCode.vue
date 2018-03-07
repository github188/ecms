//通过code获取数据
//{
//	code：cwa_leave_type   获取请假类型
// 	code: ctm_attr  //获取合同类型
//  defalultChoose  是否默认选中第一个
//}
<template>
    <el-select v-model="result" :clearable="clearable" filterable class="select-area" @change="getCode" placeholder="请选择">
	    <el-option
		      v-for="item in code"
		      :key="item.id"
		      :label="item.name"
		      :value="item.value +'|'+ item.name">
		    </el-option>
	 </el-select>
</template>
<style scoped>

</style>

<script>
	export default {
		name: 'getCode',
		data(){
			return {
				code: [],
				result: ''
			};
		},
		created(){
			this.ajax({
				url: 'ctm/setting/param/list',
				data:{
					code: this.codeType
				},
				success(data, $this){
					if(data.code == 'success'){
						$this.code = data.content;
						if($this.defalultChoose){
							$this.result = data.content[0] && data.content[0].value + '|' + data.content[0].name;
						}

					}
				}
			});
		},
		methods: {
			getCode(code){
				this.result = code;
				let value = code.split('|');
				const obj = {
					name: value[1],
					value: value[0]
				};
				this.$emit('change', obj);
			}
		},
		props: ['change', 'codeType', 'defalultChoose', 'clearable']
	};
</script>
