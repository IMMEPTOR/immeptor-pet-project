<script>
import DekstopEditInfo from '../render/dekstop/EditUserDataPage.vue'

import socket from '../socket'

import axios from 'axios';
import dayjs from 'dayjs'

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export default {
    components: {
        DekstopEditInfo,
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
    <DekstopEditInfo v-if="dekstop" />
</template>


<style scoped>

</style>