// :checkbox="true"  是否启用复选框
// @click="function" 展开树的回调（传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身）
<template>
    <el-tree
        node-key="id"
        :default-expanded-keys="['1']"
        highlight-current
		:expand-on-click-node="false"
        @node-click="choose"
        :data="list"
		ref="tree"
        :show-checkbox="checkbox"
        :props="{
            label: 'name',
            children: 'children'
        }">
    </el-tree>
</template>

<script>
    export default{
		name: 'getDeparment',
		data(){
			return {
				list: [],
			};
		},
		created(){
			this.getList();
		},	
		methods: {
			getList(){
				this.ajax({
					url: '/authority/dep/tree/list',
					success(data, $this){
						if(data.code == "success"){
							$this.list = data.content;
						}
					}
				})
			},
			getKeyCode(){
				return this.$refs.tree.getCheckedKeys();
			},
            choose(a, b, c){
                this.$emit('click', a, b, c );
            }
        },
        props: ['checkbox', 'click']
	}

</script>
