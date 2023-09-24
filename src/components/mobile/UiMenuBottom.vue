<script>
export default {
    data() {
        return {

        }
    },
    methods: {
        goToChats() {
            this.$router.push({
                name: 'chats'
            })

            setTimeout(() => {
                document.querySelector('#chat').classList.toggle('active');
            }, 0.1)
            
        },
        goToProfile() {
            this.$router.push({
                name: 'profile'
            })
            setTimeout(() => {
                document.querySelector('#profile').classList.toggle('active');
            }, 0.1)
            
        },
    }
}
</script>

<template>
    <div class="ui_navigation_mobile">
        <div @click="goToChats" id="chat" class="navigation_element_ui">
            <img src="../../assets/img/chat-prof.png" alt="">
            <p>Чаты</p>
        </div>
        <div @click="goToProfile" id="profile" class="navigation_element_ui">
            <img src="../../assets/img/profile-mobile.png" alt="">
            <p>Профиль</p>
        </div>
    </div>
</template>

<style scoped>
* {
    margin: 0;
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