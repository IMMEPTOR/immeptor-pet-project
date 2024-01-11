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
            dekstop: false,
            mobile: false,
        }
    },
    mounted() {
        let userAgent = navigator.userAgent.toLowerCase();
        if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent)) {
            // console.log('мобила')
            this.mobile = true;
            
        } else {
            // console.log('пк')
            this.dekstop = true;
        }
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