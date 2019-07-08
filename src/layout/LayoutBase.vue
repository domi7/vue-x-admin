<template>

    <el-container>

        <el-aside  class="aside" :class ="[{'aside-collapse':isCollapse},theme]" >

                <slot name="s-logo">
                    logo
                </slot>

                <slot name="s-aside">
                    aside
                </slot>

        </el-aside>


        <el-container>
            <el-header>
                <slot name="s-header">
                    header
                </slot>
            </el-header>
            <el-main>
                <slot></slot>
            </el-main>

        </el-container>
    </el-container>

</template>

<script>
    import {
        Container,
        Aside,
        Main,
        Header

    } from 'element-ui'

    export default {
        name: "LayoutBase",
        data() {
            return {};
        },
        computed: {
            isCollapse() {
                return this.$store.getters.isCollapse
            },
            theme(){
              return this.$store.getters.theme
            }
        },
        components: {
            'el-container': Container,
            'el-aside': Aside,
            'el-header': Header,
            'el-main': Main

        }


    }
</script>

<style scoped lang="scss">

    .el-container {
        height: 100%;
    }

    .el-header {

        height: $header-height!important;
        padding: 0;
        position: relative;

    }

    .el-main {
        padding: 0;

        background-color: $--background-color-base;

    }

    .aside{
        width: $aside-width !important;
        transition: width .3s;
        overflow-x: hidden;


    }

    .aside-collapse {
        transition: width .3s;
        width: $aside-min-width !important;

    }





</style>
