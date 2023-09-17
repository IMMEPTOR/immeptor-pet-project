<script>
import DekstopProfile from '../render/dekstop/ProfilePage.vue'
import MobileProfile from '../render/mobile/profilePage.vue'

export default {
    components: {
        DekstopProfile,
        MobileProfile
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
    <DekstopProfile v-if="dekstop" />
    <MobileProfile v-if="mobile" />
</template>


<style scoped>

</style>