<style lang="scss" scoped>
@import '../../assets/css/pageCss/resource.scss';
</style>

<template lang="html">
    <div class="resource">
        <!-- 项目信息 -->
        <ProjectInfo :proMess="proMess" :edit="false"></ProjectInfo>
        <!-- 项目信息 -->

        <!-- 订单信息 -->
        <div class="resource-box">
            <!-- 进度组件 -->
            <ProjectStep :status = '1' class="MT20"></ProjectStep>
            <!-- 进度组件 -->

            <!-- 查询条件 -->
            <div class="query-ad">
                <p class='query-ad-title'>查询广告位</p>
                <Form ref="formValidate" :model="searchInfo" :rules="ruleValidate" :label-width="90">
                <Form-item label="选择日期：">
                    <Row>
                        <Col span="5">
                            <Form-item prop="beginTime">
                                <Date-picker  :editable = 'false' :value="this.searchInfo.beginTime"  @on-change="chooseStartTime"  type="month" :options="date" placeholder="选择日期"></Date-picker>
                            </Form-item>
                        </Col>
                        <Col span="1" style="text-align: center">-</Col>
                        <Col span="5">
                            <Form-item prop="endTime">
                                <Date-picker   :editable = 'false' :value="this.searchInfo.endTime"  @on-change="chooseEndTime"   type="month" :options="date" placeholder="选择日期"></Date-picker>
                            </Form-item>
                        </Col>
                    </Row>
                </Form-item>

                <Form-item  label="媒体名称：">
                    <a class='labelList mediaName' @click='chooseMedia(i.mediaName, i.mediaId, index)'  v-for='(i, index) in mediaNameList' href="javascript:;">{{i.mediaName}}</a>
                </Form-item>

                <Form-item  label="页面类型：">
                    <a class='labelList pageType' @click='choosePage(i.tagName, i.tagId, index)' v-for='(i, index) in pageTypeList' href="javascript:;">{{i.tagName}}</a>
                </Form-item>

                <Row>
                    <Col span="12" style="padding-right:10px">
                        <Form-item label="页面名称：" prop='pageName'>
                            <Select
                                class="searchInput"
                                v-model="searchInfo.pageName"
                                filterable
                                remote
                                :clearable="true"
                                :label-in-value="true"
                                :remote-method="remoteMethod1"
                                :loading="loading1"
                                @on-change='selectPageName'>
                                <Option v-for="option in searchList.pageNameList" :value="option.channelId" :key="new Date()">{{option.channelName}}</Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col span="12">
                        <Form-item label="广告类型：" prop='Type'>
                            <Select
                                class="searchInput"
                                v-model="Type"
                                multiple
                                filterable
                                remote
                                :remote-method="remoteMethod2"
                                :loading="loading1"
                                @on-change='checkType'>
                                <Option v-for="option in searchList.typeList" :value="option.typeId" :key="new Date()">{{option.typeName}}</Option>
                            </Select>
                        </Form-item>
                    </Col>
                </Row>
                 <Row>
                    <Col v-if='searchInfoTxt[0]' span="12" style="padding-right:10px">
                        <Form-item label="投放车型：" class='resetSearchInfo' prop='serialId'>
                            <Select
                                class="searchInput"
                                v-model="serialId"
                                filterable
                                remote
                                multiple
                                :remote-method="remoteMethod3"
                                :loading="loading1"
                                @on-change='checkCar'>
                                <Option v-for="option in searchList.modelList" :value="option.Name" :key="new Date()">{{option.Name}}</Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col v-if='searchInfoTxt[1]' span="12" style="padding-right:10px">
                        <Form-item label="投放地区：" class='resetSearchInfo' prop='cityId'>
                            <Select
                                class="searchInput"
                                v-model="cityId"
                                filterable
                                remote
                                multiple
                                :remote-method="remoteMethod4"
                                :loading="loading1"
                                @on-change='checkCity'>
                                <Option v-for="option in searchList.areaList" :value="option.Name" :key="new Date()">{{option.Name}}</Option>
                            </Select>
                        </Form-item>
                    </Col>
                    <Col v-if='searchInfoTxt[2]' span="12" style="padding-right:10px">
                        <Form-item label="投放品牌：" class='resetSearchInfo' prop='brandId'>
                            <Select
                                class="searchInput"
                                v-model="brandId"
                                filterable
                                remote
                                multiple
                                :remote-method="remoteMethod5"
                                :loading="loading1"
                                @on-change='checkBrand'>
                                <Option v-for="option in searchList.brandList" :value="option.Name" :key="new Date()">{{option.Name}}</Option>
                            </Select>
                        </Form-item>
                    </Col>
                </Row>
                    <Form-item>
                        <Button class='searchBtn' type="primary"  @click="search('formValidate')">查询</Button>
                    </Form-item>
                 </Form>
            </div>
            <!-- 查询条件结束 -->

            <!-- 查询结果 -->
            <div class="result clear" v-if ='paging.totalCounts'>
                <!-- v-if ='paging.totalCounts' -->
                <!-- 查询结果头信息 -->
                <div class="title clear">
                    <div class="title-l fl">
                        <span>查询结果</span>
                        <span>（共获得{{paging.totalCounts}}条结果）</span>
                    </div>
                    <!-- <div class="title-r fr">
                        <a href="#">日历视图</a>
                        <a href="#">列表视图</a>
                    </div> -->
                </div>
                <!-- <div class="noResult">
                    <p>查询无结果</p>
                </div> -->
                <!-- 查询结果列表 -->
                <div class="table-list">
                    <div v-if='i.adStateList.length > 0'  v-for = "(i, index) in tableList" class="item">
                        <div class="item-title clear">
                            <div class="fl">
                                 <Checkbox class='fl' v-model='checkBoxStatus[index]' @on-change='splitTable(i, index)' style="font-size:14px; margin-right:10px">
                                     <span class="ad-name">名称:</span>
                                 </Checkbox>
                                 <span class='ad-listName fl'>{{adNames}}/{{i.name}}</span>
                                 <a href="javascript:;" @click='viewAd(i.width, i.height, i)'>查看</a>
                            </div>
                            <div class="fr">
                                <span>
                                    尺寸：{{adType[i.adType]}}：{{i.width}}*{{i.height}}px
                                    ≤100k</span>
                            </div>
                        </div>

                        <table  border="1" cellspacing="1" cellpadding="0" class="dateTable">
                            <tr class="table-title">
                                <td>日期</td>
                                <td>刊例价(元/天)</td>
                                <!-- <td class='allMoth'>全月</td> -->
                                <td v-for='i in 31' class='dateTd'>{{i}}</td>
                            </tr>
                            <tr v-for='k in i.adStateList' :info='i' :time = 'k.time' :timeData = 'k.state.split(",")' is='DailogRow'>
                                <td>{{k.time}}</td>
                                <td>{{k.kprice}}</td>
                            </tr>
                        </table>
                    </div>
                </div>
                <Page v-if ='paging.totalCounts' class='fl' :total="paging.totalCounts" size="small" @on-change = 'changePageIndex' @on-page-size-change='changePageSize' show-elevator show-sizer></Page>
            </div>

            <!-- 已选广告位 -->
            <div class="result bottom" v-if = 'monthList.length != 0'>
                <div class="title">
                    <div class="title-l">
                        <span>已选广告位</span>
                        <span>（共获得{{checkBoxList.length}}条结果）</span>
                    </div>
                </div>

                <div class="table-list">
                    <div  class="item">
                        <table border="1" cellspacing="0" class="dateTable hasCheck">
                            <tr>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td colspan="31">
                                    <a :class='["monthBtn", {active: index == monthIndex}]' @click='checkMonth(index)'  v-for='(i, index) in monthList' href="javascript:;">{{i.split('-')[1]}}月</a>
                                </td>
                            </tr>
                            <tr class="table-title">
                                <td></td>
                                <td>广告位名称</td>
                                <td>刊例价</td>
                                <td v-for='i in 31' class='hasCheckTd'>{{i}}</td>
                            </tr>
                            <tr  v-for='(i, index) in showSelect' is='DailogRow' >
                                <td>
                                    <a @click='delAd(i)' href="javascript:;">
                                        <Icon class='delIco' type="ios-close-outline"></Icon>
                                    </a>
                                </td>
                                <td class='ad-lis'>
                                    <span class="">{{adNames}}/{{i.name}}</span>
                                </td>
                                <!-- 当前月份 -->
                                <td>{{i.kprice}}元/天</td>
                                <td v-for='list in i.adStateList'
                                    :class='["hasCheckTd" ,{"default": list == 3}, {"hasSel": list == "2"}]'>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>

                <Button class='jump' type="primary" @click="selectTime">选择时间</Button>
            </div>
        </div>
    </div>
