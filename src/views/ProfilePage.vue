<script>
import DekstopProfile from '../render/dekstop/ProfilePage.vue'
import MobileProfile from '../render/mobile/profilePage.vue'

import socket from '../socket'

import axios from 'axios';
import dayjs from 'dayjs'

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export default {
    components: {
        DekstopProfile,
        MobileProfile
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
    }
}
</script>


<template>
    <DekstopProfile v-if="dekstop" />
    <MobileProfile v-if="mobile" />
</template>


<style scoped>

</style>