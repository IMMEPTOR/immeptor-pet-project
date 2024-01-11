<script>
import UiMenuBottom from '../../components/mobile/UiMenuBottom.vue';
import ErrorText from '../../components/mobile/AppErrorText.vue';
import EmailHideVue from '../../components/mobile/AppEmailHide.vue';
import axios from 'axios';
export default {
    data() {
        return {
            privCodeEmail: true,
            stepCheckForm: false,
            secureFormFeed: false,
            nameDataUser: "",
            nameNoChangeUser: "",
            surnameDataUser: "",
            surnameNoChangeUser: "",
            id: null,
            actionPersonTo: false,
            actionChangeEmailFrom: false,
            actionSecureTo: false,
            actionChangePasswordChange: false,
            passwordEmail: null,
            newEmailUsers: "",
            errorView: null,
            email: null,
            passInpEmail: false,
            dispButtonContinue: true,
            dispButtonConfirm: false,
            emailInpChange: false,
            code: null,
            userCode: null,
            hideEmail: null,
            formPassFirst: null,
            formPassSecond: null,
            formPassThird: null,
        }
    },
    components: {
        UiMenuBottom,
        ErrorText,
        EmailHideVue,
    },
    async mounted() {

        let responce = await axios.post('/api/get/usermodel/information/imm/ms/dul', {
            token: document.cookie,
        })
        let date = responce.data;
        if (date.status == 105) {
            let getName = date.user.name;
            let getSurname = date.user.surname;
            this.id = date.user._id;
            this.email = date.user.email;
            this.nameDataUser = getName;
            this.nameNoChangeUser = getName;
            this.surnameDataUser = getSurname;
            this.surnameNoChangeUser = getSurname;
            // this.$emit('getEmail', {
            //     email: date.user.email,
            //     id: date.user._id,
            // });
        }
        this.startName = this.name;
        this.startSurname = this.surname;
        function hideEmail(email) {
            // let dabRange = email.repeat(1);
            // Определяем индекс символа @ в адресе
            // let emailDom = String(email);
            let index_at = email.indexOf('@');

            // Определяем часть до символа @ и после него
            let username = email.slice(0, index_at);
            console.log(username)
            let domain = email.slice(index_at);
            console.log(Math.min(7, username.length - 3));

            // Шифруем часть до символа @, оставляя первые 5 символов
            let encryptedUsername = username.slice(0, 5) + '*'.repeat(Math.min(7, username.length - 3));
            
            // Собираем новый адрес электронной почты
            let processedEmail = encryptedUsername + domain;

            
            return processedEmail;
        }
        this.hideEmail = hideEmail(this.email);

        this.inputEventNameFormPerson();

        // document.querySelector(".namePersonFeedInput").addEventListener("input", function  {
        //     this.errorView = "";
        // })
        let inputs = document.querySelectorAll(".input_person_information_edit");
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener("input", () => {
                this.errorView = "";
            })
        }

    },
    methods: {
        animationFrameFeedPersonFormAction() {
            let personContainer = document.getElementById("personInformFeedFrame");
            if (this.stepCheckForm == false) {
                personContainer.style.left = "0";
                this.stepCheckForm = true;
            } else {
                personContainer.style.left = `${100}vw`;
                this.stepCheckForm = false;
            }
        },
        animationFrameFeedSecureInfromationForm() {
            let containerSecure = document.getElementById("containerSecureFeedInform");
            if (this.secureFormFeed == false) {
                containerSecure.style.left = "0";
                this.secureFormFeed = true;
            } else {
                containerSecure.style.left = `${100}vw`;
                this.secureFormFeed = false;
            }
        },
        inputEventNameFormPerson() {
            let elementName = document.getElementsByClassName("inputPerson_informationChange");
            // let elementSurname = document.getElementById("surnamePersonFeedInput");
            let buttonActionSendData = document.getElementById("saveButtonDataPerson");
            for (let i = 0; i < elementName.length; i++) {
                elementName[i].addEventListener("input", () => {
                    if (this.nameNoChangeUser !== this.nameDataUser || this.surnameDataUser !== this.surnameNoChangeUser) {
                        buttonActionSendData.classList.remove("disabled");

                    } else {
                        buttonActionSendData.classList.add("disabled");
                    }
                    this.errorView = "";
                })
            }
        },
        goToChangeEmailToOtherForm() {
            let formChangeEmail = document.getElementById("formChangeContainerInformation");
            let personContainer = document.getElementById("personInformFeedFrame");

            if (this.actionPersonTo == false) {
                formChangeEmail.style.left = "0";
                personContainer.style.left = `${-100}vw`;
                this.actionPersonTo = true;
                this.passwordEmail = "";
                this.newEmailUsers = "";
            } else {
                formChangeEmail.style.left = `${100}vw`;
                personContainer.style.left = "0";
                this.actionPersonTo = false;
            }
        },
        goToChangePasswordUserAccount() {
            let containerSecure = document.getElementById("containerSecureFeedInform");
            let containerPasswordSecure = document.getElementById("formChangeContainerPasswordOfSecure");
            if (this.actionSecureTo == false) {
                containerSecure.style.left = `${-100}vw`;
                containerPasswordSecure.style.left = "0";
                this.actionSecureTo = true;
            } else {
                containerSecure.style.left = "0";
                containerPasswordSecure.style.left = `${100}vw`;
                this.actionSecureTo = false;
            }
        },
        async goToChangePersonData() {
            let buttonActionSendData = document.getElementById("saveButtonDataPerson");
            if (!buttonActionSendData.classList.contains("disabled")) {
                let responce = await axios.post('/api/change/person/information/utrp/cp/do', {
                    name: this.nameDataUser,
                    surname: this.surnameDataUser,
                    idUser: this.id,
                })
                if (responce.status == 200) {
                    this.nameNoChangeUser = this.nameDataUser;
                    this.surnameDataUser = this.surnameNoChangeUser;
                    buttonActionSendData.classList.add("disabled");
                } else {
                    console.log('Ничего не получаю..');
                }
            }
        },
        async checkValidatePasswordToChangeEmail() {
            let passUser = this.passwordEmail;
            let provEmailUser = this.newEmailUsers;
            function validateEmail(email) {
                const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return emailPattern.test(email);
            };
            function emailVerify(email) {
                let domainRegex = /@([A-Za-z0-9.-]+)$/;
                // Извлечение домена из электронной почты
                let match = email.match(domainRegex);
                if (match) {
                    let domain = match[1];
                    // Проверка домена на иностранность
                    let foreignDomains = ["gmail.com", "yahoo.com", "hotmail.com"]; // Добавьте другие иностранные домены при необходимости
                    if (foreignDomains.includes(domain)) {
                        return false;
                    } else {
                        return true;
                    }
                }
            }
            if (passUser && provEmailUser) {
                let response = await axios.post('/api/auth/login', {
                    email: this.email,
                    password: this.passwordEmail
                })
                let date = response.data;
                if (date.status == 401) {
                    this.errorView = "Неверный пароль";
                } else {
                    if (!validateEmail(this.newEmailUsers)) {
                        this.errorView = "Неверный Email"
                    } else if (!emailVerify(this.newEmailUsers)) {
                        this.errorView = "Неподдерживаемые почтовые домены"
                    } else {
                        this.passInpEmail = true;
                        this.dispButtonContinue = false;
                        this.dispButtonConfirm = true;
                        let input = document.querySelector("#checkedCodeConfirm");
                        let buttonChange = document.querySelector(".elemChangeButEmForm");
                        let imgCheckPass = document.querySelector(".imageFormEmailPassCheck");
                        let inputFirst = document.querySelector(".labelFormEmailFirst");
                        let inputSecond = document.querySelector(".inputSecondFormEmailChange");
                        let labelCode = document.querySelector(".labelCodeEmail");
                        imgCheckPass.classList.remove("position_imageHidePositiveJSk73");
                        inputFirst.classList.add("dissablePassElmFromForm");
                        input.classList.remove("disabled_input");
                        inputSecond.classList.add("container_change_provide_input_information_user");
                        labelCode.classList.remove("disabled_label");
                        this.privCodeEmail = false;
                        this.emailInpChange = true;
                        buttonChange.classList.remove("position_button_change_input_data");

                        function generateCode() {
                            let code = '';
                            let digits = '0123456789';
                            for (var i = 0; i < 8; i++) {
                                var randomIndex = Math.floor(Math.random() * digits.length);
                                code += digits.charAt(randomIndex);
                            }
                            return code;
                        }
                        this.code = generateCode();
                        axios.post('/api/send/email/code', {
                            code: this.code,
                            email: this.newEmailUsers,
                        })

                    }
                }
            } else {
                this.errorView = "Заполните все поля";
            }
        },
        async CheckCodeAndSaveNewEmail() {
            if (this.userCode == this.code) {
                await axios.post('/api/send/info/change/email/configeration/person/info', {
                    email: this.newEmailUsers,
                    id: this.id,
                })
                this.email = this.newEmailUsers;
                function hideEmail(email) {
                    // Определяем индекс символа @ в адресе
                    let index_at = email.indexOf('@');

                    // Определяем часть до символа @ и после него
                    let username = email.slice(0, index_at);
                    let domain = email.slice(index_at);

                    // Шифруем часть до символа @, оставляя первые 5 символов
                    let encryptedUsername = username.slice(0, 5) + '*'.repeat(username.length - 5);

                    // Собираем новый адрес электронной почты
                    let processedEmail = encryptedUsername + domain;

                    return processedEmail;
                }
                this.hideEmail = hideEmail(this.email);
                this.comeBackFromFormEmailToPersonInformationContainer();

            } else {
                this.errorView = "Неверный код"
            }
        },
        comeBackFromFormEmailToPersonInformationContainer() {
            this.passInpEmail = false; //
            this.dispButtonContinue = true; //
            this.dispButtonConfirm = false; //
            let input = document.querySelector("#checkedCodeConfirm");
            let buttonChange = document.querySelector(".elemChangeButEmForm");
            let imgCheckPass = document.querySelector(".imageFormEmailPassCheck");
            let inputFirst = document.querySelector(".labelFormEmailFirst");
            let inputSecond = document.querySelector(".inputSecondFormEmailChange");
            let labelCode = document.querySelector(".labelCodeEmail");
            imgCheckPass.classList.add("position_imageHidePositiveJSk73"); //
            inputFirst.classList.remove("dissablePassElmFromForm"); //
            input.classList.add("disabled_input"); //
            inputSecond.classList.remove("container_change_provide_input_information_user"); //
            labelCode.classList.add("disabled_label"); //
            this.privCodeEmail = true; //
            this.emailInpChange = false; //
            buttonChange.classList.add("position_button_change_input_data"); //
            // -->
            this.passwordEmail = null;
            this.newEmailUsers = null;
            this.userCode = null;
            this.code = null;
            this.goToChangeEmailToOtherForm();
            setTimeout(() => {
                this.errorView = "";
            }, 600);
        },
        changeInsertEmail() {
            let elem = document.getElementById("changeEmailUser");
            let buttonChange = document.querySelector(".elemChangeButEmForm");
            let inputSecond = document.querySelector(".inputSecondFormEmailChange");
            let input = document.querySelector("#checkedCodeConfirm");
            let labelCode = document.querySelector(".labelCodeEmail");
            this.emailInpChange = false;
            setTimeout(() => {
                elem.focus();
            }, 100)
            inputSecond.classList.remove("container_change_provide_input_information_user"); //
            buttonChange.classList.add("position_button_change_input_data"); //
            input.classList.add("disabled_input"); //
            labelCode.classList.add("disabled_label"); //
            this.dispButtonContinue = true;
            this.dispButtonConfirm = false;
        },
        comeBackToMenuClose() {
            this.$router.go(-1);
        },
        deleredJWtTokenAuth() {
            document.cookie = "cookieName=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"
            if (!document.cookie) {
                this.$router.push({
                    name: 'fe'
                })
            }
        },

    }
}
</script>

