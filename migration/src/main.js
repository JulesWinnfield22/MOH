import '@assets/wind.css'

import modals from '@modals'
import toast from '@/toast'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import './customVaildations'

import App from '@/App.vue'
import router from './router'

import Icons from './icons'

import vPrivilage from '@directives/vPrivilage'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(modals)
app.use(toast)

app.directive('privilage', vPrivilage)

app.component("icon", Icons)

app.mount('#app')
