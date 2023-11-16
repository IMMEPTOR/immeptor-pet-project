<script>
import DekstopChat from '../render/dekstop/ChatsAccountPage.vue'
import MobileChat from '../render/mobile/chatPage.vue'

import socket from '../socket'

import axios from 'axios';
import dayjs from 'dayjs'

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
import { onBeforeUnmount, onMounted, ref } from 'vue';

export default {
    components: {
        DekstopChat,
        MobileChat,
    },
    data() {
        return {
            dekstop: true,
            mobile: false,
        }
    },
    mounted() {
        let userAgent = navigator.userAgent.toLowerCase();
        if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent)) {
            // console.log('мобила')
            this.dekstop = false;
            this.mobile = false;
        } else {
            // console.log('пк')
        }
    },
    beforeDestroy() {
        // Отключение от сервера сокетов при уничтожении компонента
    }
}
</script>


<template>
    <DekstopChat v-if="dekstop" />
    <MobileChat v-if="mobile" />
</template>


<style scoped></style>