<script>
import DekstopRigister from '../render/dekstop/RegistrationPage.vue'

import socket from '../socket'

import axios from 'axios';
import dayjs from 'dayjs'

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export default {
    components: {
        DekstopRigister,
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
            this.mobile = false;
            
        } else {
            // console.log('пк')
            this.dekstop = true;
        }
    }
}
</script>


<template>
    <DekstopRigister v-if="dekstop" />
</template>


<style scoped></style>