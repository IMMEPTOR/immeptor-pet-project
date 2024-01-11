<script>
import axios from "axios";
import dayjs from "dayjs";
import socket from '../../socket'

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);
import { onBeforeUnmount, onMounted, ref } from 'vue';
import ErrorText from '../../components/mobile/AppErrorText.vue';
export default {
    data() {
        return {
            email: "",
            password: "",
            setBlocked: false,
            setVoin: true,
            setFroze: false,
            error: null,
        }
    },
    components: {
        ErrorText,
    },
    mounted() {
        let oneElem = document.querySelector(".inputElement__email");
        let twoElem = document.querySelector(".inputElement__email");
        oneElem.addEventListener("input", () => {
            this.error = "";
        })

        twoElem.addEventListener("input", () => {
            this.error = "";
        })
    },
    methods: {
        goToFeedPage() {
            this.$router.push({
                name: 'fe'
            })
        },
        async toInLogin(evt) {
            evt.preventDefault();

            // this.$router.push({
            //     name: 'feed'
            // })
            let response = await axios.post('/api/auth/login', {
                email: this.email,
                password: this.password
            })
            let date = response.data;

            if (date.status == 398) {
                // this.setVoin = false;
                // this.setBlocked = true;
                this.error = "Аккаунт заблокирован!"
            } else if (date.status == 129) {
                // this.setVoin = false;
                // this.setFroze = true;
                this.error = "Аккаунт заморожен"
            } else if (date.token) {
                let time = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
                // time = time.toUTCString();
                document.cookie = 'cookieName=' + date.token + '; expires=' + time + '; path=http://localhost:5173/;';
                this.$router.push({
                    name: 'feed'
                })
            } else {
                this.error = "Неверный логин или пароль"
                this.email = "";
                this.password = "";
            }

            // if (token) {

            // } else {
            //     this.$router.push({
            //         name: 'ops'
            //     })
            // }
        },
        // goToRegistration() {
        //     this.$router.push({
        //         name: 'registration'
        //     })
        // },
    }
}
</script>

<template>
    <header>
        <div class="container_logo_information">
            <p>IMMEPTOR</p>
        </div>
        <div @click="goToFeedPage" class="button_container_login">
            <p>На главную</p>
        </div>
    </header>
    <main>
        <form @submit="toInLogin" action="">
            <div class="name_block_formTitle">
                <p>Вход</p>
                <ErrorText :text="error" />
            </div>
            <div class="container_changeData--to_end_sendSave">
                <div class="container_data_inputChange__late">
                    <div class="elem_inputFormchangeFromInformation--login">
                        <input autocomplete="off" class="inputElement__email" v-model="email" placeholder="Логин:" type="email">
                    </div>
                    <div class="elem_inputFormchangeFromInformation--login">
                        <input autocomplete="off" class="inputElement__pass" v-model="password" placeholder="Пароль:" type="password">
                    </div>
                </div>
                <div class="containerChecked__cell-downSend">
                    <label for="">
                        Запомнить на этом устройстве
                        <input disabled checked class="inputCheckbox__input--cell" type="checkbox">
                    </label>
                </div>
            </div>
            <div class="container__other-confirm_cell">
                <div class="container_descriptionEnd_tosend--cell">
                    <p>Нажимая «Войти», вы принимаете <a href="/privacy" target="_blank">политику конфиденциальности</a>.
                    </p>
                </div>
                <div class="container_buttonArchive_send--cell">
                    <button @click="toInLogin" type="submit">Войти</button>
                </div>
            </div>
        </form>
    </main>
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
    width: 100vw;
    height: 100vh;
    background-color: white;
    display: flex;
    align-items: center;
    justify-content: center;
}

a {
    color: rgb(0, 145, 255);
}

/*  */

form {
    width: 75%;
    height: auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.name_block_formTitle {
    color: #000;
    font-family: "Inter";
    font-size: 29px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

}

.container_changeData--to_end_sendSave {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 17px;
}

.container_data_inputChange__late {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 14px;
}

.elem_inputFormchangeFromInformation--login {
    border-radius: 10px;
    background: #F0F0F0;
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.elem_inputFormchangeFromInformation--login input {
    background: none;
    border: none;
    outline: none;
    width: 90%;
    height: 90%;

    color: #1f1b1b;
    font-family: "Inter";
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.containerChecked__cell-downSend {
    display: flex;
    justify-content: content;
    width: 100%;
    height: auto;
}

.containerChecked__cell-downSend label {
    width: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
    text-align: center;
    color: #000;
    font-family: "Inter";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    height: 100%;
    gap: 10px;
}

.inputCheckbox__input--cell {
    transform: scale(1.6);
    opacity: 0.9;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    top: 1.5px;
}

.container__other-confirm_cell {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 20px;
}

.container_descriptionEnd_tosend--cell {
    width: 90%;
    height: auto;

    color: #000;
    text-align: center;
    font-family: "Inter";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.container_buttonArchive_send--cell {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container_buttonArchive_send--cell button {
    border: none;
    outline: none;
    border-radius: 10px;
    background: #F00;

    width: 100px;
    height: 50px;

    color: #FFF;
    font-family: "Inter";
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    -webkit-box-shadow: 0px 0px 18px 0px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 0px 0px 18px 0px rgba(34, 60, 80, 0.2);
    box-shadow: 0px 0px 18px 0px rgba(34, 60, 80, 0.2);
}
</style>