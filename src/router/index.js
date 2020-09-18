import Vue from 'vue'
import Router from 'vue-router'
import ConfigPage from "@/components/ConfigPage";
import Home_top_first_row from "@/components/Home_top_first_row";

Vue.use(Router)

const routes = [
    {
        path: "/",
        name: 'ConfigPage',
        component: ConfigPage
    },
    {
        path: "/home_patients",
        name: 'Home_top_first_row',
        component: Home_top_first_row
    },
]

const router = new Router({
    routes
})

export default router