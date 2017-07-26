<<<<<<< HEAD
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
=======
<template lang="html">
  <div id="edit">
       <p class="title">基本信息</p>

       <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
           <Form-item label="员工姓名" prop="userName">
               <span>{{formValidate.userName}}</span>
           </Form-item>
            <Form-item label="联系电话" prop="phone">
                <Input v-model="formValidate.phone" placeholder="请输入联系电话" class='text fl'></Input>
            </Form-item>
            <Form-item label="移动电话" prop="mobile">
                <Input v-model="formValidate.mobile" placeholder="请输入移动电话" class='text fl'></Input>
            </Form-item>
            <Form-item label="所属部门" prop="deptName">
                <Select v-model="formValidate.deptName" @on-change='selDept' @on-query-change='flterDept' filterable class='text fl'>
                    <Option v-for="item in deptList" :value="item.id" :key="item.value">{{item.name}}</Option>
                </Select>
                <span v-if='deptName' class='fl ML10 info'>[{{deptName}}]</span>
            </Form-item>
       </Form>

       <div class="">
            <p class="title">代理审批人信息</p>
            <Form ref="formDynamic" :model="formDynamic" :label-width="80">
                <table cellspacing="1" cellpadding="0" class="user">
                    <thead>
                        <td>代理审批人</td>
                        <td>有效时间</td>
                        <td>单据类型</td>
                    </thead>
                    <tbody>
                        <tr class="tableInput" v-for='(i, index) in tableList'>
                            <td>
                                <!-- <Select v-model="i.agentEmployeeId" multiple filterable>
                                    <Option v-for="item in employeeList" :value="item.id" :key="item.id">{{ item.name}}</Option>
                                </Select> -->
                            </td>
                            <td>
                                <Date-picker type="date" placeholder="选择日期" options="date1" v-model="i.startDate"></Date-picker>
                                <span>-</span>
                                <Date-picker type="date" placeholder="选择日期" options="date2" v-model="i.endDate"></Date-picker>
                            </td>
                            <td>
                                <Select v-model="i.formTypeId" filterable>
                                    <Option v-for="item in formTypeList" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <div class='btnList'>
                   <Button type="button" @click="handleAdd" icon="plus-round" class='text add' >继续添加</Button>
                </div>
                <Form-item class='submitBtn'>
                    <Button type="primary" @click="handleSubmit('formValidate', 2)" class="save fl" :disabled='submitStatus'>保存</Button>
                    <Button type="ghost" @click="handleReset('formValidate')"  class="cancel fl">取消</Button>
                </Form-item>
            </Form>
       </div>
  </div>
>>>>>>> master
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
<<<<<<< HEAD
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
=======
export default {
    data() {
        return  {
            submitStatus: false,
            formValidate: {
                userName: '',
                phone: '',
                mobile: '',
                deptName: ''
            },
            // date1: {
            //     disabledDate: this.disStart
            // },
            // date2: {
            //     disabledDate: this.disEnd
            // },
            deptListAll: [],
            deptList: [],
            employeeList: [],
            employeeListAll: [],
            formTypeList: [],
            formTypeListAll: [],
            deptName: '',
            tableList: [
                {
                    // 代理人工号
                    agentEmployeeId: [],
                    // 开始时间
                    startDate: '',
                    // 结束时间
                    endDate: '',
                    // 流程类型id
                    formTypeId: ''
                }
            ]
        }
    },
    mounted() {
        this.initDept();
        this.initEmoloyee();
    },
    methods: {
        initDept() {
            this.$http.get('/isp-process-server/depart/getList', {
                params: {
                    pageIndex: 1,
                    pageSize: 9999
                }
            }).then((res) => {
                if (res.data.errorCode == 0) {
                    let data = Object.assign([], res.data.result.resultList);
                    this.deptListAll = data.map(item => {
                        return {
                            id: item.id,
                            name: item.fullPath,
                            deptName: item.deptName
                        }
                    })
                }

            }).catch((err) => {
                console.log(err);
            })
        },
        initEmoloyee() {
            this.$http.get('/isp-process-server/employee/getPageList', {
                params: {
                    pageIndex: 1,
                    pageSize: 9999
                }
            }).then((res) => {
                if (res.data.errorCode == 0) {
                    let data = Object.assign([], res.data.result.resultList);
                    this.employeeListAll = data.map(item => {
                        return {
                            id: item.employeeId,
                            name: item.displayName
                        }
                    })
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        handleSubmit (name, status) {
            this.$refs[name].validate((valid) => {
                if (valid) {

                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        },
        handleReset (name) {
            this.$Modal.confirm({
                title: '提示',
                content: '是否取消当前操作并跳转至列表页？',
                cancel: '取消',
                onOk: () => {
                    this.$router.push('chainManagement');
                }
            });
        },
        handleAdd() {

        },
        selDept(data) {

            for (let i = 0; i < this.deptList.length; i++) {
                if (data == this.deptList[i].id) {
                    console.log(data);
                    this.deptName = this.deptList[i].deptName;
                    return false;
                }
            }
        },
        // 日期判断
        // disBegin(date){
        //     return date && date.valueOf() >new Date(this.tableList[index].endDate);
        // },
        // disEnd(date){
        //     return date && date.valueOf()< new Date(this.tableList[index].startDate)-86400000;
        // },
    }
}
</script>

<style lang="scss" scoped>
#edit {
    padding: 50px 30px;

    .title {
        font-size: 14px;
        color: #354052;
        line-height: 14px;
        padding-bottom: 15px;
    }

    .info {
        font-size: 12px;
        color: #7B8497;
    }

    .text {
        width: 400px;
        height: 38px;
    }

    .user {
        width: 100%;
        min-width: 1104px;

        thead {
            text-align: left;
            background: #F9FAFC;
            border-radius: 2px 2px 0 0;
        }

        td {
            height: 56px;
            //text-indent: 30px;
            width: 33.3333%;
            padding-left: 30px;
        }

        tbody {
            tr {
                box-shadow: 0 1px 0 0 #DEE1E5;
            }

            td {
                padding: 4px 0 4px 30px;
            }
        }

        .tableInput {
            td {
                .text {
                    width: 80%;
                }
            }
        }
    }

    .add {
        margin-top: 16px;
        width: 120px;
        height: 38px;
        background: #3D70FB;
        border-radius: 2px;
        color: #fff;
    }

    .submitBtn {
        margin-top: 30px;
    }

    .saveNext, .save {
        margin-right: 20px;
        width: 120px;
        height: 38px;
        background: #4373F3;
        border-radius: 2px;
        border-color: #4373F3;

        &:hover {
            opacity: 0.9;
        }
    }

    .cancel {
        width: 120px;
        height: 38px;
        background: #484E58;
        border-radius: 2px;
        color: #fff;
        border-color: #484E58;

        &:hover {
            opacity: 0.9;
        }
    }
}
</style>
>>>>>>> master
