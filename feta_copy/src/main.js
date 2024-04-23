import '@assets/wind.css'

// import '../branchesRequest'

import modals from '@modals'
import toast from '@/toast'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './customVaildations'

import App from '@/App.vue'
import router from './router'

import Icons from './icons'

import vPrivilage from '@directives/vPrivilage'
import vFileype from '@directives/vFileype'

import VueApexCharts from 'vue3-apexcharts';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(modals)
app.use(toast)
app.use(VueApexCharts);

app.directive('privilage', vPrivilage)
app.directive('filetype', vFileype)

app.component("h-icon", Icons)

app.mount('#app')
