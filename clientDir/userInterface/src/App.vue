<template>
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
      <RouterLink to="/privacy">声明</RouterLink>
    </div>
  </div>
  <div style="height: 60px;"></div>
  <div class="content_box">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
  <div class="icon_box">
    <!-- 向下滚动图标 -->
    <transition name="fade-slide">
      <div v-if="showScrollDown" 
           :class="['icon', 'scroll-down', { 'scroll-down-home': isHomePage() }]" 
           @click="scrollToBottom">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 5v14M5 12l7 7 7-7"/>
        </svg>
      </div>
    </transition>
    <!-- 返回顶部图标 -->
    <transition name="fade-slide">
      <div v-if="showBackTop" class="icon back-top" @click="scrollToTop">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 19V5M5 12l7-7 7 7"/>
        </svg>
      </div>
    </transition>
  </div>
  <div class="foot_box">
    <p>© 2024 huafeng 版权所有</p>
    <p>备案号：鲁ICP备2024118017号 </p>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute } from 'vue-router';

export default {
  setup() {
    const showScrollDown = ref(true)
    const showBackTop = ref(false)
    const route = useRoute()

    // 检查滚动位置
    const checkScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight
      const scrollTop = window.scrollY || document.documentElement.scrollTop
      
      // 只在有可滚动内容时显示向下箭头
      showScrollDown.value = scrollHeight > clientHeight + 10 && scrollTop < clientHeight
      
      // 当滚动超过一屏高度时显示返回顶部
      showBackTop.value = scrollTop > clientHeight
    }

    // 判断是否是首页
    const isHomePage = () => {
      return route.path === '/'
    }

    // 滚动到底部
    const scrollToBottom = () => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth'
      })
    }

    // 返回顶部
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }

    onMounted(() => {
      Prohibit()
      isMobileDevice()
      checkScroll() // 初始检查
      window.addEventListener('scroll', checkScroll)
    })

    onUnmounted(() => {
      window.removeEventListener('scroll', checkScroll)
    })

    //禁止事件
    const Prohibit = () => {
      // 禁止右键
      document.oncontextmenu = (event: MouseEvent) => {
        event.preventDefault();
        event.returnValue = false;
      };
 
      // 禁止键盘 F12
      document.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.key === "F12") {
          e.preventDefault();
        }
      });
    }

    // 检查设备
    const isMobileDevice = () => {
      const userAgent = navigator.userAgent
      const mobileAgents = [
        /android/i,
        /iphone|ipad|ipod/i,
        /blackberry/i,
        /iemobile/i,
        /opera mini/i,
        /windows phone/i,
        /mobile/i,
        /touch/i
      ]
      if (mobileAgents.some(agent => agent.test(userAgent.toLowerCase()))) {
        console.log("移动设备");
      }
    }

    return {
      showScrollDown,
      showBackTop,
      scrollToBottom,
      scrollToTop,
      isHomePage,
    }
  }
}
</script>

<style scoped lang="less">
/* 定义过渡类 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.tage_box {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, .9);
  padding: 0 40px;
  z-index: 1000;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);

  .logo_box,
  .nav_box {
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
    display: flex;
    justify-content: center;
    gap: 30px;
    
    a {
      font-size: 1.1em;
      transition: all 0.3s ease;
      position: relative;
      color: var(--elementColor);
      text-decoration: none;
      font-weight: 500;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -4px;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: var(--systemColor);
        transform: scaleX(0);
        transition: transform 0.3s ease;
      }

      &:hover {
        transform: scale(1.2);
        background-color: transparent;
        color: var(--systemColor);
        font-weight: 600;
      }

      &.router-link-active {
        color: var(--systemColor);
        font-weight: 600;

        &::after {
          transform: scaleX(1);
        }
      }
    }
  }
}

// 将滚动图标移出导航栏样式，作为独立的固定定位元素
.icon_box {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;

  .icon {
    width: 40px;
    height: 40px;
    margin: 10px;
    padding: 8px;
    background-color: var(--systemColor);
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    display: flex;
    justify-content: center;
    align-items: center;

    svg {
      width: 24px;
      height: 24px;
      stroke: var(--outElementColor);
    }

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }

    &.scroll-down {
      position: fixed;
      bottom: 5vh;
      margin: 0;
      animation: bounce 2s infinite;

      // 默认在右下角
      right: 20px;
      transform: none;

      &:hover {
        transform: scale(1.1);
      }

      // 首页时的特殊样式
      &.scroll-down-home {
        right: auto;
        left: calc(50% - 20px);
        transform: translateX(-50%);

        &:hover {
          transform: translateX(-50%) scale(1.1);
        }
      }
    }

    &.back-top {
      opacity: 0.8;
      &:hover {
        opacity: 1;
      }
    }
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(5px);
  }
  60% {
    transform: translateY(3px);
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

/* 图标显示和消失的过渡效果 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.fade-slide-enter-to,
.fade-slide-leave-from {
  opacity: 1;
  transform: translateY(0);
}
</style>
