<script>
import AppFeedAdminPanelVue from '../../components/dekstop/AppFeedAdminPanel.vue';

import { io } from 'socket.io-client';
import axios from 'axios';

export default {
    components: {
        AppFeedAdminPanelVue,
    },
    data() {
        return {
            socket: io('http://localhost:3010', {
                transports: ['websocket'],
            }),
            registerUser: null,
            connectUser: null,
            adminsConnect: null,
            token: null,
            userAdminFullName: null,
            text: null,
            usersSearch: null,
        }
    },
    unmounted() {
        this.socket.emit('leaveAdminsRoom')
        this.socket.disconnect();
    },
    mounted() {
        this.getProfile();
        this.socket.connect();
        this.socket.emit('AdminConnectRoom', document.cookie);
        this.socket.on('AdminClubInformationRoomFeed', (data) => {
            this.registerUser = data.register;
            this.connectUser = data.connectedUser;
            this.adminsConnect = data.AdminsConnected;
            this.token = data.token;
        })

        this.socket.on('AdminUpdateInfoConnected', (data) => {
            this.connectUser = data.connectedUser;
        })

        this.socket.on('AdminUpdateInfoOnlineAdministration', (data) => {
            this.adminsConnect = data.adminsConnect;
        })

        this.socket.on('SearchAdminUserInfo', (data) => {
            this.usersSearch = data.users;
            console.log(data)
        })
    },
    methods: {
        goToExitOfAdminPage() {
            this.$router.push({
                name: 'feed'
            })
        },
        async getProfile() {
            let response = await axios.post('/api/getprofile', {
                token: document.cookie
            })
            this.userAdminFullName = response.data;
        },
        inputUserSearchInfo() {
            let text = this.text;
            text = text.trim();
            if (text) {
                this.socket.emit('searchAdminUserPanelInfo', text)
            } else if (!this.text) {
                this.text == '';
                this.usersSearch = null;
            }
        },
        goToEdited(index) {
            let user = this.usersSearch[index];
            let queryParams = {key: JSON.stringify(user._id)};
            this.$router.push({ name: 'editDataUser', query: queryParams})
        },
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
                <!-- <div class="button_ui_header">
                    <p>Помощь</p>
                </div> -->
            </div>
        </div>
    </header>
    <main>
        <div class="container_one">
            <div class="Container_Profile_Admin">
                <div class="container_information_admin">
                    <div class="image_administartor_container">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPo90FumZNXz_0Xj_JdzZ0SWEMpP55D05a-A&usqp=CAU"
                            alt="">
                    </div>
                    <div class="container_text_information_administration">
                        <p class="name_administration">{{ userAdminFullName }}</p>
                        <p class="prefix_admins">Администратор</p>
                    </div>
                </div>
            </div>
            <div class="container_input_serach_user">
                <div class="container_search_input">
                    <input v-model="text" @input="inputUserSearchInfo()" placeholder="Введите Имя, Почту или ID пользователя"
                        type="text">
                </div>
                <div class="container_users_searching_item">
                    <div v-for="(item, index) in usersSearch" class="element_search_user_container">
                        <div class="container_vn_elem_to">
                            <div class="container_information_user_element">
                                <div class="image_avatar_user_search">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPo90FumZNXz_0Xj_JdzZ0SWEMpP55D05a-A&usqp=CAU"
                                        alt="">
                                </div>
                                <div class="container_information_name_and_email_user">
                                    <p class="information_name_user">
                                        {{ item.fullusername }}
                                    </p>
                                    <p class="information_email_user_search">
                                        {{item.email}}
                                    </p>
                                </div>
                            </div>
                            <div class="container_idAdmins_user_button">
                                <div class="information_id_user_search">
                                    <p>ID: {{item.idSet}}</p>
                                </div>
                                <div @click="goToEdited(index)" class="button_administration_data_user_edit">
                                    <p>Управление</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container_two">
            <div class="container_information_app">
                <div class="infromation_text_container">
                    <p>Информация о пользователях:</p>
                </div>
                <AppFeedAdminPanelVue :connectUser="connectUser" :registerUser="registerUser"
                    :adminsConnect="adminsConnect" />
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

}

.container_one {
    width: 42%;
    /* background-color: #ca9788; */
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
}

.container_two {
    height: 100%;
    width: 58%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: start;
}

/* Компонент для отображения информации Администратора (начало)*/
.Container_Profile_Admin {
    width: 90%;
    background-color: #F8E7E7;
    height: 20%;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.container_information_admin {
    width: 95%;
    height: 90%;
    /* background-color: #4d4c4c; */
    display: flex;
    align-items: center;
    gap: 10px;
}

.image_administartor_container {
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    height: 100%;
}

.image_administartor_container img {
    height: 100%;
    border-radius: 7px;
}



.container_text_information_administration {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: start;
}

.name_administration {
    font-size: 28px;
    margin: 0;
    font-family: 'DM Sans', sans-serif;
}

.prefix_admins {
    margin: 0;
    color: #7e7d7d;
    font-size: 15px;
    font-family: 'Teko', sans-serif;
}

/* Второй компонент для поиска пользователей (начало) */

.container_input_serach_user {
    width: 90%;
    background-color: #F8E7E7;
    min-height: 75%;
    border-radius: 10px;
}

.container_search_input {
    /* background-color: blue; */
    width: 100%;
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 0.01px solid rgb(201, 201, 201);
}

.container_search_input input {
    background-color: #F8E7E7;
    border: none;
    width: 98%;
    height: 60%;
    padding: 0;
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 200;
    line-height: normal;
}

input:focus-visible {
    border: none;
    outline: none;
}

.container_users_searching_item {
    height: 90%;
    width: 100%;
    /* background-color: #ca9788; */
}

.element_search_user_container {
    /* background-color: aqua; */
    width: 100%;
    height: 120px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-bottom: 0.00001px solid rgb(218, 218, 218);
}

.container_vn_elem_to {
    width: 98%;
    height: 95%;
    /* background-color: #ebb19f; */
    display: flex;
    flex-direction: column;
}

.container_information_user_element {
    height: 70%;
    width: 100%;
    /* background-color: palevioletred; */
    display: flex;
    gap: 10px;
}

.image_avatar_user_search {
    height: 100%;
}

.image_avatar_user_search img {
    height: 100%;
    border-radius: 8px;
}

.container_information_name_and_email_user {
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.container_information_name_and_email_user p {
    margin: 0;
}

.information_name_user {
    /* color: #3C3737; */
    font-family: 'Barlow', sans-serif;
    font-size: 20px;
    /* font-style: normal; */
    /* font-weight: 400; */
}

.information_email_user_search {
    font-family: 'PT Sans Narrow', sans-serif;
    font-size: 14px;
    color: #a8a8a8;
}

.container_idAdmins_user_button {
    height: 30%;
    width: 100%;
    /* background-color: #ca9788; */
    margin: 0;
    display: flex;
}

.information_id_user_search {
    width: 30%;
    height: 100%;
    display: flex;
    align-items: center;
}

.information_id_user_search p {
    margin: 0;
    font-family: 'Orbitron', sans-serif;
    color: rgb(77, 77, 77);
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
    margin: 0 0 0 5px;
}

.button_administration_data_user_edit {
    /* background-color: green; */
    flex-grow: 1;
    height: 100%;
    display: flex;
    justify-content: end;
    align-items: center;
    margin-right: 5px;
}

.button_administration_data_user_edit p {
    background-color: rgb(0, 0, 0);
    margin: 0;
    color: #fff;
    padding: 5px 15px;
    border-radius: 6px;
    font-family: 'Cantarell', sans-serif;
    font-size: 15px;
    transition: all 0.15s;
}

.button_administration_data_user_edit p:hover {
    background-color: rgb(255, 255, 255);
    color: #000000;
    cursor: pointer;
}

/* Второй столбик-компонентотображение информации продукта */
.container_information_app {
    width: 90%;
    height: 30%;
    background-color: #F8E7E7;
    border-radius: 10px;
    margin-top: 10px;
}

.infromation_text_container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20%;
    width: 100%;
    border-bottom: #c5c5c5 solid 0.1px;
}

.infromation_text_container p {
    margin: 0;
    font-size: 18px;
    font-family: 'Encode Sans', sans-serif;
    margin: 5px 0;
}

.container_text_infoApp_numbers {
    height: 80%;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 10px;
    /* background-color: yellow; */
}

.element_info_app {
    height: 85%;
    width: 30%;
    /* background-color: #4d4c4c; */
    display: flex;
    flex-direction: column;
}

.status_information {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25%;
    width: 100%;
    /* background-color: yellow; */
}

.status_information p {
    margin: 0;
    font-size: 17px;
    color: #725454;
    font-family: 'Sen', sans-serif;
}

.meaning_number_information_app {
    height: 75px;
    width: 100%;
    /* background-color: yellow; */
    display: flex;
    justify-content: center;
    align-items: center;
}

.meaning_number_information_app p {
    color: #E97296;
    font-family: Inter;
    font-size: 64px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
</style>