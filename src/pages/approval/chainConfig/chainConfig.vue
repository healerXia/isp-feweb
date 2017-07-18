<template lang="html">
    <div id='chainConfig'>
        <p class='title'>配置审批链</p>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <Form-item label="审批链名称" prop="name">
                <Input v-model="formValidate.name" placeholder="请输入姓名" class='text fl'></Input>
            </Form-item>
            <Form-item label="流程名称" prop="city" class='process'>
                <Select v-model="formValidate.city" placeholder="请选择流程名称" class="text fl" @on-change="checkProcess">
                    <Option value="beijing">北京市</Option>
                </Select>
                <div :class='["layer", {"active": active}]'>
                    <p class="title">选择单据名称</p>
                    <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
                        <Checkbox
                            :indeterminate="indeterminate"
                            :value="checkAll"
                            @click.prevent.native="handleCheckAll">全选</Checkbox>
                    </div>
                    <Checkbox-group v-model="checkAllGroup" @on-change="checkAllGroupChange">
                        <Checkbox label="香蕉"></Checkbox>
                        <Checkbox label="苹果"></Checkbox>
                        <Checkbox label="西瓜"></Checkbox>
                    </Checkbox-group>
                </div>
            </Form-item>
            <Form-item label="业务类型" prop="type">
                <Radio-group v-model="formValidate.gender">
                    <Radio label="A">单据销售</Radio>
                    <Radio label="B">集采自签</Radio>
                    <Radio label="C">集采统签</Radio>
                </Radio-group>
            </Form-item>
        </Form>

        <div class="">
            <table cellspacing="1" cellpadding="0" class="user">
                <thead>
                    <tr>
                        <td width='20%'>流程</td>
                        <td>用户组</td>
                        <td width='120px'>邮件提醒</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for='i in data'>
                        <td>{{i.name}}</td>
                        <td>
                            <Input v-model="i.department" placeholder="请输入负责部门名称" class='text fl'></Input>
                        </td>
                        <td>{{i.time}}</td>
                        <td  class="clear">
                            <a href="javascrip:void(0);" class="fl" @click='edit(i, index)'>编辑</a>
                            <a href="javascrip:void(0);" class="fl" style="margin-left: 50px;" @click='remove(i, index)'>删除</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            active: false,
            formValidate: {
                name: '',
                mail: '',
                city: '',
                gender: '',
                interest: [],
                date: '',
                time: '',
                desc: '',
                interest: []
            },
            indeterminate: true,
            checkAll: false,
            checkAllGroup: ['香蕉', '西瓜']
        }
    },
    methods: {
        handleCheckAll () {
            if (this.indeterminate) {
                this.checkAll = false;
            } else {
                this.checkAll = !this.checkAll;
            }
            this.indeterminate = false;

            if (this.checkAll) {
                this.checkAllGroup = ['香蕉', '苹果', '西瓜'];
            } else {
                this.checkAllGroup = [];
            }
        },
        checkAllGroupChange (data) {
            if (data.length === 3) {
                this.indeterminate = false;
                this.checkAll = true;
            } else if (data.length > 0) {
                this.indeterminate = true;
                this.checkAll = false;
            } else {
                this.indeterminate = false;
                this.checkAll = false;
            }
        },
        checkProcess() {
            this.active = true;
        }
    }
}
</script>

<style lang="scss" scoped>
#chainConfig {
    padding: 0 30px 0 30px;

    .title {
        margin: 58px 0 30px 0;
        font-size: 14px;
        color: #354052;
    }

    .text {
        width: 400px;
        height: 38px;
        line-height: 38px;
    }

    .ivu-select-placeholder {
        height: 38px;
        line-height: 38px;
    }

    .ivu-checkbox-wrapper {
        font-size: 14px;
    }

    .ivu-select-placeholder {
        height: 38px;
    }

    .process {
        position: relative;
    }

    .layer {
        position: absolute;
        top: 40px;
        left: 0;
        background: #fff;
        padding: 10px;
        width: 400px;
        border: 1px solid #ccc;
        z-index: 999;
        display: none;

        &.active {
            display: block;
        }

        .title {
            margin: 0;
            font-size: 14px;
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
}
</style>
