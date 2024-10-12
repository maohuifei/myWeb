<!-- 登录页 -->
<template>
    <el-card shadow="always">
        <template #header>后台登录</template>
        <el-form :model="form" label-width="auto">
            <el-form-item label="账号">
                <el-input v-model="form.username" placeholder="请输入账号" />
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
import { useRouter } from "vue-router"
import { myStore } from '@/stores';
import { ElMessage } from 'element-plus'
import http from "@/axios/out"

export default {
    setup() {
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
                console.log('登录成功，准备跳转...');
                router.push('/home')

            } catch (error) {
                ElMessage.error('登录失败')
            }
        }
        return {
            form,
            loginFun
        }
    }
}
</script>