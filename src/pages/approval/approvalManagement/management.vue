<template lang="html">
    <div id="approvalManagement">
        <Form :label-width="80">
            <div class="formTop clear">
                <div class="item fl">
                    <Form-item label="审批链名称:" prop="name">
                        <Input v-model="searchInfo.chainName" placeholder="请输入审批链名称"></Input>
                    </Form-item>
                </div>
                <!-- <div class="item fl">
                    <Form-item label="用户组名称:" prop="name">
                        <Input v-model="searchInfo.groupName" placeholder="请输入用户组名称"></Input>
                    </Form-item>
                </div> -->
                <div class="item fl">
                    <Form-item label="单据名称:" prop="name">
                        <Select v-model="searchInfo.formType" style="width:268px">
                            <Option v-for="item in selectData" :value="item" :key="item.value">{{item}}</Option>
                        </Select>
                    </Form-item>
                </div>
            </div>
            <!-- <div class="formBot clear">
                <div class="item fl">
                    <Form-item label="创建时间:">
                        <Date-picker type="date" placeholder="选择日期" v-model="formValidate.date" class='dateItem fl'></Date-picker>
                        <span class='fl line'></span>
                        <Date-picker type="date" placeholder="选择日期" v-model="formValidate.date" class='dateItem fl'></Date-picker>
                    </Form-item>
                </div>

            </div> -->

            <Form-item class='submitBtn'>
                <Button type="primary" @click="search" class="search fr">查询</Button>
            </Form-item>
        </Form>

        <div class="insert">
            <Button type="success" @click='jump' class='insertButton'>新增审批链</Button>
            <p class='noRes' v-if='searchInfo.totalCount == 0'>查询无结果</p>
            <table v-if='searchInfo.totalCount != 0' cellspacing="1" cellpadding="0" class="user">
                <thead>
                    <tr>
                        <td>审批链名称</td>
                        <td>审批链</td>
                        <td>单据名称</td>
                        <td>创建时间</td>
                        <td width='128px;'>操作</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for='i in tableList'>
                        <td width='20%'>{{i.chainName}}</td>
                        <td>{{joinStr(i.userGroupStr)}}</td>
                        <td>{{i.formType}}</td>
                        <td>{{i.updateTimeStr}}</td>
                        <td  class="clear">
                            <a href="javascrip:void(0);" class="fl" @click='edit(i, index)'>编辑</a>
                            <a href="javascrip:void(0);" class="fl" style="margin-left: 50px;" @click='remove(i, index)'>删除</a>
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
</template>

<script>
export default {
    data() {
        return {
            formValidate: {
                name: ''
            },
            tableList: [],
            searchInfo: {
                chainName: '',
                groupName: '',
                formType: 0,
                pageIndex: 1,
                pageSize: 10,
                totalCount: 0
            },
            selectData: []
        }
    },
    mounted() {
        this.initTable();
        this.$http.get('/isp-process-server/formType/all').then((res) => {
            if (res.data.errorCode == 0) {
                let data = res.data.result;
                this.selectData = data.map(item => item.formTypeName);
            }
            else {

            }
        }).catch((err) => {
            console.log(err);
        })
    },
    methods: {
        initTable() {
            // params: this.searchInfo
            if (!this.searchInfo.formType) {
                this.searchInfo.formType = 0;
            }
            this.$http.get('/isp-process-server/auditChain/getList', {
                params: this.searchInfo
            }).then((res) => {
                if (res.data.errorCode == 0) {
                    let data = Object.assign({}, res.data.result);
                    this.tableList = Object.assign([], data.resultList);
                    this.searchInfo.totalCount = data.totalCount;
                }
                else {

                }
            }).catch((err) => {
                console.log(err);
            })
        },
        search() {
            this.initTable();
        },
        joinName(data) {
            let datas = JSON.parse(data);
            let aName = datas.map(item => item.name);
            return aName.join('，');
        },
        edit(data) {
            let id = data.id;
            this.$router.push({path: 'chainConfig', query: {id: id}});
        },
        changePage(n) {
            if (!this.searchInfo.formType) {
                this.searchInfo.formType = 0;
            }
            this.searchInfo.pageIndex = n;
            this.initTable();
        },
        changePageSize(n) {
            if (!this.searchInfo.formType) {
                this.searchInfo.formType = 0;
            }
            this.searchInfo.pageSize = n;
            this.initTable();
        },
        joinStr(str) {
            if (str) {
                let newStr = str.split(',').join('→');
                return newStr;
            }
        },
        jump() {
            this.$router.push({path: 'chainConfig'})
        },
        remove(data, index) {
            let id = data.id;
            this.$Modal.confirm({
                title: '提示',
                content: '是否删除',
                onOk: () => {
                    this.$http.delete(`/isp-process-server/auditChain/del/`, {
                        params: {
                            id: id
                        }
                    }).then((res) => {
                        if (res.data.errorCode == 0) {
                            this.$Message.success('删除成功');
                            this.initTable();
                        }
                        else {
                            this.$Modal.info({
                                title: '提示',
                                content: res.data.errorMsg
                            });
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                },
                onCancel: () => {
                    //this.$Message.info('点击了取消');
                }
            });
        }
    }

}
</script>

<style lang="scss" scoped>
#approvalManagement {
    padding: 0 30px 0 30px;

    .noRes {
        text-align: center;
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
        margin-top: 50px;

        .item {
            width: 348px;
             margin-right: 30px;
        }
    }

    .formBot {
        .item {
            width: 800px;
        }

        .line {
            margin: 20px;
            width: 6px;
            border-bottom: 1px solid #ccc;
        }

        .dateItem {
            width: 268px;
        }
    }

    .submitBtn {
        width: 1104px;
    }

    .insertButton {
        margin-bottom: 15px;
        height: 38px;
        width: 154px;
        background: #38BC6E;
        border-radius: 2px;
        font-size: 14px;
        color: #FFFFFF;

        &:hover {
            opacity: 0.9;
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
                        min-width: 128px;
                    }

                    &:nth-child(4) {
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
