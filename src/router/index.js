import { createRouter, createWebHashHistory } from 'vue-router'

import HomeView from '../pages/home-view.vue'
import ContactIndex from '../pages/contact-index.vue'
import ContactDetails from '../pages/contact-details.vue'
import ContactEdit from '../pages/contact-edit.vue'
import SignUp from '../pages/sign-up.vue'
import Login from '../pages/login.vue'


const routerOptions = {
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: HomeView,
        },
        {
            path: '/contact',
            component: ContactIndex,
        },
        {
            path: '/contact/:_id',
            component: ContactDetails,
        },
        {
            path: '/contact/edit/:_id?',
            component: ContactEdit,
        },
        {
            path: '/login',
            component: Login,
        },
                {
            path: '/sign-up',
            component: SignUp,
        },
        {
            path: '/statistic',
            component: () => import('../pages/statistic.vue'),
        },
    ],
}
const router = createRouter(routerOptions)

export default router
