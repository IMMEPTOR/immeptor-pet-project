<script>
import axios from 'axios';

import { ref, watch, toRef, defineComponent } from 'vue'
import dayjs from 'dayjs'

import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

import socket from '../../socket';
export default {
    data() {
        return {

        }
    },
    props: {
        dialog: null,
        token: null,
        childRef: {
            type: Object,
            required: true
        }
    },
    watch: {
        contents() {
            this.adjustTextareaHeight();
        },
        dialogs() {
            this.adjustChatContainerHeight();
        },
    },
    setup(props) {
        watch(
            () => props.dialog,
            (newValue, oldValue) => {
                let chatContainer = document.querySelector(".FeedContainer_boxMessageSender");
                setTimeout(() => {
                    chatContainer.scrollTop = chatContainer.scrollHeight + 100;
                }, 100);
            }
        );
    },
    mounted() {
        function adjustTextareaHeight(textarea) {
            textarea.style.height = "auto"; // Сначала сбросим высоту, чтобы текстареа автоматически увеличивалась при увеличении содержимого
            textarea.style.height = textarea.scrollHeight + "px"; // Установим высоту textarea на основе содержимого и высоты прокрутки
        }

        // Обработчик события при вводе текста или изменении содержимого textarea
        document.getElementById("autoHeightTextarea").addEventListener("input", function () {
            adjustTextareaHeight(this);
        });

        document.getElementById("autoHeightTextarea").addEventListener('keydown', function (e) {
            if (e.key === 'Enter' && e.ctrlKey) {
                e.preventDefault();
                let form = document.querySelector(".contaner_input_textMessage");
                form.dispatchEvent(new Event('submit'));
            }
        });

        let chatContainer = document.querySelector(".FeedContainer_boxMessageSender");
        setTimeout(() => {
            chatContainer.scrollTop = chatContainer.scrollHeight + 100;
        }, 100);
        // Вызов функции при загрузке страницы для установки правильной высоты textarea, если текст уже присутствует
        adjustTextareaHeight(document.getElementById("autoHeightTextarea"));
    },
    methods: {
        scrollAytoContinueGoContainer() {
            let chatContainer = document.querySelector(".FeedContainer_boxMessageSender");
            setTimeout(() => {
                chatContainer.scrollTop = chatContainer.scrollHeight + 100;
            }, 100);
        },
        async substiedDate() {
            this.chat = this.dialogs;
            let JWTtoken = document.cookie;
            let response = await axios.post('/api/gettoken', {
                token: JWTtoken
            })

            if (response.data.status == 100) {
                document.cookie = "cookieName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
                if (!document.cookie) {
                    this.$router.push({
                        name: 'fe'
                    })
                }
            } else if (response.data.status == 105) {
                this.token = response.data.decoded;
            }
        },
        async checkedNewMessage() {
            let response = await axios.post('/api/set/search/dialog/id/new', {
                id: this.dialogs._id
            });
            let messages = response.data;
            let nowMes = this.messages;
            if (nowMes.length !== messages.length) {
                this.messages = messages;
                window.scrollTo(0, document.body.scrollHeight);
            }
        },
        adjustTextareaHeight() {
            let textarea = this.$refs.textarea;
            textarea.style.height = 'auto';
            textarea.style.height = `${textarea.scrollHeight}px`;
        },
        sendMessage(evt) {
            evt.preventDefault();
            let content = this.content;
            content.replace(/\n/g, '<br/>');
            content = content.trim();

            function adjustTextareaHeight(textarea) {
                textarea.style.height = "auto"; // Сначала сбросим высоту, чтобы текстареа автоматически увеличивалась при увеличении содержимого
                textarea.style.height = textarea.scrollHeight + "px"; // Установим высоту textarea на основе содержимого и высоты прокрутки
            }
            let textarea = document.getElementById("autoHeightTextarea");
            // Обработчик события при вводе текста или изменении содержимого textarea
            textarea.addEventListener("input", function () {
                adjustTextareaHeight(this);
            });
            // серверное время
            let serverTime = dayjs().utc();
            if (content) {
                socket.emit('chat message', {
                    message: content,
                    userId: this.token.userId,
                    chatId: this.dialog._id,
                    time: serverTime,
                });
                textarea.value = "";
                this.content = '';
                let chatContainer = document.querySelector(".FeedContainer_boxMessageSender");
                setTimeout(() => {
                    chatContainer.scrollTop = chatContainer.scrollHeight + 100;
                }, 50);
                // Вызов функции при загрузке страницы для установки правильной высоты textarea, если текст уже присутствует
                adjustTextareaHeight(document.getElementById("autoHeightTextarea"));
            }
        },
        convertToUserTime(createdAt) {
            if (createdAt) {
                const serverTime = dayjs(createdAt);
                const userTime = serverTime.tz(this.userTimezone);
                return `Был(а) в ${userTime.format('HH:mm')}`;
            } else {
                return "Не был в сети"
            }

        },
        convertToMessageTime(createdAt) {
            if (createdAt) {
                const serverTime = dayjs(createdAt);
                const userTime = serverTime.tz(this.userTimezone);
                return userTime.format('HH:mm');
            } else {
                return ""
            }

        },
        convertBlockElementBack() {
            this.$emit('backToMenuChat');
        },
    }

}
</script>

