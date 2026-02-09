import './assets/main.css'
import TableComponent from './components/TableComponent.vue'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { vFocus, vCapitalize} from '@/composables/custom_directives.js'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import 'unfonts.css'

const app = createApp(App)

const vuetify = createVuetify({
  ssr: true,
  components,
  directives,
})

app.component('TableComponent', TableComponent);
app.use(createPinia())
app.use(router)
app.directive('focus', vFocus)
app.directive('capitalize', vCapitalize)
app.use(vuetify)
app.mount('#app')
