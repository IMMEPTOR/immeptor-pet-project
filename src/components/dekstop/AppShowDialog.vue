<script>
import axios from 'axios';

import { ref, watch, toRef } from 'vue'

import { io } from 'socket.io-client';

export default {
    data() {
        return {
            username: '',
            surname: '',
            token: '',
            messages: [],
            content: '',
            chat: null
        }
    },
    props: {
        dialog: null,
        socket: null,
    },
    setup(props) {
        watch(
            () => props.dialog,
            (newValue, oldValue) => {
                // props.socket.off('newMessage');
                // props.socket.on('newMessage');
                console.log('Пропс Диалог изменился:', newValue);
                let chatContainer = document.querySelector(".container_message_chat");
                setTimeout(() => {
                    chatContainer.scrollTop = chatContainer.scrollHeight + 100;
                }, 5);
                // let chatContainer = document.getElementById('smsClass');
                // chatContainer.scrollTop = chatContainer.scrollHeight;
                // window.scrollTo(0, document.body.scrollHeight);
            }
        );
    },
    watch: {
        contents() {
            this.adjustTextareaHeight();
            // this.adjustChatContainerHeight();
        },
        dialogs() {
            console.log('изменен! Новое сообщение!')
            this.adjustChatContainerHeight();
        },
    },
    mounted() {
        this.substiedDate();
        console.log(this.dialog);

        this.socket.on('newMessage', (data) => {
            // this.dialog.messages.push({
            //     senderId: data.user,
            //     message: data.message
            // });
            this.$emit('newSendMessageTaking', data);
            let chatContainer = document.querySelector(".container_message_chat");
            setTimeout(() => {
                chatContainer.scrollTop = chatContainer.scrollHeight + 100;
            }, 5);
        })

        let chatContainer = document.querySelector(".container_message_chat");
        setTimeout(() => {
            chatContainer.scrollTop = chatContainer.scrollHeight + 100;
        }, 5);
        // this.adjustChatContainerHeight();
        // window.scrollTo(0, document.body.scrollHeight);

        function adjustTextareaHeight(textarea) {
            textarea.style.height = "auto"; // Сначала сбросим высоту, чтобы текстареа автоматически увеличивалась при увеличении содержимого
            textarea.style.height = textarea.scrollHeight + "px"; // Установим высоту textarea на основе содержимого и высоты прокрутки
        }

        // Обработчик события при вводе текста или изменении содержимого textarea
        document.getElementById("autoHeightTextarea").addEventListener("input", function () {
            adjustTextareaHeight(this);
        });

        document.getElementById("autoHeightTextarea").addEventListener('keydown', function (e) {
            // if (e.key === 'Backspace') {
            //     let selectionStart = this.selectionStart;
            //     let selectionEnd = this.selectionEnd;

            //     if (selectionStart === selectionEnd && selectionStart > 0 && this.content.charAt(selectionStart - 1) === '\n') {
            //         // Если курсор находится перед переносом строки, удаляем перенос строки
            //         this.content = this.content.slice(0, selectionStart - 1) + this.content.slice(selectionStart);
            //         updateMessageAndTextarea();
            //         e.preventDefault(); // Предотвращаем стандартное поведение Backspace
            //     }
            // }

            if (e.key === 'Enter' && e.ctrlKey) {
                e.preventDefault();
                // this.sendMessage(e);
                let form = document.querySelector(".form_send_message");
                form.dispatchEvent(new Event('submit'));
                // e.preventDefault(); // Предотвращаем переход на новую строку
                // this.content += "\n"; // Добавляем перенос строки к сообщению
                // Также можно обновить значение textarea, чтобы отобразить новую строку
                
            }
        });

        // document.getElementById("autoHeightTextarea").addEventListener('keydown', function (e) {
        //     if (e.key === 'Enter' && !e.shiftKey) {
        //         e.preventDefault(); // Предотвращаем переход на новую строку
        //         message += "\n"; // Добавляем перенос строки к сообщению
        //         // Также можно обновить значение textarea, чтобы отобразить новую строку
        //         this.value = message;
        //     }
        // });

        // Вызов функции при загрузке страницы для установки правильной высоты textarea, если текст уже присутствует
        adjustTextareaHeight(document.getElementById("autoHeightTextarea"));
    },
    methods: {
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
            // console.log(textarea.scrollHeight);
        },
        // async saveNewMessage(evt) {
        //     evt.preventDefault();
        //     let content = this.content;
        //     content = content.trim();
        //     if (content) {
        //         console.log(content)
        //         axios.post('/api/message/saveindatebase/dialogs/users/config', {
        //             text: String(content),
        //             id: this.token,
        //             chatId: this.dialogs._id
        //         });

        //         let mes = {
        //             senderId: this.token,
        //             message: content
        //         };
        //         this.dialogs.messages.push(mes);
        //         this.content = '';
        //     }

        // },
        sendMessage(evt) {
            evt.preventDefault();
            // let socket = io('http://localhost:3005', {
            //     transports: ['websocket'],
            // });
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

            if (content) {
                this.socket.emit('chat message', {
                    message: content,
                    userId: this.token.userId,
                    chatId: this.dialog._id
                });
                // textarea.setAttribute('style', '');
                textarea.value = "";
                this.content = '';
                // let textarea = this.$refs.textarea;
                // textarea.style.height = 'auto';
                // textarea.style.height = ``;
                // let chatContainer = document.querySelector(".sms");
                // chatContainer.scrollTop = 99999;

                let chatContainer = document.querySelector(".container_message_chat");
                setTimeout(() => {
                    chatContainer.scrollTop = chatContainer.scrollHeight + 100;
                }, 5);
                // Вызов функции при загрузке страницы для установки правильной высоты textarea, если текст уже присутствует
                adjustTextareaHeight(document.getElementById("autoHeightTextarea"));
            }

        }
    }
}
</script>

