<script>
import DekstopAuthAcc from '../render/dekstop/AutorizateAccauntPage.vue'
import MobileAuthAcc from '../render/mobile/AuthFeedPageAccount.vue'

export default {
    components: {
        DekstopAuthAcc,
        MobileAuthAcc,
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
    <DekstopAuthAcc v-if="dekstop"/>
    <MobileAuthAcc v-if="mobile" />
</template>


<style scoped>

</style>