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
</style>
