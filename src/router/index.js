import Vue from 'vue'
import Router from 'vue-router'
import ConfigPage from "@/components/ConfigPage";
import Home_top_first_row from "@/components/Patients_top_first_row";
import Vehicles_left_and_map from "@/components/Vehicles_left_and_map";

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
    {
        path: "/home_vehicles",
        name: 'Patients_left_and_map',
        component: Vehicles_left_and_map
    }
]

const router = new Router({
    routes
})

export default router