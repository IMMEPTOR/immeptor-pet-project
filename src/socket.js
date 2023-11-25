import { io } from 'socket.io-client';
import dayjs from 'dayjs'

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

let cook = document.cookie;

let socket = io('http://localhost:3010', {
  transports: ['websocket'],
  query: {
    time: dayjs().utc(), // Передайте свой уникальный идентификатор пользователя
    cookie: document.cookie,
  }
});
// если пользователь остается в сети изначально с куками, то не обновляется время!!! Куки конечно хорошо, но тайминг нет!
setInterval(() => {
  if (cook !== document.cookie) {
    socket = io('http://localhost:3010', {
      transports: ['websocket'],
      query: {
        time: dayjs().utc(), // Передайте свой уникальный идентификатор пользователя
        cookie: document.cookie,
      }
    });
    cook = document.cookie;
  }
  
}, 500)

export default socket;
