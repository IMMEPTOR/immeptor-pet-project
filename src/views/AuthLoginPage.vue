<script>
import DekstopLogin from '../render/dekstop/LoginPage.vue'
import MobileLogin from '../render/mobile/LoginPage.vue'

export default {
    components: {
        DekstopLogin,
        MobileLogin,
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
    <DekstopLogin v-if="dekstop" />
    <MobileLogin v-if="mobile" />
</template>


<style scoped>

</style>