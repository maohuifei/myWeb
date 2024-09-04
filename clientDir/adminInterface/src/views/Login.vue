<!-- 登录页 -->
<template>
    <el-card shadow="always">
        <template #header>后台登录</template>
        <el-form :model="form" label-width="auto"> 
            <el-form-item label="账号">
                <el-input v-model="form.account" placeholder="请输入账号" />
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="form.password" placeholder="请输入密码" />
            </el-form-item>
        </el-form>
        <el-button @click="loginFun">登录</el-button>
    </el-card>
</template>

<script>
    import { reactive } from "vue";
    import {useRouter} from "vue-router"

    export default{
        setup(){
            const form=reactive({//表单数据
                account:'',
                password:''
            });

            const router= useRouter();

            function loginFun(){//提交事件
                router.push('./home')
            }
            return{
            form,
            loginFun
          }
        }
    }
</script>