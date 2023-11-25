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

export default {
    components: {
        DekstopChat,
        MobileChat,
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
}
</script>


<template>
    <DekstopChat v-if="dekstop" />
    <MobileChat v-if="mobile" />
</template>


<style scoped></style>