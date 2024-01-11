<script>
import axios from 'axios';

export default {
    data() {
        return {

        }
    },
    methods: {
        
    }
}
</script>

<template>
        <div class="container">
            <div class="sin">
                <form action="/" name="sin" class="form-control">
                    <h1 id="tatle">Регистрация</h1>
                    <div>
                        <!-- <label for="login">Логин:</label> -->
                        <input type="email" required placeholder="Email:" autocomplete="off" id="login">
                    </div>

                    <div>
                        <!-- <label for="pass">Пароль:</label> -->
                        <input type="tel" required  autocomplete="off" id="pass" placeholder="+7 (900) 123-45-67" pattern="\+7\s?[\(]{0,1}9[0-9]{2}[\)]{0,1}\s?\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}">
                    </div>
                    <div>
                        <!-- <label for="pass">Пароль:</label> -->
                        <input type="password" required placeholder="Пароль:" autocomplete="off" id="pass">
                    </div>

                    <button type="submit">Далее</button>

                    <p>Нажимая кнопку <b>“Далее”</b>, вы подтверждаете, что ознакомились, а также принимаете “<a href="">Пользовательское Соглашение</a>” и 
                        “<a href="">Лицензионное соглашение</a>”. </p>
                </form>
            </div>
        </div>
</template>

<style scoped>
h1, body {
    margin: 0;
}

body {
    background-color: rgb(255, 203, 211);
}

a {
    text-decoration: none;
}

.container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

}

input::placeholder {
    font-size: 14px;
    position: absolute;
    top: 1px;
}

input {
    position: relative;
    background-color: #ddd;
    border: none;
    margin: 35px 0 0 0;
    width: 80%;
    height: 50px;
}

input:focus-visible {
    outline: none;
}

form {
    text-align: center;
    width: 50%;
    height: 90vh;
}

select {
    width: 50px;
}

.sin {
    width: 410px;
    height: 90vh;
}

.safed {
    font-size: 10px;
    position: absolute;
    bottom: 202px;
    right: 60px;
}

.safed  label {
    font-size: 12px;
    position: absolute;
    bottom: 22px;
    right: 25px;
    width: 180px;
}

button {
    position: absolute;
    left: 140px;
    bottom: 130px;
    border: none;
    color: white;
    background-color: black;
    padding: 20px;
    width: 132px;
    border-radius: 99em;
    transition: all 0.15s;
} 

#safe {
    width: 15px;
    background-color: rgb(117, 67, 67);
}

.sin form {
    position: relative;
    background-color: rgb(255, 117, 124);
}

.sin p {
    font-size: 13px;
    position: absolute;
    bottom: 6px;
}

button:hover {
    box-shadow: 0px 3px 2px 1px rgba(11, 11, 12, 0.2);
    color: rgb(187, 184, 184);
    
}
</style>