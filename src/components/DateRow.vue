<template lang="html">
    <tr @mousedown.stop.prevent = 'setMove'
        @mouseup.stop.prevent = 'resetMove'
        @mouseover='moveCheck'
        @mouseleave='moveout'
        @mouseout='clearTime'>
        <slot></slot>
        <td @mousedown.stop.prevent='fn'
            @mouseup.stop.prevent='fn'
            @mouseover.stop.prevent='fn'
            @mouseleave='moveout'
            style='user-select:none; width:200px;border: 1px solid #E9E9E9'
            class='infoNameTd'
        >
            <Tooltip  placement="top">
                <div slot="content">
                    <div style='white-space: normal;text-align:left'>{{info.name}}</div>
                </div>
                <span class='infoName'>{{info.name}}</span>
            </Tooltip>
        </td>
        <td>
            <Select class='useSelect' v-model="useStyle" @on-change='selectData' style="line-height:38px; height:38px;">
                <Option v-for="(key, value) in useList" :value="key" :key="value">{{value}}</Option>
            </Select>
        </td>
        <td class='priceTd'>
            <span>{{formatNum(parseFloat(info.price), 2)}}元/天</span>
        </td>
        <td v-for='(i,index) in info.adStateList'
            :class='["dateTd", {"active": indexList[index]},{"default": i == 3}, {"hasSel": i == 2}]'>
            <span :data-index='index' :data-status='i' class='dateSpan'></span>
            <div :class='["dateLayer", {"dialog-right": index > 20 }]' v-show='visibleList[index]'>
                <div class='dialogContent' slot='content'>
                    <p class="dialogContent-title">日期</p>
                    <div class="dialogContent-top">
                        <p>价格：{{layer.skuPrice}}元/天</p>
                        <p>尺寸：{{layer.width =! '' ? layer.width : '-'}}*{{layer.height != '' ? layer.height : '-'}}px ≤ 100k</p>
                    </div>
                    <div class="dialogContent-bot">
                        <p>占用人：{{layer.dutyUserName ? layer.dutyUserName : '-'}}</p>
                        <p>订单号：{{layer.adOrderCode ? layer.adOrderCode: '-'}}</p>
                        <p>订单状态：{{layer.statusName ? layer.statusName: '-'}}</p>
                        <p>最终客户：
                            <Row>
                                <Col span="6">最终客户：</Col>
                                <Col span="17">{{layer.adCustomerName ? layer.adCustomerName : '-'}} </Col>
                            </Row>                       
                        </p>
                        <p>点击/曝光：{{layer.singleClick ? layer.singleClick : '-'}}/{{layer.singleDisplay ? layer.singleDisplay : '-'}}</p>
                    </div>
                </div>
            </div>
        </td>
    </tr>
</template>

