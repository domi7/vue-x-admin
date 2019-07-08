<template>

    <el-menu
            :default-active="activeIndex"
            :background-color="theme.background"
            :text-color="theme.color"
            :active-text-color="theme.active"
            router

            mode="vertical"
            :unique-opened="true"
            :collapse="isCollapse" @select="handleSelect">

        <template v-for="item in menuTree">
            <el-menu-item :index="item.id" v-if="item.children.length===0" :key="item.id" :route="{path:item.url}">
                <i :class="item.icon"></i>
                <span slot="title">{{item.title}}</span>
            </el-menu-item>
            <el-submenu :index="item.id" v-if="item.children.length!=0" :key="item.id">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span>{{item.title}}</span>
                </template>

                <template v-for="subItem in item.children">

                    <el-menu-item :index="subItem.id" :key="subItem.id" :route="{path:subItem.url}">
                        <i :class="subItem.icon"></i>
                        <span slot="title">{{subItem.title}}</span>
                    </el-menu-item>
                </template>

            </el-submenu>

        </template>

    </el-menu>

</template>

<script>

    import {
        Menu,
        MenuItem,
        Submenu
    } from 'element-ui'

    import {SET_MENUCURRINDEX, SET_URLBREADCRUMB} from '../store/state.type'


    export default {
        name: "Menu",
        components: {
            'el-menu': Menu,
            'el-menu-item': MenuItem,
            'el-submenu': Submenu,

        },
        computed: {
            isCollapse() {

                return this.$store.getters.isCollapse
            },
            theme() {
                return this.$store.getters.menuTheme
            },
            menuTree() {
                return this.menus;
            },
            activeIndex() {
                return this.$store.getters.selectedIndex
            },
            menus() {
                return this.$store.getters.menus
            }

        },



        methods: {

            handleSelect(key, keypath) {

                let arr = keypath.map(item => {
                    return this.$store.getters.metaById(item)

                })

                let url = this.$store.getters.metaById(key).url

                this.$store.dispatch(SET_URLBREADCRUMB, {[url]: arr})


            }

        },

        watch: {
            $route(to) {

                this.$store.dispatch(SET_MENUCURRINDEX, to.meta.id)
            }
        }


    }
</script>

<style scoped lang="scss">

    .el-menu {
        border-right: none;
        margin-top: $logo-height;

    }


</style>
