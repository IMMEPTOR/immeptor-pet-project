<script>
import UiMenuBottom from '../../components/mobile/UiMenuBottom.vue';
import DisplayChats from '../../components/mobile/AppDisplayChats.vue';
import ShowChat from '../../components/mobile/AppShowChat.vue';
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
            displayChats: true,
            displayDialogs: false,
            content: '',
            chats: null,
            token: null,
            dialog: null,
            admin: false,
            cookies: null,
            roomingUserSocket: null,
            clickedItemId: null,
            TakeDialog: null,
            showChat: false,
            searchuser: '',
            userIndex: null,
            youSearch: '',
            displayChatViewList: true,
        }
    },
    components: {
        UiMenuBottom,
        DisplayChats,
        ShowChat,
    },
    watch: {
        contents() {
            this.adjustTextareaHeight();
        },
        dialogs() {
            this.adjustChatContainerHeight();
        },
    },
    mounted() {
        this.perfAuth();
        socket.emit('feedRoom');
        let id = document.cookie;
        this.cookies = id;
        socket.on('sendnewdualoginput', (data) => {
            if (!this.roomingUserSocket) {
                socket.emit('joinRoom', data._id);
                this.roomingUserSocket = data._id;
            } else {
                socket.emit('leaveRoom', this.roomingUserSocket);
                socket.emit('joinRoom', data._id);
                this.roomingUserSocket = data._id;
            }

            if (data.set_mark == 1 && data.user_one == this.token.userId || data.set_mark == 1 && data.user_two == this.token.userId) {
                this.chats.push(data);
                this.TakeDialog = data;
                this.dialog = data;
                // this.showChat = true;

                setTimeout(() => {
                    this.convertBlockElementTo();
                }, 100)
            }
        });

        socket.on('newdialogFromInputSecond', (data) => {

            this.statusChangePersonOnline(data.senderId);
            if (!this.roomingUserSocket) {
                socket.emit('joinRoom', data.chat._id);
                this.roomingUserSocket = data.chat._id;
            } else {
                socket.emit('leaveRoom', this.roomingUserSocket);
                socket.emit('joinRoom', data.chat._id);
                this.roomingUserSocket = data.chat._id;
            }
            if (data.chat.set_mark == 1 && data.chat.time_two_user == this.token.userId) {
                this.displayChatViewList = true;

                this.chats.push(data);

                // this.dialog = data;
                // this.showChat = true;
            }
        })
        socket.on('foreverchatuserme', (data) => {
            if (data.user_two == this.token.userId) {
                this.chats.push(data);
                // console.log("newChat", data)
            }
        });
        socket.on('chatMessagerSearchInput', (data) => {
            let users = data.users;
            if (users) {
                this.userIndex = users
                this.displayChatViewList = false;
            }
            if (!this.searchuser) {
                this.userIndex = null;
                this.displayChatViewList = true;
            }
        })
        this.getDialogs();
    },
    methods: {
        async perfAuth() {
            let token = document.cookie;
            let response = await axios.post('/api/gettoken', {
                token: token
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
                if (this.token.role >= 2) {
                    this.admin = true;
                }
            }
        },
        scrollContinueGoContainer() {
            let chatContainer = document.querySelector(".FeedContainer_boxMessageSender");
            setTimeout(() => {
                chatContainer.scrollTop = chatContainer.scrollHeight + 100;
            }, 100);
        },
        async getDialogs() {
            let token = document.cookie;
            let response = await axios.post('/api/getdialogs', {
                token: token
            })
            let chats = response.data;
            if (chats) {
                this.chats = chats;
            }
            socket.on('lastMessageSearch', (data) => {
                let text = data.text;
                let chatId = data.chatId;
                let lastTime = data.lastTime;
                for (let i = 0; i < this.chats.length; i++) {
                    let chat = this.chats[i];
                    if (chat._id == chatId) {
                        chat.lastmessage = text
                        chat.lastTime = lastTime;
                    }
                    if (chat._id == this.TakeDialog._id) {
                        this.TakeDialog.messages.push({
                            senderId: data.user,
                            message: data.message,
                            time: data.time,
                        })
                        this.scrollContinueGoContainer();
                        // this.$refs.childComponentRef.scrollAytoContinueGoContainer();
                    }
                }
            })
        },
        async updateDialogs(chatId, lastMessage) {
            let chatIndex = this.chats.findIndex((chat) => chat.chatId === chatId);
            if (chatIndex !== -1) {
                this.chats[chatIndex].lastmessage = lastMessage;
            }
        },
        showsChatUser(newValue) {
            this.showChat = newValue;
        },
        sendDialogMessages(newValue) {
            this.TakeDialog = newValue;
            if (this.roomingUserSocket == null) {
                socket.emit('joinRoom', this.TakeDialog._id);
                this.roomingUserSocket = this.TakeDialog._id;
            } else {
                socket.emit('leaveRoom', this.roomingUserSocket);
                socket.emit('joinRoom', this.TakeDialog._id);
                this.roomingUserSocket = this.TakeDialog._id;
            }
            this.dialog = newValue;

            this.convertBlockElementTo();
        },
        async inputSearch() {
            let text = this.searchuser;
            text = text.trim();
            socket.emit('searchFeedPerson', text);
        },
        async sendData(index) {
            let user = this.userIndex[index];
            let token = this.token;
            this.searchuser = '';
            this.displayChatViewList = true;
            this.userIndex = null;
            socket.emit('updateinputchat', {
                idIUser: token,
                id: user._id,
                name: user.name,
                surname: user.surname
            });
        },
        updateDialogs(newValue) {
            if (this.dialog.set_mark == 1) {
                this.dialog.user_two = this.dialog.time_two_user;
                this.dialog.set_mark == 0;
            }
            this.dialog.messages.push({
                senderId: newValue.user,
                message: newValue.message,
                time: newValue.time,
            });
            this.TakeDialog.messages.push({
                senderId: newValue.user,
                message: newValue.message,
                time: newValue.time,
            });
        },
        goToAdminPanel() {
            this.$router.push({
                name: 'feedPanel'
            })
        },
        statusChangePersonOnline(newValue) {
            socket.emit('status_online', {
                id_sender: newValue
            });
            socket.on(`status_online_${newValue}`, (data) => {
                this.status_sender = data.status;
                this.timeAgoHere = data.time;
            })
        },
        convertBlockElementTo() {
            this.showChat = true;
            // document.getElementById("secondElementsPos3i6tion").style.display = "inline-block"
            let element = document.getElementById("secondElementsPos3i6tion");
            element.style.left = `${0}vw`
        },
        convertBlockElementBack() {
            let element = document.getElementById("secondElementsPos3i6tion");
            element.style.left = `${100}vw`;
        }
    }
}
</script>

