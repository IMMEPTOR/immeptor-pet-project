<script>
import { RouterView } from 'vue-router'
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:3005';
import AppTitle from './components/dekstop/AppTitle.vue'
// Главная страница
export default {
    components: {
        AppTitle,
    }
};

</script>

<template>
    <AppTitle />
</template>

<style scoped></style>
