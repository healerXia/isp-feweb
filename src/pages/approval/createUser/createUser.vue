<template lang="html">
  <div id="createUser">
        <p class="title">配置用户组</p>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
              <Form-item label="用户组名称" prop="name">
                  <Input v-model="formValidate.name" placeholder="请输入用户组名称" class='text fl'></Input>
              </Form-item>
              <table cellspacing="1" cellpadding="0" class="user">
                  <thead>
                      <td>成员列表</td>
                      <td>负责部门</td>
                      <td>负责员工</td>
                  </thead>
                  <tbody>
                      <tr v-for='i in tableList'>
                          <td>{{i.name}}</td>
                          <td>{{i.department}}</td>
                          <td>{{i.employee}}</td>
                      </tr>
                      <tr class="tableInput" v-for='i in addData'>
                          <td>
                              <Input v-model="i.name" placeholder="请输入成员名字" class='text fl'></Input>
                          </td>
                          <td>
                              <Input v-model="i.department" placeholder="请输入负责部门名称" class='text fl'></Input>
                          </td>
                          <td>
                              <Input v-model="i.employee" placeholder="请输入负责员工姓名" class='text fl'></Input>
                          </td>
                      </tr>
                  </tbody>
              </table>
              <div class='btnList'>
                 <Button type="button" long @click="handleAdd" icon="plus-round" class='text add'>继续添加</Button>
              </div>
              <Form-item class='btnList'>
                 <Button type="primary" @click="handleSubmit('formValidate')" class="saveNext fl">保存并继续</Button>
                 <Button type="primary" @click="handleSubmit('formValidate')" class="save fl">保存</Button>
                 <Button type="ghost" @click="handleReset('formValidate')"  class="cancel fl">取消</Button>
              </Form-item>
          </Form>
  </div>
</template>

<script>
export default {
    data() {
        return {
            tableList: [
                {
                    name: '东方之张玉林',
                    department: '北京区',
                    employee: '张三、李四'
                },
                {
                    name: '东方之张玉林',
                    department: '北京区',
                    employee: '张三、李四'
                }
            ],
            addData: [
                {
                    name: '东方之张玉林',
                    department: '北京区',
                    employee: '张三、李四'
                }
            ],
            formValidate: {
                name: ''
            },
            ruleValidate: {
                name: [
                     { required: true, message: '请填写用户组名称', trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        handleSubmit (name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.$Message.success('提交成功!');
                } else {
                    this.$Message.error('表单验证失败!');
                }
            })
        },
        handleReset (name) {
            this.$refs[name].resetFields();
        },
        handleAdd() {
            this.addData.push({
                name: '东方之张玉林',
                department: '北京区',
                employee: '张三、李四'
            })
        }
    }
}
</script>

<style lang="scss" scoped>
#createUser {
    padding: 30px;

    .title {
        margin: 58px 0 30px 36px;
        font-size: 14px;
        color: #354052;
    }

    .text {
        width: 400px;
        height: 38px;
    }

    .user {
        width: 100%;
        min-width: 1104px;

        thead {
            text-align: left;
            background: #F9FAFC;
            border-radius: 2px 2px 0 0;
        }

        td {
            height: 56px;
            text-indent: 30px;
            width: 33.3333%;
        }

        tbody {
            tr {
                box-shadow: 0 1px 0 0 #DEE1E5;
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

    .btnList {
        margin-top: 30px;
    }

    .add {
        width: 120px;
        height: 38px;
        background: #3D70FB;
        border-radius: 2px;
        color: #fff;

        &:hover {
            opacity: 0.9;
        }
    }

    .saveNext, .save {
        margin-right: 20px;
        width: 120px;
        height: 38px;
        background: #4373F3;
        border-radius: 2px;
        border-color: #4373F3;

        &:hover {
            opacity: 0.9;
        }
    }

    .cancel {
        width: 120px;
        height: 38px;
        background: #484E58;
        border-radius: 2px;
        color: #fff;
        border-color: #484E58;

        &:hover {
            opacity: 0.9;
        }
    }
}
</style>
