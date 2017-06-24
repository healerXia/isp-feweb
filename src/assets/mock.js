/**
 * Created by vincent on 2017/5/11.
 */
import Mock from 'mockjs'

let mockData = {
  order: {
    manage: Mock.mock('http://www.hwcareer.com/home/getAll', {
      'code': '200',
      'result': {
        'total': 20,
        'page_index': 1,
        'page_size': 2,
        'list|10': [
          {
            'id': '订单id',
            'order_number': '订单编号',
            'customer_name': '客户名称',
            'source_num': '资源数量',
            'peroid': '投放周期',
            'exposure': '曝光量',
            'click|1-5': '1',
            'click_per': '点击率',
            'today_exposure': '今日曝光',
            'today_click': '今日点击',
            'putting_progress': '投放进度',
            'perform_user': '投放执行人',
            'create_time': '创建时间',
            'update_time': '更新时间',
            'order_status': '执行状态',
            'order_type': '类型',
            'sale': '销售人员'
          }
        ]
      }
    })
}
export default mockData
