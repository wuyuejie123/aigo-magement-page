import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: () => import('@/views/login/index')
    },
    {
        path: '/index',
        component: Layout,
        redirect: '',
        children: [{
            path: 'index',
            name: 'index',
            component: () => import('@/views/index/index'),
            meta: { title: '欢迎访问', icon: 'clipboard-list' },
        }
        ]
    }
    ,
    {
        path: '/dashboard',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'dashboard',
            component: () => import('@/views/dashboard/newIndex'),
            meta: { title: '概览', icon: 'dice-d6' },
        }]
    },
    {
        path: '/list',
        component: Layout,
        redirect: '/list/cameraList',
        meta: { title: '控制台', icon: 'clipboard-list' },
        children: [{
            path: 'cameraList',
            name: 'cameraList',
            component: () => import('@/views/list/cameraList'),
            meta: { title: '摄像头', icon: 'shopping-bag' },
        },
            {
                path: 'sensorList',
                name: 'sensorList',
                component: () => import('@/views/list/sensorList.vue'),
                meta: { title: '传感器', icon: 'shopping-bag' },
            },
            {
                path: 'ctrlableDeviceList',
                name: 'ctrlableDeviceList',
                component: () => import('@/views/list/ctrlableDeviceList.vue'),
                meta: { title: '可控设备', icon: 'shopping-bag' },
            },


           ]
    },
    {
        path: '/getFace',
        component: Layout,
        redirect: '',
        children: [{
            path: 'getFace',
            name: 'getFace',
            component: () => import('@/views/list/getFace2.vue'),
            meta: { title: '人员识别', icon: 'clipboard-list' }
        },
        ]
    },

    {
        path: '/service',
        component: Layout,
        redirect: '',
        children: [{
            path: 'service',
            name: 'service',
            component: () => import('@/views/list/serviceInfoList.vue'),
            meta: { title: '服务记录', icon: 'clipboard-list' }
         },
        ]
    },
    {
        path: '/userInfo',
        component: Layout,
        redirect: '',
        children: [{
            path: 'userInfo',
            name: 'userInfo',
            component: () => import('@/views/list/userList.vue'),
            meta: { title: '管理员信息', icon: 'clipboard-list' }
        }
        ]
    },

]

const router = new VueRouter({
    routes
})

export default router
