<script>
import DekstopEditInfo from '../render/dekstop/EditUserDataPage.vue'

export default {
    components: {
        DekstopEditInfo,
    },
    data() {
        return {
            dekstop: true,
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
    <DekstopEditInfo v-if="dekstop" />
</template>


<style scoped>

</style>