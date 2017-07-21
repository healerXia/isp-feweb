<template lang="html">
    <div class="flight">
        <table class="dateTable" border="1" cellspacing="1" cellpadding="0"
            @mouseover = 'dateMove'
            @mouseleave = 'dateOut'
            @mousedown.stop.prevent='setMove'
            @mouseup.stop.prevent='resetMove'
            :data-id = 'id'
        >
            <slot></slot>
            <tr class="dateTr">
                <td v-for='i in days' class="dateTd">
                    <a href="javascript:;" class='dateA'></a>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    props: {
        // 当前表格信息
        // 组件为一个广告位的信息
        // 只接收当前广告位数据信息
        dateInfo: {
            type: Object,
            default: function() {
                return {};
            }
        },
        dateList: {
            type: Array,
            default: function() {
                return [];
            }
        },
        days: {
            default: function() {
                return 31;
            }
        }
    },
    watch:{
        dateInfo: {
            handler: function(){
                this.id = this.dateInfo.adPlaceId;
                let list = this.dateInfo.adStateList;
                let monthList = [];
                for (let attr in list) {
                    monthList.push(attr);
                }
            },
            deep: true
        }
    },
    data() {
        return  {
            moveOnoff: false,
            id: 0
        }
    },
    mounted() {
        this.id = this.dateInfo.adPlaceId;
    },
    methods: {
        dateMove(event) {
            //选中并移动
            if (this.moveOnoff) {
                this.check(event);
            }
        },
        dateOut(event) {
            // 鼠标移出表格
            let target = event.currentTarget;
            if (target.getAttribute('data-id') == this.id) {
                return false;
            }
            this.moveOnoff = false;


        },
        setMove(event) {
            // 点击开启滑动选中状态 也为单击选中
            this.check(event);
            this.moveOnoff = true;
        },
        resetMove(event) {
            // 鼠标抬起清空操作
            this.moveOnoff = false;
        },
        check(event) {
            // 选中
            let target = event.target.nodeName;
            let targetClass = event.target.className;
            if (target.toUpperCase() === 'A' && targetClass == 'dateA') {
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
        }
    }
}
</script>

<style lang="scss">
.flight {
    .dateTable {
        .dateTd {
            position: relative;
            border: 1px solid #DEE1E5;
            width: 26px;
            height: 26px;

            &.default {
                background: #EDEFF2;
            }

            &.active {
                background: #A8C8EE;
            }

            &.hasSel {
                background: #6A7088;
            }

            .dateA {
                display: block;
                height: 100%;
                width: 100%;
            }

        }
    }
}
</style>
