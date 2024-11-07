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
    <div class="icon_box">
      <svg class="icon" aria-hidden="true">
        <use href="#icon-sousuo"></use>
      </svg>
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
  <div class="foot_box">
    <p>© 2024 huafeng 版权所有</p>
    <p>备案号：鲁ICP备2024118017号 </p>
  </div>
</template>
<script lang="ts">
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const isLoading = ref(true)
    // const maintenance = ref(false)
    onMounted(() => {
      Prohibit()
      isMobileDevice()
    })
    //禁止事件
    const Prohibit = () => {
      // 禁止右键
      document.oncontextmenu = (event: MouseEvent) => {
        event.preventDefault(); // 阻止默认行为
        event.returnValue = false; // 对于某些浏览器，可能需要设置 returnValue 为 false
      };
 
      // 禁止键盘 F12
      document.addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.key === "F12") {
          e.preventDefault(); // 如果按下键 F12, 阻止事件
        }
      });
    }
    // //检查设备
    const isMobileDevice = () => {
      const userAgent = navigator.userAgent
      // 匹配常见的移动设备User-Agent字符串
      const mobileAgents = [
        /android/i,
        /iphone|ipad|ipod/i,
        /blackberry/i,
        /iemobile/i,
        /opera mini/i,
        /windows phone/i,
        /mobile/i, // 这个可能会匹配到一些桌面浏览器的旧版本或特殊配置
        /touch/i   // 这个可能会匹配到一些桌面触摸屏设备
      ]
      // 检查User-Agent字符串是否匹配任何一个移动设备模式
      if (mobileAgents.some(agent => agent.test(userAgent.toLowerCase()))) {
        console.log("移动设备");
      }
    }

    return {
      // isMobileDevice,
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
.fade-leave-to

/* .fade-leave-active in <2.1.8 */
  {
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
</style>
