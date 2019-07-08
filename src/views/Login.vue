<template>


    <div class="login-bg">


        <form @submit.prevent="onSubmit(username, password);" class="login-form">

            <div class="title"><span>用户登录</span></div>
            <el-input class="input"
                      placeholder="请输入帐号"
                      v-model="username">
                <i slot="prefix" class="el-input__icon el-icon-user-solid"></i>
            </el-input>
            <el-input class="input"
                      placeholder="请输入密码"
                      v-model="password" type="password">
                <i slot="prefix" class="el-input__icon el-icon-s-goods"></i>
            </el-input>


            <el-button type="primary" native-type="submit" class="btn-login">登录</el-button>


        </form>

    </div>


</template>

<script>
    import {mapState} from "vuex";
    import {LOGIN} from "@/store/state.type";

    export default {
        name: "Login",
        data() {
            return {
                username: '',
                password: ''
            }
        },
        methods: {
            onSubmit(username, password) {
                this.$store.dispatch(LOGIN, {username, password}).then(
                    response => {
                        if (response.succ) {
                            this.$router.replace('/default/map')
                        }

                    }
                ).catch(err => {
                    console.log(err)
                })
            }
        },
        computed: {
            ...mapState({
                errors: state => state.auth.errors
            })
        }
    }
</script>

<style scoped lang="scss">

    .login-bg {

        position: relative;
        height: 100%;
        background-image: radial-gradient(circle at 50% 50%, #409EFF, #000);

        .login-form {
            width: 400px;
            position: absolute;
            top: 50%;
            left: 50%;
            padding: 40px;
            border-radius: 5px;
            background-image: linear-gradient(to bottom right, #409EFF, #ccc);


            transform: translate(-50%, -50%);

            .title {
                padding: 4px;
                font-size: 20px;
                color: #ECF5FF;
                border-bottom: 1px solid #ECF5FF;
                /* box-shadow: 0 1px 1px #324157;*/
            }


            .btn-login {
                width: 100%;
                margin-top: 20px;
            }

            .input {
                margin-top: 20px;
                width: 100%;
            }

        }
    }


</style>
