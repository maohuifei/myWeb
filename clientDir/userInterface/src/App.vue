<template>
  <div v-if="isLoading" class="boxLoading"></div>
  <div v-else >
    <div class="tage_box">
      <div class="logo_box">
        <RouterLink to="/">
          <img class="logo_class" src="/portrait.png" alt="Logo" />
        </RouterLink>
      </div>
      <div class="nav_box">
        <RouterLink to="/">首页</RouterLink>
        <RouterLink to="/article">文章</RouterLink>
        <RouterLink to="/about">关于</RouterLink>
        <RouterLink to="/privacy">公告</RouterLink>
      </div>
      <div class="icon_box">
        <!-- <svg class="icon" aria-hidden="true">
          <use href="#icon-sousuo"></use>
        </svg> -->
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
  </div>
</template>
<script lang="ts">
import { RouterLink, RouterView } from 'vue-router';
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const isLoading = ref(true)
    // const maintenance = ref(false)
    onMounted(() => {
      isLoading.value = false
      // isMobileDevice()
    })
    // //检查设备
    // const isMobileDevice = () => {
    //   const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    //   // 匹配常见的移动设备User-Agent字符串
    //   const mobileAgents = [
    //     /android/i,
    //     /iphone|ipad|ipod/i,
    //     /blackberry/i,
    //     /iemobile/i,
    //     /opera mini/i,
    //     /windows phone/i,
    //     /mobile/i, // 这个可能会匹配到一些桌面浏览器的旧版本或特殊配置
    //     /touch/i   // 这个可能会匹配到一些桌面触摸屏设备
    //   ]
    //   // 检查User-Agent字符串是否匹配任何一个移动设备模式
    //   if (mobileAgents.some(agent => agent.test(userAgent.toLowerCase()))) {

    //   }
    // }

    return {
      isLoading,
      // isMobileDevice,
    }
  }
}

</script>
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
    a:hover {
      background-color: transparent;
    }

    .logo_class {
      width: 130px;
    }
  }

  .nav_box {
    text-align: center;
  }

  .icon_box {
    text-align: right;

    .icon {
      margin: 0 10px;
      fill: var(--systemColor);
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
  border-top: 2px solid var(--systemColor);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 15px;
  margin: 0 auto;
  color: var(--txtColor);
}

//加载动画
.boxLoading {
  width: 50px;
  height: 50px;
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}

//方块影子
.boxLoading:before {
  content: '';
  width: 50px;
  height: 5px;
  background: rgb(107, 107, 107);
  opacity: 0.7;
  position: absolute;
  top: 59px;
  left: 0;
  border-radius: 50%;
  animation: shadow .5s linear infinite;
}

//方块本体
.boxLoading:after {
  content: '';
  width: 50px;
  height: 50px;
  background: rgb(45, 197, 239);
  animation: animate .5s linear infinite;
  position: absolute;
  top: 0;
  left: 0;
  border-radius: 3px;
}

@keyframes animate {
  17% {
    border-bottom-right-radius: 3px;
  }

  25% {
    transform: translateY(9px) rotate(22.5deg);
  }

  50% {
    transform: translateY(18px) scale(1, .9) rotate(45deg);
    border-bottom-right-radius: 40px;
  }

  75% {
    transform: translateY(9px) rotate(67.5deg);
  }

  100% {
    transform: translateY(0) rotate(90deg);
  }
}

@keyframes shadow {

  0%,
  100% {
    transform: scale(1, 1);
  }

  50% {
    transform: scale(1.2, 1);
  }
}
</style>
