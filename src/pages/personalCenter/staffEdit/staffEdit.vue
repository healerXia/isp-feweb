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
	        <span>{{formValidate.staffId}}</span>
	    	</Form-item>
	    	<Form-item label="员工姓名" prop="staffName">
	        <span>{{formValidate.staffName}}</span>
	    	</Form-item>
				<Form-item label="员工上级" prop="leader">
	        <Select v-model="formValidate.leader" 	
	          placeholder="请输入员工上级" 
	          clearable
						filterable
          	remote
						:loading="leaderLoading"
          	:remote-method="getStaffList">
	          <Option v-for="item in staffList" :value="item.employeeId">{{item.displayName}}</Option>
	          </Select>
	    	</Form-item>
	    	<Form-item label="所属部门" prop="department">
	        <Select v-model="formValidate.department" 	
	          placeholder="请选择所属部门" 
	          clearable
						filterable
          	remote
						:loading="departLoading"
          	:remote-method="getDepartList">
	          <Option v-for="item in departList" :value="item.id">{{item.fullPath}}</Option>
	        </Select>
	      </Form-item>
				<Form-item label="员工状态" prop="status">
	        <Radio-group v-model="formValidate.status">
	            <Radio value=0>启用</Radio>
	            <Radio value=-1>停用</Radio>
	        </Radio-group>
	      </Form-item>
	      <Form-item label="职位" prop="position">
	        <Select clearable v-model="formValidate.position" 
	        	placeholder="请选择职位"
	        	clearable 
	        	>
	        	<Option v-for="item in selectedPosition" :value='item.id'>{{ item.name }}</Option>
	        </Select>
	    	</Form-item>
	    	<Form-item label="员工分类" prop="classify">
	        <Select v-model="formValidate.classify" 
	        placeholder="请选择员工分类"
	        clearable 
	        >
						<Option v-for="item in selectedType" :value='item.id'>{{ item.name }}</Option>
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
				leaderLoading:true,
				departLoading:true,
				formValidate:{
					account:"",//域账号
					staffId:"",//员工编号
					staffName:"",//员工姓名
					leader:"",//员工上级
					department:"",//所属部门
					status:"",//员工状态
					position:"",//职位
					classify:""//员工分类
				},
				selectedType: [],
				selectedPosition:[],
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
            { required: true, message: '请选择所属部门', trigger: 'change',type:"number"}
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
				departList: null,
				staffList:null,
				formItem:{
					sex:"",
					telephone:"",
					phone:""
				}
			}
		},
		created(query){
			let id = this.$router.currentRoute.query.id;
			if (id) {
				this.getStaffInfo();
			}
			else {
				this.getStaffList("");
				this.getDepartList("");
				this.getPosition();
				this.getEmpType();
			}

		},
		methods:{
			//分类
			getEmpType() {
				this.$http.get(config.urlList.getEmpType).then((res) => {
					if (res.data.errorCode === 0) {
						let data = res.data.result;
						for (let attr in data) {
								this.selectedType.push({
									id: attr,
									name: data[attr]
								})
						}
					}
				})
			},
			initManageList(id) {
				this.$http.get('/isp-process-server/employee/getPageList', {
					params: {
						pageIndex: 1,
						pageSize: 9999
					}
				}).then((res) => {
					if (res.data.errorCode == 0) {
							let data = res.data.result.resultList;
							for (let i = 0; i < data.length; i++) {

								if (id == data[i].employeeId) {
									console.log(id);
									this.staffList = [];
									this.leaderLoading = false;
									this.staffList.push({
										employeeId: data[i].employeeId,
										displayName: data[i].displayName
									})

									setTimeout(() => {
										this.formValidate.leader = `${id}`;
									}, 1000)
									return ;
								}
							}
					}
					else {
						this.$Modal.info({
                title: title,
                content: res.data.errorMsg
            });
					}
				}).catch((err) => {
					console.log(err);
				})
			},

			//职位
			getPosition(name){
				this.$http.get(config.urlList.getEmpPosition).then((res)=>{
					if(res.data.errorCode===0){
						let data = res.data.result;
						for (let attr in data) {
								if (name) {

									 if (name == data[attr]) {
											this.formValidate.position = attr;
									 }
								}

								this.selectedPosition.push({
									id: attr,
									name: data[attr]
								})
						}
						// this.selectedPosition = res.data.result.resultList;

					}
				})
			},
			//员工列表
			getStaffList(query){
				this.leaderLoading=true
				this.$http.get(config.urlList.getStaffList,{
					params:{
						displayName:query
					}
				}).then((res)=>{
					if(res.data.errorCode===0){
						this.staffList=res.data.result.resultList;
						this.leaderLoading=false
					}
				 else {
	          this.$Modal.info({
	              title: '提示',
	              content: res.data.errorMsg
	          });
	        }
	        }).catch((res)=>{
	      })
			},
			//部门列表
			getDepartList(query){
				this.departLoading=true
				this.$http.get(config.urlList.getDepartList,{
				params:{
					deptName:query
			}	
				}).then((res)=>{
					if(res.data.errorCode===0){
						this.departList=res.data.result.resultList;
						// console.log(this.departList)
						this.departLoading=false
					}
 					else {
	          this.$Modal.info({
	              title: '提示',
	              content: res.data.errorMsg
	          });
	        }
	        }).catch((res)=>{
	      })
			},
			getStaffInfo(){
				this.$http.get('/isp-process-server/employee/getModel',{
					params:{
						employeeId:this.$route.query.id
					}
				}).then((res) => {//获取列表
	        if (res.data.errorCode === 0) {
	        	let data = res.data.result;

	        	this.formValidate = {
	        		account: data.username,
	        		staffId: data.employeeId,
	        		staffName: data.displayName
	        	}

	        	this.getPosition(data.position);
	        	// this.initManageList(data.managerId);
	        	this.initManageList(14263);


	         // this.formValidate.account = res.data.result.resultList[0].username;
	         // this.formValidate.staffId = res.data.result.resultList[0].employeeId;
	         // this.formValidate.staffName = res.data.result.resultList[0].displayName;
	         
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