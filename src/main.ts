import { createApp } from 'vue'

import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'
import App from './App.vue'
import router from './router.js'
import vPrivilage from './directives/vPrivilage'
import vFocus from './directives/vFocus'
import './assets/main.css'
import toast from "@/toast";

import DashboardLayout from './components/DashboardLayout.vue'
import EmptyLayout from './components/EmptyLayout.vue'

const app = createApp(App)

app.component('DefaultLayout', DashboardLayout)
app.component('EmptyLayout', EmptyLayout)
const pinia = createPinia()
pinia.use(piniaPersist)
app.use(pinia)
app.use(router)
app.use(toast);
app.directive('privilage', vPrivilage)
app.directive('focus', vFocus)
app.mount('#app')
