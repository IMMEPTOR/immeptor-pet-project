<script>
import MobileUIBottom from '../../components/mobile/UiMenuBottom.vue'
export default {
    components: {
        MobileUIBottom,
    },
    async beforeRouteEnter(to, fromR, next) {
        let token = document.cookie;
        let response = await axios.post('/api/configuration/auth/examination/token/user', {
            token: token
        })

        if (response.status == 200) {
            next(true)

        } else {
            next(false)
        }
    }
}
</script>

<template>
    <main>
        <div class="container_image_feed">
            <img src="../../assets/img/messagefeedpage.png" alt="">
        </div>
        <MobileUIBottom />
    </main>
</template>

<style scoped>
* {
    margin: 0;
}

main {
    background-color: #FFACAC;
    width: 100vw;
    height: 100vh;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.container_image_feed {
    width: 100%;
    height: 90%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.container_image_feed img {
    width: 150px;
    height: 150px;
    opacity: 15%;
}

/* Компонент UI */
/* .. */

</style>