import './assets/main.css'

import {} from './utils'
// import { Game, UI, KeyboardI } from './classes'; // Import classes here
// let gameGame = new Game();
// let gameGam = new UI();
// let gameGa = new KeyboardI();

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
