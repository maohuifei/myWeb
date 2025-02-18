<template>
  <div class="not-found-container">
    <div class="not-found-content">
      <div class="error-code">404</div>
      <h1>页面不存在</h1>
      <p>您请求的页面未找到或无权限访问。</p>
      <div class="action-buttons">
        <el-button type="primary" @click="$router.push('/home')">
          返回首页
        </el-button>
        <el-button @click="$router.go(-1)">返回上页</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="less">
.not-found-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--el-bg-color);
  padding: 2rem;
}

.not-found-content {
  text-align: center;
  max-width: 500px;
  padding: 3rem;
  background: var(--el-bg-color-overlay);
  border-radius: 8px;
  box-shadow: var(--el-box-shadow-light);

  .error-code {
    font-size: 6rem;
    font-weight: bold;
    color: var(--el-color-primary);
    line-height: 1;
    margin-bottom: 1rem;
    text-shadow: 2px 2px 0px var(--el-color-primary-light-3);
  }

  h1 {
    font-size: 2rem;
    color: var(--el-text-color-primary);
    margin-bottom: 1rem;
  }

  p {
    color: var(--el-text-color-regular);
    margin-bottom: 2rem;
  }

  .action-buttons {
    display: flex;
    gap: 1rem;
    justify-content: center;
  }
}

@media (max-width: 768px) {
  .not-found-container {
    padding: 1rem;
  }

  .not-found-content {
    padding: 2rem 1rem;
    width: 90%;

    .error-code {
      font-size: 4rem;
    }

    h1 {
      font-size: 1.5rem;
    }

    .action-buttons {
      flex-direction: column;
      gap: 0.5rem;
    }
  }
}
</style> 