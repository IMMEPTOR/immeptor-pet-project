<script>
import { io } from 'socket.io-client';
import axios from 'axios';
import { onBeforeUnmount, onMounted, ref } from 'vue';
export default {
    data() {
        return {

        }
    },
    props: {
        title: null,
        description: null,
        image: null,
    },
    mounted() {
        this.clickTabletButton();
        this.$emit('valueChanged', 'true')
    },
    methods: {
        clickedTablet() {

        },
        clickTabletButton() {
            this.element_button_table = document.getElementsByClassName('disabled');
            let news_button = document.getElementById('but_news');
            let up_button = document.getElementById('but_up');
            news_button.addEventListener("click", function () {
                if (!news_button.classList.contains('active')) {
                    news_button.classList.toggle('active');
                    news_button.classList.toggle('disabled');
                    up_button.classList.toggle('active');
                    up_button.classList.toggle('disabled');
                }
            });
            up_button.addEventListener("click", function () {
                if (!up_button.classList.contains('active')) {
                    news_button.classList.toggle('active');
                    news_button.classList.toggle('disabled');
                    up_button.classList.toggle('active');
                    up_button.classList.toggle('disabled');

                }
            });
        },
        clickUpdateButton() {
            let up_button = document.getElementById('but_up');
            if (!up_button.classList.contains('active')) {

                this.$emit('sendUpdate', 'update')
            }
        },
        clickNewsButton() {
            let news_button = document.getElementById('but_news');
            if (!news_button.classList.contains('active')) {
                this.$emit('sendNews', 'news')
            }
        },
    }
}
</script>

<template>
    <div class="container_table_news_update">
        <div class="table_container">
            <div class="first_container_table">
                <div @click="clickNewsButton" class="text_button active" id="but_news">
                    <p>Новости</p>
                </div>
                <div @click="clickUpdateButton" class="text_button disabled" id="but_up">
                    <p>Обновления</p>
                </div>
            </div>
            <div class="container_image_element_and_text_description">
                <p><span><img :src="image" alt="" class="image_posts_public"></span> <span id="title_post">{{ title
                }}</span>{{ description }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
* {
    margin: 0;
}

.container_table_news_update {
    width: 100%;
    height: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 15px;
}

.table_container {
    height: 500px;
    width: 750px;
    /* background-color: black; */
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-around;
}

.first_container_table {
    height: 10%;
    width: 100%;
    /* background-color: #000; */
    gap: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
}


.text_button {
    color: #000;
    font-family: 'Inria Sans', sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    transition: all 0.2s;
}

.text_button:hover {
    cursor: default;
}

.disabled {
    color: #bdbdbd;
    font-family: 'Inria Sans', sans-serif;
    font-size: 18px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    transition: all 0.2s;
}

.disabled:hover {
    color: rgb(121, 121, 121);
    cursor: pointer;
}

.active {
    border-bottom-width: 2px;
    position: relative;
    transition: all 0.2s;
    /* border-bottom: 0.2px solid black; */
}

.active::after {
    background-color: #5a5a5a;
    bottom: 0;
    content: '';
    display: block;
    height: 1px;
    left: 50%;
    position: absolute;
    transform: translate(-50%, 0);
    width: 50px;
    transition: all 0.2s;
}

.container_image_element_and_text_description {
    width: 93%;
    min-height: 30%;
    height: fit-content;
    background-color: #FDF8F8;
    display: table;
    padding: 15px;
    border-radius: 8px;
}

.image_posts_public {
    width: 350px;
    height: 200px;
    display: table-cell;
    float: left;
    margin: 0;
    border-radius: 15px;
    padding-right: 10px;
    position: relative;
    bottom: 30px;
    right: 30px;
    opacity: 0;
    animation: ani 2.5s forwards;
}


@keyframes ani {
    0% {
        opacity: 0;
        bottom: 0;
        right: 0;
    }

    100% {
        bottom: 30px;
        right: 30px;
        opacity: 1;
    }
}

.container_image_element_and_text_description p {
    display: table-cell;
    color: #000;
    font-family: 'Kreon', sans-serif;
    font-size: 17px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}

#title_post {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #000;
    font-family: 'Kreon', sans-serif;
    font-size: 23px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
    position: relative;
    bottom: 5px;
}
</style>