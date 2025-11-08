<template>
  <button class="navigation-button" @click="goHome" aria-label="返回首页">
    <span class="button-content">
      <font-awesome-icon icon="angle-left" />
      返回首页
    </span>
  </button>
</template>

<script setup lang="ts">
const goHome = () => {
  window.location.href = "/";
};
</script>
<style scoped lang="scss">
:root {
  --primary-rgb: 0, 123, 255;
  --primary-color: rgb(var(--primary-rgb));
}

.navigation-button:hover {
  border-color: #409eff;
  color: #409eff;
}

.navigation-button {
  color: #333;
  text-align: center;
  position: fixed;
  top: 20px;
  left: 20px;
  padding: 12px 24px;
  background: rgba(var(--primary-rgb), 0.1);
  border: 2px solid var(--primary-color);
  border-radius: 8px;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
  z-index: 1000;

  &:hover {
    background: rgba(var(--primary-rgb), 0.2);
    transform: translateY(-2px);
    box-shadow: 0 4px 15px rgba(var(--primary-rgb), 0.2);
  }

  .button-content {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
  }
}
</style>