<template>
    <main>
        <div class="feedContainerElements">
            <div class="first_container_chats">
                <div class="container_search_user">
                    <div class="container_information_search_user">
                        <input @input="inputSearch()" v-model="searchuser" placeholder="Найти людей.." type="text">
                    </div>
                </div>
                <div class="container_chat">
                    <!-- <div class="container_user_information"> -->
                    <ul>
                        <li v-for="(item, index) in userIndex" @click="sendData(index)" class="element_user_search">{{
                            item.fullusername }}</li>
                        <!-- <li class="element_user_search">
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
                        </li> -->
                    </ul>
                    <!-- </div> -->

                    <DisplayChats v-if="displayChatViewList" @statusEventPerson="statusChangePersonOnline"
                        @valueChanged="showsChatUser" @sendingDialogs="sendDialogMessages" :token="token" :chats="chats" />
                </div>
            </div>
        </div>
        <div class="feedContainerElements container--colSellPos_LowVeightChant" id="secondElementsPos3i6tion">
            <ShowChat v-if="showChat" :token="token" :dialog="TakeDialog" @backToMenuChat="convertBlockElementBack" ref="childComponentRef" v-bind:scrollAytoContinueGoContainer="scrollContinueGoContainer"/>
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
    display: flex;
    position: relative;
}

body.keyboard {
    height: calc(100% + 500px);
    /* add padding for keyboard */
}

.feedContainerElements {
    background-color: #E0BEFF;
    width: 100vw;
    height: 100vh;

}

.container_search_user {
    width: 100%;
    height: 9%;
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
    font-size: 17px;
    width: 97%;
    background-color: aliceblue;
    border: none;
    outline: none;
}

.container_chat {
    height: 81%;
    position: relative;
}

.container_user_information {

    z-index: 0;

    /* background-color: black; */

}

.container_chat ul {
    list-style-type: none;
    padding: 0;
    width: 100%;
    /* height: 100%; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    /* width: 100%; */
    /* height: 100%; */
    position: absolute;
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
    z-index: 1;
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
    /* filter: blur(1rem); */
}

.element_chat_send {
    width: 100%;
    /* height: 20%; */
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
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
/* Style of container User's data */
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