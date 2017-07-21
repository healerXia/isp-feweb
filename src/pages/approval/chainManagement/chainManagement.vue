<template lang="html">
    <div id="chainManagement">
        <Form :label-width="80">
            <div class="formTop clear">
                <div class="item fl">
                    <Form-item label="用户组名称:" prop="name">
                        <Input v-model="searchInfo.groupName" placeholder="请输入姓名"></Input>
                    </Form-item>
                </div>
                <div class="item fl">
                    <Form-item label="用户组成员:" prop="name">
                        <Select
                            v-model="searchInfo.userId"
                            placeholder="请输入"
                            filterable
                            remote
                            :remote-method="remoteGroup"
                            :clearable = "true"
                            :loading="loading1"
                            class='selectText fl'>
                            <Option v-for="option in groups" :value="option.userId" :key="new Date()">{{option.userName}}</Option>
                        </Select>
                    </Form-item>
                </div>
                <!-- <div class="item fl">
                    <Form-item label="负责部门:" prop="name">
                        <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
                    </Form-item>
                </div> -->
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
            <Button type="success" @click='jump' class='insertButton'>新增用户组</Button>
            <p class='noRes' v-if='searchInfo.totalCount == 0'>查询无结果</p>
            <table v-if='searchInfo.totalCount != 0' cellspacing="1" cellpadding="0" class="user">
                <thead>
                    <tr>
                        <td width='25%'>用户组名称</td>
                        <td>用户组成员</td>
                        <td width='200px'>创建时间</td>
                        <td width='128px;'>操作</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for='i in tableList'>
                        <td>{{i.groupName}}</td>
                        <td>{{i.userName}}</td>
                        <td>{{i.updateTimeStr.split(' ')[0]}}</td>
                        <td  class="clear">
                            <a href="javascrip:void(0);" class="fl">编辑</a>
                            <a href="javascrip:void(0);" class="fl" style="margin-left: 50px;" @click='remove(i, index)'>删除</a>
                        </td>
                    </tr>
                </tbody>
            </table>
            <div v-if='searchInfo.totalCount != 0' class="paging">
                <Page :total="totalCount" size="small" show-elevator show-sizer
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
            tableList: [
                {
                    "id": 2,
                    "userId": "1",
                    "userName": "张三",
                    "responsibleDept": "[{\"code\":\"1\",\"name\":\"部门1\"},{\"code\":\"2\",\"name\":\"部门2\"}]",
                    "responsibleUser": "[{\"code\":\"1\",\"name\":\"张三\"},{\"code\":\"2\",\"name\":\"李四\"}]",
                    "groupName": "测试",
                    "updateTime": 1500364842000,
                    "updateTimeStr": "2017-07-18"
                }
            ],
            searchInfo: {
                groupName: '',
                userName: '',
                userId: '',
                groupId: '',
                pageIndex: 1,
                pageSize: 10
            },
            totalCount: 0,
            groups: []
        }
    },
    mounted() {
        this.render();
    },
    methods: {
        render() {
            this.$http.get('/isp-process-server/userGroup/getList', {
                params: this.searchInfo
            }).then((res) => {
                if (res.data.errorCode == 0) {
                    this.tableList = Object.assign([], res.data.result.resultList);
                    this.totalCount = res.data.result.totalCount;
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        search() {
            this.render();
        },
        remoteGroup (query) {
            if (query !== '') {
                this.loading1 = true;
                setTimeout(() => {
                    this.loading1 = false;
                    if (!query) return false;
                    this.$http.get('/isp-process-server/employee/getList', {
                        params: {
                            userName: query,
                            pageIndex: 1,
                            pageSize: 10
                        }
                    }).then((res) => {
                        if (res.data.errorCode == 0) {
                            this.groups = Object.assign([], res.data.result).map(item => {
                                return {
                                    userId: item.employeeId,
                                    userName: item.displayName
                                }
                            });
                            console.log(this.groups);
                        }
                        else {
                            this.groups = [];
                        }
                    }).catch((err) => {
                        console.log(err);
                        //this.groups = [];
                    })
                }, 200);
            } else {
                //this.groups = [];
            }
        },
        joinName(data) {
            let datas = JSON.parse(data);
            let aName = datas.map(item => item.name);
            return aName.join('，');
        },
        edit(data) {
            let id = data.groupId;
            this.$router.push({path: 'createChain', query: {id: id}});
        },
        changePage(n) {
            this.searchInfo.pageIndex = n;
            this.render();
        },
        changePageSize(n) {
            this.searchInfo.pageSize = n;
            this.render();
        },
        jump() {
            this.$router.push({path: 'createChain'})
        },
        remove(data, index) {
            let id = data.groupId;
            this.$Modal.confirm({
                title: '提示',
                content: '是否删除',
                onOk: () => {
                    this.$http.delete(`/isp-process-server/userGroup/del`, {
                        params: {
                            groupId: id
                        }
                    }).then((res) => {
                        if (res.data.errorCode == 0) {
                            this.$Message.success('删除成功');
                            this.render();
                        }
                        else {
                            this.$Modal.info({
                                title: '提示',
                                content: res.data.rspMsg.errorMsg
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
#chainManagement {
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
        width: 726px;
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
