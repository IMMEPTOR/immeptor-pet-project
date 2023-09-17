<script>
export default {
    data() {
        return {

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
    }
}
</script>


<template>
    <header>
        <div class="container_logo_information">
            <p>IMMEPTOR</p>
        </div>
        <div @click="goToVoinForm" class="button_container_login">
            <p>Войти</p>
        </div>
    </header>
    <main>
        <div class="container_info_feed_one">
            <div class="quetion_background"></div>
            <div class="container_text_info_feed">
                <div class="one_words_text_of_feed_page">
                    <p>ОБЩАЙТЕСЬ</p>
                </div>
                <div class="two_words_text_of_feed_page">
                    <p>В НОВОМ</p>
                </div>
                <div class="three_words_text_of_feed_page">
                    <p>СЕРВИСЕ</p>
                </div>
            </div>
        </div>
        <div class="container_text_description_information_product">
            <p><span id="name_company_in_description">IMMEPTOR</span> - абсолютно бесплатный проект для общения со своими близкими, друзьями и родственниками.</p>
        </div>
        <div class="container_last_quetion">
            <div class="quetion_last_element_on_age"></div>
        </div>
    </main>
    <footer>

    </footer>
</template>

<style scoped>
* {
    margin: 0;
}

header {
    width: 100%;
    background-color: black;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: relative;
    z-index: 2;
}

.container_logo_information {
    width: 35%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.container_logo_information p {
    color: rgb(255, 255, 255);
    font-size: 26px;
    /* line-height: 15px; */
}

.button_container_login {
    width: auto;
    height: 100%;
    /* background-color: yellow; */
    display: flex;
    align-items: center;
    justify-content: center;
}

.button_container_login p {
    background-color: rgb(255, 255, 255);
    padding: 5px 30px;
    border-radius: 5px;
    transition: all 0.1s;
    font-size: 15px;
}

.button_container_login p:hover {
    background-color: rgb(182, 182, 182);
    cursor: pointer;
}

main {
    width: 100%;
    height: 100vh;
    /* background-color: aqua; */
}

.container_info_feed_one {
    /* background-color: yellow; */
    height: 35%;
    width: 100%;
    position: relative;
}

.quetion_background {
    background-color: #F57676;
    width: 260px;
    height: 260px;
    border-radius: 100%;
    position: absolute;
    left: -50px;
    top: -27px;
}

.container_text_info_feed {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: center;
    z-index: 1;
    flex-direction: column;
}

.one_words_text_of_feed_page {
    color: #000;
    font-family: 'Noto Sans', sans-serif;
    font-size: 40px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    width: 100%;
}

.one_words_text_of_feed_page {
    padding-left: 120px;
}

.two_words_text_of_feed_page {
    color: #FBFF42;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-family: Noto Sans;
    font-size: 40px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    font-family: 'IBM Plex Sans', sans-serif;
    width: 100%;
}

.two_words_text_of_feed_page {
    padding-left: 60px;
}

.three_words_text_of_feed_page {
    color: #FFF;
    text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    font-size: 40px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    font-family: 'IBM Plex Sans', sans-serif;

    width: 100%;
}

.container_text_description_information_product {
    width: 100%;
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.container_text_description_information_product p {
    width: 80%;

    color: #000;
    font-family: 'PT Sans', sans-serif;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding-top: 20px;
}

#name_company_in_description {
    font-weight: bold;
}

.container_last_quetion {
    width: 100%;
    height: 45%;
    position: relative;
}

.quetion_last_element_on_age {
    width: 220px;
    height: 220px;
    border-radius: 100%;
    background-color: #FF5C00;
    position: absolute;
    right: -30px;
}
</style>