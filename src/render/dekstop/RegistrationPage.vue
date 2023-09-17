<script>
import axios from "axios";
import AppErrorRegistrationText from "../../components/dekstop/AppErrorRegistrationText.vue";
export default {
    data() {
        return {
            username: '',
            surname: '',
            email: '',
            pass: '',
            code: '',
            generateCode: '',
            detectPassword: null,
            firstForm: true,
            secondForm: false,
            chekTrue: true,
            errorTextSend: '',
        }
    },
    components: {
        AppErrorRegistrationText,
    },
    methods: {
        feedPageGoToBack() {
            this.$router.push({
                name: 'fe'
            })
        },
        async goToRegistration(evt) {
            evt.preventDefault();
            if (this.code == this.generateCode) {
                let response = await axios.post('/api/auth/register', {
                    username: this.username,
                    password: this.pass,
                    surname: this.surname,
                    email: this.email
                });
                if (response.status == 201) {
                    let response = await axios.post('/api/auth/login', {
                        email: this.email,
                        password: this.pass
                    })
                    let date = response.data;
                    let token = date.token;
                    if (token) {
                        let time = new Date(Date.now() + 86400e3);
                        time = time.toUTCString();
                        let evenNow;
                        if (this.chekTrue) {
                            evenNow = 'Sun, 31 Dec 2023 23:59:00 UTC';
                        } else {
                            evenNow = '';
                        }
                        document.cookie = 'cookieName=' + token + '; expires=' + evenNow + '; path=http://localhost:5173/;';
                        this.$router.push({
                            name: 'feed'
                        })
                    } else {
                        this.$router.push({
                            name: 'ops'
                        })
                    }
                }
            } else {
                console.log('Неверный код доступа');
                this.errorTextSend = 'Неверный код'
            }
        },
        async skipFormTpSecond() {
            let responce = await axios.post('/api/sec/email/to/registration/plkgohyftsf/redot/of/regostration', {
                email: this.email
            });
            function validateEmail(email) {
                // Регулярное выражение для проверки валидности email
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailPattern.test(email);
            };
            if (!this.username) {
                this.errorTextSend = 'Введите Имя'
            } else if (!this.surname) {
                this.errorTextSend = 'Введите Фамилию'
            } else if (!this.email) {
                this.errorTextSend = 'Введите email'
            } else if (!validateEmail(this.email)) {
                this.errorTextSend = 'Неверный email'
            } else if (!this.pass) {
                this.errorTextSend = 'Введите пароль'
            } else if (this.pass.length < 8) {
                this.errorTextSend = 'Пароль должен содержать не менее 8 символов'
            } else if (!this.detectPassword) {
                this.errorTextSend = 'Повторите пароль'
            } else if (this.pass !== this.detectPassword) {
                this.errorTextSend = 'Пароли не совпадают'
            } else if (responce.data.code == 397) {
                this.errorTextSend = 'Данный Email уже существует'
            } else {
                this.errorTextSend = ''
                console.log(this.chekTrue);
                this.firstForm = false;
                this.secondForm = true;
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
        <form @submit="goToRegistration" action="">
            <div v-if="firstForm" class="container_first_form">
                <div class="information_text_form">
                    <p class="text_title_form">Регистрация</p>
                    <AppErrorRegistrationText :textError="errorTextSend" />
                </div>
                <div class="container_input_form">
                    <div class="input_text_form_to_send">
                        <input v-model="username" placeholder="Имя:" type="text">
                    </div>
                    <div class="input_text_form_to_send">
                        <input v-model="surname" placeholder="Фамилия:" type="text">
                    </div>
                    <div class="input_text_form_to_send">
                        <input v-model="email" placeholder="Email:" type="email">
                    </div>
                    <div class="input_text_form_to_send">
                        <input v-model="pass" placeholder="Пароль:" type="password">
                    </div>
                    <div class="input_text_form_to_send">
                        <input v-model="detectPassword" placeholder="Повторите пароль:" type="password">
                    </div>
                    <div class="container_checkbox">
                        <label for="">
                            Запомнить на этом устройстве
                            <input v-model="chekTrue" checked type="checkbox">
                        </label>
                    </div>
                </div>
                <button @click="skipFormTpSecond" type="button">Далее</button>
            </div>
            <div v-if="secondForm" class="container_second_form">
                <div class="information_text_form">
                    <p class="text_title_form">Подтвердите почту</p>
                    <AppErrorRegistrationText :textError="errorTextSend" />
                </div>
                <div class="container_input_form">
                    <div class="input_text_form_to_send">
                        <input v-model="code" placeholder="Введите код из письма" type="number">
                    </div>
                </div>
                <button type="submit">Зарегестрироваться</button>
            </div>
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

.container_first_form {
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
}

.container_second_form {
    width: auto;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0;
    /* <-- Apparently some margin are still there even though it's hidden */
}
</style>