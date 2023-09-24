<script>
export default {
    data() {
        return {

        }
    },
    props: {
        connectUser: null,
        registerUser: null,
        adminsConnect: null,
    },
    mounted() {

    }
}
</script>

<template>
    <div class="container_text_infoApp_numbers">
        <div class="element_info_app">
            <div class="status_information">
                <p>В сети:</p>
            </div>
            <div class="meaning_number_information_app">
                <p>{{ connectUser }}</p>
            </div>
        </div>
        <div class="element_info_app">
            <div class="status_information">
                <p>Зарегистрированных:</p>
            </div>
            <div class="meaning_number_information_app">
                <p>{{ registerUser }}</p>
            </div>
        </div>
        <div class="element_info_app">
            <div class="status_information">
                <p> Администраторы в сети:</p>
            </div>
            <div class="meaning_number_information_app">
                <p>{{ adminsConnect }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container_information_app {
    width: 90%;
    height: 30%;
    background-color: #F8E7E7;
    border-radius: 10px;
    margin-top: 10px;
}

.infromation_text_container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20%;
    width: 100%;
    border-bottom: #c5c5c5 solid 0.1px;
}

.infromation_text_container p {
    margin: 0;
    font-size: 18px;
    font-family: 'Encode Sans', sans-serif;
    margin: 5px 0;
}

.container_text_infoApp_numbers {
    height: 80%;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: center;
    gap: 10px;
    /* background-color: yellow; */
}

.element_info_app {
    height: 85%;
    width: 30%;
    /* background-color: #4d4c4c; */
    display: flex;
    flex-direction: column;
}

.status_information {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 25%;
    width: 100%;
    /* background-color: yellow; */
}

.status_information p {
    margin: 0;
    font-size: 17px;
    color: #725454;
    font-family: 'Sen', sans-serif;
}

.meaning_number_information_app {
    height: 75px;
    width: 100%;
    /* background-color: yellow; */
    display: flex;
    justify-content: center;
    align-items: center;
}

.meaning_number_information_app p {
    color: #E97296;
    font-family: Inter;
    font-size: 64px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
</style>