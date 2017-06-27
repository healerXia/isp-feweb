<template lang="html">
    <div class="order-info-step">
        <p class="step-title">订单信息</p>
        <div class="unit">
            <div class="fl step-icon step1-active"></div>
            <span class="active">选择资源</span>
        </div>
            <span :class="['blueLine', {'active': status != 1}]"></span>
        <div class="unit">
            <div :class="['fl', 'step-icon', {'step2': status == 1}, {'step2-active': status !=1}]"></div>
            <span :class="{active: status != 1}">选择时间</span>
        </div>
            <span :class="['blueLine', {'active': status == 3}]"></span>
        <div class="unit">
             <div :class="['fl', 'step-icon', {'step3': status != 3}, {'step3-active': status == 3}]"></div>
            <span :class="{'active':status == 3}">生成价格</span>
        </div>
    </div>
</template>

<script>
export default {
    props: ['status']
}
</script>

<style lang="scss" scoped>
.order-info-step{
    width:100%;
    text-align: center;
    overflow: hidden;

    .step-title {
        font-size: 14px;
        color: #333;
        line-height: 28px;
        text-align: left;
        margin-bottom: 26px;
    }

    .unit{
        display: inline-block;
        width: 52px;
        text-align: center;

        .step-icon {
            height: 52px;
            width: 52px;
            border-radius: 50%;

            &.step1-active {
                background: url('../assets/images/chose_source.png');
            }

            &.step2-active {
                background: url('../assets/images/chose_time.png');
            }

            &.step3-active {
                background: url('../assets/images/get_price.png');
            }

            &.step2 {
                background: url('../assets/images/time.png');
            }

            &.step3 {
                background: url('../assets/images/price.png');
            }
        }

        span {
            font-size: 12px;
            color: #ccc;
            width: 100%;
            height: 28px;
            line-height: 28px;
            display: block;

            &.active {
                color: #4373F3;
            }
        }
    }

    .blueLine{
        display: inline-block;
        height: 2px;
        width: 337px;
        border-top: 1px solid #cccccc;
        padding-bottom: 45px;
        margin: 0 8px 0;

        &.active {
            border-top: 1px solid #4373F3;
        }
    }
}
</style>
