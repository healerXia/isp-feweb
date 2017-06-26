<!-- 项目预算的组件-->
<template lang="html">
    <div class="inputNumZ" v-on:getnum="getnum">
        <span class="name"><span class="red" v-show="mes.need">*</span>{{mes.name}}:</span>
        <div class="inputForm" v-bind:class="{ errorBorder: mes.noCon,shadow:mes.errorShadow}">
            <input  ref="input" name="nums" :placeholder="mes.ph"  class="ivu-input"  type="text"
            v-bind:value="value"
            v-on:keydown="down($event)"
            v-on:keyup="up($event)"
            v-on:blur="blur"
            v-on:focus="focus"
            v-on:input="updateValue($event.target.value)"
            />
        </div>
        <span class="units" v-show="mes.showUnit" >元</span>
        <span class="errorTip" v-show="mes.errorShow">请填写{{mes.name}}</span>
    </div>
</template>
<script>
    export default {
        props: {
            value: {
                type: Number,
                default: 0
            },
            mes:{
                need:false,
                name:"",
                ph:"",
                showUnit:false,
                errorShow:false,
                errorShadow:false, 
                noCon:false, 
            }
        },
        data(){
            return {
                lastnum:"",
                                            
            }
        },
        methods: {
            down(e){
                this.lastnum=e.target.value
            },
            up(e){
                if(e.target.value.length>9){
                    this.$refs.input.value=""
                    this.$refs.input.value=this.lastnum.replace(/\D/g,"").substring(0,9)
                }else if(e.target.value.match(/\D/)){
                    this.$refs.input.value=this.lastnum.replace(/\D/g,"")
                }
            },
            blur(){ //失去焦点
                if(this.mes.need){
                    this.mes.errorShadow=false
                    if(this.$refs.input.value==""){
                        this.mes.errorShow=true
                        this.mes.noCon=true
                        return
                    }else{
                        this.mes.errorShow=false
                        this.mes.noCon=false
                    }
                }
                if(this.$refs.input.value==""){
                  this.$refs.input.value=""
                }else if(this.$refs.input.value.match(/^0/)){
                  this.$refs.input.value=this.$refs.input.value.replace(/^0{1,}/g,"");
                }else{
                    this.$refs.input.value=((this.$refs.input.value-0)+"").replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,')
                }

            },
            focus(){ //获取焦点
                if(this.mes.need){
                    if(this.$refs.input.value==""){
                        if(this.mes.noCon==true){
                            this.mes.errorShadow=true
                        }
                    }else{
                        this.mes.noCon=false
                        this.mes.errorShadow=false
                    }
                }
                this.$refs.input.value=(this.$refs.input.value+"").replace(/\D/g,"")

            },
            updateValue: function (value) {
                this.$refs.input.value=value.replace(/\D/g,"")
                if(this.$refs.input.value.length>9){
                    this.$refs.input.value=this.$refs.input.value.replace(/\D/g,"").substring(0,9)
                }
                this.$emit('input', this.$refs.input.value)
            }
        }
    }
</script>
<style lang="scss">
 .inputNumZ{
        $height: 38px;
        width: 100%;
        height: $height;
        line-height:$height ;
        margin-bottom: 24px;
        .red{
            margin-right: 4px;
            line-height: 1;
            font-family: SimSun;
            font-size: 12px;
            color: #f30;
        }
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

            height: $height;
            line-height: $height;
            float: left;
            display: inline-block;
            input{
                width: 398px;
                float: left;
                height: 38px
            }

        }
        .units{
            float: left;
            margin-left: 5px;
            font-size: 12px
        }
        .errorTip{
            float: left;
            margin-left: 5px;
            text-align: right;
            display: inline-block;
            height: $height;
            line-height:$height;
            color: #EF6464;
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
