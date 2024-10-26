<!-- 登录页 -->
<template>
    <el-card shadow="always" v-if="loginWin">
        <template #header>登录</template>
        <el-form :model="form" label-width="auto">
            <el-form-item label="账号">
                <el-input v-model="form.username" placeholder="请输入账号" />
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="form.password" placeholder="请输入密码" />
            </el-form-item>
        </el-form>
        <el-button @click="loginFun">登录</el-button>
        <el-button @click="loginWin = false">注册</el-button>
    </el-card>
    <el-card shadow="always" v-else>
        <template #header>注册</template>
        <el-form :model="form" label-width="auto">
            <el-form-item label="账号">
                <el-input v-model="form.username" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="密码">
                <el-input type="password" v-model="form.password" placeholder="请输入" />
            </el-form-item>
            <el-form-item label="密钥">
                <el-input type="key" v-model="key" placeholder="请输入" />
            </el-form-item>
        </el-form>
        <el-button @click="signBtn">注册</el-button>
    </el-card>
</template>

<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router"
import { myStore } from '@/stores';
import { ElMessage } from 'element-plus'
import http from "@/axios/out"

export default {
    setup() {
        const loginWin = ref(true);
        const key = ref('')
        const form = reactive({//表单数据
            username: '',
            password: ''
        });
        const router = useRouter();
        const stores = myStore()
        const loginFun = async () => {
            try {
                const data = await http.post('user/login', form)
                localStorage.setItem('auth_token', data.data.token);
                ElMessage({
                    message: '登录成功',
                    type: 'success',
                })
                // console.log('登录成功，准备跳转...');
                router.push('/home')

            } catch (error) {
                ElMessage.error('登录失败')
            }
        }
        const signBtn = async () => {
            if (key.value == "jiangzhongwen") {
                try {
                    const data = await http.post('user/add', form)
                    localStorage.setItem('auth_token', data.data.token);
                    ElMessage({
                        message: '注册成功',
                        type: 'success',
                    })
                    loginFun()

                } catch (error) {
                    ElMessage.error('注册失败')
                }
            } else {
                ElMessage.error('密钥错误')
                console.log(key.value);
            }
        }
        return {
            form,
            loginFun,
            signBtn,
            loginWin,
            key,
        }
    }
}
</script>