<template>
    <main>
        <div v-if="true" class="container_forms_feed_info_data" id="containerFeedelemAction">


            <div v-if="true" class="container_forms_settings_feed_page">
                <div class="container_information_name_setting">
                    <div @click="comeBackToMenuClose" class="container_element_ui_back"><img src="../../assets/img/closeElem.png" alt=""></div>
                    <div class="element_name_setting_form">
                        <p>Настройки</p>
                    </div>
                </div>
            </div>

            <!-- Главный блок (выборка элементов настроек) -->
            <div v-if="true" class="container_number_action_to_person_information">
                <div>
                    <div class="container_element_action_editted">
                        <div @click="animationFrameFeedPersonFormAction()"
                            class="container_information_feed_form_element_text">
                            <p>Личные данные</p>
                        </div>
                        <hr>
                    </div>
                    <div class="container_element_action_editted">
                        <div @click="animationFrameFeedSecureInfromationForm()"
                            class="container_information_feed_form_element_text">
                            <p>Безопасность</p>
                        </div>
                        <hr>
                    </div>
                </div>

                <div class="container_button_feed_formAction_leave">
                    <div @click="deleredJWtTokenAuth" class="button_element_leave">
                        <p>Выйти из аккаунта</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Блок с ФИО (Личная информация) -->
        <div class="container_forms_feed_info_data" id="personInformFeedFrame">
            <div v-if="true" class="container_forms_settings_feed_page">
                <div class="container_information_name_setting">
                    <div @click="animationFrameFeedPersonFormAction()" class="container_image_icons_tohd_dk"><img
                            src="../../assets/img/backMobilenav.png" alt=""></div>
                    <div class="element_name_setting_form">
                        <p>Личная информация</p>
                    </div>
                </div>
            </div>

            <div v-if="true" class="container_person_page_form">
                <div class="container_input_settings">
                    <div class="element_person_container_settings_info_edit">
                        <label for="">
                            Имя:
                            <input autocomplete="off" v-model="nameDataUser"
                                class="input_person_information_edit inputPerson_informationChange namePersonFeedInput"
                                type="text">
                            <div class="error_icons_edit_input">
                                <p>!</p>
                            </div>
                        </label>
                    </div>
                    <div class="element_person_container_settings_info_edit">
                        <label for="">
                            Фамилия:
                            <input autocomplete="off" v-model="surnameDataUser"
                                class="input_person_information_edit inputPerson_informationChange surnamePersonFeedInput"
                                type="text">
                            <div class="error_icons_edit_input">
                                <p>!</p>
                            </div>
                        </label>
                    </div>
                    <div class="element_container_email_information_edit">
                        <div class="container_email_person_info_edit">
                            <label for="">
                                Эл.почта:
                                <EmailHideVue :email="hideEmail" />
                            </label>
                            <p @click="goToChangeEmailToOtherForm()" class="text_button_action_edit_email">Изменить</p>
                        </div>
                    </div>
                </div>
                <div class="container_button_confirm_to_save_indormation_adited">
                    <div @click="goToChangePersonData()" id="saveButtonDataPerson" class="container_save_button disabled">
                        <p>Сохранить изменения</p>
                    </div>
                </div>
            </div>
        </div>


        <!-- Блок с паролем (Безопасность) -->
        <div class="container_forms_feed_info_data" id="containerSecureFeedInform">
            <div v-if="true" class="container_forms_settings_feed_page">
                <div class="container_information_name_setting">
                    <div @click="animationFrameFeedSecureInfromationForm()" class="container_image_icons_tohd_dk"><img
                            src="../../assets/img/backMobilenav.png" alt=""></div>
                    <div class="element_name_setting_form">
                        <p>Безопасность</p>
                    </div>
                </div>
            </div>

            <div v-if="true" class="container_person_page_form">
                <div class="container_input_settings">
                    <div class="element_container_email_information_edit">
                        <div class="container_email_person_info_edit">
                            <label for="">
                                Пароль:
                                <p>******************</p>
                                <p class="data_changePassUser">Не изменён после регистрации!</p>
                            </label>
                            <p v-if="false" @click="goToChangePasswordUserAccount()"
                                class="text_button_action_edit_email disableButtonText">Изменить</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ОКНА изменения данных -->
        <!-- Изменение почты -->

        <div class="container_data_change_information_user" id="formChangeContainerInformation">
            <div class="container_edit_other_and_form_block">
                <div class="container_edit_data_form_title">
                    <div class="container_change_to_edit_information_data_user">
                        <div @click="comeBackFromFormEmailToPersonInformationContainer()"
                            class="container_image_icons_tohd_dk"><img src="../../assets/img/backMobilenav.png" alt="">
                        </div>
                        <div class="title_name_form_data_edit_user">
                            <p>Изменение почты</p>
                        </div>
                    </div>
                </div>
                <div class="container_form_input_and_action_change_data">
                    <form action="" class="container_edit_form_data_user" autocomplete="off">
                        <ErrorText :text="errorView" />

                        <div class="container_input_forms_change_data_users">
                            <div class="container_second_child_change_user_information">
                                <label for="">
                                    Существующий пароль:
                                    <div class="container_input_change_information_data labelFormEmailFirst">
                                        <!-- <div class="ever_check_true_from_backFormPass"> -->
                                        <img class="ever_check_true_from_backFormPass position_imageHidePositiveJSk73 imageFormEmailPassCheck"
                                            src="../../assets/img/check_window.png" alt="">
                                        <!-- </div> -->
                                        <input :disabled="passInpEmail" v-model="passwordEmail"
                                            class="input_person_information_edit back39mdklLow inputFirstPassEmail"
                                            type="password" autocmplete="off">
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div class="container_input_forms_change_data_users">
                            <div class="container_second_child_change_user_information">
                                <label for="">
                                    Новый Email:
                                    <div class="container_input_change_information_data">
                                        <div @click="changeInsertEmail()"
                                            class="container_button_edit_change_back_information position_button_change_input_data elemChangeButEmForm">
                                            Изменить
                                        </div>
                                        <input :disabled="emailInpChange" v-model="newEmailUsers"
                                            class="inputSecondFormEmailChange input_person_information_edit back39mdklLow"
                                            type="email" id="changeEmailUser">
                                    </div>
                                </label>
                            </div>
                        </div>
                        <div class="container_input_forms_change_data_users disabled_label labelCodeEmail">
                            <div class="container_second_child_change_user_information">
                                <label for="">
                                    Код подтверждения:
                                    <input v-model="userCode" :disabled="privCodeEmail"
                                        class="input_person_information_edit disabled_input" type="number"
                                        id="checkedCodeConfirm">
                                </label>
                            </div>
                        </div>
                    </form>
                    <div class="container_button_save_and_continue_to_ation_save">
                        <div v-if="dispButtonContinue" @click="checkValidatePasswordToChangeEmail"
                            class="container_edit_to_action_button ">
                            <p>Продолжить</p>
                        </div>
                        <div @click="CheckCodeAndSaveNewEmail()" v-if="dispButtonConfirm"
                            class="container_edit_to_action_button ">
                            <p>Подтвердить</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        <!-- Форма для изменения пароля -->
        <div v-if="true" class="container_data_change_information_user" id="formChangeContainerPasswordOfSecure">
            <div class="container_edit_other_and_form_block">
                <div class="container_edit_data_form_title">
                    <div class="container_change_to_edit_information_data_user">
                        <div @click="goToChangePasswordUserAccount()" class="container_image_icons_tohd_dk"><img
                                src="../../assets/img/backMobilenav.png" alt="">
                        </div>
                        <div class="title_name_form_data_edit_user">
                            <p>Изменение пароля</p>
                        </div>
                    </div>
                </div>
                <div class="container_form_input_and_action_change_data">
                    <div class="container_edit_form_data_user">
                        <ErrorText :text="errorView" />
                        <div class="container_input_forms_change_data_users">
                            <div class="container_second_child_change_user_information">
                                <label for="">
                                    Существующий пароль:
                                    <input autocomplete="off" class="input_person_information_edit" type="password">
                                </label>
                            </div>
                        </div>
                        <div class="container_input_forms_change_data_users">
                            <div class="container_second_child_change_user_information">
                                <label for="">
                                    Новый пароль:
                                    <input class="input_person_information_edit" type="password">
                                </label>
                            </div>
                        </div>
                        <div class="container_input_forms_change_data_users">
                            <div class="container_second_child_change_user_information">
                                <label for="">
                                    Повторите новый пароль:
                                    <input class="input_person_information_edit" type="password">
                                </label>
                            </div>
                        </div>

                    </div>
                    <div class="container_button_save_and_continue_to_ation_save">
                        <div class="container_edit_to_action_button ">
                            <p>Изменить</p>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </main>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Inter&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Ubuntu&display=swap');