<script>
export default {
    props: {
        info: {
            type: Object,
            default: function() {
                return {}
            }
        },
        index: 0
    },
    data() {
        return {
            adName: '',
            visibleList: [],
            // 日期选中状态列表
            indexList: [],
            // 当前行选中移动状态开启
            moveOnoff: false,
            // 控制shift操作状态
            // keyOnoff: false,
            start: -1,
            end: -1,
            // 选中表格数
            n: 0,
            // 计时器
            timer: null,
            // 用途
            useStyle: 4001,
            // 初始用途
            useState: 4001,
            useList: {
                "销售": 4001,
                "配送": 4003,
                "互换": 4002,
                "自用": 4004
            },
            layer: {
                "skuPrice": "",
                "pSize": "",
                "dutyUserName": "",
                "adOrderCode": "",
                "state": "",
                "adCustomerName": "",
                "singleClick": "",
                "singleDisplay": ""
            }
        }
    },
    watch:{
        info: {
            handler: function(){
                for (let i = 0;i < this.info.adStateList.length;i++) {
                    if (this.info.adStateList[i] == 4) {
                        this.$set(this.indexList, i, true);
                    }
                }
                this.useStyle = this.info.useStyle;
            },
            deep: true
        }
    },
    mounted() {
        this.useStyle = this.info.useStyle;
        console.log(this.info);
        for(let i = 0;i < 31; i++) {
            this.$set(this.visibleList, i, false);
        }
        if (this.info.adStateList) {
            for (let i = 0;i<this.info.adStateList.length;i++) {
                if (this.info.adStateList[i] == 4) {
                    this.$set(this.indexList, i, true);
                }
                else {
                    this.$set(this.indexList, i, false);
                }

                let timeName = this.info.adStateList[i];

                if (timeName == 'SKU_STATUS_LOCKED' || timeName == 'SKU_STATUS_SALED' || timeName == 'SKU_STATUS_RUNNING') {
                    this.$set(this.info.adStateList, i, "2");
                }
                if (timeName == 'SKU_STATUS_NONE' || timeName =='SKU_STATUS_DELETE' || timeName == 'SKU_STATUS_IDLE') {
                    this.$set(this.info.adStateList, i, "1");
                }

            }
        }
        else {
            for (let i = 0;i<31;i++) {
                this.$set(this.indexList, i, false);
            }
        }

        this.adNames = window.sessionStorage.getItem('adName');

        // for (let i = 0; i < this.timeData.length; i++) {
        //      let timeName = this.timeData[i];
        //      if (timeName == 'SKU_STATUS_LOCKED' || timeName == 'SKU_STATUS_SALED' || timeName == 'SKU_STATUS_RUNNING') {
        //          this.$set(this.indexList, i, "2");
        //      }
        //      if (timeName == 'SKU_STATUS_NONE' || timeName =='SKU_STATUS_DELETE' || timeName == 'SKU_STATUS_IDLE') {
        //          this.$set(this.indexList, i, "1");
        //      }
        // }

        //console.log(this.info);
        // setTimeout(()=> {
        //     console.log(hasSel);
        // },2000)
        // shift操作
        // document.onkeydown = (ev) => {
        //     var ev = ev || event;
        //     if (ev.keyCode == 16) {
        //         this.keyOnoff = true;
        //
        //     }
        // }
        //
        // document.onkeyup = (ev) => {
        //     var ev = ev || event;
        //     if (ev.keyCode == 16) {
        //         this.keyOnoff = false;
        //     }
        // }
    },
    methods: {
        initRow() {

        },
        // 删除数据
        delAd() {

        },
        //转千分位
        formatNum(num, n) {
           //参数说明：num 要格式化的数字 n 保留小数位
            num = String(num.toFixed(n));
            var re = /(-?\d+)(\d{3})/;
            while(re.test(num)) {
                num = num.replace(re,"$1,$2");
            }
            return num;
        },
        check(event) {
            this.initTd(event);
            //let target = event.target.nodeName;
            // if (target.toUpperCase() === 'SPAN') {
            //     let index = event.target.getAttribute('data-index');
            //     let status = this.indexList[index];
            //     if (status) {
            //         this.$set(this.indexList, index, false);
            //     }
            //     else {
            //         this.$set(this.indexList, index, true);
            //     }
            //     // shift组合键判断流程
            //     if (this.keyOnoff) {
            //         if (this.start === -1) {
            //             this.start = index;
            //         } else {
            //             this.end = index;
            //         }
            //         if (this.start !== -1 && this.end !== -1) {
            //             for (let i = this.start;i<=this.end;i++) {
            //                 this.$set(this.indexList, i, true);
            //             }
            //             this.start = -1;
            //             this.end = -1;
            //         }
            //     }
            // }
        },
        initTd(event) {
            let target = event.target.nodeName;
            if (target.toUpperCase() === 'SPAN') {
                this.visibleList = [];
                if (event.target.getAttribute('data-status') == 1||event.target.getAttribute('data-status') == 4) {

                    let index = parseInt(event.target.getAttribute('data-index'));
                    let status = this.indexList[index];

                    if (status) {
                        this.$set(this.indexList, index, false);
                        this.$emit('edit', this.indexList, this.index, this.info.yearMonth,this.useStyle, 2, index);
                        // this.totalRmb(2);
                    }
                    else {
                        this.$set(this.indexList, index, true);
                        // this.totalRmb(1);
                        this.$emit('edit', this.indexList, this.index, this.info.yearMonth,this.useStyle, 1, index);
                    }
                }
            }
        },
        setMove(event) {
            this.check(event);
            this.moveOnoff = true;
        },
        resetMove(event) {
            // 鼠标抬起清空操作
            this.moveOnoff = false;
        },
        moveCheck(event) {
            let target = event.target.nodeName;
            let className = event.target.getAttribute('class');

            if (target.toUpperCase() === 'SPAN' && className == 'dateSpan') {
                this.visibleList = [];
                // this.$set(this.visibleList, index, true);
                this.timer = setTimeout(() => {
                    this.$nextTick(() => {
                        let dataTimes = this.info.yearMonth;
                        let dateIndex = parseInt(event.target.getAttribute('data-index')) + 1;

                        let dayData = {};
                        let datas = JSON.parse(this.info.adStateLists);

                        for (let attr in datas) {
                            if (attr == dataTimes) {
                                let arr = datas[attr];

                                for (let j = 0; j < arr.length; j++) {
                                    if (arr[j].day == dateIndex) {
                                        this.layer.skuPrice = arr[j].skuPrice;
                                    }
                                }
                            }
                        }
                        console.log(dataTimes);
                        // 宽高
                        this.layer.pSize = `${this.info.width}*${this.info.height}`;
                        if (dateIndex < 10) {
                            dateIndex = '0' + dateIndex
                        }

                        // "adPlaceId": `${this.info.adPlaceId}`,
                        // "beginTime": `${this.time}-${dateIndex}`,
                        // "endTime": `${this.time}-${dateIndex}`
                        this.$http.post('/isp-kongming/ad/positioning', {
                            "beginTime": `${dataTimes}-${dateIndex}`,
                            "endTime": `${dataTimes}-${dateIndex}`,
                            "curDate": `${dataTimes}-${dateIndex}`,
                            "adPlaceId": `${this.info.adPlaceId}`
                        }).then((res) => {
                            if (res.data.errorCode == 0) {
                                this.layer = Object.assign({}, res.data.result);
                                this.layer.width = `${this.layer.width}`;
                                this.layer.height = `${this.layer.height}`;
                                this.layer.pSize = `${this.info.width} * ${this.info.height}`;
                                let skuDatas = JSON.parse(this.info.adStateLists);
                                for (let attr in skuDatas) {
                                    if(attr == `${dataTimes}`) {
                                        let n = skuDatas[attr];
                                        this.layer.skuPrice = n[dateIndex-1].skuPrice;
                                    }
                                }
                            }
                            else if (res.data.errorCode == 50000){
                                this.$Modal.info({
                                    title: '提示',
                                    content: res.data.errorMsg,
                                    onOk: () => {
                                        window.location.href = 'http://dev-a.yiche.com/static_common-portal/login.html';
                                    }
                                });
                            }
                            else {
                                this.layer = {};
                                this.layer.width = '';
                                this.layer.height = '';
                                this.layer.pSize = `${this.info.width} * ${this.info.height}`;
                                let skuDatas = JSON.parse(this.info.adStateLists);
                                for (let attr in skuDatas) {
                                    if(attr == this.time) {
                                        let n = skuDatas[attr];
                                        this.layer.skuPrice = n[dateIndexs].skuPrice;
                                    }
                                }
                            }
                        }).catch((err) => {
                            console.log(err);
                        })


                        let index = parseInt(event.target.getAttribute('data-index'));
                        this.$set(this.visibleList, index, true);
                        let y = event.clientY;

                        if (y < 270) {
                            event.target.nextElementSibling.style.top = 34 + 'px';
                        }
                        else {
                            event.target.nextElementSibling.style.top = -270 + 'px';
                        }
                    })
                }, 1500)
            }
            // 当前行移动和状态开启 进行选中操作
            if (this.moveOnoff) {
                this.initTd(event);
            }
        },
        moveout() {
            this.moveOnoff = false;
        },
        fn (){
            return false;
        },
        clearTime() {
            this.visibleList = [];
            clearTimeout(this.timer);
        },

        selectData() {
            this.$emit('selectData', this.useState, this.useStyle, this.indexList, this.index, this.info.price, this.info.yearMonth);
            this.useState = this.useStyle;
        }
    }
}
</script>

