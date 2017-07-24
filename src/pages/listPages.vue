<template>
	<Form class="form" :model="formItem" label-position="right" :label-width="100">
		<Form-item label="客户名称：">
			<input class="descripive" :model="formItem.clientName"></input>
		</Form-item>
		<Form-item label="客户编号：">
			<input class="descripive" :model="formItem.clientId"></input>
		</Form-item>
		<Form-item label="主营品牌：">
			<input class="descripive" :model="formItem.brand" placeholder="请输入名称或分类"></input>
		</Form-item>
		<Form-item label="客户地区：">
			<input class="descripive" :model="formItem.district"></input>
		</Form-item>
		<Form-item label="客户类别：">
			<input class="descripive" :model="formItem.clientType"></input>
		</Form-item>
		<Form-item label="客户标签：">
			<input class="descripive" :model="formItem.clientLabel"></input>
		</Form-item>
		<Form-item label="审核状态：">
			<Select v-model="review" style="width:200px">
        <Option v-for="item in reviewStatus" :value="item.value" :key="item.value">{{ item.status }}</Option>
    	</Select>
		</Form-item>
		<Form-item label="负责员工：">
			<input class="descripive" :model="formItem.staff"></input>
		</Form-item>
		<Form-item>
			<Button type="primary" @click="submit">查询</Button>
			<Button>取消</Button>
		</Form-item>
	</Form>
</template>
<style>
	
</style>
<script>
  export default {
    data () {
      return {
      	// formItem:{
      	// 	clientName:'',//客户名称
      	// 	clientId:'',//客户编号
      	// 	brand:'',//主营品牌
      	// 	district:'',//客户地区
      	// 	clientType:'',//客户类别
      	// 	clientLabel:'',//客户标签
      	// 	review:"",//审核状态
      	// 	staff:''//负责员工
      	// },
      	reviewStatus:[
      			{
      				status:'待确认',
      				value:16
      			},
      			{
      				status:'待完善',
      				value:3
      			},
      			{
      				status:'审核通过',
      				value:12
      			},
      			{
      				status:'待审核',
      				value:11
      			},
      			{
      				status:'已停用',
      				value:2
      			}
      	],
        model1: ''
      }
    },
    methods:{
    	submit(){
    		console.log(this.formItem);
    	}
    }
  }
</script>
