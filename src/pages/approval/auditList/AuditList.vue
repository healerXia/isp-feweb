<template lang="html">
  <div id = "auditList">
      <Form :label-width="80" class='searchBox'>
          <div class="formTop clear">
              <div class="item fl">
                  <Form-item label="单据名称:" prop="name">
                      <Select v-model="searchInfo.processType" class='txt'>
                          <Option v-for="item in chainList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                      </Select>
                  </Form-item>
              </div>
              <div class="item fl">
                  <Form-item label="单据编号:" prop="name">
                      <Input v-model="searchInfo.orderId" placeholder="请输入单据编号" class='txt'></Input>
                  </Form-item>
              </div>
              <div class="item fl">
                  <Form-item label="申请部门:" prop="name">
                      <Select
                          v-model="searchInfo.deptId"
                          filterable
                          remote
                          :remote-method="remoteMethod"
                          :loading="loading"
                          @on-change='selDept'
                          class='txt fl'>
                          <Option v-for="item in deptList" :value="item.id" :key="item.id">{{item.name}}</Option>
                      </Select>
                      <Checkbox v-model="single" class='fl childDept'>包含子部门</Checkbox>
                  </Form-item>
              </div>
          </div>
          <div class="formBot clear">
              <div class="item fl">
                  <Form-item label="创建时间:">
                      <Date-picker type="date" placeholder="选择日期" :options="date1" v-model="searchInfo.applyDateFrom" class='dateItem fl'></Date-picker>
                      <span class='fl line'></span>

                      <Date-picker type="date" placeholder="选择日期" :options="date2" v-model="searchInfo.applyDatTo" class='dateItem fl'></Date-picker>
                  </Form-item>
              </div>

              <div class="item fl">
                  <Form-item label="申请人:" prop="name">
                      <Select
                          v-model="searchInfo.application"
                          filterable
                          remote
                          :remote-method="remoteMethod1"
                          :loading="loading"
                          class='txt fl'>
                          <Option v-for="item in applicationList" :value="item.username" :key="item.id">{{item.name}}</Option>
                      </Select>
                  </Form-item>
              </div>

              <Form-item class='submitBtn'>
                  <Button type="primary" @click="search" class="search fr">查询</Button>
              </Form-item>
          </div>
      </Form>

      <div class="tableList">
           <Menu mode="horizontal" :theme="theme1" active-name="1" @on-select = 'menuSel'>
               <Menu-item name="1">
                   待处理
               </Menu-item>
               <Menu-item name="2">
                   审批驳回
               </Menu-item>
               <Menu-item name="3">
                   审批通过
               </Menu-item>
           </Menu>
           
           <p v-if='totalCount == 0' class='noRes'>无查询结果！</p>
           <div class="tableBox"  v-if='totalCount != 0'>
               <table v-if='searchInfo.totalCount != 0' cellspacing="1" cellpadding="0" class="user">
                   <thead>
                       <tr>
                           <td>单据名称</td>
                           <td>单据编号</td>
                           <td>申请部门</td>
                           <td>申请人</td>
                           <td>申请日期</td>
                           <td>状态</td>
                           <td width='100px;'>操作</td>
                       </tr>
                   </thead>
                   <tbody>
                       <tr v-for='i in tableList'>
                           <td>{{i.processTypeName}}</td>
                           <td>{{i.orderId}}</td>
                           <td>{{i.deptName}}</td>
                           <td>{{i.application}}</td>
                           <td>{{initDate(i.applyDate)}}</td>
                           <td>{{statusTxt}}</td>
                           <td  class="clear">
                               <a href="javascrip:void(0);" class="fl" @click='edit(i, index)'>处理</a>
                           </td>
                       </tr>
                   </tbody>
               </table>

               <div class="paging" v-if='totalCount != 0'>
                   <Page :total="totalCount" size="small" show-elevator show-sizer
                       @on-change='changePage'
                       @on-page-size-change='changePageSize'
                   ></Page>
               </div>
           </div>
      </div>
  </div>
</template>

