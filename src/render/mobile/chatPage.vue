<script>
import UiMenuBottom from '../../components/mobile/UiMenuBottom.vue';

import { ref, watch, toRef } from 'vue'
import { io } from 'socket.io-client';
export default {
    data() {
        return {
            displayChats: false,
            displayDialogs: false,
            content: '',
        }
    },
    components: {
        UiMenuBottom,
    },
    watch: {
        contents() {
            this.adjustTextareaHeight();
            this.adjustChatContainerHeight();
        },
        dialogs() {
            console.log('изменен! Новое сообщение!')
            this.adjustChatContainerHeight();
        },
    },
    mounted() {
        function adjustTextareaHeight(textarea) {
            textarea.style.height = "auto"; // Сначала сбросим высоту, чтобы текстареа автоматически увеличивалась при увеличении содержимого
            textarea.style.height = textarea.scrollHeight + "px"; // Установим высоту textarea на основе содержимого и высоты прокрутки

            if (textarea.style.height > `${100}px`) {
                console.log('Превышение высоты текста арии!!!')
            } else {
                console.log('никак нет.')
            }
        }

        // Обработчик события при вводе текста или изменении содержимого textarea
        // document.getElementById("autoHeightTextarea").addEventListener("input", function () {
        //     adjustTextareaHeight(this);
        // });

        // // Вызов функции при загрузке страницы для установки правильной высоты textarea, если текст уже присутствует
        // adjustTextareaHeight(document.getElementById("autoHeightTextarea"));
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
    },
    adjustTextareaHeight() {
        let textarea = this.$refs.textarea;
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
        // console.log(textarea.scrollHeight);


    },
}
</script>

