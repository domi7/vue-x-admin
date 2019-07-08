<template>
    <div class="logo" :class=[theme]>
        <i class="logo-icon el-icon-loading"></i>
        <h1 :class="{'toggle':hideText}">VX管理系统</h1>
    </div>

</template>

<script>
    export default {
        name: "Logo",
        computed:{
          theme(){

              return this.$store.getters.theme
          }
        },
        props: {
            hideText: {
                type: Boolean,
                default: false
            }

        }
    }
</script>

<style scoped lang="scss">



    .logo {
        line-height: $logo-height;
        padding-left: $logo-padding;
        padding-right: $logo-padding;
        position: fixed;
        z-index: 3000;

        .logo-icon {
            font-size: $icon-size;
            vertical-align: middle;
            display: inline-block;
            width: $icon-size;
        }

        h1 {
            font-size: 20px;
            display: inline-block;
            vertical-align: middle;
            margin: 0;
            padding: 0;
            font-style: normal;
            text-align: center;
            width: $logo-width - $logo-min-width;

            &.toggle {
                display: none !important;
            }
        }

    }



</style>
