<template lang="html">
    <div class="">
        <Select
               v-model="model"
               multiple
               filterable
               remote
               :remote-method="remoteMethod"
               :loading="loading">
               <Option v-for="option in options" :value="option.id" :key="option.value">{{option.deptName}}</Option>
           </Select>

           <button type="button" name="button" @click='clear'>清空</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            loading: false,
            model: [],
            options: []
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
        // remoteMethod(query) {
        //     if (query !== '') {
        //         this.loading = true;
        //         this.$http.get('/isp-process-server/depart/getList', {
        //             params: {
        //                 deptName: query,
        //                 pageIndex: 1,
        //                 pageSize: 10
        //             }
        //         }).then((res) => {
        //             this.loading = false;
        //             if (res.data.errorCode == 0) {
        //                 this.options = res.data.result.resultList;
        //
        //                 return this.$http.get('/isp-process-server/depart/getList');
        //             }
        //         }).then((res) => {
        //             console.log(res);
        //         }).catch((err) => {
        //
        //         })
        //     } else {
        //         this.options = [];
        //     }
        // },
        // clear() {
        //     this.options = [];
        //     this.model = [];
        // }
    }
}
</script>

<style lang="css">
</style>
