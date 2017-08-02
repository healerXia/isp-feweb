<template lang="html">
    <div id="viewPersonalcenter">
        <div class="personal-Info">
            <div class="conBox">
                <div class='hasNoOrder'>
                    <div class="title MB20 MT15">
                      <span class="MR15">我的个人信息</span>
                      <a href="javascript:;" @click='editJump'>编辑</a>
                    </div>
                </div>
            </div>

            <div class="info clear">
                <p class="title">基本信息</p>
                <div class="info-list fl">
                    <div class="clear">
                        <label for="" class="fl">域账号：</label>
                        <span class="fl info-text">{{info.username}}</span>
                    </div>
                    <div class="clear">
                        <label for="" class="fl">员工姓名：</label>
                        <span class="fl info-text">{{info.displayName}}</span>
                    </div>
                    <div class="clear">
                        <label for="" class="fl">所属部门：</label>
                        <span class="fl info-text">{{initFullPath(info.fullPath)}}</span>
                    </div>
                    <div class="clear">
                        <label for="" class="fl">职位：</label>
                        <span class="fl info-text">{{info.position}}</span>
                    </div>
                    <div class="clear">
                        <label for="" class="fl">业务线：</label>
                        <span class="fl info-text">{{info.businessLine}}</span>
                    </div>
                    <div class="clear">
                        <label for="" class="fl">联系电话：</label>
                        <span class="fl info-text">{{info.phone}}</span>
                    </div>
                    <div class="clear">
                        <label for="" class="fl">代理审批人：</label>
                        <span class="fl info-text">{{info.agentStr}}</span>
                    </div>
                </div>
                <div class="info-list fl">
                    <div class="clear">
                        <label for="" class="fl">员工编号：</label>
                        <span class="fl info-text">{{info.employeeId}}</span>
                    </div>
                    <div class="clear">
                        <label for="" class="fl">员工上级：</label>
                        <span class="fl info-text">{{info.managerName}}</span>
                    </div>
                    <div class="clear">
                        <label for="" class="fl">员工状态：</label>
                        <span class="fl info-text">{{info.statusStr}}</span>
                    </div>
                    <div class="clear">
                        <label for="" class="fl">员工分类：</label>
                        <span class="fl info-text">{{info.employeeType}}</span>
                    </div>
                    <div class="clear">
                        <label for="" class="fl">性别：</label>
                        <span class="fl info-text">{{info.sexStr}}</span>
                    </div>
                    <div class="clear">
                        <label for="" class="fl">移动电话：</label>
                        <span class="fl info-text">{{info.mobile}}</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="tableList">
            <p class='title'>管辖员工信息</p>
            <table cellspacing="1" cellpadding="0" class="user">
                <thead>
                    <td v-for='i in theadData'>{{i}}</td>
                </thead>
                <tbody>
                    <tr v-for='list in tableData'>
                        <td>{{list.username}}</td>
                        <td>{{list.employeeId}}</td>
                        <td>{{list.displayName}}</td>
                        <td>{{initFullPath(list.fullPath)}}</td>
                        <td>{{list.position}}</td>
                        <td>{{list.employeeType}}</td>
                        <td>{{list.mobile}}</td>
                        <td>{{list.statusStr}}</td>
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
</template>

<script>
export default {
    data() {
        return {
            info: {},
            theadData: ['域账号', '员工编号', '员工姓名', '所属部门', '职位', '员工分类',  '移动电话', '员工状态'],
            paging: {
                pageIndex: 1,
                pageSize: 10
            },
            totalCount: 0,
            tableData: [],
            employeeId: '',
            managerId: ''
        }
    },
    mounted() {
        this.render();
    },
    methods: {
        render() {
            this.$http.get('/isp-process-server/employee/getModel').then((res) => {
                if (res.data.errorCode == 0) {
                    this.info = Object.assign({}, res.data.result);
                    this.employeeId = this.info.employeeId;
                    this.managerId = this.info.managerId;
                    this.initTable();
                }
                else {

                }
            }).catch((err) => {
                console.log(err);
            });
        },
        initFullPath(data) {
            if (!data) return;
            let arr = data.split(',');
            if (arr.length > 0) {
                return arr.join('-');
            }
            return data;
        },
        initTable() {
            this.$http.get('/isp-process-server/employee/getPageList', {
                params: {
                    managerId: this.employeeId,
                    pageIndex: this.paging.pageIndex,
                    pageSize: this.paging.pageSize
                }
            }).then((res) => {
                if (res.data.errorCode == 0) {
                    this.tableData = Object.assign([], res.data.result.resultList);
                    this.totalCount = res.data.result.totalCount;
                }
                else {

                }
            }).catch((err) => {
                console.log(err);
            })
        },
        changePage(n) {
            this.paging.pageIndex = n;
            this.initTable();
        },
        changePageSize(n) {
            this.paging.pageSize = n;
            this.initTable();
        },
        editJump() {
            this.$router.push({path: 'editPercenter', query: {id: this.employeeId}})
        }

    }
}
</script>

<style lang="scss" soped>
#viewPersonalcenter {

    .conBox {
        .title {
            font-size: 14px;
            color: #354052;
            line-height: 14px;
        }
    }

    .info {
        .title {
            font-size: 12px;
            color: #333333;
        }
    }

    .personal-Info {
        padding: 50px 30px;
        background: #F9FAFC;


        .info-text {
            width: 400px;
            word-break: break-all;
            //border: 1px solid #ccc;

        }

        .info-list {
            font-size: 12px;
            color: #7B8497;
            line-height: 20px;
            width: 500px;
            margin-right: 20px;

            li {
                width: 500px;

                // span {
                //     max-width: 400px;
                //     word-break: break-all;
                // }

                // &:nth-child(2n) {
                //     margin-left: 50px;
                // }
            }
        }
    }

    .tableList {
        padding: 20px 30px;

        .title {
            padding-bottom: 15px;
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
                font-size: 14px;
                color: #7B8497;
                letter-spacing: 0.52px;

                &:nth-child(1) {
                    padding: 0 30px 0 30px;
                }
            }
        }

        td {
            height: 56px;
            font-size: 14px;
            color: #333333;
            letter-spacing: 0.52px;
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
                }
            }

            td {
                text-indent: 0;
            }

            a {
                text-align: left;
            }
        }
    }

    .paging {
        margin-top: 30px;
    }
}
</style>
