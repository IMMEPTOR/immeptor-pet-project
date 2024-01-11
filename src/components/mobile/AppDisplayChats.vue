<script>
import axios from 'axios';
import dayjs from 'dayjs'

import socket from '../../socket';
export default {
    data() {
        return {

        }
    },
    props: {
        chats: [],
        token: '',
    },
    mounted() {

    },
    methods: {
        async convertBlockElementTo(index) {
            let chat = this.chats[index];
            let response = await axios.post('/api/takingproogds/setpol/dialogs/retate/user', {
                id: chat._id,
            });
            let dialog = response.data;
            let senderId = null;
            if (dialog.user_one == this.token.userId) {
                senderId = dialog.time_two_user;
            } else if (dialog.user_two == this.token.userId) {
                senderId = dialog.user_one;
            }
            this.$emit('sendingDialogs', dialog);
            this.$emit('valueChanged', 'true')
            this.$emit('statusEventPerson', senderId)
        },
    }
}
</script>

<template>
    <div class="container_chat_elements">
        <div v-for="(item, index) in chats" @click="convertBlockElementTo(index)" class="element_chat_send">
            <div class="container_information_chat_sender">
                <div class="avatar_chat_of_user_send">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPo90FumZNXz_0Xj_JdzZ0SWEMpP55D05a-A&usqp=CAU"
                        alt="">
                </div>
                <div class="container_name_sender_user_info">
                    <p class="name_user_chat" v-if="item.user_one == this.token.userId">{{ item.username_two }} {{
                        item.surname_two }}
                    </p>
                    <p class="name_user_chat" v-if="item.user_two == this.token.userId">{{ item.username_one }} {{
                        item.surname_one }}
                    </p>
                    <p class="last_message_chat">{{ item.lastmessage }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
* {
    padding: 0;
    margin: 0;
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
</style>
