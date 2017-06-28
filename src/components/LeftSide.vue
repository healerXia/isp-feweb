<template lang="html">
    <Menu active-name="2-1" theme="dark" width="auto" :open-names="['2']">
        <div class="layout-logo-left"></div>
        <Submenu name="1">
            <template slot="title">
                <Icon type="ios-navigate"></Icon>
                首页
            </template>
        </Submenu>
        <Submenu name="2">
            <template slot="title">
                <Icon type="ios-navigate"></Icon>
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
                <Icon type="ios-keypad"></Icon>
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
                <Icon type="ios-keypad"></Icon>
                客户
            </template>
            <Menu-item name="4-1">
                <router-link class="white"
                :to="{path:'orderList'}">
                     客户管理             
                </router-link>
            </Menu-item>
            <Menu-item name="4-2">
                <router-link class="white"
                :to="{path:'orderList'}">
                     客户管理             
                </router-link>
            </Menu-item>
            <Menu-item name="4-3">
                <router-link class="white"
                :to="{path:'orderList'}">
                     代理商管理             
                </router-link>
            </Menu-item>
            <Menu-item name="4-4">
                <router-link class="white"
                :to="{path:'orderList'}">
                     联系人管理           
                </router-link>
            </Menu-item>
            <Menu-item name="4-5">
                <router-link class="white"
                :to="{path:'orderList'}">
                     访问记录           
                </router-link>
            </Menu-item>
        </Submenu>
        <Submenu name="5">
            <template slot="title">
                <Icon type="ios-keypad"></Icon>
                合同
            </template>
            <Menu-item name="5-1">
                <router-link class="white"
                :to="{path:'orderList'}">
                    合同管理             
                </router-link>
            </Menu-item>
            <Menu-item name="5-2">
                <router-link class="white"
                :to="{path:'orderList'}">
                     回款管理             
                </router-link>
            </Menu-item>
            <Menu-item name="5-3">
                <router-link class="white"
                :to="{path:'orderList'}">
                     发票管理             
                </router-link>
            </Menu-item>
        </Submenu>
        <Submenu name="6">
            <template slot="title">
                <Icon type="ios-keypad"></Icon>
                审批
            </template>
            <Menu-item name="6-1">
                <router-link class="white"
                :to="{path:'orderList'}">
                    业务审批             
                </router-link>
            </Menu-item>
        </Submenu>
        <Submenu name="7">
            <template slot="title">
                <Icon type="ios-keypad"></Icon>
                报表
            </template>
            <Menu-item name="7-1">
                <router-link class="white"
                :to="{path:'orderList'}">
                    广告售卖          
                </router-link>
            </Menu-item>
            <Menu-item name="7-2">
                <router-link class="white"
                :to="{path:'orderList'}">
                    会员业务    
                </router-link>
            </Menu-item>
            <Menu-item name="7-3">
                <router-link class="white"
                :to="{path:'orderList'}">
                    客户合作         
                </router-link>
            </Menu-item>
            <Menu-item name="7-4">
                <router-link class="white"
                :to="{path:'orderList'}">
                    业绩分析         
                </router-link>
            </Menu-item>
        </Submenu>
        <Submenu name="8">
            <template slot="title">
                <Icon type="ios-keypad"></Icon>
                工作流
            </template>
            <Menu-item name="1-1">
                <router-link class="white"
                :to="{path:'orderList'}">
                    审批链管理       
                </router-link>
            </Menu-item>
            <Menu-item name="8-2">
                <router-link class="white"
                :to="{path:'orderList'}">
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
.white{color: white}
a{width: 100%;height: 100%;display: inline-block;}
.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item{border-left: 5px solid transparent;}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active, .ivu-menu-dark.ivu-menu-vertical .ivu-menu-submenu .ivu-menu-item-active:hover{background:transparent !important;}

.ivu-menu-dark.ivu-menu-vertical .ivu-menu-opened .ivu-menu-submenu-title{border-left: 5px solid #3D70FB !important}
.ivu-menu-dark.ivu-menu-vertical .ivu-menu-item-active .ivu-menu-submenu-title{border-left: 5px solid #3D70FB!important}
</style>