* {
    margin: 0;
}

main {
    position: relative;
    /* align-items: center; */
    /* justify-content: center; */
}

.container_forms_settings_feed_page {
    width: 100%;
    height: 10%;
    /* background-color: aliceblue; */
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    border-bottom: 0.2px solid rgb(179, 99, 99);
}

.container_forms_feed_info_data {
    background-color: #FF8F8F;
    width: 100vw;
    height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
}

.container_information_name_setting {
    display: flex;
    justify-content: center;
    /* align-items: center; */
    height: auto;
    /* position: relative; */
}

.container_element_ui_back {
    width: auto;
    height: auto;
    position: absolute;
    left: 0;
    top: 0;
    /* text-align: center; */
}

.container_element_ui_back img {
    width: 60px;
    opacity: 60%;
    padding: 7px 0 7px 15px;
}

.element_name_setting_form {
    font-size: 25px;
    font-style: normal;
    font-weight: 555;
    line-height: normal;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Inter', sans-serif;
    height: 100%;
    flex-grow: 1;
}

.container_number_action_to_person_information {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 90%;
    width: 100%;


}

.container_element_action_editted {
    width: 100%;
    height: 60px;
    position: relative;
    display: flex;
    flex-direction: column;
}

.container_element_action_editted:hover {
    background-color: #e27d7d;
}