<template>
    <div class="container_information_sender">
        <div class="elementcontainerFirst_menu_buttonBack">
            <p @click="convertBlockElementBack">Назад</p>
        </div>
        <div class="elementcontainerFirst_menu">
            <div class="feedContElemInfoSender">
                <div class="container_imageAvatar_theUser">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPo90FumZNXz_0Xj_JdzZ0SWEMpP55D05a-A&usqp=CAU"
                        alt="">
                </div>
                <div class="container_textInformation_dataSender">
                    <p class="nameUserSenderElementUI" v-if="this.dialog.user_one == token.userId">{{
                        this.dialog.username_two }} {{
        this.dialog.surname_two
    }}
                    </p>
                    <p class="nameUserSenderElementUI" v-if="this.dialog.user_two == token.userId">{{
                        this.dialog.username_one }} {{
        this.dialog.surname_one
    }}
                    </p>
                    <p class="dateUserSenderElementUI">Не в сети</p>
                </div>
            </div>
        </div>
    </div>
    <div class="FeedContainer_boxMessageSender">
        <div class="container_box_message">
            <div class="container_textMessage--cell ">
                <div v-for="(item, index) in dialog.messages" class="element_chatMessage">
                    <div v-if="item.senderId == token.userId" class="my_message">
                        <p>{{ item.message }}</p>
                        <p class="time_OfMeMessage--cellOut">{{ convertToMessageTime(item.time) }}</p>
                    </div>
                    <div v-if="item.senderId !== token.userId" class="sender_message">
                        <p>{{ item.message }}</p>
                        <p class="time_OfMeMessage--cellOut">{{ convertToMessageTime(item.time) }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <form @submit="sendMessage" class="contaner_input_textMessage">
        <div class="container_sendText_Message">
            <div class="container_textMessageInput__UI">
                <textarea v-model="content" placeholder="Новое сообщение..." rows="1" id="autoHeightTextarea"></textarea>
            </div>
            <div class="containerIconsSend--cell">
                <img src="../../assets/img/sending.png" alt="">
            </div>
        </div>
    </form>
</template>

<style scoped>
* {
    margin: 0;
    padding: 0;
}

.feedContainerElements {
    background-color: #E0BEFF;
    width: 100vw;
    height: 100vh;

}

#secondElementsPos3i6tion {
    position: absolute;
    left: 100vw;
    /* left: 0; */
    z-index: 4;
    display: flex;
    flex-direction: column;
    transition: all 0.15s;
    /* align-items: center; */
}

.container_information_sender {
    width: 100%;
    height: 10%;
    background-color: #FFCFC3;
    display: flex;
    gap: 10px;
    border-radius: 0 0 8px 8px;
}

.elementcontainerFirst_menu_buttonBack {
    width: 140px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

}

.elementcontainerFirst_menu_buttonBack p {
    color: #997272;
    padding: 17px 30px;
    font-family: 'Inter';
    font-size: 15.5px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
    border-radius: 5px;
    background: #E8B4B4;
    transition: all 0.3s;
}

.elementcontainerFirst_menu_buttonBack p:hover {
    background: #c59999;
    color: #816060;
}

