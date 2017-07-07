<template lang="html">
    <tr class='dialogTr' @mouseover='over' @mouseout='clear'>
        <slot></slot>
        <td v-for = '(i, index) in timeData' :class='["dateTd" ,{"default": i == 3}, {"hasSel": i == 2}]'>
            <a href="javascript:;" :data-index='index'></a>
            <!-- 弹层 -->
            <div :class='["dateLayer", {"dialog-right": index > 20 }]' v-show='visibleList[index]'>
                <div class='dialogContent' slot='content'>
                    <p class="dialogContent-title">日期</p>
                    <div class="dialogContent-top">
                        <p>价格：{{layer.skuPrice}}元/天</p>
                        <p>尺寸：{{layer.width == '' ? '-':layer.width}}*{{layer.height == '' ? '-' : layer.height}}px ≤ 100k</p>
                    </div>
                    <div class="dialogContent-bot">
                        <p>占用人：{{layer.dutyUserName ? layer.dutyUserName : '-'}}</p>
                        <p>订单号：{{layer.adOrderCode ? layer.adOrderCode: '-'}}</p>
                        <p>订单状态：{{layer.statusName ? layer.statusName: '-'}}</p>
                        <p>  
                            <Row>
                                <Col span="6">最终客户：</Col>
                                <Col span="17">{{layer.adCustomerName ? layer.adCustomerName : '-'}} </Col>
                            </Row>
                        </p>
                        <p>点击/曝光：{{layer.singleClick ? layer.singleClick : '-'}}/{{layer.singleDisplay ? layer.singleDisplay : '-'}}</p>
                    </div>
                </div>
            </div>
            <!-- 弹层 -->
        </td>
    </tr>
</template>

<script>
import {getDaysInOneMonth} from '../plugins/tool';
import qs from 'qs';
export default {
    props: {
        info: {
            default: function() {
                return {}
            }
        },
        timeData: {
            default: function() {
                return []
            }
        },
        time: {
            default: function() {
                return ''
            }
        }
    },
    data() {
        return {
            visibleList: [],
            time: "",
            styles: {
                top: '20px'
            },
            timer: null,
            searchInfo: {
                // 开始时间
                beginTime: '',
                // 结束时间
                endTime: '',
                // 页面类型
                pageType: '',
                // 媒体名称
                mediaName: '',
                // 页面名称
                pageName: '',
                // 广告类型
                adType: '',
                // 投放地区
                '投放地区': '',
                // 投放车型
                '投放车型': '',
                // 投放品牌
                '投放品牌': '',
                // 投放关键字
                '投放关键字': ''
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
            },
            tableList: {
                // 0 可选 1 已选择  2禁止选择区域
                days: []
            }
        }
    },
    watch: {
        timeData: {
            handler: function() {
                this.initDate(this.time);
                setTimeout(() => {
                    //console.log(this.info);
                })
            }
        }
    },
    mounted() {
        for(let i = 0;i < 31; i++) {
            this.$set(this.visibleList, i, false);
        }
        if (this.time) {
            this.initDate(this.time);
        }
        console.log(this.info);
    },
    methods: {
        initDate(time) {

            // 获取数据传输的年月
            let arry = this.time.split('-');
            let dataYear = arry[0];
            let dataMoth = arry[1];
            // 获取传入的月份有多少天
            let totalDays = getDaysInOneMonth(dataYear, dataMoth);

            if (totalDays < 31) {
                for (let i = totalDays; i < 31; i++) {
                    this.$nextTick(() => {
                        this.$set(this.timeData, i, "3");
                    })
                }
            }

            let times = new Date();
            let year = times.getFullYear();
            let month = times.getMonth() + 1;
            let day = times.getDate();

            for (let i = 0; i < this.timeData.length; i++) {
                 let timeName = this.timeData[i];
                 if (timeName == 'SKU_STATUS_LOCKED' || timeName == 'SKU_STATUS_SALED' || timeName == 'SKU_STATUS_RUNNING') {
                     this.$set(this.timeData, i, "2");
                 }
                 if (timeName == 'SKU_STATUS_NONE' || timeName =='SKU_STATUS_DELETE' || timeName == 'SKU_STATUS_IDLE') {
                     this.$set(this.timeData, i, "1");
                 }

                 if (!timeName) {
                    this.$set(this.timeData, i, "3");
                 }

                 if ((new Date(`${year}/${month}/${day}`)) >= new Date(`${time}/${i+1}`.replace(/\-/g, "\/"))) {
                     this.$set(this.timeData, i, "3");
                 }

            }

        },
        over(event) {
            let target = event.target.nodeName;
            if (target.toUpperCase() === 'A') {
                this.visibleList = [];

                // this.$set(this.visibleList, index, true);
                this.timer = setTimeout(() => {
                    this.$nextTick(() => {
                        let dateIndexs = parseInt(event.target.getAttribute('data-index'));
                        let dateIndex = parseInt(event.target.getAttribute('data-index')) + 1;
                        if (dateIndex < 10) {
                            dateIndex = '0' + dateIndex
                        }

                        // "adPlaceId": `${this.info.adPlaceId}`,
                        // "beginTime": `${this.time}-${dateIndex}`,
                        // "endTime": `${this.time}-${dateIndex}`
                        this.$http.post('/isp-kongming/ad/positioning', {
                            "beginTime": `${this.time}-${dateIndex}`,
                            "endTime": `${this.time}-${dateIndex}`,
                            "curDate": `${this.time}-${dateIndex}`,
                            "adPlaceId": `${this.info.adPlaceId}`
                        }).then((res) => {
                            if (res.data.errorCode == 0) {
                                this.layer = Object.assign({}, res.data.result);
                                this.layer.width = `${this.layer.width}`;
                                this.layer.height = `${this.layer.height}`;
                                this.layer.pSize = `${this.info.width} * ${this.info.height}`;


                                if (window.sessionStorage.getItem('viewState') == 2) {
                                    let sk = this.info.adStateList;
                                    console.log(this.time);
                                    for (let i = 0; i < sk.length; i++) {
                                        if (sk[i].time == this.time) {
                                            this.layer.skuPrice = sk[i].dayStatus[dateIndexs].skuPrice;
                                        }
                                    }
                                }
                                else {
                                    let skuDatas = JSON.parse(this.info.adStateLists);
                                    for (let attr in skuDatas) {
                                        if(attr == this.time) {
                                            let n = skuDatas[attr];
                                            this.layer.skuPrice = n[dateIndexs].skuPrice;
                                        }
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
                            event.target.nextElementSibling.style.top = -280 + 'px';
                        }
                    })
                }, 2000)
            }
        },
        clear() {
            this.visibleList = [];
            clearTimeout(this.timer);
        }
    }
}
</script>

<style lang="scss">
.dialogTr {
    .dateLayer {
        position: absolute;
        background: #fff;
        top: 34px;
        z-index: 999;

    }

    .dialog-right {
        left: -320px;
    }


    .allMoth {
        width: 40px;
    }
    .dateTd {
        position: relative;
        height: 28px;
        width: 20px;
        border: 1px solid #E9E9E9;

        &.default {
            background: #EDEFF2;
        }

        &.active {
            background: #A8C8EE;
        }

        &.hasSel {
            background: #6A7088;
        }

        a {
            display: block;
            height: 28px;
            width: 26px;
        }
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
}
</style>
