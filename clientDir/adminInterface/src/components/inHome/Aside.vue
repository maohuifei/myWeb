<template>
    <div class="menu_box">
        <el-menu 
            active-text-color="#ffffff" 
            background-color="var(--primary-color)" 
            text-color="rgba(255,255,255,0.8)"
            :default-active="store.mainState.toString()"
            class="aside-menu"
        >
            <el-menu-item index="1" @click="toHomeFun">
                <el-icon><HomeFilled /></el-icon>
                <span>首页</span>
            </el-menu-item>
            <el-menu-item index='2' @click="toArticeFun">
                <el-icon><Management /></el-icon>
                <span>文章管理</span>
            </el-menu-item>
            <el-menu-item index='3' @click="toUserFun">
                <el-icon><Avatar /></el-icon>
                <span>用户管理</span>
            </el-menu-item>
            <el-sub-menu index='5'>
                <template #title>
                    <el-icon>
                        <setting />
                    </el-icon>
                    <span>系统管理</span>
                </template>
                <el-menu-item-group>
                    <el-menu-item index="44" @click="toFieldSystemFun">
                        <el-icon><Finished /></el-icon>
                        <span>类别配置</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
        </el-menu>
    </div>
</template>

<script lang="ts" setup>
import { myStore } from '@/stores';
import { HomeFilled, Management, Avatar, Setting as setting, Finished } from '@element-plus/icons-vue';

const store = myStore();

const toHomeFun = () => {
    store.updataMainStateFun(1);
};

const toArticeFun = () => {
    store.updataMainStateFun(2);
};

const toUserFun = () => {
    store.updataMainStateFun(3);
};

const toFieldSystemFun = () => {
    store.updataMainStateFun(44);
};
</script>


<style lang="less" scoped>
.menu_box {
    width: 210px;
    height: 100%;
    padding-top: 50px;
    background-color: var(--primary-color);
}

:deep(.aside-menu) {
    border-right: none;
}

:deep(.el-menu-item) {
    &:hover {
        background-color: rgba(255, 255, 255, 0.1) !important;
    }
}

:deep(.el-menu-item.is-active) {
    background-color: var(--primary-dark) !important;
}

:deep(.el-sub-menu__title) {
    &:hover {
        background-color: rgba(255, 255, 255, 0.1) !important;
    }
}

:deep(.el-menu-item-group__title) {
    padding: 0;
}

:deep(.el-sub-menu .el-menu) {
    background-color: var(--primary-dark);
}
</style>