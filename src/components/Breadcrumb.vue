<template>

    <div class="breadcrumb theme-blue">
        <el-breadcrumb separator-class="el-icon-arrow-right">

            <transition-group name="breadcrumb">
                <template v-for="(item ,i) in breadcrumb">
                    <el-breadcrumb-item :key="i" :to="{ path: item.url }">
                        <span class="title">{{item.title}}</span>
                    </el-breadcrumb-item>

                </template>
            </transition-group>
        </el-breadcrumb>

    </div>

</template>

<script>

    import {Breadcrumb, BreadcrumbItem} from 'element-ui'

    export default {
        name: "Breadcrumb",
        components: {
            'el-breadcrumb': Breadcrumb,
            'el-breadcrumb-item': BreadcrumbItem
        },
        data(){
            return {
                breadcrumb:this.$store.getters.currBreadcrumb
            }
        },

        watch: {
            $route(to) {

                this.breadcrumb = this.$store.getters.urlBreadcrumb(to.path)

            }
        }
    }
</script>

<style lang="scss" scoped>
    .breadcrumb {
        vertical-align: middle;
        display: inline-block;

        font-size: 14px;
        line-height: $header-height;
        margin-left: 20px;


    }
</style>
