<template>
	<div class="edit" style="margin-left:32px">
		<Form class="editform" ref="searchData" :model="searchData" :rules="ruleValidate">
			<From-item>
				<h1 style="margin-top:60px;margin-bottom:18px;">基本信息</h1>
			</From-item>
			<Form-item label="员工姓名" prop="staffName">
					<span class="staffName">{{searchData.staffName}}</span>
      </Form-item>
      <Form-item label="移动电话" prop="staffTelephone">
				  <Input type="text" style="width:400px" class="staffTelephone" v-model="searchData.staffTelephone"></Input>
      </Form-item>
      <Form-item label="所属部门" prop="staffBranch">
				<Input type="text" style="width:400px" class="staffBranch" v-model="searchData.staffBranch"></Input>
				<span class="editLabel" style="margin-left:20px">经销商智能营销事业部</span>
      </Form-item>
			<div class="showform">
				<From-item>
				  <h1 style="margin-top:20px">代理审批人信息</h1>
				</From-item>
				<From-item class="approvalSpans">
					<Row>
		        <Col span="8" class="showLabel">代理审批人</Col>
		        <Col span="8" class="showLabel">有效时间</Col>
		        <Col span="8" class="showLabel">单据类型</Col>
		    	</Row>
				</From-item>
				<!-- <div v-html="rawHtml"> -->
					<Row v-for="(searchData,index) in proxyInfo" class="inputSpans" :key="new Date()">
		        <Col span="8">
		        	<Input placeholder="请输入代理审批人" v-model="searchData.approver" style="width:300px"></Input>
		        </Col>
		        <Col span="8">
							 <Date-picker class="validtime" @on-change="searchData.saveDate" type="daterange" :options="options2" placement="bottom-end" placeholder="请输入有效时间" :value="[searchData.startDate,searchData.endDate]" style="width: 300px"></Date-picker>
						</Col>
		        <Col span="8">
			        <Select v-model="searchData.type" style="width:70px">
								<Option v-for="option in selectData.typeList" :value="option.label" :key="option.label">{{option.name}}</Option>
							</Select>
						</Col>
		    	</Row>
					<Button type="primary" class="addRow" @click="addRow">+添加行</Button>
				<!-- </div> -->
			</div>
		</Form>
		<div class="btns">
			<!-- <Button type="primary" class="btn" @click="savecon">保存并继续</Button>
 -->			<Button type="primary" class="btn" @click="save('searchData')">保存</Button>
			<Button type="primary" class="btn btn3" @click="cencel">取消</Button>
		</div>
	</div>
</template>
<style>
	.edit{
	}
	.edit .editform .editLabel{
		font-family: PingFangSC-Regular;
		font-size: 12px;
		color: #7B8497;
		line-height: 12px;
	}
	.edit .editform .showName{
		height: 38px;
		line-height: 38px;
		margin-top: 30px;
	}
	.edit .editform .staffName{
		display: inline-block;
		height: 12px;
		width: 60px;
		margin-left: 15px;
		font-family: PingFangSC-Regular;
		font-size: 12px;
		color: #7B8497;
		line-height: 12px;
	}
	.edit .editform input{
		margin-left: 14px;
	}
	.edit .showform .approvalSpans{
		display: inline-block;
		width: 1104px;
		height: 56px;
		line-height: 56px;
		/*background: rgb(249, 250, 252);*/
		/*#F9FAFC;*/
		color: #7B8497;
	}
	.edit .showform .showLabel{
		background:#F9FAFC;
		padding-left: 10px;
	}
	.ivu-input,.ivu-select-selection{
		margin-top: 9px;
	}
	.ivu-col {
    background: transparent;
	}
	.ivu-form-item-error-tip{
		position: absolute;
    left: 400px;
	}
	.edit .showform .showLabel{
		font-family: .PingFangSC-Regular;
		font-size: 14px;
		color: #7B8497;
		letter-spacing: 0.52px;
	}
	.edit .showform .inputSpans{
		width: 1105px;
		height: 56px;
		box-shadow: 0 1px 0 0 #DEE1E5;
		border: none;
	}
	.ivu-icon-ios-calendar-outline:before {
    content: none;
	}
	/*请输入有效时间的小图标*/
	/*.ivu-input-icon{
		height: 56px;
		line-height: 56px;
	}*/
	/*.edit .showform .inputSpans .ivu-input,.edit .showform .inputSpans .ivu-select-selection{
		height: 56px;
	}*/
	/*请选择*/
	/*.ivu-select-single .ivu-select-selection .ivu-select-placeholder,.ivu-select-single .ivu-select-selection .ivu-select-selected-value{
		height: 56px;
		line-height: 56px;
	}*/
	.edit .showform .addRow{
		width: 120px;
		height: 38px;
		margin-top:16px; 
	}
	.edit .btns{
		margin-top:30px;
		margin-left:60px;
	}
	.edit .btns .btn{
		width: 120px;
		height: 38px;
		margin-left: 20px;
	}
	.edit .btns .btn3{
		background: #484E58;
	}

