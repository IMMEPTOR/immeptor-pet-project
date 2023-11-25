<script>
import axios from "axios";
import dayjs from "dayjs";
import socket from '../../socket'

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
import { onBeforeUnmount, onMounted, ref } from 'vue';
// import { application } from 'express';
export default {
    data() {
        return {
            email: "",
            password: "",
            setVoin: true,
            loadExp: false,
            error: false,
            chekTrue: false,
            blocked: false,
            farze: false,
        }
    },
    mounted() {
        setInterval(() => {
            console.log(this.chekTrue); 
            // console.log( new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)); 
           
        }, 1000);
    },
    methods: {
        async toInLogin(evt) {
            evt.preventDefault();

            let response = await axios.post('/api/auth/login', {
                email: this.email,
                password: this.password,
                tz: dayjs.tz.guess(),
            })
            let date = response.data;
            if (date.status == 401 || date.status == 365) {
                this.loadExp = true;
            } else if (date.status == 398) {
                this.error = true;
                this.blocked = true;
            } else if (date.status == 129) {
                this.error = true;
                this.farze = true;
            } else if (date.token) {
                let time = new Date(Date.now() + 86400e3);
                time = time.toUTCString();
                let evenNow;
                if (this.chekTrue) {
                    evenNow = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
                } else {
                    evenNow = '';
                }
                document.cookie = 'cookieName=' + date.token + '; expires=' + evenNow + '; path=http://localhost:5173/;';
                let timezone = dayjs.tz.guess();
                let serverTime = dayjs().utc();
                let userTime = serverTime.tz(timezone);
                let formattedTime = userTime.format('DD.MM.YYYY HH:mm');
                let response = await axios.post('api/send/email/vhoin', {
                    email: this.email,
                    zone: timezone,
                    time: formattedTime,
                });

                this.$router.push({
                    name: 'feed'
                })
            }
        },
        CancelVoinInAccount() {
            this.email = '';
            this.password = '';
            this.error = false;
            this.blocked = false;
            this.farze = false;
        },
        goToRegistration() {
            this.$router.push({
                name: 'registration'
            })
        },
        feedPageGoToBack() {
            this.$router.push({
                name: 'fe'
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
        <div @click="feedPageGoToBack" class="container_button_login">
            <p>Отменить</p>
        </div>
    </header>
    <main>
        <form v-if="!error" @submit="toInLogin" action="">
            <div class="information_text_form">
                <p class="text_title_form">Вход</p>
                <p v-if="loadExp" class="text_error_text_window">Неверный логин или пароль</p>
            </div>
            <div class="container_input_form">
                <div class="input_text_form_to_send">
                    <input v-model="email" autocomplete="off" placeholder="Логин:" type="email">
                </div>
                <div class="input_text_form_to_send">
                    <input v-model="password" autocomplete="off" placeholder="Пароль:" type="password">
                </div>
                <div class="container_checkbox">
                    <label for="">
                        Запомнить на этом устройстве
                        <input v-model="chekTrue" checked type="checkbox">
                    </label>
                </div>
            </div>
            <button type="submit">Подтвердить</button>

        </form>

        <form action="" v-if="blocked">
            <div class="information_text_form">
                <p class="text_title_form">Аккаунт заблокирован</p>
            </div>
            <div class="container_input_form">
                <div class="container_text_description_error_voin">
                    <p>Данная учетная запись была заблокирована! Для получения подробной информации о вашем аккаунте,
                        просьба связаться с администрацией.</p>
                </div>
            </div>
            <button @click="CancelVoinInAccount" type="button">Войти в другой аккаунт</button>
        </form>

        <form action="" v-if="farze">
            <div class="information_text_form">
                <p class="text_title_form">Аккаунт заморожен</p>
            </div>
            <div class="container_input_form">
                <div class="container_text_description_error_voin">
                    <p>Администрация заморозила данную учетную запись!
                        Для того, чтобы узнать причины заморозки и дальнейшие действия, обратитесь в техническую поддержку!
                    </p>
                </div>
            </div>
            <button @click="CancelVoinInAccount" type="button">Войти в другой аккаунт</button>
        </form>
    </main>
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

main {
    width: 100vw;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
}

.information_text_form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 7px;
}

.text_title_form {
    color: #000;
    font-family: 'Inter', sans-serif;
    font-size: 40px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}

.text_error_text_window {
    color: #F00;
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    /* display: none; */
}

.container_input_form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 25px;
}

.input_text_form_to_send input {
    width: 350px;
    height: 30px;
    font-size: 16px;
    border: none;
    outline: none;
    border-bottom: #cfcfcf solid 0.2px;
    transition: all 0.4s;
}

.input_text_form_to_send input:focus {
    border-bottom: #000000 solid 0.2px;
}

.container_checkbox {
    display: flex;
    align-items: center;
    width: 100%;
    justify-content: end;
    padding-right: 10px;
}

.container_checkbox label {
    display: flex;
    align-items: center;
    gap: 10px;

    color: #000;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

label input {
    width: 15px;
    height: 15px;
}

button {
    background-color: yellow;
    border: none;
    outline: none;
    padding: 13px 30px;
    border-radius: 10px;

    color: #000;
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    margin-top: 30px;
    transition: all 0.3s;
}

button:hover {
    cursor: pointer;
    background-color: rgb(197, 197, 0);
}

.container_text_description_error_voin {
    width: 100%;
    display: flex;
    justify-content: center;
}

.container_text_description_error_voin p {
    /* width: 80%; */
    width: 500px;
    text-align: center;
    color: #000;
    text-align: center;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
</style>