<template>
    <div class="ContainerResertChat">
        <div class="contChatDialog">
            <div class="contInformationUserChat">
                <div class="image_avatar_sender">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPo90FumZNXz_0Xj_JdzZ0SWEMpP55D05a-A&usqp=CAU"
                        alt="">
                </div>
                <div class="name_sender">
                    <p v-if="this.dialog.user_one == token.userId">{{ this.dialog.username_two }} {{ this.dialog.surname_two
                    }}
                    </p>
                    <p v-if="this.dialog.user_two == token.userId">{{ this.dialog.username_one }} {{ this.dialog.surname_one
                    }}
                    </p>
                </div>
            </div>
            <div class="container_message_chat">
                <!-- <div>
                        <p class="my_message element_message">{{ item.message }}</p>
                    </div> -->
                <div v-for="(item, index) in dialog.messages" class="element_message">
                    <p v-if="item.senderId == token.userId" class="my_message ">{{ item.message }}</p>
                    <p v-if="item.senderId !== token.userId" class="sender_message ">{{ item.message }}</p>
                </div>
            </div>
            <form @submit="sendMessage" class="form_send_message">
                <div>
                    <textarea @input="adjustTextareaHeight" v-model="content" placeholder="Новое сообщение..." rows="1"
                        id="autoHeightTextarea"></textarea>
                </div>
                <div class="send_button_message_container">
                    <button type="submit">
                        <img src="../../assets/img/sending.png" alt="">
                    </button>
                </div>
            </form>
        </div>

    </div>
</template>

<style scoped>
.ContainerResertChat {

    width: 62%;
    height: 100%;
    display: flex;
    justify-content: center;
}

.contChatDialog {
    position: relative;
    width: 80%;
    height: 100%;
}

.contInformationUserChat {
    width: 100%;
    height: 10%;
    background-color: #FFCFC3;
    display: flex;
    gap: 10px;
    align-items: center;
    border-radius: 0 0 20px 20px;

    -webkit-box-shadow: -2px -1px 6px 3px rgba(34, 60, 80, 0.05);
    -moz-box-shadow: -2px -1px 6px 3px rgba(34, 60, 80, 0.05);
    box-shadow: -2px -1px 6px 3px rgba(34, 60, 80, 0.05);
}

.image_avatar_sender {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 15px;
}

.image_avatar_sender img {
    width: 40px;
    height: 50px;
    border-radius: 5px;
}

.name_sender {
    display: flex;
    align-items: start;
    height: 100%;

}

.name_sender p {
    margin-top: 8px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-weight: bold;
    color: #553939;
}

.container_message_chat {
    padding: 10px 0;
    width: 100%;
    height: 78%;
    /* background-color: #ad6e6e; */
    display: flex;
    flex-direction: column;
    /* gap: 3px; */
    overflow-y: scroll;
    overflow: scroll;
    overflow-x: hidden;
}

.middle_container__messages {
    width: auto;
    height: auto;
}

.container_message_chat::-webkit-scrollbar {
    width: 6px;
    background-color: #f9f9fd;
}

.container_message_chat::-webkit-scrollbar-track {
    background-color: rgb(224, 190, 255);
}

.element_message {
    width: 100%;
    word-wrap: break-word;
    font-size: 13.5px;
    font-family: 'PT Sans', sans-serif;
}

.my_message {
    float: right;
    max-width: 60%;
    background-color: #ffea8b;
    padding: 6px 7px;
    margin-bottom: -5px;
    border-radius: 10px 10px 0 10px;

    white-space: pre-line;
}

.sender_message {
    float: left;
    max-width: 60%;
    background-color: #FFABCE;
    padding: 6px 7px;
    border-radius: 10px 10px 10px 0;
    margin-bottom: -5px;
    white-space: pre-line;
}

.form_send_message {
    position: absolute;
    bottom: 5px;
    min-height: 8%;
    /* max-height: auto; */
    height: auto;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    -webkit-box-shadow: 4px 11px 31px 12px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 4px 11px 31px 12px rgba(34, 60, 80, 0.2);
    box-shadow: 4px 11px 31px 12px rgba(34, 60, 80, 0.2);
    background-color: #ffffff;
    border-radius: 20px;
}

form div {
    /* position: relative; */
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
    height: auto;
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
    width: 580px;
    /* min-height: 15px; */
    /* word-wrap: break-word; */
    height: auto;
    max-height: 150px;
    resize: none;
    font-family: 'M PLUS Rounded 1c', sans-serif;
    /* overflow-y: hidden; */
}

#autoHeightTextarea:focus-visible {
    border: none;
    outline: none;
}

button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    outline: none;
    border: none;
    transition: all 0.2s;
}

button:hover {
    opacity: 60%;
    cursor: pointer;
}
</style>