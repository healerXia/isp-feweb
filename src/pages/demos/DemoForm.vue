<template lang="html">
    <div class="">
        <select id="select2_sample" name="sample" style="width:75%" class="js-example-basic-multiple">
        </select>
        <button type="button" name="button" @click='fn'>获取</button>
        <button type="button" name="button" @click='clear'>清空</button>
    </div>
</template>

<script>
import $ from 'jquery';
import 'select2';
import 'select2/dist/css/select2.css';
import axios from 'axios';
export default {
    mounted() {
        setTimeout(() => {
            var data = //下拉列表中的数据项
            $("#select2_sample").select2({
                allowClear:true,
                placeholder: '请选择',
                data: [
                    {
                        name:"zxy",
                        id: 1,
                        text: 'text'
                    }
                ],
                // ajax: {
                //     transport: function(params, success, failure) {
                //         if (!params.data.term) {
                //             let data = [
                //                 {
                //                     id: 1,
                //                     name: '默认选项',
                //                     text: 'text'
                //                 }
                //             ]
                //             success(data);
                //             return false;
                //         }
                //         axios.get('mock/resource',{
                //             name: '',
                //             modelId: 0
                //         }).then((res)=> {
                //             console.log(1);
                //             success();
                //         }).catch((err) => {
                //             failure();
                //         })
                //
                //
                //     },
                //     processResults: function (data, params) {
                //       // parse the results into the format expected by Select2
                //       // since we are using custom formatting functions we do not need to
                //       // alter the remote JSON data, except to indicate that infinite
                //       // scrolling can be used
                //       return {
                //           results: data
                //       };
                //     },
                // },
                escapeMarkup: function (markup) { return markup; },
                //minimumInputLength: 1,
                // templateSelection(repo) {
                //     if (repo.loading){
                //
                //     }
                //     var markup = "<span>"+repo.name+"</span>";
                //     return markup;
                // },
                templateResult(repo) {
                    if (repo.loading) {
                        // $("#select2_sample").select2({
                        //     data: [{id:0, text:'text',name: '无结果'}]
                        // })
                    };
                    var markup = "<span>"+repo.name+"</span>";
                    return markup;
                }
            });
        })
    },
    methods: {
        fn() {
            console.log($("#select2_sample").select2("data"));
        },
        clear() {
            console.log('清空');
            $("#select2_sample").val(null).trigger("change");
        }
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
