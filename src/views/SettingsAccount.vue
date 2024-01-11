<script>
import SettingsDekstop from '../render/dekstop/SettingsPage.vue';
import SettingsMobile from '../render/mobile/SettingsAccountPage.vue';

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
        SettingsDekstop,
        SettingsMobile
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
    <SettingsDekstop v-if="dekstop" />
    <SettingsMobile v-if="mobile" />
</template>

<style scoped></style>