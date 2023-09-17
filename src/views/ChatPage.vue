<script>
import DekstopChat from '../render/dekstop/ChatsAccountPage.vue'
import MobileChat from '../render/mobile/chatPage.vue'

export default {
    components: {
        DekstopChat,
        MobileChat,
    },
    data() {
        return {
            dekstop: true,
            mobile: false,
        }
    },
    mounted() {
        let userAgent = navigator.userAgent.toLowerCase();
        if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent)) {
            console.log('мобила')
            this.dekstop = false;
            this.mobile = false;
        } else {
            console.log('пк')
        }


    }
}
</script>


<template>
    <DekstopChat v-if="dekstop" />
    <MobileChat v-if="mobile" />
</template>


<style scoped>

</style>