</template>

<script>
import qs from 'qs';
import {urlList} from './config';
// 组件
import ProjectInfo from 'component/ProjectInfo';
import ProjectStep from 'component/ProjectStep';
import DailogRow from 'component/DailogRow';
export default {
    components: {
        ProjectInfo,
        ProjectStep,
        DailogRow
    },
    data() {
        return {
            // 搜索条件初始化数据集合
            searchList: {
                // 页面名称集合
                pageNameList: [],
                // 车型集合
                modelList:[],
                // 地区集合
                areaList: [],
                // 品牌集合
                brandList: [],
                // 广告类型集合
                typeList: []
            },
            adType: ['图片', '文章', 'flash', '视频', '图片\flash', '图文', '组图', '大图'],
            searchData: {
                // 页面名称
                pageName: '',
                // 页面名称集合
                pageNameList: [],
                // 车型集合
                modelList:[],
                // 地区集合
                areaList: [],
                // 品牌集合
                brandList: [],
                // 广告类型集合
                typeList: [],
                // 初始化地区id 1 城市 2省份
            },
            mediaNameStatus: [],
            // 已选择月份集合
            monthList: [],
            // 广告位名称
            adName: '',
            //搜索条件文字集合
            searchInfoTxt: [true, true, false],
            // 项目基本信息
            proMess: {},
            date: {
                disabledDate (date) {
                    let year = new Date().getFullYear();
                    let month = new Date().getMonth();
                    return date && date.valueOf() < new Date(year, month).getTime() || date && date.valueOf() > new Date(year,11,30).getTime();
                }
            },
            ruleValidate: {
                    serialId: [
                        { required: true, type: 'string', message: '请选投放车型', trigger: 'change' }
                    ],
                    Type: [
                        { required: true, type: 'string', message: '请选择广告类型', trigger: 'change' }
                    ],
                    beginTime: [
                        { required: true, type: 'string', message: '请选择日期', trigger: 'change' }
                    ],
                    endTime: [
                        { required: true, type: 'string', message: '请选择日期', trigger: 'change' }
                    ],
                    pageName: [
                        { required: true, type: 'number', message: '请选择页面名称', trigger: 'change' }
                    ],
                    brandId: [
                        { required: true, type: 'string', message: '请选择投放品牌', trigger: 'change' }
                    ],
                    cityId: [
                        { required: true, type: 'string', message: '请选择投放地区', trigger: 'change' }
                    ]
                },
            action: 2,
            // 查询开关
            searchOnoff: false,
            options1: [],
            model11: '',
            loading1: false,
            cityId: [],
            brandId: [],
            serialId: [],
            Type: [],
            pageName: [],
            searchInfo:{
                // 开始时间
                beginTime: '',
                // 结束时间
                endTime: '',
                // 页面类型
                pageType: '公共页',
                // 媒体名称
                mediaName: '易车网',
                // 页面id
                channelId: '',
                // 媒体id
                mediaId: '',
                // 城市id
                cityId: '',
                // 品牌id
                brandId: '',
                pageName: '',
                Type: '',
                // 车型ID
                serialId: '',
                page: '1',
                pageIndex: 1,
                pageSize: 10,
                tagId: '',
                mediaId: '',
                labelTypeId:''
            },
            // 媒体名称集合
            mediaNameList: [],
            // 页面类型集合
            pageTypeList: [],
            // 选择按钮id集合
            checkBoxList: [],
            // 选择按钮集合状态集合
            checkBoxStatus: [],
            // 选择功能为数据备份
            paging: {
                // 总页数
                totalPages: 2,
                // 当前页索引
                currentIndex: 0,
                // 总条数
                totalCounts: 0
            },
            // 已选择元数据
            resultList: [],
            tableList: [],
            selectTableData: {},
            // 已选择广告位展示数据当前月的显示隐藏
            showSelect: [],
            // 已选广告位月份按钮索引
            monthIndex: 0,
            // 广告位名称组合
            adNames: '',
            // 选择时间页面日期集合存储
            timePageMonth: []
        }
    },
    mounted() {
        let timeStap = Date.parse(new Date());
        this.$http.get(`/isp-kongming/ad/mediaSelect`).then((res) => {
            if (res.data.errorCode == 0) {
                this.mediaNameList = res.data.result;
                this.searchInfo.mediaId = this.mediaNameList[0].mediaId;
                setTimeout(() => {
                    let list = document.querySelectorAll('.mediaName');
                    list[0].className += ' active';
                })
                this.initPageName();
            }
            else {
                this.$Modal.info({
                    title: '提示',
                    content: res.data.rspMsg.errorMsg
                });
            }
        }).catch((err) => {
            console.log(err);
        })

        this.$http.get(`/isp-kongming/ad/tagItemSelect?${timeStap}`).then((res) => {
            if (res.data.errorCode == 0) {
                this.pageTypeList = res.data.result;
                this.searchInfo.labelTypeId = this.pageTypeList[0].tagId;
                this.initPageName();
                setTimeout(() => {
                    let list = document.querySelectorAll('.pageType');
                    list[0].className += ' active';
                })
            }
            else {
                this.$Modal.info({
                    title: '提示',
                    content: res.data.rspMsg.errorMsg
                });
            }
        }).catch((err) => {
            console.log(err);
        })

        // action 1  进行新增操作
        if (this.$router.currentRoute.query.action) {
            this.action = this.$router.currentRoute.query.action;
            this.searchInfo.beginTime = this.$router.currentRoute.query.time;
            this.searchInfo.endTime = this.$router.currentRoute.query.time;
            this.proMess = JSON.parse(window.localStorage.getItem('proMess'));
        }

        let id = this.$router.currentRoute.query.id;
        if (id) {

            this.$http.get(urlList.getInfo+"?id="+id).then((res) => {
                if (res.data.errorCode == 0) {
                    this.proMess = res.data.result;
                    window.localStorage.setItem('proMess', JSON.stringify(this.proMess));//小阳哥写的
                }
              }).catch((err) => {
            })
        }

        if (window.localStorage.getItem('proMess')) {
            this.proMess = JSON.parse(window.localStorage.getItem('proMess'));
        }

        this.searchInfoTxt = [false, false, false];
    },
    methods: {
        // 格式化数据
        initResult(data) {
            let adStateList = [];
            let arr = [];
            let monthList = [];
            let adList = data.adStateList;
            if (adList.length > 0) {
                for (let i = 0; i < adList.length; i++) {
                    let obj = adList[i];
                    for (let attr in obj) {
                       monthList.push(attr);
                       let ad = obj[attr];
                       let monthData = {};
                       let dayStates = [];
                       let skuIdList = [];
                       let total = 0;
                       monthData.time = attr;
                       monthData.dayStatus = obj[attr];
                       //ad.sort(this.compare('day'));
                       // 按照日期
                       for (let j = 0; j < ad.length; j++) {
                        //    dayStates.push(ad[j].skuStatus);
                           dayStates[ad[j].day - 1] = ad[j].skuStatus;
                           skuIdList[ad[j].day -1 ] = ad[j].skuId;
                           total += ad[j].skuPrice;
                       }

                       for (let k = 0; k < 31; k++ ) {
                           if (dayStates[k] == 'SKU_STATUS_LOCKED' || dayStates[k] == 'SKU_STATUS_SALED' || dayStates[k] == 'SKU_STATUS_RUNNING') {
                               dayStates[k] = '2'
                           }
                           if (dayStates[k] == 'SKU_STATUS_NONE' || dayStates[k] =='SKU_STATUS_DELETE' || dayStates[k] == 'SKU_STATUS_IDLE') {
                               dayStates[k]  = '1';
                           }
                           if (!dayStates[k]) {
                               dayStates[k]  = '3';
                           }
                       }

                       monthData.kprice = (total/30).toFixed(2);
                       monthData.state = dayStates.join(',');
                       monthData.skuIdList = skuIdList;
                       arr.push(monthData);
                    }
                }
                // 存储日期
                monthList.sort();
                for (let i = 0; i < monthList.length; i++) {
                    for (let j = 0; j < arr.length; j++) {
                        if (arr[j].time == monthList[i]) {
                            adStateList.push(arr[j]);
                        }
                    }
                }
            }
            else {
                // for (let i = 0; i < 31; i++) {
                //     adStateList
                // }
            }
            return adStateList;
        },
        initSearch() {
            // 页面名称
            this.initPageName();
        },
        // 换页
        changePageIndex(n) {
            this.searchInfo.pageIndex = n;
            this.render();
        },
        changePageSize(n) {
            this.searchInfo.pageSize = n;
            this.render();
        },
        // 选择页面名称
        selectPageName(obj) {
            this.searchData.pageName = obj.label;
            this.resetSearchInfo();
            this.initAdType();
        },
        initSelect() {
            let data = [];
            let adPlaceId = 0;
            let currentId = -1;
            for (let i = 0; i< this.tableList.length;i++) {
                this.$set(this.checkBoxStatus, i, false);
            }

            for (let i = 0; i< this.tableList.length; i++) {
                currentId = this.tableList[i].adPlaceId;

                if (this.checkBoxList.indexOf(currentId) > -1) {
                    this.$set(this.checkBoxStatus, i, true);
                }
            }
        },
        initPageName() {
            // 初始化页面名称
            let postData = this.searchInfo;
            this.searchInfo.pageName = '';
            if (postData.labelTypeId && postData.mediaId) {
                this.$http.post('/isp-kongming/ad/channelSelect', {
                    // 媒体名称id
                    mediaId: postData.mediaId,
                    // 页面类型
                    tagId: postData.labelTypeId,
                    name: ''
                }).then((res) => {
                    if (res.data.errorCode == 0) {
                        this.searchData.pageNameList = Object.assign([], res.data.result);
                        this.searchList.pageNameList = Object.assign([], res.data.result).slice(0, 10);
                    }
                    else {
                        this.$Modal.info({
                            title: '提示',
                            content: res.data.rspMsg.errorMsg
                        });
                    }
                }).catch((err) => {
                    console.log(err);
                })
            }
        },
        initAdType() {
            let postData = this.searchInfo;
            this.searchInfo.Type = '';
            // 初始化广告类型
            this.$http.post(`/isp-kongming/ad/placeTypeSelect`, {
                // 广告类型
                channelId: this.searchInfo.pageName,
                mediaId: this.searchInfo.mediaId,
                name: '',
            }).then((res) => {
                if (res.data.errorCode == 0) {
                    this.searchData.typeList = Object.assign([], res.data.result);
                    this.searchList.typeList = Object.assign([], res.data.result).slice(0, 20);;
                }
                else {
                    this.$Modal.info({
                        title: '提示',
                        content: res.data.rspMsg.errorMsg
                    });
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        initModels() {
            this.searchInfo.serialId = '';
            // 初始化车型
            this.$http.post('/isp-kongming/ad/modelInfo', {
                modelId: 0,
                name: ''
            }).then((res) => {
                if (res.data.errorCode == 0) {
                  this.searchData.modelList = Object.assign([], res.data.result);
                  this.searchList.modelList = Object.assign([], res.data.result).slice(0, 10);
                }
                else {
                    this.$Modal.info({
                        title: '提示',
                        content: res.data.rspMsg.errorMsg
                    });
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        initArea(id) {
            // 初始化地区
            this.searchInfo.cityId = '';
            this.$http.post('/isp-kongming/ad/areaInfo',{
                cityId: id,
                name: ''
            }).then((res) => {
                if (res.data.errorCode == 0) {
                    this.searchData.areaList = Object.assign([], res.data.result);
                    this.searchList.areaList = Object.assign([], res.data.result).slice(0, 10);
                }
                else {
                    this.$Modal.info({
                        title: '提示',
                        content: res.data.rspMsg.errorMsg
                    });
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        initBrand() {
            // 初始化品牌
            this.searchInfo.brandId = '';
            this.$http.post('/isp-kongming/ad/brandInfo', {
                brandId: -1,
                name: ''
            }).then((res) => {
                if (res.data.errorCode == 0) {
                    this.searchData.brandList = Object.assign([], res.data.result);
                    this.searchList.brandList = Object.assign([], res.data.result).slice(0, 10);
                }
                else {
                    this.$Modal.info({
                        title: '提示',
                        content: res.data.rspMsg.errorMsg
                    });
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        render() {
            // /api/isp-kongming/ad
            this.searchInfo.Type = this.Type.join(',');
            this.searchInfo.serialId = this.serialId.join(',');
            this.searchInfo.cityId = this.cityId.join(',');
            this.searchInfo.brandId = this.brandId.join(',');

            // /isp-kongming/ad/select
            this.$http.post('/isp-kongming/ad/select',{
                // 开始时间
                beginTime: `${this.searchInfo.beginTime}-01`,
                // 结束时间
                endTime: `${this.searchInfo.endTime}-31`,
                pageIndex: this.searchInfo.pageIndex,
                pageSize: this.searchInfo.pageSize,
                // 媒体名称id
                mediaId: this.searchInfo.mediaId,
                // 页面名称
                channelId: this.searchInfo.pageName,
                // 页面类型
                adAdTagId:  this.searchInfo.labelTypeId,
                // 广告类型
                placeTypeList: this.searchInfo.Type,
                // 投放车型
                modelIdList: this.searchInfo.serialId,
                // // 投放地区
                cityIdList: this.searchInfo.cityId,
                // // 投放品牌
                brandIdList: this.searchInfo.brandId

            }).then((res) => {
                if (res.data.errorCode == 0) {
                    // this.tableList = Object.assign([], res.data.result);
                    // this.paging.count = this.tableList.length;
                    let datas = Object.assign([], res.data.result);
                    for (let i = 0; i < datas.length; i++) {
                         datas[i].adStateList = this.initResult(datas[i]);
                    }
                    this.tableList = Object.assign([], datas);
                    for (let i = 0; i< this.tableList.length;i++) {
                        this.$set(this.checkBoxStatus, i, false);
                    }

                    if (datas[0].totalCounts > 0) {
                        this.paging.totalCounts = datas[0].totalCounts;
                    }
                    // action 1  进行新增操作
                    if (this.$router.currentRoute.query.action) {
                        //this.selectTableData = JSON.parse(window.localStorage.getItem('timePageList'));
                        //this.monthList = JSON.parse(window.localStorage.getItem('monthList'));
                        this.timePageMonth = JSON.parse(window.localStorage.getItem('monthList'));
                        this.action = this.$router.currentRoute.query.action;
                        this.searchInfo.beginTime = this.$router.currentRoute.query.time;
                        this.searchInfo.endTime = this.$router.currentRoute.query.time;
                        //this.checkBoxList = JSON.parse(window.localStorage.getItem('checkBoxList'));
                        //let time = this.monthList[0];
                        // if (this.selectTableData[time]) {
                        //     this.showSelect = this.selectTableData[time];
                        // }
                        // console.log(this.checkBoxList);
                        // this.initSelect();
                    }
                    if (this.Type.length > 0) {
                        this.searchInfo.Type = this.Type.join(',');
                    }


                    this.adNames = `${this.searchInfo.mediaName}/${this.searchData.pageName}`;

                    for (let i = 0; i < datas.length; i++) {
                        if (this.checkBoxList.indexOf(datas[i].adPlaceId) > -1) {
                            this.$set(this.checkBoxStatus, i, true);
                        }
                    }
                    this.redrawed();
                }
                else {
                    this.$Modal.info({
                        title: '提示',
                        content: res.data.rspMsg.errorMsg
                    });
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        remoteMethod1 (query, id) {
            if (query == '') {
                this.loading1 = true;
                setTimeout(() => {
                    this.loading1 = false;
                    this.searchList.pageNameList = Object.assign([], this.searchData.pageNameList).slice(0, 10);
                },200)

            } else {
                this.loading1 = true;
                setTimeout(() => {
                    this.$http.post('/isp-kongming/ad/channelSelect', {
                        mediaId: this.searchInfo.mediaId,
                        tagId: this.searchInfo.labelTypeId,
                        name: query
                    }).then((res) => {
                        if (res.data.errorCode == 0) {
                            this.loading1 = false;
                            this.searchList.pageNameList = res.data.result;
                        }
                    }).catch((res) => {
                        this.loading1 = false;
                    })
                }, 200)
            }
        },
        remoteMethod2 (query) {
            if (query == '') {
                this.loading1 = true;
                setTimeout(() => {
                    this.loading1 = false;
                    this.searchList.modelList = Object.assign([], this.searchData.modelList).slice(0, 10);;
                },200)

            } else {
                this.loading1 = true;
                setTimeout(() => {
                    this.searchInfo.Type = '';
                    // 初始化广告类型
                    this.$http.post(`/isp-kongming/ad/placeTypeSelect`, {
                        // 广告类型
                        channelId: this.searchInfo.pageName,
                        mediaId: this.searchInfo.mediaId,
                        name: query,
                    }).then((res) => {
                        this.loading1 = false;
                        if (res.data.errorCode == 0) {
                            this.searchList.typeList = res.data.result.slice(0, 20);
                        }
                        else {
                            this.$Modal.info({
                                title: '提示',
                                content: res.data.rspMsg.errorMsg
                            });
                        }
                    }).catch((err) => {
                        this.loading1 = false;
                        console.log(err);
                    })
                }, 200)
            }
        },
        remoteMethod3 (query) {
            if (query == '') {
                this.loading1 = true;
                setTimeout(() => {
                    this.loading1 = false;
                    this.searchList.modelList = Object.assign([], this.searchData.modelList).slice(0, 10);;
                },200)

            } else {
                this.loading1 = true;
                setTimeout(() => {
                    this.searchInfo.serialId = '';
                    // 初始化车型
                    this.$http.post('/isp-kongming/ad/modelInfo', {
                        modelId: 0,
                        name: query
                    }).then((res) => {
                        this.loading1 = false;
                        if (res.data.errorCode == 0) {
                          this.searchList.modelList = res.data.result;
                        }
                        else {
                            this.$Modal.info({
                                title: '提示',
                                content: res.data.rspMsg.errorMsg
                            });
                        }
                    }).catch((err) => {
                        this.loading1 = false;
                        console.log(err);
                    })
                }, 200)
            }
        },
        remoteMethod4 (query) {
            if (query == '') {
                this.loading1 = true;
                setTimeout(() => {
                    this.loading1 = false;
                    this.searchList.areaList = Object.assign([], this.searchData.areaList).slice(0, 10);
                },200)

            } else {
                this.loading1 = true;
                setTimeout(() => {
                    this.searchInfo.cityId = '';
                    this.$http.post('/isp-kongming/ad/areaInfo',{
                        id: id,
                        name: query
                    }).then((res) => {
                        this.loading1 = false;
                        if (res.data.errorCode == 0) {
                            this.searchList.areaList = res.data.result;
                        }
                        else {
                            this.$Modal.info({
                                title: '提示',
                                content: res.data.rspMsg.errorMsg
                            });
                        }

                    }).catch((err) => {
                        this.loading1 = false;
                        console.log(err);
                    })
                }, 200)
            }
        },
        remoteMethod5 (query) {
            if (query == '') {
                this.loading1 = true;
                setTimeout(() => {
                    this.loading1 = false;
                    this.searchList.brandList = Object.assign([], this.searchData.brandList).slice(0, 10);;
                },200)

            } else {
                this.loading1 = true;

                this.searchInfo.brandId = '';
                this.$http.post('/isp-kongming/ad/brandInfo', {
                    brandId: -1,
                    name: query
                }).then((res) => {
                    this.loading1 = false;
                    if (res.data.errorCode == 0) {
                        this.searchList.brandList = res.data.result;
                    }
                    else {
                        this.$Modal.info({
                            title: '提示',
                            content: res.data.rspMsg.errorMsg
                        });
                    }
                }).catch((err) => {
                    this.loading1 = false;
                    console.log(err);
                })
            }
        },
        chooseMedia(name, id, index) {
            this.searchInfo.mediaName = name;
            this.searchInfo.mediaId = id;
            let list = document.querySelectorAll('.mediaName');
            for (let i = 0; i < list.length; i++) {
                list[i].className = 'labelList mediaName';
            }
            list[index].className += ' active';
            this.initPageName();
            this.resetSearchInfo();
            //this.tableList = [];
        },
        //触发重绘
        redrawed() {
            this.$nextTick(() => {
                let dateTable = document.querySelectorAll('.dateTable');
                for (let i = 0; i < dateTable.length; i++) {
                    dateTable[i].style.visibility = "hidden";
                    setTimeout(() => {
                        dateTable[i].style.visibility = "initial";
                    }, 30)
                }
            })
        },
        choosePage(name, id, index) {
            this.searchInfo.pageType = name;
            this.searchInfo.labelTypeId = id;
            this.searchInfoTxt = [false, false, false];
            let list = document.querySelectorAll('.pageType');
            for (let i = 0; i < list.length; i++) {
                list[i].className = 'labelList pageType';
            }
            list[index].className += '  active';
            this.resetSearchInfo();

            switch(name) {
                case '公共页':
                    this.searchInfoTxt = [false, false, false];
                    break;
                case '品牌页':
                    this.searchInfoTxt = [false, false, true];
                    this.initBrand();
                    break;
                case '车型页':
                    this.searchInfoTxt = [true, false, false];
                    this.initModels();
                    break;
                case '省区页':
                    this.searchInfoTxt = [false, true, false];
                    this.initArea(2);
                    break;
                case '城市车型页':
                    this.searchInfoTxt = [true, true, false];
                    this.initArea(1);
                    this.initModels();
                    break;
                case '省区车型页':
                    this.searchInfoTxt = [true, true, false];
                    this.initArea(2);
                    this.initModels();
                    break;
                case '城市页':
                    this.searchInfoTxt = [false, true, false];
                    this.initArea(1);
                    break;
                case '城市车型':
                    this.searchInfoTxt = [false, true, false];
                    this.initArea(1);
                    this.initModels();
                    break;
                case '论坛资源页':
                    this.searchInfoTxt = [false, false, false];
            }
            this.initPageName();
            this.redrawed();
        },
        search(name) {
            this.$refs[name].validate((valid) => {
                if (valid) {
                    this.render();
                    this.adName = `${this.searchInfo.mediaName}`;
                } else {
                    //this.$Message.error('查询失败!');
                }
            })
        },
        compare(propertyName) {
            return function (object1, object2) {
                var value1 = object1[propertyName];
                var value2 = object2[propertyName];
                if (value1 < value2) {
                    return -1;
                }else if (value1 > value2) {
                    return 1;
                }else {
                    return 0;
                }
            };
        },
        // 新老数据对比
        compared(oldData, newData,time) {
            let adPlaceId = -1;
            let obj = {};

            for (let i = 0; i < newData.length; i++) {
                id = newData[i].adPlaceId;
                var isExit = false;
                for (let k = 0; k < oldData.length; k++) {
                    if (oldData[k].adPlaceId == adPlaceId) {
                        isExit = true;
                        break;
                    }
                }

                if (!isExit) {
                    this.pageList[time].push(newData[i]);
                }
            }
        },
        // 选择广告位
        splitTable(obj, index) {
            // 选择
            let status = false;
            if (this.checkBoxStatus[index]) {
                // 加入id
                if (this.checkBoxList.indexOf(obj.adPlaceId) < 0) {
                    this.checkBoxList.push(obj.adPlaceId);
                }
                // 加入元数据
                if (this.resultList.length == 0) {
                    this.resultList.push(this.tableList[index]);
                }
                else {
                    // 判断是否有重复数据 有则不添加 没有则
                    let datas = Object.assign([], this.resultList);
                    for (let i = 0; i < datas.length; i++) {
                        if (JSON.stringify(obj) == JSON.stringify(datas[i])) {
                            status = true;
                        }
                    }

                    if (!status) {
                        this.resultList.push(this.tableList[index]);
                    }
                    else {
                        return false;
                    }
                }

                // 初始化月份数据
                let adList = [];

                for (let i = 0; i < this.resultList.length; i++) {
                    adList = this.resultList[i].adStateList;

                    for (let j = 0; j < adList.length; j++) {
                        if (this.monthList.indexOf(adList[j].time) < 0) {
                            this.monthList.push(adList[j].time);

                        }
                    }
                }
                this.monthList.sort();

                // 获取当前广告位所有月份数据
                let currentList = obj.adStateList;
                // 整理展示数据格式
                for (let i = 0;i < currentList.length; i++) {

                    let time = currentList[i].time;
                    // 当前日期广告位列表为空
                    if (!this.selectTableData[time]) {
                        this.selectTableData[time] = [];
                        this.selectTableData[time].push({
                            // id
                            "adPlaceId": this.tableList[index].adPlaceId,
                            // 年月 key
                            "yearMonth": time,
                            // 广告位id
                            "adPosId": this.tableList[index].adPlaceId,
                            // 广告位名称
                            "name": this.tableList[index].name,
                            // 刊例价格
                            "price": parseFloat(currentList[i].kprice).toFixed(2),
                            // 用途
                            "useStyle":0,
                            // 刊例价单位
                            "priceUnit": 0,
                            //品牌编号
                            "brandId": 0,
                            // 区域编号
                            "areaId":0,
                            // 城市编号
                            "adCityId": 0,
                            "dataList": [],
                            "kid": this.tableList[index].kid,
                            "cityId": this.tableList[index].cityId,
                            "adType": this.tableList[index].adType,
                            "labelTypeId": this.tableList[index].labelTypeId,
                            "brandId": this.tableList[index].brandId,
                            "modelId": this.tableList[index].modelId,
                            "skuIdList": currentList[i].skuIdList,
                            "channelId":this.tableList[index].channelId,
                            "mediaId": this.tableList[index].mediaId,
                            "height": this.tableList[index].height,
                            "width": this.tableList[index].width,
                            // 日期
                            "adStateList": currentList[i].state.split(','),
                            // "id": obj.id,
                            "channelName": this.tableList[index].channelName,
                            "kprice": parseFloat(currentList[i].kprice).toFixed(2)
                        })
                    }
                    else {
                    // 当前日期广告位列表不为空 判断列表中是否有重复ID广告位
                        let dataStatus = false;
                        for (let i = 0; i < this.selectTableData[time].length; i++) {
                            if (obj.adPlaceId == this.selectTableData[time][i].adPlaceId) {
                                dataStatus = true;
                            }
                        }

                        if (!dataStatus) {
                            this.selectTableData[time].push({
                                // id
                                "adPlaceId": this.tableList[index].adPlaceId,
                                // 年月 key
                                "yearMonth": time,
                                // 广告位id
                                "adPosId": obj.adPlaceId,
                                // 广告位名称
                                "name": this.tableList[index].name,
                                // 刊例价格
                                "price": parseFloat(currentList[i].kprice).toFixed(2),
                                // 用途
                                "useStyle":0,
                                // 刊例价单位
                                "priceUnit": 0,
                                //品牌编号
                                "brandId": 0,
                                // 区域编号
                                "areaId":0,
                                // 城市编号
                                "adCityId": 0,
                                "adCityId": 0,
                                "dataList": [],
                                "kid": this.tableList[index].kid,
                                "cityId": this.tableList[index].cityId,
                                "adType": this.tableList[index].adType,
                                "labelTypeId": this.tableList[index].labelTypeId,
                                "brandId": this.tableList[index].brandId,
                                "modelId": this.tableList[index].modelId,
                                "skuIdList": currentList[i].skuIdList,
                                "channelId":this.tableList[index].channelId,
                                "mediaId": this.tableList[index].mediaId,
                                "height": this.tableList[index].height,
                                "width": this.tableList[index].width,
                                "dataList": [],
                                "skuIdList": currentList[i].skuIdList,
                                // 日期
                                "adStateList": currentList[i].state.split(','),
                                // "id": obj.id,
                                "channelName": this.tableList[index].channelName,
                                "kprice": parseFloat(currentList[i].kprice).toFixed(2)
                            })
                        }
                    }
                }
            }
            // 删除
            else {
                // 删除id
                let idIndex = this.checkBoxList.indexOf(obj.adPlaceId);
                this.checkBoxList.splice(idIndex, 1);
                // 删除元数据
                for (let i = 0; i < this.resultList.length; i++) {
                    if (JSON.stringify(obj) == JSON.stringify(this.resultList[i])) {
                        this.resultList.splice(i ,1);
                    }
                }

                // 将当前删除数据拆分为按月显示
                let delAdList = obj.adStateList;
                let delData = {};

                for (let i = 0; i < delAdList.length; i++ ) {
                    let time = delAdList[i].time;
                    // 提取已选择数据相同月份列表数据
                    let comData = this.selectTableData[time];

                    for (let k = 0; k < comData.length; k++) {
                        if (obj.adPlaceId == comData[k].adPlaceId) {
                            this.selectTableData[time].splice(k ,1);
                        }
                    }
                }

                //重写已选择数据

                let adList = [];
                this.monthList = [];
                for (let i = 0; i < this.resultList.length; i++) {
                    adList = this.resultList[i].adStateList;

                    for (let j = 0; j < adList.length; j++) {
                        if (this.monthList.indexOf(adList[j].time) < 0) {
                            this.monthList.push(adList[j].time);

                        }
                    }
                }
                this.monthList.sort();

                // // 如果月份下数据为空，删除这个月份
                //
                // for (let i = 0; i < this.month)
                // if (this.selectTableData[month[i]].length == 0) {
                //
                //     let monthIndex = this.monthList.indexOf(month[i]);
                //     delete this.selectTableData[month[i]]
                //     this.monthList.splice(monthIndex, 1);
                // }

            }
            let time = this.monthList[0];
            if (this.selectTableData[time]) {
                this.showSelect = this.selectTableData[time];

                for (let i = 0; i < this.showSelect.length; i++) {
                    let stateList = Object.assign([], this.showSelect[i].adStateList);

                    for(let j = 0; j < stateList.length; j++) {
                        if (stateList[j] == 'SKU_STATUS_LOCKED' || stateList[j] == 'SKU_STATUS_SALED' || stateList[j] == 'SKU_STATUS_RUNNING') {
                            this.$set(this.showSelect[i].adStateList, j, "2");
                        }
                        if (stateList[j] == 'SKU_STATUS_NONE' || stateList[j] =='SKU_STATUS_DELETE' || stateList[j] == 'SKU_STATUS_IDLE') {
                            this.$set(this.showSelect[i].adStateList, j, "1");
                        }
                    }
                }
            }
            else {
                this.showSelect = [];
            }
        },
        //切换月份
        checkMonth(index) {
            this.monthIndex = index;
            let time = this.monthList[index];
            this.showSelect = this.selectTableData[time];
        },
        // 删除广告
        delAd(i) {
            // false 已删除
            let adPlaceId = i.adPlaceId;
            let idIndex = this.checkBoxList.indexOf(adPlaceId);
            let time = this.monthList[this.monthIndex];
            this.checkBoxList.splice(idIndex, 1);

            for (let i = 0; i <  this.resultList.length; i++) {
                if (this.resultList[i].adPlaceId == adPlaceId) {
                    let status = false;
                    let adList = this.resultList[i].adStateList;

                    for (let j = 0; j < adList.length; j++) {
                        if(adList[j].time == time) {
                            status = true;
                        }
                    }

                    if (status) {

                        this.resultList.splice(i, 1);
                    }
                }
            }



            for (let j = 0; j < this.tableList.length; j++) {
                if (this.tableList[j].adPlaceId == adPlaceId) {
                    this.$set(this.checkBoxStatus, j, false);
                }
            }

            let data = [];
            let month = Object.assign([], this.monthList);

            for (let i = 0; i < month.length; i ++) {
                data = Object.assign([], this.selectTableData[month[i]]);
                for(let k = 0;k<data.length; k++) {

                    if (data[k].adPlaceId == adPlaceId) {
                        this.$set(data, k, false);
                    }
                }

                this.selectTableData[month[i]] = [];
                for (let j = 0; j < data.length; j++) {
                    if (data[j]) {
                        this.selectTableData[month[i]].push(data[j]);
                    }
                }

                // // 如果月份下数据为空，删除这个月份
                if (this.selectTableData[month[i]].length == 0) {
                    let monthIndex = this.monthList.indexOf(month[i]);
                    delete this.selectTableData[month[i]]
                    this.monthList.splice(monthIndex, 1);
                }
            }


            let times = this.monthList[0];
            if (this.selectTableData[times]) {
                this.showSelect = this.selectTableData[times];
            }
            else {
                this.showSelect = [];
            }

        },
        // 选择时间
       chooseStartTime(date) {
           this.searchInfo.beginTime = date;
           this.resetTime();

           if (this.searchInfo.beginTime && this.searchInfo.endTime) {
            //    this.initSearchInfo();
           }

       },
        // 选择时间
        chooseEndTime(date) {
            this.searchInfo.endTime = date;
            this.resetTime();

            if (this.searchInfo.beginTime && this.searchInfo.endTime) {
                //this.initSearchInfo();
            }

        },
        // 重置时间
        resetTime() {
            let startDate = this.searchInfo.beginTime.split('-')[1];
            let endDate = this.searchInfo.endTime.split('-')[1];
            let lists = document.querySelectorAll('.ivu-input');
            if (parseInt(startDate) > parseInt(endDate)) {
                this.$nextTick(() => {
                    this.searchInfo.endTime = lists[1].value = lists[0].value;
                },200);

                return false;
            }

        },
        // 跳转选择时间页面
        selectTime() {
            // 进行新增操作
            if (this.action == 1) {
                window.localStorage.setItem('insertData', JSON.stringify(this.selectTableData));
            }

            for(let i = 0; i < this.timePageMonth.length; i++) {
                if (this.monthList.indexOf(this.timePageMonth[i]) < 0) {
                    this.monthList.push(this.timePageMonth[i]);
                }
            }

            this.monthList.sort();
            window.localStorage.setItem('monthList', JSON.stringify(this.monthList));
            window.localStorage.setItem('tableData', JSON.stringify(this.selectTableData));
            window.localStorage.setItem('checkBoxList', JSON.stringify(this.checkBoxList));
            window.localStorage.setItem('adName', this.adNames);

            this.$router.push({name:'chooseTime',query: {action: this.action}});
        },
        // 查看广告位
        viewAd(width, height, obj) {
            let size = `${width} * ${height}`;
            this.$router.push('viewAd');
            window.localStorage.setItem('adName', this.adNames);
            window.localStorage.setItem('size', size);
            window.localStorage.setItem('viewAd', JSON.stringify(obj));
        },
        // 选择投放品牌
        checkBrand() {
            this.searchInfo.brandId = this.brandId.join();
        },
        // 选择广告类型
        checkType(name) {
            this.searchInfo.Type = this.Type.join();
        },
        // 请选择投放城市
        checkCity() {
            this.searchInfo.cityId = this.cityId.join();
        },
        //选择投放车型
        checkCar() {
            this.searchInfo.serialId = this.serialId.join();
        },
        // 重置搜索条件 清空车型 地区 品牌
        resetSearchInfo() {

            // 广告类型
            if (this.Type.length > 0) {
                this.Type = [];
                this.searchInfo.typeId = '';
            }
            // 城市
            if (this.cityId.length > 0) {
                this.cityId = [];
                this.searchInfo.cityId = '';
            }

            //  投放品牌
            if (this.brandId.length > 0) {
                this.brandId = [];
                this.searchInfo.brandId = '';
            }

            // 车型
            if (this.serialId.length > 0) {
                this.serialId = [];
                this.searchInfo.modelList = '';
            }


            this.searchList.typeList = [];
            this.searchInfo.serialId = '';


            let n = document.querySelectorAll('.ivu-select-selection');

            for (let i = 0;i<n.length;i++) {
                let child = n[i].children;

                for (let k=0;k< child.length;k++) {
                    if (n[i].querySelectorAll('.ivu-tag').length > 0) {
                        n[i].removeChild(n[i].querySelectorAll('.ivu-tag')[0]);
                    }

                }
            }
        }
    }
}
</script>
