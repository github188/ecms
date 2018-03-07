<template>
	<div class="search-tab-choose">
		<el-radio-group v-show="types=='radio'" v-model="radio" @change="getValue">
		    <el-radio v-for="(item, index) in items" :key="index" :label="item.value">{{item.name}}</el-radio>
	    </el-radio-group>

		<el-checkbox-group v-show="types=='checkbox'" v-model="checkbox" @change="getValue">
		    <el-checkbox v-for="(item, index) in items" :key="index" :label="item.value">{{item.name}}</el-checkbox>
		</el-checkbox-group>
	</div>
		
</template>

<style>
	.search-tab-choose .el-checkbox__inner, .search-tab-choose .el-radio__inner{
		display: none;
	}
	.search-tab-choose .is-checked + .el-checkbox__label, .search-tab-choose .is-checked + .el-radio__label{
		color: #01cd78;
    	border-bottom: 2px solid #01cd78;
    	padding: 2px 4px;
	}
</style>

<script>
	/**
	 * type - ['radio', 'checkbox']
	 * data -[{value: 1, name: name}]
	 * change: 回调取值
	 * 
	 */
	export default{
		name: 'tableChoose',
		data(){
			return {
				types: this.type,
				items: this.data,
				radio: this.data[0].value,
				checkbox: [this.data[0].value]
			}
		},
		methods:{
			getValue(value){
				this.$emit('change', value);
			}
		},
		props: ['type', 'data', 'change']
	}
</script>