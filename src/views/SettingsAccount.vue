<script>
import SettingsPage from '../render/dekstop/SettingsPage.vue';

import socket from '../socket'

import axios from 'axios';
import dayjs from 'dayjs'

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
export default {
    data() {
        return {
        }
    },
    components: {
        SettingsPage,
    },
    mounted() {
        window.addEventListener('beforeunload', (event) => {
            let serverTime = dayjs().utc();
            socket.emit('user-disconnect-exit', {
                id: document.cookie,
                time: serverTime,
            })
            socket.disconnect();
        });
    },
}
</script>

<template>
    <SettingsPage />
</template>

<style scoped></style>