<template lang="html">
    <div class="demo">
        <Row type="flex">
            <Col span="21">
               
            </Col>
            <Col span='18'>
                <router-view></router-view>
            </Col>
        </Row>
    </div>
</template>
<script>

      export default {
       
    }

</script>
<style lang="scss">
 .inputNum{
        $height: 60px;
        width: 100%;
        height: $height;
        line-height:$height ;
        .name{
            font-size: 12px;
            float: left;
            width: 80px;
            text-align: right;
            display: inline-block;
            height: $height;
            line-height:$height;
            padding-right: 12px
        }
        .inputForm{
            width: 410px;
            height: $height;
            line-height: $height;
            float: left;
            display: inline-block;
            input{
                height: 32px
            }
        }
        .errorTip{
            float: left;
            margin-left: 10px;
            text-align: right;
            display: inline-block;
            height: $height;
            line-height:$height;
            color: red;
            font-size: 12px
        }
        .errorBorder>input{
            border: 1px solid #f30;
        }
        .shadow>input{
            outline: 0;
            box-shadow: 0 0 0 2px rgba(255,51,0,.2) !important;
        }
    }
</style>
