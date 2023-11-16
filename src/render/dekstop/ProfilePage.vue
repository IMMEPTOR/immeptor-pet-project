<script>
import AppMenuSideAccount from '../../components/dekstop/AppMenuSideAccaunt.vue';
import AppProfileElement from '../../components/dekstop/AppProfileElement.vue';
import { onMounted } from 'vue';
import { useDevice } from 'vue-device-detector'
import { useRouter } from 'vue-router'
import axios from 'axios';
import socket from '../../socket'
import AppTabletFeed from '../../components/dekstop/AppTabletFeed.vue';
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone'; 

dayjs.extend(utc);
dayjs.extend(timezone);
export default {
    components: {
        AppMenuSideAccount,
        AppProfileElement
    },
    data() {
        return {
            element_button_table: null,
            newValue: null,
            title: 'Добро пожаловать!',
            description: `Дорогие пользователи, Мы рады представить вам новый продукт, мессенджер - IMMEPTOR. Со временнем, наша команда будет обновлять, улучшать и добавлять функционал. Следите за нашими новостями в официальной группе ВК и будьте в курсе последних событий внутри нашего проекта!`,
            image: "../../src/assets/img/news_post_for_web.jpg",
            update: false,
            news: true,
            token: null,
            name: '',
            surname: '',
            admin: false,
        }
    },
    async beforeRouteEnter(to, fromR, next) {
        let token = document.cookie;
        let response = await axios.post('/api/configuration/auth/examination/token/user', {
            token: token
        })
        if (response.status == 200) {
            next(true)

        } else {
            next(false)
        }
    },
    mounted() {
        this.perfAuth();
        this.getNameUser();
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
                this.title = 'Обновление Alpha 0.2v';
                this.image = '../../src/assets/img/updates_web_product_image.jpg';
                this.description = 'Обновление опубликовано 16.10.2023. Были добавлены настройки и оптимизированы внутренние системы продукта, а также исправлены баги.';
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
        async perfAuth() {
            let token = document.cookie;
            let response = await axios.post('/api/gettoken', {
                token: token
            })
            if (response.data.status == 100) {
                document.cookie = "cookieName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
                if (!document.cookie) {
                    this.$router.push({
                        name: 'fe'
                    })
                }
            } else if (response.data.status == 105) {
                this.token = response.data.decoded;
                if (this.token.role >= 2) {
                    this.admin = true;
                }
            }
        },
        async getNameUser() {
            let token = document.cookie;
            let response = await axios.post('/api/configuration/auth/examination/token/user', {
                token: token
            })
            let data = response.data;
            if (response.data.status == 100) {
                document.cookie = "cookieName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
                if (!document.cookie) {
                    this.$router.push({
                        name: 'fe'
                    })
                }
            } else if (response.data.status == 105) {
                this.name = data.user.name;
                this.surname = data.user.surname;
                this.token = data.decoded;
                if (this.token.role >= 2) {
                    this.admin = true;
                }
            }
        },
        goToAdminPanel() {
            this.$router.push({
                name: 'feedPanel'
            })
        },
    }
}
</script>

<template>
    <header>
        <div class="feedHeaderCont">
            <div class="nameLogoHeader">
                <div class="nameLogo">
                    <p>IMMEPTOR</p>
                </div>
            </div>
            <div class="button_ui_header_container">
                <div v-if="admin" @click="goToAdminPanel" class="button_ui_header">
                    <p>Панель Управления</p>
                </div>
                <div class="button_ui_header">
                </div>
            </div>
        </div>
    </header>
    <main>
        <AppMenuSideAccount :key="token" > </AppMenuSideAccount>
        <AppProfileElement :firstName="name" :lastName="surname" />
    </main>
</template>

<style scoped>
main {
    background-color: rgb(224, 190, 255);
    width: 100%;
    height: 100vh;
    display: flex;
}

/* поисковая строка */
.feedHeaderCont {
    width: 100%;
    height: 55px;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 200px;
}

.nameLogoHeader {
    display: flex;
    align-items: center;
    gap: 150px;
}

.nameLogo p {
    color: white;
    font-size: 28px;
    font-family: 'Inter', sans-serif;
}

.inputSearchHeader {
    display: flex;
    flex-direction: column;
    justify-content: start;
    width: 100%;
}

.element_inputHeaderSearch input {
    width: 250px;
    height: 25px;
    border-radius: 5px;
    background-color: #fff;
    border: none;
}

.element_inputHeaderSearch input:focus-visible {
    outline: none;
    border: none;
}

.containerPositionSearchUser {
    position: relative;
    width: 100%;
    z-index: 1;
}

.elemTakeUser {
    position: absolute;
    top: 14px;
    color: rgb(255, 255, 255);
    width: 100%;
}

.elemTakeUser ul {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    border-radius: 0 0 10px 10px;
    padding: 0;
    background-color: #ebb19f;
    -webkit-box-shadow: 0px 0px 8px 3px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 0px 0px 8px 3px rgba(34, 60, 80, 0.2);
    box-shadow: 0px 0px 8px 3px rgba(34, 60, 80, 0.2);
}

.li_search {

    width: 100%;
    list-style-type: none;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    color: #4d4c4c;
    font-weight: 500;
    font-size: 15px;
    font-family: 'Titillium Web', sans-serif;
}

.li_search:last-child {
    border-radius: 0 0 10px 10px;
}

.li_search:hover {
    background-color: #ca9788;
    cursor: default;
}

.button_ui_header_container {
    display: flex;
    align-items: center;
    gap: 50px;
    font-family: 'Yanone Kaffeesatz', sans-serif;
    font-size: 15px;
}

.button_ui_header {
    width: auto;
    /* color: ; */
    background-color: #fff;
    border-radius: 5px;
    transition: all 0.2s;
}

.button_ui_header:hover {
    background-color: #e2e2e2;
    cursor: pointer;
}

.button_ui_header p {
    margin: 5px 10px;
}
</style>