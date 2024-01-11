<script>
import AppTabletFeed from '../../components/mobile/AppTablet.vue';
export default {
    data() {
        return {
            title: "rererererere",
            description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Excepturi dolore cumque laudantium repellendus accusamus fuga vitae est similique obcaecati autem alias necessitatibus, labore, mollitia molestiae minus praesentium saepe enim? Deserunt? Fugiat illo esse distinctio dignissimos repellendus non quaerat itaque beatae laudantium laborum. Voluptas, excepturi. Architecto iure illum similique libero laboriosam eligendi sunt dicta quo soluta quaerat. Tempore, laborum. Magnam, dolorem?",
            image: "../../src/assets/img/news_post_for_web.jpg",
        }
    },
    components: {
        AppTabletFeed,
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
        GoToPagePrivacy() {
            this.$router.push({
                name: 'privacy'
            })
        }
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
        <div class="container_text_preview_descriptoin">
            <div class="ui_textds_elements">
                <p>Слушай.</p>
                <p>Общайся.</p>
                <p>Делись.</p>
            </div>
            <div class="ui_textds_elements aviliable_corp_fonts">
                <p>В</p>
            </div>
            <p class="text_conteiner">IMMEPTOR</p>
        </div>


        <AppTabletFeed @sendNews="goWentNews" @sendUpdate="goWentUpdate" :title="title" :description="description"
            :image="image" />

        <div class="container_button_going">
            <div @click="goToVoinForm" class="button_action">
                <p>Войти</p>
            </div>
            <div class="button_action">
                <!-- <p>Зарегестрироваться</p> -->
            </div>
        </div>
    </main>
    <footer>
        <div class="container_link_and_info">
            <div class="container_logo_footer">
                <p><img src="../../assets/img/logo.png" alt=""> MMEPTOR</p>
            </div>
            <div class="container_link_action_go_documents">
                <a href="/privacy">Политика конфиденциальности</a>
                <!-- <p>Пользовательское соглашение</p> -->
            </div>
            <div class="container_description_owner_www">
                <p>Кочетов Ярослав Олегович. IMMEPTOR ©2023</p>
            </div>
        </div>
    </footer>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans&family=Kanit&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Fira+Sans&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');


* {
    margin: 0;
}

header {
    width: 100%;
    background-color: #000;
    height: 55px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: relative;
    z-index: 2;
    font-family: 'Fira Sans', sans-serif;
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
    height: auto;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 70px;
    gap: 70px;
    padding-bottom: 70px;
}

.container_text_preview_descriptoin {
    width: 200px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    /* position: relative; */
}

.ui_textds_elements {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 21px;
    font-weight: 500;
    gap: 7px;
    font-family: 'Inter', sans-serif;
}

.aviliable_corp_fonts {
    /* font-weight: 555; */
    font-size: 24px;
}

.text_conteiner {
    position: absolute;
    /* top: 0px; */
    left: 0;
    right: 0;
    font-size: 50px;
    text-align: center;

    color: #FFF;

    text-align: center;
    /* font-family: Inter; */
    font-size: 60px;
    font-style: normal;
    font-weight: 700;
    line-height: 119.813%;
    /* 71.888px */
    letter-spacing: 6px;
    /* text-shadow: 1px 1px 1px #000; */
    /* outline: 1px solid; */
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
    font-family: 'Kanit', sans-serif;
    z-index: -1;
    opacity: 20%;
}

.container_button_going {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.button_action {
    background-color: red;
    color: #FFF;
    width: 200px;
    text-align: center;
    border-radius: 11px;
    font-weight: 600;
}

.button_action p {
    padding: 18px 0;

    font-family: 'Fira Sans', sans-serif;
}

.button_action:hover {
    background-color: yellow;
    color: black;
    transition: all 0.3s;
    cursor: pointer;
}

footer {
    background-color: #000;
    color: white;
    padding: 10px 0;
}

.container_link_and_info {
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;
}

.container_logo_footer {
    text-align: center;
    position: relative;
    right: 17px;
}


.container_logo_footer img {
    width: 56px;
    /* height: 53px; */
    position: relative;
    left: 17px;
    /* bottom: 1px; */
}

.container_logo_footer p {
    display: flex;
    align-items: center;
    justify-content: center;
    /* flex-direction: column; */
    font-size: 30px;
    font-family: 'Fira Sans', sans-serif;
}

.container_link_action_go_documents {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-family: 'Kanit', sans-serif;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    font-size: 15px;
    gap: 10px;
}

.container_link_action_go_documents a {
    color: white;
    text-decoration: none;
    transition: all 0.3s;
}

.container_link_action_go_documents a:hover {
    color: rgb(206, 206, 206);
}

.container_description_owner_www {
    text-align: center;
    font-family: 'Kanit', sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 1.5px;
}
</style>