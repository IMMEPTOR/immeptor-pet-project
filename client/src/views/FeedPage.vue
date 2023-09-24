<script>
import DekstopFeedPage from '../render/dekstop/feedPage.vue'
import MobileFeedPage from '../render/mobile/FeedPage.vue'

export default {
    components: {
        DekstopFeedPage,
        MobileFeedPage,
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
    <DekstopFeedPage v-if="dekstop" />
    <MobileFeedPage v-if="mobile" />
</template>


<style scoped>
#socket {
    overflow-x: hidden;
}
</style>