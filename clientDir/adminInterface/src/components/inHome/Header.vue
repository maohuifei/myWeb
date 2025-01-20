<template>
    <div class="header_box">
        <div class="rtop">
            <!-- <el-button type="success" :icon="Search" circle />
            <el-button type="primary" :icon="Message" circle />
            <el-button type="warning" :icon="User" circle /> -->
            <el-button 
                class="logout-button"
                type="primary" 
                :icon="SwitchButton"
                @click="dangerBtn"
            >
                退出登录
            </el-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { ElMessageBox } from 'element-plus';
import { SwitchButton } from '@element-plus/icons-vue';

const router = useRouter();
const dangerBtn = () => {
    ElMessageBox.confirm(
        '确定要退出登录吗？',
        '提示',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    ).then(() => {
        localStorage.removeItem('auth_token')
        router.push('/login')
    }).catch(() => {
        // 取消退出，不做任何操作
    })
}
</script>

<style scoped>
.header_box {
    width: 100%;
    height: 50px;
    background-color: var(--bg-white);
    box-shadow: 0 1px 4px rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding: 0 20px;
}

.rtop {
    display: flex;
    align-items: center;
}

.logout-button {
    font-size: 14px;
    padding: 8px 16px;
    border-radius: 4px;
    transition: all 0.3s ease;
    background-color: var(--primary-color);
    border-color: var(--primary-color);
}

.logout-button:hover {
    background-color: var(--primary-hover);
    border-color: var(--primary-hover);
    transform: translateY(-1px);
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
</style>