<script>

export default {
    data() {
        return {
            searchInfo: {
                "processType": "",
                "deptId":"",
                "application":"",
                "applyDateFrom":"",
                "applyDatTo": "",
                "orderId": "",
                "pageNo":1,
                "pageSize":10
            },
            menuIndex: 1,
            totalCount: 0,
            statusTxt: '待处理',
            tableList: [],
            chainList:[],
            deptList: [],
            applicationList: [],
            date1: {
                disabledDate: this.disStart
            },
            date2: {
                disabledDate: this.disEnd
            }
        }
    },
    mounted() {
        this.render();
        this.initTable();
    },
    methods: {
        render() {
            this.$http.get('/isp-process-server/formType/all').then((res) => {
                if (res.data.errorCode == 0) {
                    let data = res.data.result;

                    this.chainList = data.map(item => {
                        return {
                            id: item.id,
                            name: item.formTypeName
                        }
                    })
                }
                else {
                    this.$Modal.info({
                        title: '提示',
                        content: res.data.errorMsg,
                        onOk: ()=> {

                        }
                    });
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        search() {
            this.initTable();
        },
        edit(data) {
            this.$router.push({path: 'details', query:{taskId: data.taskId, adOrderCode: data.orderId}});
        },
        menuSel(name) {
            //通过1 驳回0

            if (this.searchInfo.applyDateFrom) {
                this.searchInfo.applyDateFrom = this.initTime(this.searchInfo.applyDateFrom);
            }
            if (this.searchInfo.applyDatTo) {
                this.searchInfo.applyDatTo = this.initTime(this.searchInfo.applyDatTo);
            }

            if (name == 1) {
                this.statusTxt = '待处理';

                this.$http.post('/isp-kongming/audit/tasks', this.searchInfo).then((res) => {
                    if (res.data.errorCode == 0) {
                        this.tableList = res.data.result.resultList;
                        this.totalCount = res.data.result.totalCount;
                    }
                    else {
                        this.$Modal.info({
                            title: '提示',
                            content: res.data.errorMsg,
                            onOk: ()=> {

                            }
                        });
                    }
                })

                return false;
            }

            if (name == 2) {
                this.searchInfo.status = 0;
                this.statusTxt = '审核驳回';
            }

            if (name == 3) {
                this.searchInfo.status = 1;
                this.statusTxt = '审批通过';
            }

            this.$http.post('/isp-kongming/audit/his/assignee', this.searchInfo).then((res) => {
                if (res.data.errorCode == 0) {
                    this.tableList = res.data.result.resultList;
                    this.totalCount = res.data.result.totalCount;
                }
                else {
                    this.$Modal.info({
                        title: '提示',
                        content: res.data.errorMsg,
                        onOk: ()=> {

                        }
                    });
                }
            })
        },
        initTable() {
            if (this.searchInfo.applyDateFrom) {
                this.searchInfo.applyDateFrom = this.initTime(this.searchInfo.applyDateFrom);
            }
            if (this.searchInfo.applyDatTo) {
                this.searchInfo.applyDatTo = this.initTime(this.searchInfo.applyDatTo);
            }
            this.$http.post('/isp-kongming/audit/tasks', this.searchInfo).then((res) => {
                if (res.data.errorCode == 0) {
                    this.tableList = res.data.result.resultList;
                    this.totalCount = res.data.result.totalCount;
                }
                else {
                    this.$Modal.info({
                        title: '提示',
                        content: res.data.errorMsg,
                        onOk: ()=> {

                        }
                    });
                }
            })
        },
        changePage(n) {
            this.searchInfo.pageNo = n;
            this.initTable();
        },
        changePageSize(n) {
            this.searchInfo.pageSize = n;
            this.initTable();
        },
        initDate(date) {
            if (date) {
                return date.split(' ')[0];
            }
            return ''
        },
        remoteMethod (query) {
            if (query !== '') {
                this.loading = true;
                this.$http.get('/isp-process-server/depart/getList', {
                    params: {
                        deptName: query,
                        pageIndex: 1,
                        pageSize: 10
                    }
                }).then((res) => {
                    this.loading = false;
                    if (res.data.errorCode == 0) {
                        let data = Object.assign([], res.data.result.resultList);
                        this.deptList = data.map(item => {
                            return {
                                id: `${item.id}`,
                                name: item.fullPath,
                                deptName: item.deptName
                            }
                        })
                    }
                    else {

                    }
                }).catch((err) => {
                    this.loading = false;
                    this.deptList = [];
                    console.log(err);
                })
            } else {
                this.loading = false;
                this.deptList = [];
            }
        },
        remoteMethod1(query) {
            if (query !== '') {
                this.loading = true;
                this.$http.get('/isp-process-server/employee/getPageList', {
                    params: {
                        displayName: query,
                        pageIndex: 1,
                        pageSize: 10
                    }
                }).then((res) => {
                    this.loading = false;
                    if (res.data.errorCode == 0) {
                        let data = Object.assign([], res.data.result.resultList);
                        this.applicationList = data.map(item => {
                            return {
                                username: item.username,
                                name: item.displayName,
                                id: item.employeeId
                            }
                        })
                    }
                    else {

                    }
                }).catch((err) => {
                    this.loading = false;
                    this.applicationList = [];
                    console.log(err);
                })
            } else {
                this.loading = false;
                this.applicationList = [];
            }
        },
        initTime(date) {
            let time = new Date(date);
            let year = time.getFullYear();
            let month = time.getMonth() + 1;
            let day = time.getDate();

            return `${year}-${month}-${day}`;
        },
        // 日期判断
        disStart(date){
            return date && date.valueOf() >new Date(this.searchInfo.endDate);
        },
        disEnd(date){
            return date && date.valueOf()< new Date(this.searchInfo.startDate);
        }
    }
}
</script>

<style lang="scss" scoped>
#auditList {
    .searchBox {
        padding: 50px 30px 24px;
        background: #F9FAFC;
    }

    .noRes {
        padding-top: 30px;
        text-align: center;
    }

    .txt {
        width: 268px;
    }

    .search {
        width: 120px;
        height: 38px;
        background: #3D70FB;
        border-radius: 2px;

        &:hover {
            opacity: 0.9;
        }
    }

    .formTop {
        .item {
            width: 348px;
             margin-right: 30px;

             &:last-child {
                 width: 500px;
             }
        }

        .childDept {
            margin-left: 20px;
            font-size: 12px;
        }
    }

    .tableList {
        padding: 30px;
    }


    .formBot {
        width: 894px;

        .item {
            margin-right: 30px;
        }

        .line {
            margin: 16px;
            width: 6px;
            border-bottom: 1px solid #ccc;
        }

        .dateItem {
            width: 115px;
        }
    }


    .user {
        width: 100%;
        min-width: 1104px;

        thead {
            text-align: left;
            background: #F9FAFC;
            border-radius: 2px 2px 0 0;

            td {
                &:nth-child(1) {
                    padding: 0 30px 0 30px;
                }
            }
        }

        td {
            height: 56px;
            // text-indent: 30px;
            //width: 25%;
            text-align: left;
        }

        .name {
            padding-right: 30px;
        }

        tbody {
            tr {
                box-shadow: 0 1px 0 0 #DEE1E5;

                &:hover {
                    background: #ebf7ff;
                }

                td{
                    &:nth-child(1) {
                        padding: 0 30px 0 30px;
                    }

                    &:nth-child(2) {
                        padding-right: 30px;
                    }

                    &:nth-child(3) {
                        padding-right: 30px;

                    }

                    &:nth-child(4) {
                        padding-right: 30px;

                    }

                    &:nth-child(5) {
                        padding-right: 30px;

                    }

                    &:nth-child(6) {
                        padding-right: 30px;
                        min-width: 128px;
                    }
                }
            }

            td {
                text-indent: 0;
            }

            a {
                text-align: left;
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

    .paging {
        margin-top: 30px;
    }
}

</style>
