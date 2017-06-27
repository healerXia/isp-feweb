<style lang='scss' scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
    }
    .layout-breadcrumb{
        padding: 10px 15px 0;
    }
    .layout-content{
        min-height: 400px;
        /*margin: 15px;*/
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }
    .layout-content-main{
        padding: 10px;
    }
    .layout-copy{
        text-align: center;
        padding: 10px 0 20px;
        color: #9ea7b4;
    }
    .layout-menu-left{
        width: 200px;
        background: #464c5b;
    }
    .layout-header{
        height: 60px;
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
    .layout-logo-left{
        width: 90%;
        height: 30px;
        background: #5b6270;
        border-radius: 3px;
        margin: 15px auto;
    }
    #header {
        height: 64px;
        background: #fff;
        border: 1px solid #ccc;

        .header-l {
            img {
                margin: 20px;
                width: 61px;
                height: 22px;
            }

            span {
                // position: relative;
                line-height: 60px;
                font-size: 16px;
                color: #333;

                &:before {
                    content: '';
                    height: 20px;
                    width: 1px;
                    background: #979797;
                    position: absolute;
                    top: 20px;
                    left: 92px;
                }
            }
        }

        .header-r {

            a {
                position: relative;
                float: right;
                margin: 20px 30px 0 0;

            }

            .border {
                margin: 20px;
                height: 20px;
                width: 1px;
                background: #979797;
            }

            span {
                position: relative;
                line-height: 60px;
                font-size: 12px;
                color: #333;
            }
        }
    }
</style>
<template>
    <div class="layout">
        <Row>
            <div id='header'>
                <div class="header-l fl">
                    <img src="../../assets/images/logo.png" alt="" class='fl'>
                    <span class='fl'>智能销售支撑平台</span>
                </div>
                <div class="header-r fr">
                    <span class='fl'>欢迎您，{{username}}</span>
                    <div class="border fl"></div>
                    <a href="javascript:;" @click='signOut'>
                        <img src="../../assets/images/exit.png" alt="">
                    </a>
                </div>
            </div>
        </Row>

        <Row type="flex">
            <i-col class="layout-menu-left">
                <LeftSide></LeftSide>
            </i-col>
            <i-col style="flex:1">
                <div class="layout-content">
                    <router-view></router-view>
                </div>
                <div class="layout-copy">
                    2011-2016 &copy; TalkingData
                </div>
            </i-col>
        </Row>
    </div>
</template>
<script>
import LeftSide from 'component/LeftSide';
export default {
    data() {
        return {
            username: ''
        }
    },
    components: {
        LeftSide
    },
    mounted() {
        this.$http.get('/isp-kongming/ad/login').then((res) => {
            if (res.data.errorCode == 0) {
                this.username = res.data.result;
            }
        })
    },
    methods: {
        signOut() {
            this.$http.get('/common-portal/common/portal/logout').then((res) => {
                if (res.data.errorCode == 0) {
                    this.$router.push('/');
                }
            }).catch((err) => {
                console.log(err);
            })
        }
    }
}
</script>
