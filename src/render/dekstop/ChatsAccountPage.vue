<script>
import AppChatsAccount from '../../components/dekstop/AppChatsAccount.vue'
import AppMenuSideAccount from '../../components/dekstop/AppMenuSideAccaunt.vue'
import AppShowDialog from '../../components/dekstop/AppShowDialog.vue'
// import { createApp, ref } from 'vue';

import { io } from 'socket.io-client';

import axios from 'axios';
import { onBeforeUnmount, onMounted, ref } from 'vue';

export default {
    components: {
        AppChatsAccount,
        AppMenuSideAccount,
        AppShowDialog
    },
    data() {
        return {
            chats: [],
            showChat: false,
            TakeDialog: null,
            searchuser: '',
            userIndex: null,
            youSearch: '',
            clickedItemId: null,
            token: null,
            dialog: null,
            roomingUserSocket: null,
            chat: null,
            socket: io('http://localhost:3010', {
                transports: ['websocket'],
            }),
            admin: false,
        }
    },
    // setup(data) {
    //     let disconnectSocket = () => {
    //         this.socket.disconnect();
    //         // console.log('Отключаемся')
    //     }

    //     onBeforeUnmount(() => {
    //         disconnectSocket();
    //     })

    // },
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
    unmounted() {
        this.socket.disconnect();
    },
    mounted() {
        this.perfAuth();
        // let socket = io('http://localhost:3005', {
        //     transports: ['websocket'],
        // });
        // console.log(socket);
        this.socket.connect();

        this.socket.emit('feedRoom');
        this.socket.on('sendnewdualoginput', (data) => {
            console.log("появился новый чат из поиска: ", data)
            if (!this.roomingUserSocket) {
                this.socket.emit('joinRoom', data._id);
                this.roomingUserSocket = data._id;
            } else {
                this.socket.emit('leaveRoom', this.roomingUserSocket);
                this.socket.emit('joinRoom', data._id);
                this.roomingUserSocket = data._id;
            }

            if (data.user_one == this.token.userId) {
                this.chats.push(data);
                this.dialog = data;
                this.showChat = true;
            }
            // newChat = data;
        });

        this.socket.on('foreverchatuserme', (data) => {
            if (data.user_two == this.token.userId) {
                this.chats.push(data);
            } else {
                console.log('Не добавился новый чат у собеседника(получателя)!')
            }
        });

        this.socket.on('chatMessagerSearchInput', (data) => {
            let users = data.users;
            
            if (users) {
                this.userIndex = users
            }

            if (!this.searchuser) {
                this.userIndex = null;
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
                console.log(this.token);
                if (this.token.role >= 2) {
                    this.admin = true
                    console.log('Добро пожаловать, наш Администратор!')
                }
            }


        },
        async getDialogs() {
            let token = document.cookie;
            let response = await axios.post('/api/getdialogs', {
                token: token
            })
            let chats = response.data;
            if (chats) {
                console.log();
                this.chats = chats;
            } else {
                console.log('Ненайдены чаты!')
            }

            this.socket.on('lastMessageSearch', (data) => {
                let text = data.text;
                let chatId = data.chatId;

                // let chats = this.chats;
                // console.log(chats);
                for (let i = 0; i < this.chats.length; i++) {
                    let chat = this.chats[i];

                    if (chat._id == chatId) {
                        chat.lastmessage = text
                    }
                }
                // console.log(this.chats);
            })
        },
        // async updateDialogs() {
        //     let token = document.cookie;
        //     let response = await axios.post('/api/getdialogs', {
        //         token: token
        //     })
        //     let chats = response.data;
        //     if (chats) {
        //         console.log();
        //         this.chats = chats;
        //     } else {
        //         console.log('Ненайдены чаты!')
        //     }
        // },
        async updateDialogs(chatId, lastMessage) {
            let chatIndex = this.chats.findIndex((chat) => chat.chatId === chatId);
            if (chatIndex !== -1) {
                this.chats[chatIndex].lastmessage = lastMessage;
            }
        },
        showsChatUser(newValue) {
            this.showChat = newValue
            console.log(newValue)
        },
        sendDialogMessages(newValue) {
            this.TakeDialog = newValue;
            console.log(this.dialog, this.roomingUserSocket);
            console.log('что за чат:', newValue)
            // this.newChatOfUser();
            // let socket = io('http://localhost:3005', {
            //     transports: ['websocket'],
            // });
            // this.socket.off('newMessage');
            if (this.roomingUserSocket == null) {
                this.socket.emit('joinRoom', this.TakeDialog._id);
                this.roomingUserSocket = this.TakeDialog._id;
            } else {
                this.socket.emit('leaveRoom', this.roomingUserSocket);
                this.socket.emit('joinRoom', this.TakeDialog._id);
                this.roomingUserSocket = this.TakeDialog._id;
            }

            this.dialog = newValue;

            // this.socket.on('newMessage', (data) => {
            //     this.dialog.messages.push({
            //         senderId: data.user,
            //         message: data.message
            //     });
            //     console.log(data);
            // })
            // this.listenTakeNewMessage();

            // let response = await axios.post('/api/takingproogds/setpol/dialogs/retate/user', {
            //     id: this.TakeDialog._id
            // });

            // console.log(response.data)
            // this.dialog = response.data;


            // console.log(this.dialog)
            // newChatOfUser(response.data);

        },
        // async newChatOfUser() {
        //     let socket = io('http://localhost:3005', {
        //         transports: ['websocket'],
        //     });

        //     if (!this.roomingUserSocket) {
        //         socket.emit('joinRoom', this.TakeDialog._id)
        //         this.roomingUserSocket = this.TakeDialog._id
        //     } else {
        //         socket.emit('leaveRoom', this.dialog._id);
        //         socket.emit('joinRoom', this.TakeDialog._id);
        //         this.roomingUserSocket = this.TakeDialog._id
        //     }

        //     let response = await axios.post('/api/takingproogds/setpol/dialogs/retate/user', {
        //         id: this.TakeDialog._id
        //     });
        //     let chat = response.data;

        //     if (chat) {
        //         this.dialog = chat;
        //         console.log(this.dialog)
        //     } else {
        //         console.log('Чат не найден!')
        //     }


        // },
        async inputSearch() {
            let text = this.searchuser;
            text = text.trim();

            this.socket.emit('searchFeedPerson', text);

            // -----------
            
        },
        async sendData(index) {
            // let user = this.userIndex[index];
            // let token = document.cookie;
            // this.searchuser = '';
            // this.userIndex = null;
            // let responсe = await axios.post('/api/configuration/auth/examination/token/user', {
            //     token: token
            // })
            // let iUser = responсe.data;
            // let response = await axios.post(`/api/save/newdialogs/chat/settings/podt`, {
            //     user: user,
            //     token: iUser
            // })

            // let dialogsNew = response.data;
            // if (!this.roomingUserSocket) {
            //     this.socket.emit('joinRoom', this.dialogsNew._id)
            //     this.roomingUserSocket = this.dialogsNew._id
            // } else {
            //     this.socket.emit('leaveRoom', this.dialog._id);
            //     this.socket.emit('joinRoom', this.dialogsNew._id);
            //     this.roomingUserSocket = this.dialogsNew._id
            // }
            // this.showChat = true;
            // this.dialog = dialogsNew;

            let user = this.userIndex[index];
            let token = this.token;
            this.searchuser = '';
            this.userIndex = null;
            console.log(token)
            // let newChat;


            // -----------------------------------

            this.socket.emit('updateinputchat', {
                idIUser: token,
                id: user._id,
                name: user.name,
                surname: user.surname
            });



            // ------------------------------------

            // this.dialog = newChat;



            // this.socket.off('sendNewDualogInput');
        },
        updateDialogs(newValue) {
            if (this.dialog.set_mark == 1) {
                this.dialog.user_two = this.dialog.time_two_user;
                this.dialog.set_mark == 0;
            }
            this.dialog.messages.push({
                senderId: newValue.user,
                message: newValue.message
            });
        },
        goToAdminPanel() {
            this.$router.push({
                name: 'feedPanel'
            })
        }
        // listenTakeNewMessage() {
        //     let socket = io('http://localhost:3005', {
        //         transports: ['websocket'],
        //     });

        //     socket.on('newMessage', (data) => {
        //         // this.dialog.messages.push({
        //         //     senderId: data.userId,
        //         //     message: data.message
        //         // });
        //         console.log(data);
        //     })
        // },
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
                <div class="inputSearchHeader">
                    <div class="element_inputHeaderSearch">
                        <input @input="inputSearch()" v-model="searchuser" placeholder="Найти человека" type="text">
                    </div>
                    <div class="containerPositionSearchUser">
                        <div class="elemTakeUser">
                            <ul>
                                <li v-for="(item, index) in userIndex" @click="sendData(index)" class="li_search">{{
                                    item.fullusername }}<span class="span_you_user_input" v-if="item._id == this.token.userId">(вы)</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="button_ui_header_container">
                <div v-if="admin" @click="goToAdminPanel" class="button_ui_header">
                    <p>Панель Управления</p>
                </div>
                <div class="button_ui_header">
                    <!-- <p>Помощь</p> -->
                </div>
            </div>
        </div>
    </header>
    <main>
        <AppMenuSideAccount />
        <AppChatsAccount :token="token" :chats="chats" @valueChanged="showsChatUser" @sendingDialogs="sendDialogMessages" />
        <AppShowDialog @newSendMessageTaking="updateDialogs" :socket="socket" :dialog="dialog" v-if="showChat" />
    </main>
</template>

<style scoped>
main {
    background-color: rgb(224, 190, 255);
    width: 100%;
    height: 100vh;
    display: flex;
}

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
    height: auto;
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

.span_you_user_input {
    color: rgb(22, 22, 207);
    position: absolute;
    right: 30px;

}
</style>