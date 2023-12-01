// // Запросы к серверу
import axios from "axios";
axios.defaults.baseURL = 'https://localhost:8443';

// Работа с датой
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc.js';
import timezone from 'dayjs/plugin/timezone.js'
dayjs.locale('ru');
dayjs.extend(relativeTime);
dayjs.extend(utc)
dayjs.extend(timezone)

// Всё для vue
import { createApp } from 'vue'
import App from './App.vue'
import Titile from './Titile.vue'
import router from './router.js'

// Рендер в HTML
createApp(App).use(router).mount('#app');
createApp(Titile).use(router).mount('#title');