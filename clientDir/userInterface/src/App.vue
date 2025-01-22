<template>
  <!-- 导航栏 -->
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

  <!-- 导航栏占位 -->
  <div style="height: 60px;"></div>

  <!-- 主要内容区域 -->
  <div class="content_box">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>

  <!-- 滚动控制按钮 -->
  <div class="icon_box">
    <div class="icon" 
         :class="{ 'is-up': showBackTop }" 
         @click="showBackTop ? scrollToTop() : scrollToBottom()">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 5v14M5 12l7 7 7-7"/>
      </svg>
    </div>
  </div>

  <!-- 页脚 -->
  <div class="foot_box">
    <p>© 2024 huafeng 版权所有</p>
    <p>备案号：鲁ICP备2024118017号 </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'

// 状态管理
const showBackTop = ref(false)
const route = useRoute()

// 检查滚动位置并更新按钮显示状态
const checkScroll = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  showBackTop.value = scrollTop > 100
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

// 检查设备类型
const checkDeviceType = () => {
  const userAgent = navigator.userAgent.toLowerCase()
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
  return mobileAgents.some(agent => agent.test(userAgent))
}

// 生命周期钩子
onMounted(() => {
  // 禁用F12键
  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'F12') e.preventDefault()
  })

  // 检查设备类型
  if (checkDeviceType()) {
    console.log('移动设备')
  }

  // 初始化滚动检查
  setTimeout(checkScroll, 100)
  window.addEventListener('scroll', checkScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
})
</script>

<style scoped lang="less">
/* 过渡动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* 导航栏样式 */
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

/* 滚动控制按钮样式 */
.icon_box {
  position: fixed;
  right: 20px;
  bottom: 20px;
  z-index: 2000;

  .icon {
    width: 40px;
    height: 40px;
    background: #000;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    animation: bounce 2s infinite;

    svg {
      width: 24px;
      height: 24px;
      stroke: #fff;
      transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    }

    &.is-up svg {
      transform: rotate(180deg);
    }

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    }
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-8px);
  }
  60% {
    transform: translateY(-4px);
  }
}

/* 过渡动画 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

/* 页脚样式 */
.foot_box {
  width: 100%;
  padding: 20px 0;
  text-align: center;
  color: var(--elementColor);
  font-size: 0.9em;
  
  p {
    margin: 5px 0;
  }
}
</style>
