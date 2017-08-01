<template>
	<div class="staffmanage">
		<Form ref="formItem" :model="formItem" label-position="right">
			<Form-item label="员工编号" prop="staffId">
				<input class="descripive" v-model="formItem.staffId" filterable placeholder="请输入员工编号"></input>
			</Form-item>
			<Form-item label="员工姓名" prop="staffName">
				<input class="descripive" v-model="formItem.staffName" filterable placeholder="请输入员工姓名"></input>
			</Form-item>
			<Form-item label="所属部门" prop="staffId">
				<input class="descripive" v-model="formItem.department" filterable placeholder="请输入所属部门"></input>
			</Form-item>
			<Form-item>
				<Button type="primary" @click="searchMess">查询</Button>
			</Form-item>
		</Form>
		<div class="listTable">
      <Table stripe disabled-hover :columns="columns" :data="tableData" @on-selection-change="selectChange"></Table>
      <Button type="primary" @click="stop">停用</Button>
      <Button type="primary" @click="start">启用</Button>
      <Page :total="pageObj.total" class="MT30" size="small"
        :current="pageObj.pageNo"
        :page-size-opts="pageSizeOpts"
        :page-size="20"
        show-elevator
        show-sizer
        @on-change="pageChange"
        @on-page-size-change="pageSizeChange">
      </Page>
    </div>
	</div>
</template>

<style lang="scss">
	.staffmanage{
		.ivu-form{
	    background: #F9FAFC;
	    padding:50px 0 26px 24px;
	    .ivu-form-item{
	      width:362px;
	      height:38px;
	      margin-top:15px 0 0 0;
	      display:inline-block;
	      .ivu-form-item-label{
	        width: 63px;
	        height: 38px;
	        display: inline-block;
	        float: left;
	        text-align: right;
	        padding-right: 15px;
	        font-size: 12px;
	        color: #7B8497;
	      }
	      input{
	        width:280px;
	        height:38px;
	        background: #FFFFFF;
	        border: 1px solid #DEE1E5;
	        border-radius: 2px;
	        font-size: 12px;
	        letter-spacing: 0.44px;
	        padding-left:8px;
	        :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
	          color: #7B8497 ; opacity:1; 
	        }
	        ::-moz-placeholder { /* Mozilla Firefox 19+ */
	          color: #7B8497 ;opacity:1;
	        }
	        input:-ms-input-placeholder{
	          color: #7B8497 ;opacity:1;
	        }
	        input::-webkit-input-placeholder{
	          color: #7B8497 ;opacity:1;
	        }
	      }
	      .ivu-btn{
	        height:38px;
	        width:120px;
	        margin-left:954px;
	        font-family: MicrosoftYaHei;
	        font-size: 14px;
	        color: #FFFFFF;
	        letter-spacing: 0.52px;
	      }
	      .ivu-btn-primary{
	        background: #3D70FB;
	        border-radius: 2px;
	      }
		  }
		}
	  .listTable{
	    width: 100%;
	    padding: 30px;
	    .ivu-table-wrapper{
	      border:none;
	      thead{
	        th{
	          border:none;
	        }
	      }
	    }
	  }
	}
</style>

