<script>
import AppMenuSideAccount from '../../components/dekstop/AppMenuSideAccaunt.vue'

import axios from 'axios';

export default {
    components: {
        AppMenuSideAccount,
    },

    date() {
        return {

        }
    },
    async beforeRouteEnter(to, fromR, next) {
        let token = document.cookie;
        let response = await axios.post('/api/configuration/auth/examination/token/user', {
            token: token
        })

        if (response.status == 200) {
            next(true)

        } else {
            next(false)
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
                <!-- <div class="inputSearchHeader">
                    <div class="element_inputHeaderSearch">
                        <input placeholder="Найти человека" type="text">
                    </div>
                    <div class="containerPositionSearchUser">
                        <div class="elemTakeUser">
                            <ul>
                                <li class="li_search">Ярослав Кочетов</li>
                                <li class="li_search">Виктория Селютина</li>
                                <li class="li_search">Надежда Бызова</li>
                            </ul>
                        </div>
                    </div>
                </div> -->
            </div>
            <div class="button_ui_header_container">
                <!-- <div class="button_ui_header">
                    <p>Панель Управления</p>
                </div> -->
                <!-- <div class="button_ui_header">
                    <p>Помощь</p>
                </div> -->
            </div>
        </div>
    </header>
    <main>
        <AppMenuSideAccount />
        <div class="container__image__auth">
            <img src="https://cdn-icons-png.flaticon.com/512/263/263051.png" width="204" alt="">
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
    top: -2px;
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

main {
    background-color: rgb(224, 190, 255);
    width: 100%;
    height: 100vh;
    display: flex;
}
.container__image__auth {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    pointer-events: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
}

.container__image__auth img {
    opacity: 30%;
    pointer-events: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
}

</style>