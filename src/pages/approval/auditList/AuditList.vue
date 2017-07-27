<template lang="html">
  <div id = "auditList">
      <Form :label-width="80" class='searchBox'>
          <div class="formTop clear">
              <div class="item fl">
                  <Form-item label="流程类型:" prop="name">
                      <Select v-model="searchInfo.chainName" class='txt'>
                          <Option v-for="item in chainList" :value="item.id" :key="item.id">{{ item.name }}</Option>
                      </Select>
                  </Form-item>
              </div>
              <div class="item fl">
                  <Form-item label="流程编号:" prop="name">
                      <Input v-model="searchInfo.groupName" placeholder="请输入用户组名称" class='txt'></Input>
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
                      <Date-picker type="date" placeholder="选择日期" :options="date1" v-model="searchInfo.startDate" class='dateItem fl'></Date-picker>
                      <span class='fl line'></span>
                      
                      <Date-picker type="date" placeholder="选择日期" :options="date2" v-model="searchInfo.endDate" class='dateItem fl'></Date-picker>
                  </Form-item>
              </div>

              <div class="item fl">
                  <Form-item label="流程编号:" prop="name">
                      <Input v-model="searchInfo.groupName" placeholder="请输入用户组名称" class='txt'></Input>
                  </Form-item>
              </div>

              <Form-item class='submitBtn'>
                  <Button type="primary" @click="search" class="search fr">查询</Button>
              </Form-item>
          </div>
      </Form>


      <div class="tableList">
           <Menu mode="horizontal" :theme="theme1" active-name="1">
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

           <div class="tableBox">
               <table v-if='searchInfo.totalCount != 0' cellspacing="1" cellpadding="0" class="user">
                   <thead>
                       <tr>
                           <td>流程名称</td>
                           <td>流程编号</td>
                           <td>申请部门</td>
                           <td>申请人</td>
                           <td>申请日期</td>
                           <td>状态</td>
                           <td width='100px;'>操作</td>
                       </tr>
                   </thead>
                   <tbody>
                       <tr>
                           <td>订单</td>
                           <td>AO2017080781213</td>
                           <td>经销商智能营销事业部-销售中心-东北区-哈尔滨区-佳木斯</td>
                           <td>仁珊珊</td>
                           <td>2017-06-08</td>
                           <td>待处理</td>
                           <td  class="clear">
                               <a href="javascrip:void(0);" class="fl" @click='edit(i, index)'>处理</a>
                           </td>
                       </tr>
                   </tbody>
               </table>

               <div class="paging" v-if='searchInfo.totalCount != 0'>
                   <Page :total="searchInfo.totalCount" size="small" show-elevator show-sizer
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
                chainName: '',
                groupName: '',
                date: '',
                formType: '',
                totalCount: '12',
                deptId: '',
                startDate: '',
                endDate: ''
            },
            tableList: [],
            chainList:[],
            deptList: [],
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
        initTable() {

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
        // 日期判断
        disStart(date){
            console.log(date);
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
