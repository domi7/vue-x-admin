<template>

    <LayoutBase>

        <template #s-logo>
            <va-logo :hideText="isCollapse"></va-logo>
        </template>
        <template #s-header>
            <va-header></va-header>
        </template>
        <template #s-aside>

            <va-menu></va-menu>


        </template>
        <template>


            <router-tabs :tabs="tabs">

                <transition name="fade-transform" mode="out-in">
                    <keep-alive>
                        <router-view :key="key"/>
                    </keep-alive>
                </transition>

            </router-tabs>

        </template>
    </LayoutBase>
</template>

<script>


    import LayoutBase from '@/layout/LayoutBase'
    import VaLogo from '@/components/Logo'
    import VaHeader from '@/components/Header'
    import VaMenu from '@/components/Menu'
    import RouterTabs from '@/components/RouterTabs'

    import menuTree, {filterByPermits, convertMetas} from '@/common/js/menu'
    import {resetRouter, createDynamicRoutes} from '@/router/index'

    import {SAVE_MENUS,SET_URLMETAS,SET_IDMETAS,SET_URLBREADCRUMB, SET_MENUCURRINDEX} from '@/store/state.type'

    export default {
        name: "Index",
        components: {
            LayoutBase,
            VaHeader,
            VaMenu,
            VaLogo,
            RouterTabs


        },
        data() {
            return {


                tabs: [
                    {title: '地图展示', url: '/default/map', icon: 'el-icon-map-location', isActive: true,id:"menu_01"}
                ]
            }
        },
        computed: {
            isCollapse() {
                return this.$store.getters.isCollapse
            },
            key() {
                return this.$route.fullPath
            }
        },
        created() {

            this.$http.get('/permit/getPermits').then(response => {
                let permits = response.data;
                let menus = filterByPermits(menuTree, permits.menu);
                let {urlMetas,idMetas} = convertMetas(menus);

                resetRouter();
                this.$router.addRoutes(createDynamicRoutes(urlMetas));

                this.$store.dispatch(SAVE_MENUS,menus);
                this.$store.dispatch(SET_URLMETAS,urlMetas);
                this.$store.dispatch(SET_IDMETAS,idMetas);

                this.$store.dispatch(SET_URLBREADCRUMB, {"/default/map": [{title: '地图展示', id: "menu_01"}]})
                this.$store.dispatch(SET_MENUCURRINDEX, "menu_01");
            })


        }

    }
</script>

<style>
    .tabs-panel {
        overflow: hidden;
    }

</style>

<style scoped lang="scss">


</style>
