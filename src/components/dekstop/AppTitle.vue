<script>
export default {
    data() {
        return {
            title: '⠀'
        }
    },
    mounted() {
        setInterval(this.getTitle, 1)
    },
    methods: {
        getTitle() {
            if (this.$route.path == '/') {
                this.title = 'Главная'
            } else if (this.$route.path == '/profile') {
                this.title = 'Профиль'
            } else if (this.$route.path == '/chats') {
                this.title = 'Мессенджер'
            } else if (this.$route.path == '/registration') {
                this.title = 'Регистрация'
            } else if (this.$route.path == '/voin') {
                this.title = 'Вход'
            } else if (this.$route.path == '/feed') {
                this.title = 'Главная'
            } else if (this.$route.path == '/admin/aplication/control') {
                this.title = 'Панель управления'
            } else if (this.$route.path == '/admin/control/edited') {
                this.title = 'Редактирование данных пользователя'
            } else if (this.$route.path == '/settings') {
                this.title = 'Настройки'
            } else if (this.$route.path == '/privacy') {
                this.title = 'Политика конфиденциальности'
            }
        }
    }
}
</script>

<template>
    <title>{{ title }}</title>
</template>

<style scoped></style>