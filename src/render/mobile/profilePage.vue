<script>
import UiMenuBottom from '../../components/mobile/UiMenuBottom.vue';
import axios from 'axios';

import { onMounted } from 'vue';
import { useDevice } from 'vue-device-detector'
import { useRouter } from 'vue-router'
export default {
    components: {
        UiMenuBottom,
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
        goToSettings() {
            this.$router.push({
                name: 'settings'
            })
        },
    },
}
</script>

<template>
    <main>
        <div class="container_profile">
            <div class="container_information">
                <div class="image_avatar_user_container">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPo90FumZNXz_0Xj_JdzZ0SWEMpP55D05a-A&usqp=CAU"
                        alt="">
                </div>
                <div class="container_name_and_surname">
                    <p class="information_user"> {{name}} {{surname}}</p>
                    <div @click="goToSettings()" class="ui_button_action_to_settings">
                        <img class="button_exit" src="../../assets/img/settingsMobile.png">
                    </div>
                </div>
            </div>
        </div>
        <UiMenuBottom />
    </main>
</template>

<style scoped>
* {
    margin: 0;
}
main {
    background-color: #E0BEFF;
    width: 100vw;
    height: 100vh;
    position: relative;
}

.container_profile {
    background-color: #FFCEFD;
    width: 100%;
    height: 150px;
    border-radius: 0 0 10px 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.image_avatar_user_container {
    width: 120px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: start;
    padding-left: 7px;
}

.image_avatar_user_container img {
    width: 120px;
    height: 120px;
    border-radius: 8px;
}

.container_name_and_surname {
    flex-grow: 1;
    height: 100%;
    display: flex;
    /* justify-content: space-around; */
    align-items: start;
    flex-direction: column;
    gap: 40px;
    padding-top: 12px;
}

.information_user {
    color: #000;
    font-family: 'Inter', sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 550;
    line-height: normal;
}

.container_information {
    width: 96%;
    height: 120px;
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 15px;
}

.ui_button_action_to_settings {
    width: 48px;
    height: 48px;
    background-color: #F8B3B3;
    border-radius: 8px;
    transition: all 0.1s;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}
.ui_button_action_to_settings img {
    width: 32px;
    height: 32px;
    opacity: 40%;
}

.ui_button_action_to_settings:hover {
    background-color: rgba(219, 137, 137, 0.796)
}


</style>