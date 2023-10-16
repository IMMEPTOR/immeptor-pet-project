<script>
import axios from 'axios'
export default {
    date() {
        return {

        }
    },
    methods: {
        goToChats() {
            this.$router.push({
                name: 'chats'
            })
        },
        goToProfile() {
            this.$router.push({
                name: 'profile'
            })
        },
        deleredJWtTokenAuth() {
            document.cookie = "cookieName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
            if (!document.cookie) {
                this.$router.push({
                    name: 'fe'
                })
            }
        },
        goToSettingsChangeInfoAccount() {
            this.$router.push({
                name: 'settings'
            })
        }
    }
}
</script>

<template>
    <div class="sideBar_Container">
        <div class="container_ui_messanger ">
            <div @click="goToProfile()" class="element_ui_sidebar_profile ui_hover">
                <img src="../../assets/img/profile.png" width="36" alt="">
                <div class="ui_element_sidebar_connect">
                    <p>Профиль</p>
                </div>
            </div>
            <div @click="goToChats()" class="element_ui_sidebar_chat ui_hover">
                <img width="24" src="../../assets/img/chat-prof.png" alt="">
                <div class="ui_element_sidebar_connect">
                    <p>Чат</p>
                </div>
            </div>
        </div>
        <div class="container_ui_set">
            <div @click="goToSettingsChangeInfoAccount()" class="ui_exit">
                <img width="33" src="../../assets/img/settings.png" alt="иконка настройек">
            </div>
            <div @click="deleredJWtTokenAuth()" class="ui_exit">
                <img width="35" src="../../assets/img/exit.png" alt="">
            </div>
        </div>
    </div>
</template>

<style scoped>
main {
    background-color: rgb(224, 190, 255);
    width: 100%;
    height: 100vh;
    display: flex;
}

.sideBar_Container {
    width: 18%;
    height: 100%;
    background-color: rgb(219, 52, 66);
    display: flex;
    gap: 400px;
    flex-direction: column;
    justify-content: space-around;
    /* justify-content: center; */
    align-items: center;
}


.ui_element_sidebar_connect {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    margin-right: 20px;
}

.element_ui_sidebar_profile {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: start;
    text-align: center;
    height: 33px;
    font-size: 18px;
    /* gap: 30px; */
    padding: 5px 0;
    border-radius: 5px;
    width: 100%;
    transition: all 0.15s;
}

.element_ui_sidebar_profile img {
    position: relative;
    bottom: 4px;
    left: 5px;
}

.element_ui_sidebar_chat {
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: start;
    text-align: center;
    /* gap: 60px; */
    height: 33px;
    padding: 5px 0;
    font-size: 18px;
    border-radius: 5px;
    width: 100%;
    transition: all 0.15s;
}

.element_ui_sidebar_chat img {
    position: relative;
    /* bottom: 4px; */
    left: 9px;
}


.container_ui_messanger {
    display: flex;
    flex-direction: column;
    gap: 25px;
    width: 80%;
    font-family: 'Raleway', sans-serif;
}

.ui_hover:hover {
    background-color: rgb(180, 180, 180);
    cursor: pointer;
}

.ui_exit {
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    width: 35px;
    border-radius: 5px;
    transition: all 0.15s;
}

.ui_exit:hover {
    background-color: rgb(180, 180, 180);
    cursor: pointer;
}

.container_ui_set {
    display: flex;
    width: 80%;
    justify-content: space-between;
}
</style>