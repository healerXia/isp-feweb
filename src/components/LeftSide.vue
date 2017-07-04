<template lang="html">
    <Menu active-name="2-1" theme="dark" width="auto" :open-names="['2']" class="iconChange">
        <div class="layout-logo-left"></div>
        <Submenu name="1">
            <template slot="title">
                <i class="icon iconfont icon-index"></i>
                首页
                <i class="icon iconfont icon-navi-down"></i>
                <i class="icon iconfont icon-navi-up"></i>
            </template>
        </Submenu>
        <Submenu name="2">
            <template slot="title">
                <i class="icon iconfont icon-project"></i>
                项目
                <i class="icon iconfont icon-navi-down"></i>
                <i class="icon iconfont icon-navi-up"></i>
            </template>
            <Menu-item name="2-1">
                <router-link class="white"
                :to="{path:'createPro'}">
                    <span class="menuCircle"></span>
                     创建项目
                </router-link>
            </Menu-item>
            <Menu-item name="2-2">
             <router-link class="white"
                :to="{path:'projectList'}">
                    <span class="menuCircle"></span>
                     项目管理
                </router-link>
            </Menu-item>
        </Submenu>
        <Submenu name="3">
            <template slot="title">
                <i class="icon iconfont icon-orders"></i>
                订单
                <i class="icon iconfont icon-navi-down"></i>
                <i class="icon iconfont icon-navi-up"></i>
            </template>
            <Menu-item name="3-1">
                <router-link class="white"
                :to="{path:'orderList'}">
                    <span class="menuCircle"></span>
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
                :to="{path:'wait'}">
                    <span class="menuCircle"></span>
                     客户管理
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
            <Menu-item name="1-1">
                <router-link class="white"
                :to="{path:'wait'}">
                    <span class="menuCircle"></span>
                    审批链管理
                </router-link>
            </Menu-item>
            <Menu-item name="8-2">
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
        </Submenu>
    </Menu>
</template>

<script>
export default {
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
