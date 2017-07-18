<template lang="html">
    <div id="chainManagement">
        <Form :label-width="80">
            <div class="formTop clear">
                <div class="item fl">
                    <Form-item label="用户组名称:" prop="name">
                        <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
                    </Form-item>
                </div>
                <div class="item fl">
                    <Form-item label="用户组成员:" prop="name">
                        <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
                    </Form-item>
                </div>
                <div class="item fl">
                    <Form-item label="负责部门:" prop="name">
                        <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
                    </Form-item>
                </div>
            </div>
            <div class="formBot clear">
                <div class="item fl">
                    <Form-item label="创建时间:">
                        <Date-picker type="date" placeholder="选择日期" v-model="formValidate.date" class='dateItem fl'></Date-picker>
                        <span class='fl line'></span>
                        <Date-picker type="date" placeholder="选择日期" v-model="formValidate.date" class='dateItem fl'></Date-picker>
                    </Form-item>
                </div>

            </div>
        </Form>

        <div class="insert">
            <Button type="success" @click='jump'>新增用户组</Button>

            <table cellspacing="1" cellpadding="0" class="user">
                <thead>
                    <tr>
                        <td width='20%'>用户组名称</td>
                        <td>用户组成员</td>
                        <td width='120px'>创建时间</td>
                        <td width='128px;'>操作</td>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for='i in data'>
                        <td>{{i.name}}</td>
                        <td>{{i.group}}</td>
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
            formValidate: {
                name: ''
            },
            data:[
                {
                    name: '经销商-城市群负责人用户组城市群负责人用户组城市群负责人用户组',
                    group: '张玉柱、张建、崔康、张振杰、张三、李四、王五、赵六、冯七、马八...张玉柱、张建、崔康、张振杰、张三、李四、王五、赵六、冯七、马八...张玉柱、张建、崔康、张振杰、张三、李四、王五、赵六、冯七、马八...',
                    time: '2017-06-30'
                }
            ]
        }
    }

}
</script>

<style lang="scss" scoped>
#chainManagement {
    padding: 0 30px 0 30px;

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
