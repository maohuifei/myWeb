<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="tage_box">
    <div class="logo_box">
      <img class="logo_class" src="/portrait.jpg" />
    </div>
    <div class="nav_box">
      <RouterLink to="/">首页</RouterLink>
      <RouterLink to="/article">文章</RouterLink>
      <RouterLink to="/about">关于</RouterLink>
      <RouterLink to="/privacy">隐私政策</RouterLink>
    </div>
    <div class="icon_box">
      <svg class="icon" aria-hidden="true">
        <use href="#icon-sousuo"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use href="#icon-shengyin"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use href="#icon-taiyang"></use>
      </svg>
      <svg class="icon" aria-hidden="true">
        <use href="#icon-dingyue"></use>
      </svg>
    </div>
  </div>
  <div style="height: 60px;"></div>
  <div class="content_box">
    <RouterView />
  </div>
  <div class="foot_box">
    <p>© 2024 huafeng 版权所有</p>
    <p>备案号：鲁ICP备2024118017号 </p>
  </div>
</template>

<style scoped lang="less">
.tage_box {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, .7);
  padding: 0 40px;

  .logo_box,
  .nav_box,
  .icon_box {
    width: 33%;
  }

  .logo_box {
    .logo_class {
      width: 30px;
      height: 30px;
    }
  }

  .nav_box {
    text-align: center;
  }

  .icon_box {
    text-align: right;
    .icon {
      margin: 0 10px;
      fill: var(--systemTextColor);
    }
  }
}

.content_box {
  width: 90%;
  height: 100%;
  margin: 0px auto;
}

.foot_box {
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
