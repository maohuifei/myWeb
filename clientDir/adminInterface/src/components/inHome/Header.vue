<template>
    <header class="header">
        <div class="header-content">
            <!-- 预留位置，可以添加其他功能按钮 -->
            <!-- <div class="action-buttons">
                <el-button type="success" :icon="Search" circle title="搜索" />
                <el-button type="primary" :icon="Message" circle title="消息" />
                <el-button type="warning" :icon="User" circle title="用户" />
            </div> -->
            
            <!-- 退出登录按钮 -->
            <el-button 
                class="logout-button"
                @click="handleLogout"
                title="退出登录"
            >
                <el-icon><SwitchButton /></el-icon>
                <span>退出登录</span>
            </el-button>
        </div>
    </header>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { SwitchButton } from '@element-plus/icons-vue'

const router = useRouter()

// 退出登录处理
const handleLogout = async () => {
    try {
        await ElMessageBox.confirm(
            '确定要退出登录吗？',
            '提示',
            {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning',
            }
        )
        
        localStorage.removeItem('auth_token')
        router.push('/login')
    } catch {
        // 用户取消退出，不做任何操作
    }
}
</script>

<style lang="less" scoped>
.header {
    width: 100%;
    height: 64px;
    background-color: var(--el-color-black) !important;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    position: sticky;
    top: 0;
    z-index: 100;
    
    .header-content {
        height: 100%;
        padding: 0 24px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        gap: 16px;
        
        .action-buttons {
            display: flex;
            gap: 12px;
            
            .el-button {
                --el-button-hover-bg-color: rgba(255, 255, 255, 0.1);
                --el-button-hover-border-color: rgba(255, 255, 255, 0.2);
                
                &:hover {
                    transform: translateY(-1px);
                }
                
                &:active {
                    transform: translateY(0);
                }
            }
        }
        
        .logout-button {
            height: 36px;
            padding: 0 16px;
            font-size: 14px;
            border-radius: 4px;
            border: 1px solid rgba(255, 255, 255, 0.2);
            background-color: transparent;
            color: rgba(255, 255, 255, 0.9);
            transition: all 0.2s ease;
            
            display: flex;
            align-items: center;
            gap: 8px;
            
            .el-icon {
                font-size: 16px;
            }
            
            &:hover {
                background-color: rgba(255, 255, 255, 0.1);
                border-color: rgba(255, 255, 255, 0.3);
                transform: translateY(-1px);
            }
            
            &:active {
                background-color: rgba(255, 255, 255, 0.15);
                transform: translateY(0);
            }
        }
    }
}

// 响应式设计
@media screen and (max-width: 768px) {
    .header {
        .header-content {
            padding: 0 16px;
            
            .action-buttons {
                display: none; // 在移动端隐藏额外的操作按钮
            }
            
            .logout-button {
                padding: 0 12px;
                
                span {
                    display: none; // 在移动端只显示图标
                }
            }
        }
    }
}
</style>