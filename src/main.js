// ============== For Css ==============
import './assets/css/main.css'

// ============== For Utils ==============
import {} from './utils'
// import { Game, UI, KeyboardI } from './classes'; // Import classes here
// let gameGame = new Game();
// let gameGam = new UI();
// let gameGa = new KeyboardI();

// ============== For Rest ==============
import AOS from 'aos'
import 'aos/dist/aos.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persistedstate'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue' // to use it: <div v-auto-animate class="container"></div>

import App from './App.vue'
import router from './router'

// ============== For Create ==============
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPersist)
app.use(pinia)
// app.use(AOS.init())
app.use(router)
app.use(autoAnimatePlugin)

// mount the app
app.mount('#app')
