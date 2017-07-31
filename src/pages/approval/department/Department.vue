<template lang="html">
<div id="department">
    <div class="listBox clear">
        <div v-for='(list, index) in treeData' class="listItem fl">
            <p class='title'>{{titleList[index]}}级部门</p>
            <div class="lists">
                <div class="item" v-for='i in list'>
                    {{i.deptName}}
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            titleList: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'],
            datas: [],
            treeData: [
                [],
                [],
                [],
                [],
                []
            ],
            n: 0,
            treeData1: [],
            treeData2: [],
            treeData3: [],
            treeData4: [],
            treeData5: []
        }
    },
    mounted() {
        this.$http.get('/isp-process-server/depart/getList', {
            params: {
                pid: 0,
                pageIndex: 1,
                pageSize: 9999
            }
        }).then((res) => {
            if (res.data.errorCode == 0) {
                let data = res.data.result.resultList;
                this.datas = data;
                for (let i = 0; i < data.length; i++) {
                    if (data[i].pid == 0) {
                        this.treeData[0].push(data[i]);
                    }
                }
            }
            else {

            }
        }).catch((err) => {
            console.log(err);
        })
    },
    methods: {
        initTree(data) {
            for (let i = 0; i < data.length; i++) {

            }
        }
    }
}
</script>

<style lang="scss">
#department {
    padding: 50px 30px;

    .listBox {
        padding: 20px 0 20px;
        background: #F9FAFC;
        border-radius: 2px 2px 0 0;
        max-height: 1000px;

        .listItem {
            padding: 0 11px 0 11px;
            width: 222px;
            border-right: 1px solid #ccc;
        }

        .item {
            width: 200px;
            height: 125px;
            background: #FFFFFF;
            box-shadow: 0 0 6px 0 rgba(0,0,0,0.10);
            border-radius: 2px;
        }

    }
}
</style>
