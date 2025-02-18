import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {
                title: 'Home | testType v2'
            }
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutView.vue'),
            meta: {
                title: 'About | testType v2'
            }
        },
        {
            path: '/setting',
            name: 'setting',
            component: () => import('../views/SettingView.vue'),
            meta: {
                title: 'Settings | testType v2'
            }
        }
    ]
})

router.beforeEach((to, from) => {
    document.title = to.meta?.title ?? 'testType v2'
})

export default router
