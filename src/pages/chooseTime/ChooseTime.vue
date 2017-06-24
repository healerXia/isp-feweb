<template lang="html">
    <div class="chooseTime">
        <ProjectInfo :proMess="proMess"></ProjectInfo>
        <div class="chooseTime-box">
            <ProjectStep></ProjectStep>
            <div class="tableList">
                <div class="title">
                    <div class="title-l">
                        <span>选择投放时间</span>
                    </div>
                </div>
                <div v-if='num[index]'  v-for='(i, index) in currentList'  v-bind:key="index" class="item">
                    <p>{{num[index]}}</p>
                    <table  border="0" cellspacing="1" cellpadding="0" class="dateTable hasCheck">
                        <tr class='dateTable-title'>
                            <td></td>
                            <td>广告位名称</td>
                            <td>用途</td>
                            <td>刊例价</td>
                            <td v-for = 'i in 31' class='dateTd'>{{i}}</td>
                        </tr>
                        <tr
                            v-if = 'list.adStateList.length!=0'
                            v-on:edit = 'edit'
                            v-on:selectData = 'selectStyle'
                            v-for='(list, index) in i'
                            :info='list'
                            :index = 'index'
                            is='DateRow'>
                            <td>
                                <a @click='delAd(index, list)' href="javascript:;">
                                    <Icon class='delIco' type="ios-close-outline"></Icon>
                                </a>
                            </td>
                        </tr>
                    </table>

                    <div class="price clear">
                        <div class="fl">
                            <a href="javascript:;" @click='insert(index)'>新增本月广告位</a>
                        </div>
                        <div class="fr">
                            <span>购买净总价：{{priceList[index].total}}</span>
                            <span>配送总价：{{priceList[index].delivery}}</span>
                            <span>配送比率：{{priceList[index].proportion}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="save">
                <Button type="primary" @click='save'>保存方案</Button>
                <Button type="primary" @click='generate'>生成价格</Button>
            </div>
        </div>
    </div>
</template>

<script>
import qs from 'qs';
 // 组件
import ProjectInfo from 'component/ProjectInfo';
import ProjectStep from 'component/ProjectStep';
import DateRow from 'component/DateRow'
export default {
    data() {
        return {
            proMess: {},
            priceList:[],
            // 元数据
            tableData: [],
            // 页面数据集合(用于展示)
            pageList: {},
            // 页面数据集合(提交数据格式)
            submitList: [],
            // 当前页面数据
            currentList: [],
            // 分页信息
            paging: {
                // 当前页面索引
                index: 0,
                // 广告位总条数
                count: 0,
                //总页数
                totalPages: 0
            },
            // 月份数
            num: []
        }
    },
    components: {
        DateRow,
        ProjectInfo,
        ProjectStep
    },
    mounted() {
        this.proMess = JSON.parse(window.localStorage.getItem('proMess'));
        let action = this.$router.currentRoute.query.action;
        let len = 0;
        // 新增
        if (action == 1) {

            let insertData = JSON.parse(window.localStorage.getItem('insertData'));
            this.pageList = Object.assign({}, JSON.parse(window.localStorage.getItem('timePageList')));
            this.priceList = Object.assign([], JSON.parse(window.localStorage.getItem('timePriceList')));
            this.num = Object.assign([], JSON.parse(window.localStorage.getItem('monthList')));

            // 新插入数据容器
            let insertList = [];
            // 元数据容器
            let dataList = [];
            // 分析导入的数据
            for(let i = 0;i < this.num.length;i++) {
                let time = this.num[i];
                insertList = insertData[time];
                dataList = this.pageList[time];
                if (dataList) {
                    this.compared(dataList, insertList, time);
                }
                else {
                    this.pageList[time] = insertData[time];
                }
            }

            let priceLength = this.priceList.length;

            for (let i = 0;i < this.num.length; i++) {
               len += this.pageList[this.num[i]].length;
               let status = false;
               let times = '';
               for (let j = 0; j < priceLength; j++) {
                   if (this.priceList[j].time == this.num[i]) {
                       status = true;
                       times = this.num[i];
                   }
               }
               if (!status) {
                   this.$set(this.priceList, i, {
                       time: times,
                       total: 0,
                       delivery: 0,
                       exchange: 0,
                       per: 0,
                       proportion:'0:0'
                   })
               }
           }
            window.localStorage.setItem('timePriceList', JSON.stringify(this.priceList));
            window.localStorage.setItem('timePageList', JSON.stringify(this.pageList));
        }
        // 正常添加
        else {
            //let priceList = window.localStorage.getItem('timePriceList');
            // if (priceList) {
            //     this.priceList = JSON.parse(priceList);
            // }
            this.pageList = Object.assign({}, JSON.parse(window.localStorage.getItem('tableData')));
            this.num = Object.assign([], JSON.parse(window.localStorage.getItem('monthList')));

            for (let i = 0;i < this.num.length; i++) {
                len += this.pageList[this.num[i]].length;

                this.priceList.push({
                    time: this.num[i],
                    total: 0,
                    delivery: 0,
                    exchange: 0,
                    per: 0,
                    proportion:'0:0'
                });
            }


        }

        // 可放置最大月份个数
        let maxMonthNum = Math.ceil(40/len);
        // 初始化当前页月份数
        if(this.num.length <= maxMonthNum) {
            //一页可以显示完
            for (let i = 0;i<this.num.length; i++) {
                this.currentList.push(this.pageList[this.num[i]]);
            }
        }
        else {
            //每页可显示月份为maxMonthNum
        }
        this.num = this.num.sort();
    },
    methods: {
        // 数据拆分
        render() {
            this.proMess = JSON.parse(window.localStorage.getItem('proMess'));
        },
        // 新老数据对比
        compared(oldData, newData,time) {
            let id = -1;
            let obj = {};

            for (let i = 0; i < newData.length; i++) {
                id = newData[i].id;
                var isExit = false;
                for (let k = 0; k < oldData.length; k++) {
                    if (oldData[k].id == id) {
                        isExit = true;
                        break;
                    }
                }

                if (!isExit) {
                    this.pageList[time].push(newData[i]);
                }
            }
        },
        // 计算比率 购买 配送
        ratio(total, delivery) {
            if (total == 0 && delivery != 0) {
                return `1:0`;
            }
            else if (total !=0 && delivery == 0) {
                return `0:0`
            }
            else if(total == 0 && delivery == 0){
                return `0:0`
            }
            else {
                let percent = delivery/total;
                return `1:${percent.toFixed(1)}`;
            }
        },
        // 操作的是行单位
        // obj 选中数据 index 操作数据的索引 操作数据的时间 type 用途 action 添加还是删除
        edit(obj, index, date, type, action, dayIndex) {
            let arr = [];
            for (let i = 0;i < obj.length;i++) {
                if (obj[i]) {
                    arr.push({
                        'beginTime': `${date}-${i+1}`,
                        'endTime': `${date}-${i+1}`,
                        'skuId': this.pageList[date][index].skuIdList[dayIndex]
                    })
                    this.$set(this.pageList[date][index].adStateList, i, "4");
                }
            }
            if (action == 2) {
                this.$set(this.pageList[date][index].adStateList, dayIndex, "1");
            }

            // 更新数据
            // 查找当前数据属于哪个月份的数组索引
            let tableIndex = this.num.indexOf(date);
            // console.log(tableIndex); // 表索引
            // console.log(index); // 表格所在行数索引
            this.pageList[date][index].dataList = Object.assign([], arr);
            this.pageList[date][index].useStyle = 4001;
            if (!this.pageList[date][index].total) {
                this.pageList[date][index].total = 0;
            }
            if (!this.pageList[date][index].delivery) {
                this.pageList[date][index].delivery = 0;
            }
            if (!this.pageList[date][index].exchange) {
                this.pageList[date][index].exchange = 0;
            }
            if (!this.pageList[date][index].per) {
                this.pageList[date][index].per = 0;
            }

            if (type == 4001) {
                if (action == 1) {
                    this.pageList[date][index].total += parseInt(this.pageList[date][index].price);
                }
                else {
                    this.pageList[date][index].total -= parseInt(this.pageList[date][index].price);
                }
            }
            if (type == 4003) {
                if (action == 1) {
                    this.pageList[date][index].delivery += parseInt(this.pageList[date][index].price);
                }
                else {
                    this.pageList[date][index].delivery -= parseInt(this.pageList[date][index].price);
                }
            }

            // 互换
            if (type == 4002) {
                if (action == 1) {
                    this.pageList[date][index].exchange += parseInt(this.pageList[date][index].price);
                }
                else {
                    this.pageList[date][index].exchange -= parseInt(this.pageList[date][index].price);
                }
            }

            // 自用
            if (type == 4004) {
                if (action == 1) {
                    this.pageList[date][index].per += parseInt(this.pageList[date][index].price);
                }
                else {
                    this.pageList[date][index].per -= parseInt(this.pageList[date][index].price);
                }
            }

            let datas = this.pageList[date];
            let a = 0;
            let b = 0;
            let c = 0;
            let d = 0;
            for (let i = 0; i < datas.length; i++) {
                if (!datas[i].total) {
                    datas[i].total = 0;
                }

                if (!datas[i].delivery) {
                    datas[i].delivery = 0;
                }
                a += parseInt(datas[i].total);
                b += parseInt(datas[i].delivery);
                c += parseInt(datas[i].exchange);
                d += parseInt(datas[i].per);
            }

            let str = this.ratio(a, b);
            this.pageList[date][index].proportion = str;

            this.$set(this.priceList, tableIndex, {
                time: date,
                total: a,
                delivery: b,
                exchange: c,
                per: d,
                proportion: str
            })
            window.localStorage.setItem('timePriceList', JSON.stringify(this.priceList));
            window.localStorage.setItem('timePageList', JSON.stringify(this.pageList));
        },
        // 切换用途
        selectStyle(oldType, newType, list, index, price, date) {

            if (!this.pageList[date][index].total) {
                this.pageList[date][index].total = 0;
            }
            if (!this.pageList[date][index].delivery) {
                this.pageList[date][index].delivery = 0;
            }
            if (!this.pageList[date][index].exchange) {
                this.pageList[date][index].exchange = 0;
            }
            if (!this.pageList[date][index].per) {
                this.pageList[date][index].per = 0;
            }


            let money = this.computedPrice(list, price);
            let tableIndex = this.num.indexOf(date);
            this.pageList[date][index].useStyle = 4001;
            switch (oldType) {
                // 销售
                case 4001:
                    this.pageList[date][index].total -= money;
                    this.pageList[date][index].useStyle = 4001;
                    break;
                // 配送
                case 4003:
                    this.pageList[date][index].delivery -= money;
                    this.pageList[date][index].useStyle = 4003;
                    break;
                // 互换
                case 4002:
                    this.pageList[date][index].exchange -= money;
                    this.pageList[date][index].useStyle = 4002;
                    break;
                // 自用
                case 4004:
                    this.pageList[date][index].per -= money;
                    this.pageList[date][index].useStyle = 4004;
                    break;

            }

            switch (newType) {
                case 4001:
                    this.pageList[date][index].total += money;
                    this.pageList[date][index].useStyle = 4001;
                    break;
                case 4003:
                    this.pageList[date][index].delivery += money;
                    this.pageList[date][index].useStyle = 4003;
                    break;
                case 4002:
                    this.pageList[date][index].exchange -= money;
                    this.pageList[date][index].useStyle = 4002;
                    break;
                case 4004:
                    this.pageList[date][index].per -= money;
                    this.pageList[date][index].useStyle = 4004;
                    break;
            }

            let datas = this.pageList[date];
            let a = 0;
            let b = 0;
            let c = 0;
            let d = 0;
            for (let i = 0; i < datas.length; i++) {
                if (!datas[i].total) {
                    datas[i].total = 0;
                }

                if (!datas[i].delivery) {
                    datas[i].delivery = 0;
                }

                if (!datas[i].exchange) {
                    datas[i].exchange = 0;
                }

                if (!datas[i].per) {
                    datas[i].per = 0;
                }


                a += parseInt(datas[i].total);
                b += parseInt(datas[i].delivery);
                c += parseInt(datas[i].exchange);
                d += parseInt(datas[i].per);
            }

            let str = this.ratio(a, b);
            this.pageList[date][index].proportion = str;

            this.$set(this.priceList, tableIndex, {
                time: date,
                total: a,
                delivery: b,
                exchange: c,
                per: d,
                proportion: str
            })

            window.localStorage.setItem('timePriceList', JSON.stringify(this.priceList));
            window.localStorage.setItem('timePageList', JSON.stringify(this.pageList));
        },
        // 计算价格
        computedPrice(list, price) {
            let n = 0;
            for (let i = 0; i < list.length; i++) {
                if (list[i]) {
                    n++;
                }
            }

            return n * price;
        },
        // 格式化提交数据
        initSubmitData() {
            this.submitList = [];
            for(let i = 0; i< this.num.length; i++) {
                let time = this.num[i];
                let data = this.pageList[time];

                for(let k = 0;k < data.length;k++) {
                    let yearMonth = data[k].yearMonth.split('-').join('');
                    data[k].yearMonth = yearMonth;
                    this.submitList.push(data[k]);
                }
            }
        },
        // 保存方案
        save() {
            let self = this;
            this.initSubmitData();
            let str = JSON.stringify(this.submitList);
            let datas = JSON.parse(str);

            for(let i = 0; i < datas.length; i++){
                datas[i].yearMonth = parseInt(datas[i].yearMonth);
            }

            this.$http.post('/isp-kongming/adorder/insert', {
                "action": 0,
                 "ProjectId": this.proMess.id,
                 "ProjectName": this.proMess.projectName,
                 "detailList": datas
             }).then((res) => {
                if (res.data.errorCode == 0) {
                    this.$Modal.success({
                        title: '提示',
                        content: '方案保存成功'
                        // onOk () {
                        //      self.$router.push({path: 'orderList', query: {id: self.proMess.id}});
                        // }
                    });
                    window.localStorage.setItem('adOrderCode', res.data.result);
                }
                else {
                    this.$Modal.info({
                        title: '提示',
                        content: res.data.errorMsg
                    });
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        // 生成价格
        generate() {
           this.initSubmitData();
           let numList = [];
           for (let i = 0; i < this.num.length; i++) {
               numList[i] = this.num[i].split('-').join('');
           }
           for (let i = 0;i<this.submitList.length;i++) {
                let index = numList.indexOf(this.submitList[i].yearMonth);
                this.submitList[i].SellAllPrice = this.priceList[index].total;
                this.submitList[i].DispatchinglAllPrice = this.priceList[index].delivery;
           }

           window.localStorage.setItem('price', JSON.stringify(this.submitList));
           window.localStorage.setItem('priceList', JSON.stringify(this.priceList));



           let str = JSON.stringify(this.submitList);
           let datas = JSON.parse(str);
           let self = this;
           this.$http.post('/isp-kongming/adorder/insert', {
                "ProjectId": this.proMess.id,
                "ProjectName": this.proMess.projectName,
                "detailList": datas
            }).then((res) => {
               if (res.data.errorCode == 0) {
                   this.$Modal.success({
                       title: '提示',
                       content: '方案保存成功',
                       onOk () {
                            window.localStorage.setItem('adOrderCode', res.data.result);
                            self.$router.push('buildPrice');
                        }
                   });
               }
               else {
                   this.$Modal.info({
                       title: '提示',
                       content: res.data.errorMsg
                   });
               }
           }).catch((err) => {
               console.log(err)
           })
        },
        // 新增
        insert(index) {
            // 新增广告位 跳转至选择时间页面，并保存当前所选择数据 新增月份 action 1
            window.localStorage.setItem('timePageList',JSON.stringify(this.pageList));
            window.localStorage.setItem('monthList', JSON.stringify(this.num));
            window.localStorage.setItem('timePriceList', JSON.stringify(this.priceList));
            this.$router.push({name:"resource", query: {action:1, time:this.num[index]}});
        },
        // 删除当前广告
        delAd(index,list) {
            let date = list.yearMonth;
            let checkBoxList = JSON.parse(window.localStorage.getItem('checkBoxList'));
            let idIndex = checkBoxList.indexOf(list.id);
            checkBoxList.splice(idIndex, 1);
            this.pageList[date].splice(index, 1);
            let len = 0;

            // 清空当前月份
            if (this.pageList[list.yearMonth].length == 0) {
                let monthIndex = this.num.indexOf(list.yearMonth);
                this.num.splice(monthIndex, 1);
                delete this.pageList[list.yearMonth];
                this.priceList.splice(index, 1);
            }
            else {
                let a = list.total;
                let b = list.delivery;
                let c = list.exchange;
                let d = list.per;
                let tableIndex = this.num.indexOf(date);
                // let aTotal = this.priceList[date][index].total;
                // let bTotal = this.priceList[date][index].delivery;

                this.priceList[tableIndex].total -= a;
                this.priceList[tableIndex].delivery -= b;
                this.priceList[tableIndex].exchange -= c;
                this.priceList[tableIndex].per -= d;

            }



            for (let i = 0;i < this.num.length; i++) {
                len += this.pageList[this.num[i]].length;
            }

            this.currentList = [];
            // 可放置最大月份个数
            let maxMonthNum = Math.ceil(40/len);
            // 初始化当前页月份数
            if(this.num.length <= maxMonthNum) {
                //一页可以显示完
                for (let i = 0;i<this.num.length; i++) {
                    this.currentList.push(this.pageList[this.num[i]]);
                }
            }
            else {
                //每页可显示月份为maxMonthNum
            }

            this.num = this.num.sort();
            //重新计算价格
            window.localStorage.setItem('monthList', JSON.stringify(this.num));
            window.localStorage.setItem('timePageList', JSON.stringify(this.pageList));
            window.localStorage.setItem('tableData', JSON.stringify(this.pageList));
            window.localStorage.setItem('checkBoxList', JSON.stringify(checkBoxList));
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../assets/css/pageCss/chooseTime.scss';
</style>
