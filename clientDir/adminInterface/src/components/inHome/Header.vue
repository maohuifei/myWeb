<template>
    <div class="header_box">
        <div class="rtop">
            <!-- <el-button type="success" :icon="Search" circle />
            <el-button type="primary" :icon="Message" circle />
            <el-button type="warning" :icon="User" circle /> -->
            <el-button type="danger" icon="SwitchButton" circle @click="dangerBtn" />
        </div>
    </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router';

export default {
    setup() {
        const router = useRouter();
        const dangerBtn = () => {
            router.push('./login')
        }
        return {
            dangerBtn,

        }
    }
}
</script>

<style>
.header_box {
    width: 100%;
    height: 50px;
    background-color: rgba(144, 144, 149, 0.78);

    .rtop {
        position: absolute;
        right: 5px;
        top: 5px;
    }
}
</style>