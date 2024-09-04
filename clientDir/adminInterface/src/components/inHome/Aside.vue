<template>
    <div class="menu_box">
        <el-menu active-text-color="#ffd04b" background-color="#545c64" text-color="#fff">
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
                    <el-menu-item index="1-1" @click="toArticeSystemFun">
                        <el-icon><Reading /></el-icon>
                        <span>文章配置</span>
                    </el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <el-menu-item index="1-3" @click="toUserSystemFun">
                        <el-icon><User /></el-icon>
                        <span>用户配置</span>
                    </el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group>
                    <el-menu-item index="1-2" @click="toWebSystemFun">
                        <el-icon><Postcard /></el-icon>
                        <span>网站配置</span>
                    </el-menu-item>
                </el-menu-item-group>
            </el-sub-menu>
        </el-menu>
    </div>
</template>

<script lang="ts">
import { myStore } from '@/stores';
export default {
    setup() {
        const storeObj = myStore()

        function toHomeFun() {//跳转home
            storeObj.updataMainStateFun(1)
        }
        function toArticeFun() {//跳转文章
            storeObj.updataMainStateFun(2)
        }
        function toUserFun() {//跳转用户
            storeObj.updataMainStateFun(3)
        }
        function toArticeSystemFun() {//跳转文章配置
            storeObj.updataMainStateFun(41)
        }
        function toWebSystemFun() {//跳转网站配置
            storeObj.updataMainStateFun(42)
        }
        function toUserSystemFun() {//跳转用户配置
            storeObj.updataMainStateFun(43)
        }
        return {
            toHomeFun,
            toArticeFun,
            toUserFun,
            toArticeSystemFun,
            toWebSystemFun,
            toUserSystemFun
        }
    }

}
</script>


<style lang="less">
.menu_box {
    width: 210px;
    height: 100%;
    padding-top: 50px;
    background-color: #545c64;
}
</style>