</style>
<script>
	export default {
		data() {
			return {
				searchData:{
					staffName:"赵斌",//员工姓名
					staffTelephone:"",//员工电话
					staffBranch:"",//所属部门
					//approver:"",//代理审批人
					//validtime:""//有效时间
				},

				proxyInfo:[
					{approver:"",startDate:"",endDate:"",type:""}
				],

				ruleValidate: {
	        staffTelephone: [
	            { required: true, message: '电话不能为空', trigger: 'blur' }
	        ],
	        staffBranch: [
	            { required: true, message: '部门不能为空', trigger: 'blur' }
	        ]
        },

				selectData:{
					typeList:[
					  {
						  name:"选项一",
						  label:"1"
					  },
					  {
						  name:"选项二",
						  label:"2"
					  }
				  ],
				  type: "",
				},
				options1: {
          shortcuts: [
            {
              text: '今天',
              value () {
                return new Date();
              },
              onClick: (picker) => {
                this.$Message.info('点击了今天');
              }
            },
            {
              text: '昨天',
              value () {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                return date;
              },
              onClick: (picker) => {
                this.$Message.info('点击了昨天');
              }
            },
            {
              text: '一周前',
              value () {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                return date;
              },
              onClick: (picker) => {
                this.$Message.info('点击了一周前');
              }
            }
          ]
        },
        options2: {
          shortcuts: [
            {
              text: '最近一周',
              value () {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                return [start, end];
              }
            },
            {
              text: '最近一个月',
              value () {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                return [start, end];
              }
            },
            {
              text: '最近三个月',
              value () {
                const end = new Date();
                const start = new Date();
                start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                return [start, end];
              }
            }
          ]
        }
			}
		},
		create(){

		},
		beforeMount(){
			this.getInfo();
		},
		methods:{
			addRow(){
				this.proxyInfo.push({
					approver:"",
					startDate:"",
					endDate:"",
					type:""
				});
			},

			save(name){
				//jiekou
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success('提交成功!');
            this.$router.push("/index");
          } else {
            this.$Message.error('表单验证失败!');
          }
        })
				//console.log(this.searchData,this.proxyInfo);
				// this.$router.push("/index");
			},

			cencel(){
				this.$router.push("/index");
			},

			getInfo(){
				//success data
				let data = {
					staffName:"赵斌",//员工姓名
					staffTelephone:"",//员工电话
					staffBranch:"",//所属部门
					proxyInfo:[
						{
							approver:"zhaosi",startDate:"2017-07-18",endDate:"2017-07-18",type:"1",
							saveDate:function(date){
								console.log(this);
							}
						},
						{
							approver:"liunneg",startDate:"2017-07-18",endDate:"2017-07-18",type:"2",
							saveDate:function(date){
								console.log(this);
							}
						}
					],
				}

				this.searchData = data;
				this.proxyInfo = data.proxyInfo;
			},

			// saveDate(date){
			// 	console.log(date);

			// },
		}
	}
</script> 