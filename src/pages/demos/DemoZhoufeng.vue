<template>
	<div> 
		<div class="checkGroup">
	        <div>
	        	<span>{{checkProventArr.join(',')}}</span>
	        </div>
        </div>
		<div class="checkGroup" v-for="x in proventsGroup">
			<Checkbox-group v-model="checkProventArr" @on-change="checkAllProvent">
				<div class="singleCheckBox" v-for="(item,index) in provents" v-if="index<x*5&&index>=(x-1)*5">
			    	<Checkbox :label="item.name" v-model="item.checked" @click.native="checkSingleProvent(x,item.value,item.checked)">    	
			    		<span v-bind:class="{ label:iconShow==item.value}">{{item.name}}</span>
			        </Checkbox>
			        <span @click="clickShow(x,item.value,item.checked,item.name)"><Icon type="arrow-down-b" ></Icon></span>
		        </div>
			</Checkbox-group>
			<div class="child" v-show="showChild&&index==x">
				<Checkbox-group v-model="checkCityArr" @on-change="checkAllCity">
					<div class="singleCheckBox" v-for="(item,index) in citys.cityArr" >
				    	<Checkbox :label="item.name" v-model="item.checked">	            
				           {{item.name}}
				        </Checkbox>				       
			        </div>
				</Checkbox-group>
			</div>
		</div>
    </div>
</template>
<script>
    export default {
        data (){
        	return{
        		childLength:5,
        		index:-1,
        		iconShow:0,
        		showChild:false,
        		indeterminate: false,
                checkAll: false,
                checkCityArr: [],
                checkProventArr: [],
                proventsGroup:0,
        		provents:[
	        		
        		],
        		citys:{
        			proName:"北京市",
        			cityArr:
        			[
        			]
        		},

    			totalData:{

    			}
        	}
        },
        created(){
            this.$http.get('/isp-kongming/basic/getArea'+"?pId=-1&pageSize=32").then((res)=>{//获取省级地区
              if(res.data.errorCode===0){
                 this.provents=res.data.result
                 for(var i=0;i<this.provents.length;i++){
                    this.provents[i]['checked']=false
                 }
              }
              else {
                this.$Modal.info({
                    title: '提示',
                    content: res.data.errorMsg
                });
              }
              }).catch((res)=>{}
            )
        	this.proventsGroup=Math.ceil(this.provents.length/5)
        },
        watch:{
            provents:{
                handler:function(){
                    this.proventsGroup=Math.ceil(this.provents.length/5)
                }
            }
        },
        methods: {
        	clickShow(index,iconShow,checked,proName){//收缩栏
            	this.$http.get('/isp-kongming/basic/getArea'+"?pId="+iconShow+"&pageSize=100").then((res)=>{
                    if(res.data.errorCode===0){
                        this.citys.cityArr=res.data.result
                        for(var i=0;i<this.citys.cityArr.length;i++){
                            this.citys.cityArr[i]['checked']=false
                        }
                        if(this.showChild==false){//还没有点开
                            this.iconShow=iconShow
                            this.index=index
                            this.showChild=true
                        }else{
                            if(this.index==index&&this.iconShow==iconShow){//点开了
                                this.index=-1
                                this.iconShow=0
                            }
                            else{
                                this.iconShow=iconShow
                                this.index=index
                                this.showChild=true
                            }
                        }
                        if(checked&&iconShow){
                             this.checkCityArr=[]
                            for(var i=0;i<this.citys.cityArr.length;i++){
                                this.citys.cityArr[i].checked=true
                                this.checkCityArr.push(this.citys.cityArr[i].name)
                            } 
                        }
                        this.citys.proName=proName;
                    }
                    else {
                        this.$Modal.info({
                            title: '提示',
                            content: res.data.errorMsg
                        });
                      }
                    }).catch((res)=>{}
                )

        		
        	},
            checkAllProvent (data) {//省的选择，返回数组
                if (data.length === this.provents.length) {
                    this.checkAll = true;
                } else if (data.length > 0) {
                    this.checkAll = false;
                } else {
                    this.checkAll = false;
                }
            },
            checkSingleProvent(index,iconShow,checked){//单个省的选择
            	if(this.index==index && this.iconShow==iconShow && checked==false){
            		for(var i=0;i<this.citys.cityArr.length;i++){
					 	this.checkCityArr.push(this.citys.cityArr[i].name)
        			}
            	}else if(this.index==index && this.iconShow==iconShow && checked==true){
					this.checkCityArr=[]       			
            	}
            },
            checkAllCity (data) {//城市的选择，返回数组
            	let index=this.arrIndex(this.checkProventArr,this.citys.proName)
                if (data.length === this.citys.cityArr.length){             
                    this.checkProventArr.push(this.citys.proName)
                    this.totalData.proArr=this.checkProventArr
                } else if (data.length > 0) {                   
                    if(index!=-1){
                    	this.checkProventArr.splice(index,1)	
                    	this.totalData.proArr=this.checkProventArr
                    }
                } else {
                    if(index!=-1){
                    	this.checkProventArr.splice(index,1)	
                    }
                }
            },
            arrIndex(arr,item){//在数组中查找一个值
            	if(arr==[]){
            		return -1
            	}else{
            		for(var i=0;i<arr.length;i++){
            			if(arr[i]==item){
            				return i
            			}
            		}
            	}
            }
        }
    }
    
    
</script>
<style lang="css" scoped>
	.checkGroup{width:800px;text-align: left;padding-left: 100px;background: #fefefe;overflow: hidden;margin-top: 20px;}
	.singleCheckBox{
		width: 100px;
		text-align:left;
		display: inline-block;
		margin-right: 20px
	}
	.ivu-checkbox-wrapper{margin-right:5px }
	.singleCheckBox .ivu-icon{cursor: pointer;}
	.child{width: 100%;background: #eee;padding:10px 0;}
	.label{display: inline-block;position: relative;}
	.label::after{
		content: "";
		display:block;
		width: 0;
		height: 0;
		border-bottom:10px solid #eee;
		border-top:none;
		border-left: 5px solid transparent;
		border-right: 5px solid transparent;
		top: 100%;left: 10px
	}
</style>


