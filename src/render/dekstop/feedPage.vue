<script>
import axios from 'axios';
import AppTabletFeed from '../../components/dekstop/AppTabletFeed.vue';
export default {
    components: {
        AppTabletFeed,
    },
    data() {
        return {
            element_button_table: null,
            newValue: null,
            title: 'Добро пожаловать!',
            description: `Дорогие пользователи, Мы рады представить вам новый продукт, мессенджер - IMMEPTOR. Со временнем, наша команда будет обновлять, улучшать и добавлять функционал. Следите за нашими новостями в официальной группе ВК и будьте в курсе последних событий внутри нашего проекта!`,
            image: "../../src/assets/img/news_post_for_web.jpg",
            update: false,
            news: true
        }
    },
    mounted() { 
    },
    methods: {
        goToVoinForm() {
            this.$router.push({
                name: 'voin'
            })
        },
        goWentUpdate(newValue) {
            if (newValue == 'update') {
                this.newValue = newValue;
                this.title = 'Alpha 0.3v';
                this.image = '../../src/assets/img/updates_web_product_image.jpg';
                this.description = 'Обновление опубликовано 16.11.2023. Разработанна новая система статусов пользователей, в том числе были исправленны систематизационные ошибки.';
                this.update = true;
                this.news = false;
            }
        },
        goWentNews(newValue) {
            if (newValue == 'news') {
                this.newValue = newValue;
                this.title = 'Добро пожаловать!';
                this.image = '../../src/assets/img/news_post_for_web.jpg';
                this.description = 'Дорогие пользователи, Мы рады представить вам новый продукт, мессенджер - IMMEPTOR. Со временнем, наша команда будет обновлять, улучшать и добавлять функционал. Следите за нашими новостями в официальной группе ВК и будьте в курсе последних событий внутри нашего проекта!';
                this.update = false;
                this.news = true;
            }
        },
        goToRegistrationForm() {
            this.$router.push({
                name: 'registration'
            })
        },
    }
}
</script>

<template>
    <header class="header_container">
        <div class="container_logo_title">
            <p>IMMEPTOR</p>
        </div>
        <div @click="goToVoinForm" class="container_button_login">
            <p>Войти</p>
        </div>
    </header>
    <main>
        <div class="container_quetion_information_product">
            <div class="question qu_one"></div>
            <div class="question qu_two"></div>
            <div class="question qu_three"></div>
            <div class="question qu_four"></div>
            <div class="question qu_five"></div>
            <div class="container_question">
                <div class="container_information_product_description">
                    <p class="title_product">IMMEPTOR</p>
                    <p class="description_product">новый сервис для общения</p>
                </div>
            </div>
            <div class="question qu_back_one"></div>
            <div class="question qu_back_two"></div>
            <div class="question qu_back_three"></div>
            <div class="question qu_back_four"></div>
            <div class="question qu_back_five"></div>
        </div>


        <AppTabletFeed @sendNews="goWentNews" @sendUpdate="goWentUpdate" :title="title" :description="description"
            :image="image" />


        <div class="container_text_to_created_your_account">
            <div class="container_text_to_create">
                <p class="text_task">У вас нет своего аккаунта в IMMEPTOR?</p>
                <p class="text_otv">- Создайте его!</p>
            </div>
        </div>

        <div class="container_question_and_button_to_register">
            <div class="container_centred_design_button">
                <div class="question_under qu_left"></div>
                <p @click="goToRegistrationForm">Зарегестрироваться</p>
                <div class="question_under qu_right"></div>
            </div>
        </div>
    </main>
    <footer>
        <div class="name_company_container">
            <p>IMMEPTOR</p>
            <p><a href="/privacy" target="_blank">Политика конфиденциальности</a></p>
        </div>
        <div class="information_use_web_p">
            <p>Кочетов Ярослав Олегович. IMMEPTOR ©2023️ </p>
        </div>
    </footer>
</template>

<style scoped>
* {
    margin: 0;
}

