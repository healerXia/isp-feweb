<template>
    <Row>
        <Col span="12">
            <Date-picker  :editable = 'false' v-model='startTime'  @on-change="chooseStartTime"  type="month" :options="date1" placeholder="选择日期"></Date-picker>
        </Col>
        <Col span="12">
            <Date-picker  :editable = 'false'   @on-change="chooseEndTime"  type="month" :options="date2" placeholder="选择日期"></Date-picker>
        </Col>

    </Row>
</template>
<script>
    export default {
        data() {
            return  {
                startTime: '',
                endTime: '',
                date1: {
                    disabledDate: this.disStart
                },
                date2: {
                    disabledDate: this.disEnd
                }
            }
        },
        methods: {
            disStart(date) {
                let year = new Date().getFullYear();
                let month = new Date().getMonth();
                return date && date.valueOf() < new Date(year, month).getTime() || date && date.valueOf() > new Date(year + 1, 11, 30).getTime();
            },
            disEnd(date) {
                if (this.startTime) {
                    let year = this.startTime.split('-')[0];
                    let month = this.startTime.split('-')[1];
                    return date && date.valueOf() < new Date(year, month).getTime() || date && date.valueOf() > new Date(year, 11, 30).getTime();
                }
                else {
                    let year = new Date().getFullYear();
                    let month = new Date().getMonth();
                    return date && date.valueOf() < new Date(year, month).getTime() || date && date.valueOf() > new Date(year + 1, 11, 30).getTime();
                }
            },
            chooseStartTime(date) {
                this.startTime = date;
            },
            chooseEndTime(date) {
                this.endTime = date;
            }

        }
    }
</script>
