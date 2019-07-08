<template>
    <div class="header" :class="[theme]" >


        <i @click="handleCollapse" class="toggle-bar el-icon-menu"></i>


        <va-breadcrumb></va-breadcrumb>

        <div class="tool-bar">


            <el-row>
                <el-col :span="8">
                    <div class="col">

                        <el-popover
                                placement="bottom"
                                width="300"
                                popper-class="header-popper"
                                trigger="click">

                            <div class="theme-set">
                                <el-divider content-position="center">主题设置</el-divider>

                                <el-radio-group v-model="currTheme" size="mini"
                                                @change="handleThemeChange">
                                    <el-radio-button label="theme-white">白色靓丽</el-radio-button>
                                    <el-radio-button label="theme-blue">蓝色经典</el-radio-button>
                                    <el-radio-button label="theme-black">黑色酷炫</el-radio-button>

                                </el-radio-group>

                            </div>


                            <el-button slot="reference"  class="set-btn"
                                       size="mini" icon="el-icon-setting" circle></el-button>
                        </el-popover>
                    </div>
                </el-col>

                <el-col :span="8">
                    <div class="col">
                        <el-dropdown trigger="click" class="header-action">
                            <span class="el-dropdown-link">语言<i class="el-icon-arrow-down el-icon--right"></i></span>

                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item icon="el-icon-check">中文</el-dropdown-item>
                                <el-dropdown-item icon="el-icon-circle-plus">English</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="col">
                        <el-dropdown trigger="click" @command="handleCommand" class="header-action">
                            <span>Admin<i class="el-icon-arrow-down el-icon--right"></i></span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="profile" icon="el-icon-setting"> 个人设定
                                </el-dropdown-item>
                                <el-dropdown-item command="logout" icon="el-icon-refresh"> 安全退出
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </div>
                </el-col>
            </el-row>


        </div>
    </div>


</template>


<script>
    import {

        Dropdown,
        DropdownMenu,
        DropdownItem,
        Row,
        Col,
        Divider

    } from 'element-ui'

    import 'vue-awesome/icons/ad'
    import Breadcrumb from '@/components/Breadcrumb'
    import {SET_THEME,SET_COLLAPSE,LOGOUT} from "../store/state.type";

    export default {
        name: "Header",
        computed: {

            theme(){
                return this.$store.getters.theme;
            }

        },
        data() {
            return {
                isVisible: false,
                currTheme: 'theme-blue'


            };
        },
        components: {
            'el-dropdown': Dropdown,
            'el-dropdown-menu': DropdownMenu,
            'el-dropdown-item': DropdownItem,
            'el-row': Row,
            'el-col': Col,
            'el-divider': Divider,
            'va-breadcrumb':Breadcrumb
        },

        methods: {
            handleCommand(command) {
                switch (command) {
                    case "profile":
                        this.$router.push({path: "/system/profile"});
                        break;
                    case "logout":
                        this.logout();
                        break;
                }
            },


            handleCollapse() {
                this.$store.dispatch(SET_COLLAPSE)
            },
            logout() {
                this.$store.dispatch(LOGOUT).then(() => {
                    this.$router.replace({path: "/login"});
                });
            },

            handleThemeChange(value) {

                this.$store.dispatch(SET_THEME, {theme: value})

            }
        }
    }
</script>

<style lang="scss">
    .header-popper {
        background-color: #fff;
        padding: 0;
    }

</style>

<style scoped lang="scss">

    .header {
        line-height: $header-height;
        padding-left: 20px;
        padding-right: 20px;

        position: absolute;
        top: 0;
        left: 0;
        width: 100%;



        .tool-bar {
            float: right;
            width: 180px;

            .col {
                text-align: center;

                .header-action {

                    font-size: 14px;


                }
                .set-btn{
                    font-size: 20px;
                    vertical-align: middle;
                    padding: 1px;
                }
            }
        }

        .toggle-bar {
            font-size: $header-height/2;
            vertical-align: middle;

            &:hover {

                cursor: pointer;

            }
        }


    }


    .theme-set {

        padding: 8px 30px;

        .cell-right {
            text-align: center;
        }
    }


</style>
