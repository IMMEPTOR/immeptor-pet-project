<script>
import DekstopLogin from '../render/dekstop/LoginPage.vue'
import MobileLogin from '../render/mobile/LoginPage.vue'

import socket from '../socket'

import axios from 'axios';
import dayjs from 'dayjs'

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export default {
    components: {
        DekstopLogin,
        MobileLogin,
    },
    data() {
        return {
            dekstop: true,
            mobile: false,
            key: 0,
        }
    },
    mounted() {
        this.key = 0;
        let userAgent = navigator.userAgent.toLowerCase();
        if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent)) {
            // console.log('мобила')
            this.dekstop = false;
            this.mobile = false;
        } else {
            // console.log('пк')
        }
    }
}
</script>


<template>
    <DekstopLogin v-if="dekstop" />
    <MobileLogin v-if="mobile" />
</template>


<style scoped></style>