<template>
    <div ref="echarts" class="echarts"></div>
</template>

<script>
    // import VECharts from 'vue-echarts' // 在 webpack 环境下指向 components/ECharts.vue

    import echarts from 'echarts/lib/echarts'


    import 'echarts/lib/chart/bar'
    import 'echarts/lib/component/tooltip'
    import 'echarts/lib/component/title'

    export default {
        name: "Statics",
        components: {},

        mounted() {

            this.$nextTick(() => {
                var myChart = echarts.init(this.$refs['echarts']);

                myChart.setOption({
                    title: {
                        text: 'ECharts 入门示例'
                    },
                    tooltip: {},
                    xAxis: {
                        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
                    },
                    yAxis: {},
                    series: [{
                        name: '销量',
                        type: 'bar',
                        data: [5, 20, 36, 10, 10, 20]
                    }]
                });

            })


        }
    }
</script>

<style scoped>
    .echarts {
        width: 100%;
        height: 100%;
    }
</style>
