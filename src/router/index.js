import Vue from "vue";
import Router from "vue-router";
import {beforeEach, afterEach} from './interceptor'

Vue.use(Router);
const importPage = view => () => import(/* webpackChunkName: "p-[request]" */ `@/views/${view}.vue`);
const constRoutes = [

    {

        path: "/",
        redirect: "/default/map"

    },
    {
        name: "login",
        path: "/login",
        component: importPage("Login")

    },

    {
        name: 'default',
        path: '/default',
        redirect: "/default/map",
        component: importPage("Index"),
        children: [{
            path: "map",
            name: "map",
            component: importPage('Map'),
            meta: {title: '地图展示', url: '/default/map', id: "menu_01"}

        }]
    },
    {

        path: "*",
        redirect:'/default'

    }
]


const createConstRouter = () => new Router({
    mode: 'history',
    routes: constRoutes
})

const router = createConstRouter()

export function createDynamicRoutes(urlMeta) {
    return [{
        name: 'index',
        path: '/index',
        component: importPage("Index"),
        children: [

            {
                path: 'users',
                name: 'users',
                component: importPage('Users'),
                meta: urlMeta["/index/users"]

            },
            {
                path: 'usergroup',
                name: 'usergroup',
                component: importPage('UserGroup'),
                meta: urlMeta["/index/usergroup"]
            },
            {
                path: 'permits',
                name: 'permits',
                component: importPage('Permits'),
                meta: urlMeta["/index/permits"]
            },
            {
                path: 'statics',
                name: 'statics',
                component: importPage('Statics'),
                meta: urlMeta["/index/statics"]
            },
            {
                path: '*',
                name: 'notfound',
                component: importPage('View404'),
                meta:{title:"未发现资源"}
            }
        ]
    }
    ];
}

export function resetRouter() {
    let newRouter = createConstRouter();
    router.matcher = newRouter.matcher;
}
router.beforeEach(beforeEach)
router.afterEach(afterEach)
export default router
