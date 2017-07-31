<template lang="html">
<div id="department">
    <div class="listBox clear">
        <div v-for='(list, index) in treeData' class="listItem fl">
            <p class='title'>{{titleList[index]}}级部门</p>
            <div class="lists">
                <div :class="['item', {'active': i.active == 1}]" v-for='i in list' @click='chooseDept(i, index)'>
                    <p class='item-title'>
                        <span>{{i.deptName}}</span>
                        <span v-if='i.num' class='num fr'>{{i.num}}</span>
                    </p>
                    <p>
                        <span>ID：</span>
                        <span>{{i.id}}</span>
                    </p>
                    <p>
                        <span>创建时间：</span>
                        <span>{{i.updateTimeStr}}</span>
                    </p>
                    <p class='clear iconBtn'>
                        <a href="javascript:;" class='edit fl' @click = 'edit(i)'></a>
                        <a href="javascript:;" class='delte fl' @click= 'del(i)'></a>
                    </p>
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
            treeData: [],
            n: 0
        }
    },
    mounted() {
        this.render();
    },
    methods: {
        render() {
            this.$http.get('/isp-process-server/depart/getTree', {
                params: {
                    pageIndex: 1,
                    pageSize: 9999
                }
            }).then((res) => {
                if (res.data.errorCode == 0) {
                    let data = res.data.result;
                    this.datas = res.data.result;
                    let status = true;
                    this.treeData.splice(0 ,1, []);
                    for (let i = 0; i < data.length; i++) {
                        data[i].num = data[i].children.length;
                        data[i].lev = this.n;
                        // 默认状态
                        data[i].active = 2;
                        this.treeData[0].push(data[i]);
                        if (status) {
                            if (data[i].num > 0) {
                                this.n = this.n + 1;
                                // 选中状态
                                data[i].active = 1;
                                status = false;
                                this.initTree(data[i].children);
                            }
                        }
                    }
                }
                else {

                }
            }).catch((err) => {
                console.log(err);
            })
        },
        initTree(data) {
            let status = true;
            let num = this.n;
            this.treeData.splice(num, 1, []);
            for (let i = 0; i < data.length; i++) {
                data[i].num = data[i].children.length;
                data[i].lev = this.n;
                this.treeData[num].push(data[i]);
                data[i].active = 2;
                if (status) {
                    if (data[i].num > 0) {
                        status = false;
                        data[i].active = 1;
                        this.n = this.n + 1;
                        this.initTree(data[i].children);
                    }
                }
            }
        },
        edit() {

        },
        del(data) {
            this.$http.get('/isp-process-server/depart/del', {
                params: {
                    id: data.id
                }
            }).then((res) => {
                if (res.data.errorCode == 0) {

                }
                else {
                    this.$Modal.info({
                        title: '提示',
                        content: res.data.errorMsg,
                        onOk: ()=> {

                        }
                    });
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        chooseDept(data, index) {
            // 切换一级
            if (index == 0) {
                let datas = this.datas;
                let dataIndex = -1;
                this.n = 0;
                this.treeData = [[]];
                for (let i = 0; i < datas.length; i++) {

                    datas[i].active = 2;
                    datas[i].num = datas[i].children.length;
                    if (datas[i].id == data.id) {
                        dataIndex = i;
                        datas[i].active = 1;
                        if (datas[i].num > 0) {
                            this.n = this.n + 1;
                            this.initTree(datas[i].children);
                        }
                    }
                    this.treeData[0].push(datas[i]);
                }

                // let moveData = this.treeData[0].splice(dataIndex, 1)[0];
                // this.treeData[0].unshift(moveData);
                return false;
            }

            // 切换其他级别
            let dataIndex = -1;
            this.n = index + 1;
            for (let i = 0; i < this.treeData[index].length; i++) {
                this.treeData[index][i].active = 2;
                if (data.id == this.treeData[index][i].id) {
                    this.treeData[index][i].active = 1;
                    dataIndex = i;
                }
            }
            this.treeData.splice(this.n);
            if (data.num > 0) {
                this.initTree(data.children);
            }
            // let moveData = this.treeData[index].splice(dataIndex, 1)[0];
            // this.treeData[index].unshift(moveData);
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

        .listItem {
            padding: 0 11px 0 11px;
            width: 222px;
            border-right: 1px solid #ccc;
        }

        .title {
            padding-bottom: 20px;
            border-bottom: 3px solid #ccc;
        }

        .item {
            width: 200px;
            height: 125px;
            padding: 15px;
            background: #FFFFFF;
            box-shadow: 0 0 6px 0 rgba(0,0,0,0.10);
            border-radius: 2px;
            line-height: 24px;
            margin-bottom: 20px;
            cursor: pointer;
            border-left: 4px solid #fff;

            &.active {
                border-left: 4px solid #3D70FB;
            }

            &:hover {
                border-left: 4px solid #3D70FB;
            }

            &:first-child {
                margin-top: 16px;
            }

            &:last-child {
                margin-bottom: 0;
            }

            span {
                font-size: 12px;
                color: #999999;
                letter-spacing: 0.44px;
            }

            .item-title {
                span {
                    font-size: 12px;
                    color: #333333;
                    letter-spacing: 0.44px;
                }
            }

            .iconBtn {
                margin-top: 6px;
            }

            .edit {
                margin-right: 20px;
                height: 18px;
                width: 18px;
                background: url('../../../assets/images/edit.png') no-repeat;
            }

            .delte {
                height: 18px;
                width: 18px;
                background: url('../../../assets/images/delete .png') no-repeat;
            }
        }

    }
}
</style>
