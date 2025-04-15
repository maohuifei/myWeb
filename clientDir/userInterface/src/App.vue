<template>
  <!-- 导航栏 -->
  <div class="tage_box" :class="{ 'with-shadow': showNavShadow }">
    <!-- Logo -->
    <div class="logo_box">
      <RouterLink to="/">
        <img class="logo_class" src="/portrait.png" alt="Logo" />
      </RouterLink>
    </div>

    <!-- 占位用的空div -->
    <div class="placeholder"></div>
  </div>

  <!-- 菜单按钮 - 移到外面 -->
  <div class="menu-toggle" @click.stop="toggleMenu" :class="{ 'active': isMenuOpen }">
    <div class="hamburger">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>

  <!-- 导航菜单 -->
  <div class="nav_box" :class="{ 'open': isMenuOpen }" ref="navBox" @click.stop>
    <div class="nav-content" :style="{ opacity: isMenuOpen ? 1 : 0 }">
      <RouterLink to="/" :style="{ '--i': 0 }">首页</RouterLink>
      <RouterLink to="/article" :style="{ '--i': 1 }">文章</RouterLink>
      <RouterLink to="/about" :style="{ '--i': 2 }">关于</RouterLink>
      <RouterLink to="/privacy" :style="{ '--i': 3 }">声明</RouterLink>
    </div>
  </div>

  <!-- 导航栏占位 -->
  <div style="height: 60px;"></div>

  <!-- 主要内容区域 -->
  <div class="content_box" :class="{ 'shifted': isMenuOpen }">
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>

  <!-- 滚动控制按钮 - 添加内容高度判断 -->
  <div class="icon_box" :class="{ 
    'scrolled': isScrolled || !isHomePage,
    'home': isHomePage,
    'hidden': !hasScroll
  }">
    <div class="icon" 
         :class="{ 'is-up': isAtBottom }" 
         @click="handleScrollClick">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 5v14M5 12l7 7 7-7"/>
      </svg>
    </div>
  </div>

  <!-- 页脚 -->
  <div class="foot_box">
    <p>© 2025 huafeng 版权所有</p>
    <p>备案号：鲁ICP备2024118017号 </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, computed, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import gsap from 'gsap'
import { myStore } from './stores/counter';

// 状态管理
const showBackTop = ref(false)
const route = useRoute()
const isMenuOpen = ref(false)
const navBox = ref<HTMLElement | null>(null)
const showNavShadow = ref(false)
const isScrolled = ref(false)
const isAtBottom = ref(false)
const hasScroll = ref(false)

// 添加是否为首页的判断
const isHomePage = computed(() => route.path === '/')

// 切换菜单
const toggleMenu = () => {
  console.log('Toggling menu. Current state:', isMenuOpen.value);
  if (isMenuOpen.value) {
    closeMenu();
  } else {
    isMenuOpen.value = true;
    console.log('Menu opened.');
    gsap.to('.nav-content', {
      duration: 0.2,
      opacity: 1,
      x: 0,
      ease: "power2.out"
    });
    gsap.to('.nav-content a', {
      duration: 0.2,
      opacity: 1,
      x: 0,
      stagger: 0.05,
      ease: "power2.out"
    });
    // Shift content to the left
    gsap.to('.content_box', {
      duration: 0.2,
      marginRight: '300px',
      ease: "power2.out"
    });
  }
};

// 关闭菜单的函数
const closeMenu = () => {
  console.log('Closing menu. Current state:', isMenuOpen.value);
  if (!isMenuOpen.value) return;
  isMenuOpen.value = false;
  console.log('Menu closed.');
  gsap.to('.nav-content', {
    duration: 0.2,
    opacity: 0,
    x: 300,
    ease: "power2.in"
  });
  gsap.to('.nav-content a', {
    duration: 0.2,
    opacity: 0,
    x: 20,
    stagger: 0.03,
    ease: "power2.in"
  });
  // Reset content position
  gsap.to('.content_box', {
    duration: 0.2,
    marginRight: '0px',
    ease: "power2.in"
  });
};

// 处理点击事件
const handleClick = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  const menuToggle = document.querySelector('.menu-toggle')
  const navBox = document.querySelector('.nav_box')
  
  // 如果点击的不是菜单按钮且不是菜单内容，则关闭菜单
  if (isMenuOpen.value && 
      !menuToggle?.contains(target) && 
      !navBox?.contains(target)) {
    closeMenu()
  }
}

// 检查滚动位置并更新按钮显示状态
const checkScroll = () => {
  const scrollTop = window.scrollY || document.documentElement.scrollTop
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  
  isAtBottom.value = (windowHeight + scrollTop) >= (documentHeight - 10)
  showBackTop.value = isAtBottom.value
  showNavShadow.value = scrollTop > 0
  
  if (!isScrolled.value && scrollTop > 50) {
    isScrolled.value = true
    const iconBox = document.querySelector('.icon_box')
    if (iconBox) {
      gsap.timeline()
        .to(iconBox, {
          duration: 0.3,
          scale: 0.8,
          ease: "power2.in"
        })
        .to(iconBox, {
          duration: 0.8,
          left: 'calc(100% - 64px)',
          ease: "power3.inOut"
        })
        .to(iconBox, {
          duration: 0.3,
          scale: 1,
          ease: "back.out(1.7)"
        })
        .set(iconBox, {
          left: 'auto',
          right: '20px',
          clearProps: "transform"
        })
    }
  }
}

