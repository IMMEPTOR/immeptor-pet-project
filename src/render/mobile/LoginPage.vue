<script>
import axios from 'axios';
export default {
    data() {
        return {
            email: "",
            password: "",
            setBlocked: false,
            setVoin: true,
            setFroze: false,
        }
    },
    mounted() {

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
                this.setVoin = false;
                this.setBlocked = true;
                console.log('Аккаунт заблокирован!')
            } else if (date.status == 129) {
                this.setVoin = false;
                this.setFroze = true;
                console.log('Аккаунт заморожен!')
            } else if (date.token) {
                let time = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
                // time = time.toUTCString();
                document.cookie = 'cookieName=' + date.token + '; expires=' + time + '; path=http://localhost:5173/;';
                this.$router.push({
                    name: 'feed'
                })
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
    <main>
        <form @submit="toInLogin">
            <div class="feed_info_title_form_container">
                <div @click="goToFeedPage" class="back_to_page_icon">
                    <img src="../../assets/img/backMobilenav.png" alt="">
                </div>
                <div>
                    <p>Вход</p>
                </div>
            </div>
            <div class="input_text_load_and-SEND_BUT_CONYAINER">
                <div class="container_input">
                    <div class="element_input">
                        <input name="email" v-model="email" type="email" required placeholder="Email:" autocomplete="off"
                            id="login">
                    </div>
                    <div class="element_input">
                        <input name="password" v-model="password" type="password" required placeholder="Пароль:"
                            autocomplete="off" id="pass">
                    </div>
                </div>
                <div>
                    <div class="verify_policy">
                        <p>Нажимая «Войти», вы принимаете <a href="/privacy">политику
                                конфиденциальности</a>.</p>
                    </div>
                </div>
                <div class="container_button_send_date_from_form">
                    <button type="submit">Войти</button>
                    <button type="button">Зарегестрироваться</button>
                </div>
            </div>
        </form>
    </main>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
}


main {
    background-color: rgb(224, 190, 255);
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

form {
    width: 80%;
    height: 65%;
    background-color: #FF9C9C;
    border-radius: 20px;
    position: relative;
}

.feed_info_title_form_container {
    height: 12%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    color: #000;
    font-family: 'Inter', sans-serif;
    font-size: 25px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.back_to_page_icon {
    position: absolute;
    left: -5px;
    top: -3px;
    opacity: 15%;
    transition: all 0.2s;
}

.back_to_page_icon img {
    width: 55px;
    height: 55px;
}

.back_to_page_icon:hover {
    position: absolute;
    left: -10px;
    top: -3px;
    opacity: 35%;
    cursor: pointer;
}

.input_text_load_and-SEND_BUT_CONYAINER {
    width: 100%;
    height: 88%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    flex-direction: column;
    /* background-color: #000000; */
}

.container_input {
    width: 85%;
    height: 45%;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
}

.element_input {
    width: 100%;
    height: 30%;
    background: #D7D7D7;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
}

.element_input input {
    width: 90%;
    height: 60%;
    background: #D7D7D7;
    outline: none;
    border: none;

    color: #000000;
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.container_button_send_date_from_form {
    width: 100%;
    height: 45%;
    /* background-color: yellow; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
}

button {
    border: none;
    color: white;
    background-color: black;
    padding: 20px 40px;
    /* width: 122px; */
    border-radius: 99em;
    transition: all 0.15s;
}

button:hover {
    box-shadow: 0px 3px 2px 1px rgba(11, 11, 12, 0.2);
    color: rgb(187, 184, 184);
    cursor: pointer;
}

.verify_policy {
    width: 300px;
    font-family: 'Noto Sans', sans-serif;
    font-size: 13px;
    text-align: center;
}

.verify_policy a {
    color: rgb(0, 140, 255);
}
</style>