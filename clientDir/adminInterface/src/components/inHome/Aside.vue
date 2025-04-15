<template>
    <aside class="sidebar">
        <!-- Logo -->
        <div class="logo">
            <el-icon size="24"><Monitor /></el-icon>
            <span>huafnegWeb管理面板</span>
        </div>

        <!-- 导航菜单 -->
        <el-menu 
            :default-active="store.mainState.toString()"
            class="sidebar-menu"
            active-text-color="#ffffff" 
            background-color="var(--el-color-black)" 
            text-color="rgba(255,255,255,0.8)"
        >
            <!-- 主要菜单项 -->
            <el-menu-item 
                v-for="item in menuItems"
                :key="item.index"
                :index="item.index"
                @click="item.action"
            >
                <el-icon><component :is="item.icon" /></el-icon>
                <span>{{ item.label }}</span>
            </el-menu-item>

            <!-- 系统管理子菜单 -->
            <el-sub-menu :index="systemSubMenu.index">
                <template #title>
                    <el-icon><component :is="systemSubMenu.icon" /></el-icon>
                    <span>{{ systemSubMenu.label }}</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item 
                        v-for="child in systemSubMenu.children"
                        :key="child.index"
                        :index="child.index"
                        @click="child.action"
                    >
                        <el-icon><component :is="child.icon" /></el-icon>
                        <span>{{ child.label }}</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
        </el-menu>
    </aside>
</template>

<script lang="ts" setup>
import { myStore } from '@/stores'
import { 
    HomeFilled, 
    Management, 
    Avatar, 
    Setting as setting, 
    Finished, 
    Monitor 
} from '@element-plus/icons-vue'

// 状态管理
const store = myStore()

// 菜单项配置
const menuItems = [
    {
        index: '1',
        icon: HomeFilled,
        label: '首页',
        action: () => store.updataMainStateFun(1)
    },
    {
        index: '2',
        icon: Management,
        label: '文章管理',
        action: () => store.updataMainStateFun(2)
    },
    {
        index: '3',
        icon: Avatar,
        label: '用户管理',
        action: () => store.updataMainStateFun(3)
    },
    {
        index: '5',
        icon: Avatar,
        label: '链接管理',
        action: () => store.updataMainStateFun(5)
    }
]

const systemSubMenu = {
    index: '5',
    icon: setting,
    label: '系统管理',
    children: [
        {
            index: '44',
            icon: Finished,
            label: '类别配置',
            action: () => store.updataMainStateFun(44)
        }
    ]
}
</script>

<style lang="less" scoped>
.sidebar {
    width: 240px;
    height: 100vh;
    background-color: var(--el-color-black);
    border-right: 1px solid rgba(255, 255, 255, 0.1);
    display: flex;
    flex-direction: column;
    
    .logo {
        height: 64px;
        display: flex;
        align-items: center;
        padding: 0 20px;
        gap: 12px;
        color: #fff;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 16px;
        font-weight: 500;
    }
    
    .sidebar-menu {
        flex: 1;
        border: none;
        padding: 12px 8px;
    }
}

:deep(.el-menu-item),
:deep(.el-sub-menu__title) {
    height: 40px;
    line-height: 40px;
    margin: 4px 0;
    border-radius: 4px;
    
    .el-icon {
        font-size: 18px;
    }
    
    &:hover {
        background-color: rgba(255, 255, 255, 0.05) !important;
    }
}

:deep(.el-menu-item.is-active) {
    background-color: rgba(255, 255, 255, 0.1) !important;
    
    &::before {
        content: '';
        position: absolute;
        left: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 3px;
        height: 16px;
        background-color: var(--el-color-primary);
        border-radius: 0 2px 2px 0;
    }
}

:deep(.el-sub-menu) {
    .el-menu {
        background-color: transparent;
        padding-left: 8px;
    }
    
    &.is-active {
        .el-sub-menu__title {
            color: #fff;
        }
    }
}

:deep(.el-menu-item-group__title) {
    padding: 0;
    color: rgba(255, 255, 255, 0.4);
}

// 响应式设计
@media screen and (max-width: 768px) {
    .sidebar {
        width: 64px;
        
        .logo {
            padding: 0;
            justify-content: center;
            
            span {
                display: none;
            }
        }
        
        .sidebar-menu {
            padding: 12px 4px;
        }
    }
    
    :deep(.el-menu-item),
    :deep(.el-sub-menu__title) {
        padding: 0 !important;
        justify-content: center;
        
        span {
            display: none;
        }
        
        .el-icon {
            margin: 0;
        }
    }
}
</style>