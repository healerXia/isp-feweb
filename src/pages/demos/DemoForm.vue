<template>
    <Row>
        <Col span="12" style="padding-right:10px">
            <Select
                v-model="model13"
                filterable
                remote
                :remote-method="remoteMethod1"
                :loading="loading1">
                <Option v-for="option in options1" :value="option.value" :key="new Date()">{{option.label}}</Option>
            </Select>
        </Col>
        <Col span="12">
        <Select
            v-model="model14"
            multiple
            filterable
            remote
            :remote-method="remoteMethod2"
            :loading="loading2">
            <Option v-for="option in options2" :value="option" :key="new Date()">{{option}}</Option>
        </Select>
        </Col>
        <a href="javascript:;" @click='clear'>清除</a>
    </Row>
</template>
<script>
    export default {
        data () {
            return {
                model13: '',
                loading1: false,
                options1: [],
                model14: [],
                loading2: false,
                options2: [1,2,3]
            }
        },
        methods: {
            remoteMethod1 (query) {
                if (query !== '') {
                    this.loading1 = true;
                    setTimeout(() => {
                        this.loading1 = false;
                        const list = this.list.map(item => {
                            return {
                                value: item,
                                label: item
                            };
                        });
                        this.options1 = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
                    }, 200);
                } else {
                    this.options1 = [];
                }
            },
            remoteMethod2 (query) {
                if (query !== '') {
                    this.loading2 = true;
                    setTimeout(() => {
                        this.loading2 = false;
                        const list = this.list.map(item => {
                            return {
                                value: item,
                                label: item
                            };
                        });
                        this.options2 = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
                    }, 200);
                } else {
                    this.options2 = [];
                }
            },
            clear() {
                this.model14 = [];
            }
        }
    }
</script>
