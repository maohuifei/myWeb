<template>
    <div class="man_box">
        <articleManagement v-if="store.mainState==2"></articleManagement>
        <newArticle v-else-if="store.mainState==21"></newArticle>
        <userManagement v-else-if="store.mainState==3"></userManagement>
        <!-- <articleSystem v-else-if="store.mainState==41"></articleSystem>
        <webSystem v-else-if="store.mainState==42"></webSystem>
        <userSystem v-else-if="store.mainState==43"></userSystem> -->
        <categoriesSystem v-else-if="store.mainState==44"></categoriesSystem>
        <span v-else>首页</span>
    </div>
</template>

<script lang="ts" setup>
import articleManagement from '../articleManagement/index.vue'
import userManagement from '../userManagement/index.vue'
// import articleSystem from '../systemManagement/articleSystem.vue';
// import userSystem from '../systemManagement/userSystem.vue';
// import webSystem from '../systemManagement/webSystem.vue';
import newArticle from '../articleManagement/newArticle.vue';
import categoriesSystem from '../systemManagement/categoriesSystem.vue';

import { myStore } from '@/stores'
const store=myStore()
</script>

<style lang="less" scoped>
.man_box{
    width: 100%;
    height: 100%;
    padding: 20px;
}
</style>