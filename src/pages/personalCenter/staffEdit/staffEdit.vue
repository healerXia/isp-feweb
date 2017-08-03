<template>
	<div class="staffEdit">
		<div class="staffEdit-title">
			<span class="title MT20 MB20">员工编辑</span>
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
	        	id='manager'
	        	ref='manager' 	
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
	        	id='department'
	        	ref='department'
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
	        <Radio-group v-model="status" class='fl'  @on-change='staffStatus'>
	          <Radio label="0">启用</Radio>
	          <Radio label="-1">停用</Radio>
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
	     	<Form-item label="性别" prop="sex">
					<Radio-group v-model="sex" class='fl' @on-change='staffSex'>
	          <Radio label="1">男</Radio>
	          <Radio label="0">女</Radio>
	        </Radio-group>
				</Form-item>
				<Form-item label="移动电话" prop="telephone">
					<Input v-model="formValidate.telephone" placeholder="1**********"></Input>
				</Form-item>
				<Form-item label="联系电话" prop="phone">
					<Input v-model="formValidate.phone" placeholder="010-66666666"></Input>
				</Form-item>
			</Form>
		</div>
		<!-- <div class="formValidate">
			<Form ref="formValidate" :model="formValidate" :rules="ruleItem" :label-width="80" label-position="right">
				<Form-item label="性别" prop="sex">
					<Radio-group v-model="formValidate.sex" class='fl'>
	          <Radio label="1">男</Radio>
	          <Radio label="0">女</Radio>
	        </Radio-group>
				</Form-item>
				<Form-item label="移动电话" prop="telephone">
					<Input v-model="formValidate.telephone" placeholder="1**********"></Input>
				</Form-item>
				<Form-item label="联系电话" prop="phone">
					<Input v-model="formValidate.phone" placeholder="010-66666666"></Input>
				</Form-item>
			</Form>
		</div> -->
		<div class="btns">
			<Button class="btn bg4373F3" type="primary" @click="handleSubmit('formValidate')">保存</Button>
    	<Button class="btn bgCancle" type="primary" @click="handleReset('formValidate')" style="margin-left: 8px">取消</Button>
		</div>
	</div>
</template>

<style lang="scss">
	.staffEdit{
		padding-left: 30px;
    width: 100%;
		.title{
			display:inline-block;
      font-size: 14px;
      color: #333;
    }
		.formValidate{
			border-bottom:1px dashed #ccc;
			padding-bottom:50px;
			Form{
				$inputH:32px;
        width: 100%;
        box-sizing: border-box;
        input,.ivu-select{width: 400px; float: left;}
        .budget{
          .unit{
            float: left;
            margin-left: 5px;
          }
          .unit+ .ivu-form-item-error-tip{
            left: 430px;
          }
        }
			}
		}
		.btns{
			margin-top:15px;
			margin-left:80px;
		}
	}
</style>

