<!-- 登录页 -->
<template>
    <div class="login-container">
        <div class="login-card">
            <div class="login-header">
                <div class="logo">
                    <el-icon size="32"><Monitor /></el-icon>
                </div>
                <h2>后台管理系统</h2>
                <p>Welcome Back</p>
            </div>
            <el-form 
                :model="form" 
                :rules="rules"
                ref="formRef"
                @keyup.enter="loginFun"
            >
                <el-form-item prop="username">
                    <el-input 
                        v-model="form.username" 
                        placeholder="账号"
                        :prefix-icon="User"
                        @keyup.enter="focusPassword"
                    />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input 
                        ref="passwordInput"
                        v-model="form.password" 
                        type="password" 
                        placeholder="密码"
                        :prefix-icon="Lock"
                        show-password
                    />
                </el-form-item>
                <el-form-item>
                    <el-button 
                        class="login-button" 
                        :loading="loading"
                        @click="loginFun"
                    >
                        {{ loading ? '登录中...' : '登录' }}
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { myStore } from '@/stores'
import { ElMessage } from 'element-plus'
import { User, Lock, Monitor } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'
import http from "@/axios/out"

const router = useRouter()
const stores = myStore()
const formRef = ref<FormInstance>()
const passwordInput = ref()
const loading = ref(false)

const rules = {
    username: [
        { required: true, message: '请输入账号', trigger: 'blur' },
        { min: 3, message: '账号长度至少为3个字符', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 6, message: '密码长度至少为6个字符', trigger: 'blur' }
    ]
}

const form = reactive({
    username: '',
    password: ''
})

const focusPassword = () => {
    passwordInput.value?.focus()
}

const loginFun = async () => {
    if (!formRef.value) return
    
    try {
        await formRef.value.validate()
        loading.value = true
        
        const { data } = await http.post('user/login', form)
        localStorage.setItem('auth_token', data.token)
        
        ElMessage({
            message: '登录成功',
            type: 'success',
        })
        
        router.push('/home')
    } catch (error) {
        if (error instanceof Error) {
            ElMessage.error(error.message || '登录失败')
        } else {
            ElMessage.error('登录失败')
        }
    } finally {
        loading.value = false
    }
}
</script>

<style lang="less" scoped>
.login-container {
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ffffff;
}

.login-card {
    width: 380px;
    padding: 40px;
    border-radius: 24px;
    background: #ffffff;
    border: 2px solid #000000;
    box-shadow: none;
}

.login-header {
    text-align: center;
    margin-bottom: 40px;

    .logo {
        width: 64px;
        height: 64px;
        margin: 0 auto 16px;
        border-radius: 20px;
        background: #f8f9fa;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #000;
    }

    h2 {
        margin: 0 0 8px;
        font-size: 24px;
        color: #000;
        font-weight: 600;
    }

    p {
        margin: 0;
        font-size: 14px;
        color: #909399;
    }
}

:deep(.el-form) {
    .el-form-item {
        margin-bottom: 24px;

        &:last-child {
            margin-bottom: 0;
        }
    }

    .el-input__wrapper {
        border-radius: 12px;
        background-color: #f8f9fa;
        box-shadow: none !important;
        height: 48px;
        padding: 0 16px;
        transition: all 0.3s ease;

        &:hover {
            background-color: #f2f3f5;
        }

        &.is-focus {
            background-color: #fff;
            outline: 2px solid rgba(0, 0, 0, 0.1);
        }
    }

    .el-input__inner {
        color: #000;
        font-size: 15px;
        
        &::placeholder {
            color: #909399;
        }
    }

    .el-input__prefix {
        color: #909399;
        font-size: 18px;
        margin-right: 8px;
    }
}

.login-button {
    width: 100%;
    height: 48px;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 500;
    color: #fff;
    background-color: #18181b;
    border-color: #18181b;
    transition: all 0.2s ease;

    &:not(.is-loading):hover {
        background-color: #000;
        border-color: #000;
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
    }

    &:not(.is-loading):active {
        transform: translateY(1px);
        box-shadow: none;
        background-color: #000;
        border-color: #000;
        opacity: 0.8;
    }

    &.is-loading {
        background-color: #18181b;
        border-color: #18181b;
        opacity: 0.7;
        cursor: not-allowed;
    }
}

// 添加过渡动画
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>