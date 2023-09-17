<script>
import DekstopAdminPanelFeed from '../render/dekstop/PanelFeedAdmin.vue'

export default {
    components: {
        DekstopAdminPanelFeed,
    },
    data() {
        return {

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
    <DekstopAdminPanelFeed />
</template>


<style scoped>

</style>