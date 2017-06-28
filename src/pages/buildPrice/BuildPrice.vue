<template lang="html">
    <div class="buildPrice">
      <ProjectInfo :proMess="proMess"></ProjectInfo>
      <div class="content">
        <div class="contentBox">
          <div class="orderMess">
            <div class="proBar">
              <ProjectStep :status = '3'></ProjectStep>
            </div>
            <div class="pLR20">
              <div class="bar MB20">
                  生成价格
              </div>
              <Table border :columns="tableData.head" :data="tableData.mess"></Table>
              <div class="discount MT20">
                <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="70">
                    <Form-item label="折扣:" prop="discount" :error='errorTxt'>

                        <Input-number class="w200 fl" v-model="formValidate.discount" @on-change='totalPrice' :max="10" :min="5" :step="0.1"></Input-number>
                        <span class="char fl">折</span>
                    </Form-item>
                    <p class="MB20 fontSize12">实际成交价：<span class="colorRed fontSize14">{{reallyPrice.toFixed(2)}}元</span></p>
                    <Form-item>
                        <Button type="primary" class="btn bg4373F3" @click="handleSubmit('formValidate', 1)" :disabled='saveStatus'>保存方案</Button>
                        <Button type="primary" class="btn bg4373F3 ML20" @click="handleSubmit('formValidate', 2)" :disabled='submitStatus'>提交</Button>
                        <Button type="primary" class="btn bgccc ML20" @click="handleReset('formValidate')" >取消</Button>
                    </Form-item>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-show="false"><span>{{discoutTofix}}</span></div>
    </div>
</template>

