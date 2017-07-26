<template>
    <Table :columns="columns" :data="data1"></Table>
</template>
<script>
    export default {
        data () {
            return {
                columns1: [
                    {
                        title: '商品信息',
                        key: 'goodsname'
                    },
                    {
                        title: '价格',
                        key: 'prices'
                    },
                    {
                        title: '颜色',
                        key: 'appearance'
                    },
                    {
                        title: '大小',
                        key: 'capacity'
                    }
                ],
                data1: [
                    {
                        goodsname: 'iPhone 6S',
                        prices: 6888,
                        appearance: '',
                        capacity: ''
                    }
                ]
            }
        }
    }
</script>
