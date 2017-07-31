<template>
	<div class="staffEdit">
		<div class="staffEdit-title">
			<span class="">员工编辑</span>
			<span class="ML1100"><a href="#/index/staffManage">&lt;返回</a></span>
		</div>
		<div class="formValidate">
			<Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80" label-position="right">
				<Form-item label="域账号" prop="account">
	        <span>{{formValidate.account}}</span>
	    	</Form-item>
	    	<Form-item label="员工编号" prop="staffId">
	        <span v-model="formValidate.staffId">
	        	<router-link
            	:to="{path:'staffManage'}">
          	</router-link>
	        </span>
	    	</Form-item>
	    	<Form-item label="员工姓名" prop="staffName">
	        <span v-model="formValidate.staffName"></span>
	    	</Form-item>
				<Form-item label="员工上级" prop="leader">
	        <Input v-model="formValidate.leader" placeholder="请输入员工上级"></Input>
	    	</Form-item>
	    	<Form-item label="所属部门" prop="department">
	        <Select v-model="formValidate.department" placeholder="请选择所属部门">
	          <Option value="beijing">北京市</Option>
	          <Option value="shanghai">上海市</Option>
	          <Option value="shenzhen">深圳市</Option>
	        </Select>
	      </Form-item>
				<Form-item label="员工状态" prop="status">
	        <Radio-group v-model="formValidate.status">
	            <Radio label="start">启用</Radio>
	            <Radio label="stop">停用</Radio>
	        </Radio-group>
	      </Form-item>
	      <Form-item label="职位" prop="position">
	        <Select v-model="formValidate.position" placeholder="请选择职位">
	        	<Option v-for="item in selectedPosition" :value="item.value" :key="item.value">{{ item.name }}</Option>
	        </Select>
	    	</Form-item>
	    	<Form-item label="员工分类" prop="classify">
	        <Select v-model="formValidate.classify" placeholder="请选择员工分类">
	            <Option value="">销售</Option>
	            <Option value="">客服</Option>
	            <Option value="">编辑</Option>
	            <Option value="">支持</Option>
	            <Option value="">其他</Option>
	        </Select>
	     	</Form-item>
			</Form>
		</div>
		<div class="formItem">
			<Form ref="formItem" :model="formItem" :label-width="80" label-position="right">
				<Form-item label="性别" prop="sex">
					<Radio-group v-model="formItem.sex">
	          <Radio label="male">男</Radio>
	          <Radio label="female">女</Radio>
	        </Radio-group>
				</Form-item>
				<Form-item label="移动电话" prop="telephone">
					<Input v-model="formItem.telephone" placeholder="1**********"></Input>
				</Form-item>
				<Form-item label="联系电话" prop="phone">
					<Input v-model="formItem.phone" placeholder="010-66666666"></Input>
				</Form-item>
			</Form>
		</div>
		<div class="btns">
			<Button type="primary" @click="handleSubmit('formValidate')">保存</Button>
    	<Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
		</div>
	</div>
</template>

<style lang="scss">
	.staffEdit{
		.staffEdit-title{
			margin:0 10px 0 10px;
			width:1200px;
			height:38px;
			line-height:38px;
			background: #ccc;
			span{
				display:inline-black;
			}
			.ML1100{
				margin-left:1100px;
			}
		}
		.formValidate{
			border-bottom:1px dashed #ccc;
			padding-bottom:50px;
			Form{
				width:700px;
				margin-left:150px;
			}
		}
		.formItem{
			margin-top:10px;
			border-bottom:1px dashed #ccc;
			Form{
				width:700px;
				margin-left:150px;
			}
		}
		.btns{
			margin:20px 0 0 230px;
		}
	}
</style>

<script>
import config from './config.js';
	export default{

		data(){
			return{
				formValidate:{
					account:"",//域账号
					staffId:"",//员工编号
					staffName:"",//员工姓名
					leader:"",//员工上级
					department:[],//所属部门
					status:"",//员工状态
					position:[],//职位
					classify:[]//员工分类
				},
				selectedPosition:[
					{
						name:'总经理',
						value:''
					},
					{
						name:'副总经理',
						value:''
					},
					{
						name:'总监',
						value:''
					},
					{
						name:'助理总监',
						value:''
					},
					{
						name:'经理',
						value:''
					},
					{
						name:'支持人员',
						value:''
					},
					{
						name:'运营客服',
						value:''
					},
					{
						name:'市场人员',
						value:''
					},
					{
						name:'运营编辑',
						value:''
					},
					{
						name:'运营专员',
						value:''
					},
					{
						name:'高级营销经理',
						value:''
					},
					{
						name:'营销经理',
						value:''
					},
					{
						name:'营销顾问',
						value:''
					},
					{
						name:'高级营销顾问',
						value:''
					},
					{
						name:'主编',
						value:''
					},
					{
						name:'区域经理',
						value:''
					},
					{
						name:'城市群负责人',
						value:''
					}
				],
				ruleValidate:{
					account: [
            { required: true, message: '域账号不能为空', trigger: 'blur' }
          ],
          staffId: [
            { required: true, message: '员工编号不能为空', trigger: 'blur' }
          ],
          staffName: [
            { required: true, message: '员工姓名不能为空', trigger: 'blur' }
          ],
          leader: [
            { required: true, message: '请输入员工上级', trigger: 'change' }
          ],
          department: [
            { required: true, message: '请选择所属部门', trigger: 'change' }
          ],
          status: [
            { required: true, message: '请选择状态', trigger: 'change' }
          ],
          position: [
            { required: true, message: '请选择职位', trigger: 'change' }
          ],
          classify: [
            { required: true, message: '请选择员工分类', trigger: 'change' }
          ]
				},
				formItem:{
					sex:"",
					telephone:"",
					phone:""
				}
			}
		},
		created(query){
			this.getStaffInfo()
		},
		methods:{
			getStaffInfo(){
				this.$http.get(config.urlList.getStaffList,{
					params:{
						employeeId:this.$route.query.id
					}
				}).then((res)=>{//获取列表
	        if(res.data.errorCode===0){
	        	// this.pageObj.total=res.data.result.totalCount
	         //  this.pageObj.pageNo=res.data.result.pageNo
	         //  this.tableData = res.data.result.resultList;
	         //  this.dealMess();
	         console.log(res.data.result.resultList);
	         this.formValidate.account = res.data.result.resultList[0].username
	         	// this.formValidate = res.data.result.resultList;
	        }
	        else {
	          this.$Modal.info({
	              title: '提示',
	              content: res.data.errorMsg
	          });
	        }
	        }).catch((res)=>{
	      })
			}
		}
	}
</script>