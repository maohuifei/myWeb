<template>
  <div class="maintenance-container">
    <div class="maintenance-content">
      <div class="icon-wrapper">
        <svg class="maintenance-icon" viewBox="0 0 24 24">
          <path d="M21.67 18.17l-5.3-5.3h-.99l-2.54 2.54v.99l5.3 5.3c.39.39 1.02.39 1.41 0l2.12-2.12c.39-.38.39-1.02 0-1.41zm-2.83 1.42l-4.24-4.24.71-.71 4.24 4.24-.71.71z"/>
          <path d="M17.34 10.19l1.41-1.41 2.12 2.12c1.17-1.17 1.17-3.07 0-4.24l-3.54-3.54-1.41 1.41V1.71L15.22 1l-3.54 3.54.71.71h2.83l-1.41 1.41 1.06 1.06-2.89 2.89-4.13-4.13V5.06L4.83 2.04 2 4.87 5.03 7.9h1.41l4.13 4.13-.85.85H7.6l-5.3 5.3c-.39.39-.39 1.02 0 1.41l2.12 2.12c.39.39 1.02.39 1.41 0l5.3-5.3v-2.12l5.15-5.15 1.06 1.05z"/>
        </svg>
      </div>
      <h1>维护中</h1>
      <p>该功能正在进行维护或者升级</p>
      <div class="action-buttons">
        <RouterLink to="/" class="button primary">返回首页</RouterLink>
        <RouterLink to="/about" class="button secondary">联系我们</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.maintenance-container {
  min-height: calc(100vh - 180px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e8eb 100%);
}

.maintenance-content {
  text-align: center;
  max-width: 600px;
  padding: 3rem;
  background: rgba(255, 255, 255, 0.9);
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);

  h1 {
    font-size: 2.5rem;
    color: var(--elementColor);
    margin: 1.5rem 0;
  }

  p {
    color: var(--txtColor);
    font-size: 1.1rem;
    line-height: 1.6;
    margin: 1rem 0;
  }
}

.icon-wrapper {
  margin-bottom: 2rem;
}

.maintenance-icon {
  width: 120px;
  height: 120px;
  fill: var(--elementColor);
  animation: wrench 2.5s ease infinite;
}

.action-buttons {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  justify-content: center;

  .button {
    padding: 0.8rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    transition: transform 0.2s;

    &:hover {
      transform: translateY(-2px);
    }

    &.primary {
      background: var(--elementColor);
      color: var(--outElementColor);
    }

    &.secondary {
      background: transparent;
      border: 2px solid var(--elementColor);
      color: var(--elementColor);
    }
  }
}

@keyframes wrench {
  0% {
    transform: rotate(-12deg);
  }
  8% {
    transform: rotate(12deg);
  }
  10% {
    transform: rotate(24deg);
  }
  18% {
    transform: rotate(-24deg);
  }
  20% {
    transform: rotate(-24deg);
  }
  28% {
    transform: rotate(24deg);
  }
  30% {
    transform: rotate(24deg);
  }
  38% {
    transform: rotate(-24deg);
  }
  40% {
    transform: rotate(-24deg);
  }
  48% {
    transform: rotate(24deg);
  }
  50% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

@media (max-width: 768px) {
  .maintenance-container {
    padding: 1rem;
  }

  .maintenance-content {
    padding: 2rem 1rem;

    h1 {
      font-size: 2rem;
    }

    p {
      font-size: 1rem;
    }
  }

  .maintenance-icon {
    width: 80px;
    height: 80px;
  }

  .action-buttons {
    flex-direction: column;
    gap: 0.5rem;

    .button {
      width: 100%;
    }
  }
}
</style> 