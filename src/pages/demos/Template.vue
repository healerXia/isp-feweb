<template lang="html">
  <Form ref="formDynamic" :model="formDynamic" :label-width="80">
      <div v-for="(item, index) in formDynamic.items" :key="item">
          <Form-item label="姓名" :prop="'items.' + index + '.name'"
            :rules="[{required: true, message: '姓名不能为空', trigger: 'blur'}, {type: 'number', message: '2131231', trigger: 'blur'}]">
                <Input type="text" v-model.number="item.name"></Input>
          </Form-item>
          <Form-item label="年龄" :prop="'items.' + index + '.age'"
            :rules="{required: true, message: '年龄不能为空', trigger: 'blur'}">
                <Input type="text" v-model="item.age"></Input>
          </Form-item>
      </div>
      <Form-item>
           <Row>
               <Col span="12">
                   <Button type="dashed" long @click="handleAdd" icon="plus-round">新增</Button>
               </Col>
           </Row>
       </Form-item>
      <Form-item>
            <Button type="primary" @click="handleSubmit('formDynamic')">提交</Button>
            <Button type="ghost" @click="handleReset('formDynamic')" style="margin-left: 8px">重置</Button>
     </Form-item>
  </Form>
</template>

<script>
export default {
    data () {
            return {
                formDynamic: {
                    items: [
                        {
                            name: '',
                            age: ''
                        }
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
        handleAdd () {
            this.formDynamic.items.push({
                name: '',
                age: ''
            });
        },
    }
}
</script>

<style lang="css">
</style>
