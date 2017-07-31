<template lang="html">
    <Collapse v-model="value1">
           <Panel name="1">
               远程单选搜索（用于编辑可回填）
               <p slot="content">
                   <select id="demoSelect"   name="sample" style="width:400px;height:36px;" class="js-data-example-ajax">
                       <option v-for='i in demo1Data' v-if='demoData.length' :value='i.id'>{{i.text}}</option>
                   </select>
                   <Button type="info" @click='getSingel'>获取选中信息</Button>
                   <Button type="success" @click='edit'>回填</Button>
                   选中信息：{{singleData}}
               </p>
           </Panel>
           <Panel name="2">
               远程多选搜索（可用于回填）
               <p slot="content">
                   <select id="demoSelec2"   name="sample" style="width:400px;height:36px;" class="js-data-example-ajax">
                       <option v-for='i in demo1Data' v-if='demo1Data.length' :value='i.id'>{{i.text}}</option>
                   </select>
                   <Button type="info" @click='getMultiple'>获取选中信息</Button>
                   <Button type="success" @click='eidt1'>回填</Button>
                   选中细信息：{{multipleData}}
               </p>
           </Panel>
           <Panel name="3">
               <p slot="content">乔纳森·伊夫是一位工业设计师，现任Apple公司设计师兼资深副总裁，英国爵士。他曾参与设计了iPod，iMac，iPhone，iPad等众多苹果产品。除了乔布斯，他是对苹果那些著名的产品最有影响力的人。</p>
           </Panel>
       </Collapse>
</template>

<script>
import $ from 'jquery';
import axios from 'axios';
import 'select2';
import 'select2/dist/js/i18n/zh-CN.js';
import 'select2/dist/css/select2.css';
import 'select2-bootstrap-theme/dist/select2-bootstrap.css';

import {initSelect} from './config.js';

export default {
        data () {
            return {
                value1: '1',
                singleData: null,
                multipleData: [],
                demoData: [],
                demo1Data: [],
            }
        },
        mounted() {
            setTimeout(() => {
                initSelect('#demoSelect', 'mock/mediaName', 'GET', '', false, 'mediaId', 'mediaName');
                initSelect('#demoSelec2', 'mock/mediaName', 'GET', '', true, 'mediaId', 'mediaName');


                //手动清空

                // $("#demoSelec2").val("你的placeholder").trigger("change");

                // 可省略获取
                $('#demoSelect').on('change', () => {
                    let data = $('#demoSelect').select2('data')[0];
                    this.singleData = data.id;
                })

                $('#demoSelec2').on('change', () => {
                    let data = $('#demoSelec2').select2('data');
                    this.multipleData = data.map(item => {
                        return {
                            name: item.text,
                            id: item.id
                        }
                    });

                    setTimeout(() => {
                        $("#demoSelec2").select2("open");
                    })
                })
            })
        },
        methods: {
            getSingel() {
                 let data = $('#demoSelect').select2('data')[0];
                 console.log(data);
                 this.singleData = data.id;
            },
            getMultiple() {
                let data = $('#demoSelec2').select2('data');
                this.multipleData = data.map(item => {
                    return {
                        name: item.text,
                        id: item.id
                    }
                })
            },
            edit() {
                this.demoData = [{id: "180", text: '易车网'}, {id: "190", text: '易车网2'}];
                // console.log(1);
                // $(`#demoSelect`).select2({
                //     allowClear: true,
                //     placeholder: "请选择",
                //     theme: "bootstrap",
                //     language: 'zh-CN',
                //     data: [{id: "180", text: '易车网'}, {id: "190", text: '易车网2'}],
                // });
                //
                // setTimeout(() => {
                //     $("#demoSelect").val("190").trigger("change");
                // }, 1000)

            },
            edit1() {

            }

        }
    }
</script>

<style lang="css">
</style>
