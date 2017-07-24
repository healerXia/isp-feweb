<template lang="html">
  <div id = "auditList">
      <Form :label-width="80">
          <div class="formTop clear">
              <div class="item fl">
                  <Form-item label="单据名称:" prop="name">
                      <Input v-model="searchInfo.chainName" placeholder="请输入审批链名称"></Input>
                  </Form-item>
              </div>
              <div class="item fl">
                  <Form-item label="用户组名称:" prop="name">
                      <Input v-model="searchInfo.groupName" placeholder="请输入用户组名称"></Input>
                  </Form-item>
              </div>
              <div class="item fl">
                  <Form-item label="单据名称:" prop="name">
                      <Select v-model="searchInfo.formType" style="width:268px">
                          <Option v-for="item in selectData" :value="item" :key="item.value">{{item}}</Option>
                      </Select>
                  </Form-item>
              </div>
          </div>
          <div class="formBot clear">
              <div class="item fl">
                  <Form-item label="创建时间:">
                      <Date-picker type="date" placeholder="选择日期" v-model="formValidate.date" class='dateItem fl'></Date-picker>
                      <span class='fl line'></span>
                      <Date-picker type="date" placeholder="选择日期" v-model="formValidate.date" class='dateItem fl'></Date-picker>
                  </Form-item>
              </div>

          </div>

          <Form-item class='submitBtn'>
              <Button type="primary" @click="search" class="search fr">查询</Button>
          </Form-item>
      </Form>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
#auditList {
    .formTop {
        margin-top: 50px;

        .item {
            width: 348px;
             margin-right: 30px;
        }
    }

    .formBot {
        .item {
            width: 800px;
        }

        .line {
            margin: 20px;
            width: 6px;
            border-bottom: 1px solid #ccc;
        }

        .dateItem {
            width: 268px;
        }
    }
}

</style>
