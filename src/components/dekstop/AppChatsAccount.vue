<script>
import axios from 'axios';

export default {
    data() {
        return {
            lastMessage: {

            }
        }
    },
    props: {
        chats: [],
        token: ''
    },
    mounted() {
    },
    methods: {
        async showsChat(index) {
            let chat = this.chats[index];

            let response = await axios.post('/api/takingproogds/setpol/dialogs/retate/user', {
                id: chat._id,
            });

            let dialog = response.data;
            this.$emit('sendingDialogs', dialog);
            this.$emit('valueChanged', 'true')
        },
        // sendDialog(index) {
        //     this.$emit('valueChanged', 'true')
        // }
    }
}
</script>

<template>
    <div class="containerChats">
        <div @click="showsChat(index)" v-for="(item, index) in chats" class="ChatContainerFeed">
            <div class="containerOneChat">
                <div class="chatImageAvatar">
                    <!-- <svg src="https://sun9-76.userapi.com/impg/7c4wf66QnZrHhqxpf9IDPbHKG1ouAbcTA83ZmA/_uWAmESiqdc.jpg?size=810x1080&quality=95&sign=f033a38bc1c2f503a19431327c540d08&type=album"></svg>  -->
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPo90FumZNXz_0Xj_JdzZ0SWEMpP55D05a-A&usqp=CAU"
                        alt="">
                </div>
                <div class="containerInformationChatUser">
                    <div class="infoChatName">
                        <p v-if="item.user_one == this.token.userId">{{ item.username_two }} {{
                            item.surname_two }}
                        </p>
                        <p v-if="item.user_two == this.token.userId">{{ item.username_one }} {{
                            item.surname_one }}
                        </p>
                    </div>
                    <div class="infoMessageChatUser">
                        <p>{{ item.lastmessage }}</p>
                    </div>
                </div>
                <!-- <div></div> -->
            </div>
            <hr>
        </div>
    </div>
</template>

<style scoped>
.containerChats {
    width: 20%;
    height: 100%;
    background-color: #FFACAC;
    overflow: scroll;
    overflow-x: hidden;
}

.containerChats::-webkit-scrollbar {
    width: 3px;
    background-color: #f9f9fd;
}

.containerChats::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #ad6e6e;

    /* background-color: #ffffff; */
    /* border: 3px solid #303030; */
}

.containerChats::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
    background-color: #FFACAC;
}


.containerOneChat {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 10px;
    /* text-align: center; */
    width: 100%;
    height: 75px;
    /* background-color: green; */
}

.chatImageAvatar {
    text-align: center;
    margin-left: 10px;
}

.chatImageAvatar img {
    position: relative;
    top: 2px;
    width: 40px;
    height: 55px;
    /* object-fit: cover; */
    border-radius: 10%;
}

.containerInformationChatUser {
    height: 76%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-content: center;
    /* background-color: yellow; */
}

hr {
    /* position: relative;
    bottom: 4px; */
    border: none; /* Убираем границу для браузера Firefox */
    /* color: rgb(70, 70, 70); Цвет линии для остальных браузеров */
    background-color: #da9191;/* Цвет линии для браузера Firefox и Opera */
    height: 0.1px;
    margin: 0;
}



.infoChatName {
    font-size: 15px;
    font-weight: 550;
    color: rgb(61, 61, 61);
    font-family: 'Lato', sans-serif;
    margin-bottom: -5px;
}

.infoChatName p {
    margin: 0;
}

.infoMessageChatUser {
    font-size: 14.5px;
    font-family: 'Quicksand', sans-serif;
}

.infoMessageChatUser p {
    margin: 0;
}

.ChatContainerFeed:hover {
    background: rgba(255, 0, 0, 0.17);
    box-shadow: inset 15px 9px 54px 1px rgba(0, 0, 0, 0.25);   
    cursor: pointer;
}

.ChatContainerFeed {
    transition: all 0.2s;
}
</style>