.elementcontainerFirst_menu {
    height: 100%;
    display: flex;
    align-items: center;
}

.feedContElemInfoSender {
    height: 80%;
    display: flex;
    gap: 7px;
}

.container_imageAvatar_theUser {
    height: 100%;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
}

.container_imageAvatar_theUser img {
    height: 100%;
    border-radius: 10px;
}

.container_textInformation_dataSender {
    display: flex;
    align-items: start;
    flex-direction: column;
    justify-content: space-around;
    gap: 5px;
}

.nameUserSenderElementUI {
    /* color: #000; */
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: bold;
    color: #553939;
    font-size: 18px;
    font-style: normal;
    /* font-weight: 400; */
    line-height: normal;
}

.dateUserSenderElementUI {
    color: #959494;
    font-family: "Inter";
    font-size: 15.5px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}

/* Style for second boxChatMessage */
.FeedContainer_boxMessageSender {
    width: 100%;
    height: 82%;
    display: flex;
    justify-content: center;
    align-items: center;

    overflow-y: scroll;
    overflow: scroll;
    overflow-x: hidden;
}

.container_box_message {
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;

}

.my_message {
    float: right;
    min-width: 15%;
    max-width: 80%;
    background-color: #ffea8b;
    padding: 10px 10px 20px 10px;
    margin-bottom: 5px;
    border-radius: 30px 30px 0 30px;
    position: relative;
    white-space: pre-line;
}

.sender_message {
    float: left;
    max-width: 80%;
    background-color: #FFABCE;
    padding: 10px 10px 20px 10px;
    border-radius: 30px 30px 30px 0;
    margin-bottom: 5px;
    white-space: pre-line;
    /* padding: 10px; */
    position: relative;
    min-width: 15%;
}

.text_message {
    width: 86%;
    padding-bottom: 2px;
}

.element_chatMessage {
    width: 100%;
    word-wrap: break-word;

    color: #000;
    font-family: "Inter";
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    font-size: 15px;
    font-family: 'PT Sans', sans-serif;
}

.container_textMessage--cell {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 5px;
}

.element_chatMessage:first-child {
    padding-top: 10px;
}

.element_chatMessage:last-child {
    padding-bottom: 10px;
}

/* style for inputSendTextOfMessage */
.contaner_input_textMessage {
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: center;
    position: absolute;
    bottom: 5px;
    min-height: 8%;
    height: fit-content;
}

.container_sendText_Message {
    display: flex;
    position: relative;
    /* left: 0; */

    /* min-height: 100%; */
    /* max-height: auto; */
    max-height: auto;
    width: 98%;
    display: flex;
    align-items: center;
    justify-content: start;
    /* gap: 20px; */
    -webkit-box-shadow: 4px 11px 31px 12px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 4px 11px 31px 12px rgba(34, 60, 80, 0.2);
    box-shadow: 4px 11px 31px 12px rgba(34, 60, 80, 0.2);
    background-color: #ffffff;
    border-radius: 20px;
}

.containerIconsSend--cell {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
}

#autoHeightTextarea {
    /* text-align: center; */
    /* position: absolute;
    top: 0; */

    /* bottom: 0; */
    background-color: #ffffff;
    border: none;
    padding: 2px 0 0 0;
    margin: 8px 15px;
    font-size: 15px;
    width: 100%;
    /* min-height: 15px; */
    /* word-wrap: break-word; */
    height: 100%;
    max-height: 150px;
    resize: none;
    font-family: 'M PLUS Rounded 1c', sans-serif;
    /* overflow-y: hidden; */
}

#autoHeightTextarea:focus-visible {
    outline: none;
}

.container_textMessageInput__UI {
    width: 85%;
    height: fit-content;
    display: flex;
    align-items: center;
    justify-content: center;
}

.time_sender--cellOut {
    position: absolute;
    bottom: 8px;
    right: 20px;

    color: #666666;
    font-family: "Inter";
    font-size: 13.5px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}

.time_OfMeMessage--cellOut {
    position: absolute;
    bottom: 5px;
    right: 10px;

    color: #666666;
    font-family: "Inter";
    font-size: 13.5px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;
}
</style>