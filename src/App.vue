<script>
import { RouterView } from 'vue-router'
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:3005';

// Компоненты

// Главная страница
export default {
  components: {
    RouterView
  }
};

</script>

<template>
  <router-view></router-view>
</template>

<style scoped></style>