<template>
    <main>
        <div v-if="displayChats" class="first_container_chats">
            <div class="container_search_user">
                <div class="container_information_search_user">
                    <input placeholder="Найти людей.." type="text">
                </div>
            </div>
            <div class="container_chat">
                <!-- <div class="container_user_information">
                    <ul>
                        <li class="element_user_search">
                            <p>Ярослав Кочетов</p>
                        </li>
                        <li class="element_user_search">
                            <p>Ярослав Кочетов</p>
                        </li>
                        <li class="element_user_search">
                            <p>Ярослав Кочетов</p>
                        </li>
                        <li class="element_user_search">
                            <p>Ярослав Кочетов</p>
                        </li>
                        <li class="element_user_search">
                            <p>Виктория Селютина</p>
                        </li>
                    </ul>
                </div> -->

                <div class="container_chat_elements">
                    <div class="element_chat_send">
                        <div class="container_information_chat_sender">
                            <div class="avatar_chat_of_user_send">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPo90FumZNXz_0Xj_JdzZ0SWEMpP55D05a-A&usqp=CAU"
                                    alt="">
                            </div>
                            <div class="container_name_sender_user_info">
                                <p class="name_user_chat">Ярослав Кочетов</p>
                                <p class="last_message_chat">Это последнее сооб..</p>
                            </div>
                        </div>
                    </div>
                    <div class="element_chat_send">
                        <div class="container_information_chat_sender">
                            <div class="avatar_chat_of_user_send">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPo90FumZNXz_0Xj_JdzZ0SWEMpP55D05a-A&usqp=CAU"
                                    alt="">
                            </div>
                            <div class="container_name_sender_user_info">
                                <p class="name_user_chat">Ярослав Кочетов</p>
                                <p class="last_message_chat">Это последнее сооб..</p>
                            </div>
                        </div>
                    </div>
                    <div class="element_chat_send">
                        <div class="container_information_chat_sender">
                            <div class="avatar_chat_of_user_send">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPo90FumZNXz_0Xj_JdzZ0SWEMpP55D05a-A&usqp=CAU"
                                    alt="">
                            </div>
                            <div class="container_name_sender_user_info">
                                <p class="name_user_chat">Ярослав Кочетов</p>
                                <p class="last_message_chat">Это последнее сооб..</p>
                            </div>
                        </div>
                    </div>
                    <div class="element_chat_send">
                        <div class="container_information_chat_sender">
                            <div class="avatar_chat_of_user_send">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPo90FumZNXz_0Xj_JdzZ0SWEMpP55D05a-A&usqp=CAU"
                                    alt="">
                            </div>
                            <div class="container_name_sender_user_info">
                                <p class="name_user_chat">Ярослав Кочетов</p>
                                <p class="last_message_chat">Это последнее сооб..</p>
                            </div>
                        </div>
                    </div>
                    <div class="element_chat_send">
                        <div class="container_information_chat_sender">
                            <div class="avatar_chat_of_user_send">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPo90FumZNXz_0Xj_JdzZ0SWEMpP55D05a-A&usqp=CAU"
                                    alt="">
                            </div>
                            <div class="container_name_sender_user_info">
                                <p class="name_user_chat">Ярослав Кочетов</p>
                                <p class="last_message_chat">Это последнее сооб..</p>
                            </div>
                        </div>
                    </div>
                    <div class="element_chat_send">
                        <div class="container_information_chat_sender">
                            <div class="avatar_chat_of_user_send">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPo90FumZNXz_0Xj_JdzZ0SWEMpP55D05a-A&usqp=CAU"
                                    alt="">
                            </div>
                            <div class="container_name_sender_user_info">
                                <p class="name_user_chat">Ярослав Кочетов</p>
                                <p class="last_message_chat">Это последнее сооб..</p>
                            </div>
                        </div>
                    </div>
                    <div class="element_chat_send">
                        <div class="container_information_chat_sender">
                            <div class="avatar_chat_of_user_send">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPo90FumZNXz_0Xj_JdzZ0SWEMpP55D05a-A&usqp=CAU"
                                    alt="">
                            </div>
                            <div class="container_name_sender_user_info">
                                <p class="name_user_chat">Ярослав Кочетов</p>
                                <p class="last_message_chat">Это последнее сооб..</p>
                            </div>
                        </div>
                    </div>
                    <div class="element_chat_send">
                        <div class="container_information_chat_sender">
                            <div class="avatar_chat_of_user_send">
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPo90FumZNXz_0Xj_JdzZ0SWEMpP55D05a-A&usqp=CAU"
                                    alt="">
                            </div>
                            <div class="container_name_sender_user_info">
                                <p class="name_user_chat">Ярослав Кочетов</p>
                                <p class="last_message_chat">Это последнее сооб..</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="displayDialogs" class="second_container_dialog_display">
            <div class="container_navigation_back_and_information_sender">
                <div class="container_navigation_button">
                    <p>Назад</p>
                </div>
                <div class="container_information_sender">
                    <div class="avatar_container_sender">
                        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPo90FumZNXz_0Xj_JdzZ0SWEMpP55D05a-A&usqp=CAU"
                            alt="">
                    </div>
                    <div class="information_container_text_sender_name">
                        <p class="name_sender">Ярослав Кочетов</p>
                        <p class="last_network_info_sender">Был(-а) в 17:29</p>
                    </div>
                </div>
            </div>
            <div class="container_message_dialog">
                <div class="container_message">
                    <div class="my_mes message_element">
                        <p>Это первое сообщение в immeptor</p>
                    </div>
                    <div class="sender_mes message_element">
                        <p>Это мое сообщение, не надо мне тут врать, тебе все понятно?</p>
                    </div>
                    <div class="my_mes message_element">
                        <p>ssdfsdfssdfsdfsdfsdfsdfsdfsdfdfЭто мое сообщение, не надо мне тут врать, тебе все понятно?</p>
                    </div>
                    <div class="sender_mes message_element">
                        <p>Это первое сообщение в immeptor</p>
                    </div>
                    <div class="sender_mes message_element">
                        <p>Это мое сообщение, не надо мне тут врать, тебе все понятно?</p>
                    </div>
                    <div class="my_mes message_element">
                        <p>ssdfsdfssdfsdfsdfsdfsdfsdfsdfdfЭто мое сообщение, не надо мне тут врать, тебе все понятно?</p>
                    </div>
                    <div class="my_mes message_element">
                        <p>Это первое сообщение в immeptor</p>
                    </div>
                    <div class="sender_mes message_element">
                        <p>Это мое сообщение, не надо мне тут врать, тебе все понятно?</p>
                    </div>
                    <div class="my_mes message_element">
                        <p>ssdfsdfssdfsdfsdfsdfsdfsdfsdfdfЭто мое сообщение, не надо мне тут врать, тебе все понятно?</p>
                    </div>
                    <div class="my_mes message_element">
                        <p>ssdfsdfssdfsdfsdfsdfsdfsdfsdfdfЭто мое сообщение, не надо мне тут врать, тебе все понятно?</p>
                    </div>
                    <div class="my_mes message_element">
                        <p>Это первое сообщение в immeptor</p>
                    </div>
                    <div class="sender_mes message_element">
                        <p>Это мое сообщение, не надо мне тут врать, тебе все понятно?</p>
                    </div>
                    <div class="my_mes message_element">
                        <p>ssdfsdfssdfsdfsdfsdfsdfsdfsdfdfЭто мое сообщение, не надо мне тут врать, тебе все понятно?</p>
                    </div>
                    <div class="my_mes message_element">
                        <p>Это первое сообщение в immeptor</p>
                    </div>
                    <div class="sender_mes message_element">
                        <p>Это мое сообщение, не надо мне тут врать, тебе все понятно?</p>
                    </div>
                    <div class="my_mes message_element">
                        <p>ssdfsdfssdfsdfsdfsdfsdfsdfsdfdfЭто мое сообщение, не надо мне тут врать, тебе все понятно?</p>
                    </div>
                </div>

                <form @submit="sendMessage" class="form_send_message">
                    <div class="container_textarea">
                        <textarea @input="adjustTextareaHeight" v-model="content" placeholder="Новое сообщение..." rows="1"
                            id="autoHeightTextarea"></textarea>
                    </div>
                    <div class="container_button">
                        <button type="submit">
                            <img src="../../assets/img/sending.png" alt="">
                        </button>
                    </div>
                </form>

            </div>
            <div>

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

