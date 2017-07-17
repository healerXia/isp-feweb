<template lang="html">
  <div id = "docMangement">
      <div class="insert">
          <Button type="success" @click='jump'>新增单据</Button>
      </div>
      <div class="doclist">
          <table cellspacing="1" cellpadding="0" class="user">
              <thead>
                  <tr>
                      <td width='15%'>单据编号</td>
                      <td style="padding-right: 30px;">单据名称</td>
                      <td width='20%'>创建时间</td>
                      <td width='128px;'>操作</td>
                  </tr>
              </thead>
              <tbody>
                  <tr v-for='(i,index) in data'>
                      <td style="padding-left:30px;">{{index+1}}</td>
                      <td style="padding-right: 30px;">{{i.formTypeName}}</td>
                      <td>{{i. updateTimeStr}}</td>
                      <td  class="clear">
                          <a href="javascrip:void(0);" class="fl" @click='edit(i, index)'>编辑</a>
                          <a href="javascrip:void(0);" class="fl" style="margin-left: 50px;" @click='remove(i, index)'>删除</a>
                      </td>
                  </tr>
              </tbody>
          </table>
          <!-- <Table :columns="columns" :data="data"></Table> -->
          <!-- <Page :total="40" size="small" show-elevator show-sizer class='page'></Page> -->
      </div>
  </div>
</template>

<script>
export default {
    data() {
        return {
            data: []
        }
    },
    mounted() {
        // formType
        this.render();
    },
    methods: {
        render() {
            this.$http.get('/isp-process-server/formType/all').then((res) => {
                if (res.data.errorCode == 0) {
                    let data = Object.assign([], res.data.result);
                    for (let i = 0; i < data.length; i++) {
                        data[i].index = i+1;
                        data[i].updateTimeStr = data[i].updateTimeStr.split(' ')[0];
                    }
                    this.data = Object.assign([], data);
                }
            }).catch((err) => {
                console.log(err);
            })
        },
        remove (data, index) {
            let id = data.id;
            this.$Modal.confirm({
                title: '提示',
                content: '是否删除',
                onOk: () => {
                    this.$http.delete(`/isp-process-server/formType/${id}`).then((res) => {
                        if (res.data.errorCode == 0) {
                            this.$Message.success('删除成功');
                            this.render();
                        }
                        else {
                            this.$Modal.info({
                                title: '提示',
                                content: res.data.rspMsg.errorMsg
                            });
                        }
                    }).catch((err) => {
                        console.log(err);
                    })
                },
                onCancel: () => {
                    //this.$Message.info('点击了取消');
                }
            });
        },
        jump() {
            this.$router.push('addDoc');
        },
        edit(data, index) {
            let id = data.id;
            this.$router.push({path: 'addDoc', query: {id: id}});
        }
    }
}
</script>

<style lang="scss">
#docMangement {
    padding: 30px;

    .user {
        width: 100%;
        min-width: 1104px;

        thead {
            text-align: left;
            background: #F9FAFC;
            border-radius: 2px 2px 0 0;
        }

        td {
            height: 56px;
            // text-indent: 30px;
            //width: 25%;
            text-align: left;
        }

        .name {
            padding-right: 30px;
        }

        tbody {
            tr {
                box-shadow: 0 1px 0 0 #DEE1E5;
            }

            td {
                text-indent: 0;
            }

            a {
                text-align: left;
            }
        }

        .tableInput {
            td {
                .text {
                    width: 80%;
                }
            }
        }
    }

    .insert {
        margin-bottom: 20px;
    }

    .page {
        margin-top: 35px;
    }

    thead tr {
        font-size: 14px;
        color: #7B8497;
        letter-spacing: 0.52px;
    }

    .ivu-table-wrapper {
        border: none;
    }

    .ivu-table th {
        border: none;
    }

    .ivu-table:after {
        width: 0;
    }

    .ivu-table-row {
        font-size: 14px;
        height: 56px;
        font-size: 14px;
        color: #333333;
        letter-spacing: 0.52px;
    }
}
</style>
