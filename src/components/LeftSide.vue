<template lang="html">
    <Menu active-name="2-1" :open-names="['2']"  theme="dark" width="auto"  class="iconChange">
        <div class="layout-logo-left"></div>
        <Submenu v-for='(i, index) in menu' :key='index' :name="i.index">
            <template slot="title">
                <i :class="['icon', 'iconfont', i.icon]"></i>
                 {{i.name}}
                 <span v-if='i.subNav'>
                     <i class="icon iconfont icon-navi-down"></i>
                     <i class="icon iconfont icon-navi-up"></i>
                 </span>
            </template>
            <Menu-item v-if='i.subNav' v-for='(list, index) in i.subNav' :key='index' :name="list.index">
                <router-link class="white" :to="{path: list.path}" @click='jump(i.index, list.index)'>
                    <span class="menuCircle"></span>
<<<<<<< HEAD
                     订单管理
                </router-link>
            </Menu-item>
        </Submenu>
        <Submenu name="4">
            <template slot="title">
                <i class="icon iconfont icon-customer"></i>
                客户
                <i class="icon iconfont icon-navi-down"></i>
                <i class="icon iconfont icon-navi-up"></i>
            </template>
            <Menu-item name="4-1">
                <router-link class="white"
                :to="{path:'createUser'}">
                    <span class="menuCircle"></span>
                     新增客户
                </router-link>
            </Menu-item>
            <Menu-item name="4-2">
                <router-link class="white"
                :to="{path:'wait'}">
                    <span class="menuCircle"></span>
                    客户管理
                </router-link>
            </Menu-item>
            <Menu-item name="4-3">
                <router-link class="white"
                :to="{path:'wait'}">
                    <span class="menuCircle"></span>
                    代理商管理
                </router-link>
            </Menu-item>
            <Menu-item name="4-4">
                <router-link class="white"
                :to="{path:'wait'}">
                    <span class="menuCircle"></span>
                    联系人管理
                </router-link>
            </Menu-item>
            <Menu-item name="4-5">
                <router-link class="white"
                :to="{path:'wait'}">
                    <span class="menuCircle"></span>
                    访问记录
                </router-link>
            </Menu-item>
        </Submenu>
        <Submenu name="5">
            <template slot="title">
                <i class="icon iconfont icon-contract"></i>
                合同
                <i class="icon iconfont icon-navi-down"></i>
                <i class="icon iconfont icon-navi-up"></i>
            </template>
            <Menu-item name="5-1">
                <router-link class="white"
                :to="{path:'wait'}">
                    <span class="menuCircle"></span>
                    合同管理
                </router-link>
            </Menu-item>
            <Menu-item name="5-2">
                <router-link class="white"
                :to="{path:'wait'}">
                    <span class="menuCircle"></span>
                    回款管理
                </router-link>
            </Menu-item>
            <Menu-item name="5-3">
                <router-link class="white"
                :to="{path:'wait'}">
                    <span class="menuCircle"></span>
                    发票管理
                </router-link>
            </Menu-item>
        </Submenu>
        <Submenu name="6">
            <template slot="title">
                <i class="icon iconfont icon-approval"></i>
                审批
                <i class="icon iconfont icon-navi-down"></i>
                <i class="icon iconfont icon-navi-up"></i>
            </template>
            <Menu-item name="6-1">
                <router-link class="white"
                :to="{path:'wait'}">
                    <span class="menuCircle"></span>
                    业务审批
                </router-link>
            </Menu-item>
        </Submenu>
        <Submenu name="7">
            <template slot="title">
                <i class="icon iconfont icon-reportForm"></i>
                报表
                <i class="icon iconfont icon-navi-down"></i>
                <i class="icon iconfont icon-navi-up"></i>
            </template>
            <Menu-item name="7-1">
                <router-link class="white"
                :to="{path:'wait'}">
                    <span class="menuCircle"></span>
                    广告售卖
                </router-link>
            </Menu-item>
            <Menu-item name="7-2">
                <router-link class="white"
                :to="{path:'wait'}">
                    <span class="menuCircle"></span>
                    会员业务
                </router-link>
            </Menu-item>
            <Menu-item name="7-3">
                <router-link class="white"
                :to="{path:'wait'}">
                    <span class="menuCircle"></span>
                    客户合作
                </router-link>
            </Menu-item>
            <Menu-item name="7-4">
                <router-link class="white"
                :to="{path:'wait'}">
                    <span class="menuCircle"></span>
                    业绩分析
                </router-link>
            </Menu-item>
        </Submenu>
        <Submenu name="8">
            <template slot="title">
                <i class="icon iconfont icon-workflow"></i>
                工作流
                <i class="icon iconfont icon-navi-down"></i>
                <i class="icon iconfont icon-navi-up"></i>
            </template>
            <Menu-item name="8-1">
                <router-link class="white"
                :to="{path:'approvalManagement'}">
                    <span class="menuCircle"></span>
                    审批链管理
                </router-link>
            </Menu-item>
            <Menu-item name="8-2">
                <router-link class="white"
                :to="{path:'chainManagement'}">
                    <span class="menuCircle"></span>
                    用户组管理
                </router-link>
            </Menu-item>
            <Menu-item name="8-3">
                <router-link class="white"
                :to="{path:'wait'}">
                    <span class="menuCircle"></span>
                    审批链替换
                </router-link>
            </Menu-item>
        </Submenu>
        <Submenu name="9">
            <template slot="title">
                <Icon type="ios-keypad"></Icon>
                运营管理
                <i class="icon iconfont icon-navi-down"></i>
                <i class="icon iconfont icon-navi-up"></i>
            </template>
            <Menu-item name="9-1">
                <router-link class="white"
                :to="{path:'docManagemengt'}">
                    <span class="menuCircle"></span>
                    单据管理
                </router-link>
            </Menu-item>
            <Menu-item name="9-2">
                <router-link class="white"
                :to="{path:'setUpDepartment'}">
                    <span class="menuCircle"></span>
                    部门管理
                </router-link>
            </Menu-item>
            <Menu-item name="9-3">
             <router-link class="white"
                :to="{path:'projectList'}">
                    <span class="menuCircle"></span>
                     人员管理
=======
                     {{list.name}}
>>>>>>> master
                </router-link>
            </Menu-item>
        </Submenu>
    </Menu>
</template>

<script>
import { menu } from '../config/menu.js';

export default {
    data() {
       return {
           menu: menu,
           activeName: '2-1',
           openName: "['2']"
       }
    },
    methods: {
        jump(n, m) {
            connsole.log(n, m);
        }
    }
}
</script>

<style lang="scss">
.iconChange{
     .white {
         color: white;
     }
    .menuCircle{width: 6px;height: 6px;border-radius: 3px;border: 1px solid white;display: inline-block;
        margin-bottom: 2px;margin:0 6px;}

    .ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item {
        padding-left: 0;
    }

    .ivu-menu-item {
         height: 56px;
         padding: 0;
     }

     a {
         display: block;
         width: 100%;
         height: 100%;
         line-height: 56px;
     }
    .white{color: white}
    .icon-navi-down{float: right;font-size: 30px}
    .icon-navi-up{float: right;font-size: 30px}
    .ivu-icon-ios-arrow-down{display: none}
    :not(.ivu-menu-opened){//下拉箭头渲染
       .icon-navi-down{display: inline-block;}
       .icon-navi-up{display: none}
    }
}
</style>