.container_information_feed_form_element_text {
    height: 100%;
    display: flex;
    align-items: center;
    font-family: 'Open Sans', sans-serif;
    font-size: 18px;
    display: flex;
    align-items: center;
    padding-left: 20px;
    font-weight: 550;
}

.container_element_action_editted hr {
    /* position: absolute;
    bottom: 0;
    width: 100%; */

    border: none;
    height: 0.1px;
    /* Set the hr color */
    color: #bd4a4a;
    /* old IE */
    background-color: #b96363;
    /* Modern Browsers */
}

.container_person_page_form {
    width: 100%;
    height: 90%;
    display: flex;
    flex-direction: column;
    align-content: center;
    padding-top: 15px;
    gap: 50px;

}

.container_input_settings {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
}

.element_person_container_settings_info_edit {
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    width: 100%;
}

.element_person_container_settings_info_edit label {
    /* height: 70%; */
    display: flex;
    flex-direction: column;
    width: 90%;
    gap: 2px;
    position: relative;

    color: #763535;

    font-family: "Inter", sans-serif;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    /* align-items: center; */
}

/* .element_person_container_settings_info_edit label:last-child {} */

.element_container_email_information_edit {
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    width: 100%;
    margin-top: 10px;
}

.container_email_person_info_edit {
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    /* gap: 25px; */

    /* gap: 20px; */
}

