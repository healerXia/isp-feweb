<template>
	<div class="edit">
		<ul class="editform">
			<li>
				<h1>基本信息</h1>
			</li>
			<li>
				<div>
					<span class="editLabel">员工姓名</span>
					<span class="staffName">{{searchData.staffName}}</span>
				</div>	
			</li>
			<li>
				<div class="inputbox">
				  <span class="editLabel">移动电话</span>
				  <Input type="text" style="width:400px" class="staffTelephone" v-model="searchData.staffTelephone"></Input>
				</div>
			</li>
			<li>
				<div class="inputbox">
				  <span class="editLabel">所属部门</span>
				  <Input type="text" style="width:400px" class="staffBranch" v-model="searchData.staffBranch"></Input>
				  <span class="editLabel" style="margin-left:20px">经销商智能营销事业部</span>
				</div>
			</li>
		</ul>
		<ul clas="showform">
			<li>
				<h1>代理审批人信息</h1>
			</li>
		<!-- <Row>
	        <Col span="8" class="showLabel">代理审批人</Col>
	        <Col span="8" class="showLabel">有效时间</Col>
	        <Col span="8" class="showLabel">单据类型</Col>
		  </Row>
			<Row v-for="(searchData,index) in proxyInfo" class="inputSpans">
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
			<Button type="primary" class="addRow" @click="addRow">+添加行</Button> -->
		</ul>
		<div>
			<span class="btns" @click="savecontinue">保存并继续</span>
			<span class="btns" @click="save">保存</span>
			<span class="btns" @click="cancel">取消</span>
		</div>
	</div>
</template>

<style type="text/css">
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
		width: 1104px;
		height: 56px;
		line-height: 56px;
		background: #F9FAFC;
		color: #7B8497;
	}
	.ivu-input,.ivu-select-selection{
		margin-top: 9px;
	}
	.ivu-col {
    background: transparent;
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
	export default{
		data(){
			return {
				selectData:{
					staffName:"赵斌",//员工姓名
					staffTelephone:"",//员工电话
					staffBranch:"",//所属部门
					approver:"",//代理审批人
					validtime:""//有效时间
				},
				selectData:{
					orderStatusArr:[
					  {
						  name:"选项一",
						  value:1
					  },
					  {
						  name:"选项二",
						  value:2
					  }
				  ]
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
		methods:{
			addRow(){
				this.proxyInfo.push({
					approver:"",
					startDate:"",
					endDate:"",
					type:""
				});
			},
			savecontinue(){

			},
			save(){

			},
			cancel(){

			}
		}
	}
</script>