// 左侧导航配置文件
const menu =  [
    {
        name: '首页',
        path: '',
        index: '1',
        icon: 'icon-index'
    },
    {
        name: '项目',
        path: '',
        index: '2',
        icon: 'icon-project',
        subNav: [
            {
                name: '创建项目',
                index: '2-1',
                icon: '',
                path: 'createPro'
            },
            {
                name: '项目管理',
                index: '2-2',
                icon: '',
                path: 'projectList'
            }
        ]
    },
    {
        name: '订单',
        path: '',
        index: '3',
        icon: 'icon-orders',
        subNav: [
            {
                name: '订单管理',
                index: '3-1',
                icon: '',
                path: 'orderList'
            }
        ]
    },
    {
        name: '客户',
        path: '',
        index: '4',
        icon: 'icon-customer',
        subNav: [
            {
                name: '新建客户',
                index: '4-1',
                icon: '',
                path: 'createUser'
            },

            {
                name: '客户管理',
                index: '4-2',
                icon: '',
                path: 'custList'
            },
            {
                name: '代理商管理',
                index: '4-3',
                icon: '',
                path: 'wait'
            },
            {
                name: '联系人管理',
                index: '4-4',
                icon: '',
                path: 'wait'
            },
            {
                name: '访问记录',
                index: '4-5',
                icon: '',
                path: 'wait'
            }
        ]
    },
    {
        name: '合同',
        path: '',
        index: '5',
        icon: 'icon-contract',
        subNav: [
            {
                name: '合同管理',
                index: '5-1',
                icon: '',
                path: 'wait'
            },
            {
                name: '回款管理',
                index: '5-2',
                icon: '',
                path: 'wait'
            },
            {
                name: '发票管理',
                index: '5-3',
                icon: '',
                path: 'wait'
            }
        ]
    },
    {
        name: '审批',
        path: '',
        index: '6',
        icon: 'icon-approval',
        subNav: [
            {
                name: '业务审批',
                index: '6-1',
                icon: '',
                path: 'wait'
            },
            {
                name: '审批列表',
                index: '6-2',
                icon: '',
                path: 'auditList'
            }
        ]
    },
    {
        name: '报表',
        path: '',
        index: '7',
        icon: 'icon-reportForm',
        subNav: [
            {
                name: '广告售卖',
                index: '7-1',
                icon: '',
                path: 'wait'
            },
            {
                name: '会员业务',
                index: '7-2',
                icon: '',
                path: 'wait'
            },
            {
                name: '客户合作',
                index: '7-3',
                icon: '',
                path: 'wait'
            },
            {
                name: '业绩分析',
                index: '7-3',
                icon: '',
                path: 'wait'
            }
        ]
    },
    {
        name: '工作流',
        path: '',
        index: '8',
        icon: 'icon-workflow',
        subNav: [
            {
                name: '审批链管理',
                index: '8-1',
                icon: '',
                path: 'approvalManagement'
            },
            {
                name: '用户组管理',
                index: '8-2',
                icon: '',
                path: 'chainManagement'
            },
            {
                name: '审批链替换',
                index: '8-3',
                icon: '',
                path: 'wait'
            }
        ]
    },
    {
        name: '运营管理',
        path: '',
        index: '9',
        icon: 'icon-customer',
        subNav: [
            {
                name: '流程管理',
                index: '9-1',
                icon: '',
                path: 'docManagemengt'
            },
            {
                name: '部门管理',
                index: '9-2',
                icon: '',
                path: 'department'
            },
            {
                name: '人员管理',
                index: '9-3',
                icon: '',
                path: 'projectList'
            }
        ]
    },
    {
        name: '个人中心',
        path: '',
        index: '10',
        icon: 'icon-customer',
        subNav: [
            {
                name: '查看个人中心',
                index: '10-1',
                icon: '',
                path: 'viewPercenter'
            }
        ]
    }
]

export {
    menu
}
