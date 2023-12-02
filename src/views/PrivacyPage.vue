<script>
import DekstopPrivacyPage from '../render/dekstop/PrivacyPage.vue'
import MobilePrivacyPage from '../render/mobile/PrivacyPage.vue'

export default {
    components: {
        DekstopPrivacyPage,
        MobilePrivacyPage,
    },
    data() {
        return {
            dekstop: false,
            mobile: false,
        }
    },
    mounted() {
        let userAgent = navigator.userAgent.toLowerCase();
        if (/mobile|android|iphone|ipod|blackberry|iemobile|opera mini/i.test(userAgent)) {
            // console.log('мобила')
            this.mobile = true;
            
        } else {
            // console.log('пк')
            this.dekstop = true;
        }
    },
    methods: {
    }
}
</script>


<template>
    <DekstopPrivacyPage />
    <!-- <MobilePrivacyPage v-if="mobile" /> -->
</template>


<style scoped>
#socket {
    overflow-x: hidden;
}
</style>