<style lang="scss" scoped>
td {
    padding: 0;

    .infoName {
        margin: 0 auto;
        display: block;
        width: 200px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 23px;
        height: 23px;
        text-align: left;

        &:hover {
            cursor: pointer;
        }
    }
}

.infoNameTd {
    position: relative;
}


.dateLayer {
    position: absolute;
    background: #fff;
    top: 34px;
    z-index: 999;

}

.dialog-right {
    left: -288px;
}


span {
    height: 100%;
    // width: 100%;
    display: block;
}

.priceTd {
    width: 126px;
    border: 1px solid #DEE1E5;

    span {
        text-align: right;
        // text-indent: 20px;
        padding-right: 10px;
    }
}

.dateTd {
    position: relative;
    border: 1px solid #DEE1E5;;
    width: 20px;

    &.default {
        background: #EDEFF2;
    }

    &.active {
        background: #A8C8EE;
    }

    &.hasSel {
        background: #6A7088;
    }

}

td.unselect {
    background: blue;
}

.dateSpan {
    height: 36px;
    width: 20px;
}

.dialogContent {

    position: relative;
     padding: 0 20px 20px;
     min-width: 320px;
     font-size: 12px;
     text-align: left;

     background: #FFFFFF;
     border: 1px solid #E9E9E9;
     box-shadow: 0 4px 8px 0 rgba(0,0,0,0.20);

    .dialogContent-title {
        position: absolute;
        top: 0;
        left: 0;
        text-indent: 20px;
        width: 100%;
        height: 34px;
        line-height: 34px;
        background: #F9F9F9;
    }

    .dialogContent-top {
        margin-top: 34px;
        text-indent: 4px;
        line-height: 30px;
        border-bottom: 1px solid #ccc;
    }

    .dialogContent-bot {
        text-indent: 4px;
        line-height: 30px;
    }
}


// .dateTd span:hover {
//     border: 1px solid green;
// }
</style>