.container_email_person_info_edit label {
    display: flex;
    flex-direction: column;
    width: 65%;
    gap: 2px;

    color: #763535;

    font-family: "Inter", sans-serif;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    position: relative;
}

/* .container_email_person_info_edit label:before {
    content: '';
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: linear-gradient(transparent 150px, white);
} */

label p {
    flex-grow: 1;
    color: #462626;
    /* font-family: "Inter", sans-serif; */
    font-size: 17px;
    font-style: normal;
    font-weight: 666;
    line-height: normal;
}

.text_button_action_edit_email {
    flex-grow: 1;
    text-align: center;

    color: #0077ff;

    font-family: "Inter", sans-serif;
    font-size: 15px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    letter-spacing: 0.15px;
    text-decoration-line: underline;
    transition: all 0.2s;
}

.text_button_action_edit_email:hover {
    color: #0051ff;
}

.input_person_information_edit {

    height: 45px;
    width: 100%;
    background-color: #d9d9d97e;
    border-radius: 8px;
    outline: none;
    border: none;
    color: #3C3838;
    font-family: "Inter", sans-serif;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;

}

.container_button_confirm_to_save_indormation_adited {
    width: auto;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
}

.container_save_button {
    width: auto;
    height: auto;
    text-align: center;
    background-color: #B1D9E1;
    border-radius: 5px;
    font-family: "Inter", sans-serif;
    font-size: 13px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;

    -webkit-box-shadow: 0px 0px 93px 0px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 0px 0px 93px 0px rgba(34, 60, 80, 0.2);
    box-shadow: 0px 0px 93px 0px rgba(34, 60, 80, 0.2);
    transition: all 0.2s;
}