<script>
	import config from './config.js';
	export default {
    data () {
      return {
      	pageObj:{
          tatal:0,
          pageIndex:1,
          pageSize:20
        },
				formItem:{
					staffId:"",//员工编号
					staffName:"",//员工姓名
					department:""//所属部门
				},
				columns:[
          {
            type: 'selection',
            width: 70,
            align: 'center'
          },
          {
            title:'员工编号',
            key:'employeeId',
            width:100
          },
          {
            title:'域账号',
            key:'username'
          },
          {
            title: '员工姓名',
            key: 'displayName'
          },
          {
            title: '职位',
            key: 'position'
          },
          {
            title: '所属部门',
            key: 'fullPath',
            width:256
          },
          {
            title:'状态',
            key:'status',
            width:80
          },
          {
            title: '操作',
            width:80,
            render: (h, params) => {
              return h('a', {
                attrs: {
                  href: '#/index/staffEdit?id='+params.row.employeeId
                }
              },'编辑');
            }
          }
        ],
				tableData:[],
				formParam:{
					employeeId:[],
				}
			}
		},
		created(){
			this.getTableData();
		},
		methods:{
			getTableData(){
				this.$http.get(config.urlList.getStaffList).then((res)=>{//获取列表
	        if(res.data.errorCode===0){
	        	this.pageObj.total=res.data.result.totalCount
	          this.pageObj.pageNo=res.data.result.pageNo
	          this.tableData = res.data.result.resultList;
	          this.dealMess();
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
			dealMess(){
				let tableData=[];
        tableData=this.tableData;
         for(let i=0;i<tableData.length;i++){
          if(tableData[i].status==0){
            tableData[i]['status']="启用"
          }else if(tableData[i].status==-1){
            tableData[i]['status']="停用"
          }
        }
			},
			toParam(objs){
        var str=""
        for(let item in objs){
          if(objs[item]){
            let a=objs[item]
            a=(a+"").replace(/(^\s*)|(\s*$)/g,"")
            str=str+item+"="+a+'&';
          }
        }
        str=str.substring(0,str.length-1) ;
        return str;
      },
			searchMess(){
				// this.formItem.pageIndex=1
    //     this.formItem.pageSize=20
        let str=this.toParam(this.formItem);
        let obj ={}
        if(this.formItem.staffId!=""){
          obj.employeeId=this.formItem.staffId
        }
        if(this.formItem.staffName!=""){
          obj.displayName=this.formItem.staffName
        }
        if(this.formItem.department!=""){
          obj.deptName=this.formItem.department
        }

        // obj.pageSize=20;
        // obj.pageIndex=1;
        console.log(obj);
        this.$http.get(config.urlList.getStaffList, {
        	params:obj
        }).then((res)=>{
            if(res.data.errorCode===0){
              this.pageObj.total=res.data.result.totalCount
              this.pageObj.pageNo=res.data.result.pageNo
              this.totalPages=res.data.result.totalCount;
              this.tableData=res.data.result.resultList;
              this.dealMess()
            }
            else {
              this.$Modal.info({
                title: '提示',
                content: res.data.errorMsg
              });
            }
          });
			},
			//勾选框
			selectChange(data){
				let idStr = ""
				let arr = data.map(item => item.employeeId);
				if (arr.length > 0) {
					// idStr = arr.join(',');
					console.log(idStr);
					this.formParam.employeeId = arr;
					// return idStr;
				}
			},
			//停用函数
			stop(){
				this.$http.post(config.urlList.getStatus,
	        {
	        	employeeIdList:this.formParam.employeeId,
	        	status:-1
	        },
	        {emulateJSON:true}
        ).then((res)=>{//获取列表
          if(res.data.errorCode===0){
            this.getTableData();
          }
          else {
            this.$Modal.info({
              title: '提示',
              content: res.data.errorMsg
            });
          }
        }).catch((res)=>{}
      )},
      //启用函数
			start(){
				this.$http.post(config.urlList.getStatus,
	        {
	        	employeeIdList:this.formParam.employeeId,
	        	status:0
	        },
	        {emulateJSON:true}
        ).then((res)=>{//获取列表
          if(res.data.errorCode===0){
            this.getTableData();
          }
          else {
            this.$Modal.info({
              title: '提示',
              content: res.data.errorMsg
            });
          }
        }).catch((res)=>{})
			},
			//页码
			pageChange(page){
      	this.pageObj.pageIndex = page;
      	this.getTableData();
      },
			InfoList(value){
        this.$http.get(config.urlList.getStaffList). then((res)=>{
          if(res.data.errorCode===0){
            this.tableData = res.data.result;            
          }
          else {
            this.$Modal.info({
                title: '提示',
                content: res.data.errorMsg
            });
          }
        }).catch((res)=>{})
      }
		}
	}
</script>