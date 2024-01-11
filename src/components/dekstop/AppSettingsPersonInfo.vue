<script>
import axios from 'axios';

import { ref, watch, toRef } from 'vue'

export default {
    data() {
        return {
            name: null,
            surname: null,
            startName: null,
            startSurname: null,
            nameDisableInput: true,
            surnameDisableInput: true,
            id: null,
            windowShow: false,

        }
    },
    props: {
        email: null,
    },
    setup(props) {
        watch(
            () => props.dialog,
            (newValue, oldValue) => {
                this.windowShow = true;
            }
        );
    },
    async mounted() {
        let responce = await axios.post('/api/configuration/auth/examination/token/user', {
            token: document.cookie,
        })

        let date = responce.data;

        if (date.status == 105) {
            let getName = date.user.name;
            let getSurname = date.user.surname;

            this.id = date.decoded.userId;
            this.name = getName;
            this.surname = getSurname;

            this.$emit('getEmail', {
                email: date.user.email,
                id: date.user._id,
            });
        }
        this.startName = this.name;
        this.startSurname = this.surname;
    },
    methods: {
        editToGoInformation() {
            let editButton = document.querySelector(".button_edit_info");
            let saveButton = document.querySelector(".button_confirm_action");
            let element = document.getElementById("windowCheck");

            if (!editButton.classList.contains("change_button_mod_confirm_save_back")) {
                this.windowShow = false;
                editButton.classList.add("change_button_mod_confirm_save_back")
                editButton.innerHTML = 'Отменить'
                saveButton.classList.remove("disabled");
                this.nameDisableInput = false;
                this.surnameDisableInput = false;

            } else if (editButton.classList.contains("change_button_mod_confirm_save_back")) {
                editButton.classList.remove("change_button_mod_confirm_save_back")
                editButton.innerHTML = 'Редактировать'
                saveButton.classList.add("disabled");
                this.nameDisableInput = true;
                this.surnameDisableInput = true;
                this.name = this.startName;
                this.surname = this.startSurname;
            }
        },
        async sendChangeEditInfo() {
            let editButton = document.querySelector(".button_edit_info");
            let element = document.getElementById("windowCheck");
            let saveButton = document.querySelector(".button_confirm_action");

            if (this.startName !== this.name || this.startSurname !== this.surname) {
                let chek = true;
                if (!saveButton.classList.contains("disabled")) {
                    editButton.classList.remove("change_button_mod_confirm_save_back")
                    editButton.innerHTML = 'Редактировать'
                    saveButton.classList.add("disabled");
                    this.nameDisableInput = true;
                    this.surnameDisableInput = true;


                    this.windowShow = true;
                    let responce = await axios.post('/api/change/person/information/utrp/cp/do', {
                        name: this.name,
                        surname: this.surname,
                        idUser: this.id,
                    })
                }
            } else {
                editButton.classList.remove("change_button_mod_confirm_save_back")
                editButton.innerHTML = 'Редактировать'
                saveButton.classList.add("disabled");
                this.nameDisableInput = true;
                this.surnameDisableInput = true;
            }
            this.startName = this.name;
            this.startSurname = this.surname;
        },
        showWindow() {
            this.windowShow = true;
            let element = document.getElementById("windowCheck");
            setTimeout(function () {
                element.style.display = "none";
            }, 4000)
        },
        changeEmailPersonCommon() {
            this.$emit('emailStartChangeWindow', 'true');
        }
    }

}
</script>

<template>
    <div class="container_information_edit">
        <div class="container_input_change_info_person">
            <div class="container_name_and_surname_information">
                <div class="change_input_element">
                    <label for="" class="label_in_change_data edit_input_information">
                        <p>Имя:</p>
                        <input class="person_information" :disabled="nameDisableInput" type="text" v-model="name">
                    </label>
                </div>
                <div class="change_input_element">
                    <label for="" class="label_in_change_data edit_input_information">
                        <p>Фамилия:</p>
                        <input class="person_information" :disabled="surnameDisableInput" type="text" v-model="surname">
                    </label>
                </div>
            </div>
            <div class="container_change_email_person">
                <div class="container_email_change_person">
                    <div class="container_input_edit_email">
                        <label for="" class="label_in_change_data">
                            Почта:
                            <p class="email_information">{{ email }}</p>
                        </label>
                    </div>
                    <div class="button_edit_to_confirm_email">
                        <p @click="changeEmailPersonCommon">Изменить</p>
                    </div>
                </div>
            </div>
        </div>
        <div class="container_button_action">
            <div v-if="windowShow" id="windowCheck" class="window_luck_change_information">
                <img draggable="false" src="../../assets/img/check_window.png" alt="">
                <p class="text_window_luck">Изменения сохранены</p>
            </div>
            <div class="container_info_button_change">
                <p @click="editToGoInformation" class="button_edit_info">Редактировать</p>
                <p @click="sendChangeEditInfo" class="button_confirm_action disabled">Сохранить</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
