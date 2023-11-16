<script>

import socket from '../../socket'
import axios from 'axios';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router'
export default {
    data() {
        return {
            fullname: null,
            id: null,
            name: null,
            surname: null,
            email: null,
            role: null,
            ad_info_ministration: null,
            froze: null,
            blocked: null,
            idotherUser: null,
        }
    },
    mounted() {
        this.searchUserInDataBase();
    },
    methods: {
        async searchUserInDataBase() {
            let idUser = this.$route.query.key;
            idUser = idUser.slice(1, -1);
            this.idotherUser = idUser;
            let response = await axios.post('/api/admin/search/user', {
                id: idUser
            });
            let user = response.data;
            this.fullname = user.fullusername;
            this.id = user.idSet;
            this.name = user.name;
            this.surname = user.surname;
            this.email = user.email;
            this.role = user.role;
            if (user.froze == true) {
                this.froze = 1;
            } else {
                this.froze = 0;
            }
            if (user.blockedAccount == true) {
                this.blocked = 1;
            } else {
                this.blocked = 0;
            }
            if (user.role >= 2) {
                this.ad_info_ministration = 'Да'
            } else {
                this.ad_info_ministration = 'Нет'
            }
        },
        goToExitOfAdminPage() {
            this.$router.push({
                name: 'feed'
            })
        },
        cancelToGoFeedPanelAdmin() {
            this.$router.push({
                name: 'feedPanel'
            })
        },
        async sendInformationUpdateUser() {
            let ban = null;
            let froze = null;
            if (this.blocked == 1) {
                ban = true
            } else {
                ban = false
            }

            if (this.froze == 1) {
                froze = true
            } else {
                froze = false
            }

            let UptUser = {
                name: this.name,
                surname: this.surname,
                email: this.email,
                role: this.role,
                froze: froze,
                blocked: ban,
                id: this.idotherUser
            }

            let response = await axios.post('/api/information/administration/go/update/information/user', {
                user: UptUser,
            })

            let status = response.data;
            if (status) {
                this.$router.push({
                    name: 'feedPanel'
                })
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
                    <p>IMMEPTOR <span>admins</span></p>
                </div>
            </div>
            <div class="button_ui_header_container">
                <div @click="goToExitOfAdminPage" class="button_ui_header">
                    <p>Выйти из панели управления</p>
                </div>
            </div>
        </div>
    </header>
    <main>
        <div class="Container_edit_confirm_data_user_button">
            <div class="container_data_information_edit_user">
                <div class="information_name_user">
                    <p class="name_user">{{ fullname }}</p>
                    <p class="id_user">ID: {{ id }}</p>
                </div>
                <div class="reference_information_to_edit_container">
                    <div class="name_user_info_edit_save_c892">
                        <div class="name_text_info_navigation">
                            <p>Имя:</p>
                        </div>
                        <div class="name_user_edit">
                            <input type="text" placeholder="Имя пользователя" v-model="name">
                        </div>
                    </div>
                    <div class="name_user_info_edit_save_c892">
                        <div class="name_text_info_navigation">
                            <p>Фамилия:</p>
                        </div>
                        <div class="name_user_edit">
                            <input type="text" placeholder="Фамилия пользователя" v-model="surname">
                        </div>
                    </div>
                    <div class="name_user_info_edit_save_c892">
                        <div class="name_text_info_navigation">
                            <p>Почта:</p>
                        </div>
                        <div class="name_user_edit">
                            <input type="text" placeholder="Эл.почта пользователя" v-model="email">
                        </div>
                    </div>
                    <div class="name_user_info_edit_save_c892">
                        <div class="name_text_info_navigation">
                            <p>Роль:</p>
                        </div>
                        <div class="name_user_edit">
                            <input type="number" min="1" max="2" placeholder="Права пользователя" v-model="role">
                        </div>
                    </div>
                    <div class="name_user_info_edit_save_c892">
                        <div class="name_text_info_navigation">
                            <p>Администратор:</p>
                        </div>
                        <div class="name_user_edit">
                            <p>{{ ad_info_ministration }}</p>
                        </div>
                    </div>
                    <div class="name_user_info_edit_save_c892">
                        <div class="name_text_info_navigation">
                            <p>Заморозка:</p>
                        </div>
                        <div class="name_user_edit">
                            <input type="number" min="0" max="1" placeholder="Права пользователя" v-model="froze">
                        </div>
                    </div>
                    <div class="name_user_info_edit_save_c892">
                        <div class="name_text_info_navigation">
                            <p>Блокировка:</p>
                        </div>
                        <div class="name_user_edit">
                            <input type="number" min="0" max="1" placeholder="Права пользователя" v-model="blocked">
                        </div>
                    </div>

                </div>
            </div>
            <div class="button_edit_save_nav">
                <div @click="cancelToGoFeedPanelAdmin" class="cancel_action_edit">
                    <p>Вернуться назад</p>
                </div>
                <div @click="sendInformationUpdateUser()" class="save_new_information_user">
                    <p>Сохранить изменения</p>
                </div>
            </div>

        </div>
    </main>
</template>

<style scoped>
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

.nameLogo span {
    font-size: 14px;
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

/* Основная часть */
main {
    width: 100%;
    background-color: rgb(224, 190, 255);
    height: 100vh;
    display: flex;
    justify-content: center;
}

/* компонент для изменения данных пользователей */
.Container_edit_confirm_data_user_button {
    /* background-color: #ca9788; */
    width: 70%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 20px;
}

.container_data_information_edit_user {
    width: 60%;
    height: 70%;
    background-color: #F8E7E7;
    border-radius: 10px;
}

.information_name_user {
    width: 100%;
    height: 15%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-bottom: 0.01px solid rgb(192, 192, 192);
}

.name_user {
    margin: 0;
    margin-top: 10px;
    font-size: 23px;
    font-family: 'Poppins', sans-serif;
    color: rgb(92, 92, 92);
}

.id_user {
    margin: 0;
    font-size: 14px;
    font-family: 'Roboto Mono', monospace;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    color: #7C7777;
}

.reference_information_to_edit_container {
    display: flex;
    width: 100%;
    height: 85%;
    flex-direction: column;
}

.name_user_info_edit_save_c892 {
    display: flex;
    /* justify-content: space-between; */
    width: 100%;
    height: 14%;
    gap: 130px;
    /* background-color: yellow; */
}

.name_text_info_navigation {
    width: 20%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: start;
    /* background-color: gray; */
}

.name_text_info_navigation p {
    margin: 0;
    margin-left: 20px;
    font-size: 18px;
    font-family: 'Poppins', sans-serif;
    color: rgb(49, 49, 49);
}

.name_user_edit {
    flex-grow: 1;
    /* background-color: #4d4c4c; */
    height: 100%;
    display: flex;
    align-items: center;
}

.name_user_edit input {
    margin: 0;
    font-size: 17px;
    font-family: 'Cabin', sans-serif;
    color: #4b3535;
    font-weight: 450;
    width: 90%;
}

.name_user_edit p {
    margin: 0;
    font-size: 17px;
    font-family: 'Cabin', sans-serif;
    color: #4b3535;
    font-weight: 450;
}

input {
    border: none;
    outline: none;
    background-color: #F8E7E7;
}

.button_edit_save_nav {
    width: 60%;
    height: 10%;
    display: flex;
    justify-content: space-around;
}

.cancel_action_edit {
    background-color: #F8E7E7;
    height: fit-content;
    width: 35%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 9px;
    color: #484848;
}

.cancel_action_edit:hover {
    cursor: pointer;
    color: #242424;
    background-color: #e2d3d3;
}

.cancel_action_edit p {
    margin: 0;
    margin: 15px 0;

    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.save_new_information_user {
    background-color: greenyellow;
    height: fit-content;
    width: 35%;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 9px;
    color: #484848;
}

.save_new_information_user:hover {
    cursor: pointer;
    color: #000000;
    background-color: rgb(104, 255, 3);
}

.save_new_information_user:hover {}

.save_new_information_user p {
    margin: 0;
    margin: 15px 0;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0;
    /* <-- Apparently some margin are still there even though it's hidden */
}
</style>