// 修改滚动按钮点击处理
const handleScrollClick = () => {
  if (isAtBottom.value) {
    scrollToTop()
  } else {
    scrollToBottom()
  }
}

// 检查页面是否有滚动条
const checkScrollable = () => {
  hasScroll.value = document.documentElement.scrollHeight > (window.innerHeight + 20)
}

// 监听窗口大小变化
window.addEventListener('resize', checkScrollable)

// 在路由变化时检查
watch(route, () => {
  // 关闭菜单
  closeMenu()
  
  // 重置滚动按钮状态
  isScrolled.value = false
  isAtBottom.value = false
  
  // 重置按钮位置和样式
  const iconBox = document.querySelector('.icon_box')
  if (iconBox) {
    gsap.set(iconBox, {
      clearProps: 'all'
    })
  }
  
  // 等待 DOM 更新后再检查
  nextTick(() => {
    checkScrollable()
    // 初始化滚动检查
    checkScroll()
  })
})

// 在组件挂载时检查
onMounted(() => {
  checkScrollable()

  const stores = myStore()
  if(!stores.debugStart){
   // 禁用F12键
   document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.key === 'F12') e.preventDefault()
  })

  // 新增右键禁用
  document.addEventListener('contextmenu', (e: MouseEvent) => {
    e.preventDefault()
  })

  }
  

  // 检查设备类型
  if (checkDeviceType()) {
    console.log('移动设备')
  }

  // 初始化滚动检查
  setTimeout(checkScroll, 100)
  window.addEventListener('scroll', checkScroll)

  // 添加点击事件监听
  document.addEventListener('click', handleClick)
})

onUnmounted(() => {
  window.removeEventListener('scroll', checkScroll)
  window.removeEventListener('resize', checkScrollable)
  
  // 移除点击事件监听
  document.removeEventListener('click', handleClick)
})

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
  padding: 0 20px;
  z-index: 998;
  transition: box-shadow 0.3s ease;
  
  &.with-shadow {
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  }

  .logo_box {
    flex: 1;
    display: flex;
    justify-content: flex-start; // 改为左对齐
    align-items: center;

    a:hover {
      background-color: transparent;
    }

    .logo_class {
      width: 130px;
      height: auto;
    }
  }

  .placeholder {
    width: 44px; // 与菜单按钮宽度相同
  }
}

/* 菜单按钮样式 */
.menu-toggle {
  position: fixed;
  top: 8px; // 调整位置以对齐导航栏
  right: 20px;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 1005;
  border-radius: 12px;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: black;
    .hamburger span {
      background: white;
    }
  }

  .hamburger {
    width: 26px;
    height: 22px;
    position: relative;
    
    span {
      display: block;
      position: absolute;
      height: 3px;
      width: 100%;
      background: var(--elementColor);
      border-radius: 3px;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      
      &:nth-child(1) { top: 0; }
      &:nth-child(2) { top: 9.5px; }
      &:nth-child(3) { top: 19px; }
    }
  }
  
  &.active {
    .hamburger span {
      background: #ffffff;
      
      &:nth-child(1) {
        transform: rotate(45deg);
        top: 9.5px;
      }
      &:nth-child(2) {
        opacity: 0;
      }
      &:nth-child(3) {
        transform: rotate(-45deg);
        top: 9.5px;
      }
    }
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
}

/* 导航菜单样式 */
.nav_box {
  position: fixed;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background: black;
  transform: translateX(100%);
  transition: transform 0.3s ease;
  z-index: 1000;
}

.nav_box.open {
  transform: translateX(0);
}

.content_box {
  transition: margin-right 0.3s ease;
}

.content_box.shifted {
  margin-right: 300px;
}

.nav-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 30px;
  padding-left: 10px;
  opacity: 0;
  transition: opacity 0.2s ease;
  color: white;
  text-align: center;
}

.nav_box.open .nav-content {
  opacity: 1;
}

.nav-content a {
  color: white !important;
  text-decoration: none;
  font-size: 18px; /* 增加字体大小 */
}

.nav-content a:hover {
  background-color: rgba(255, 255, 255, 0.2); /* 设置悬停时的背景颜色 */
  border-radius: 8px; /* 添加圆角效果 */
}

/* 滚动控制按钮样式 */
.icon_box {
  position: fixed;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2000;
  will-change: transform;
  
  .icon {
    width: 44px;
    height: 44px;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    animation: gentleBounce 2s infinite;
    
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
      background: rgba(0, 0, 0, 0.9);
      box-shadow: 0 4px 15px rgba(0,0,0,0.2);
      animation-play-state: paused;
    }
  }

  &.hidden {
    display: none;
  }
}

/* 轻柔的跳跃动画 */
@keyframes gentleBounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-6px);
  }
  60% {
    transform: translateY(-3px);
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