.container_save_button:hover {
    background-color: #a8c9cf;

}

.container_save_button p {
    padding: 15px 15px;

}



/* стили для блока формы изменения данных (глб) */
.container_edit_other_and_form_block {
    background-color: #FF8F8F;
    width: 95%;
    height: 500px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-content: center;
    border-radius: 15px;
    /* justify-content: center; */
    /* padding-top: 15px; */
    /* gap: 50px; */
}

.container_edit_form_data_user {
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    padding-top: 15px;
}

.container_input_forms_change_data_users {
    display: flex;
    justify-content: center;
    align-items: center;
    height: auto;
    width: 100%;
}

.container_second_child_change_user_information {
    width: 90%;

}

.container_input_change_information_data {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: start;
    background-color: #d9d9d97e;
    border-radius: 8px;
    padding-left: 5px;
}

.container_button_edit_change_back_information {
    position: absolute;
    right: 0;
    z-index: 1;
    font-weight: 400;
    color: #047ae7;
    font-size: 13px;
    background-color: #aec5e77e;
    height: 100%;
    width: 25%;

    border-radius: 8px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 100%;
    transition: all 0.2s;
}

.container_change_provide_input_information_user {
    width: 70%;
    border-radius: 8px 0 0 8px;
    background: none;
    transition: all 1s;

}

