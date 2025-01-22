<!-- 主页 -->
<template>
    <div class="app-container">
        <div class="main-container">
            <el-container>
                <Aside />
                <el-container>
                    <el-header height="64px" style="padding: 0;">
                        <Header />
                    </el-header>
                    <el-main>
                        <Main />
                    </el-main>
                </el-container>
            </el-container>
        </div>
    </div>
</template>

<script setup lang="ts">
import Aside from '../components/inHome/Aside.vue'
import Header from '../components/inHome/Header.vue'
import Main from '../components/inHome/Main.vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(() => {
    const token = localStorage.getItem('auth_token')
    if (!token) {
        router.push('/login')
    }
})
</script>

<style lang="less" scoped>
.app-container {
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #ffffff;
}

.main-container {
    width: 100%;
    height: 100%;

    .el-container {
        height: 100%;
    }

    .el-main {
        padding: var(--spacing-lg);
        background-color: #ffffff;
        height: calc(100vh - 64px);
        overflow-y: auto;
    }
}
</style>