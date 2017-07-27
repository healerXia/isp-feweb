<template>
  <div>
    <span>1111</span>
  </div>
</template>
<!-- <template lang="html">
  <div class="custList">
    <div class="searchList">
      <ul>
        <li>
          <div class="inputBox">
            <span class="formLabel">客户名称</span>
            <Input v-model="searchData.custName" placeholder="请输入客户名称" ></Input>
          </div>
          <div class="inputBox ML30">
            <span class="formLabel">客户编号</span>
            <Input v-model="searchData.custId" placeholder="请输入客户编号" ></Input>
          </div>
          <div class="inputBox ML30">
            <span class="formLabel">主营品牌</span>
            <Select v-model="searchData.brand">
              <Option v-for="item in brandOption" :value="item.value" :key="new Date()">{{ item.option }}</Option>
            </Select>
          </div>
        </li>
        <li class='MT15'>
          <div class="selectBox">
            <span class="formLabel">客户地区</span>
            <Select v-model="searchData.district1" class="smallSelect">
              <Option v-for="item in labelOption1" :value="item.value" :key="new Date()">{{ item.option }}</Option>
            </Select>
            <Select v-model="searchData.district2" class="smallSelect">
              <Option v-for="item in labelOption2" :value="item.value" :key="new Date()">{{ item.option }}</Option>
            </Select>
            <Select v-model="searchData.district3" class="smallSelect">
              <Option v-for="item in labelOption3" :value="item.value" :key="new Date()">{{ item.option }}</Option>
            </Select>
          </div>
          <div class="inputBox ML30">
            <span class="formLabel">客户类别</span>
            <Select v-model="searchData.custType">
              <Option v-for="item in typeOption" :value="item.value" :key="new Date()">{{ item.option }}</Option>
            </Select>
          </div>
          <div class="inputBox ML30">
            <span class="formLabel">客户标签</span>
            <Select v-model="searchData.custLabel">
              <Option v-for="item in labelOption" :value="item.value" :key="new Date()">{{ item.option }}</Option>
            </Select>
          </div>
        </li>
        <li class='MT15'>
          <div class="inputBox">
            <span class="formLabel">审核状态</span>
            <Select v-model="searchData.review">
              <Option v-for="item in reviewStatus" :value="item.value" :key="new Date()">{{ item.status }}</Option>
            </Select>
          </div>
          <div class="inputBox ML30">
            <span class="formLabel">负责员工</span>
            <Input v-model="searchData.staff"></Input>
          </div>
          <div class="inputBox ML30">
            <Button type="primary" @click="query()">查询</Button>
            <Button type="ghost" @click="reset('searchData')">重置</Button>
          </div>
        </li>
      </ul>
    </div>
    <div class="listTable MT30">
      <span class="addProBtn ML15">
        <router-link :to="{path:'createPro'}">
          添加项目
        </router-link>
      </span>
      <table>
        <thead>
          <tr>
            <td v-for="item in tableData.thead">{{item}}</td>
          </tr>
        </thead>
        <tbody>
           <tr v-for="tbodyData in tableData.tbody">
            <td v-for='key in tableData.theadKey'>
              <span v-if="key!='custName'&&key!='expectUvCount'&&key!='expectPvCount'">{{tbodyData[key]}}</span>
              <span v-else-if="key=='expectUvCount'||key=='expectPvCount'">{{(tbodyData[key]+"").replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')}}</span>
               <router-link
                :to="{path:'details',query: {id:tbodyData.id}}"
                v-else-if="key=='projectName'">
                  {{tbodyData[key]}}
                </router-link>
            </td>
          </tr>
        </tbody>
      </table>
       <Page :total="totalPages" class="MT30" size="small"
       :current="searchData.pageIndex"
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
<script>

import config from './config.js';

 export default {
    data() {
      return {
        searchStr:"",
        pageSizeOpts:[20],
        totalPages:0,
        searchData:{
          pageIndex:1,
          pageSize:20,
          custName:"",//客户名称
          custId:"",//客户编号
          brand:"",//主营品牌
          district1:'',//客户地区
          custType:"",//客户类别
          custLabel:"",//客户标签
          review:"",//审核状态
          staff:""//负责员工
        },
        brandOption:[
          {
            option:'品牌一',
            value:11
          },
          {
            option:'品牌二',
            value:12
          },
        ],

        typeOption:[
          {
            option:'类别一',
            value:21
          },
          {
            option:'类别二',
            value:22
          }
        ],
        labelOption:[
          {
            option:'标签一',
            value:31
          },
          {
            option:'标签二',
            value:32
          }
        ],
        reviewStatus:[
          {
            status:'待确认',
            value:41
          },
          {
            status:'待完善',
            value:42
          },
          {
            status:'审核通过',
            value:43
          },
          {
            status:'待审核',
            value:44
          },
          {
            status:'已停用',
            value:45
          }
        ],
        tableData:{
          theadKey:['custName','custType','brand','','staff','custLabel','review'],
          thead:[
          "客户名称","客户类别","主营品牌","客户地区","负责员工","客户标签",'审核状态'],
          tbody:[]
        }
      }
    },
    created() {
      let str=this.toParam(this.searchData);
      this.$http.post(config.urlList.getList+"?"+str,
        {
          emulateJSON:true
        }).then((res)=>{
          if(res.data.errorCode===0){
            let _this=this
            this.totalPages=res.data.result.totalCount;
            this.tableData.tbody=res.data.result.resultList
            Array.from(this.tableData.tbody).forEach(function (p) {
              let d=new Date(p.beginDate)
              p.beginDate=_this.formatDate(d)
            });
          }
          else {
            this.$Modal.info({
                title: '提示',
                content: res.data.errorMsg
            });
          }
        });
    },
    methods: {
      exportFile(){
        //http://172.20.11.108:8080
        window.location.href="/isp-kongming/project/toExcel?"+this.searchStr
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
      pageSizeChange(value){
      },
      pageChange(num){
        this.searchData.pageIndex=num
        this.searchData.pageSize=20
        let str=this.toParam(this.searchData);
        this.$http.post(config.urlList.getList+"?"+str,
          {
            emulateJSON:true
          }).then((res)=>{
            if(res.data.errorCode===0){
              let _this=this
              this.totalPages=res.data.result.totalCount;
              this.tableData.tbody=res.data.result.resultList
              Array.from(this.tableData.tbody).forEach(function (p) {
                let d=new Date(p.beginDate)
                p.beginDate=_this.formatDate(d)
              });
            }
            else {
              this.$Modal.info({
                  title: '提示',
                  content: res.data.rspMsg.errorMsg
              });
            }
          });
      },
      searchMess(){
        this.searchData.pageIndex=1
        this.searchData.pageSize=20
        let str=this.toParam(this.searchData);
        this.searchStr=str
        this.$http.post(config.urlList.getList+"?"+str,
         this.searchData,
          {
            emulateJSON:true
          }).then((res)=>{
            if(res.data.errorCode===0){
              this.totalPages=res.data.result.totalCount;
              this.tableData.tbody=res.data.result.resultList
            }
            else {
              this.$Modal.info({
                  title: '提示',
                  content: res.data.errorMsg
              });
            }
          });
      }
    }
  }

</script>
<style lang='scss'>
  .custList{
	$height: 38px;
	$formWidth:280px;
	.searchList{
		background-color: #F9FAFC;
		padding: 50px 0 50px 30px;
		overflow: hidden;
		ul{
			width: 100%;
			li{
				width: 100%;
				float: left;
				div.inputBox{
					float: left;
					height: $height;
					.formLabel{
						height: $height;line-height: 32px;
						display: inline-block;
						float: left;text-align: right;
						padding-right: 15px;
						font-size: 12px;
						color: #7B8497;
					}
					input{height: $height;}
				}
				.selectBox{
					width:280px;
					.smallSelect{
						width:56px;
						margin-left:3px;
					}
				}
			}
		}
		.ivu-input-wrapper{//改变input
			display: inline-block;
			width: $formWidth;
			float: left;
		}
		.ivu-checkbox-group{//改变checkBox
			line-height: $height
		}
		.ivu-select-selection{//改变select
			width: $formWidth;
			display: inline-block;
			float: left;
		}
		.ivu-date-picker{float: left}
		.ivu-date-picker-editor,.ivu-date-picker-editor input{
			width: 221px
		}
	}
	.listTable{
		width: 100%;
		padding: 30px;
		.exportBtn{
			border-radius: 2px;
			padding-left: 12px;
			box-sizing:border-box;
			display: block;
			width: 140px;
			height: 32px;
			border: 1px solid #B6BAC0;
			line-height: 32px;
			font-size: 14px;
			color: #333;
			margin-bottom: 15px;
			float: left;
			cursor: pointer;
			i{font-size: 16px}
			span{
				color: #B6BAC0; 
				padding:0 14px;
			}

		}
		.addProBtn{
			display: inline-block;
			width: 120px;
			height: 32px;
			text-align: center;
			line-height: 32px;
			background-color: #38BC6E;
			border-radius: 2px;
			color: #fff;
			a{	
				display: inline-block;
				width: 100%;height: 100%;
				color: #fff
			}
		}
		.ivu-page{
			.ivu-page-item{
				border:none;
				width: 28px;
				height: 28px;
				line-height: 26px
			}
			.ivu-page-options-elevator{height: 28px;margin-top: -2px}
			.ivu-page-item-jump-next, .ivu-page-item-jump-prev, .ivu-page-next, .ivu-page-prev {
				border:none;
				width: 28px;
				height: 28px;
				line-height: 26px
			}
			.ivu-page-options-elevator input{
				height: 28px !important;
				width: 48px;
			}
			.ivu-select-selection .ivu-select-selected-value{
				height: 28px;
				line-height: 26px;
			}
			.ivu-select-single .ivu-select-selection {
				height:28px;
				.ivu-select-placeholder,.ivu-select-selected-value{line-height:28px !important}
			}
		}
		table{
			width: 100%;
			border-collapse:collapse;
			thead{
				background: #F9FAFC;
				tr{
					td{color: #7B8497;min-width: 100px;font-size: 14px}
					td:last-child{min-width: 80px !important}
				}
			}
			tbody{
				tr{
					td{color: #333;height: 56px;padding: 10px 10px}
					td:last-child{min-width: 80px !important}
				}
				tr:nth-of-type(even){
					background-color: #F9FAFC;
					box-shadow: 0 1px 0 0 #DEE1E5;
					border-top:1px solid #DEE1E5;
				}
			}
			td{font-size: 12px;min-width: 100px;height: 56px;word-wrap: break-word;max-width: 200px;padding: 0 10px}
		}
	}
}
</style>

 --> -->