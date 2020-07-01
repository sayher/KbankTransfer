/* eslint-disable */
const routes = [
    {
        path: '/',
        redirect: 'dashboard'
    },
    {
        path: '/',
        component: () => import('_c/main/home.vue'),
        meta: { title: 'Home', requiresAuth: true },
        children: [
            {
                path: '/dashboard',
                component: () => import('@/views/dashboard/dashboard.vue'),
                meta: { title: 'Home'}
            },
            {
                path: '/transfer',
                name:'transfer',
                component: () => import('@/views/transfer/transfer.vue'),
                meta: { title: 'Transfer KB' }
            },
            {
                path: '/statement',
                name:'statement',
                component: () => import('@/views/statement/statement.vue'),
                meta: { title: 'Statement' }
            },
            {
                path: '/reverttransection',
                name:'reverttransection',
                component: () => import('@/views/reverttransection/reverttransection.vue'),
                meta: { title: 'Revert transection' }
            }, 
            // {
            //     path: '/test',
            //     component: () => import('@/views/form/form.vue'),
            //     meta: { title: 'test' }
            // },        
        ]
    },
    {
        path: '/login',
        name:'login',
        component: () =>import('@/views/login/login.vue'),
        meta: {title: 'Login'}
    }
]
export default routes
