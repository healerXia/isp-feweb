<template lang="html">
<<<<<<< HEAD
  <div class="area">
=======
  <div class="">
>>>>>>> master
      <div class="">
          <p>展示:</p>
          <label v-for='(i, index) in selectList'>{{i.name}}<a href="javascript:;" @click='del(i, index)'>x</a></label>
      </div>
<<<<<<< HEAD
       <div v-for='(list, index) in lists' :key='index' class="fl box">
            <Checkbox v-model="list.status" @on-change='checkAll(index)'>{{list.name}}</Checkbox>
            <span @click='open(index)'><Icon type="arrow-down-b" ></Icon></span>
            <div class="" v-if='index == value' class="child">
=======
       <div v-for='(list, index) in lists' :key='index' class="fl">
            <Checkbox v-model="list.status" @on-change='checkAll(index)'>{{list.name}}</Checkbox>
            <a href="javascript:;" @click='open(index)'>+</a>
            <div class="" v-if='index == value'>
>>>>>>> master
                <Checkbox v-model="i.status" v-for='(i, n) in list.children' :key='index' @on-change='check(index, n, i.status)'>{{i.name}}</Checkbox>
            </div>
       </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            value: -1,
            selectList: [],
            lists: [
                {
                    name: '北京',
                    status: false,
                    children: [
                        {
                            name: '通州',
                            status: false
                        },
                        {
                            name: '昌平',
                            status: false
                        },
                        {
                            name: '海淀区',
                            status: false
                        }
                    ]
                },
                {
                    name: '河北',
                    statue: false,
                    children: [
                        {
                            name: '承德',
                            status: false
                        },
                        {
                            name: '石家庄',
                            status: false
<<<<<<< HEAD
                        },
                        {
                            name: '111',
                            status: false
                        },
                        {
                            name: '222',
                            status: false
                        }
                    ]
                },
                 {
                    name: '河北',
                    statue: false,
                    children: [
                        {
                            name: '承德',
                            status: false
                        },
                        {
                            name: '石家庄',
                            status: false
                        },
                        {
                            name: '111',
                            status: false
                        },
                        {
                            name: '222',
                            status: false
                        }
                    ]
                }, {
                    name: '河北',
                    statue: false,
                    children: [
                        {
                            name: '承德',
                            status: false
                        },
                        {
                            name: '石家庄',
                            status: false
                        },
                        {
                            name: '111',
                            status: false
                        },
                        {
                            name: '222',
                            status: false
=======
>>>>>>> master
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        open(index) {
<<<<<<< HEAD
            if(this.value==index){
                this.value=-1
            }else{
                this.value = index;
            }
            
=======
            this.value = index;
>>>>>>> master
        },
        check(index, n, status) {
            this.initCheck(index);
            this.initLable();
        },
        checkAll(index) {
            let n = this.lists[index].children;
            if (this.lists[index].status) {
                for (let i = 0; i < n.length; i++) {
                    n[i].status = true;
                }
            }
            else {
                for (let i = 0; i < n.length; i++) {
                    n[i].status = false;
                }
            }
            this.initLable();
        },
        initLable() {
            this.selectList = [];
            for (let i = 0; i < this.lists.length; i++) {
                console.log(this.lists[i].name);
                if (this.lists[i].status) {
                    this.selectList.push({
                        name: this.lists[i].name,
                        index: i
                    });
                }
                else {
                    let n = this.lists[i].children;
                    for (let k = 0; k < n.length; k++) {
                        if (n[k].status) {
                            this.selectList.push({
                                name: n[k].name,
                                index: i,
                                selfIndex: k
                            })
                        }
                    }
                }
            }
            console.log(this.selectList);
        },
        initCheck(index) {
            let n = this.lists[index].children;
            let status = true;
            for (let i = 0; i < n.length; i++) {
                if (!n[i].status) {
                    status =  false;
                }
            }

            if (status) {
                this.lists[index].status = true;
            }
            else {
                this.lists[index].status = false;
            }
        },
        del(i, index) {
            console.log(1);
            this.lists[i.index].status = false;

            if (i.selfIndex) {
                this.lists[i.index].children[i.selfIndex].status = false;
            }
            else {
                let n = this.lists[index].children;
                for (let i = 0; i < n.length; i++) {
                    n[i].status = false;
                }
            }
            console.log(this.lists);
            this.selectList.splice(index, 1);
        }
    }
}
</script>

<style lang="css">
<<<<<<< HEAD
.area{width: 200px}
.f1{overflow:hidden;}
.box {
    position: relative;


}

.child {
    z-index: 100;
    background: #ccc;
    position: absolute;
    top: 20px;
    left: 0;
    width: 200px;
}
=======

>>>>>>> master
</style>
