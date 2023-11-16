<script>
export default {
    data() {
        return {

        }
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
        GoChangePasswordPerson() {
            this.$emit('changePasswordAPerson', 'true')
        },
    }
}
</script>

<template>
    <div class="container_change_informatin_security">
        <div class="container_change_password">
            <div class="container_change_private_and_security_info">
                <label class="element_to_change" for="">
                    Пароль:
                    <p>***********</p>
                </label>
                <div class="button_edit_to_confirm_password">
                    <p @click="GoChangePasswordPerson">Изменить</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.container_change_informatin_security {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

}

.container_change_password {
    width: 100%;
    height: 60px;
}

.container_change_private_and_security_info {
    margin-left: 25px;
    width: auto;
    height: 100%;
    display: flex;
    align-items: center;
    gap: 70px;
    /* justify-content: center; */

}

.element_to_change {
    height: 100%;
    color: #763535;
    font-family: 'Inter', sans-serif;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    width: auto;
    display: flex;
    align-items: center;
}

.element_to_change p {
    color: #786161;
    font-family: 'Inter', sans-serif;
    font-size: 25px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    position: relative;
    top: 5px;
    margin-left: 4px;
}

.button_edit_to_confirm_password {
    height: 100%;
    width: auto;
    display: flex;
    align-items: center;

    color: #2A81D1;
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

.button_edit_to_confirm_password p:hover {
    color: #2A81D1;
    cursor: pointer;
    text-decoration-line: underline;
}
</style>