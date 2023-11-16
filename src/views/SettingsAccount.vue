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
        }
    },
    components: {
        SettingsPage,
    },
    mounted() {
    },
}
</script>

<template>
    <SettingsPage />
</template>

<style scoped></style>