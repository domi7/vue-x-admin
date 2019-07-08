<template>
    <baidu-map class="bm-view" ak="DHjOLUgGmE9WzFvi6DvOthrMXiaFt9Aw"
               @ready="handler"
               :center="center"
               :scroll-wheel-zoom="true"
               :zoom="zoom">
    </baidu-map>
</template>

<script>
    import BaiduMap from 'vue-baidu-map/components/map/Map.vue'
    export default {
        name: "MapBaidu",
        components: {
            BaiduMap
        },
        data () {
            return {
                center: {lng: 0, lat: 0},
                zoom: 3
            }
        },
        methods: {
            handler ({BMap, map}) {
                console.log(BMap, map)
                this.center.lng = 116.404
                this.center.lat = 39.915
                this.zoom = 15
            }
        }
    }
</script>

<style scoped>
    .bm-view {
        width: 100%;
        height: 100%;
    }
</style>
