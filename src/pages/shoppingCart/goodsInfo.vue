<template>
	<div class="warpper">
		<div class="shopping-Img">
			<!-- <img src="../../assets/images/good.png" alt="这是一个商品图片"> -->
		</div>
		<div class="Form">
			<h1 v-model="formItem.goodsname">Apple/苹果iPhone 6S</h1>
			<Form class="form" :model="formItem" label-position="right" :label-width="100">
				<Form-item label="描述：">
					<span class="descripive">{{formItem.descripive}}</span>
				</Form-item>
				<Form-item label="价格：">
					<span class="prices red">￥{{formItem.prices}}</span>
				</Form-item>
				<Form-item label="外观：">
					<Radio-group v-model="formItem.appearance" type="button">
						<Radio v-for="line in formItem.appearance" :label="line.value" :key="line.key">{{line.name}}</Radio>
			    </Radio-group>
				</Form-item>
				<Form-item label="存储容量：">
					<Radio-group v-model="formItem.capacity" type="button">
		        <Radio label="16GB"></Radio>
		        <Radio label="64GB"></Radio>
		        <Radio label="128GB"></Radio>
			    </Radio-group>
				</Form-item>
				<Form-item>
					<span @click="addgoods"><a v-link="{ name: 'addgoods', params: { goodsname: goodsname, prices: prices,appearance: appearance,capacity:capacity }}">加入购物车</a></span>
				</Form-item>
			</Form>
		</div>
	</div>
</template>
<style>
	.Form{
		margin-left: 400px;
	}
	.Form h1{
		display: inline-block;
		font-size: 18px;
		width: 300px;
		margin: 20px 10px;
	}
</style>
<script>

	export default{
		data () {
      return {
        formItem: {
        	goodsname: "iPhone 6S",
        	descripive: "强大功能于一身",
        	prices: 6888,
        	appearance: [
	        	{
						  name: "选项一",
						  value: "1",
						  label: "玫瑰金"
					  },
					  {
						  name:"选项二",
						  value:"2",
						  label: "银色"
					  }
        	],
        	capacity: ""
        }
      }
    },
    methods:{
    	addgoods () {
    		this.$router.push("shoppingCart");
    	}
    }
	}
</script>
