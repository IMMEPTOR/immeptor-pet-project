<script>
import DekstopAuthAcc from '../render/dekstop/AutorizateAccauntPage.vue'
import MobileAuthAcc from '../render/mobile/AuthFeedPageAccount.vue'

import socket from '../socket'

import axios from 'axios';
import dayjs from 'dayjs'

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export default {
    components: {
        DekstopAuthAcc,
        MobileAuthAcc,
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

        window.addEventListener('beforeunload', (event) => {
            let serverTime = dayjs().utc();
            socket.emit('user-disconnect-exit', {
                id: document.cookie,
                time: serverTime,
            })
            socket.disconnect();
        });
    }
}
</script>


<template>
    <DekstopAuthAcc v-if="dekstop"/>
    <MobileAuthAcc v-if="mobile" />
</template>


<style scoped>

</style>