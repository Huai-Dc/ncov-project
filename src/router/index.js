import Vue from 'vue'
import VueRouter from 'vue-router'
import { VLayout } from '../views/layout/index'

Vue.use(VueRouter)

const constantRouterMap = [
    // {
    //     path: '*',
    //     redirect: '/dynamic',
    //     hidden: true,
    // },
    {
        path: "",
        component: VLayout,
        redirect: 'dynamic',
        children: [{
            path: 'dynamic',
            name: 'dynamic',
            component: () => import('@/views/ncov/Dynamic'),
            hidden: false,
            meta: {
                title: "疫情动态"
            }
        }]
    },
    {
        path: "/simulation",
        component: VLayout,
        redirect: 'simulation',
        children: [{
            path: 'simulation',
            name: 'simulation',
            component: () => import('@/views/ncov/Simulation'),
            hidden: false,
            meta: {
                title: "疫情模拟"
            }
        }]
    }
]

const router = new VueRouter({
    scrollBehavior: () => ({y: 0}),
    routes: constantRouterMap
})

export {constantRouterMap}
export default router
