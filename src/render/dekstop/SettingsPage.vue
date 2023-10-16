<script>
import AppMenuSideAccaunt from '../../components/dekstop/AppMenuSideAccaunt.vue';
import AppSettingsPersonInfoVue from '../../components/dekstop/AppSettingsPersonInfo.vue';
import AppSettingsSecurityInfoVue from '../../components/dekstop/AppSettingsSecurityInfo.vue';

import axios from 'axios';
import { onBeforeUnmount, onMounted, ref } from 'vue';
export default {
    data() {
        return {
            persSet: true,
            secureSet: false,
            grafWind: true, // изменить на true
            windShowEmailChange: false,
            error_start_check_pass: false,
            error_start_check_email: false,
            window_change_email_main: false,
            window_change_accepr_password: true,
            password: "",
            setEmail: null,
            email: null,
            id: null,
            window_code_send: false,
            generateCode: null,
            code: null,
            windPass: false, // изменить на false
            passwordFirst: null,
            inputPassword: null,
            checkPassword: null,
        }
    },
    components: {
        AppMenuSideAccaunt,
        AppSettingsPersonInfoVue,
        AppSettingsSecurityInfoVue,
    },
    mounted() {
    },
    methods: {
        toggleWindowToSecurity() {
            this.persSet = false;
            this.secureSet = true;
        },
        toggleWindowToPersonInfo() {
            this.secureSet = false;
            this.persSet = true;
        },
        goToBack() {
            this.$router.go(-1);
        },
        changeEmailStartWindowGo(newValue) {
            this.grafWind = false;
            this.windShowEmailChange = true;
        },
        backToWindow() {
            this.grafWind = true;
            this.windShowEmailChange = false;
            this.windPass = false;

            this.setEmail = email;

            this.windShowEmailChange = false;
            this.error_start_check_pass = false;
            this.error_start_check_email = false;
            this.window_change_email_main = false;
            this.window_change_accepr_password = true;
            // this.grafWind = true;
        },
        async CheckPassPersonOfEmail() {
            let pass = this.password;
            this.password = "";
            let element = document.querySelector(".message_window_error");
            // let email = this.email;
            // let pass = this.password;
            if (!pass.trim()) {
                this.error_start_check_pass = true;
                element.innerHTML = "Пустое поле";
            } else {
                let response = await axios.post('/api/auth/login', {
                    email: this.setEmail,
                    password: pass,
                })
                let date = response.data;
                if (date.status == 401) {
                    element.innerHTML = "Неверный пароль";
                    console.log("Неверный пароль!")
                } else if (date.token) {
                    this.window_change_accepr_password = false;
                    this.window_change_email_main = true;
                    // element.innerHTML = "";
                }
            }
        },
        changePleasePasswordFormSendTo() {
            let element = document.querySelector(".message_window_error");
            element.innerHTML = "";
        },
        getEmailFromComponent(newValue) {
            // let email = newValue;
            this.setEmail = newValue.email;
            this.id = newValue.id;
            console.log(newValue);
        },
        async sendEmailChangeToLoadPersonInfo() {
            let element = document.querySelector(".message_error_window_email");
            function validateEmail(email) {
                // Регулярное выражение для проверки валидности email
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailPattern.test(email);
            };

            if (!this.email) {
                element.innerHTML = "Пустое поле";
            } else if (!validateEmail(this.email)) {
                element.innerHTML = "Неверный email";
            } else if (this.setEmail == this.email) {
                element.innerHTML = "Данная почта уже привязана к вашей учетной записи";
            } else {
                this.email.trim();
                let responce = await axios.post('/api/sec/email/to/registration/plkgohyftsf/redot/of/regostration', {
                    email: this.email
                });

                if (responce.data.code == 397) {
                    element.innerHTML = "Данная почта уже привзана к другому аккаунту";
                } else if (responce.data.code == 398) {
                    this.errorTextSend = ''
                    console.log(this.chekTrue);
                    this.window_change_email_main = false;
                    this.window_code_send = true;
                    function generateCode() {
                        let code = '';
                        let digits = '0123456789';
                        for (var i = 0; i < 8; i++) {
                            var randomIndex = Math.floor(Math.random() * digits.length);
                            code += digits.charAt(randomIndex);
                        }
                        return code;
                    }
                    this.generateCode = generateCode();
                    axios.post('/api/send/email/code', {
                        code: this.generateCode,
                        email: this.email,
                    })
                }
            }
        },
        changeInputEmailFormSendTo() {
            let element = document.querySelector(".message_error_window_email");
            element.innerHTML = "";
        },
        async sendCodeProvToGoChangeEmail() {
            if (this.code == this.generateCode) {
                await axios.post('/api/send/info/change/email/configeration/person/info', {
                    email: this.email,
                    id: this.id,
                })

                this.window_code_send = false;
                this.window_change_accepr_password = true;
                this.email = null;
                this.password = "";
                this.code = "";
                this.backToWindow();
            } else {
                let element = document.querySelector(".message_error_window_code");
                element.innerHTML = "Неверный код"
            }
        },
        changePasswordPerson() {
            this.grafWind = false;
            this.windPass = true;
        },
        changeInputPassFormSendTo() {
            let element = document.querySelector(".message_error_window_password_change");
        },
        async sendPassPersonToEditInformation() {
            let pass = this.passwordFirst;
            this.password = "";
            let element = document.querySelector(".message_error_window_password_change");
            if (!pass || !this.inputPassword || !this.checkPassword) {
                element.innerHTML = "Заполните все поля"
            } else {
                let response = await axios.post('/api/auth/login', {
                    email: this.setEmail,
                    password: pass,
                })
                console.log("Запрос отправлен!")
                let date = response.data;
                if (date.status == 401) {
                    element.innerHTML = "Указан неверный пароль от вашего аккаунта";
                } else if (this.inputPassword !== this.checkPassword) {
                    element.innerHTML = "Пароли не совпадают"
                } else if (this.inputPassword.length < 8) {
                    element.innerHTML = 'Пароль должен содержать не менее 8 символов'
                } else if (date.token) {
                    let respce = await axios.post('/api/send/change/password/user', {
                        id: this.id,
                        password: this.inputPassword,
                    })

                    let data = respce.data;
                    if (data.status == 38293) {
                        this.windPass = false;
                        this.grafWind = true;
                        this.passwordFirst = null;
                        this.inputPassword = null;
                        this.checkPassword = null;
                    }
                }
            }
        }

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
                <!-- <div v-if="admin" @click="goToBack" class="button_ui_header">
                    <p>Панель Управления</p>
                </div> -->
                <div class="button_ui_header">
                    <!-- <p>Помощь</p> -->
                </div>
            </div>
        </div>
    </header>
    <main>
        <AppMenuSideAccaunt />
        <div v-if="grafWind" class="container_settings_right">
            <!-- Компонент настроек -->
            <div class="container_settings">
                <div class="container_top_settings_title_and_button-back">
                    <div class="container_image_button_back">
                        <img @click="goToBack" draggable="false" src="../../assets/img/backMobilenav.png" alt="">
                    </div>
                    <div class="title_window_settings">
                        <p>Настройки</p>
                    </div>
                </div>
                <div class="container_button_and_change_information">
                    <div class="container_setting_element">
                        <div @click="toggleWindowToPersonInfo" class="element_settings">
                            <p>Личные данные</p>
                        </div>
                        <div @click="toggleWindowToSecurity" class="element_settings">
                            <p>Безопасность</p>
                        </div>
                        <!-- можно добавить следующие компоненты -->
                        <p class="info_identification_person">ID: LLe2VI166k</p>
                    </div>
                    <div class="container_input">
                        <!-- Компонент для изменения лич.инф -->
                        <AppSettingsPersonInfoVue :email="setEmail" @getEmail="getEmailFromComponent"
                            @emailStartChangeWindow="changeEmailStartWindowGo()" v-if="persSet" />

                        <!-- Компонент для изменения параметров безопасности -->
                        <AppSettingsSecurityInfoVue @getEmail="getEmailFromComponent"
                            @changePasswordAPerson="changePasswordPerson()" v-if="secureSet" />
                    </div>
                </div>
            </div>
        </div>

        <!-- блок с изменениями почты -->
        <div class="container_window_change_email" v-if="windShowEmailChange">
            <div class="container_windowChange_email_person" v-if="window_change_accepr_password">
                <div class="container_email_go_is_send">
                    <div class="name_window_theme_change_email">
                        <p @click="backToWindow" class="text_button_backChange">Отменить</p>
                        <p class="info_title_element_window">Введите пароль</p>
                        <p class="message_window_error"></p>
                    </div>
                    <div class="conainer_input_change_element_info_text">
                        <input @input="changePleasePasswordFormSendTo" v-model="password" placeholder="Пароль:"
                            type="password" autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false">
                    </div>
                    <div class="container_button_to_nav_go">
                        <p @click="CheckPassPersonOfEmail">Продолжить</p>
                    </div>
                </div>
            </div>

            <div class="container_windowChange_email_person" v-if="window_change_email_main">
                <div class="container_email_go_is_send">
                    <div class="name_window_theme_change_email">
                        <p @click="backToWindow" class="text_button_backChange">Отменить</p>
                        <p class="info_title_element_window">Введите новую почту</p>
                        <p class="message_window_error message_error_window_email"></p>
                    </div>
                    <div class="conainer_input_change_element_info_text conainer_input_change_element_info_email">
                        <input @input="changeInputEmailFormSendTo" v-model="email" placeholder="Email:" type="email"
                            autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false">
                    </div>
                    <div class="container_button_to_nav_go">
                        <p @click="sendEmailChangeToLoadPersonInfo">Далее</p>
                    </div>
                </div>
            </div>

            <div class="container_windowChange_email_person" v-if="window_code_send">
                <div class="container_email_go_is_send">
                    <div class="name_window_theme_change_email">
                        <p @click="backToWindow" class="text_button_backChange">Отменить</p>
                        <p class="info_title_element_window">Введите код подтверждения</p>
                        <p class="message_window_error message_error_window_code"></p>
                    </div>
                    <div class="conainer_input_change_element_info_text conainer_input_change_element_info_email">
                        <!-- <input @input="changeInputEmailFormSendTo" v-model="email" placeholder="Email:" type="email"
                            autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false"> -->
                        <input id="code_input_change" v-model="code" placeholder="Код из письма" type="number">
                    </div>
                    <div class="container_button_to_nav_go">
                        <p @click="sendCodeProvToGoChangeEmail">Подтвердить</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- блок для изменения пароля у пользователя -->
        <div class="container_window_change_email" v-if="windPass">
            <div class="container_windowChange_email_person">
                <div class="container_email_go_is_send">
                    <div class="name_window_theme_change_email">
                        <p @click="backToWindow" class="text_button_backChange">Отменить</p>
                        <p class="info_title_element_window">Введите код подтверждения</p>
                        <p class="message_window_error message_error_window_password_change"></p>
                    </div>
                    <div class="conainer_input_change_element_info_text conainer_input_change_element_info_email">
                        <!-- <input @input="changeInputEmailFormSendTo" v-model="email" placeholder="Email:" type="email"
                            autocomplete="off" autocapitalize="off" autocorrect="off" spellcheck="false"> -->
                        <input @input="changeInputPassFormSendTo" class="input_pass_change" v-model="passwordFirst"
                            placeholder="Введите существующий пароль" type="password">
                        <input @input="changeInputPassFormSendTo" class="input_pass_change" v-model="checkPassword"
                            placeholder="Введите новый пароль" type="password">
                        <input @input="changeInputPassFormSendTo" class="input_pass_change" v-model="inputPassword"
                            placeholder="Введите повторно новый пароль" type="password">
                    </div>
                    <div class="container_button_to_nav_go">
                        <p @click="sendPassPersonToEditInformation">Сохранить</p>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

* {
    margin: 0;
    padding: 0;
}

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

.container_settings_right {
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* компонент (блок) настройек */
.container_settings {
    width: 80%;
    height: 85%;
    background-color: #FF8F8F;
    border-radius: 6px;
}

.container_top_settings_title_and_button-back {
    display: flex;
    align-items: center;
    border-bottom: #915151 0.5px solid;
    height: 10%;
    position: relative;
}

.container_image_button_back {
    width: 10%;
    position: absolute;
}

.container_image_button_back img {
    width: 55px;
    position: relative;
    top: 2px;
    opacity: 20%;
    transition: all 0.2s;
}

.container_image_button_back img:hover {
    opacity: 80%;
    cursor: pointer;
}

.title_window_settings {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    color: #000;
    font-family: 'Inter', sans-serif;
    font-size: 22px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.container_button_and_change_information {
    display: flex;
    height: 90%;
}

.container_setting_element {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 20%;
    height: 100%;
    border-right: #df8181 0.1px solid;
    position: relative;
}

.element_settings {
    height: 45px;
    width: 100%;
    color: #5e5c5c;
    display: flex;
    align-items: center;
    border-bottom: #df8181 0.1px solid;
    transition: all 0.2s;
}

.element_settings p {
    margin-left: 10px;


    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.element_settings:hover {
    background-color: #f3a4a4;
    cursor: pointer;
    color: rgb(39, 39, 39);
}



.info_identification_person {
    position: absolute;
    bottom: 10px;
    color: #914a4a;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.container_input {
    width: 100%;
    height: 100%;
}

/* блок с изменениями почты (стили) */

.container_window_change_email {
    flex-grow: 1;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container_windowChange_email_person {
    width: 500px;
    height: auto;
    background-color: #FF8F8F;
    border-radius: 9px;
    padding: 10px 0;
}

.container_email_go_is_send {
    position: relative;
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
}

.text_button_backChange {
    position: absolute;
    left: 10px;
    top: 0;
    font-family: "Inter", sans-serif;
    font-size: 15px;
    color: #806f6f;
}

.message_window_error {
    display: block;
    color: red;
}

.text_button_backChange:hover {
    cursor: pointer;
    text-decoration-line: underline;
}

.info_title_element_window {
    color: #000;
    font-family: "Cabin", sans-serif;
    font-size: 16px;
    font-style: normal;
    /* font-weight: 600; */
    line-height: normal;
}

.name_window_theme_change_email {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
}

.conainer_input_change_element_info_text {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.conainer_input_change_element_info_text input {
    outline: none;
    border: none;
    background-color: #FF8F8F;

    color: #582e2e;
    font-family: "Inter", sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    display: flex;
    align-items: center;
    position: relative;

    transition: all 0.2s;
    border-bottom: #cf7c7c solid 0.1px;
}



.conainer_input_change_element_info_text input::placeholder {
    color: #555;
    font-family: "Cabin", sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    position: absolute;
    top: 3px;
}

.conainer_input_change_element_info_text input:focus {
    border-bottom: #a06060 solid 0.1px;
}

.conainer_input_change_element_info_email input {
    color: #582e2e;
    font-family: "Inter", sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    width: 300px;
}

.conainer_input_change_element_info_email input::placeholder {
    color: #555;
    font-family: "Cabin", sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    position: absolute;
    top: -1px;
}

.container_button_to_nav_go {
    display: flex;
    align-items: center;
    justify-content: center;

}

.container_button_to_nav_go p {
    color: #FFF;
    font-family: "Cabin", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

    border-radius: 8px;
    background: #B42D2D;

    padding: 12px 10px;
}

.container_button_to_nav_go p:hover {
    background: #912424;
    color: rgb(211, 211, 211);
    cursor: pointer;
}

#code_input_change {
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

#code_input_change::placeholder {
    left: 2px;
    right: 2px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0;
    /* <-- Apparently some margin are still there even though it's hidden */
}


.input_pass_change::placeholder {
    top: 1px;
    bottom: 1px;
}
</style>