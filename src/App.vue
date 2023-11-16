<script>
import { RouterView } from 'vue-router'
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:3005';

import { ref, watch, toRef } from 'vue'
import dayjs from 'dayjs'

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

import socket from './socket'

// Компоненты

// Главная страница
export default {
  data() {
    return {
      keyYesCookie: 0,
      keyNoCookie: 1,
      date: null,
    }
  },
  components: {
    RouterView
  },
  // beforeDestroy() {
  //   window.addEventListener('beforeunload', (event) => {
  //     let serverTime = dayjs().utc();
  //     socket.emit('user-disconnect-exit', {
  //       id: this.cookies,
  //       time: serverTime,
  //     })
  //     socket.disconnect();
  //   });
  //   let serverTime = dayjs().utc();
  //   socket.emit('user-disconnect-exit', {
  //     id: this.date,
  //     time: serverTime,
  //   });
  //   socket.disconnect();
  // },
  created() {
    socket.connect();
    setInterval(() => {
      if (document.cookie && this.keyYesCookie == 0) {
        let serverTime = dayjs().utc();
        socket.emit('roomStatusEvent', {
          id: document.cookie,
          time: serverTime,
        });
        this.date = document.cookie;
        this.keyYesCookie = 1;
        this.keyNoCookie = 0;
      } else if (!document.cookie && this.keyNoCookie == 0) {
        let serverTime = dayjs().utc();
        socket.emit('user-disconnect-exit', {
          id: this.date,
          time: serverTime,
        });
        this.$router.push({
          name: 'fe'
        })
        this.keyNoCookie = 1;
        this.keyYesCookie = 0;
      }
    }, 500);
  },
};

</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
