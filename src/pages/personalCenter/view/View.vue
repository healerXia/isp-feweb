<template lang="html">
    <div id="viewPersonalcenter">
        <div class="personal-Info">
            <div class="conBox">
                <div class='hasNoOrder'>
                    <div class="title MB20 MT15">
                      <h1 class="MR15">订单信息</h1>
                      <router-link
                        :to="{path:'resource',query:{id:$router.currentRoute.query.id}}" >
                          新增订单
                      </router-link>
                    </div>
                </div>
            </div>

            <div class="info">
                <p class="title">基本信息</p>
                <ul class="info-list clear">
                    <li class="fl">
                        <label for="" class="fl">域账号：</label>
                        <span class="fl">zhaobin</span>
                    </li>
                    <li class="fl">
                        <label for="" class="fl">员工编号：</label>
                        <span class="fl">5951</span>
                    </li>
                </ul>
            </div>
        </div>

        <div class="table">

        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
#viewPersonalcenter {
    .personal-Info {
        padding: 50px 30px;
        background: #F9FAFC;

        .info-list {
            li {
                width: 500px;

                span {
                    max-width: 400px;
                    word-break: break-all;
                }

                &:nth-child(2n) {
                    margin-left: 50px;
                }
            }
        }
    }
}
</style>