<script>
import ProjectInfo from 'components/ProjectInfo';
import urlList from './config.js';
  export default {
    components: {
        ProjectInfo
    },
    data() {
      return {
        errorTxt: '',
        saveStatus: false,
        submitStatus: false,
        reallyPrice:0,
        total: 0,
        price: {},
        formValidate:{
          discount:5.0,
        },
        submitData: [],
        proMess:{
          proName: "",
          proBudget:"",
          DeliCycle:"",
          corporateAgent:"",
          Exposure:"",
          click:"",
          servType:"",
          deliveryM:"",
          deliveryB:"",
          deliveryC:"",
          respSell:"",
          agreement:""
        },
        tableData:{
          head: [
            {
              title: '时间',
              key: 'time'
            },
            {
              title: 'A类购买总价(元)',
              key: 'aTotal'
            },
            {
              title: 'B类购买总价(元)',
              key: 'bTotal'
            },{
              title: 'C类购买总价(元)',
              key: 'cTotal'
            },
            {
              title: 'D类购买总价(元)',
              key: 'dTotal'
            },
            {
              title: '配送比率',
              key: 'distribution'
            }
          ],
          mess: []
        },
        ruleValidate:{
          discount: [
            { required: true, type: 'number', message: '折扣不能为空', trigger: 'change' }
          ],
        }
      }
    },
    created() {


    },
    mounted() {
        this.proMess = JSON.parse(window.localStorage.getItem('proMess'));
        let priceList = JSON.parse(window.localStorage.getItem('priceList'));
        let data = JSON.parse(window.localStorage.getItem('price'));
        this.submitData = Object.assign([], data);
        let aTotal = 0;
        let bTotal = 0;
        let cTotal = 0;
        let dTotal = 0;

        for (let i = 0; i< priceList.length; i++) {
            if (!priceList[i].total) {
                priceList[i].total = 0;
            }
            if (!priceList[i].delivery) {
                priceList[i].delivery = 0;
            }
            if (!priceList[i].exchange) {
                priceList[i].exchange = 0;
            }
            if (!priceList[i].per) {
                priceList[i].per = 0;
            }
            if (priceList[i].total == 0 && priceList[i].delivery == 0 && priceList[i].exchange == 0 && priceList[i].per == 0) {
                continue;
            }
            this.tableData.mess.push({
                time: priceList[i].time,
                aTotal: priceList[i].total.toFixed(2) == 0 ? '-' : priceList[i].total.toFixed(2),
                bTotal: priceList[i].delivery.toFixed(2) == 0 ? '-' : priceList[i].delivery.toFixed(2),
                cTotal: priceList[i].exchange.toFixed(2) == 0 ? '-' : priceList[i].exchange.toFixed(2),
                dTotal: priceList[i].per.toFixed(2) == 0 ? '-' : priceList[i].per.toFixed(2),
                distribution: priceList[i].proportion
            })


            aTotal += parseInt(priceList[i].total);
            bTotal += parseInt(priceList[i].delivery);
            cTotal += parseInt(priceList[i].exchange);
            dTotal += parseInt(priceList[i].per);
        }
        let str = this.ratio(aTotal, bTotal);
        this.tableData.mess.push({
            time: '合计',
            aTotal: aTotal.toFixed(2) == 0 ? '-' : aTotal.toFixed(2),
            bTotal: bTotal.toFixed(2) == 0 ? '-' : bTotal.toFixed(2),
            cTotal: cTotal.toFixed(2) == 0 ? '-' : cTotal.toFixed(2),
            dTotal: dTotal.toFixed(2) == 0 ? '-' : dTotal.toFixed(2),
            distribution: str
        })
        this.total =  aTotal;
        this.totalPrice();
        this.price.sellAllPrice = aTotal;
        this.price.dispatchinglAllPrice = bTotal;

        let id = this.$router.currentRoute.query.id;
        if (id) {
            this.$http.get(config.urlList.getInfo+"?id="+id).then((res) => {
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
    },
    methods: {
        handleReset (name) {
            let id = this.$router.currentRoute.query.id;
            this.$refs[name].resetFields();
            this.$router.push({path: 'details', query: {id: id}});
        },
        handleSubmit (name, id) {
            if (this.errorTxt != '') {
                return false;
            }
            if (id == 1) {
                this.saveStatus = true;
            }

            if (id == 2) {
                this.submitStatus = true;
            }
            let self = this;
            let datas = JSON.parse(window.localStorage.getItem('price'));
            // 浅拷贝
            // let datas = Object.assign([], this.submitData);
            for (let i = 0;i < datas.length; i++) {
                datas[i].priceUnit = 1;
            }

            this.$refs[name].validate((valid) => {
                let adOrderCode = window.localStorage.getItem('adOrderCode');
                if (valid) {
                    this.$http.post('/isp-kongming/adorder/orderUpdate', {
                        "action": id,
                        "projectId":this.proMess.id,
                        "projectName": this.proMess.projectName,
                        "adOrderCode": adOrderCode,
                        "sellAllPrice": this.price.sellAllPrice,
                        "dispatchinglAllPrice": this.price.dispatchinglAllPrice,
                        "realitySellAllPrice": this.reallyPrice,
                        "detailList": datas
                    }).then((res) => {
                        if (res.data.errorCode === 0) {
                            if (id == 1) {
                                this.$Modal.success({
                                    title: '提示',
                                    content: '保存成功',
                                    onOk () {
                                         self.$router.push({path: 'details', query: {id: self.proMess.id}});
                                    }
                                });

                                this.saveStatus = true;
                            }

                            if (id == 2) {
                                this.$Modal.success({
                                    title: '提示',
                                    content: '提交成功',
                                    onOk () {
                                         self.$router.push({path: 'details', query: {id: self.proMess.id}});
                                     }
                                });

                                this.submitStatus = true;
                            }

                        }
                        else {
                            if (id == 1) {
                                this.saveStatus = false;
                            }

                            if (id == 2) {
                                this.submitStatus = false;
                            }
                            this.$Modal.info({
                                title: '提示',
                                content: res.data.errorMsg
                            });
                        }
                    }).catch((err) => {
                        if (id == 1) {
                            this.saveStatus = false;
                        }

                        if (id == 2) {
                            this.submitStatus = false;
                        }
                        console.log(err)
                    })
                } else {
                    if (id == 1) {
                        this.saveStatus = false;
                    }

                    if (id == 2) {
                        this.submitStatus = false;
                    }
                    this.$Message.error('表单验证失败!');
                }
            })
        },
        totalPrice(num) {
            console.log(1);
            if (num) {
                if (num.toString().split('.')[1].length > 1) {
                    this.errorTxt = '请输入5-10之间的数字，最多保留一位小数';
                    return false;
                }
            }
            this.reallyPrice = this.total * this.formValidate.discount / 10;
        },
        // 计算比率 购买 配送
        ratio(total, delivery) {
            if (total == 0 && delivery != 0) {
                return `1:0`;
            }
            else if (total !=0 && delivery == 0) {
                return `0:0`
            }
            else if(total == 0 && delivery == 0){
                return `0:0`
            }
            else {
                let percent = delivery/total;
                return `1:${percent.toFixed(1)}`;
            }
        }
    }
}

</script>
<style lang='scss' scoped>
  @import '../../assets/css/fonts/iconfont.css';
  @import '../../assets/css/pageCss/buildPrice.scss';
</style>