<script>
import config from './config.js';
	export default{

		data(){
			const validateTelephone = (rule,value,callback) => {
				if(value == ''){
					callback();
				}
				else{
					if(value.length !== 11){
						callback(new Error('请查看你得移动电话是否输入正确'));
					} else {
						callback();
					}
				}
			};
			const validatePhone = (rule,value,callback) => {
				if(value == ''){
					callback();
				}
				else{
					if( value.length != 11 && value.length != 12 ){
						callback(new Error('请查看你得联系电话是否输入正确'));
				  } else {
						callback();
					}
				}
			};
			return{
				leaderLoading:true,
				departLoading:true,
				oldData: {
					managerName: ''
				},
				sex: '',
				status: '',
				formValidate:{
					account:"",//域账号
					staffId:"",//员工编号
					staffName:"",//员工姓名
					leader:"",//员工上级
					department:"",//所属部门
					status: '0',//员工状态
					position:"",//职位
					classify:"",//员工分类
					sex:"",//性别
					telephone:"",//移动电话
					phone:""//联系电话
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
          // status: [
          //   { required: true, message: '请选择状态', trigger: 'change' }
          // ],
          position: [
            { required: true, message: '请选择职位', trigger: 'change' }
          ],
          classify: [
            { required: true, message: '请选择员工分类', trigger: 'change' }
          ],
          telephone: [
	          { validator: validateTelephone, trigger: 'blur' }
	            // { required: true, message: '移动电话不能为空', trigger: 'blur' },
	            // { test: /\1+[0-9]{10}/, message: '请查看你得移动电话是否输入正确', trigger: 'blur'}
          ],
        	phone: [
            { validator: validatePhone, trigger: 'blur' }
            // { required: true, message: '联系电话不能为空', trigger: 'blur' },
            // { test: /[0-9]{4}+\-+[0-9]{7}/, message: '请查看你得联系电话是否输入正确', trigger: 'blur'}
          ]
        },
        // ruleItem:{
        //   telephone: [
	       //    { validator: validateTelephone, trigger: 'blur' }
	       //      // { required: true, message: '移动电话不能为空', trigger: 'blur' },
	       //      // { test: /\1+[0-9]{10}/, message: '请查看你得移动电话是否输入正确', trigger: 'blur'}
        //   ],
        // 	phone: [
        //     { validator: validatePhone, trigger: 'blur' }
        //     // { required: true, message: '联系电话不能为空', trigger: 'blur' },
        //     // { test: /[0-9]{4}+\-+[0-9]{7}/, message: '请查看你得联系电话是否输入正确', trigger: 'blur'}
        //   ]
        // },
				departList: null,
				staffList:null,
				submitStatus: false
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
			//取消
			handleReset (name) {
        this.$Modal.confirm({
          title: '提示',
          content: '是否取消当前操作并跳转至列表页？',
          cancel: '取消',
          onOk: () => {
              this.$router.push('staffManage');
          }
        });
      },
			//保存
			handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
          	this.$http.post(config.urlList.save,
          		{
          			username:this.formValidate.account,
          			phone:this.formValidate.phone,
          			mobile:this.formValidate.telephone,
          			departName:this.formValidate.department,
          			fullPath:this.formValidate.department,
          			manager:this.formValidate.leader,
          			position:this.formValidate.position,
          			employeeType:this.formValidate.classify,
          			sexstr:this.formValidate.sex,
          			delAgent:false,
          		}
				    ).then((res) => {

				    	console.log(res.data.result);
				    	// username = this.formValidate.account;
        	// 		phone = this.formValidate.phone;
        	// 		mobile = this.formValidate.telephone;
        	// 		deptId = this.formValidate.department;
				    	this.$Message.success('提交成功!');
				    })
              
          } else {
              this.$Message.error('表单验证失败!');
          }
        })
      },
			//选择员工状态
			staffStatus() {
				this.formValidate.status = this.status;
			},
			//选择性别
			staffSex() {
				this.formValidate.sex = this.sex;
			},
			//员工列表
			getStaffList(query){
				//console.log(query);
				if (query == this.oldData.managerName) {
					setTimeout(() => {
						document.querySelector('#manager .ivu-select-input').value = this.oldData.managerName;
					})
					return ;
				}
				if (query) {
					this.leaderLoading =true;
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
		      }).catch((res)=>{})
				}
			},
			//部门列表
			getDepartList(query){
				if (query == this.oldData.departName) {
					setTimeout(() => {
						document.querySelector('#department .ivu-select-input').value = this.oldData.departName;
					})
					return ;
				}

			  if (query) {
			  	this.departLoading=true
			  	this.$http.get(config.urlList.getDepartList,{
					params:{
						fullPath:query
					}	
			  }).then((res)=>{
					if(res.data.errorCode===0){
					  this.departList=res.data.result.resultList;
					  this.departLoading=false
					}
						else {
					  this.$Modal.info({
						  title: '提示',
						  content: res.data.errorMsg
					  });
		      }
		    }).catch((res)=>{})
			  }
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
			//分类
			getEmpType(name) {
				this.$http.get(config.urlList.getEmpType).then((res) => {
					if (res.data.errorCode === 0) {
						let data = res.data.result;
						for (let attr in data) {
							if (name) {
									 if (name == data[attr]) {
											this.formValidate.classify = attr;
									 }
								}
							this.selectedType.push({
								id: attr,
								name: data[attr]
							})
						}
					}
				})
			},
			//回填
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

	        	this.getPosition(data.position);//职位
	        	this.getEmpType(data.employeeType);//员工分类

	        	this.staffList = [];
	        	this.leaderLoading = false;
	        	this.staffList.push({
	        		employeeId: res.data.result.managerId,
	        		displayName: res.data.result.managerName
	        	})

	        	this.formValidate.department = res.data.result.deptId;
	        	this.status = this.formValidate.status = res.data.result.status;
	        	//this.getPosition(res.data.result.position);
	        	//this.getEmpType(res.data.result.employeeType);
	        	this.sex = res.data.result.sex;
	        	this.formValidate.telephone = res.data.result.mobile;
	        	this.formValidate.phone = res.data.result.phone;


	        	setTimeout(() => {
	        		this.formValidate.leader = res.data.result.managerId;
	        		this.$refs.manager.selectedSingle = res.data.result.managerName;
	        		this.oldData.managerName = res.data.result.managerName;
	        		this.$refs.manager.query = res.data.result.managerName;
	        		setTimeout(() => {
	        			document.querySelector('#manager .ivu-select-input').value = this.oldData.managerName;
	        		})
	        	})

	        	return this.$http.get(config.urlList.getDepartList, {
	        		params: {
	        			pageIndex: 1,
	        			pageSize: 9999
	        		}
	        	})

		        }
		        else {
		          this.$Modal.info({
		              title: '提示',
		              content: res.data.errorMsg
		          });
		        }
	        })
				.then((res) => {
	        	if (res.data.errorCode == 0) {
	        		let data = res.data.result.resultList;
	        		let fullPath = '';
	        		for (let i = 0; i < data.length; i++) {
	        			if (this.formValidate.department == data[i].id) {
	        				this.departLoading = false;
	        				this.departList = [];
	        				this.departList.push({
	        					id: data[i].id,
	        					fullPath: data[i].fullPath
	        				})

	        				fullPath = data[i].fullPath;
	        			}
	        			break;
	        		}

	        		setTimeout(() => {
		        		this.$refs.department.selectedSingle = fullPath;
		        		//this.$refs.department.selectedSingle.query = fullPath;
		        		this.oldData.departName = fullPath;

		        		setTimeout(() => {
		        			document.querySelector('#department .ivu-select-input').value = fullPath;
		        		})
	        		})

	        	}
	        	//console.log(this.formValidate)
	        })
				.catch((res)=>{
	      })
			}
		}
	}
</script>