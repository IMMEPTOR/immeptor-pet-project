<script>
import DekstopRigister from '../render/dekstop/RegistrationPage.vue'

export default {
    components: {
        DekstopRigister,
    },
    data() {
        return {
            dekstop: true
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
    <DekstopRigister v-if="dekstop"/>
</template>


<style scoped>

</style>