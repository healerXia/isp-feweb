<template>
    <Row>
        <Col span="12">
            <Date-picker  :editable = 'false'   @on-change="chooseStartTime"  type="month" :options="date1" placeholder="选择日期"></Date-picker>
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
                this.startTime = date;
                let year = new Date().getFullYear();
                let month = new Date().getMonth();
                return date &&  date.valueOf() < new Date()
            },
            disEnd(date) {
                this.startTime = date;

                this.date2.disabledDate = (date) => {
                    console.log(this);
                    let start = this.startTime;
                    let end = this.endTime;

                    let year = new Date().getFullYear();
                    let month = new Date().getMonth();

                    if (end) {
                        let endYear = end.split('-')[0];
                        if (endYear == year) {
                            return date && date.valueOf() < new Date(year, month).getTime() || date && date.valueOf() > new Date(year,11,30).getTime();
                        }

                    }
                }
            }

        }
    }
</script>
