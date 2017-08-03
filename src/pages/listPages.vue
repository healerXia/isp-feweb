<template>
  <div class="listPages">
    <Form :model="formItem" label-position="right">
      <Form-item label="客户名称：">
        <input class="descripive" :model="formItem.clientName"></input>
      </Form-item>
      <Form-item label="客户编号：">
        <input class="descripive" :model="formItem.clientId"></input>
      </Form-item>
      <Form-item label="主营品牌：">
        <Select v-model="formItem.brand" placeholder="请输入名称或分类">
          <Option v-for="item in brandOption" :value="item.value" :key="new Date()">{{ item.option }}</Option>
        </Select>
      </Form-item>
      <Form-item label="客户地区：">
        <input class="descripive" :model="formItem.district"></input>
      </Form-item>
      <Form-item label="客户类别：">
        <Select v-model="formItem.clientType">
          <Option v-for="item in typeOption" :value="item.value" :key="new Date()">{{ item.option }}</Option>
        </Select>
      </Form-item>
      <Form-item label="客户标签：">
        <Select v-model="formItem.clientLabel">
          <Option v-for="item in labelOption" :value="item.value" :key="new Date()">{{ item.option }}</Option>
        </Select>
      </Form-item>
      <Form-item label="审核状态：">
        <Select v-model="formItem.review">
          <Option v-for="item in reviewStatus" :value="item.value" :key="new Date()">{{ item.status }}</Option>
        </Select>
      </Form-item>
      <Form-item label="负责员工：">
        <input class="descripive" :model="formItem.staff"></input>
      </Form-item>
      <Form-item>
        <Button type="primary" @click="query()">查询</Button>
        <Button type="ghost" @click="reset('formItem')">重置</Button>
      </Form-item>
    </Form>
    <div class="tableInfo">
      <Button type="primary" @click="add('formItem')" :to="{path:'createPro'}">添加</Button>
      <Table stripe :columns="tableColumns" :data="tableData">
        <tr v-for="(formItem,index) in auditInfo"></tr>
      </Table>
      <Page :total="totalPages" class="MT30" size="small"
        :current="formItem.pageIndex"
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
<style lang='scss'>
  .listPages{
    .ivu-form{
      background: #F9FAFC;
      padding:50px 0;
      .ivu-form-item{
        width:354px;
        height:38px;
        margin-left:24px;
        display:inline-block;
        .ivu-form-item-label{
          font-size:14px;
          color: #7B8497;
          letter-spacing: 0.52px;
        }
        input{
          width:268px;
          height:38px;
          background: #FFFFFF;
          border: 1px solid #DEE1E5;
          border-radius: 2px;
        }
        .ivu-select{
          width:268px;
          height:38px;
        }
        .ivu-btn{
          height:38px;
          width:160px;
          margin-left:10px;
        }
      }
    }
    .tableInfo{
      .ivu-btn-primary{
        margin-top:30px;
        margin-left:32px;
      }
      .ivu-table-wrapper{
        margin-top:15px;
      }
    }
  }
</style>
<script>
  export default {
    data () {
      return {
        pageSizeOpts:[20],
        totalPages:0,
        formItem:{
          pageIndex:1,
          pageSize:20,
          clientName:'',//客户名称
          clientId:'',//客户编号
          brand:'',//主营品牌
          district:'',//客户地区
          clientType:'',//客户类别
          clientLabel:'',//客户标签
          review:"",//审核状态
          staff:''//负责员工
        },
        auditInfo:{
          clientName:'',//客户名称
          clientId:'',//客户编号
          brand:'',//主营品牌
          district:'',//客户地区
          clientType:'',//客户类别
          clientLabel:'',//客户标签
          review:"",//审核状态
          staff:''//负责员工
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
        tableColumns:[
          {
            title:'客户名称',
            key:''
          },
          {
            title:'客户类别',
            key:''
          },
          {
            title:'主营品牌',
            key:''
          },
          {
            title:'客户地区',
            key:''
          },
          {
            title:'负责员工',
            key:''
          },
          {
            title:'客户标签',
            key:''
          },
          {
            title:'审核状态',
            key:''
          },
          {
            title:'操作',
            key:''
          }
        ],
      }
    },
    methods:{
      //submit (name) {
      pageSizeChange(value){
      },
      pageChange(num){
        this.formItem.pageIndex=num
        this.formItem.pageSize=20
        let str=this.toParam(this.formItem);
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
      query(){
        this.formItem.pageIndex=1
        this.formItem.pageSize=20
        let str=this.toParam(this.formItem);
        this.searchStr=str;
        this.$http.post(config.urlList.getPageList+"?"+str,
        {},
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
      },
      reset (name) {
        this.$refs[name].resetFields();
      },
      add(){
        this.auditInfo.push({
          clientName:'',//客户名称
          clientId:'',//客户编号
          brand:'',//主营品牌
          district:'',//客户地区
          clientType:'',//客户类别
          clientLabel:'',//客户标签
          review:"",//审核状态
          staff:''//负责员工
        });
      }
    }
  }
</script>
<!-- 1:
submitObj:{
  custName:"",
  custId:"",
  brandid:"",
  ...
},
 -->
