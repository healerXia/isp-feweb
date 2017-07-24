import Vue       from 'vue';
import VueRouter from 'vue-router';

const Index = (resolve) => require(['../pages/index/Index'], resolve);
const About = (resolve) => require(['../pages/about/About'], resolve);
const Demo  = (resolve) => require(['../pages/demos/Demo'], resolve);
const Resource = (resolve) => require(['../pages/resource/resource'], resolve);
const CreatePro  = (resolve) => require(['../pages/createPro/CreatePro'], resolve);
const ProDetail  = (resolve) => require(['../pages/proDetail/ProDetail'], resolve);
const BuildPrice=(resolve) => require(['../pages/buildPrice/BuildPrice'], resolve);
const OrderList = (resolve) => require(['../pages/orderList/OrderList.vue'], resolve);
const ProjectList = (resolve) => require(['../pages/projectList/ProjectList.vue'], resolve);
const Details = (resolve) => require(['../pages/details/Details.vue'], resolve);
const Wait = (resolve) => require(['../pages/wait/Wait.vue'], resolve);

const ViewAd = (resolve) => require(['../pages/viewAd/ViewAd'], resolve);
const ChooseTime = (resolve) =>  require(['../pages/chooseTime/ChooseTime'],resolve);
const DemoForm = (resolve) => require(['../pages/demos/DemoForm.vue'], resolve);

<<<<<<< HEAD
//个人中心
const edit = (resolve) => require(['../pages/personalCenter/editInfo/editInfo'],resolve);
const test = (resolve) => require(['../pages/personalCenter/editInfo/demo'],resolve);
=======


>>>>>>> master
// 审批链流程
const setUp = (resolve) => require(['../pages/approval/setUp/SetUp'], resolve);
const docManagemengt = (resolve) => require(['../pages/approval/docManagement/DocManagement'], resolve);
const addDoc = (resolve) => require(['../pages/approval/addDoc/AddDoc.vue'], resolve);
const department = (resolve) => require(['../pages/approval/department/Department'], resolve);
<<<<<<< HEAD
//购物车小栗子
const goodsInfo = (resolve) => require(['../pages/shoppingCart/goodsInfo'], resolve);
const shoppingCart = (resolve) => require(['../pages/shoppingCart/shoppingCart'], resolve);
=======
const createChain = (resolve) => require(['../pages/approval/createUser/createUser'], resolve);
const chainManagement = (resolve) => require(['../pages/approval/chainManagement/chainManagement'], resolve);
const chainConfig = (resolve) => require(['../pages/approval/chainConfig/chainConfig'], resolve);
const ApprovalManagement = (resolve) => require(['../pages/approval/approvalManagement/management'], resolve);
const AuditList = (resolve) => require(['../pages/approval/auditList/AuditList'], resolve);
// const createChain = (resolve) => require('[../pages/approval/createUser/createUser]', resolve);

>>>>>>> master
// demo
const ListPages  = (resolve) => require(['../pages/demos/listPages'], resolve);
const selectTab = (resolve) => require(['../pages/demos/selectTab'], resolve);
const fromVal = (resolve) => require(['../pages/demos/formValidate'], resolve);



Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'root',
        redirect: '/index/createPro'
    },
    {
        path: '/index',
        name: 'index',
        component: Index,
        children: [
            {
                path: 'about',
                name: 'about',
                component: About
            },
            {
                path: 'resource',
                name: 'resource',
                component: Resource
            },
            {
              path: 'createPro',
              name: 'createPro',
              component: CreatePro
            },
            {
                path: 'buildPrice',
                name: 'buildPrice',
                component: BuildPrice
            },
            {
                path: 'proDetail',
                name: 'proDetail',
                component: ProDetail
            },
            {
                path: 'viewAd',
                name: 'viewAd',
                component: ViewAd
            },
            {
                path: 'chooseTime',
                name: 'chooseTime',
                component: ChooseTime
            },
            {
                path: 'orderList',
                name: 'orderList',
                component: OrderList
            },
             {
                path: 'projectList',
                name: 'projectList',
                component: ProjectList
            },
            {
                path: 'details',
                name: 'details',
                component: Details
            },
            {
                path: 'wait',
                name: 'wait',
                component: Wait
            },
            {
                path: 'setUpDepartment',
                name: 'setUpDepartment',
                component: setUp
            },
            {
                path: 'docManagemengt',
                name: 'docManagemengt',
                component: docManagemengt
            },
            {
                path: 'addDoc',
                name: 'addDoc',
                component: addDoc
            },
            {
                path: 'department',
                name: 'department',
                component: department
            },
            {
<<<<<<< HEAD
                path: 'edit',
                name: 'edit',
                component: edit
            },
            {
                path: 'test',
                name: 'test',
                component: test
            },
            {
                path: 'goodsInfo',
                name: 'goodsInfo',
                component: goodsInfo
            },
            {
                path: 'shoppingCart',
                name: 'shoppingCart',
                component: shoppingCart
=======
                path: 'createChain',
                name: createChain,
                component: createChain
            },
            {
                path: 'chainManagement',
                name: chainManagement,
                component: chainManagement
            },
            {
                path: 'chainConfig',
                name: chainConfig,
                component: chainConfig
            },
            {
                path: 'approvalManagement',
                name: 'ApprovalManagement',
                component: ApprovalManagement
            },
            {
                path: 'auditList',
                name: 'AuditList',
                component: AuditList
>>>>>>> master
            }
        ]
    },
    {
        path: '/demo',
        name: 'demo',
        component: Demo,
        children: [
            {
                path: 'form',
                name: 'form',
                component: DemoForm
            },
            {
<<<<<<< HEAD
                path: 'selectTab',
                name: 'selectTab',
                component: selectTab
            },
            {
                path: 'listPages',
                name: 'listPages',
                component: ListPages
=======
                path: 'fromVal',
                name: 'fromVal',
                component: fromVal
>>>>>>> master
            }
        ]
    }
];

const router = new VueRouter({
    routes
});

export default router;
