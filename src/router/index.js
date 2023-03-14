import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Postad from '../views/Postad.vue'
import Register from '../views/Register.vue'
import { scroller } from 'vue-scrollto/src/scrollTo';
import Notfound from "../components/Notfound.vue"
import Api from '../apis/Api'

const routes = [{
        path: '/',
        name: 'Home',
        component: Home
    },
    { path: '/:pathMatch(.*)*', name: 'Notfound', component: Notfound },
    {
        path: '/ads',
        name: 'Browseads',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "Browseads" */ '../views/Browseads.vue')
    },

    {
        path: '/ads/:slug',
        name: 'Viewad',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "Viewad" */ '../views/Viewad.vue')
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
        meta: { guestOnly: true }
    },
    {
        path: '/auth/google/account',
        name: 'GoogleAuth',
        component: Login,
        meta: { guestOnly: true }
    },
    {
        path: '/Postad',
        name: 'Postad',
        component: () =>
            import ( /* webpackChunkName: "PostAd" */ '../views/Postad.vue'),
        meta: { authOnly: true }
    },
    {
        path: '/continue_reg',
        name: 'Continue',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "continue" */ '../views/Continueregisteration.vue'),
        meta: { authOnly: true }
    },
    {

        path: '/:username/profile',
        name: 'Userprofile',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "userprofile" */ '../views/Userprofile.vue'),


    },
    {

        path: '/profile/edit',
        name: 'Editprofile',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import ( /* webpackChunkName: "editprofile" */ '../views/Editprofile.vue'),
        meta: { authOnly: true }

    },
    {
        path: '/Register',
        name: 'Register',
        component: Register,
        meta: { guestOnly: true }
    },
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})


function isLoggedIn() {
    return localStorage.getItem("auth");
}

router.beforeEach((to, from, next) => {
    if (to.name) {
        // Start the route progress bar.

        store.commit('setshowLoadingbar', true)


    } else {
        next()
    }

    if (to.matched.some(record => record.meta.authOnly)) {

        // if not, redirect to login page.
        if (!isLoggedIn()) {
            next({
                path: "/login",
                query: { redirect: to.fullPath }
            });
        } else {

            next();
        }
    } else if (to.matched.some(record => record.meta.guestOnly)) {

        // if not, redirect to login page.
        if (isLoggedIn()) {
            next({
                path: "/",
                query: { redirect: to.fullPath }
            });
        } else {
            next();
        }
    } else {
        next();
    }
});



router.afterEach((to, from) => {
    // Stop the route progress bar.

    store.commit('setshowLoadingbar', false)
    if (from.name == 'Viewad' && to.name == 'Browseads') {

    } else {
        const firstScrollTo = scroller()
        var options = {
            container: 'body',
            easing: 'ease-in-out',
            lazy: false,
            offset: 0,
            force: true,
            cancelable: true,

            x: false,
            y: true
        }

        firstScrollTo(200, options)

    }






})



export default router