main {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.header_container {
    background-color: black;
    width: 100%;
    height: 55px;
    display: flex;
    justify-content: space-around;
}

.container_logo_title {
    height: 100%;
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container_logo_title p {
    color: #FFF;
    font-family: 'Inter', sans-serif;
    font-size: 24px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.container_button_login {
    display: flex;
    align-items: center;
    width: auto;
    height: 100%;
}

.container_button_login p {
    background-color: white;
    color: #707070;
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding: 5px 30px;
    border-radius: 7px;
    transition: all 0.1s;
}

.container_button_login p:hover {
    background-color: rgb(233, 233, 233);
    cursor: pointer;
    color: #000;
}

/* стили для окржности первого элемента */

.container_quetion_information_product {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    position: relative;
}

.container_question {
    border: 5px solid black;
    border-radius: 100%;
    height: 350px;
    width: 350px;
    position: relative;
    top: -40px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.container_information_product_description {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

.title_product {
    color: #000;
    font-family: 'Inria Sans', sans-serif;
    font-size: 60px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.description_product {
    color: #000;
    font-family: 'Inria Sans', sans-serif;
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.question {
    background: linear-gradient(90deg, #ee7752, #e73c7e, #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 10s ease infinite;
    transform: translate3d(0, 0, 0);
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}

.qu_one {
    width: 44px;
    height: 44px;
    position: absolute;
    border-radius: 100%;
    top: 32px;
    left: 45px;
    background-color: #CC00FF;
}


.qu_two {
    width: 65px;
    height: 65px;
    position: absolute;
    border-radius: 100%;
    top: 22px;
    left: 345px;
    background-color: #CC00FF;
}

.qu_three {
    width: 108px;
    height: 108px;
    position: absolute;
    border-radius: 100%;
    top: 72px;
    left: 165px;
    background-color: #CC00FF;
}

.qu_four {
    width: 94px;
    height: 94px;
    position: absolute;
    border-radius: 100%;
    top: 162px;
    left: 345px;
    background-color: #CC00FF;
}

.qu_five {
    width: 144px;
    height: 144px;
    position: absolute;
    border-radius: 100%;
    top: 212px;
    left: 40px;
    background-color: #CC00FF;
}

.qu_back_one {
    width: 44px;
    height: 44px;
    position: absolute;
    border-radius: 100%;
    top: 32px;
    right: 45px;
    background-color: #CC00FF;
}

.qu_back_two {
    width: 65px;
    height: 65px;
    position: absolute;
    border-radius: 100%;
    top: 22px;
    right: 345px;
    background-color: #CC00FF;
}

.qu_back_three {
    width: 108px;
    height: 108px;
    position: absolute;
    border-radius: 100%;
    top: 72px;
    right: 165px;
    background-color: #CC00FF;
}

.qu_back_four {
    width: 94px;
    height: 94px;
    position: absolute;
    border-radius: 100%;
    top: 162px;
    right: 345px;
    background-color: #CC00FF;
}

.qu_back_five {
    width: 144px;
    height: 144px;
    position: absolute;
    border-radius: 100%;
    top: 212px;
    right: 40px;
    background-color: #CC00FF;
}

/* таблица новостей и обновлений */

.container_table_news_update {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
}

/* Элемент текста */

.container_text_to_created_your_account {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container_text_to_create {
    width: 80%;
    height: auto;
    margin-top: 30px;
}

.text_task {
    color: #000;
    font-family: 'Inter', sans-serif;
    font-size: 45px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    position: relative;
    left: 40px;
    /* right: 20px; */
}

.text_otv {
    color: #5ED700;
    font-family: 'Inter', sans-serif;
    font-size: 30px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    position: relative;
    left: 80px;
}

/* Элемент с кнопкой для регистрации главной страницы */

.container_question_and_button_to_register {
    width: 100%;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
}

.container_centred_design_button {
    width: 500px;
    height: 500px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}

@-webkit-keyframes rotating

/* Safari and Chrome */
    {
    from {
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    to {
        -webkit-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

@keyframes rotating {
    from {
        -ms-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
    }

    to {
        -ms-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
    }
}

@-webkit-keyframes rotating_two

/* Safari and Chrome */
    {
    from {
        -webkit-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
    }

    to {
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
    }
}

@keyframes rotating_two {
    from {
        -ms-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -webkit-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
    }

    to {
        -ms-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -webkit-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
    }
}

.question_under {
    width: 210px;
    height: 210px;
    /* border-radius: 1000%; */
    -webkit-animation: rotating 20s linear infinite;
    -moz-animation: rotating 20s linear infinite;
    -ms-animation: rotating 20s linear infinite;
    -o-animation: rotating 20s linear infinite;
    animation: rotating 20s linear infinite;
}

.qu_left {
    position: absolute;
    left: 65px;
    top: 100px;

    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100' ry='100' stroke='%23FF00C3FF' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='21' stroke-linecap='square'/%3e%3c/svg%3e");
    border-radius: 100px;
}

.container_centred_design_button p {
    color: #FFF;
    font-family: 'Inter', sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    border-radius: 13px;
    background: #FF2C2C;
    padding: 15px 30px;
    z-index: 1;
    transition: all 0.2s;
}

.qu_right {
    position: absolute;
    right: 65px;
    bottom: 100px;

    -webkit-animation: rotating_two 20s linear infinite;
    -moz-animation: rotating_two 20s linear infinite;
    -ms-animation: rotating_two 20s linear infinite;
    -o-animation: rotating_two 20s linear infinite;
    animation: rotating_two 20s linear infinite;
    background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='100' ry='100' stroke='%230005FFFF' stroke-width='4' stroke-dasharray='6%2c 14' stroke-dashoffset='21' stroke-linecap='square'/%3e%3c/svg%3e");
    border-radius: 100px;
}

.container_centred_design_button p:hover {
    background: #fff12c;
    cursor: pointer;
    color: black;
}

footer {
    width: 100%;
    height: 200px;
    background-color: #000000;
    display: flex;
    justify-content: space-between;
}

.name_company_container {
    width: auto;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 70px;
}

.name_company_container p {
    color: #FFF;
    font-family: 'Kanit', sans-serif;
    font-size: 34px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding: 5px 0 0 5px;
}

.information_use_web_p {
    width: auto;
    height: 100%;
    display: flex;
    align-items: end;
}

.information_use_web_p p {
    color: #FFF;
    font-family: 'Kanit', sans-serif;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding: 0 10px 10px 0;
}

.name_company_container a {
    color: white;
    text-decoration: none;
    font-size: 15px;
    transition: all 0.2s;
}
.name_company_container a:hover {
    color: rgb(202, 202, 202);
}
</style>