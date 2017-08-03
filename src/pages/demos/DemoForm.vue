<template lang="html">
    <div class="">
        <Select
               ref='demo'
               v-model="model"
               filterable
               remote
               :remote-method="remoteMethod"
               :loading="loading">
               <Option v-for="option in options" :value="option.id" :key="option.id">{{option.deptName}}</Option>
           </Select>

           <button type="button" name="button" @click='clear'>清空</button>
           <button type="button" name="button" @click='edit'>回填</button>

           <Radio-group v-model="phone">
                <Radio label="0">
                    <Icon type="social-apple"></Icon>
                    <span>Apple</span>
                </Radio>
                <Radio label="-1">
                    <Icon type="social-android"></Icon>
                    <span>Android</span>
                </Radio>
                <Radio label="1">
                    <Icon type="social-windows"></Icon>
                    <span>Windows</span>
                </Radio>
            </Radio-group>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
            model: [],
            options: [],
            phone: ''
        }
    },
    mounted() {
        this.$http.get('/isp-process-server/depart/getList', {
            params: {
                deptName: '',
                pageIndex: 1,
                pageSize: 10
            }
        }).then((res) => {
            this.loading = false;
            if (res.data.errorCode == 0) {
                this.options = res.data.result.resultList;

                return this.$http.get('/isp-process-server/depart/getList');
            }
        }).then((res) => {
            console.log(res);
        }).catch((err) => {

        })
    },
    methods: {
        remoteMethod(query) {
            console.log(query);
            // if (query !== '') {
            //     this.loading = true;
            //     this.$http.get('/isp-process-server/depart/getList', {
            //         params: {
            //             deptName: query,
            //             pageIndex: 1,
            //             pageSize: 10
            //         }
            //     }).then((res) => {
            //         this.loading = false;
            //         if (res.data.errorCode == 0) {
            //             this.options = res.data.result.resultList;
            //
            //             return this.$http.get('/isp-process-server/depart/getList');
            //         }
            //     }).then((res) => {
            //         console.log(res);
            //     }).catch((err) => {
            //
            //     })
            // } else {
            //     //this.options = [];
            // }
        },
        edit() {
            this.options = [];
            this.options.push({
                id: 751,
                deptName: 'DSA事业部'
            })

            setTimeout(() => {
                this.model = 751;
                this.$refs.demo.selectedSingle = 'DSA事业部';
            })
        },
        clear() {
            console.log(this.$refs.demo)
            // this.$refs.demo.selectedMultiple = [];
            // this.options = [];
            // this.model = [];
        }
    }
}
</script>

<style lang="css">
</style>
