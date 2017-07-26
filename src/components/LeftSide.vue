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
                     {{list.name}}
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