.container_button_edit_change_back_information:hover {
    color: #046bcc;
    background-color: #b9bdc47e;
}

.container_input_forms_change_data_users label {
    /* height: 70%; */
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 2px;

    color: #763535;

    font-family: "Inter", sans-serif;
    font-size: 13px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    /* align-items: center; */
}

.position_button_change_input_data {
    right: -30%;
    opacity: 0%;
}


.container_data_change_information_user {
    background-color: #E0BEFF;
    width: 100vw;
    height: 100vh;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;

}

.container_edit_data_form_title {
    width: 100%;
    height: 65px;
    /* background-color: black */
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 0.2px solid rgb(179, 99, 99);
    position: relative;
    text-align: center;

}

.container_change_to_edit_information_data_user {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    text-align: center;
}

.container_image_icons_tohd_dk {
    width: fit-content;
    height: fit-content;
    position: absolute;
    left: 0;
    top: 0;
}

.container_image_icons_tohd_dk img {
    width: 100%;
    height: 100%;
    opacity: 25%;
    padding: 1px 0 1px 2px;
    transition: all 0.2s;
}

.container_image_icons_tohd_dk img:hover {
    opacity: 45%;
}

.title_name_form_data_edit_user p {
    font-size: 20px;
    font-style: normal;
    font-weight: 555;
    line-height: normal;
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: 'Inter', sans-serif;
    height: 100%;
}

.container_button_save_and_continue_to_ation_save {
    width: auto;
    height: auto;
    display: flex;
    align-items: center;
    justify-content: center;
}

