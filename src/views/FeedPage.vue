<script>
import DekstopFeedPage from '../render/dekstop/feedPage.vue'
import MobileFeedPage from '../render/mobile/FeedPage.vue'

import socket from '../socket'

import axios from 'axios';
import dayjs from 'dayjs'

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export default {
    components: {
        DekstopFeedPage,
        MobileFeedPage,
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
    },
    methods: {
        privacyCookie() {
            this.$router.push({
                name: 'feed'
            })
        },
    }
}
</script>


<template>
    <DekstopFeedPage v-if="dekstop" />
    <MobileFeedPage v-if="mobile" />
</template>


<style scoped>
#socket {
    overflow-x: hidden;
}
</style>