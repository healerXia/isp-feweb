<template lang="html">
    <div class="resource">
        <div class="resultList">
            <Flight v-for = '(i, index) in cResultList' :dateInfo = 'i' :key='index'></Flight>
        </div>
    </div>
</template>

<script>
import axios  from 'axios';
import Flight from 'component/Flight';
export default {
    components: {
        Flight
    },
    data() {
        return {
            // 当前页查询结果
            cResultList: ''
        }
    },
    mounted() {
        this.search();
    },
    methods: {
        render() {
            // 页面初始化函数
        },
        search() {
            //资源搜索
            let timeStap = Date.parse(new Date());
            axios.get(`mock/resource?${timeStap}`).then((res) => {
                if (res.data.errorCode == 0) {
                    this.cResultList = Object.assign([], res.data.result);
                    console.log(this.cResultList);
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }
}
</script>

<style lang="scss">

</style>