.container_edit_to_action_button {
    width: auto;
    height: auto;
    text-align: center;
    background-color: yellow;
    border-radius: 5px;
    font-family: "Inter", sans-serif;
    font-size: 13px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;

    -webkit-box-shadow: 0px 0px 93px 0px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 0px 0px 93px 0px rgba(34, 60, 80, 0.2);
    box-shadow: 0px 0px 93px 0px rgba(34, 60, 80, 0.2);
    transition: all 0.2s;
}

.container_edit_to_action_button:hover {
    background-color: rgb(209, 195, 0);
}

.container_edit_to_action_button p {
    padding: 15px;
}

.disabled {
    background-color: #cc7373;
    color: rgb(122, 56, 56);
}

.disabled:hover {
    background-color: #cc7373;
    color: rgb(122, 56, 56);
}

.container_form_input_and_action_change_data {
    display: flex;
    flex-direction: column;
    gap: 60px;
}

.error_activity_form {
    font-family: 'Ubuntu', sans-serif;
    font-size: 16.5px;
    color: rgb(230, 0, 0);
}

.disabled_label label {
    color: #cb6b6b;
}

.disabled_input {
    background-color: #b169697e;
}

#personInformFeedFrame {
    position: absolute;
    z-index: 2;
    left: 100vw;
    transition: all 0.2s;
}

#containerFeedelemAction {
    position: absolute;
    left: 0;
    transition: all 0.2s;
}

#containerSecureFeedInform {
    position: absolute;
    z-index: 3;
    left: 100vw;
    transition: all 0.2s;
}

.container_button_feed_formAction_leave {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
}

.button_element_leave {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: white;
    border-radius: 15px;
    color: #F00;
    font-family: "Inter", sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 300;
    line-height: normal;
    margin-bottom: 40px;

    transition: all 0.15s;
    -webkit-box-shadow: 0px 0px 17px 2px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 0px 0px 17px 2px rgba(34, 60, 80, 0.2);
    box-shadow: 0px 0px 17px 2px rgba(34, 60, 80, 0.2);
}

.button_element_leave:hover {
    background-color: rgb(226, 223, 223);

}

.button_element_leave p {
    padding: 18px;
}

#formChangeContainerInformation {
    position: absolute;
    z-index: 7;
    left: 100vw;
    transition: all 0.2s;
}

.labelFormEmailFirst {
    background-color: #d9d9d97e;
    transition: all 0.2s;
}

#formChangeContainerPasswordOfSecure {
    position: absolute;
    z-index: 7;
    left: 100vw;
    transition: all 0.2s;
}

.input_person_information_edit {
    position: relative;
    transition: all 0.2s;
}

.error_icons_edit_input {
    position: absolute;
    right: 0;
    top: 0;
    width: 30px;
    height: 30px;
    /* content: ' '; */
    z-index: 11;
    background-color: #ffffff;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 15px;

    align-content: end;
    justify-content: center;

    -webkit-box-shadow: 0px 0px 19px 0px rgba(34, 60, 80, 0.2);
    -moz-box-shadow: 0px 0px 19px 0px rgba(34, 60, 80, 0.2);
    box-shadow: 0px 0px 19px 0px rgba(34, 60, 80, 0.2);

}

.error_icons_edit_input p {
    color: red;
}

.ever_check_true_from_backFormPass {
    position: absolute;
    right: 20px;
    /* width: 50px;
    height: 100%; */
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 18px;
    z-index: 1;
    opacity: 100%;
    transition: all 1s;
}

.back39mdklLow {
    background: none;
}

.dissablePassElmFromForm {
    background-color: #d4c5c57e;
}

.position_imageHidePositiveJSk73 {
    opacity: 0;
}

.data_changePassUser {
    color: #775f5f;
    font-size: 14px;
    font-style: italic;
}

.disableButtonText {
    text-decoration: none;
    color: rgb(92, 55, 55);
}

.disableButtonText:hover {
    text-decoration: none;
    color: rgb(92, 55, 55);
}

/* .ever_check_true_from_backFormPass img {
    width: 20px;
    height: 18px;
} */
</style>