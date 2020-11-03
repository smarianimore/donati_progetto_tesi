import Vue from 'vue'
import Router from 'vue-router'
import Page from "@/components/Page";

Vue.use(Router)

const routes = [
    {
        path: "/home_page",
        name: 'Page',
        component: Page
    }
]

const router = new Router({
    routes
})

export default router