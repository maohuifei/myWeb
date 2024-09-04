<!-- 主页 -->
<template>
    <Aside></Aside> 
    <div class="home_box">
        <Header></Header>
        <Main></Main>
    </div>
</template>

<script setup lang="ts">
import Aside from '@/components/inHome/Aside.vue';
import Header from '@/components/inHome/Header.vue';
import Main from '@/components/inHome/Main.vue';
</script>

<style lang="less">
.home_box{
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
}
</style>