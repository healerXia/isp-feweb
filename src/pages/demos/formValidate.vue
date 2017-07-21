<template lang="html">
  <div class="">
      <Select
        v-model="model13"
        filterable
        remote
        placeholder='请输入'
        :remote-method="remoteMethod1"
        :loading="loading1">
        <Option v-for="option in options1" :value="option.value" :key="option.value">{{option.label}}</Option>
    </Select>
    {{model13}}
  </div>
</template>

<script>
export default {
    data() {
        return {
            model13: '',
            loading1: false,
            options1: [],
            list: ['Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New hampshire', 'New jersey', 'New mexico', 'New york', 'North carolina', 'North dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode island', 'South carolina', 'South dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington', 'West virginia', 'Wisconsin', 'Wyoming']
        }
    },
    mounted() {
        setTimeout(() => {
            this.options1 = [
                {
                    value: 'Alabama',
                    label: 'Alabama'
                },
                {
                    value: 'Alaska',
                    label: 'Alaska'
                }
            ];
            this.init();
        }, 1000)

        setTimeout(() => {
            //this.init();
            this.model13 =  '12312'
        }, 2000)
    },
    methods: {
        init() {
            document.querySelector('.ivu-select-input').value = 'Alabama';
        },
        remoteMethod1 (query) {
                if (query !== '') {
                    this.loading1 = true;
                    setTimeout(() => {
                        this.loading1 = false;
                        const list = this.list.map(item => {
                            return {
                                value: item,
                                label: item
                            };
                        });
                        this.options1 = list.filter(item => item.label.toLowerCase().indexOf(query.toLowerCase()) > -1);
                    }, 200);
                } else {
                    this.options1 = [];
                }
            }
    }
}
</script>

<style lang="css">
</style>
