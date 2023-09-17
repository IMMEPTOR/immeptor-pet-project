<script>
import AppMenuSideAccount from '../../components/dekstop/AppMenuSideAccaunt.vue';
import AppProfileElement from '../../components/dekstop/AppProfileElement.vue';
import axios from 'axios';

import { onMounted } from 'vue';
import { useDevice } from 'vue-device-detector'
import { useRouter } from 'vue-router'
export default {
    components: {
        AppMenuSideAccount,
        AppProfileElement
    },
    data() {
        return {
            name: '',
            surname: '',
            token: null,
            admin: false,
        }
    },
    // async beforeRouteEnter(to, fromR, next) {
    //     let token = document.cookie;
    //     let response = await axios.post('/api/configuration/auth/examination/token/user', {
    //         token: token
    //     })

    //     if (response.status == 200) {
    //         next(true)
    //     } else {
    //         next(false)
    //     }
    // },
    // setup() {
    //     let { isMobile, isTablet, isDekstop } = useDevice();
    //     onMounted(() => {
    //         if (isMobile.value) console.log('Мобильное устройство!');
    //         if (isTablet.value) console.log('Планшет');
    //         if (isDekstop.value) console.log('Компьютер');
    //     })

    //     return { isMobile, isTablet, isDekstop };
    // },
    mounted() {
        this.getNameUser();
        
    },
    methods: {
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
                this.surname = data.user.surname
                this.token = data.decoded
                console.log(this.name);

                if (this.token.role >= 2) {
                    this.admin = true
                    console.log('Добро пожаловать, наш Администратор!')
                }
            } else {
                console.log('Ошибка вывода пользователя. Возможно не найден')
            }



        },
        goToAdminPanel() {
            this.$router.push({
                name: 'feedPanel'
            })
        }
    },
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
                    <!-- <p>Помощь</p> -->
                </div>
            </div>
        </div>
    </header>
    <main>
        <AppMenuSideAccount> </AppMenuSideAccount>
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