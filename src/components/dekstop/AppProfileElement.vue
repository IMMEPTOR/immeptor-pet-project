<script>
import axios from 'axios';

export default {
    data() {
        return {
            name: ''
        }
    },
    props: {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        }
    },
    mounted() {
        // console.log(this.firstName);
    },
    methods: {
        async getNameUser() {
            let token = document.cookie;
            let response = await axios.post('/api/getprofile', {
                token: token
            })
            let user = response.data;
            this.firstName = String(user.name);
            this.name = this.firstName
            if (user) {
                // console.log(this.name);
            } else {
                console.log('Ошибка вывода пользователя. Возможно не найден')
            }

        }
    },

}
</script>

<template>
    <div class="ContainerInformation">
        <div class="information_fgt_raccount">
            <div>
                <div class="image_account_user_container">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPo90FumZNXz_0Xj_JdzZ0SWEMpP55D05a-A&usqp=CAU"
                        alt="">
                </div>
                <div class="information_name_user_container">
                    <p>{{ firstName }} {{ lastName }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.ContainerInformation {
    /* background-color: #ca9788; */
    height: 100%;
    flex-grow: 1;
    display: flex;
    justify-content: center;
}

.information_fgt_raccount {
    background-color: #ffcefd;
    width: 80%;
    height: 40%;
    border-radius: 0 0 15px 15px;
    display: flex;
    align-items: center;
}

.information_fgt_raccount div {
    width: auto;
    height: auto;
    display: flex;
    gap: 15px;
    margin-left: 15px;
}

.image_account_user_container {
    width: 25%;
}

.image_account_user_container img {
    height: 200px;
    width: 100%;
    border-radius: 10px;
    pointer-events: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    -o-user-select: none;
    user-select: none;
}

.information_name_user_container {
    height: auto;
    /* background-color: #ca9788; */
}

.information_name_user_container p {
    font-size: 30px;
    font-family: 'Roboto', sans-serif;
    font-weight: 555;
    color: #313131;
    margin-top: 8px;
}
</style>