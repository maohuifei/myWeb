<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="title_img">
    <img alt="Vue logo" class="logo" src="/titleimg.jpg" width="100%" />
  </header>
  <div class="tage_box">
    <RouterLink to="/">首页</RouterLink>
    <img src="/titleBoxIcon.png" alt="">
    <RouterLink to="/article">文章</RouterLink>
   <img src="/titleBoxIcon.png" alt="">
    <RouterLink to="/about">关于</RouterLink>
    <img src="/titleBoxIcon.png" alt="">
    <RouterLink to="/privacy">隐私政策</RouterLink>
  </div>
  <div class="content_box">
    <RouterView />
  </div>
  <div class="foot_box">
    <p>© 2024 画风huafeng 版权所有</p>
    <p>备案号：京ICP备XXXXXXXX号-X </p>
  </div>
</template>

<style scoped>
.tage_box{
  width: 90%;
  height: 50px;
  border-bottom: 2px solid var(--elementColor);
  border-top: 2px solid var(--elementColor);
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}
.tage_box img{
  width: 30px;
  height: 30px;
  margin: 0 10px;
}
.content_box{
  width: 90%;
  height: 100%;
  margin: 10px auto;
}
.foot_box{
  width: 90%;
  height: 150px;
  border-top: 2px solid var(--elementColor);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 15px;
  margin: 0 auto;
  color: var(--textColor);
}
</style>
