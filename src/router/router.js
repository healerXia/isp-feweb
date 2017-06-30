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
            }
        ]
    }
];

const router = new VueRouter({
    routes
});

export default router;
