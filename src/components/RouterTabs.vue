<template>
    <div class="va-tabs-container">
        <ul class="va-tabs-header" ref="tabHeader">
            <template v-for="tab in dataTabs">
                <li class="va-tab" :class="{active:tab.isActive}" @click.stop="handleClick(tab.url)"
                    :key="tab.url" ref="tabs">
                    <a href="javascript:;"><i :class="tab.icon"></i>{{tab.title}}</a>
                    <span class="close-btn" v-if="tab.closeable" @click.capture.stop="handleClose(tab.url)">x</span>
                </li>

            </template>

        </ul>
        <div class="tabs-panel">

            <slot></slot>


        </div>

    </div>
</template>

<script>
    export default {
        name: "RouterTabs",
        props: {
            tabs: Array,
        },

        data() {
            return {
                dataTabs: this.tabs,
            }
        },

        mounted() {
            const Observer = new ResizeObserver(entries => {
                entries.forEach(() => {
                    this.autoCloseTab()
                });
            });
            Observer.observe(this.$refs['tabHeader'])
        },

        computed: {
            key() {
                return this.$route.fullPath
            },

            elementStyle() {

                return (element) => {
                    if (window.getComputedStyle) {
                        return getComputedStyle(element, null)
                    } else {
                        return element.currentStyle;//兼容IE的写法
                    }
                }

            }
        },

        watch: {
            $route(to) {

                this.autoCloseTab()

                this.navTo(to)


            }
        },


        methods: {

            handleClick(url) {

                this.$router.push(url)
            },

            autoCloseTab(){
                if (this.getTabSumWidth() > this.getHeaderWidthThreshold()) {
                    for(let tab of this.dataTabs){
                        if(tab.closeable){
                            this.handleClose(tab.url, true)
                            break;
                        }
                    }

                }
            },

            getTabSumWidth() {
                let tabSumWidth = 0;
                this.$refs['tabs'].forEach(item => {
                    let tabWidth = item.clientWidth;
                    let marginRight = parseInt(this.elementStyle(item).marginRight);

                    tabSumWidth += (tabWidth + marginRight);
                })
                return tabSumWidth;
            },

            getHeaderWidthThreshold() {
                return this.$refs['tabHeader'].clientWidth * 0.7;
            },

            exist(index) {
                for (let tab of this.dataTabs) {
                    if (tab.url === index) {
                        return true;
                    }
                }
                return false
            },

            navTo(to) {
                let path = to.path;
                let meta = to.meta;
                if (Object.keys(meta).length !== 0) {
                    if (!this.exist(path)) {
                        this.addTab(meta)
                    }
                    this.setActive(path)
                }

            },

            setActive(index) {

                for (let tab of this.dataTabs) {
                    if (tab.url === index) {

                        tab.isActive = true;
                        this.$router.push(index);
                    } else {
                        tab.isActive = false;
                    }
                }
            },

            handleClose(index, flag) {
                if (!flag) {
                    let nextTab = this.nextTab(index);
                    if (nextTab) {
                        this.setActive(nextTab.url)
                    }
                }

                this.remveTab(index);


            },

            remveTab(index) {
                this.dataTabs.forEach((item, i, arr) => {

                    if (item.url == index && item.closeable) {
                        arr.splice(i, 1)
                    }
                })
            },

            addTab(tab) {

                let defaultTab = {
                    title: `tab${this.dataTabs.length + 1}`,
                    url: `/tab${this.dataTabs.length + 1}`,
                    closeable: true
                }
                let newTab = {...defaultTab, ...tab}

                this.dataTabs.push(newTab)

            },
            nextTab(currIndex) {
                let tabs = this.dataTabs;
                let tabsLen = tabs.length
                if (tabsLen < 2) {
                    return null;
                }

                for (let i = 0; i < tabsLen; i++) {
                    let tab = tabs[i];
                    if (tab.url == currIndex) {
                        if (tabsLen == i + 1) {
                            return tabs[i - 1];
                        } else {
                            return tabs[i + 1];
                        }
                    }

                }
                return null;
            }
        }
    }
</script>

<style scoped lang="scss">

    $tabs-header-height: 30px;


    .va-tabs-container {


        height: 100%;

        .va-tabs-header {
            color: $--color-text-primary;
            height: $tabs-header-height;
            background-color: #fff;
            list-style: none;
            padding: 0 15px;
            margin: 0 ;
            border-bottom: 1px solid #cfcfcf;

            .va-tab {


                background-color: #eee;
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
                margin-right: 2px;
                position: relative;
                padding-right: 16px;
                padding-left: 16px;
                float: left;
                line-height: $tabs-header-height;
                text-align: center;

                &.active {
                    background-color: #fefefe;
                }

                &:hover {
                    color: $--color-primary;

                    .close-btn {
                        color: $--color-primary;
                    }
                }

                border-left: 1px solid #ccc;
                border-right: 1px solid #ccc;

                i {
                    margin-right: 5px;
                }

                .close-btn {

                    position: absolute;
                    line-height: 12px;
                    top: 2px;
                    right: 2px;
                    color: #eee;

                    &:hover {
                        color: $--color-primary-light-1;
                        cursor: pointer;
                    }
                }
            }
        }

        .tabs-panel {
            height: calc(100vh - #{$tabs-header-height} - #{$header-height} );
            background-color: #fff;
        }

    }

</style>
