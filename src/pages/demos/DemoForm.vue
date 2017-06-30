<template lang="html">
    <select id="select2_sample" name="sample" style="width:75%" ></select>
</template>

<script>
import $ from 'jquery';
import 'select2';
import 'select2/dist/css/select2.css';
import axios from 'axios';
export default {
    mounted() {
        setTimeout(() => {
            var data = [{id: 0, text: 'apple'}, {id: 1, text: 'banana'}, {id: 2, text: 'pear'}];//下拉列表中的数据项

            $("#select2_sample").select2({
                tags: true,
                multiple: true,
                // ajax: {
                //     type    : "get",
                //     url     : "/api/isp-kongming/ad/modelInfo",//请求的API地址
                //     dataType: 'json',//数据类型
                //     params: { // extra parameters that will be passed to ajax
                //         contentType: "application/json; charset=utf-8",
                //     },
                //     data    : function(params){
                //         var query = {
                //             name: params.term, modelId: 0
                //         }
                //         return query
                //     },
                //
                // }
                ajax: {
                    transport: function(params) {
                        console.log(params.data.term,);
                        axios.post('/api/isp-kongming/ad/modelInfo',{
                            name: '',
                            modelId: 0
                        })
                    }
                }
            });//启动select2
        })
    }
}
</script>

<style lang="css">
</style>

























<!-- <template>
    <Row>
        <Col span="12">
            <Date-picker  :editable = 'false' v-model='startTime'  @on-change="chooseStartTime"  type="month" :options="date1" placeholder="选择日期"></Date-picker>
        </Col>
        <Col span="12">
            <Date-picker  :editable = 'false'   @on-change="chooseEndTime"  type="month" :options="date2" placeholder="选择日期"></Date-picker>
        </Col>

    </Row>
</template>
<script>
    export default {
        data() {
            return  {
                startTime: '',
                endTime: '',
                date1: {
                    disabledDate: this.disStart
                },
                date2: {
                    disabledDate: this.disEnd
                }
            }
        },
        methods: {
            disStart(date) {
                let year = new Date().getFullYear();
                let month = new Date().getMonth();
                return date && date.valueOf() < new Date(year, month).getTime() || date && date.valueOf() > new Date(year + 1, 11, 30).getTime();
            },
            disEnd(date) {
                if (this.startTime) {
                    let year = this.startTime.split('-')[0];
                    let month = this.startTime.split('-')[1];
                    return date && date.valueOf() < new Date(year, month).getTime() || date && date.valueOf() > new Date(year, 11, 30).getTime();
                }
                else {
                    let year = new Date().getFullYear();
                    let month = new Date().getMonth();
                    return date && date.valueOf() < new Date(year, month).getTime() || date && date.valueOf() > new Date(year + 1, 11, 30).getTime();
                }
            },
            chooseStartTime(date) {
                this.startTime = date;
            },
            chooseEndTime(date) {
                this.endTime = date;
            }

        }
    }
</script> -->
