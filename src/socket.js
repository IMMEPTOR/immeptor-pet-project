import { io } from 'socket.io-client';
import dayjs from 'dayjs'

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

let socket = io('http://localhost:3010', {
  transports: ['websocket'],
  query: {
    time:  dayjs().utc(), // Передайте свой уникальный идентификатор пользователя
  }
});

export default socket;
