<template lang="html">
    <Menu active-name="2-1" theme="dark" width="auto" :open-names="['2']">
        <div class="layout-logo-left"></div>
        <Submenu name="1">
            <template slot="title">
                <i class="icon iconfont icon-index"></i>
                首页
            </template>
        </Submenu>
        <Submenu name="2">
            <template slot="title">
                <i class="icon iconfont icon-project"></i>
                项目
            </template>
            <Menu-item name="2-1">
                <router-link class="white"
                :to="{path:'createPro'}">
                     创建项目
                </router-link>
            </Menu-item>
            <Menu-item name="2-2">
             <router-link class="white"
                :to="{path:'projectList'}">
                     项目管理
                </router-link>
            </Menu-item>
        </Submenu>
        <Submenu name="3">
            <template slot="title">
                <i class="icon iconfont icon-orders"></i>
                订单
            </template>
            <Menu-item name="3-1">
                <router-link class="white"
                :to="{path:'orderList'}">
                     订单管理
                </router-link>
            </Menu-item>
        </Submenu>
        <Submenu name="4">
            <template slot="title">
                <i class="icon iconfont icon-customer"></i>
                客户
            </template>
            <Menu-item name="4-1">
                <router-link class="white"
                :to="{path:'wait'}">
                     客户管理
                </router-link>
            </Menu-item>
            <Menu-item name="4-2">
                <router-link class="white"
                :to="{path:'wait'}">
                     客户管理
                </router-link>
            </Menu-item>
            <Menu-item name="4-3">
                <router-link class="white"
                :to="{path:'wait'}">
                     代理商管理
                </router-link>
            </Menu-item>
            <Menu-item name="4-4">
                <router-link class="white"
                :to="{path:'wait'}">
                     联系人管理
                </router-link>
            </Menu-item>
            <Menu-item name="4-5">
                <router-link class="white"
                :to="{path:'wait'}">
                     访问记录
                </router-link>
            </Menu-item>
        </Submenu>
        <Submenu name="5">
            <template slot="title">
                <i class="icon iconfont icon-contract"></i>
                合同
            </template>
            <Menu-item name="5-1">
                <router-link class="white"
                :to="{path:'wait'}">
                    合同管理
                </router-link>
            </Menu-item>
            <Menu-item name="5-2">
                <router-link class="white"
                :to="{path:'wait'}">
                     回款管理
                </router-link>
            </Menu-item>
            <Menu-item name="5-3">
                <router-link class="white"
                :to="{path:'wait'}">
                     发票管理
                </router-link>
            </Menu-item>
        </Submenu>
        <Submenu name="6">
            <template slot="title">
                <i class="icon iconfont icon-approval"></i>
                审批
            </template>
            <Menu-item name="6-1">
                <router-link class="white"
                :to="{path:'wait'}">
                    业务审批
                </router-link>
            </Menu-item>
        </Submenu>
        <Submenu name="7">
            <template slot="title">
                <i class="icon iconfont icon-reportForm"></i>
                报表
            </template>
            <Menu-item name="7-1">
                <router-link class="white"
                :to="{path:'wait'}">
                    广告售卖
                </router-link>
            </Menu-item>
            <Menu-item name="7-2">
                <router-link class="white"
                :to="{path:'wait'}">
                    会员业务
                </router-link>
            </Menu-item>
            <Menu-item name="7-3">
                <router-link class="white"
                :to="{path:'wait'}">
                    客户合作
                </router-link>
            </Menu-item>
            <Menu-item name="7-4">
                <router-link class="white"
                :to="{path:'wait'}">
                    业绩分析
                </router-link>
            </Menu-item>
        </Submenu>
        <Submenu name="8">
            <template slot="title">
                <i class="icon iconfont icon-workflow"></i>
                工作流
            </template>
            <Menu-item name="1-1">
                <router-link class="white"
                :to="{path:'wait'}">
                    审批链管理
                </router-link>
            </Menu-item>
            <Menu-item name="8-2">
                <router-link class="white"
                :to="{path:'wait'}">
                    审批链替换
                </router-link>
            </Menu-item>
        </Submenu>
        <Submenu name="9">
            <template slot="title">
                <Icon type="ios-keypad"></Icon>
                运营管理
            </template>
        </Submenu>
    </Menu>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
 .white {
     color: white;
 }

.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item {
    padding-left: 0;
}

 .ivu-menu-item {
     height: 48px;
     padding: 0;
 }

 a {
     display: block;
     width: 100%;
     height: 100%;
     padding-left: 43px;
     line-height: 48px;
 }
.white{color: white}

.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item{border-left: 5px solid transparent;}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover{background:#1C1F27;}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active{background :#1C1F27 !important;}

</style>
