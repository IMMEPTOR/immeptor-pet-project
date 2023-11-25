<script>
import SettingsPage from '../render/dekstop/SettingsPage.vue';

import socket from '../socket'

import axios from 'axios';
import dayjs from 'dayjs'

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

import { onBeforeUnmount, onMounted, ref } from 'vue';
export default {
    data() {
        return {
            dekstop: false,
            mobile: false,
        }
    },
    components: {
        SettingsPage,
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
    },
}
</script>

<template>
    <SettingsPage />
</template>

<style scoped></style>