* {
    margin: 0;
}

.container_information_edit {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
}

.container_input_change_info_person {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
}

.change_input_element {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    padding-left: 25px;
}

.container_input {
    flex-grow: 1;
}

.label_in_change_data {
    color: #763535;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    width: auto;
    /* display: flex; */
    /* align-items: end; */
}

.person_information {
    color: #725252;
    font-family: 'Inter', sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.edit_input_information {
    display: flex;
    align-items: end;
}

.edit_input_information p {
    position: relative;
    bottom: 3px;
}

input {
    border: none;
    outline: none;
    background-color: #FF8F8F;
    margin-left: 5px;
    width: auto;
}

.container_name_and_surname_information {
    display: flex;
    align-items: center;
    width: 100%;
}

.container_change_email_person {
    width: 100%;
    height: auto;
}

.container_email_change_person {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    padding-left: 25px;
}

.container_input_edit_email {
    min-width: 30%;
    width: auto;
    height: auto;
}

.container_input_edit_email label {}

.email_information {
    color: #691b1b;
    font-family: 'Inter', sans-serif;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    min-width: 50px;
    width: auto;
    /* background-color: red; */
}

.button_edit_to_confirm_email {
    width: 15%;
    height: auto;
    margin-left: 15px;
}

.button_edit_to_confirm_email p {
    color: #2A81D1;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.button_edit_to_confirm_email:hover {
    color: #2A81D1;
    cursor: pointer;
    text-decoration-line: underline;
}

.container_button_action {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 20px;
    height: auto;
    justify-content: center;
    align-items: center;
    margin-bottom: 50px;

    -webkit-touch-callout: none;
    /* iOS Safari */
    -webkit-user-select: none;
    /* Safari */
    -khtml-user-select: none;
    /* Konqueror HTML */
    -moz-user-select: none;
    /* Old versions of Firefox */
    -ms-user-select: none;
    /* Internet Explorer/Edge */
    user-select: none;
}

.button_edit_info {
    color: #7a4d4d;
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    background-color: #EDB900;
    padding: 10px 25px;
    border-radius: 12px;
    transition: all 0.08s;
    -webkit-box-shadow: 0px 6px 25px 0px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 0px 6px 25px 0px rgba(34, 60, 80, 0.2);
    box-shadow: 0px 6px 25px 0px rgba(34, 60, 80, 0.2);
}

.button_edit_info:hover {
    background-color: #be9604;
    color: #292929;
    cursor: pointer;
}

.button_confirm_action {
    width: auto;
    height: auto;
    text-align: center;
    color: rgb(214, 159, 159);
    font-family: 'Poppins', sans-serif;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    background-color: #00741d;
    padding: 10px 35px;
    border-radius: 12px;
    transition: all 0.08s;
    -webkit-box-shadow: 0px 6px 25px 0px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 0px 6px 25px 0px rgba(34, 60, 80, 0.2);
    box-shadow: 0px 6px 25px 0px rgba(34, 60, 80, 0.2);
}

.button_confirm_action:hover {
    cursor: pointer;
    color: #ffffff;
    background-color: rgb(9, 133, 30);
}

@keyframes startWindow {
    0% {
        opacity: 0%;
        top: 40px;
        display: flex;
    }

    50% {
        opacity: 50%;
        top: -10px;
    }

    100% {
        opacity: 100%;
        top: 0px;
        display: flex;
    }

    /* from {
        opacity: 0;
    }
    to {
        opacity: 1;
    } */
}

@keyframes endWindow {
    0% {
        opacity: 100%;
    }

    100% {
        opacity: 0%;
        /* top: 40px;
        display: flex; */
    }
}

.window_luck_change_information {
    opacity: 0%;
    width: 30%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    gap: 11px;
    padding: 10px 25px;
    background-color: #ccffd9;
    border-radius: 12px;
    outline: 1px #91b99a solid;

}

#windowCheck {
    animation: startWindow 0.9s forwards;
    display: flex;
}


.window_luck_change_information img {
    width: 35px;
    height: 35px;
}

.text_window_luck {
    color: rgb(25, 61, 7);
    font-family: 'Inter', sans-serif;
    font-size: 15px;
}

.container_info_button_change {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    gap: 100px;
}

.disabled {
    color: #9c7676;
    background-color: #e2d3d3;
}

.disabled:hover {
    cursor: default;
    color: #9c7676;
    background-color: #e2d3d3;
}

.change_button_mod_confirm_save_back {
    background-color: #e93103;
    color: white;
}

.change_button_mod_confirm_save_back:hover {
    background-color: #bb2601;
    color: rgb(209, 209, 209);
}
</style>