<template lang="html">
  <div id = "docMangement">
      <div class="insert">
          <Button type="success">新增单据</Button>
      </div>

      <div class="doclist">
          <Table :columns="columns" :data="data"></Table>
          <Page :total="40" size="small" show-elevator show-sizer class='page'></Page>
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            columns: [
                {
                    title: '单据编号',
                    key: 'A'
                },
                {
                    title: '单据名称',
                    key: 'B'
                },
                {
                    title: '创建时间',
                    key: 'C'
                },
                {
                    title: '操作',
                    key: 'action',
                    width: 128,
                    algin: 'center',
                    render: (h, params) => {
                        return h('div', [
                            h('a', {
                                style: {
                                    float: 'left'
                                },
                                on: {
                                    click: () =>{
                                        console.log('编辑');
                                    }
                                }
                            }, '编辑'),
                            h('a', {
                                style: {
                                    float: 'right'
                                },
                                on: {
                                    click: () =>{
                                        console.log('删除');
                                        this.remove(params.index);
                                    }
                                }
                            }, '删除')
                        ]);
                    }
                }
            ],
            data: [
                {
                    A: '001',
                    B: '易车',
                    C: '2017-12'
                }
            ]
        }
    },
    methods: {
        remove (index) {
            this.data.splice(index, 1);
        }
    }
}
</script>

<style lang="scss">
#docMangement {
    padding: 30px;

    .insert {
        margin-bottom: 20px;
    }

    .page {
        margin-top: 35px;
    }
}
</style>
