import './assets/main.css'
import TableComponent from './components/TableComponent.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.component('TableComponent', TableComponent);
app.use(createPinia())
app.use(router)

app.mount('#app')
