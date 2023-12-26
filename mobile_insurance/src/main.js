import '@assets/wind.css'

import modal from '@customizer/modal-x'
import toast from '@/toast' 
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './customVaildations'

import App from '@/App.vue'
import router from './router'

import Icons from './icons'

import VueApexCharts from 'vue3-apexcharts';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(toast)
app.use(modal)
app.use(VueApexCharts);

app.component("h-icon", Icons)

app.mount('#app')