.container_search_user {
    width: 100%;
    height: 8%;
    background-color: #C97E7E;
    border-bottom: 0.15px solid rgb(134, 48, 48);
    display: flex;
    align-items: center;
    justify-content: center;

    -webkit-box-shadow: -1px 10px 30px -3px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: -1px 10px 30px -3px rgba(34, 60, 80, 0.2);
    box-shadow: -1px 10px 30px -3px rgba(34, 60, 80, 0.2);
}

.container_information_search_user {
    background-color: aliceblue;
    width: 95%;
    height: 70%;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Inter', sans-serif;
}

.container_information_search_user input {
    font-size: 15px;
    width: 97%;
    background-color: aliceblue;
    border: none;
    outline: none;
}

.container_chat {
    height: 82%;
    position: relative;
}

.container_user_information {
    width: 100%;
    height: auto;
    /* background-color: black; */
}

.container_user_information ul {
    list-style-type: none;
    padding: 0;
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}

li {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #D07070;
    font-family: 'Inter', sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

li:last-child {
    border-radius: 0 0 15px 15px;
}

li:hover {
    background-color: #b96363;
    cursor: pointer;
    box-shadow: 0px 4px 12px 1px rgba(130, 21, 21, 0.25);
}

.container_chat_elements {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    overflow-y: scroll;
}

.element_chat_send {
    width: 100%;
    height: 20%;
    display: flex;
    align-items: center;
    justify-content: center;

    border-bottom: 0.001px solid #dd7c7c;
}

.element_chat_send:hover {
    background: rgba(255, 0, 0, 0.17);
    box-shadow: inset 15px 9px 54px 1px rgba(0, 0, 0, 0.25);
    cursor: pointer;
}

.container_information_chat_sender {
    width: 98%;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: start;
    gap: 7px;
}

.avatar_chat_of_user_send {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.avatar_chat_of_user_send img {
    height: 70px;
    width: 70px;
    border-radius: 15%;
}

.container_name_sender_user_info {
    height: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.name_user_chat {
    color: #5C2B2B;
    font-family: 'Inter', sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
}

.last_message_chat {
    color: #424141;
    font-family: 'Inter', sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.first_container_chats {
    width: 100%;
    height: 100%;
    background-color: #FFACAC;
}

/* Второй компонент ОТображающий диалог (откр) */

.second_container_dialog_display {
    width: 100%;
    height: 100%;
}

.container_navigation_back_and_information_sender {
    width: 100%;
    height: 10%;
    background-color: #FFCFC3;
    border-radius: 0 0 8px 8px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding-left: 10px;
}

.container_navigation_button {
    width: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: gray;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    height: 100%;
    transition: all 0.1s;
}

.container_navigation_button:hover {
    color: rgb(26, 26, 26);
    cursor: pointer;
}

.container_information_sender {
    width: 65%;
    height: 90%;
    display: flex;
    gap: 7px;
    align-items: center;
}

.avatar_container_sender {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
}

.avatar_container_sender img {
    border-radius: 10px;
    width: 100%;
    height: 100%;
}

.information_container_text_sender_name {
    height: 100%;
    position: relative;
    flex-grow: 1;
}

.name_sender {
    color: rgb(105, 54, 54);
    font-family: 'Inria Sans', sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    position: absolute;
    top: 4px;
}

.last_network_info_sender {
    color: #959494;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    position: absolute;
    bottom: 4px;
}

.container_message_dialog {
    width: 100%;
    height: 80%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.container_message {
    padding-top: 8px;
    width: 94%;
    height: 85%;
    display: flex;
    flex-direction: column;
    gap: 10px;
    overflow-y: scroll;
    justify-content: center;
}

.container_message::-webkit-scrollbar {
    width: 6px;
    background-color: #f9f9fd;
}

.container_message::-webkit-scrollbar-track {
    background-color: rgb(224, 190, 255);
}

.message_element {
    width: 100%;
}

.sender_mes p {
    background-color: #FE83B7;
    border-radius: 10px 10px 10px 0;
    float: left;
}

.message_element:first-child {
    margin-top: 15px;
}

.message_element:last-child {
    margin-bottom: 15px;
}

.my_mes p {
    background-color: #ffea8b;
    float: right;
    border-radius: 10px 10px 0 10px;
}

.message_element p {
    padding: 10px 15px;
    font-family: 'Inter', sans-serif;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    max-width: 60%;
}

.form_send_message {
    min-height: 11.5%;
    height: auto;
    width: 98%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    -webkit-box-shadow: 4px 11px 31px 12px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 4px 11px 31px 12px rgba(34, 60, 80, 0.2);
    box-shadow: 4px 11px 31px 12px rgba(34, 60, 80, 0.2);
    background-color: #ffffff;
    border-radius: 20px;


}

.form_container {
    width: 95%;
    height: 15%;
    max-height: auto;
    /* background-color: black; */
    display: flex;
    align-items: center;
    justify-content: center;
}

textarea {
    width: 100%;
    background-color: #ffffff;
    border: none;
    padding: 2px 0 0 0;
    margin: 8px 0px;
    font-size: 15px;

    word-wrap: break-word;
    height: auto;
    resize: none;
    font-family: 'M PLUS Rounded 1c', sans-serif;
    overflow-y: hidden;
}

textarea:focus-visible {
    border: none;
    outline: none;
}

.container_textarea {
    width: 85%;
    height: 100%;
    /* background-color: black; */
    display: flex;
    align-items: center;
    justify-content: center;
}

.container_button {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.container_button button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    outline: none;
    border: none;
}

.ui_navigation_mobile {
    background-color: #DC3545;
    width: 100%;
    height: 10%;
    position: fixed;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: space-around;

}

.navigation_element_ui {
    width: 40%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 5px;
    opacity: 20%;
    transition: all 0.05s;
    font-family: 'Ubuntu', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.navigation_element_ui img {
    width: 25px;
    height: 25px;
}

.navigation_element_ui:hover {
    opacity: 100%;
    cursor: pointer;
}

.active {
    opacity: 100%;
}
</style>