<template lang="html">
  <div class="juristicArea">
    <Button type="primary" class="btn bg4373F3" @click="openDialog">选择管辖区域</Button>
    <Modal class="areaDialog"
        v-model="modal1"
        title="选择管辖区域"
       >
        <div class="area">
            <div class="show_check">
                <p>展示:</p>
                <label v-for='(i, index) in selectList'>{{i.name}}<a href="javascript:;" @click='del(i, index)'>x</a></label>
            </div>
            <div v-for='(list, index) in areaList' :key='index' class="fl box" :class="{icon: index == value}">
                <Checkbox v-model="list.status" @on-change='checkAll(index)'>{{list.name}}</Checkbox>
                <span @click='openChild(index,list.value)' class="open_icon"><Icon type="arrow-down-b" ></Icon></span>
                <div v-if='index == value' 
                :class='["child", 
                    {"child_right": false
                    }]'
                >
                    <Checkbox v-model="i.status" v-for='(i, n) in list.children' :key='index' 
                    @on-change='check(index, n, i.status)'>
                        {{i.name}}
                    </Checkbox>
                </div>
            </div>
        </div>
        <div slot="footer" class="footer">           
            <Button type="primary" class="btn bg4373F3" @click="submit" :disabled="clickSubmit">提交</Button >
            <Button type="primary" class="btn bgCancle ML15" @click="cancel">取消</Button>
        </div>
    </Modal>
  </div>
</template>

<script>
    export default {
        props:['checkedAreaList'],
        data() {
            return {
                clickSubmit:true,
                positions:false,
                modal1:false,
                value: -1,
                selectList: [],
                lists:[],//在编辑时传过来的值
                areaList:[],
            }
        },
        created(){
            this.lists=this.checkedAreaList 
        },
        methods: {
            submit(){
                let result=[]
                for(let i=0;i<this.areaList.length;i++){
                    if(this.areaList[i].status==true){
                        let obj={}
                        obj['name']=this.areaList[i].name
                        obj['id']=this.areaList[i].value
                        obj['status']=true
                        result.push(obj)
                    }else{
                        let obj={};
                        let checkChildren=[];
                        let children=this.areaList[i].children;
                        if(children){
                            for(let j=0;j<children.length;j++){
                                if(children[j].status==true){
                                    checkChildren.push(children[j])
                                }
                            }
                        }
                        if(checkChildren.length>0){
                            obj['name']=this.areaList[i].name
                            obj['id']=this.areaList[i].value
                            obj['status']=false
                            obj['children']=checkChildren
                            result.push(obj)
                        }
                    }
                }
                this.$emit('area',result)
                this.modal1=false
            },
            cancel(){
                this.modal1=false
            },
            openDialog(){
                this.modal1=true
                this.$http.get('/isp-kongming/basic/getArea'+"?pId=-1&pageSize=50").then((res)=>{//获取省级地区
                    if(res.data.errorCode===0){
                        this.areaList=res.data.result;
                        for(let i=0;i<this.areaList.length;i++){
                            this.areaList[i]['status']=false;
                            this.areaList[i]['openTime']=0;
                            this.areaList[i]['operate']=false;
                            this.areaList[i]['children']=null;
                        }
                        if(this.lists.length>=1){
                            this.initProvence()
                            // this.initLable()
                        }else{
                            this.clickSubmit=false
                        }
                    }
                    else {
                        this.$Modal.info({
                            title: '提示',
                            content: res.data.errorMsg
                        });
                    }
                }).catch((res)=>{})               
            },
            openChild(index,id) {
                let basePath='/isp-kongming/basic/getArea';
                this.$http.get(basePath+"?pId="+id+"&pageSize=100").then((res)=>{//获取省级的城市
                    if(res.data.errorCode===0){
                        if(this.areaList[index].openTime==0&&!this.areaList[index].children){
                            let cityArr=res.data.result
                            for(let i=0;i<cityArr.length;i++){
                                cityArr[i]['status']=false;
                            }
                            this.areaList[index]['children']=cityArr 
                            this.areaList[index].openTime=1
                            //打开的时候看他是不是全选，是的话，把该省下所有的市都选上
                            if(this.areaList[index].status==true){
                              this.checkAll(index)  
                            }                            
                        }
                        if(this.value==index){
                            this.value=-1
                        }else{                            
                            this.value = index;                            
                        }
                        
                    }
                    else {
                        this.$Modal.info({
                            title: '提示',
                            content: res.data.errorMsg
                        });
                      }
                    }).catch((res)=>{})               
            },
            check(index, n, status) {//城市选择事件
                this.initCheck(index);
                this.initLable();
            },
            checkAll(index) {//省级选中，城市全选
                let n = this.areaList[index].children;
                if(n){
                    if (this.areaList[index].status) {
                        for (let i = 0; i < n.length; i++) {
                            n[i].status = true;
                        }
                    }
                    else {
                        for (let i = 0; i < n.length; i++) {
                            n[i].status = false;
                        }
                    }                    
                }  
                this.initLable();             
            },
            initLable() {//对选中的地区进行处理，如果选中省就不显示城市，显示省下选中的个别城市
                this.selectList = [];
                for (let i = 0; i < this.areaList.length; i++) {
                    if (this.areaList[i].status) {
                        this.selectList.push({
                            name: this.areaList[i].name,
                            index:i
                        });
                    }
                    else {
                        let n = this.areaList[i].children;
                        if(n){
                            for (let k = 0; k < n.length; k++) {
                                if (n[k].status) {
                                    this.selectList.push({
                                        name: n[k].name,
                                        index: n[k].index?n[k].index:i,
                                        selfIndex:k
                                    })
                                }
                            }  
                        }
                        
                    }
                }
            },
            initCheck(index) {//在城市选择事件触发的时候，判断该省下的城市是否是全选
                let n = this.areaList[index].children;
                let status = true;
                for (let i = 0; i < n.length; i++) {
                    if (!n[i].status) {
                        status =  false;
                    }
                }

                if (status) {
                    this.areaList[index].status = true;
                }
                else {
                    this.areaList[index].status = false;
                }
            },
            del(i, index) {//头部的删除按钮事件,删除--->status都为false
                //i.index 表示的是 如果删除的市省，表示该省的位置，如果删除的是市，表示该市对应省的位置
                //i.selfIndex 表示的是，只针对城市，表示他在对应省下的城市中的index
                this.areaList[i.index].status = false;
                if (i.selfIndex) {//如果是城市
                    this.areaList[i.index].children[i.selfIndex].status = false;
                }
                else {
                    let n = this.areaList[index].children;
                    if(n){
                        for (let i = 0; i < n.length; i++) {
                            n[i].status = false;
                        } 
                    }
                   
                }
                this.selectList.splice(index, 1);//移除
            },
            initProvence(){//主要是用于编辑，当弹出层打开时。省的回填和初始化
                for(let i=0;i<this.lists.length;i++){
                    for(let j=0;j<this.areaList.length;j++){
                        if(this.lists[i].name==this.areaList[j].name){
                           if(this.lists[i].status==true){
                                this.areaList[j].status=true
                                if(i==this.lists.length-1){
                                    this.clickSubmit=false
                                }
                               this.initLable();   
                           }else if(this.lists[i].status==false){
                                 this.$http.get("/isp-kongming/basic/getArea?pId="+this.lists[i].id+"&pageSize=100").then((res)=>{//获取省级地区
                                    if(res.data.errorCode===0){
                                       let cityArr=res.data.result
                                        for(let i=0;i<cityArr.length;i++){
                                            cityArr[i]['status']=false;
                                        }
                                        
                                        this.areaList[j]['children']=cityArr
                                        this.initCity();
                                        this.initLable();                                    
                                        if(i==this.lists.length-1){
                                            this.clickSubmit=false
                                        }
                                       
                                    }
                                    else {
                                        this.$Modal.info({
                                            title: '提示',
                                            content: res.data.errorMsg
                                        });
                                    }
                                }).catch((res)=>{})   
                           }
                        }
                    }                
                } 
            },
            initCity(){//主要是用于编辑，当弹出层打开时。城市的回填和初始化
                for(let i=0;i<this.lists.length;i++){
                    if(this.lists[i].status==false){
                        for(let j=0;j<this.areaList.length;j++){
                            if(this.lists[i].name==this.areaList[j].name){
                                let checkedArr=this.lists[i].children;
                                let areaArr=this.areaList[j].children;
                                if(areaArr){
                                   for(let x=0;x<checkedArr.length;x++){
                                        for(let y=0;y<areaArr.length;y++){
                                            if(checkedArr[x].name==areaArr[y].name){
                                                areaArr[y]['status']=true
                                            }
                                        }
                                    } 
                                }                               
                            }
                        }
                    }
                }   
            }
        },
        watch:{
          checkedAreaList:{
            handler:function(){
                this.lists=this.checkedAreaList  
            }
          }
        }
    }
</script>

<style lang="scss">
.juristicArea{
}
.areaDialog{
    span.open_icon {
        cursor: pointer
    }
    .ivu-modal{width:700px !important; height:600px;overflow:auto} 
    .ivu-form-item-content{margin-left: 0px;}
    .area{
        width:100%;
        padding:0 20px 20px;
        height:350px;
        overflow:auto;
        .box {
            min-width: 140px;
            margin-top: 20px;
            position: relative;
        }
        .show_check{
            p{font-size:16px}
            label{
                margin-right: 20px;
                a{font-size:16px;margin-left:10px}
            }
        }
        .icon{
            position: relative;
            &:after{
                position:absolute;
                content: "";
                display:block;
                width: 0;
                height: 0;
                border-bottom:10px solid #ccc;
                border-top:none;
                border-left: 7px solid transparent;
                border-right: 7px solid transparent;
                top: 100%;
                left: 30px;
            }
        }
        .child {
            z-index: 100;
            background: #ccc;
            position: absolute;
            top: 30px;
            width: 400px;
            padding:10px;
            .ivu-checkbox-wrapper{
                min-width: 70px;
                margin-right: 20px;
                margin-top: 10px
            }
        }
        .child_right{
            right:0px !important;
        }
        .child_left{
            left:0px;
        }
    }   
    .ivu-modal-footer{
        border-top:none;
        .ivu-form-item-content{margin-left :0px !important}
        .footer{
            text-align:center;
            height: 40px;
            .ivu-modal-footer{
               padding:0; 
            }
        }
    } 
    
}

</style>


